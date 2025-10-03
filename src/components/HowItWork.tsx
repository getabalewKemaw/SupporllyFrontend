// src/components/HowItWork.tsx
import React from 'react';
import { Icon } from '@iconify/react';
import { type Step, howItWorks } from '../constants/howItWorks';
import { motion } from 'framer-motion';

const HowItWork: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8]">
          How It Works
        </h2>
        <p className="text-gray-300 mt-4 text-lg sm:text-xl">
          Follow these simple steps to get instant AI-powered answers with Soportlly
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 justify-items-center max-w-7xl mx-auto p-8">
        {howItWorks.map((step: Step, index: number) => (
          <motion.div
            key={step.id}
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
              className="absolute inset-0 rounded-xl pointer-events-none -z-10"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#5032a8] to-[#7a5af8] blur"
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
            <div className="relative z-20 flex flex-col items-center text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-[#5032a8]/10 rounded-full mb-4">
                <Icon icon={step.icon} className="text-4xl text-[#5032a8]" />
              </div>

              <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full mb-4 text-2xl font-bold text-white">
                {step.id}
              </div>

              <h3 className="text-2xl font-bold text-center text-[#5032a8] mb-2">
                {step.title}
              </h3>

              <p className="text-gray-300 text-center text-lg">{step.description}</p>

              {/* Arrow connector for larger screens */}
              {index < howItWorks.length - 1 && (
                <div className="absolute top-1/2 right-0 -mr-24 hidden lg:block">
                  <Icon icon="mdi:arrow-right" className="text-4xl text-gray-500" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;