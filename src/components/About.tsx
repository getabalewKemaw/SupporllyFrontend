// src/components/AboutSection.tsx
import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { type AboutItem, aboutItems } from "../constants/about";

const About: React.FC = () => {
  return (
    <section className="py-20 bg-black text-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#5032a8] mb-4">About Soportlly</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Learn more about our mission, vision, and why Soportlly is the best AI-powered support solution.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-20 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-7xl mx-auto p-8">
        {aboutItems.map((item: AboutItem) => (
          <motion.div
            key={item.id}
            className="relative bg-gray-800 rounded-xl p-6 shadow-md overflow-hidden group"
            style={{ width: "320px", minHeight: "340px" }}
            whileHover={{
              rotateY: 8,
              rotateX: 8,
              scale: 1.04,
              transition: { duration: 0.3 },
            }}
          >
            {/* Animated gradient blur border */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none -z-10"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#5032a8] to-[#7a5af8] blur"
                animate={{ filter: ["blur(6px)", "blur(12px)"] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* Content wrapper */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="flex justify-center items-center w-16 h-16 bg-[#5032a8]/10 rounded-full mb-4">
                <Icon icon={item.icon} className="text-9xl text-[#5032a8]" />
              </div>
              <h3 className="text-xl font-bold text-center text-[#5032a8] mb-2">{item.title}</h3>
              <p className="text-gray-300 text-center">{item.description}</p>
             
             
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
