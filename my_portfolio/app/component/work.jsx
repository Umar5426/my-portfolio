"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets, workData } from "@/assets/assets";

const Work = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("Full-Stack");
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredProjects = workData.filter(
    (project) => project.category === activeTab
  );

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  return (
    <section id="work" className="w-full px-[12%] py-16 scroll-mt-20">
      <h4 className="text-center text-lg mb-2">My Portfolio</h4>
      <h2 className="text-center text-5xl font-semibold mb-10">
        My Latest Work
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        {["Full-Stack", "AI/ML"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setVisibleCount(3);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all border ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent"
                : "border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {tab} Projects
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-10">
        {visibleProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-gray-300 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg dark:hover:bg-gray-800"
          >
            {/* Image */}
            <div className="sm:w-1/3">
              <Image
                src={project.bgImage}
                alt={project.title}
                width={500}
                height={300}
                className="rounded-xl object-cover w-full h-52 sm:h-56"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-center text-left">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {project.description}
              </p>
              <p className="text-sm mb-3">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Tools:
                </span>{" "}
                {project.tools.join(", ")}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Company:
                </span>{" "}
                {project.company}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Show More */}
      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 border border-gray-600 rounded-full text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default Work;
