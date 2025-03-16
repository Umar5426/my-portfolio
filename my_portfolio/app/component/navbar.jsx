import React, { useRef } from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Navbar = () => {
    const sideMenuRef = useRef();
    
    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)';
    };
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)';
    };

  return (
    <>
    <div className='fixed top-0 right-0 w-11/12 h-1/2'>
        <Image src={assets.header_bg_color} alt='' className='w-full'/>
    </div>
        <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex 
            items-center justify-between z-50">
            <a href="#top">
                <Image 
                src={assets.logo} 
                alt="Logo"
                className='w-28 cursor-pointer mr-12' 
                />
            </a>

            <ul className='hidden lg:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 
                bg-white bg-opacity-90 backdrop-blur-lg'>
                <li><a href="#top">Home</a></li>
                <li><a href="#about">About me</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">My Work</a></li>
                <li><a href="#contact">Contact Me</a></li>
            </ul>
            
            <div className='flex items-center gap-4'>

                <button>
                    <Image src={assets.moon_icon} alt='' width={30} height={30}/>
                </button>

                <a href='#contact' className='hidden lg:flex items-center gap-3 px-10 py-2.5 border
                 border-gray-500 rounded-full nl-4'> 
                    Contact
                    <Image 
                        src={assets.arrow_icon}
                        alt="Arrow Icon" className='w-3 h-3'
                        />
                </a>

                <button className='block md:hidden ml-3 cursor-pointer' onClick={openMenu}>
                    <Image src={assets.menu_black} alt='' className='w-6'/>
                </button>
            </div>

            {/* Mobile Menu */}
            <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 
            bottom-0 z-50 h-screen bg-rose-50 transition duration-300'>

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