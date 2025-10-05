"use client"

import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import type { Feature } from "../constants/features"
import { useState } from "react"

interface FeatureCardProps {
  feature: Feature
  index: number
}

export default function Card({ feature, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from ${index * 60}deg, #5032a8, #7a5af8, #5032a8)`,
        }}
        animate={
          isHovered
            ? {
                rotate: 360,
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#5032a8] to-[#7a5af8] opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500" />

      <motion.div
        className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 h-full border border-gray-800 group-hover:border-[#5032a8]/50 transition-all duration-500"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 bg-[#5032a8]/10 rounded-2xl mb-4 sm:mb-6 mx-auto group-hover:bg-[#5032a8]/20 transition-colors duration-500"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon
            icon={feature.icon}
            className="text-4xl sm:text-5xl text-[#5032a8] group-hover:text-[#7a5af8] transition-colors duration-500"
          />
        </motion.div>

        <h3 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 group-hover:bg-gradient-to-r group-hover:from-[#5032a8] group-hover:to-[#7a5af8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
          {feature.title}
        </h3>

        <p className="text-gray-400 text-center text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-300 transition-colors duration-500">
          {feature.description}
        </p>

        {feature.cta && (
          <motion.button
            className="w-full bg-[#5032a8] text-white py-2.5 sm:py-3 rounded-xl font-medium hover:bg-[#7a5af8] transition-all duration-300 shadow-lg hover:shadow-[#5032a8]/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {feature.cta}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
