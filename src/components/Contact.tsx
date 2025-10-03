import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type ContactInfo = {
  id: number;
  icon: string;
  title: string;
  value: string;
  link: string;
};

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
];

const Contact: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900" id="contact">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p 
          className="text-gray-300 text-lg sm:text-xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We'd love to hear from you! Reach out anytime.
        </motion.p>

        {/* Contact Items */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-12 w-full">
          {contacts.map((c: ContactInfo, index: number) => (
            <motion.a
              key={c.id}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative flex justify-center items-center w-20 h-20 bg-gray-800 rounded-full border border-gray-700 group-hover:border-[#7a5af8] transition-all duration-300">
                  <Icon 
                    icon={c.icon} 
                    className="text-3xl text-[#7a5af8] group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#7a5af8] transition-colors duration-300">
                {c.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {c.value}
              </p>

              {/* Underline effect */}
              <div className="w-0 h-0.5 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] mt-2 group-hover:w-12 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Additional Call to Action */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 text-lg mb-6">
            Prefer to message us directly?
          </p>
          <motion.a
            href="mailto:support@example.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5032a8] to-[#7a5af8] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-[#5032a8]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon icon="mdi:email-send-outline" className="text-xl" />
            Send us a Message
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;