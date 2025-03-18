import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

export const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

export const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "Umar's Portfolio",
  description: "This is a portfolio website outlining Muhammed Umar Khan's projects and resumes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
    <body style={{fontFamily: `${outfit.style.fontFamily}, ${ovo.style.fontFamily}`}}
    className="antialiased leading-8 overflow-x-hidden dark:bg-[#11001f] dark:text-white">

        {children}
      </body>
    </html>
  );
}