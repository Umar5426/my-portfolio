import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});


export const metadata = {
  title: "Umar's Porfolio",
  description: "This is a portfolio website outlining Muhammed Umar Khan's projects and resumes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.classname} ${ovo.classname} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
