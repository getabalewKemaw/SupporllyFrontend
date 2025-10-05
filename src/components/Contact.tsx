"use client"

import type React from "react"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

type ContactInfo = {
  id: number
  icon: string
  title: string
  value: string
  link: string
}

const contacts: ContactInfo[] = [
  {
    id: 1,
    icon: "mdi:email-outline",
    title: "Email",
    value: "supportly@gmail.com",
    link: "mailto:supportly@gmail.com",
  },
  {
    id: 2,
    icon: "mdi:phone-outline",
    title: "Phone",
    value: "+1 (234) 567-890",
    link: "tel:+1234567890",
  },
  {
    id: 3,
    icon: "mdi:map-marker-outline",
    title: "Location",
    value: "Addis Ababa, Ethiopia",
    link: "https://goo.gl/maps/example",
  },
]

const Contact: React.FC = () => {
  return (
    <section className="relative py-20 bg-black overflow-hidden" id="contact">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#5032a8]/5 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd love to hear from you! Reach out anytime.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {contacts.map((contact: ContactInfo, index: number) => (
            <motion.a
              key={contact.id}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ perspective: 1000 }}
            >
              {/* Animated rotating gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5032a8] via-[#7a5af8] to-[#5032a8] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-[spin_3s_linear_infinite]" />

              {/* Card content */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 group-hover:border-[#5032a8]/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <motion.div
                    className="relative flex justify-center items-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-700 group-hover:border-[#7a5af8] transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon
                      icon={contact.icon}
                      className="text-4xl text-[#7a5af8] group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-[#7a5af8] transition-colors duration-300">
                  {contact.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300 break-words">
                  {contact.value}
                </p>

                {/* Underline effect */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mt-4 group-hover:w-16 transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 text-base sm:text-lg mb-6">Prefer to message us directly?</p>
          <motion.a
            href="mailto:supportly@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-[#5032a8]/30 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="mdi:email-send-outline" className="text-xl" />
            Send us a Message
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
