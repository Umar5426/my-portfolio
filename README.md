# Umar Khan — Portfolio

Personal portfolio for Umar Khan, IT Systems Manager at Checker Cabs in Calgary.

The site features e-vouchers, created for Checker Cabs, alongside selected software projects and previous experience at MBC Shahid and Al Arabiya News Channel. E-vouchers enquiries go to Checker Sales. The voucher graphic is an illustration, not a product screenshot or a redeemable voucher.

## Development

Use Node.js 22 or later. The existing Vercel project uses Node.js 22.

```sh
cd my_portfolio
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run build
npm audit
npm run start
```

`npm run lint` runs Biome's recommended code and accessibility checks, import organization, and formatting with warnings treated as failures. Next.js 16 and React 19 render the page content on the server. Plain CSS handles the responsive layout and a small client component handles navigation and theme preferences.

Before publishing, check desktop and mobile layouts, the mobile menu (including keyboard navigation), anchor links, theme persistence, image loading and contact links. Check the production browser console for errors.

## Content

- `my_portfolio/lib/portfolio.js`: employer, title, contact details, experience and selected projects.
- `my_portfolio/app/page.js`: page sections and e-vouchers feature.
- `my_portfolio/app/styles/`: design, responsive layout and both themes.
- `my_portfolio/public/social-card.svg`: sharing artwork; regenerate its PNG after changes.

Checker Sales' public number, 403-974-1156, was verified on the official Checker Group website on October 21, 2026. Current role and e-vouchers attribution were supplied by Umar. Earlier experience is based on the repository's existing resume. No usage, revenue or performance metrics are claimed.

## Deployment

The existing Vercel project is `umars-portfolio`, rooted at `my_portfolio`, with production at https://umars-portfolio-one.vercel.app. Preserve the committed lockfile and deploy to the existing project. No API keys or environment variables are required. Contact links open email or telephone apps.
