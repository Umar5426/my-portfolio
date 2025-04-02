import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import ThemeToggle from '../theme/themeToggle';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const sideMenuRef = useRef();
    const [isScroll, setIsScroll] = useState(false);

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)';
    };
    
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)';
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`w-full fixed top-0 left-0 px-5 lg:px-8 xl:px-[8%] py-4 flex 
                items-center justify-between z-50 transition-all
                ${isScroll ? "bg-white/50 bg-opacity-50 backdrop-blur-lg shadow-lg dark:bg-[#11001f] dark:shadow-white/20" : ""}`}>

                <a href="#top">
                    <Image 
                        src={isDarkMode ? assets.logo_dark : assets.logo} 
                        alt="Logo"
                        className='w-28 cursor-pointer mr-14' 
                    />
                </a>

                <ul className={`hidden md:flex items-center gap-6 lg:flex rounded-full px-12 py-3 
                ${isScroll ? "" : "bg-white/50 shadow-lg bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"}`}>
                    <li><a href="#top">Home</a></li>
                    <li><a href="#about">About me</a></li>
                    <li><a href="#work">My Work</a></li>
                    {/*<li><a href="#education">Education</a></li>*/}
                    <li><a href="#contact">Contact Me</a></li>
                </ul>
                
                <div className='flex items-center gap-4'>
                    <ThemeToggle />
                    
                    <a href='#contact' className='hidden lg:flex items-center gap-3 px-10 py-2.5 border
                     border-gray-500 rounded-full nl-4 font-Ovo dark:border-white/50 dark:text-white'> 
                        Contact
                        <Image 
                            src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
                            alt="Arrow Icon" className='w-3 h-3'
                        />
                    </a>

                    <button className='block md:hidden ml-3 cursor-pointer' onClick={openMenu}>
                        <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='Menu' className='w-6' />
                    </button>
                </div>

                {/* Mobile Menu */}
                <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 
                bottom-0 z-50 h-screen bg-rose-50 transition-transform duration-300 dark:bg-[#3a1a4d] dark:text-white'>

                    <div className="absolute top-5 right-5 cursor-pointer" onClick={closeMenu}>
                        <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='Close' width={20} />
                    </div>

                    <li><a onClick={closeMenu} href="#top">Home</a></li>
                    <li><a onClick={closeMenu} href="#about">About me</a></li>
                    <li><a onClick={closeMenu} href="#work">My Work</a></li>
                    <li><a onClick={closeMenu} href="#education">Education</a></li>
                    <li><a onClick={closeMenu} href="#contact">Contact Me</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
