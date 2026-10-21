# Professional systems portfolio

The current design uses DM Sans, warm white, charcoal and restrained plum, burgundy and brass accents. A clean portrait, clear career details and simple workflow diagrams keep attention on engineering, automation and technical delivery.

## Motion

- Staggered entrance animations introduce the hero.
- Sections fade and rise slightly as they enter the viewport, using one IntersectionObserver that disconnects on cleanup.
- A small animated connection line reinforces the relationship between systems, software and people.
- Links, buttons and project diagrams have restrained hover feedback.

Content is visible in the server-rendered page. Scroll reveals only activate after JavaScript loads, and the site remains readable when JavaScript or IntersectionObserver is unavailable. Reduced-motion preferences disable entrance, connection and hover animations; changing that preference restores any pending content immediately.

## Assets

The original portrait of Umar is used without generated alterations. Project diagrams are illustrative overviews based on the supplied project descriptions, not production screenshots. The e-vouchers visual makes no additional product capability claims.

DM Sans is self-hosted as a Latin WOFF2 subset. Its SIL Open Font License is included at `public/fonts/OFL-DM-Sans.txt`. Source: <https://github.com/google/fonts/tree/main/ofl/dmsans>. No remote font requests or animation libraries are needed.
