"""Local tests with a simulated kubectl and real local HTTP; no EC2 claims."""
import contextlib
from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("runner", ROOT / "run_assignment.py")
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)

FAKE_KUBECTL = r'''#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
args = sys.argv[1:]
with open(os.environ["MOCK_KUBE_LOG"], "a") as f:
    f.write(json.dumps(args) + "\n")
joined = " ".join(args)
if os.environ.get("MOCK_FAIL") and os.environ["MOCK_FAIL"] in joined:
    print("Simulated kubectl failure", file=sys.stderr)
    sys.exit(1)
if "apply" in args:
    data = sys.stdin.read()
    with open(os.environ["MOCK_MANIFEST_LOG"], "a") as f:
        f.write(data + "\n---\n")
    print("mock resource configured")
elif "expose" in args:
    print("apiVersion: v1\nkind: Service\nmetadata:\n  name: web-project")
elif any("readyReplicas" in arg for arg in args):
    print(os.environ.get("MOCK_READY", "3"), end="")
elif any("nodePort" in arg for arg in args):
    print(os.environ["MOCK_NODEPORT"], end="")
elif any("InternalIP" in arg for arg in args):
    print("127.0.0.1", end="")
else:
    print("simulated kubectl: " + joined)
'''


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class AutomationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.path = Path(self.tmp.name)
        self.site = self.path / "site"
        self.site.mkdir()
        (self.site / "index.html").write_text("<html><h1>Automation test fixture</h1></html>\n")
        handler = partial(QuietHandler, directory=str(self.site))
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.addCleanup(self.stop_server)
        self.bin = self.path / "bin"
        self.bin.mkdir()
        kubectl = self.bin / "kubectl"
        kubectl.write_text(FAKE_KUBECTL.replace("#!/usr/bin/env python3", f"#!{sys.executable}"))
        kubectl.chmod(0o755)
        self.config = self.path / "kubeconfig"
        self.config.write_text("local mock kubeconfig; not a cluster credential\n")
        self.log = self.path / "kubectl.log"
        self.manifests = self.path / "manifests.yaml"
        self.env = {**os.environ, "PATH": str(self.bin) + os.pathsep + os.environ["PATH"],
                    "KUBECONFIG": str(self.config), "MOCK_KUBE_LOG": str(self.log),
                    "MOCK_MANIFEST_LOG": str(self.manifests),
                    "MOCK_NODEPORT": str(self.server.server_port),
                    "EXPECTED_INDEX_SHA256": hashlib.sha256((self.site / "index.html").read_bytes()).hexdigest(),
                    "NODE_PUBLIC_IP": "203.0.113.10"}

    def stop_server(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()

    def script(self, image="testuser/web-project:v1", **env):
        return subprocess.run(["bash", ROOT / "deploy-k8s-app.sh", image],
                              env={**self.env, **env}, text=True, capture_output=True)

    def commands(self):
        return [json.loads(line) for line in self.log.read_text().splitlines()] if self.log.exists() else []

    def test_full_script_with_real_http(self):
        result = self.script()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("DEPLOYMENT_SUCCESS", result.stdout)
        self.assertIn("BROWSER_URL=http://203.0.113.10:", result.stdout)
        self.assertIn("image: testuser/web-project:v1", self.manifests.read_text())
        commands = self.commands()
        self.assertTrue(any("expose" in c and "--type=NodePort" in c for c in commands))
        self.assertTrue(any("scale" in c and "--replicas=3" in c for c in commands))
        self.assertTrue(any("rollout" in c and "status" in c for c in commands))

    def test_ready_rollout_not_blocked_by_retiring_pod(self):
        # A terminating old pod never becomes Ready again, even when all
        # updated replicas are ready and rollout status has succeeded.
        result = self.script(MOCK_FAIL="--for=condition=Ready pods")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("DEPLOYMENT_SUCCESS", result.stdout)

    def test_repeated_script_does_not_use_duplicate_create(self):
        self.assertEqual(self.script().returncode, 0)
        self.assertEqual(self.script().returncode, 0)
        self.assertFalse(any("create" in c for c in self.commands()))
        self.assertEqual(sum("expose" in c for c in self.commands()), 2)

    def test_invalid_image_stops_before_cluster_access(self):
        result = self.script("YOUR_USERNAME/web-project:v1")
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.commands(), [])

    def test_less_than_three_replicas_rejected(self):
        self.assertNotEqual(self.script(REPLICAS="2").returncode, 0)
        self.assertEqual(self.commands(), [])

    def test_bad_namespace_rejected(self):
        self.assertNotEqual(self.script(NAMESPACE="bad; touch /tmp/oops").returncode, 0)
        self.assertEqual(self.commands(), [])

    def test_missing_kubeconfig_rejected(self):
        self.assertNotEqual(self.script(KUBECONFIG=str(self.path / "missing")).returncode, 0)
        self.assertEqual(self.commands(), [])

    def test_cluster_error_has_no_success_marker(self):
        result = self.script(MOCK_FAIL="cluster-info")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("DEPLOYMENT_SUCCESS", result.stdout)
        self.assertFalse(any("apply" in c for c in self.commands()))

    def test_rollout_error_has_no_success_marker(self):
        result = self.script(MOCK_FAIL="rollout status")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("DEPLOYMENT_SUCCESS", result.stdout)

    def test_readiness_shortfall_fails(self):
        result = self.script(MOCK_READY="2")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("DEPLOYMENT_SUCCESS", result.stdout)

    def test_missing_readiness_fails(self):
        result = self.script(MOCK_READY="")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("DEPLOYMENT_SUCCESS", result.stdout)

    def test_missing_nodeport_fails(self):
        result = self.script(MOCK_NODEPORT="")
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("DEPLOYMENT_SUCCESS", result.stdout)

    def test_wrong_website_fails(self):
        result = self.script(EXPECTED_INDEX_SHA256="0" * 64)
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn("DEPLOYMENT_SUCCESS", result.stdout)

    def ansible(self, check):
        executable = shutil.which("ansible-playbook")
        if not executable:
            self.skipTest("Install ansible-core to run local playbook integration tests.")
        inventory = self.path / "hosts"
        inventory.write_text("[test]\nansible-node2 ansible_connection=local\n")
        variables = self.path / "vars.json"
        variables.write_text(json.dumps({"dockerhub_username": "testuser", "ansible_become": False,
                                         "ansible_python_interpreter": sys.executable,
                                         "kubeconfig": str(self.config),
                                         "node_public_ip": "203.0.113.10",
                                         "expected_index_sha256": self.env["EXPECTED_INDEX_SHA256"]}))
        return subprocess.run([executable, "-i", inventory, ROOT / "deploy-automation.yml",
                               "-e", "@" + str(variables)] + (["--check"] if check else []),
                              env=self.env, text=True, capture_output=True)

    def test_ansible_check_mode_only_reads_cluster(self):
        result = self.ansible(check=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("no cluster changes were made", result.stdout)
        self.assertEqual(len(self.commands()), 1)
        self.assertIn("cluster-info", self.commands()[0])
        self.assertFalse(self.manifests.exists())

    def test_ansible_script_transfer_and_output(self):
        result = self.ansible(check=False)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("DEPLOYMENT_SUCCESS", result.stdout)
        self.assertIn("failed=0", result.stdout)
        self.assertTrue(self.manifests.exists())

    def test_runner_defaults_to_assignment_branch(self):
        settings = json.loads((ROOT / "settings.example.json").read_text())
        self.assertEqual(settings["github_branch"], "ENSF519.02")
        self.assertEqual(settings["github_url"], "https://github.com/Umar5426/my-portfolio.git")
        settings.update(dockerhub_username="testuser", node2_public_ip="203.0.113.10")
        runner.validate_settings(settings)

    def test_runner_rejects_wrong_branch(self):
        settings = json.loads((ROOT / "settings.example.json").read_text())
        settings.update(dockerhub_username="testuser", node2_public_ip="203.0.113.10", github_branch="main")
        with self.assertRaises(ValueError):
            runner.validate_settings(settings)


if __name__ == "__main__":
    unittest.main(verbosity=2)
