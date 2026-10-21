# Umar Khan — Portfolio

Personal portfolio for Umar Khan, IT Systems Manager at Checker Cabs in Calgary.

The site presents Umar's work at Checker Cabs, Tartigrade Inc., MBC Shahid and Al Arabiya News Channel, alongside technical leadership at MCC Downtown Centre and an employee management project. E-vouchers enquiries go to Checker Sales. Project graphics are decorative illustrations, not product screenshots or redeemable vouchers.

The design presents a professional systems and software portfolio with clean typography, warm white and charcoal surfaces, restrained colour accents, and illustrative project workflows. Subtle entrance, scroll and hover animations respect reduced-motion preferences. Light and dark themes are available. DM Sans is self-hosted; no animation libraries, API keys or external font requests are needed.

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

Before publishing, check desktop and mobile layouts, the mobile menu (including keyboard navigation), anchor links, theme persistence, image loading and contact links. Verify entrance and scroll animations, reduced-motion preferences (including changing the preference while the page is open), and content visibility without JavaScript. Check the production browser console for errors.

## Content

- `my_portfolio/lib/portfolio.js`: employer, title, contact details, experience, leadership, education, skills and selected projects.
- `my_portfolio/app/page.js`: page sections and e-vouchers feature.
- `my_portfolio/app/styles/`: design, responsive layout and both themes.
- `my_portfolio/public/social-card.svg`: sharing artwork; regenerate its PNG after changes.
- `my_portfolio/public/UmarKhanResume.pdf`: current downloadable public résumé.
- `my_portfolio/docs/art-direction.md`: visual direction, motion behaviour, illustrative artwork and font license.

Career titles, dates, education and skills reflect the résumé Umar supplied on October 21, 2026. The claim of over 30 hours saved each week at Checker is supplied by Umar. E-vouchers attribution and sales routing were also supplied by Umar. Checker Sales' public number, 403-974-1156, was verified on the official Checker Group website on October 21, 2026. Tender headers, page footers and the proposed WAV assignment are omitted from the public career history. No extra product capabilities, certifications, customer details or performance figures are inferred.

## Deployment

The existing Vercel project is `umars-portfolio`, rooted at `my_portfolio`, with production at https://umars-portfolio-one.vercel.app. Preserve the committed lockfile and deploy to the existing project. No API keys or environment variables are required. Contact links open email or telephone apps.
