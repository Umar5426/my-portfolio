import { assets } from '@/assets/assets';
import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center text-lg mb-2">Introduction</h4>
      <h2 className="text-center text-5xl">About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.user_image} alt='user image' className='w-full rounded-3xl max-w-[100x]'/>
        </div>
        <div className='flex-1'>
            <p>
            I am a Full Stack Software Engineer based in Calgary, with a strong foundation in both frontend 
            and backend development. My expertise spans a wide range of technologies and methodologies, including 
            programming languages such as Java, Python, JavaScript, TypeScript, C++, and SQL. I have hands-on 
            experience in designing and building scalable, efficient applications using modern frameworks like 
            React.js, Node.js, Next.js, Flask, and Django.

            In addition to my development skills, I am well-versed in key technical concepts such as object-oriented
             design, data structures and algorithms, and machine learning. I also possess strong knowledge in 
             software architecture, UI/UX design, and REST API development, enabling me to build seamless user 
             experiences and robust backend systems. My experience extends to working with databases like MongoDB and
              MySQL, as well as deploying applications using DevOps practices with Docker, Kubernetes, AWS, and Azure.

            I am also adept in scripting with Python, Bash, and shell scripting, and have practical knowledge of 
            internet protocols such as TCP/IP, UDP, and HTTP. I believe in the importance of clean, maintainable 
            code and strong unit testing practices, which are key to building reliable software solutions.

            Beyond technical expertise, I bring strong communication skills and a collaborative mindset, making me a 
            great team player. I am continually expanding my knowledge in data science, machine learning, and cloud 
            technologies to stay at the forefront of the industry.

            My goal is to continue developing my full stack engineering skills and contribute to building innovative,
             high-quality solutions that make a real impact.
            </p>
        </div>
      </div>
    </div>
  );
};

export default About;