import { assets, workData } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';

const Work = (isDarkMode) => {
  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center text-lg mb-2">My Portfolio</h4>
      <h2 className="text-center text-5xl">My Latest Work</h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12">
        Welcome to my portfolio! Here you can find some of my latest projects. Explore a collection of projects
        I have worked on, ranging from web development to data science.
      </p>

      <div className="grid gap-5 " style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {workData.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group border-[0.5px] border-gray-700"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 
                flex items-center justify-between duration-500 group-hover:bottom-7 border-[0.5px] border-gray-700">
              <div>
                <h2 className="font-semibold text-black">{project.title}</h2>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
              <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-rose-50 transition">
                <Image src={assets.send_icon} alt="work" className="w-5" />
              </div>
            </div>
          </a>
        ))}
      </div>

{/* 
      <a
        href=""
        className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px]
         border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-gray-200 duration-500 dark:bg-white"
      >
        Show more <Image src={assets.right_arrow_bold} alt="Right arrow" className="w-4" />
      </a>
*/}
    </div>
  );
};

export default Work;
