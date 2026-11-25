export const dynamic = "force-static";

export default function sitemap() {
  return [
    { url: "https://umars-portfolio-one.vercel.app", changeFrequency: "monthly", priority: 1 },
    ...[
      "/projects",
      "/experience",
      "/contact",
      ...caseStudies.map(({ slug }) => `/projects/${slug}`),
    ].map((path) => ({
      url: `https://umars-portfolio-one.vercel.app${path}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}

import { caseStudies } from "@/lib/case-studies";
