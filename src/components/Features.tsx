"use client"


import Card from "./Card"
import { features} from '../constants/features'

export default function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black text-gray-100 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#5032a8] to-[#7a5af8] bg-clip-text text-transparent">
              Soportlly
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Features designed to make AI-powered support fast, reliable, and interactive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature , index) => (
            <Card key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
