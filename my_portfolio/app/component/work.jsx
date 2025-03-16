import { assets, workData } from '@/assets/assets';
import React from 'react'

const Work = () => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
        <h4 className="text-center text-lg mb-2">My Portfolio</h4>
        <h2 className="text-center text-5xl">My Latest Work</h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>
            Welcome to my portfolio! Here you can find some of my latest projects. Explore a collection of projects
            I have worked on, ranging from web development to data science.
        </p>
      
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {workData.map((project, index) => (
                <div key={index}
                className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
                style={{ backgroundImage: `url(${project.bgImage})` }}
            >
                    <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 
                            flex items-center justify-between duration-500 group-hover:bottom-7">
                        <div>
                            <h2 className="font-semibold">{project.title}</h2>
                            <p className="text-sm text-gray-700">{project.description}</p>
                        </div>
                        <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-rose-50 transition">
                            <img src={assets.send_icon} alt="work" className="w-5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>



    </div>
  )
}

export default Work;