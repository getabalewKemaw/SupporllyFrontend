// src/components/Card.tsx
import React from 'react';
import { Icon } from '@iconify/react'; // Assuming you're using @iconify/react for icons
import {type Feature, features } from '../constants/features';
import { motion } from 'framer-motion';

const Card: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-20 sm:grid-cols-2 lg:grid-cols-3 justify-items-center max-w-7xl mx-auto p-8">
      {features.map((feature: Feature) => (
        <motion.div
          key={feature.id}
          className="relative bg-gray-800 rounded-xl p-6 shadow-md overflow-hidden group"
          style={{ width: '320px', minHeight: '340px' }}
          whileHover={{
            rotateY: 8,
            rotateX: 8,
            scale: 1.04,
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated border - moved to lower z-index to be behind content */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none -z-10" // Changed z-10 to -z-10
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#5032a8] to-[#7a5af8] blur" // Updated to use brand color #5032a8
              animate={{
                filter: ['blur(6px)', 'blur(12px)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          </motion.div>

          {/* Content wrapper with higher z-index */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="flex justify-center items-center w-16 h-16 bg-[#5032a8]/10 rounded-full mb-4">
              <Icon icon={feature.icon} className="text-9xl text-[#5032a8]" />
            </div>
            <h3 className="text-3xl font-bold text-center text-[#5032a8] mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-center text-xl">{feature.description}</p>
            {feature.cta && (
              <button className="mt-4 w-full bg-[#5032a8] text-white py-2 rounded-md hover:bg-[#5032a8]/90 transition-colors duration-300">
                {feature.cta}
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;