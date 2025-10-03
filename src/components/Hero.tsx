import React from "react";
import CanvasScene from "./CanvasScene";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-black text-gray-100 flex items-center justify-center overflow-hidden">
      {/* Hero content */}
      <div className="z-10 text-center px-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          <span className="text-white">Soportlly — </span>
          <span className="text-[#5032a8]">AI-powered support</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-lg md:text-xl mb-8">
          Turn customer questions into instant, context-aware answers. Attach images, get analysis, and keep full history.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#features"
            className="bg-[#5032a8] text-white px-6 py-3 rounded-xl hover:opacity-90 transition font-medium"
          >
            Get Started
          </a>
          <a
            href="#about"
            className="text-gray-300 px-4 py-3 rounded-md border border-gray-700 hover:border-[#5032a8] hover:text-[#5032a8] transition font-medium"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Canvas behind content */}
      <div className="absolute inset-0 -z-10">
        <CanvasScene />
      </div>
    </section>
  );
};

export default Hero;
