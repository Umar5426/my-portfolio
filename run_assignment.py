#!/usr/bin/env python3
"""Build and deploy the portfolio from ansible-master."""
import argparse
import hashlib
import ipaddress
import json
import os
from pathlib import Path
import re
import shlex
import shutil
import socket
import subprocess
import sys
import time
from datetime import datetime, timezone
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent
DEFAULT_SETTINGS = {'github_url': 'https://github.com/Umar5426/my-portfolio.git', 'github_branch': 'ENSF519.02', 'dockerhub_username': '', 'node2_public_ip': '', 'inventory': '/etc/ansible/hosts', 'kubeconfig': '/root/.kube/config', 'namespace': 'default', 'app_name': 'web-project', 'replicas': 3, 'local_port': 81}


def validate_settings(settings):
    required = ("github_url", "dockerhub_username", "node2_public_ip")
    for key in required:
        if not isinstance(settings.get(key), str) or not settings[key].strip():
            raise ValueError(f"Missing required setting: {key}")
    if not re.fullmatch(r"https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+(?:\.git)?/?",
                        settings["github_url"]):
        raise ValueError("github_url must be an HTTPS GitHub repository URL.")
    if not re.fullmatch(r"[a-z0-9][a-z0-9_-]+", settings["dockerhub_username"]):
        raise ValueError("Enter your actual lowercase Docker Hub username.")
    ipaddress.IPv4Address(settings["node2_public_ip"])
    replicas = settings.get("replicas", 3)
    if type(replicas) is not int or replicas < 3:
        raise ValueError("replicas must be an integer of at least 3.")
    local_port = settings.get("local_port", 81)
    if type(local_port) is not int or not 1 <= local_port <= 65535:
        raise ValueError("local_port must be an integer from 1 through 65535.")
    for key in ("namespace", "app_name"):
        value = settings.get(key, "default" if key == "namespace" else "web-project")
        if len(value) > 63 or not re.fullmatch(r"[a-z0-9](?:[-a-z0-9]*[a-z0-9])?", value):
            raise ValueError(f"Invalid DNS label in {key}.")
    if not str(settings.get("kubeconfig", "/root/.kube/config")).startswith("/"):
        raise ValueError("kubeconfig must be an absolute path on ansible-node2.")
    branch = settings.get("github_branch", "ENSF519.02")
    if branch != "ENSF519.02":
        raise ValueError("Use github_branch ENSF519.02 for this assignment.")



def load_settings(path):
    defaults = DEFAULT_SETTINGS.copy()
    if path.exists():
        defaults.update(json.loads(path.read_text()))
    else:
        print("Enter your existing class details. No passwords or private keys are saved.")
        print("Source: Umar5426/my-portfolio, branch ENSF519.02")
        defaults["dockerhub_username"] = input("Docker Hub username: ").strip()
        defaults["node2_public_ip"] = input("ansible-node2 PUBLIC IPv4 address: ").strip()
        defaults["kubeconfig"] = input("Target kubeconfig [/root/.kube/config]: ").strip() or "/root/.kube/config"
        validate_settings(defaults)
        path.write_text(json.dumps(defaults, indent=2) + "\n")
        path.chmod(0o600)
        print(f"Configuration saved to {path}")
    validate_settings(defaults)
    return defaults


class Run:
    def __init__(self, directory):
        self.directory = directory
        self.steps = []

    def command(self, label, args, cwd=ROOT):
        print(f"\n{label}\n$ {shlex.join(map(str, args))}", flush=True)
        log_path = self.directory / f"{label}.log"
        with log_path.open("w") as log:
            log.write(f"Host: {socket.gethostname()}\n")
            log.write(f"UTC: {datetime.now(timezone.utc).isoformat()}\n")
            log.write(f"$ {shlex.join(map(str, args))}\n")
            # stdin is inherited so Docker login accepts a hidden local token.
            process = subprocess.Popen(list(map(str, args)), cwd=cwd,
                                       stdout=subprocess.PIPE,
                                       stderr=subprocess.STDOUT, text=True)
            chunks = []
            for line in process.stdout:
                print(line, end="", flush=True)
                log.write(line)
                log.flush()
                chunks.append(line)
            rc = process.wait()
            log.write(f"\nExit status: {rc}\n")
        self.steps.append({"step": label, "returncode": rc, "log": log_path.name})
        if rc:
            raise RuntimeError(f"{label} failed (exit {rc}); see {log_path}")
        return "".join(chunks)


def get_url(url, attempts=8):
    last_error = None
    for attempt in range(attempts):
        try:
            with urlopen(url, timeout=20) as response:
                return response.read()
        except Exception as exc:
            last_error = exc
            if attempt + 1 < attempts:
                time.sleep(2)
    raise RuntimeError(f"Unable to read {url}: {last_error}")


def check_page(url, expected_sha256):
    data = get_url(url)
    actual = hashlib.sha256(data).hexdigest()
    if actual != expected_sha256:
        raise RuntimeError(f"{url} does not serve the mini-project index.html.")
    return {"url": url, "sha256": actual, "bytes": len(data)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=ROOT / "settings.json")
    parser.add_argument("--validate-config", action="store_true")
    args = parser.parse_args()
    settings = load_settings(args.config.resolve())
    if args.validate_config:
        print("Configuration is valid. No deployment commands were executed.")
        return
    for executable in ("git", "docker", "ansible", "ansible-playbook", "ansible-inventory"):
        if not shutil.which(executable):
            raise RuntimeError(f"{executable} is missing. Run on the prepared ansible-master instance.")
    inventory = Path(settings["inventory"]).expanduser().resolve()
    if not inventory.is_file():
        raise ValueError(f"Class Ansible inventory does not exist: {inventory}")
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
    work = ROOT / "work" / stamp
    work.mkdir(parents=True)
    evidence = ROOT / "evidence" / "runs" / stamp
    evidence.mkdir(parents=True)
    run = Run(evidence)
    image = f"{settings['dockerhub_username']}/web-project:v1"
    summary = {"pipeline_complete": False, "settings": settings, "image": image,
               "controller": socket.gethostname(), "run_utc": stamp, "steps": run.steps}
    summary_path = evidence / "run-summary.json"
    local_container = f"seng519-a3-{stamp.lower()}"
    container_created = False
    try:
        run.command("00-docker-status", ["docker", "info"])
        inventory_text = run.command("00-inventory", ["ansible-inventory", "-i", inventory, "--list"])
        inventory_data = json.loads(inventory_text)
        if "ansible-node2" not in inventory_data.get("test", {}).get("hosts", []):
            raise ValueError("Inventory [test] must include ansible-node2.")
        repo = work / "mini-project"
        run.command("01-git-clone", ["git", "clone", "--single-branch", "--branch", settings["github_branch"], "--", settings["github_url"], repo])
        summary["source_commit"] = run.command("01-source-commit", ["git", "rev-parse", "HEAD"], cwd=repo).strip()
        run.command("02-docker-build", ["docker", "build", "--pull", "-t", image, repo])
        run.command("03-local-container", ["docker", "run", "-d", "--name", local_container,
                                           "-p", f"{settings['local_port']}:80", image])
        container_created = True
        run.command("03-local-container-status", ["docker", "ps", "--filter", f"name={local_container}"])
        exported_index = work / "index.html"
        run.command("03-container-index", ["docker", "cp",
                                           f"{local_container}:/usr/share/nginx/html/index.html", exported_index])
        expected_hash = hashlib.sha256(exported_index.read_bytes()).hexdigest()
        summary["index_sha256"] = expected_hash
        run.command("03-site-smoke-test", [sys.executable, repo / "tools/smoke_container.py",
                                            "--base-url", f"http://127.0.0.1:{settings['local_port']}"])
        summary["local_http"] = check_page(f"http://127.0.0.1:{settings['local_port']}/", expected_hash)
        (evidence / "03-local-http.json").write_text(json.dumps(summary["local_http"], indent=2))
        print("\nDocker login will prompt for your token locally; the token is not put into configuration.")
        run.command("04-docker-login", ["docker", "login", "--username", settings["dockerhub_username"]])
        run.command("05-docker-push", ["docker", "push", image])
        summary["image_digest"] = run.command("05-image-digest", ["docker", "image", "inspect", image,
                                                                 "--format", "{{json .RepoDigests}}"])
        tag_url = f"https://hub.docker.com/v2/repositories/{settings['dockerhub_username']}/web-project/tags/v1/"
        # This request has no credentials, so it checks public registry visibility.
        tag = json.loads(get_url(tag_url))
        if tag.get("name") != "v1":
            raise RuntimeError("The public Docker Hub v1 tag could not be verified.")
        (evidence / "06-public-dockerhub-tag.json").write_text(json.dumps(tag, indent=2))
        summary["dockerhub_url"] = f"https://hub.docker.com/r/{settings['dockerhub_username']}/web-project/tags"
        variables = {"dockerhub_username": settings["dockerhub_username"],
                     "kubeconfig": settings["kubeconfig"], "k8s_namespace": settings["namespace"],
                     "app_name": settings["app_name"], "replicas": settings["replicas"],
                     "node_public_ip": settings["node2_public_ip"],
                     "expected_index_sha256": expected_hash}
        variables_path = evidence / "deployment-vars.json"
        variables_path.write_text(json.dumps(variables, indent=2) + "\n")
        # Constrain class [test] to the required target, even if it contains other hosts.
        run.command("07-ansible-ping", ["ansible", "test", "-i", inventory,
                                        "--limit", "ansible-node2", "-m", "ping"])
        playbook = ["ansible-playbook", "-i", inventory, repo / "deploy-automation.yml",
                    "--limit", "ansible-node2", "-e", f"@{variables_path}"]
        run.command("08-syntax-check", playbook + ["--syntax-check"])
        run.command("09-check-mode", playbook + ["--check"])
        deployment_log = run.command("10-ansible-playbook", playbook)
        ports = re.findall(r"NODEPORT=(\d+)", deployment_log)
        if not ports or "DEPLOYMENT_SUCCESS" not in deployment_log:
            raise RuntimeError("Deployment did not provide its success marker and NodePort.")
        summary["node_port"] = int(ports[-1])
        browser_url = f"http://{settings['node2_public_ip']}:{summary['node_port']}/"
        summary["external_http"] = check_page(browser_url, expected_hash)
        summary["browser_url"] = browser_url
        (evidence / "11-public-http.json").write_text(json.dumps(summary["external_http"], indent=2))
        summary["pipeline_complete"] = True
        print(f"\nLive pipeline succeeded. Open {browser_url} in your browser.")
        print("Capture the required real screenshots described in evidence/SCREENSHOTS.md.")
    finally:
        if container_created:
            try:
                run.command("99-local-test-cleanup", ["docker", "rm", "-f", local_container])
            except RuntimeError as exc:
                print(f"Cleanup warning: {exc}", file=sys.stderr)
        summary_path.write_text(json.dumps(summary, indent=2) + "\n")
        print(f"\nRun metadata: {summary_path}")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, RuntimeError, OSError, KeyboardInterrupt) as exc:
        print(f"\nSTOPPED: {exc}", file=sys.stderr)
        sys.exit(1)
