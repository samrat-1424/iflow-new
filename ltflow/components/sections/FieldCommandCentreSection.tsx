"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, MapPin } from "lucide-react";

interface FieldCommandCentreSectionProps {
  data?: any;
}

export default function FieldCommandCentreSection({
  data,
}: FieldCommandCentreSectionProps = {}) {
  // Hardcoded content as requested (independent of Strapi)
  const badge = "FIELD COMMAND CENTRE";
  const title = "See every team, territory and visit in real time";
  const description =
    "Give collection managers a live view of operational coverage, agent activity, case allocation and collection progress.";

  const checklist = [
    "Agent-wise location markers and status",
    "Visits completed, pending and rescheduled",
    "Collections recorded versus pending amount",
    "Allocation by region, branch and pincode",
  ];

  const stats = [
    { value: "58", label: "Active agents" },
    { value: "184", label: "Visits complete" },
    { value: "88", label: "Visits pending" },
    { value: "₹12.8L", label: "Collected" },
  ];

  const liveActivities = [
    { text: "Arjun started visit · Andheri", time: "2m" },
    { text: "Neha recorded ₹28,400", time: "4m" },
    { text: "Ravi completed visit · Powai", time: "7m" },
  ];

  return (
    <section
      id="field-command-centre"
      aria-label="Field Command Centre"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white overflow-hidden border-t border-purple-100/70"
    >
      {/* Background ambient purple lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-purple-100/40 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-fuchsia-100/30 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, Description, Checklist & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#9a3f91]" />
                {badge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
              {title}
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-lg mb-7">
              {description}
            </p>

            {/* Checklist items */}
            <div className="space-y-3.5 mb-8">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-emerald-200">
                    <Check className="w-3 h-3 stroke-[2.8]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              
          
            </div>
          </div>

          {/* Right Column: Live Vector Territory Map Dashboard */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[620px] rounded-3xl bg-[#f5f2fb] border border-purple-200/90 shadow-[0_22px_55px_rgba(98,63,153,0.12)] p-4 sm:p-6 overflow-hidden select-none">
              
              {/* Comprehensive Vector Geographic Map Background */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 620 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Subtle Map Land Shading */}
                <rect width="620" height="400" fill="#f6f3fc" />

                {/* River / Water Channel Corridor */}
                <path
                  d="M -30,170 C 110,150 210,230 340,195 C 450,165 520,225 650,190 L 650,235 C 520,265 450,205 340,235 C 210,270 110,190 -30,210 Z"
                  fill="#e9e1f5"
                  opacity="0.85"
                />

                {/* Territory Zone A (North-West polygon) */}
                <polygon
                  points="50,20 220,15 250,150 70,165"
                  fill="#7c3aed"
                  fillOpacity="0.035"
                  stroke="#7c3aed"
                  strokeOpacity="0.22"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                {/* Territory Zone B (North-East polygon) */}
                <polygon
                  points="265,25 560,20 590,160 330,165"
                  fill="#06b6d4"
                  fillOpacity="0.03"
                  stroke="#06b6d4"
                  strokeOpacity="0.2"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                {/* Territory Zone C (South polygon) */}
                <polygon
                  points="180,245 590,210 580,380 230,385"
                  fill="#9a3f91"
                  fillOpacity="0.03"
                  stroke="#9a3f91"
                  strokeOpacity="0.2"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                {/* Street Grid Lines (Secondary Streets) */}
                <g stroke="#e2d8ee" strokeWidth="0.9" opacity="0.75">
                  {/* Vertical / Longitudinal street avenues */}
                  <line x1="60" y1="0" x2="60" y2="400" strokeDasharray="3 4" />
                  <line x1="130" y1="0" x2="130" y2="400" strokeDasharray="3 4" />
                  <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="3 4" />
                  <line x1="270" y1="0" x2="270" y2="400" strokeDasharray="3 4" />
                  <line x1="340" y1="0" x2="340" y2="400" strokeDasharray="3 4" />
                  <line x1="410" y1="0" x2="410" y2="400" strokeDasharray="3 4" />
                  <line x1="480" y1="0" x2="480" y2="400" strokeDasharray="3 4" />
                  <line x1="550" y1="0" x2="550" y2="400" strokeDasharray="3 4" />

                  {/* Horizontal street parallels */}
                  <line x1="0" y1="60" x2="620" y2="60" strokeDasharray="3 4" />
                  <line x1="0" y1="120" x2="620" y2="120" strokeDasharray="3 4" />
                  <line x1="0" y1="180" x2="620" y2="180" strokeDasharray="3 4" />
                  <line x1="0" y1="240" x2="620" y2="240" strokeDasharray="3 4" />
                  <line x1="0" y1="300" x2="620" y2="300" strokeDasharray="3 4" />
                  <line x1="0" y1="360" x2="620" y2="360" strokeDasharray="3 4" />
                </g>

                {/* Major Arterial Highway 1 (West to East Arterial) */}
                <path
                  d="M -20,110 Q 180,140 360,90 T 640,120"
                  fill="none"
                  stroke="#cebddf"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M -20,110 Q 180,140 360,90 T 640,120"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.95"
                />

                {/* Major Arterial Highway 2 (North to South-East Ring Road) */}
                <path
                  d="M 170,-10 Q 230,170 360,250 T 570,390"
                  fill="none"
                  stroke="#cebddf"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 170,-10 Q 230,170 360,250 T 570,390"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.95"
                />

                {/* Active Agent Transit Route (Dashed Path between Pin 1 and Pin 4) */}
                <path
                  d="M 143,115 C 190,170 240,210 316,252"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                  strokeOpacity="0.75"
                />

                {/* Transit Route between Pin 2 and Pin 3 */}
                <path
                  d="M 384,180 C 430,150 480,130 520,112"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.7"
                />

                {/* Subtle Territory Zone Map Labels */}
                <text x="80" y="85" fill="#a48fc5" fontSize="9" fontWeight="700" letterSpacing="1.5">
                  NORTH DISTRICT
                </text>
                <text x="440" y="75" fill="#a48fc5" fontSize="9" fontWeight="700" letterSpacing="1.5">
                  METRO CORRIDOR
                </text>
                <text x="380" y="340" fill="#a48fc5" fontSize="9" fontWeight="700" letterSpacing="1.5">
                  SOUTH INDUSTRIAL HUB
                </text>
              </svg>

              {/* Top Stats Row (4 white metric cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-5 relative z-10">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-[0_4px_14px_rgba(98,63,153,0.06)] border border-purple-100/90 flex flex-col justify-center"
                  >
                    <span className="text-lg sm:text-xl font-extrabold text-[#0a1f44] tracking-tight leading-none mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Territory Area with Pins & Compact Live Activity Card */}
              <div className="relative h-[230px] sm:h-[260px] w-full">
                
                {/* Pin 1: Top-Left (Royal Purple) with pulse beacon */}
                <div className="absolute top-[12%] left-[23%] z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <span className="absolute -inset-1.5 rounded-full bg-purple-500/30 animate-ping pointer-events-none" />
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#623f99] to-[#4c2d7c] text-white shadow-[0_6px_18px_rgba(98,63,153,0.45)] ring-4 ring-purple-200/60 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
                  </div>
                </div>

                {/* Pin 2: Mid-Center (Cyan Accent) */}
                <div className="absolute top-[45%] left-[62%] z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white shadow-[0_6px_18px_rgba(6,182,212,0.45)] ring-4 ring-cyan-100 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
                  </div>
                </div>

                {/* Pin 3: Upper-Right (Vivid Violet) */}
                <div className="absolute top-[28%] left-[84%] z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] ring-4 ring-purple-100 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
                  </div>
                </div>

                {/* Pin 4: Lower-Center (Brand Magenta) */}
                <div className="absolute top-[63%] left-[51%] z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#9a3f91] to-[#7f2f76] text-white shadow-[0_6px_18px_rgba(154,63,145,0.45)] ring-4 ring-fuchsia-100 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
                  </div>
                </div>

                {/* Pin 5: Bottom-Right (Emerald Accent) */}
                <div className="absolute top-[78%] left-[90%] z-10 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_6px_18px_rgba(16,185,129,0.45)] ring-4 ring-emerald-100 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20" />
                  </div>
                </div>

                {/* Compact "Live activity" Box (Bottom-Left) */}
                <div className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 z-20 w-[185px] sm:w-[210px] bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 shadow-[0_10px_26px_rgba(98,63,153,0.14)] border border-purple-100/90">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-[#0a1f44] tracking-tight">
                      Live activity
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    {liveActivities.map((act, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] leading-tight">
                          <span className="text-slate-700 font-medium truncate max-w-[130px] sm:max-w-[150px]">
                            {act.text}
                          </span>
                          <span className="text-purple-600 font-semibold ml-1.5 flex-shrink-0 text-[9px] sm:text-[10px]">
                            {act.time}
                          </span>
                        </div>
                        {idx < liveActivities.length - 1 && (
                          <div className="border-b border-purple-50 my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
