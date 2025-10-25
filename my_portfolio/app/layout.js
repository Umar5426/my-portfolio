import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./theme/theme-provider";

export const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

export const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "Portfolio",
  description: "This is a portfolio website outlining Muhammed Umar Khan's projects and resumes",
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ]}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
    <head><link rel="favicon" href="/favicon.ico"/></head>
    <body style={{fontFamily: `${outfit.style.fontFamily}, ${ovo.style.fontFamily}`}}
    className="antialiased leading-8 overflow-x-hidden dark:bg-[#11001f] dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}