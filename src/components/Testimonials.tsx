import React from "react";
import { testimonials, type Testimonial } from "../constants/testimonials";
import { motion } from "framer-motion";
const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8]">
          What Our Users Say
        </h2>
        <p className="text-gray-300 mt-4 text-lg sm:text-xl">
          Real feedback from our amazing users
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-20 justify-items-center max-w-7xl mx-auto p-8">
        {testimonials.map((t: Testimonial, index: number) => (
          <motion.div
            key={t.id}
            className="relative bg-gray-800 rounded-xl p-6 shadow-md overflow-hidden group"
            style={{ width: '320px', minHeight: '340px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
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
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-[#5032a8]"
              />
              <h3 className="text-2xl font-bold text-center text-[#5032a8] mb-1">
                {t.name}
              </h3>
              <p className="text-gray-400 text-lg mb-4">{t.role}</p>
              <p className="text-gray-300 text-lg">{t.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;