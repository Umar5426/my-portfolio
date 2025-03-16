import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const Header = () => {
  return (
    <div>
        <div>
            <Image src={assets.profile_img} alt='profile image' className='rounded-full w-32'/>
        </div>

        <h3 className='flex item-end gap-2 tex-x1 md:text-2xl mb-3 font-Ovo'>Umar Khan
            <Image src={assets.hand_icon} alt='profile image' className='rounded-full w-6'/>
        </h3>

        <h1 className='text-3xl sm:text-6xl lg:text- [66px] font-Ovo'>
        <Image src={assets.location_icon} alt='profile image' className='rounded-full w-6'/>
            Calgary, AB
        </h1>
        <h1 className='text-3xl sm:text-6xl lg:text- [66px] font-Ovo'>
            Full-Stack Software Engineer
        </h1>

        <p className='max-w-2xl mx-auto font-Ovo'>
        I'm a full-stack software engineer with a strong focus on React and modern web development. I have experience working across the stack, building scalable and efficient applications. I'm knowledgeable in both front-end and back-end development, with hands-on experience in various frameworks, languages, and database technologies. I also focus on authentication and security, ensuring applications are well-protected.
        </p>

        <div className='flex flex-col sm:flex items-center gap-4 mt-4'>
            <a href="contact" className='px-10 ppy-3 border border-white rounded-full bg-black text-white flex items-center gap-2'>
                Contact Me
                <Image src={assets.right_arrow_white} alt='white right arrow' className='rounded-full w-4'/>
            </a>
            <a href="/sample-resume.pdf" download className='px-10 py-4 border rounded-full border-gray-500 flex items-center gap-2'>
                My Resumé
                <Image src={assets.download_icon} alt='download button' className='rounded-full w-4'/>
            </a>
        </div>
    </div>
  )
}

export default Header