// src/components/Footer.tsx
import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { footerLinks, socialLinks, footerNote, type FooterLink, type SocialLink } from '../constants/footer';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
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
          className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-[#7a5af8] blur-sm"
          initial={{ scaleX: 0, x: "-50%" }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-4">
              Soportlly
            </h3>
            <p className="text-gray-400 text-lg">
              AI-powered customer support solution for modern businesses.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link: FooterLink) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className="text-gray-400 hover:text-[#7a5af8] transition-colors duration-300 text-left"
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
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social: SocialLink, index: number) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full border border-gray-700 hover:border-[#7a5af8] hover:bg-[#5032a8]/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon 
                    icon={social.icon} 
                    className="text-xl text-gray-400 hover:text-[#7a5af8] transition-colors duration-300" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
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
          <p className="text-gray-400 text-sm">
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
            repeat: Infinity,
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
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;