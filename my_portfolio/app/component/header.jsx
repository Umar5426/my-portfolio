import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Header = ({ isDarkMode }) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center w-11/12 max-w-4xl mx-auto min-h-screen pt-32 px-6">
      {/* Profile + Social Links */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col sm:flex-row items-center gap-6 mb-6"
      >
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={assets.profile_img}
            alt="Profile image"
            className="rounded-full w-32 sm:w-36 shadow-lg"
          />
        </div>

        {/* Name + Location + Socials */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2">
            Hi, I'm Umar Khan
            <Image
            src={assets.hand_icon}
            alt="hand icon"
            className="w-6 inline-block ml-2 hand-wave cursor-pointer"
            />

          </h3>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 dark:text-gray-400 mb-3">
            <Image
              src={isDarkMode ? assets.location_icon_dark : assets.location_icon}
              alt="location icon"
              className="w-5"
            />
            <span>Calgary, AB</span>
          </div>

          <div className="flex justify-center sm:justify-start gap-3">
            <a
              href="https://github.com/Umar5426"
              target="_blank"
              className="transition transform hover:scale-110"
            >
              <Image
                src={isDarkMode ? assets.github_logo_dark : assets.github_logo_light}
                alt="GitHub"
                className="w-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammedumarkhan/"
              target="_blank"
              className="transition transform hover:scale-110"
            >
              <Image
                src={isDarkMode ? assets.linkedin_logo_dark : assets.linkedin_logo_light}
                alt="LinkedIn"
                className="w-6"
              />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Title */}
    <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="text-4xl sm:text-6xl lg:text-[64px] font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 pb-2"
    >
    Full-Stack Engineer&nbsp;&nbsp;|&nbsp;&nbsp;AI &amp; Machine Learning Developer
    </motion.h1>

    {/* Description */}
    <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.9 }}
    className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg"
    >
    I’m an incredibly fast learner and a globally experienced engineer passionate about
    blending <span className="font-semibold">UX/UI design, full-stack development,</span> and
    <span className="font-semibold"> AI-driven automation</span> to build efficient, intelligent
    digital experiences. I’ve collaborated with clients across the U.S. and gained hands-on
    industry experience interning at <span className="font-semibold">Shahid (UAE)</span>, bringing
    both technical versatility and international perspective to every project I take on.
    </motion.p>


      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        {/* Primary CTA */}
        <a
          href="#contact"
          className="px-8 py-3 rounded-full font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          Contact Me
          <Image
            src={isDarkMode ? assets.right_arrow_bold : assets.right_arrow_white}
            alt="arrow"
            className="w-4"
          />
        </a>

        {/* Secondary CTA */}
        <a
          href="/UmarKhanResume.pdf"
          download
          className="px-8 py-3 rounded-full font-medium border dark:border-gray-400 border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          My Resumé
          <Image src={assets.download_icon} alt="download" className="w-4" />
        </a>
      </motion.div>
    </section>
  );
};

export default Header;
