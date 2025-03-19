import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';
import ThemeToggle from '../theme/themeToggle';

const Navbar = ({isDarkMode, setIsDarkMode}) => {
    const sideMenuRef = useRef();
    const [isScroll, setIsScroll] = useState(false);
    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)';
    };
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)';
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(scrollY > 50) {
                setIsScroll(true);
            }else{
                setIsScroll(false);
            }
    })}, []);

  return (
    <>
        <div className="fixed top-0 right-0 -z-100 translate-y-[-80%] dark:hidden">
            <Image src={assets.header_bg_color} alt="" className="w-full" />
        </div>


        <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex 
            items-center justify-between z-50 
            ${isScroll ? "bg-white/50 bg-opacity-50 backdrop-blur-lg shadow-sx dark:bg-[#11001f] dark:shadow-white/20": ""}`} >
            <a href="#top">
                <Image 
                src={isDarkMode ? assets.logo_dark : assets.logo} 
                alt="Logo"
                className='w-28 cursor-pointer mr-14' 
                />
            </a>

            <ul className={`hidden md:flex items-center gap-6 lg:flex rounded-full px-12 py-3 
            ${isScroll ? "":" bg-white/50 shadow-sx bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"}`}>
                <li><a href="#top">Home</a></li>
                <li><a href="#about">About me</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">My Work</a></li>
                <li><a href="#contact">Contact Me</a></li>
            </ul>
            
            <div className='flex items-center gap-4'>
                {/* Theme Toggle 
                <ThemeToggle/>
                */}
                
                <a href='#contact' className='hidden lg:flex items-center gap-3 px-10 py-2.5 border
                 border-gray-500 rounded-full nl-4 font-Ovo dark:border-white/50 dark:text-white'> 
                    Contact
                    <Image 
                        src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
                        alt="Arrow Icon" className='w-3 h-3'
                        />
                </a>

                <button className='block md:hidden ml-3 cursor-pointer' onClick={openMenu}>
                    <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='' className='w-6'/>
                </button>
            </div>

            {/* Mobile Menu */}
            <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 
            bottom-0 z-50 h-screen bg-rose-50 transition duration-300 dark:bg-[#3a1a4d] dark:text-white'>

                <div style={{ position: 'absolute', top: 10, right: 10 }} onClick={closeMenu}>
                    <Image src={assets.close_black} alt='' className='cursor-pointer' width={20}/>
                </div>

                <li><a onClick={closeMenu} href="#top">Home</a></li>
                <li><a onClick={closeMenu} href="#about">About me</a></li>
                <li><a onClick={closeMenu} href="#services">Services</a></li>
                <li><a onClick={closeMenu} href="#work">My Work</a></li>
                <li><a onClick={closeMenu} href="#contact">Contact Me</a></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar