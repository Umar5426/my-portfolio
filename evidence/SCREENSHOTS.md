# Screenshots for the implementation document

Create a `screenshots` directory here and save genuine images using these exact names. Keep command text and output readable. Do not create images of invented terminal output.

| Filename | Capture location | What must be visible |
| --- | --- | --- |
| `01-git-clone.png` | ansible-master terminal | Host identity, git clone command, correct existing GitHub project and successful clone |
| `02-docker-build.png` | ansible-master terminal | Build command, actual Docker Hub username/web-project:v1 and build success |
| `03-local-container.png` | ansible-master terminal | Detached container, host 81 to container 80 mapping, successful HTTP test |
| `04-docker-login.png` | ansible-master terminal | docker login command and Login Succeeded, with token/password hidden |
| `05-docker-push.png` | ansible-master terminal | docker push of the actual username/web-project:v1 and resulting digest |
| `06-dockerhub-tag.png` | Docker Hub browser page | Public web-project repository and v1 tag under your actual account |
| `07-ansible-ping.png` | ansible-master terminal | ansible test -m ping returning SUCCESS/pong for ansible-node2 |
| `08-syntax-check.png` | ansible-master terminal | Playbook syntax check completing successfully |
| `09-check-mode.png` | ansible-master terminal | --check command, explanation that the script was skipped and a successful recap |
| `10-ansible-playbook.png` | ansible-master terminal | Actual deployment command, script output and recap with failed=0 / unreachable=0 |
| `11-node2-verification.png` | Terminal logged into ansible-node2 | hostname, kubectl services, deployments, at least 3 Running/Ready pods and actual image names |
| `12-browser.png` | Your browser | Actual mini-project rendering at http://NODE2_PUBLIC_IP:ACTUAL_NODEPORT/ with address bar visible |

Rows 03, 08 and 09 add evidence for the handout's execution steps; the rest map directly to its submission list. Use more than one terminal capture if one screenshot would make text too small; combine adjacent genuine captures on a report page as needed. The automatic report expects one PNG per listed filename.

## Target verification commands

SSH into ansible-node2 and run the following for the default configuration:

```bash
hostname
sudo kubectl --kubeconfig=/root/.kube/config -n default get services
sudo kubectl --kubeconfig=/root/.kube/config -n default get deployments
sudo kubectl --kubeconfig=/root/.kube/config -n default get pods -o wide
sudo kubectl --kubeconfig=/root/.kube/config -n default get pods \
  -l app=web-project \
  -o 'custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[0].image,PHASE:.status.phase,READY:.status.containerStatuses[0].ready'
sudo kubectl --kubeconfig=/root/.kube/config -n default get service web-project \
  -o jsonpath='{.spec.ports[0].nodePort}'
echo
```

Change kubeconfig, namespace and app label if you deliberately changed those settings. For the final screenshot, use node2's public IPv4 and the actual reported NodePort. A local preview, localhost URL, port-forward or a screenshot from ansible-master does not fulfill the target/browser evidence requirement.

## Inspecting saved command output

Each actual run has logs under `evidence/runs/ACTUAL_RUN_DIRECTORY/`. On ansible-master, for example:

```bash
hostname
cat evidence/runs/ACTUAL_RUN_DIRECTORY/07-ansible-ping.log
cat evidence/runs/ACTUAL_RUN_DIRECTORY/10-ansible-playbook.log
```

Include the command and result in the capture. Read the node verification directly on ansible-node2. Only use evidence from the final successful deployment to avoid mixing different tags, IPs or NodePorts.
