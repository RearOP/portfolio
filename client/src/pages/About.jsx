// client/src/pages/About.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    // Animate heading
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate skill bars on scroll
    gsap.utils.toArray('.skill-bar').forEach((bar, i) => {
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: bar.dataset.percent,
          duration: 1.5,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: bar,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate experience cards
    gsap.utils.toArray('.experience-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'React', percent: '90%' },
    { name: 'Node.js', percent: '85%' },
    { name: 'MongoDB', percent: '80%' },
    { name: 'Express.js', percent: '85%' },
    { name: 'JavaScript', percent: '95%' },
    { name: 'CSS/Tailwind', percent: '90%' },
    { name: 'GSAP', percent: '75%' },
    { name: 'Framer Motion', percent: '80%' },
  ];

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Led development of multiple React applications, improved performance by 40%, and mentored junior developers.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      period: '2019 - 2021',
      description: 'Developed full-stack applications using MERN stack, implemented RESTful APIs, and collaborated with design team.'
    },
    {
      title: 'Web Developer',
      company: 'Creative Web Agency',
      period: '2017 - 2019',
      description: 'Built responsive websites for various clients, implemented UI/UX designs, and optimized for SEO.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-20"
      ref={sectionRef}
    >
      <div className="">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-md text-white/80 max-w-3xl mx-auto">
            I'm a passionate full-stack developer with over 5 years of experience creating digital experiences that users love.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-20" ref={skillsRef}>
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-white ">{skill.percent}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="skill-bar h-full bg-zinc-600 rounded-full"
                    data-percent={skill.percent}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */ }
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Work Experience</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <motion.div
            key={index}
            className="experience-card bg-white p-6 rounded-xl shadow-lg"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-black">{exp.title}</h3>
              <span className="text-zinc-600 font-medium">{exp.period}</span>
            </div>
            <p className="text-gray-600 mb-2">{exp.company}</p>
            <p className="text-gray-700">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-semibold text-black">Bachelor of Science in Computer Science</h3>
              </div>
              <p className="text-zinc-600 font-light mb-2">2013 - 2017</p>
              <p className="text-zinc-900 mb-2">University of Technology</p>
              <p className="text-gray-700">
                Graduated with honors. Specialized in web development and user experience design. 
                Participated in multiple hackathons and coding competitions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;