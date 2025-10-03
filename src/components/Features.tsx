import React from "react";
import Card from "./Card";

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-black text-gray-100 px-4">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Why Choose <span className="text-[#5032a8]">Soportlly</span>
        </h2>
        <p className="text-gray-300 text-lg">
          Features designed to make AI-powered support fast, reliable, and interactive.
        </p>
      </div>
     <Card/>
    </section>
  );
};

export default Features;

