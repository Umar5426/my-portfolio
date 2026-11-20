#!/usr/bin/env bash
# Run on ansible-node2 through Ansible, using the root Minikube kubeconfig.
set -Eeuo pipefail

IMAGE="${1:-${IMAGE:-}}"
APP_NAME="${APP_NAME:-web-project}"
NAMESPACE="${NAMESPACE:-default}"
REPLICAS="${REPLICAS:-3}"
KUBECONFIG="${KUBECONFIG:-/root/.kube/config}"
EXPECTED_INDEX_SHA256="${EXPECTED_INDEX_SHA256:-}"
NODE_PUBLIC_IP="${NODE_PUBLIC_IP:-}"
export KUBECONFIG

# Reject unresolved configuration before changing any cluster resources.
if [[ ! "$IMAGE" =~ ^[a-z0-9][a-z0-9_-]+/web-project:v1$ ]]; then
    echo 'Usage: deploy-k8s-app.sh DOCKERHUB_USERNAME/web-project:v1' >&2
    exit 2
fi
if [[ ! "$REPLICAS" =~ ^[0-9]+$ ]] || (( REPLICAS < 3 )); then
    echo 'REPLICAS must be an integer of at least 3.' >&2
    exit 2
fi
for value in "$APP_NAME" "$NAMESPACE"; do
    if [[ ! "$value" =~ ^[a-z0-9]([-a-z0-9]*[a-z0-9])?$ ]] ||
        (( ${#value} > 63 )); then
        echo 'APP_NAME and NAMESPACE must be valid DNS labels.' >&2
        exit 2
    fi
done
if [[ -n "$EXPECTED_INDEX_SHA256" &&
      ! "$EXPECTED_INDEX_SHA256" =~ ^[a-f0-9]{64}$ ]]; then
    echo 'EXPECTED_INDEX_SHA256 must be an SHA256 hash.' >&2
    exit 2
fi
for tool in kubectl curl sha256sum; do
    command -v "$tool" >/dev/null || {
        echo "Required command is missing: $tool" >&2
        exit 2
    }
done
[[ -r "$KUBECONFIG" ]] || {
    echo "Cannot read kubeconfig: $KUBECONFIG" >&2
    exit 2
}

KUBE=(kubectl --namespace "$NAMESPACE" --request-timeout=30s)
response_file="$(mktemp)"
trap 'rm -f "$response_file"' EXIT
diagnostics() {
    local rc=$?
    trap - ERR
    set +e
    echo "Deployment failed (exit $rc). Cluster diagnostics follow." >&2
    "${KUBE[@]}" get deployments,pods,services -o wide
    "${KUBE[@]}" describe pods -l "app=$APP_NAME"
    "${KUBE[@]}" get events --sort-by=.metadata.creationTimestamp
    exit "$rc"
}
trap diagnostics ERR

echo 'STEP 1: Verify Kubernetes connectivity and node readiness'
kubectl --request-timeout=30s cluster-info
kubectl --request-timeout=30s get nodes -o wide
kubectl wait --for=condition=Ready nodes --all --timeout=180s
kubectl --request-timeout=30s get namespace "$NAMESPACE"

echo "STEP 2: Apply deployment using $IMAGE"
"${KUBE[@]}" apply -f - <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $APP_NAME
  labels:
    app: $APP_NAME
spec:
  replicas: $REPLICAS
  selector:
    matchLabels:
      app: $APP_NAME
  template:
    metadata:
      labels:
        app: $APP_NAME
    spec:
      containers:
        - name: web
          image: $IMAGE
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 80
          readinessProbe:
            httpGet:
              path: /
              port: http
            initialDelaySeconds: 2
            periodSeconds: 3
          resources:
            requests:
              cpu: 10m
              memory: 16Mi
            limits:
              cpu: 250m
              memory: 128Mi
YAML

echo 'STEP 3: Expose port 80 through a dynamically assigned NodePort'
"${KUBE[@]}" expose deployment "$APP_NAME" \
    --name="$APP_NAME" --type=NodePort --port=80 --target-port=80 \
    --dry-run=client -o yaml | "${KUBE[@]}" apply -f -

echo "STEP 4: Scale to $REPLICAS replicas and wait for the rollout"
"${KUBE[@]}" scale deployment "$APP_NAME" --replicas="$REPLICAS"
# Pull the current v1 image even on repeated runs with the same image tag.
"${KUBE[@]}" rollout restart "deployment/$APP_NAME"
kubectl --namespace "$NAMESPACE" rollout status \
    "deployment/$APP_NAME" --timeout=300s
kubectl --namespace "$NAMESPACE" wait --for=condition=Ready pods \
    -l "app=$APP_NAME" --timeout=180s
ready="$("${KUBE[@]}" get deployment "$APP_NAME" \
    -o jsonpath='{.status.readyReplicas}')"
if [[ ! "$ready" =~ ^[0-9]+$ ]] || (( ready < REPLICAS )); then
    echo 'The required number of replicas is not ready.' >&2
    exit 1
fi

echo 'STEP 5: Display deployment, service, pod images and readiness'
"${KUBE[@]}" get deployments,pods,services -o wide
"${KUBE[@]}" get pods -l "app=$APP_NAME" \
    -o 'custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[0].image,PHASE:.status.phase,READY:.status.containerStatuses[0].ready'
node_port="$("${KUBE[@]}" get service "$APP_NAME" \
    -o jsonpath='{.spec.ports[0].nodePort}')"
node_ip="$(kubectl --request-timeout=30s get nodes \
    -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')"
if [[ ! "$node_port" =~ ^[0-9]+$ ]] || [[ -z "$node_ip" ]]; then
    echo 'The NodePort or node internal IP could not be read.' >&2
    exit 1
fi

echo 'STEP 6: Verify HTTP through the NodePort from ansible-node2'
curl --fail --silent --show-error --retry 5 --retry-connrefused \
    --retry-delay 2 --max-time 15 \
    "http://$node_ip:$node_port/" --output "$response_file"
actual_sha256="$(sha256sum "$response_file" | cut -d ' ' -f 1)"
if [[ -n "$EXPECTED_INDEX_SHA256" &&
      "$actual_sha256" != "$EXPECTED_INDEX_SHA256" ]]; then
    echo 'The served page differs from the mini-project index.html.' >&2
    exit 1
fi
printf 'HTTP verification passed. index.html SHA256: %s\n' "$actual_sha256"
printf 'NODEPORT=%s\n' "$node_port"
if [[ -n "$NODE_PUBLIC_IP" ]]; then
    printf 'BROWSER_URL=http://%s:%s/\n' "$NODE_PUBLIC_IP" "$node_port"
fi
echo 'DEPLOYMENT_SUCCESS'
