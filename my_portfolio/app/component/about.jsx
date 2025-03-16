import { assets, infoList, toolsData } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center text-lg mb-2">Introduction</h4>
      <h2 className="text-center text-5xl">About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.user_image} alt='user image' className='rounded-3xl ' width={400}/>
        </div>
        <div className='flex-1'>
            <p className='mb-20 mx-w-2xl'>
            I am a Full Stack Software Engineer based in Calgary, with a strong foundation in both frontend 
            and backend development. In addition to my development skills, I am well-versed in key technical concepts such as object-oriented
             design, data structures and algorithms, and machine learning.Beyond technical expertise, I bring strong communication skills and a collaborative mindset, making me a 
            great team player. I am continually expanding my knowledge in data science, machine learning, and cloud 
            technologies to stay at the forefront of the industry.
            </p>

            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                {infoList.map(({icon, iconDark, title, description}, index) => (
                    <li key={index} className='border border-gray-400 rounded-xl p-6 cursor-pointer 
                      hover:shadow-lg hover:bg-rose-50 hover:-translate-y-1 duration-500'>
                        <Image src={icon} alt={title} className='w-7 mt-3'/>
                        <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                        <p className='text-gray-600 text-sm'>{description}</p>
                    </li>
                ))}
            </ul>

            <h4>Tools I Use</h4>
            <ul>
              {toolsData.map((tool, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <Image src={tool} alt='tool' className='w-5 sm:w-7'/>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default About;