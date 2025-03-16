import React from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Footer = () => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <Image src={assets.logo} alt="logo" className="w-36 mx-auto mb-2" />
        </div>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={assets.mail_icon} alt="mail icon" className="w-6" />
            muhammed.khan@ucalgary.ca
        </div>

        <div className='text-center sm:flx items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
            <p>&copy; 2025 Muhammed Umar Khan. All rights reserved.</p>
            <ul className='flex items-center gao-10 justify-center mt-4 sm:mt-0'>
                <li><a target='_blank' href='https://github.com/Umar5426'>Github</a></li>
                <li><a target='_blank' href='www.linkedin.com/in/muhammedumarkhan'>LinkedIn</a></li>
            </ul>
        </div>
    </div>
  )
};

export default Footer;