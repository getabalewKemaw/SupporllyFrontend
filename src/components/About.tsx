"use client"

import type React from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

interface AboutItem {
  id: number
  icon: string
  title: string
  description: string
}

const aboutItems: AboutItem[] = [
  {
    id: 1,
    icon: "mdi:robot-excited",
    title: "AI-Powered Intelligence",
    description:
      "Advanced AI algorithms provide instant, context-aware responses to customer queries with unprecedented accuracy.",
  },
  {
    id: 2,
    icon: "mdi:image-multiple",
    title: "Visual Analysis",
    description:
      "Upload images and get intelligent analysis. Our AI understands visual context to provide better support.",
  },
  {
    id: 3,
    icon: "mdi:history",
    title: "Complete History",
    description:
      "Never lose track of conversations. Full history tracking ensures seamless customer experience across sessions.",
  },
  {
    id: 4,
    icon: "mdi:lightning-bolt",
    title: "Instant Responses",
    description:
      "Real-time AI processing delivers answers in milliseconds, keeping your customers engaged and satisfied.",
  },
  {
    id: 5,
    icon: "mdi:shield-check",
    title: "Secure & Private",
    description: "Enterprise-grade security ensures your data and customer information remain protected at all times.",
  },
  {
    id: 6,
    icon: "mdi:chart-line",
    title: "Analytics Dashboard",
    description:
      "Track performance metrics, customer satisfaction, and AI accuracy with comprehensive analytics tools.",
  },
]

const About: React.FC = () => {
  return (
    <section className="py-20 bg-black text-gray-100 relative overflow-hidden">
      {/* Background gradient effect matching hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#5032a8]/5 to-black pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">About </span>
            <span className="text-[#5032a8] drop-shadow-[0_0_30px_rgba(80,50,168,0.8)]">Soportlly</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 text-2xl max-w-2xl mx-auto leading-relaxed "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn more about our mission, vision, and why Soportlly is the best AI-powered support solution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated rotating gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5032a8] via-[#7c3aed] to-[#5032a8] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

              <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, #5032a8, #7c3aed, #a855f7, #7c3aed, #5032a8)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Card content */}
              <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-800 group-hover:border-[#5032a8]/50 transition-all duration-500">
                {/* Icon container with glow effect */}
                <motion.div
                  className="flex justify-center items-center w-20 h-20 bg-gradient-to-br from-[#5032a8]/20 to-[#7c3aed]/20 rounded-2xl mb-6 mx-auto relative overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5032a8] to-[#7c3aed] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <Icon
                    icon={item.icon}
                    className="text-5xl text-[#5032a8] group-hover:text-[#7c3aed] transition-colors duration-500 relative z-10"
                  />
                </motion.div>

                {/* Title with gradient on hover */}
                <h3 className="text-4xl md:text-3xl font-bold text-center mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5032a8] group-hover:to-[#7c3aed] transition-all duration-500">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors duration-500 text-2xl">
                  {item.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#5032a8] to-[#7c3aed] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: 48 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements matching hero style */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#5032a8]/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#7c3aed]/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </section>
  )
}

export default About
