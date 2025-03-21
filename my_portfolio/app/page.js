'use client'
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Navbar from "./component/navbar";
import Header from "./component/header";
import About from "./component/about";
import Work from "./component/work";
import Contact from "./component/contact";
import Footer from "./component/footer";

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures hydration happens only on the client
  }, []);

  useEffect(() => {
    if (mounted) {
      const currentTheme = theme === "system" ? systemTheme : theme;
      setIsDarkMode(currentTheme === "dark");
    }
  }, [theme, systemTheme, mounted]);

  if (!mounted) return null; // Prevents hydration mismatch by rendering nothing until mounted

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode}/>
      <About isDarkMode={isDarkMode}/>
      <Work isDarkMode={isDarkMode}/>
      <Contact isDarkMode={isDarkMode}/>
      <Footer isDarkMode={isDarkMode}/>
    </>
  );
}
