"use client";

import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import {
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-3 sm:pt-5 pb-5 sm:pb-7 bg-gradient-to-b from-[#F6F3FC] via-[#FAF8FF] to-white lg:min-h-[calc(100vh-60px)] lg:max-h-[920px] flex flex-col justify-between">
      {/* Ambient background glow circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-[520px] h-[520px] bg-fuchsia-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-[600px] h-[300px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-1 sm:pt-2 pb-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center w-full my-auto">
        {/* Left Column: Headline & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200/90 bg-white/80 backdrop-blur-md shadow-xs text-[11px] sm:text-xs font-semibold tracking-[0.14em] text-purple-700 uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            DIGITAL LENDING INFRASTRUCTURE
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-extrabold text-[#0B132B] tracking-tight leading-[1.1] mb-3 sm:mb-4">
            Step into the <br className="hidden sm:block" />
            <span className="text-[#9a3f91]">
              Future of Lending
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg mb-5 sm:mb-6">
            Experience the power of AI-powered tech &amp; an API-enriched stack for
            new-gen lending — built for banks, NBFCs and fintech companies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/book-a-demo"
              className="bg-gradient-to-r from-[#3B1259] to-[#7E22CE] hover:from-[#4A1870] hover:to-[#9333EA] text-white font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-lg shadow-purple-900/15 flex items-center gap-2 text-sm sm:text-base transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Book A Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("solutions");
                if (el) {
                  const yOffset = -70;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="border border-slate-300/90 bg-white/90 hover:bg-slate-50 text-slate-800 font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-xs text-sm sm:text-base transition-all duration-200 hover:border-slate-400 cursor-pointer"
            >
              Explore Solutions
            </button>
          </div>

          {/* Trust highlights */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-purple-100/90 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              <span>RBI-compliant</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Zap className="w-4 h-4 text-purple-600 shrink-0" />
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Go live in 4–8 weeks</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Hero Visual */}
        <div className="lg:col-span-7 flex items-center justify-center lg:justify-end relative mt-6 lg:mt-0 w-full lg:translate-x-2 xl:translate-x-6">
          {/* Subtle Ambient Depth Glow */}
          <div className="absolute w-[105%] h-[105%] bg-gradient-to-tr from-purple-400/25 via-indigo-300/20 to-fuchsia-400/15 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* 3D Floating Image Container */}
          <div className="relative w-full max-w-[700px] sm:max-w-[780px] lg:max-w-[900px] xl:max-w-[980px] aspect-[1536/1024] flex items-center justify-center lg:justify-end animate-float-3d">
            <Image
              src="/hero/hero3.webp"
              alt="iFLOW Digital Lending Platform - AI Underwriting Dashboard and Connected Banking Ecosystem"
              fill
              priority
              quality={95}
              className="object-contain drop-shadow-[0_24px_50px_rgba(59,18,89,0.22)] select-none hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Redesigned 4-Stats Strip - Visible Above Fold Without Cut */}
      <div className="relative max-w-6xl mx-auto px-6 w-full mt-4 sm:mt-6 mb-1 sm:mb-2">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-lg shadow-purple-900/5 px-4 sm:px-8 py-3.5 sm:py-4.5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="space-y-1 pt-2 md:pt-0">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3B1259] tracking-tight">
              <CountUp end={95} suffix="+" />
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mt-1">
              FINANCIAL INSTITUTIONS
            </p>
          </div>

          <div className="space-y-1 pt-2 md:pt-0">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3B1259] tracking-tight">
              <CountUp end={150} suffix="+" />
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mt-1">
              PRE-BUILT CONNECTORS
            </p>
          </div>

          <div className="space-y-1 pt-2 md:pt-0">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3B1259] tracking-tight">
              <CountUp end={99.9} decimals={1} suffix="%" />
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mt-1">
              PLATFORM UPTIME
            </p>
          </div>

          <div className="space-y-1 pt-2 md:pt-0">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3B1259] tracking-tight">
              <CountUp end={18} suffix=" days" />
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mt-1">
              FASTEST GO-LIVE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
