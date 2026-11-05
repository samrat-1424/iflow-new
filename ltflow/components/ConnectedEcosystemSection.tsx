"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
  ChevronLeft,
  Activity,
  FileCheck2,
  TrendingUp,
  RotateCw,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import dynamic from "next/dynamic";

const EcosystemCanvas3D = dynamic(() => import("./EcosystemCanvas3D"), {
  ssr: false,
  loading: () => null,
});

interface Movement {
  step: string;
  title: string;
  tagline: string;
  description: string;
  metric: { value: string; label: string };
  highlights: string[];
  modules: { label: string; href: string }[];
  accent: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MOVEMENTS: Movement[] = [
  {
    step: "01",
    title: "Origination",
    tagline: "Instant Onboarding & Fast Approvals",
    description:
      "Paperless journeys, automated eKYC, instant underwriting and seamless disbursement — transforming borrower intent into funded loans in minutes.",
    metric: { value: "< 3 mins", label: "AVERAGE DECISION TIME" },
    highlights: [
      "Digital Video KYC & Document OCR",
      "Multi-bureau instant credit check",
      "Automated e-Sign & Sanction Letter",
    ],
    modules: [
      { label: "Loan Origination System", href: "/solutions/loan-origination-los" },
      {
        label: "MSME & Agri-Tech Journeys",
        href: "/solutions/msme-and-agri-tech-on-boarding-journeys",
      },
      { label: "API Services", href: "/solutions/on-boarding-journey" },
    ],
    accent: "#a855f7",
    gradient: "from-purple-500 to-fuchsia-500",
    icon: FileCheck2,
  },
  {
    step: "02",
    title: "Intelligence",
    tagline: "Alternative Data & Smart Risk Models",
    description:
      "Proprietary AI Intelligent Suite, bureau orchestration and multidimensional behavioral signals that turn raw transactional data into accurate credit decisions.",
    metric: { value: "Intelligent", label: "RISK DECISIONING" },
    highlights: [
      "BICRI MSME Score Intelligence",
      "Bank Statement & GST Analyzer",
      "Dynamic Loan Pool Valuation",
    ],
    modules: [
      { label: "BICRI Score", href: "/solutions/bicri" },
      { label: "AI Intelligent Suite", href: "/solutions/ai-intelligent-suite" },
      { label: "Pool Buyout", href: "/solutions/pool-buyout" },
    ],
    accent: "#ec4899",
    gradient: "from-fuchsia-500 to-pink-500",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Servicing",
    tagline: "Unified Ledger & Real-Time Settlement",
    description:
      "Core loan management, omnichannel collection workflows and automated tripartite escrow reconciliation that keeps every EMI and partner rupee accounted for.",
    metric: { value: "Zero", label: "LEDGER DRIFT & LEAKAGE" },
    highlights: [
      "Automated NACH & e-Mandate debit",
      "Dynamic Repayment Split Engine",
      "Omnichannel AI Collections CRM",
    ],
    modules: [
      { label: "Loan Management System", href: "/solutions/loan-management-lms" },
      { label: "Collection Suite", href: "/solutions/collection" },
      { label: "Distribution Engine", href: "/solutions/distribution" },
    ],
    accent: "#8b5cf6",
    gradient: "from-indigo-500 to-purple-500",
    icon: RotateCw,
  },
  {
    step: "04",
    title: "Growth",
    tagline: "Co-Lending, BNPL & Multi-Channel Scale",
    description:
      "Co-lending syndication, BNPL checkout SDKs and nationwide DSA networks that scale institutional loan books and partner reach without adding operational drag.",
    metric: { value: "10x", label: "PARTNER SCALABILITY" },
    highlights: [
      "RBI-compliant 80:20 & 90:10 CLM",
      "Sub-second BNPL checkout decisions",
      "Automated DSA Partner Commission Grid",
    ],
    modules: [
      { label: "Co-lending Platform", href: "/solutions/co-lending" },
      { label: "BNPL Product Suite", href: "/solutions/bnpl-product-suite" },
      { label: "DSA Management System", href: "/solutions/dsa" },
    ],
    accent: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
    icon: TrendingUp,
  },
];

export default function ConnectedEcosystemSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Auto-advance through 4 movements smoothly
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MOVEMENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Mouse 3D perspective tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const current = MOVEMENTS[activeIdx];
  const StepIcon = current.icon;

  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-white via-[#faf5ff] to-[#f8fafc] text-slate-900 border-y border-purple-100/60">
      {/* 3D WebGL Canvas Background */}
      <EcosystemCanvas3D activeStep={activeIdx} />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-fuchsia-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[400px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle 3D grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#7e22ce_1px,transparent_1px),linear-gradient(to_bottom,#7e22ce_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <Reveal threshold={0.1} animationType="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9a3f91]/10 border border-[#9a3f91]/25 text-[#9a3f91] text-xs font-mono font-bold tracking-[0.22em] uppercase mb-4 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91] animate-pulse" />
              <span>A CONNECTED ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              One platform.{" "}
              <span className="text-[#9a3f91]">
                Four movements.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mt-4 max-w-2xl mx-auto">
              iFLOW+ connects the whole lending lifecycle — origination, intelligence,
              servicing and growth — as one continuously flowing 3D system.
            </p>
          </Reveal>
        </div>

        {/* 3D Interactive Step Selector Track */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-1.5 rounded-2xl bg-white/90 border border-purple-200/80 backdrop-blur-xl shadow-xl shadow-purple-900/5">
            {MOVEMENTS.map((movement, idx) => {
              const isActive = idx === activeIdx;
              const Icon = movement.icon;
              return (
                <button
                  key={movement.step}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsAutoPlay(false);
                  }}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-lg shadow-purple-900/20 scale-[1.02]"
                      : "text-slate-600 hover:text-[#9a3f91] hover:bg-purple-50/80"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-purple-100/80 text-[#9a3f91] group-hover:bg-purple-200/70"
                    }`}
                  >
                    {movement.step}
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-xs font-mono font-semibold uppercase tracking-wider leading-none ${
                        isActive ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      Step {idx + 1}
                    </span>
                    <span className="block text-sm font-bold truncate mt-0.5">
                      {movement.title}
                    </span>
                  </div>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#9a3f91] rotate-45 rounded-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Central 3D Interactive Stage Showcase Card */}
        <div
          style={{ perspective: "1200px" }}
          className="max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlay(false)}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
            className="relative rounded-3xl bg-white/95 border-2 border-purple-200/80 p-8 sm:p-12 shadow-[0_20px_50px_rgba(100,50,150,0.08)] backdrop-blur-2xl overflow-hidden group"
          >
            {/* 3D Specular Lighting follow */}
            <div
              className="pointer-events-none absolute -inset-px opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl"
              style={{
                background: `radial-gradient(600px circle at 50% 30%, rgba(154,63,145,0.12), transparent 70%)`,
              }}
            />

            {/* Top Glowing Ambient Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${current.gradient} transition-all duration-700`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Movement Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Step Eyebrow with pulsing 3D badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9a3f91]/10 border border-[#9a3f91]/25 text-[#9a3f91] font-mono text-xs font-bold tracking-wider uppercase shadow-xs">
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: current.accent }}
                      />
                      MOVEMENT {current.step} OF 04
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-widest">
                      {current.tagline}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                    {current.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
                    {current.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    {current.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px]"
                          style={{ backgroundColor: current.accent }}
                        >
                          ✓
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-module Interactive Pills */}
                <div className="pt-6 border-t border-purple-100">
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9a3f91] mb-3">
                    CONNECTED MODULES
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {current.modules.map((mod) => (
                      <Link
                        key={mod.label}
                        href={mod.href}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/80 text-purple-900 hover:text-[#9a3f91] hover:border-[#9a3f91]/50 hover:bg-white text-xs font-medium transition-all hover:scale-105 shadow-xs"
                      >
                        <span>{mod.label}</span>
                        <ArrowRight className="w-3 h-3 text-[#9a3f91]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Holographic Stage Visual */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-square max-w-[340px] rounded-3xl bg-gradient-to-br from-purple-50/90 via-fuchsia-50/50 to-indigo-50/80 border border-purple-200/80 p-8 flex flex-col items-center justify-center shadow-lg shadow-purple-900/5 group-hover:border-purple-300 transition-all duration-500">
                  {/* Orbiting ring */}
                  <div className="absolute inset-4 rounded-full border border-dashed border-purple-300/40 animate-spin-slow pointer-events-none" />
                  <div className="absolute inset-10 rounded-full border border-purple-200/50 pointer-events-none" />

                  {/* Central floating 3D stage icon */}
                  <div
                    className="relative w-24 h-24 rounded-3xl flex items-center justify-center shadow-xl mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${current.accent}, #4c1d95)`,
                      boxShadow: `0 15px 35px ${current.accent}35`,
                    }}
                  >
                    <StepIcon className="w-12 h-12 text-white animate-pulse" />
                  </div>

                  {/* Key Metric Spotlight */}
                  <div className="text-center z-10">
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {current.metric.value}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mt-1 block">
                      {current.metric.label}
                    </span>
                  </div>

                  {/* Flowing Data Stream Indicator */}
                  <div className="mt-6 flex items-center gap-1.5 text-xs text-[#9a3f91] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>LIFECYCLE ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => {
              setActiveIdx((prev) => (prev - 1 + MOVEMENTS.length) % MOVEMENTS.length);
              setIsAutoPlay(false);
            }}
            aria-label="Previous movement"
            className="w-11 h-11 rounded-full bg-white border border-purple-200 text-purple-800 hover:text-[#9a3f91] hover:border-[#9a3f91]/40 hover:bg-purple-50 flex items-center justify-center transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Step Dots with Progress Bars */}
          <div className="flex items-center gap-2">
            {MOVEMENTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsAutoPlay(false);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIdx
                    ? "w-8 h-2.5 bg-gradient-to-r from-[#623f99] to-[#9a3f91] shadow-sm shadow-purple-500/30"
                    : "w-2.5 h-2.5 bg-purple-200 hover:bg-purple-300"
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setActiveIdx((prev) => (prev + 1) % MOVEMENTS.length);
              setIsAutoPlay(false);
            }}
            aria-label="Next movement"
            className="w-11 h-11 rounded-full bg-white border border-purple-200 text-purple-800 hover:text-[#9a3f91] hover:border-[#9a3f91]/40 hover:bg-purple-50 flex items-center justify-center transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-12 sm:mt-14">
          <Reveal threshold={0.1} animationType="fade-up" delay={150}>
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] hover:opacity-95 text-white font-semibold shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.02] group cursor-pointer"
            >
              <span>Explore the platform</span>
              <ArrowRight className="w-4 h-4 text-purple-100 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
