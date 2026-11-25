# Umar Khan — Portfolio

Personal portfolio built with Next.js and React. This branch includes the course deployment configuration for Docker, Kubernetes and Ansible.

## Pages

- Home: professional overview, selected work and contact information.
- Projects: searchable projects with category filters, saved selections and individual detail pages.
- Experience: industry roles, leadership experience, technical skills and résumé download.
- Contact: validated form with an email draft preview and copy action. Messages are sent through the visitor’s email app.

The website supports light and dark themes, keyboard navigation and responsive layouts.

## Development

Requires Node.js 22 or later.

```sh
cd my_portfolio
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```

## Static deployment

```sh
npm run build:static
```

The static export is served by Nginx. From the repository root:

```sh
docker build -t portfolio .
docker run --rm -p 81:80 portfolio
```

See [START_HERE.md](START_HERE.md) for Kubernetes and Ansible setup.

## Project structure

- `my_portfolio/app/`: pages, components and styles.
- `my_portfolio/lib/portfolio.js`: profile, experience and skills.
- `my_portfolio/lib/case-studies.js`: project descriptions.
- `my_portfolio/public/`: public assets and résumé.
- `deploy/`: Nginx configuration.
- `deploy-k8s-app.sh`: Kubernetes deployment script.
- `deploy-automation.yml`: Ansible deployment playbook.
- `tests/`: deployment automation tests.

No API keys are required to run the portfolio.
