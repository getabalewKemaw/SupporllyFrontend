"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { footerLinks, socialLinks, footerNote } from "../constants/footer"

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      {/* Animated Divider */}
      <div className="relative">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-[#5032a8] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-[#7a5af8] blur-sm -translate-x-1/2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5032a8] to-[#7a5af8] flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Icon icon="mdi:robot-happy" className="text-white text-xl" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8]">
                Soportlly
              </h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              AI-powered customer support solution for modern businesses.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-base sm:text-lg mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className="text-gray-400 hover:text-[#7a5af8] transition-colors duration-300 text-sm text-left"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="text-center sm:text-left sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-base sm:text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10 hover:border-[#7a5af8] hover:bg-[#5032a8]/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon
                    icon={social.icon}
                    className="text-lg sm:text-xl text-gray-400 group-hover:text-[#7a5af8] transition-colors duration-300"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6 sm:my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Copyright Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-xs sm:text-sm">
            © {footerNote.year} {footerNote.company}. {footerNote.text}
          </p>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-20 left-1/4 w-32 h-32 bg-[#5032a8] rounded-full blur-3xl opacity-10"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-10 right-1/4 w-24 h-24 bg-[#7a5af8] rounded-full blur-3xl opacity-10"
          animate={{
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>
    </footer>
  )
}
