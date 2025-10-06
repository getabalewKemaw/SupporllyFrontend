"use client"

import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"
import { navLinks } from "../constants/navLinks"

export default function Navbar() {
  const [active, setActive] = useState<string>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/80 border-b border-white/10 shadow-lg shadow-purple-500/5"
          : "backdrop-blur-sm bg-black/40"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#5032a8] to-[#7a5af8] flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Icon icon="mdi:robot-happy" className="text-white text-xl sm:text-2xl" />
          </div>
          <span className="text-2xl sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Soportlly
          </span>
        </motion.div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                className={`relative transition-colors duration-300 px-2 py-1 rounded-md text-sm font-medium group ${
                  active === link.id ? "text-[#7a5af8]" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5032a8] to-[#7a5af8]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
                      <div className="px-4 sm:px-6 py-4">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => {
                        setActive(link.id)
                        setMenuOpen(false)
                      }}
                      className={`block text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                        active === link.id
                          ? "text-[#7a5af8] bg-purple-500/10 font-semibold"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-4 flex flex-col gap-3">
                <button className="bg-transparent text-gray-300 px-4 py-2.5 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium border border-white/10">
                  Login
                </button>
                <button className="bg-gradient-to-r from-[#5032a8] to-[#7a5af8] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all duration-300 text-sm font-medium shadow-lg shadow-purple-500/30">
                  Get Started
                </button>
              </div>
            </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-gray-300 px-4 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium"
          >
            Login
          </motion.button>


          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(122, 90, 248, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#5032a8] to-[#7a5af8] text-white px-5 py-2 rounded-lg hover:opacity-90 transition-all duration-300 text-sm font-medium shadow-lg shadow-purple-500/30"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-200 p-2 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon icon={menuOpen ? "mdi:close" : "mdi:menu"} width="24" height="24" />
        </motion.button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-black/95 border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-4">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => {
                        setActive(link.id)
                        setMenuOpen(false)
                      }}
                      className={`block text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                        active === link.id
                          ? "text-[#7a5af8] bg-purple-500/10 font-semibold"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-4 flex flex-col gap-3">
                <button className="bg-transparent text-gray-300 px-4 py-2.5 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium border border-white/10">
                  Login
                </button>
                <button className="bg-gradient-to-r from-[#5032a8] to-[#7a5af8] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all duration-300 text-sm font-medium shadow-lg shadow-purple-500/30">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
