// client/src/components/Hero.jsx (Enhanced for Zoom Animation)
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Hero = () => {
  // const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);


  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 " />
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center justify-center text-center title-body">
          <motion.div
            className="Title text-2xl md:text-4xl lg:text-6xl font-bold mb-4"
            style={{ transformOrigin: "center center" }}
          >
            Mohsin Ansari
          </motion.div>

          <motion.p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 mb-10 font-light max-w-2xl"
          >
            Digital Product Designer & Developer crafting exceptional user
            experiences
          </motion.p>

          <motion.div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              className="px-8 py-4 rounded-full font-medium bg-black text-white relative overflow-hidden group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="px-8 py-4 border border-gray-300 bg-white/80 backdrop-blur-sm rounded-full font-medium hover:border-gray-500 hover:bg-white transition-all duration-300 group relative overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 group-hover:text-black transition-colors">
                Contact Me
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-center">
          <motion.span
            className="text-gray-700 mb-2 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center relative">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>


    </section>
  );
};

export default Hero;
