"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  GitBranch,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function IflowAdvantageSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const advantageItems = [
    {
      number: "01",
      title: "Connected by design",
      description: "Bring people, processes, and partners into flow.", 
      associatedBadge: 0, // Origination
    },
    {
      number: "02",
      title: "Intelligence at every step",
      description: "Turn information into more confident action.",
      associatedBadge: 1, // Intelligence
    },
    {
      number: "03",
      title: "Built to move with you",
      description: "Technology designed for an evolving industry.",
      associatedBadge: 2, // Servicing & Growth
    },
  ];

  const badges = [
    {
      id: 0,
      title: "Origination",
      icon: GitBranch,
      positionClass: "top-[12%] left-[0%] sm:left-[3%]",
      floatClass: "animate-iflow-float-1",
    },
    {
      id: 1,
      title: "Intelligence",
      icon: Sparkles,
      positionClass: "top-[12%] right-[0%] sm:right-[3%]",
      floatClass: "animate-iflow-float-2",
    },
    {
      id: 2,
      title: "Servicing",
      icon: ShieldCheck,
      positionClass: "bottom-[13%] left-[0%] sm:left-[3%]",
      floatClass: "animate-iflow-float-3",
    },
    {
      id: 3,
      title: "Growth",
      icon: TrendingUp,
      positionClass: "bottom-[13%] right-[0%] sm:right-[3%]",
      floatClass: "animate-iflow-float-4",
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes iflow-pulse-hub {
          0%, 100% {
            box-shadow: 0 0 35px rgba(168, 85, 247, 0.35), inset 0 2px 10px rgba(255, 255, 255, 0.25);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(168, 85, 247, 0.55), 0 0 25px rgba(255, 122, 89, 0.3), inset 0 2px 14px rgba(255, 255, 255, 0.35);
            transform: scale(1.02);
          }
        }

        @keyframes iflow-float-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes iflow-float-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(5px); }
        }

        @keyframes iflow-float-3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        @keyframes iflow-float-4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(4px); }
        }

        @keyframes iflow-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes iflow-orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-hub-pulse {
          animation: iflow-pulse-hub 4s ease-in-out infinite;
        }

        .animate-iflow-float-1 {
          animation: iflow-float-1 4.5s ease-in-out infinite;
        }

        .animate-iflow-float-2 {
          animation: iflow-float-2 5s ease-in-out infinite 0.6s;
        }

        .animate-iflow-float-3 {
          animation: iflow-float-3 4.8s ease-in-out infinite 1.2s;
        }

        .animate-iflow-float-4 {
          animation: iflow-float-4 5.2s ease-in-out infinite 1.8s;
        }

        .animate-orbit-spin-slow {
          animation: iflow-orbit-spin 32s linear infinite;
        }

        .animate-orbit-reverse-slow {
          animation: iflow-orbit-reverse 42s linear infinite;
        }
      `}</style>

      <section className="w-full bg-[#271033] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 overflow-hidden relative text-white">
        {/* Ambient atmospheric lighting */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B3B8B]/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Refined, Professional Content */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-5 h-[2px] bg-[#FF7A59]" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#FF8C66] font-mono">
                  THE IFLOW ADVANTAGE
                </span>
              </div>

              {/* Headline (Refined professional scale) */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                Complexity, meet
                <br />
                clarity
              </h2>

              {/* Subtitle / Paragraph */}
              <p className="text-[13px] sm:text-[14px] text-[#CBB8D9] font-normal leading-relaxed max-w-md mb-6">
                Modern lending asks more of your technology. We bring the moving
                parts together in one intelligent, connected experience—so you
                can focus on what comes next.
              </p>

              {/* Numbered Feature Items with Interactive Highlights */}
              <div className="border-t border-purple-400/20 max-w-md mb-8">
                {advantageItems.map((item, idx) => {
                  const isActive = activeItem === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveItem(idx)}
                      onMouseLeave={() => setActiveItem(null)}
                      className={`py-2.5 sm:py-3.5 border-b border-purple-400/20 flex items-start gap-4 cursor-pointer transition-all duration-300 rounded-lg px-2 -mx-2 ${
                        isActive
                          ? "bg-purple-900/30 border-purple-400/40 pl-3"
                          : "hover:bg-purple-950/20"
                      }`}
                    >
                      <span
                        className={`text-xs font-mono font-semibold tracking-wider pt-0.5 shrink-0 w-5 transition-colors ${
                          isActive ? "text-white" : "text-[#FF8C66]"
                        }`}
                      >
                        {item.number}
                      </span>
                      <div>
                        <h3
                          className={`text-[13.5px] sm:text-[14.5px] font-bold tracking-tight leading-snug transition-colors ${
                            isActive ? "text-purple-200" : "text-white"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#BCA6CC] font-normal leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href="/book-a-demo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#2B1038] font-semibold text-xs sm:text-[13px] shadow-md hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>Let's talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-[#2B1038] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Extraordinary Animated Ecosystem Visual */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
              <div className="relative w-full max-w-[390px] sm:max-w-[440px] aspect-square flex items-center justify-center">
                {/* Orbit 1: Outermost dashed track with gentle rotation */}
                <div className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-purple-400/25 animate-orbit-spin-slow pointer-events-none">
                  {/* Orbiting Comet Light Beam */}
                  <div className="w-2 h-2 rounded-full bg-[#FF7A59] shadow-[0_0_12px_#FF7A59,0_0_4px_#FFF] absolute -top-1 left-1/2 -translate-x-1/2" />
                </div>

                {/* Orbit 2: Middle solid track with reverse slow rotation */}
                <div className="absolute w-[74%] h-[74%] rounded-full border border-purple-400/20 animate-orbit-reverse-slow pointer-events-none">
                  {/* Orbiting Lavender Light Beam */}
                  <div className="w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_10px_#C084FC,0_0_4px_#FFF] absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                {/* Orbit 3: Inner depth ring */}
                <div className="absolute w-[56%] h-[56%] rounded-full border border-purple-300/25 pointer-events-none" />

                {/* Center Glowing Hub with Organic Pulse Animation */}
                <div className="relative z-10 w-36 h-36 sm:w-42 sm:h-42 rounded-full bg-gradient-to-br from-[#682B82] via-[#481B5E] to-[#2B0E38] border border-purple-300/40 animate-hub-pulse flex flex-col items-center justify-center text-center p-3 select-none transition-transform">
                  <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.24em] text-purple-200 uppercase mb-0.5">
                    A CONNECTED ECOSYSTEM
                  </span>
                  <span className="text-2xl sm:text-[30px] font-extrabold text-white tracking-wider">
                    iFLOW
                  </span>
                  <span className="text-[#FF7A59] text-lg font-bold mt-0.5 leading-none select-none">
                    +
                  </span>
                </div>

                {/* 4 Floating Glassmorphic Badges */}
                {badges.map((badge) => {
                  const Icon = badge.icon;
                  // Check if highlighted via list item hover
                  const isHighlighted =
                    activeItem !== null &&
                    (advantageItems[activeItem].associatedBadge === badge.id ||
                      (activeItem === 2 && badge.id === 3));

                  return (
                    <div
                      key={badge.id}
                      className={`absolute ${badge.positionClass} ${badge.floatClass} z-20 transition-all duration-300`}
                    >
                      <div
                        className={`backdrop-blur-md rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xl flex items-center gap-2.5 text-white cursor-pointer transition-all duration-300 ${
                          isHighlighted
                            ? "bg-[#552373]/95 border-2 border-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-110"
                            : "bg-[#361947]/85 border border-purple-300/30 hover:scale-105 hover:border-purple-300/50 hover:bg-[#431F57]/90"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isHighlighted
                              ? "bg-white/20 border border-white/30 text-white"
                              : "bg-white/10 border border-white/10 text-purple-200"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-semibold tracking-wide text-white">
                          {badge.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
