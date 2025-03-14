import React from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Navbar = () => {
  return (
    <>
    <div className='fixed top-0 right-0 w-11/12 h-1/2'>
        <Image src={assets.header_bg_color.png} alt='' className='w-full'/>
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

            <ul className="hidden lg:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 
                bg-white bg-opacity-20 backdrop-blur-lg">
                <li><a href="#top">Home</a></li>
                <li><a href="#about">About me</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#work">My Work</a></li>
                <li><a href="#contact">Contact Me</a></li>
            </ul>
            
            <div>
                <a href='#contact' className='hidden lg:flex items-center gap-3 px-10 py-2.5 border
                 border-gray-500 rounded-full nl-4'> 
                    Contact
                    <Image 
                        src={assets.arrow_icon}
                        alt="Arrow Icon" className='w-3 h-3'
                        />
                </a>
            </div>
        </nav>
    </>
  )
}

export default Navbar