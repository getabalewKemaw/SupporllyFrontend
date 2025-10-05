"use client"

import type React from "react"
import { Icon } from "@iconify/react"
import { type Step, howItWorks } from "../constants/howItWorks"
import { motion } from "framer-motion"

const HowItWorks: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#5032a8]/5 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-4">
            How It Works
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Follow these simple steps to get instant AI-powered answers with Soportlly
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {howItWorks.map((step: Step, index: number) => (
            <motion.div
              key={step.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              {/* Animated rotating border */}
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#5032a8] via-[#7a5af8] to-[#5032a8] rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-md"
                style={{
                  animation: "spin 3s linear infinite",
                }}
              />

              {/* Card */}
              <motion.div
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 md:p-8 shadow-xl h-full flex flex-col items-center text-center"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Step number badge */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#5032a8] to-[#7a5af8] rounded-full shadow-lg text-xl font-bold text-white"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {step.id}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 bg-[#5032a8]/10 rounded-full mb-6 group-hover:bg-[#5032a8]/20 transition-colors duration-300"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon
                    icon={step.icon}
                    className="text-4xl md:text-5xl text-[#5032a8] group-hover:text-[#7a5af8] transition-colors duration-300"
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-3 group-hover:from-[#7a5af8] group-hover:to-[#5032a8] transition-all duration-300">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  {step.description}
                </p>
              </motion.div>

              {/* Connecting arrow - only visible on lg screens between cards */}
              {index < howItWorks.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Icon
                    icon="mdi:arrow-right"
                    className="text-3xl text-[#5032a8]/50 group-hover:text-[#5032a8] transition-colors duration-300"
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style >{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}

export default HowItWorks
