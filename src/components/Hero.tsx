import type React from "react"
import { Link } from "react-router-dom"
import CanvasScene from "./CanvasScene"

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-black text-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background Layer 1 - Base gradient waves */}
      <div
        className="absolute inset-0 opacity-40 animate-pulse"
        style={{
          backgroundImage: "url(/images/hero-bg-1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />

      {/* Background Layer 2 - Geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(/images/hero-bg-2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />

      {/* Background Layer 3 - Light rays and particles */}
      <div
        className="absolute inset-0 opacity-30 animate-pulse"
        style={{
          backgroundImage: "url(/images/hero-bg-3.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "lighten",
          animationDuration: "4s",
          animationDelay: "1s",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#5032a8]/20 via-transparent to-black/60" />

      {/* Canvas behind content */}
      <div className="absolute inset-0 z-0">
        <CanvasScene />
      </div>

      <div className="z-10 text-center px-6 max-w-4xl relative">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="text-white drop-shadow-2xl">Soportlly — </span>
          <span className="text-[#5032a8] drop-shadow-[0_0_30px_rgba(80,50,168,0.8)]">AI-powered support</span>
        </h1>
        <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
          Turn customer questions into instant, context-aware answers. Attach images, get analysis, and keep full
          history.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="bg-gradient-to-r from-[#5032a8] to-[#7c3aed] text-white px-8 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(80,50,168,0.6)] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg"
          >
            Get Started
          </Link>

          <a
            href="#about"
            className="text-gray-200 px-6 py-4 rounded-xl border-2 border-gray-600 hover:border-[#5032a8] hover:text-[#5032a8] hover:bg-[#5032a8]/10 hover:shadow-[0_0_20px_rgba(80,50,168,0.4)] transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/40" />
    </section>
  )
}

export default Hero
