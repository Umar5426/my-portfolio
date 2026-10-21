import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const editorial = localFont({
  src: [
    { path: "./fonts/cormorant-garamond.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/dm-sans.woff2",
  weight: "100 1000",
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://umars-portfolio-one.vercel.app"),
  title: "Umar Khan — IT Systems Manager & Software Engineer",
  description:
    "Umar Khan, IT Systems Manager at Checker Cabs and University of Calgary software engineering graduate. A collection of work in systems, software architecture, product and technical leadership.",
  authors: [{ name: "Muhammed Umar Khan" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Umar Khan — Systems & Software",
    description:
      "IT Systems Manager at Checker Cabs. Creator of e-vouchers. Building useful technology in Calgary, Alberta.",
    type: "website",
    locale: "en_CA",
    url: "/",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Umar Khan — IT Systems Manager at Checker Cabs",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${editorial.variable} ${sans.variable}`}>
        <Script
          id="portfolio-theme"
          strategy="beforeInteractive"
        >{`try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{document.documentElement.dataset.theme='light'}`}</Script>
        {children}
      </body>
    </html>
  );
}
