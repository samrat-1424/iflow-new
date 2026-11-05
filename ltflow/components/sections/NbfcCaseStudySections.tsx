"use client";

import React from "react";
import Reveal from "@/components/Reveal";

export default function NbfcCaseStudySections() {
  const challengeCards = [
    {
      num: "01",
      title: "Slow turnaround",
      desc: "Days-long credit assessment cycles limiting competitive positioning.",
    },
    {
      num: "02",
      title: "Manual assessment",
      desc: "Human-dependent processes creating inconsistency and bottlenecks at scale.",
    },
    {
      num: "03",
      title: "Credit quality under pressure",
      desc: "Growth ambitions compromising portfolio health and risk management.",
    },
    {
      num: "04",
      title: "Costlier growth",
      desc: "Rising customer acquisition costs eroding lending margins and profitability.",
    },
  ];

  const solutionBullets = [
    "One unified view of the borrower",
    "Consistent, model-driven decisions",
    "Deeper risk insights from multiple data sources",
    "Faster assessment at scale",
    "Real-time portfolio health monitoring",
  ];

  const transformationData = [
    {
      label: "SPEED",
      before: "Days of manual review per application",
      after: "78% faster turnaround through AI-driven assessment",
    },
    {
      label: "SCALE",
      before: "Processing capacity limited by team size",
      after: "60% more applications processed without adding headcount",
    },
    {
      label: "CREDIT QUALITY",
      before: "Inconsistent decisions depending on analyst experience",
      after: "75% improvement in credit quality through consistent model-driven scoring",
    },
    {
      label: "COST",
      before: "High acquisition cost due to manual effort and rework",
      after: "38% reduction in customer acquisition cost",
    },
    {
      label: "PORTFOLIO HEALTH",
      before: "Reactive risk management, identified after defaults occurred",
      after: "Proactive portfolio monitoring with early warning signals",
    },
  ];

  return (
    <div className="space-y-20 py-12">
      {/* SECTION 1: THE CHALLENGE */}
      <Reveal threshold={0.1} animationType="fade-up">
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/60 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#a259e6] uppercase mb-4">
            <span className="w-5 h-[2px] bg-[#a259e6]" />
            <span>THE CHALLENGE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-12">
            {/* Left Header & Paragraph */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-serif font-bold text-[#0b1b3d] leading-snug">
                When Growth Hits a Bottleneck
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed pt-2">
                Like many lending businesses, this NBFC faced a fundamental tension: the ambition to grow faster, and the operational constraints that made scaling difficult without compromising credit quality.
              </p>
            </div>

            {/* Right 2x2 Grid Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {challengeCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8f5ff] border border-purple-100/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:border-purple-200"
                >
                  <span className="block text-xs font-mono font-bold text-purple-300 mb-2">
                    {card.num}
                  </span>
                  <h3 className="text-base font-bold text-[#0b1b3d] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-normal">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dark Callout Banner */}
          <div className="bg-[#180933] rounded-2xl py-4 sm:py-5 px-6 sm:px-10 text-center shadow-xl">
            <p className="text-lg sm:text-2xl font-serif italic text-white font-medium tracking-wide">
              &quot;How do you grow faster without compromising credit quality?&quot;
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 2: THE SOLUTION */}
      <Reveal threshold={0.1} animationType="fade-up">
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/60 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#a259e6] uppercase mb-4">
            <span className="w-5 h-[2px] bg-[#a259e6]" />
            <span>THE SOLUTION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-serif font-bold text-[#0b1b3d] leading-snug mb-8">
            Smarter Scores. Sharper Decisions.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Process Flow + Bullet List */}
            <div className="lg:col-span-6 space-y-8">
              {/* Process Flow Box */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#f8f5ff] border border-purple-100 p-4 rounded-2xl">
                <span className="bg-purple-100/80 text-[#0b1b3d] text-[11px] font-mono font-semibold px-3 py-2 rounded-xl border border-purple-200/60">
                  BORROWER DATA
                </span>
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="bg-purple-100/80 text-[#0b1b3d] text-[11px] font-mono font-semibold px-3 py-2 rounded-xl border border-purple-200/60">
                  IFLOW AI SCORES
                </span>
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="bg-purple-100/80 text-[#0b1b3d] text-[11px] font-mono font-semibold px-3 py-2 rounded-xl border border-purple-200/60">
                  CREDIT DECISION
                </span>
                <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="bg-purple-100/80 text-[#0b1b3d] text-[11px] font-mono font-semibold px-3 py-2 rounded-xl border border-purple-200/60">
                  OUTCOME
                </span>
              </div>

              {/* Checklist Items */}
              <ul className="space-y-3.5">
                {solutionBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#8b31a6] text-white flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Dark Graphic Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#12072b] rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden border border-purple-900/40">
                {/* Background Ambient Glow */}
                <div className="absolute w-48 h-48 rounded-full bg-[#8b31a6]/20 blur-3xl pointer-events-none" />

                {/* Central AI Graphic */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  {/* Concentric SVG Orbit Rings */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
                    <circle cx="150" cy="150" r="115" stroke="#4c1d95" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.6" />
                    <circle cx="150" cy="150" r="85" stroke="#6d28d9" strokeWidth="1.5" fill="none" opacity="0.8" />
                  </svg>

                  {/* Nodes around orbit */}
                  <span className="absolute top-8 left-10 text-[11px] font-mono text-purple-200 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60 shadow">
                    Alt Data
                  </span>
                  <span className="absolute top-8 right-10 text-[11px] font-mono text-purple-200 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60 shadow">
                    Bureau
                  </span>
                  <span className="absolute bottom-12 right-8 text-[11px] font-mono text-purple-200 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60 shadow">
                    Bank Stmt
                  </span>
                  <span className="absolute bottom-12 left-10 text-[11px] font-mono text-purple-200 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-800/60 shadow">
                    GST
                  </span>

                  {/* Glowing Center AI Circle */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#7e22ce] via-[#9a3f91] to-[#c084fc] flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xl shadow-purple-950/90 border-2 border-purple-300/40">
                    AI
                  </div>
                </div>

                {/* Subtitle Below Graphic */}
                <p className="text-purple-200/90 text-xs sm:text-sm font-normal max-w-sm mt-4 leading-relaxed">
                  Multiple borrower data points unified through iFLOW AI Scores for consistent, faster decisions
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 3: BEFORE VS AFTER (THE TRANSFORMATION) */}
      <Reveal threshold={0.1} animationType="fade-up">
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100/60 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#a259e6] uppercase mb-4">
            <span className="w-5 h-[2px] bg-[#a259e6]" />
            <span>BEFORE VS AFTER</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-serif font-bold text-[#0b1b3d] leading-snug mb-8">
            The Transformation
          </h2>

          {/* Grid Table Layout */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[650px] space-y-6">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-xs font-mono font-bold tracking-wider uppercase">
                <div className="col-span-3 text-transparent">METRIC</div>
                <div className="col-span-4 text-purple-400">BEFORE AI SCORES</div>
                <div className="col-span-5 text-[#8b31a6]">WITH AI SCORES</div>
              </div>

              {/* Data Rows */}
              {transformationData.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 py-4 items-baseline border-b border-gray-50 last:border-0 hover:bg-purple-50/30 px-2 rounded-xl transition-colors"
                >
                  <div className="col-span-3 text-xs font-mono font-bold text-purple-400 tracking-wider uppercase">
                    {row.label}
                  </div>
                  <div className="col-span-4 text-xs sm:text-sm text-gray-500 leading-normal">
                    {row.before}
                  </div>
                  <div className="col-span-5 text-xs sm:text-sm text-[#0b1b3d] font-semibold leading-normal flex items-start gap-2">
                    <span className="text-[#8b31a6] font-bold text-base leading-none">•</span>
                    <span>{row.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
