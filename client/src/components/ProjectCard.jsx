// client/src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { VscGithubInverted } from "react-icons/vsc";
import { FiRss } from "react-icons/fi";
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-3">
            <a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <span className="sr-only">Live Demo</span>
              {/* Icon would go here */}
              <FiRss />
            </a>
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              {/* Icon would go here */}
              <VscGithubInverted />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;