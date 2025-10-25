import { assets, infoList, toolsData } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';

const About = ({ isDarkMode }) => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center text-lg mb-2">Introduction</h4>
      <h2 className="text-center text-5xl font-semibold">About Me</h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        {/* Profile Image */}
        <div className="w-64 sm:w-80 rounded-3xl max-w-none">
          <Image
            src={assets.user_image}
            alt="user image"
            className="rounded-3xl shadow-lg"
            width={400}
          />
        </div>

        {/* About Content */}
        <div className="flex-1">
          <p className="mb-10 max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300">
            I’m a <span className="font-semibold">Full-Stack and AI Engineer</span> based in Calgary, Alberta, currently
            pursuing a B.S. in Software Engineering at the <span className="font-semibold">University of Calgary</span>.
            I’m an <span className="font-semibold">incredibly fast learner</span> with a strong background in
            <span className="font-semibold"> UX/UI design, full-stack development, and AI-driven automation</span>.
            My passion lies in crafting intuitive digital experiences that combine design thinking with intelligent,
            scalable solutions.
          </p>

          <p className="mb-10 max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300">
            With <span className="font-semibold">international experience</span> spanning the U.S., Canada, and the UAE,
            I’ve worked in both freelance and corporate environments. During my internship at
            <span className="font-semibold"> MBC Shahid</span>, I enhanced customer journey flows and built scalable design
            solutions for a global audience. Before that, I contributed to software infrastructure and mobile UX at
            <span className="font-semibold"> Al Arabiya News Channel</span>, where I helped build internal tools and
            multi-platform apps with <span className="font-semibold">React, Next.js, Tailwind CSS, Prisma,</span> and
            <span className="font-semibold"> MongoDB</span>.
          </p>

          <p className="mb-16 max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300">
            I’m passionate about integrating <span className="font-semibold">AI and machine learning</span> into modern
            development workflows; from intelligent UI components to automated backend systems. I’m always exploring new
            technologies in <span className="font-semibold">data science, cloud computing, and user experience design</span>
            to stay ahead in an ever-evolving field.
          </p>

          {/* Info List */}
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <li
                key={index}
                className="border border-gray-400 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:bg-rose-50 
                hover:-translate-y-1 duration-500 dark:bg-purple-900 dark:hover:bg-purple-700"
              >
                <Image
                  src={isDarkMode ? iconDark : icon}
                  alt={title}
                  className="w-7 mt-3"
                />
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm dark:text-white">
                  {description}
                </p>
              </li>
            ))}
          </ul>

          {/* Tools Section */}
          <h4 className="my-6 text-gray-700 dark:text-white text-lg font-semibold">
            Tools & Technologies I Work With
          </h4>
          <ul className="flex flex-wrap items-center gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer 
                hover:-translate-y-1 duration-500 dark:bg-purple-900 dark:hover:bg-purple-700"
              >
                <Image src={tool} alt="tool" className="w-5 sm:w-7" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
