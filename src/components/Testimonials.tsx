"use client"

import type React from "react"
import { testimonials, type Testimonial } from "../constants/testimonials"
import { motion } from "framer-motion"

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#5032a8]/5 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Real feedback from our amazing users
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={testimonial.id}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Rotating gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5032a8] via-[#7a5af8] to-[#5032a8] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#5032a8] via-[#7a5af8] to-[#5032a8] rounded-2xl opacity-50 group-hover:opacity-75"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Card content */}
              <motion.div
                className="relative bg-black/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 h-full flex flex-col items-center text-center"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* User image with animated border */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#5032a8]"
                  />
                </motion.div>

                {/* User info */}
                <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">{testimonial.role}</p>

                {/* Testimonial message */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                {/* Quote decoration */}
                <motion.div
                  className="mt-6 text-[#5032a8] text-4xl opacity-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                >
                  ❝
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
