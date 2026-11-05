"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutProgressSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D iFLOW Ecosystem Visual */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Subtle Ambient Depth Glow */}
            <div className="absolute w-[90%] h-[90%] bg-gradient-to-tr from-purple-400/20 via-indigo-300/15 to-fuchsia-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="relative w-full max-w-[520px] aspect-[100/76] flex items-center justify-center group">
              <Image
                src="/hero/hero_3d.png"
                alt="About iFLOW - Digital Lending Ecosystem"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_40px_rgba(59,18,89,0.18)] group-hover:scale-[1.02] transition-transform duration-500 ease-out select-none"
              />
            </div>
          </div>

          {/* Right Column: Copy & Link */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-5 h-[2px] bg-[#E06D53]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#9a3f91] font-mono">
                ABOUT IFLOW
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0A2D5F] tracking-tight leading-[1.12] mb-6">
              Progress isn't a<br />
              destination. <span className="text-[#9a3f91]">It's how</span><br />
              <span className="text-[#9a3f91]">we work</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-[15px] text-gray-600 font-normal leading-relaxed max-w-lg mb-8">
              <p>
                We believe financial technology should do more than keep up. It
                should open up what's possible—for businesses, for their teams,
                and for every customer they serve.
              </p>
              <p>
                That's why we're building practical, intelligent solutions for the
                real-world challenges of modern lending.
              </p>
            </div>

            {/* CTA Link */}
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#0A2D5F] hover:text-[#9a3f91] font-semibold text-sm sm:text-base transition-colors group"
              >
                <span>Get to know us</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] text-[#0A2D5F] group-hover:text-[#9a3f91] group-hover:translate-x-1.5 transition-all duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
