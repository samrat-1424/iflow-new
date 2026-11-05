"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@/services/caseStudyService";
import SectionRenderer from "@/components/SectionRenderer";
import Reveal from "@/components/Reveal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NbfcCaseStudySections from "@/components/sections/NbfcCaseStudySections";
import CaseStudyGatedCard from "@/components/CaseStudyGatedCard";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const [activeTab, setActiveTab] = useState<"credit" | "ai" | "portfolio">("ai");
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsUnlocked(sessionStorage.getItem("iflow_case_study_unlocked") === "true");
    }
  }, []);

  const categoryBadge = caseStudy.category_badge || caseStudy.category || "AI & CREDIT INTELLIGENCE";

  const gaugeData = {
    credit: { score: "740", label: "BUREAU SCORE", dashoffset: 240 },
    ai: { score: "782", label: "AI SCORE", dashoffset: 170 },
    portfolio: { score: "94%", label: "PORTFOLIO QUALITY", dashoffset: 120 },
  };

  const currentGauge = gaugeData[activeTab];

  const stats = [
    { value: "78%", label: "Faster turnaround time" },
    { value: "75%", label: "Better credit quality" },
    { value: "38%", label: "Lower acquisition cost" },
    { value: "60%", label: "More processing capacity" },
  ];

  return (
    <div className="bg-[#fcfaff] min-h-screen">
      {/* Dark Theme Hero Header with Animated Ambient Blobs */}
      <div className="relative bg-gradient-to-br from-[#140428] via-[#1c0638] to-[#0b0217] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-purple-900/40">
        {/* Animated Background Glowing Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#9a3f91]/20 rounded-full blur-3xl pointer-events-none animate-pulse -z-0" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#623f99]/25 rounded-full blur-3xl pointer-events-none animate-pulse -z-0" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Text Content with Entrance Animation */}
            <div className="lg:col-span-7 max-w-2xl">
              <Reveal threshold={0.1} animationType="fade-up">
                {/* Top Breadcrumbs & Category Badge */}
                <div className="mb-6">
                  <div className="text-xs font-mono font-semibold tracking-widest text-[#e879f9] uppercase mb-2">
                    CASE STUDIES · {categoryBadge}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-purple-300/80 uppercase">
                    <span className="w-5 h-[2px] bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" />
                    <span>IFLOW CASE STUDY</span>
                  </div>
                </div>

                {/* Main Hero Tagline */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight tracking-tight mb-5">
                  Grow Faster <br />
                  <span className="text-[#9a3f91]">
                    Lend Smarter
                  </span>
                </h1>

                {/* Subtitle Description */}
                <p className="text-lg sm:text-xl text-purple-100/90 font-normal leading-relaxed mb-8">
                  {caseStudy.title}
                </p>

                {/* Back to Case Studies Navigation Link */}
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Case Studies</span>
                </Link>
              </Reveal>
            </div>

            {/* Right Interactive AI Score Circle Graphic with Rotatable Orbit */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Reveal threshold={0.1} animationType="zoom-in">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-6">
                  {/* Glowing Radar Background Effect */}
                  <div className="absolute w-36 h-36 rounded-full bg-[#9a3f91]/30 animate-ping opacity-40 pointer-events-none" />
                  <div className="absolute w-48 h-48 rounded-full bg-[#623f99]/20 animate-pulse pointer-events-none" />

                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
                    <defs>
                      <linearGradient id="aiGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e879f9" />
                        <stop offset="50%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#9a3f91" />
                      </linearGradient>
                    </defs>

                    {/* Rotating Dashed Outer Orbit Group */}
                    <g className="animate-spin" style={{ transformOrigin: "150px 150px", animationDuration: "25s" }}>
                      <circle cx="150" cy="150" r="130" stroke="#623f99" strokeWidth="1.2" strokeDasharray="5 5" opacity="0.45" fill="none" />
                      <circle cx="50" cy="80" r="4.5" fill="#e879f9" className="animate-pulse" />
                      <circle cx="250" cy="80" r="4.5" fill="#e879f9" className="animate-pulse" />
                      <circle cx="30" cy="200" r="4.5" fill="#c084fc" />
                      <circle cx="270" cy="200" r="4.5" fill="#c084fc" />
                      <circle cx="150" cy="20" r="3.5" fill="#ffffff" />
                    </g>

                    {/* Main Arc Gauge with Dynamic Dashoffset */}
                    <circle
                      cx="150"
                      cy="150"
                      r="95"
                      stroke="url(#aiGaugeGrad)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="597"
                      strokeDashoffset={currentGauge.dashoffset}
                      transform="rotate(-90 150 150)"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  {/* Center Dynamic Score Text */}
                  <div className="flex flex-col items-center justify-center text-center z-10 select-none">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                      {currentGauge.score}
                    </span>
                    <span className="text-[11px] font-mono tracking-widest text-purple-300 uppercase mt-1 transition-all">
                      {currentGauge.label}
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Pill Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("credit")}
                    className={`text-[11px] font-mono transition-all duration-200 px-3.5 py-1.5 rounded-full border cursor-pointer ${
                      activeTab === "credit"
                        ? "bg-[#7e22ce] text-white font-semibold border-purple-400/50 shadow-lg shadow-purple-950/80 scale-105"
                        : "bg-purple-950/60 text-purple-300/80 border-purple-800/40 hover:text-white hover:bg-purple-900/60"
                    }`}
                  >
                    CREDIT SCORE
                  </button>

                  <button
                    onClick={() => setActiveTab("ai")}
                    className={`text-[11px] font-mono transition-all duration-200 px-4 py-1.5 rounded-full border cursor-pointer ${
                      activeTab === "ai"
                        ? "bg-[#7e22ce] text-white font-semibold border-purple-400/50 shadow-lg shadow-purple-950/80 scale-105"
                        : "bg-purple-950/60 text-purple-300/80 border-purple-800/40 hover:text-white hover:bg-purple-900/60"
                    }`}
                  >
                    AI DECISION
                  </button>

                  <button
                    onClick={() => setActiveTab("portfolio")}
                    className={`text-[11px] font-mono transition-all duration-200 px-3.5 py-1.5 rounded-full border cursor-pointer ${
                      activeTab === "portfolio"
                        ? "bg-[#7e22ce] text-white font-semibold border-purple-400/50 shadow-lg shadow-purple-950/80 scale-105"
                        : "bg-purple-950/60 text-purple-300/80 border-purple-800/40 hover:text-white hover:bg-purple-900/60"
                    }`}
                  >
                    PORTFOLIO
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom 4 Metric Cards Bar with Staggered Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-8 border-t border-purple-800/30">
            {stats.map((stat, idx) => (
              <Reveal key={idx} threshold={0.1} delay={idx * 120} animationType="fade-up">
                <div className="group relative bg-[#240a45]/60 border border-purple-500/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-xl hover:border-purple-400/60 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/50 transition-all duration-300 overflow-hidden">
                  {/* Top Glowing Accent Highlight Bar on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-purple-200/90 text-sm font-normal group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Main Story Content Section with Entrance Animation */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-12">
        {!isUnlocked ? (
          <CaseStudyGatedCard
            caseStudyTitle={caseStudy.title}
            caseStudySlug={caseStudy.slug}
            onUnlock={() => setIsUnlocked(true)}
          />
        ) : caseStudy.slug === "ai-credit" || caseStudy.slug === "how-an-nbfc-scaled-its-lending-without-compromising-credit-quality" ? (
          <NbfcCaseStudySections />
        ) : (
          <>
            {/* Render Rich Content if available */}
            {caseStudy.full_content && caseStudy.full_content.trim() && (
              <Reveal threshold={0.1} animationType="fade-up">
                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans mb-12">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A2D5F] mt-8 mb-4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-2xl font-serif font-bold text-[#0A2D5F] mt-8 mb-4" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-serif font-bold text-[#0A2D5F] mt-6 mb-3" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                    }}
                  >
                    {caseStudy.full_content}
                  </ReactMarkdown>
                </article>
              </Reveal>
            )}

            {/* Render Dynamic Section Components if configured in Strapi */}
            {caseStudy.sections && caseStudy.sections.length > 0 && (
              <div className="space-y-0">
                {caseStudy.sections
                  .filter((sec: any) => {
                    const loc = sec.display_location || caseStudy.display_location || "both";
                    return loc === "both" || loc === "only_detail";
                  })
                  .map((sec: any, idx: number) => (
                    <Reveal key={sec.id || idx} threshold={0.1} delay={idx * 100} animationType="fade-up">
                      <SectionRenderer
                        section={sec}
                        solutionSlug={caseStudy.slug}
                        index={idx}
                      />
                    </Reveal>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
