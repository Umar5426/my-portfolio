import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 py-20'>
    
        <div className="flex items-center gap-4">
            <div>
                <Image src={assets.profile_img} alt="profile image" className="rounded-full w-32" />
            </div>
            <div>
                <h3 className={`text-xl md:text-2xl mb-3 `}>
                    Hi, I'm Umar Khan
                    <Image src={assets.hand_icon} alt="hand icon" className="rounded-full w-6 inline-block ml-2" />
                </h3>
                <h1 className="flex items-center gap-2">
                    <Image src={assets.location_icon} alt="location icon" className="rounded-full w-6" />
                    Calgary, AB
                </h1>
            </div>
        </div>

        <h1 className='text-3xl sm:text-6xl lg:text- [66px] font-Outfit'>
            Full-Stack Software Engineer
        </h1>

        <p className='max-w-2xl mx-auto font-Outfit'>
        I'm a full-stack software engineer with a strong focus on React and modern web development. I have experience working across the stack, building scalable and efficient applications. I'm knowledgeable in both front-end and back-end development, with hands-on experience in various frameworks, languages, and database technologies. I also focus on authentication and security, ensuring applications are well-protected.
        </p>

        <div className="gap-4 mt-4 flex items-center justify-center flex-row">
            <a href="contact" className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2">
                Contact Me
                <Image src={assets.right_arrow_white} alt="white right arrow" className="rounded-full w-4" />
            </a>
            <a href="/sample-resume.pdf" download className="px-10 py-4 border rounded-full border-gray-500 flex items-center gap-2">
                My Resumé
                <Image src={assets.download_icon} alt="download button" className="rounded-full w-4" />
            </a>
        </div>



    </div>
  )
}

export default Header