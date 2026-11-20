# ENSF519.02 assignment setup

This branch uses Umar's existing portfolio for Assignment 03. The website is built from `my_portfolio`, exported as static files and served by Nginx on port 80. Docker builds both stages, so Node.js is not required on the EC2 controller.

## What is ready

- A multi-stage `Dockerfile`, Nginx configuration and Docker build exclusions.
- `deploy-k8s-app.sh`: creates/updates the deployment and NodePort service, scales to at least three replicas, waits for readiness and checks the served page.
- `deploy-automation.yml`: transfers and executes that script on `ansible-node2` in `[test]`, using root's Minikube kubeconfig.
- `run_assignment.py`: runs the assignment steps and records their actual output.
- `build_report.py`: combines the required complete code and genuine screenshots into one implementation document.
- `.github/workflows/ensf519.yml`: validates the normal build, automation, real Docker build and Nginx container when this branch is pushed. CI does not deploy to EC2 or push to Docker Hub.

## What still needs your accounts

The assignment is not submission-complete until your Docker Hub image is publicly available, the playbook has run from class `ansible-master` to class `ansible-node2`, and the required screenshots have been captured. Local tests and GitHub Actions are additional validation; they do not replace this class infrastructure evidence.

You need your Docker Hub username and the existing EC2 instances. Create a **public** Docker Hub repository called `web-project`. Use the Docker, Minikube and SSH setup taught in class.

## 1 Open ansible-node2

Verify the existing class Minikube setup:

```bash
hostname
sudo minikube start --driver=none
sudo minikube status
sudo kubectl --kubeconfig=/root/.kube/config get nodes
```

The kubeconfig path is configurable if your class installation uses a different path. The target needs `kubectl`, `curl`, `sha256sum` and passwordless sudo for the existing class SSH user.

## 2 Open ansible-master

Verify that Docker works for your class user and that Ansible can connect to the target. Use the existing class Security Group required by the handout, with the assigned NodePort reachable through node2's public IP.

```bash
hostname
sudo systemctl status docker --no-pager
docker info
ansible --version
```

Update the **existing** `/etc/ansible/hosts` without removing other hosts. `inventory.example.ini` shows the required entry:

```ini
[test]
ansible-node2 ansible_host=NODE2_PRIVATE_IP ansible_ssh_user=CLASS_SSH_USER
```

Use your actual private IP and SSH user/key from class. The public IP is used by the browser, while the private IP is used by Ansible.

```bash
ansible test -i /etc/ansible/hosts --limit ansible-node2 -m ping
```

## 3 Clone this branch on ansible-master and run

```bash
git clone --single-branch --branch ENSF519.02 https://github.com/Umar5426/my-portfolio.git
cd my-portfolio
chmod +x deploy-k8s-app.sh
python3 run_assignment.py
```

The runner asks for your Docker Hub username, node2's public IPv4 and the target kubeconfig path. The repository and branch are already selected. It saves non-secret settings in the ignored `settings.json`. Docker login prompts for your password/token locally; never commit it.

The runner:

1. Clones **ENSF519.02** into an isolated run directory and records its commit.
2. Builds `DOCKERHUB_USERNAME/web-project:v1` from the repo-root Dockerfile.
3. Starts a local container with host port 81 mapped to port 80. It checks the portfolio, images/scripts/styles, résumé, headers, health endpoint and 404 handling.
4. Extracts `index.html` from that image and uses its SHA256 to verify the local and deployed websites.
5. Runs Docker login, pushes the image, and checks its public Docker Hub tag.
6. Runs Ansible ping, syntax check, check mode and the real playbook, limited to node2.
7. Checks three ready replicas and tests the public NodePort URL.

Actual logs and a `run-summary.json` are saved under `evidence/runs/`. The runner stops at the first failed required step. It removes only its own local test container; the Kubernetes deployment remains available for your screenshot. Default local port 81 must be free. Run as the prepared class controller user, rather than running the entire script with sudo and changing the SSH identity.

For advance configuration:

```bash
cp settings.example.json settings.json
# Fill dockerhub_username and node2_public_ip in settings.json.
python3 run_assignment.py --validate-config
python3 run_assignment.py --config settings.json
```

If the class user requires a sudo password, run the playbook manually with `--ask-become-pass`; the automatic runner assumes the class passwordless-sudo setup.

## 4 Capture evidence and build the final document

Follow [evidence/SCREENSHOTS.md](evidence/SCREENSHOTS.md). Keep the host, command, result and browser address visible. Save the actual PNGs under `evidence/screenshots/`; this directory is ignored by Git to avoid publishing account and instance screenshots.

After a successful live run, on any machine with the report dependencies installed:

```bash
python3 -m pip install -r requirements-report.txt
python3 build_report.py \
  --run evidence/runs/ACTUAL_RUN_DIRECTORY/run-summary.json \
  --screenshots evidence/screenshots \
  --final \
  --output Assignment03_Implementation
```

This creates the final `.pdf` and editable `.docx`. The builder requires a successful run record and all listed screenshots. Submit the **single implementation document** requested by the handout. Review every screenshot for readability first. Generated documents, logs and settings are ignored by Git.

## Manual Docker commands

Run from the repository root on ansible-master, replacing `YOUR_DOCKERHUB_USERNAME`:

```bash
docker build -t YOUR_DOCKERHUB_USERNAME/web-project:v1 .
docker run -d --name portfolio-local -p 81:80 YOUR_DOCKERHUB_USERNAME/web-project:v1
python3 tools/smoke_container.py --base-url http://127.0.0.1:81
docker login --username YOUR_DOCKERHUB_USERNAME
docker push YOUR_DOCKERHUB_USERNAME/web-project:v1
```

`docker build` invokes the static export inside Node.js 22, then copies only `out/` into Nginx. Source files, Node.js and `node_modules` are excluded from the runtime image. Normal portfolio development/Vercel commands remain documented in the main README.

## Local checks

```bash
npm ci --prefix my_portfolio
npm run lint --prefix my_portfolio
npm run build --prefix my_portfolio
npm run build:static --prefix my_portfolio
python3 -m pip install ansible-core==2.19.15 shellcheck-py
python3 -m unittest discover -s tests -v
shellcheck deploy-k8s-app.sh
ansible-playbook -i inventory.example.ini deploy-automation.yml --syntax-check
```

The automation tests use a simulated `kubectl` and a real local HTTP server. The Actions container check uses actual Docker and Nginx. In Ansible check mode the playbook verifies settings, kubeconfig and read-only cluster connectivity; it deliberately skips the script that changes the cluster. Repeated real deployments restart the pods to fetch the current `v1` image.

## References

- Course handout: Assignment 03 Docker-K8s-Ansible.
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- [Official Nginx image](https://hub.docker.com/_/nginx).
- [Ansible script module](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html).
