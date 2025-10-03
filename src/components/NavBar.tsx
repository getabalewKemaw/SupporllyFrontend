import React, { useState, useEffect } from "react";
import '../styles/globals.css'
import { Icon } from "@iconify/react";

import { navLinks } from "../constants/navLinks";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled ? "backdrop-blur-md bg-black/70" : "backdrop-blur-sm bg-black/40"
      } divider-bottom`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 sm:py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Soportlly Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-white">
            <span style={{ color: "var(--brand)" }}>Soportlly</span>
          </span>
        </div>

        {/* Desktop Links */}
        <ul className=" md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setActive(link.id)}
                className={`transition px-2 py-1 rounded-md text-sm font-medium ${
                  active === link.id
                    ? "text-[var(--brand)]]"
                    : "text-gray-300 hover:text-[var(--brand)]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button className="bg-transparent text-gray-300 px-3 py-2 rounded-md hover:text-white text-sm">
            Login
          </button>
          <button className="bg-[var(--brand)] text-white px-5 py-2 rounded-lg hover:opacity-90 transition text-sm">
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-200"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <Icon icon="mdi:close" width="26" height="26" />
          ) : (
            <Icon icon="mdi:menu" width="26" height="26" />
          )}
        </button>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => {
                    setActive(link.id);
                    setMenuOpen(false);
                  }}
                  className={`block text-sm ${
                    active === link.id
                      ? "text-[var(--brand)] font-semibold"
                      : "text-gray-300 hover:text-[var(--brand)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-4 flex flex-col gap-3">
            <button className="bg-transparent text-gray-300 px-3 py-2 rounded-md hover:text-[var(--brand)] text-sm">
              Login
            </button>
            <button className="bg-[var(--brand)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-sm">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
