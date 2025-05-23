import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const Header = ({ isDarkMode }) => {
  return (
    <div className='relative z-10 w-11/12 max-w-3xl text-center mx-auto min-h-screen flex flex-col items-center justify-center gap-4 p-20 pt-24'>
    
        <div className="flex items-center gap-4">
            <div>
                <Image src={assets.profile_img} alt="profile image" className="rounded-full w-32" />
            </div>
            <div>
                <h1 className="flex items-center gap-2">
                    <a href='https://github.com/Umar5426'>
                        <Image src={isDarkMode ? assets.github_logo_dark : assets.github_logo_light} alt="location icon" className=" w-6" />
                    </a>

                    <a href='https://www.linkedin.com/in/muhammedumarkhan/'>
                     <Image src={isDarkMode ? assets.linkedin_logo_dark : assets.linkedin_logo_light} alt="location icon" className=" w-6" />
                    </a>
                </h1>
                <h3 className="text-xl md:text-2xl mb-3">
                    Hi, I'm Umar Khan
                    <Image src={assets.hand_icon} alt="hand icon" className="rounded-full w-6 inline-block ml-2" />
                </h3>
                <h1 className="flex items-center gap-2">
                    <Image src={isDarkMode ? assets.location_icon_dark : assets.location_icon} alt="location icon" className="rounded-full w-6" />
                    Calgary, AB
                </h1>
            </div>
        </div>

        <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-Outfit'>
            Full-Stack Software Engineer
        </h1>

        <p className='max-w-2xl mx-auto font-Outfit'>
        I'm a full-stack software engineer with a strong focus on React and modern web development. I have experience working across the stack, building scalable and efficient applications. I'm knowledgeable in both front-end and back-end development, with hands-on experience in various frameworks, languages, and database technologies. I also focus on authentication and security, ensuring applications are well-protected.
        </p>

        <div className="gap-4 mt-4 flex items-center justify-center flex-row">
            <a href="#contact" className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2">
                Contact Me
                <Image src={isDarkMode ? assets.right_arrow_bold : assets.right_arrow_white} alt="white right arrow" className="rounded-full w-4" />
            </a>
            <a href="/UmarKhanResume.pdf" download className="px-10 py-4 border rounded-full border-gray-500 flex items-center gap-2 dark:bg-white dark:text-black">
                My Resumé
                <Image src={assets.download_icon} alt="download button" className=" w-4" />
            </a>
        </div>

    </div>
  )
}

export default Header;
