#!/usr/bin/env python3
"""Build the single implementation document from source and genuine screenshots."""
import argparse
import json
from pathlib import Path
import textwrap
from xml.sax.saxutils import escape

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Preformatted,
                               Table, TableStyle, Image, PageBreak, KeepTogether)

ROOT = Path(__file__).resolve().parent
SHOTS = [
    ("01-git-clone.png", "Repository clone on ansible-master", "The git clone command and successful checkout."),
    ("02-docker-build.png", "Docker image build", "The build command, image tag and successful result."),
    ("03-local-container.png", "Local container test", "Host port 81 mapped to container port 80 and a successful HTTP test."),
    ("04-docker-login.png", "Docker Hub login", "The login command and Login Succeeded; hide credentials."),
    ("05-docker-push.png", "Image push", "The push command, v1 tag and resulting registry digest."),
    ("06-dockerhub-tag.png", "Public Docker Hub repository", "The public web-project repository with the v1 tag visible."),
    ("07-ansible-ping.png", "Ansible connectivity", "The test group ping returning SUCCESS and pong for ansible-node2."),
    ("08-syntax-check.png", "Playbook syntax check", "The syntax-check command completing without errors."),
    ("09-check-mode.png", "Ansible check mode", "The --check command, skipped deployment and successful recap."),
    ("10-ansible-playbook.png", "Ansible deployment execution", "The playbook command, script logs and recap with failed=0 and unreachable=0."),
    ("11-node2-verification.png", "Verification inside ansible-node2", "hostname, services, deployment, three Running/Ready pods and their Docker Hub image names."),
    ("12-browser.png", "Website at the public NodePort URL", "The rendered mini-project and browser address bar with the node public IP and actual NodePort."),
]


class Report:
    def __init__(self):
        self.word = Document()
        section = self.word.sections[0]
        section.top_margin = section.bottom_margin = Inches(0.7)
        section.left_margin = section.right_margin = Inches(0.8)
        section.page_width, section.page_height = Inches(8.5), Inches(11)
        for name in ("Normal", "Title", "Subtitle", "Heading 1", "Heading 2", "Caption"):
            style = self.word.styles[name]
            style.font.name = "Calibri"
            style.font.color.rgb = RGBColor(0, 0, 0)
            for border in list(style.element.iter(qn("w:pBdr"))):
                border.getparent().remove(border)
        self.word.styles["Normal"].font.size = Pt(10.5)
        self.word.styles["Normal"].paragraph_format.space_after = Pt(6)
        self.word.styles["Title"].font.size = Pt(22)
        self.word.styles["Heading 1"].font.size = Pt(14)
        self.word.styles["Heading 2"].font.size = Pt(11.5)
        code = self.word.styles.add_style("Source Code", 1)
        code.font.name, code.font.size = "Courier New", Pt(7.5)
        code.paragraph_format.space_before = code.paragraph_format.space_after = Pt(0)
        code.paragraph_format.line_spacing = 1
        code.paragraph_format.keep_with_next = False
        footer = section.footer.paragraphs[0]
        footer.alignment = 2
        run = footer.add_run("Umar Khan  |  SENG 519  |  ")
        run.font.size = Pt(8)
        field = OxmlElement("w:fldSimple")
        field.set(qn("w:instr"), "PAGE")
        footer._p.append(field)
        self.word.core_properties.author = "Umar Khan"
        self.word.core_properties.title = "Container deployment implementation"
        self.story = []
        self.styles = getSampleStyleSheet()
        for name in ("Title", "Heading1", "Heading2"):
            self.styles[name].textColor = colors.black
            self.styles[name].keepWithNext = True
        self.styles["BodyText"].fontName = "Helvetica"
        self.styles["BodyText"].fontSize = 10
        self.styles["BodyText"].leading = 14
        self.styles["BodyText"].spaceAfter = 7
        self.code_style = ParagraphStyle("Code", fontName="Courier", fontSize=7.3,
                                         leading=9.2, spaceAfter=8, alignment=TA_LEFT)

    def title(self, title, subtitle):
        self.word.add_paragraph(title, "Title")
        self.word.add_paragraph(subtitle, "Subtitle")
        self.story.extend([Paragraph(escape(title), self.styles["Title"]),
                           Paragraph(escape(subtitle), self.styles["BodyText"]), Spacer(1, 10)])

    def h(self, text, level=1):
        self.word.add_heading(text, level)
        self.story.append(Paragraph(escape(text), self.styles[f"Heading{level}"]))

    def p(self, text):
        self.word.add_paragraph(text)
        self.story.append(Paragraph(escape(text), self.styles["BodyText"]))

    def code(self, text):
        for line in text.rstrip().splitlines():
            self.word.add_paragraph(line or " ", "Source Code")
        self.word.add_paragraph("")
        self.story.append(Preformatted(text.rstrip(), self.code_style,
                                      maxLineLength=101, splitChars=" ", newLineChars="    "))

    def table(self, headers, rows, widths):
        table = self.word.add_table(rows=1, cols=len(headers))
        table.style = "Table Grid"
        table.autofit = False
        for i, header in enumerate(headers):
            table.rows[0].cells[i].text = header
            for r in table.rows[0].cells[i].paragraphs[0].runs:
                r.bold = True
        repeat = OxmlElement("w:tblHeader")
        table.rows[0]._tr.get_or_add_trPr().append(repeat)
        for row in rows:
            cells = table.add_row().cells
            for i, value in enumerate(row):
                cells[i].text = str(value)
        for row in table.rows:
            for i, cell in enumerate(row.cells):
                cell.width = Inches(widths[i])
                for p in cell.paragraphs:
                    for r in p.runs:
                        r.font.size = Pt(9)
        data = [[Paragraph(escape(str(value)), self.styles["BodyText"]) for value in row]
                for row in [headers] + rows]
        pdf_table = Table(data, colWidths=[w * inch for w in widths], repeatRows=1, hAlign="LEFT")
        pdf_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eeeeee")),
            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#aaaaaa")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ]))
        self.story.extend([pdf_table, Spacer(1, 10)])

    def page(self):
        self.word.add_page_break()
        self.story.append(PageBreak())

    def screenshot(self, path, caption, description):
        self.h(caption, 2)
        self.p(description)
        with PILImage.open(path) as picture:
            width, height = picture.size
        scale = min(6.7 * inch / width, 7.1 * inch / height)
        self.word.add_picture(str(path), width=Inches(width * scale / inch),
                              height=Inches(height * scale / inch))
        self.story.append(Image(str(path), width=width * scale, height=height * scale))

    def save(self, stem):
        stem.parent.mkdir(parents=True, exist_ok=True)
        self.word.save(str(stem.with_suffix(".docx")))
        pdf = SimpleDocTemplate(str(stem.with_suffix(".pdf")), pagesize=(8.5 * inch, 11 * inch),
                                rightMargin=0.8 * inch, leftMargin=0.8 * inch,
                                topMargin=0.7 * inch, bottomMargin=0.7 * inch,
                                title="Container deployment implementation", author="Umar Khan")
        def footer(canvas, doc):
            canvas.setFont("Helvetica", 8)
            canvas.drawRightString(7.7 * inch, 0.36 * inch, f"Umar Khan  |  SENG 519  |  {doc.page}")
        pdf.build(self.story, onFirstPage=footer, onLaterPages=footer)


def create_report(run, screenshots, output, final=False):
    settings = {**json.loads((ROOT / "settings.example.json").read_text()), **run.get("settings", {})}
    report = Report()
    report.title("Container deployment implementation", "Umar Khan | SENG 519 DevOps | Assignment 03")
    report.p("This implementation packages the existing static web mini-project with Nginx, publishes the image to Docker Hub, and uses Ansible on ansible-master to deploy it to Minikube on ansible-node2. The deployment exposes port 80 through a NodePort service and runs at least three pod replicas.")
    if final:
        report.p("The execution record and screenshots below document the deployment. The HTTP checks compare the served index.html with the index.html extracted from the built image using SHA256, in addition to checking pod readiness and rollout completion.")
    else:
        report.h("Deployment evidence pending")
        report.p("The implementation files are prepared. The Docker Hub image and EC2 deployment still require a real execution record and the screenshots listed below. This version is a preparation document and is not ready for submission.")
    pending = "Pending live run"
    report.table(["Item", "Value"], [
        ["Source repository", settings.get("github_url") or pending],
        ["Source branch", settings["github_branch"]],
        ["Source commit", run.get("source_commit") or pending],
        ["Image", run.get("image") or "DOCKERHUB_USERNAME/web-project:v1"],
        ["Controller", run.get("controller") or "ansible-master"],
        ["Target", "ansible-node2 in inventory group test"],
        ["Kubeconfig on target", settings.get("kubeconfig", "/root/.kube/config")],
        ["Namespace and replicas", f"{settings.get('namespace', 'default')} / {settings.get('replicas', 3)} replicas"],
        ["Browser URL", run.get("browser_url") or pending],
        ["Execution UTC", run.get("run_utc") or pending],
    ], [1.6, 5.2])
    report.h("1 Docker containerization and registry")
    report.p("The Dockerfile first uses Node.js 22 to install the locked dependencies and export the existing Next.js portfolio as static HTML, CSS, JavaScript and assets. Its runtime stage uses Nginx stable Alpine to serve the generated out directory on port 80. The runtime image does not include Node.js, source files or package dependencies. A Docker ignore file excludes credentials and generated local files.")
    report.code((ROOT / "Dockerfile").read_text())
    report.h("Nginx configuration", 2)
    report.code((ROOT / "deploy" / "nginx.conf").read_text())
    report.p("The controller runner clones the selected GitHub repository, builds the image, starts a detached test container with port 81 mapped to port 80, and verifies the returned page. It then performs Docker login and pushes the v1 image. A credential-free Docker Hub API request checks that the tag is publicly readable.")
    image = run.get("image") or "${DOCKERHUB_USERNAME}/web-project:v1"
    github = settings.get("github_url") or "${GITHUB_URL}"
    report.code(f"git clone --single-branch --branch ENSF519.02 {github}\ndocker build --pull -t {image} my-portfolio\ndocker run -d --name web-project-local -p 81:80 {image}\ndocker login --username " + (settings.get("dockerhub_username") or "${DOCKERHUB_USERNAME}") + f"\ndocker push {image}")
    report.p("The build context is the cloned repository root. The multi-stage Dockerfile builds my_portfolio and serves only its exported files. The local test container is removed after the run; the deployment on ansible-node2 remains available for verification.")
    report.h("2 Kubernetes deployment shell script")
    report.p("Ansible passes the actual Docker Hub image as the script's first argument. The script verifies cluster connectivity, applies the deployment, exposes a NodePort service, scales to the requested replica count and waits for readiness. The apply operations allow repeated execution without duplicate resource errors. A rollout restart retrieves the current v1 image on repeated runs.")
    report.code((ROOT / "deploy-k8s-app.sh").read_text())
    report.h("3 Ansible inventory and playbook")
    report.p("The existing class inventory remains on ansible-master at /etc/ansible/hosts. Its test group must include the ansible-node2 alias with the configured class SSH user. The node's private IP is used for controller-to-target SSH; the public IP is used by the browser. The runner limits execution to ansible-node2 even if the test group contains additional hosts.")
    report.code("[test]\nansible-node2 ansible_host=NODE2_PRIVATE_IP ansible_ssh_user=ansible_user")
    report.p("The playbook uses become to access the kubeconfig belonging to the root Minikube installation. The script module transfers and executes deploy-k8s-app.sh, and the debug task prints the registered stdout lines. In check mode, only configuration and a read-only cluster connectivity check run; the deployment script is skipped.")
    report.code((ROOT / "deploy-automation.yml").read_text())
    report.h("Execution sequence", 2)
    report.p("The runner writes the actual image username, target kubeconfig, public IP and image-page hash into deployment-vars.json for that run. It then executes the following sequence on ansible-master.")
    report.code("ansible test -i /etc/ansible/hosts --limit ansible-node2 -m ping\nansible-playbook -i /etc/ansible/hosts deploy-automation.yml \\\n  --limit ansible-node2 -e @deployment-vars.json --syntax-check\nansible-playbook -i /etc/ansible/hosts deploy-automation.yml \\\n  --limit ansible-node2 -e @deployment-vars.json --check\nansible-playbook -i /etc/ansible/hosts deploy-automation.yml \\\n  --limit ansible-node2 -e @deployment-vars.json")
    report.h("4 Target verification and evidence")
    report.p("Inside ansible-node2, the verification commands show the service's assigned NodePort, the deployment's desired and ready replicas, and the image used by each running pod. These commands use the same kubeconfig and namespace as the deployment.")
    kubeconfig = settings.get("kubeconfig", "/root/.kube/config")
    namespace = settings.get("namespace", "default")
    app = settings.get("app_name", "web-project")
    report.code(f"hostname\nsudo kubectl --kubeconfig={kubeconfig} -n {namespace} get services\nsudo kubectl --kubeconfig={kubeconfig} -n {namespace} get deployments\nsudo kubectl --kubeconfig={kubeconfig} -n {namespace} get pods -o wide\nsudo kubectl --kubeconfig={kubeconfig} -n {namespace} get pods \\\n  -l app={app} \\\n  -o 'custom-columns=NAME:.metadata.name,IMAGE:.spec.containers[0].image,PHASE:.status.phase,READY:.status.containerStatuses[0].ready'")
    report.p("The browser verification must use http://ANSIBLE_NODE2_PUBLIC_IP:ACTUAL_NODEPORT/ and show the address bar. The browser result and Docker Hub page require actual screenshots. Text logs and local automated tests supplement those screenshots.")
    report.table(["Screenshot", "Evidence status"], [
        [filename, "Included below" if (screenshots / filename).is_file() else "Pending"]
        for filename, _, _ in SHOTS
    ], [3.5, 3.3])
    present = [(f, title, detail) for f, title, detail in SHOTS if (screenshots / f).is_file()]
    for number, (filename, title, detail) in enumerate(present, 1):
        report.page()
        report.screenshot(screenshots / filename, f"Figure {number} {title}", detail)
    report.h("References")
    report.p("Course handout: Assignment 03 Docker-K8s-Ansible, supplied with this assignment.")
    for url in ["https://hub.docker.com/_/nginx", "https://kubernetes.io/docs/reference/kubectl/",
                "https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html"]:
        report.p(url)
    report.save(output)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run", type=Path, help="Actual run-summary.json from run_assignment.py")
    parser.add_argument("--screenshots", type=Path, default=ROOT / "evidence" / "screenshots")
    parser.add_argument("--output", type=Path, default=ROOT / "Assignment03_Implementation_DRAFT")
    parser.add_argument("--final", action="store_true", help="Require successful live run and every screenshot")
    args = parser.parse_args()
    run = json.loads(args.run.read_text()) if args.run else {}
    if args.final:
        if not run.get("pipeline_complete"):
            parser.error("Final output requires a successful actual EC2 run-summary.json.")
        required_steps = {"01-git-clone", "02-docker-build", "04-docker-login", "05-docker-push",
                          "07-ansible-ping", "08-syntax-check", "09-check-mode", "10-ansible-playbook"}
        successful = {s["step"] for s in run.get("steps", []) if s.get("returncode") == 0}
        if not required_steps.issubset(successful):
            parser.error("Required successful execution steps are missing from the live run record.")
        missing = [name for name, _, _ in SHOTS if not (args.screenshots / name).is_file()]
        if missing:
            parser.error("Missing genuine screenshots: " + ", ".join(missing))
        for name, _, _ in SHOTS:
            with PILImage.open(args.screenshots / name) as picture:
                picture.verify()
        if "DRAFT" in args.output.name:
            args.output = args.output.with_name(args.output.name.replace("_DRAFT", ""))
    create_report(run, args.screenshots, args.output, args.final)
    print(args.output.with_suffix(".docx"))
    print(args.output.with_suffix(".pdf"))


if __name__ == "__main__":
    main()
