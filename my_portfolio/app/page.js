'use client'
import Navbar from "./component/navbar"
import Header from "./component/header"
import About from "./component/about";
import Work from "./component/work";
import Contact from "./component/contact";
import Footer from "./component/footer";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Header/>
      <About/>
      <Work/>
      <Contact/>
      <Footer/>
    </>
  );
}
