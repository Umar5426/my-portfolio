export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://umars-portfolio-one.vercel.app/sitemap.xml",
  };
}
