"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { BrainCircuit, Lightbulb, ShieldCheck, TrendingUp, Mountain, Flag, ChevronLeft, ChevronRight, Sparkles,
  ArrowUpRight } from "lucide-react";

const LeaderSection = dynamic(() => import("../../components/LeaderSection"), { ssr: false });
const TeamSectionComp = dynamic(() => import("../../components/TeamSection"), { ssr: false });

const uniqueFeatures = [
  {
    icon: BrainCircuit,
    title: "AI-Focused Credit Engine",
    desc: "Advanced underwriting models built for scalable lending.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven Loan Architecture",
    desc: "Technology designed to open up what's possible for lenders.",
  },
  {
    icon: ShieldCheck,
    title: "Technology Meets Responsible Lending",
    desc: "Compliance and fairness engineered into every journey.",
  },
  {
    icon: TrendingUp,
    title: "Precision Risk, Profitable Growth",
    desc: "Strong portfolio monitoring with disciplined capital deployment.",
  },
];

export default function AboutSections() {
  return (
    <>
      {/* ── About iFLOW Hero Section ── */}
      <section className="relative overflow-hidden bg-white w-full">
        {/* Soft radial glow backgrounds matching the redesign */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-fuchsia-100/40 blur-[100px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-14 pb-16 md:pt-16 md:pb-20">
          {/* Breadcrumb */}
         
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-widest text-[#7c3aed] uppercase mb-4">
            About iFLOW
          </p>

          {/* Main Heading with Gradient Highlight */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12] max-w-3xl">
            Progress isn&apos;t a destination.{" "}
            <span className="text-[#9a3f91]">
              It&apos;s how we work
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Designed exclusively for the BFSI sector, iFLOW powers bold digital innovation for banks and NBFCs across India.
          </p>
        </div>
      </section>

      {/* ── Who We Are Section ── */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Who we are text */}
          <div>
            <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#7c3aed] uppercase mb-4">
              WHO WE ARE
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Built for the{" "}
              <span className="font-serif italic font-normal text-slate-900">
                BFSI sector.
              </span>
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                We build integrated technology ecosystems that streamline and transform mission-critical financial operations — spanning intelligent data management, automated underwriting, risk modeling, regulatory compliance, and advanced analytics.
              </p>
              <p>
                Our end-to-end technology architecture modernizes the lending lifecycle — from real-time data orchestration and predictive risk assessment to automated compliance monitoring and performance analytics — enabling faster decisions, smarter risk controls and high-performance credit operations.
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Unique Feature Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {uniqueFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="h-full rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#623f99] to-[#8a57cf] text-white shadow-md shadow-purple-200">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 font-bold text-base text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* ── TECHNOLOGY & INNOVATION ── */}
      <section className="relative py-20 sm:py-24 lg:py-28 px-6 md:px-10 lg:px-14 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden border-b border-purple-800/40">
        {/* Ambient background lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-purple-500/25 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/4 w-[420px] h-[420px] rounded-full bg-fuchsia-500/20 blur-[110px]"
        />

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Section Eyebrow */}
          <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#f472b6] uppercase mb-4">
            TECHNOLOGY &amp; INNOVATION
          </p>

          {/* Section Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.14] mb-14 lg:mb-20 max-w-4xl">
            Innovation is not a feature.{" "}
            <span className="font-serif italic font-normal text-purple-200">
              It is how we build.
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Concentric Planetary / Orbital Architecture */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <style>{`
                @keyframes orbit-spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes orbit-spin-rev {
                  from { transform: rotate(360deg); }
                  to { transform: rotate(0deg); }
                }
              `}</style>
              <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square flex items-center justify-center select-none">
                {/* Outer Ring (Clearly Visible) */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-purple-300/60 shadow-[0_0_25px_rgba(216,180,254,0.25)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Middle Ring (Dashed Orbital Path - Moving Clockwise) */}
                <div
                  className="absolute inset-[18%] rounded-full border-2 border-dashed border-purple-200/85 shadow-[0_0_15px_rgba(232,121,249,0.25)] pointer-events-none"
                  style={{ animation: "orbit-spin 22s linear infinite" }}
                  aria-hidden="true"
                />

                {/* Inner Ring (Dotted Orbital Path - Moving Counter-Clockwise) */}
                <div
                  className="absolute inset-[36%] rounded-full border-2 border-dotted border-purple-200/75 shadow-[0_0_10px_rgba(192,132,252,0.2)] pointer-events-none"
                  style={{ animation: "orbit-spin-rev 16s linear infinite" }}
                  aria-hidden="true"
                />

                {/* Orbital Tag: DATA (at ~12 o'clock on middle ring) */}
                <span className="absolute top-[8%] left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-purple-300 uppercase">
                  DATA
                </span>

                {/* Orbital Tag: FLOW (at ~3 o'clock inside outer ring) */}
                <span className="absolute top-1/2 -translate-y-1/2 right-[4%] font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-purple-300 uppercase">
                  FLOW
                </span>

                {/* Orbital Tag: API (at ~7:30 o'clock inside circle) */}
                <span className="absolute bottom-[17%] left-[17%] font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-purple-300 uppercase">
                  API
                </span>

                {/* Glowing Core Orb with 'iF' logo */}
                <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#c026d3] via-[#a855f7] to-[#ec4899] shadow-[0_0_55px_rgba(217,70,239,0.5),inset_0_0_25px_rgba(255,255,255,0.35)] flex items-center justify-center transition-transform duration-500 hover:scale-105">
                  <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-md select-none">
                    iF
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Numbered Architectural Pillars */}
            <div className="lg:col-span-7">
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {[
                  {
                    num: "01",
                    title: "Intelligent Decisioning",
                    desc: "AI-supported assessment, rules and underwriting workflows.",
                  },
                  {
                    num: "02",
                    title: "Connected Architecture",
                    desc: "Modular platforms and API-enabled lending systems.",
                  },
                  {
                    num: "03",
                    title: "Workflow Automation",
                    desc: "Digitised processes and configurable journeys.",
                  },
                  {
                    num: "04",
                    title: "Data-Led Intelligence",
                    desc: "Credit insights, monitoring and decision support.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="py-6 sm:py-7 flex items-start gap-6 sm:gap-8 group">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-purple-400/80 w-8 sm:w-10 pt-1 flex-shrink-0">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-purple-200/75 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PURPOSE ── */}
      <section className="relative py-20 sm:py-24 lg:py-28 px-6 md:px-10 lg:px-14 bg-gradient-to-b from-[#fdfbfd] via-white to-[#faf7fd] border-b border-purple-100/70 overflow-hidden">
        {/* Soft background radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/3 w-80 h-80 rounded-full bg-purple-200/30 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-10 w-80 h-80 rounded-full bg-fuchsia-100/35 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Eyebrow */}
          <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#7c3aed] uppercase mb-4">
            OUR PURPOSE
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight mb-12 sm:mb-14 max-w-3xl">
            Clear intent.{" "}
            <span className="font-serif italic font-normal text-slate-900">
              Shared values.
            </span>
          </h2>

          {/* 2 Side-by-Side Hero Cards: Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision Card */}
            <div className="rounded-3xl p-8 sm:p-10 lg:p-12 bg-[#ede4f7] border border-purple-200/50 shadow-sm flex flex-col justify-between min-h-[300px] sm:min-h-[340px] hover:shadow-md transition-shadow">
              <span className="font-mono text-xs font-bold tracking-widest text-[#623f99]/75 uppercase mb-6 block">
                VISION
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-normal text-slate-800 leading-relaxed">
                To contribute to a more connected and intelligent financial ecosystem through technology that makes lending simpler, smarter and more accessible.
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white shadow-xl shadow-purple-950/20 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] hover:shadow-2xl transition-shadow relative overflow-hidden">
              <span className="font-mono text-xs font-bold tracking-widest text-purple-200/90 uppercase mb-6 block">
                MISSION
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-normal text-purple-50 leading-relaxed">
                To build reliable, adaptable technology that helps institutions improve lending operations and serve evolving customer needs.
              </p>
            </div>
          </div>

          {/* 5 Bottom Values Row */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-purple-100/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:divide-x lg:divide-purple-100/80">
            {[
              { num: "01", title: "Innovation" },
              { num: "02", title: "Integrity" },
              { num: "03", title: "Collaboration" },
              { num: "04", title: "Customer Focus" },
              { num: "05", title: "Continuous Learning" },
            ].map((v, i) => (
              <div key={i} className="pl-0 lg:first:pl-0 lg:pl-6">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[#ec4899] mb-2 sm:mb-3 block">
                  {v.num}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-800 tracking-tight block">
                  {v.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ── Leader Section & Team Section (Preserved) ── */}
      <LeaderSection />
      <div className="mt-12">
        <TeamSectionComp />
      </div>

      {/* ── Company Mountain Roadmap ── */}
      <CompanyRoadmap />

      {/* ── INDUSTRY PRESENCE ── */}
      <section className="relative py-20 sm:py-24 lg:py-28 px-6 md:px-10 lg:px-14 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden">
        {/* Soft background radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-purple-200/25 blur-[130px]"
        />

        <div className="relative max-w-7xl mx-auto z-10 text-center">
          {/* Eyebrow */}
          <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#7c3aed] uppercase mb-4">
            INDUSTRY PRESENCE
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight mb-12 sm:mb-16 max-w-3xl mx-auto">
            Connected to the{" "}
            <span className="font-serif italic font-normal text-slate-900">
              financial ecosystem.
            </span>
          </h2>

          {/* 6 Boxed Industry Segments Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl border border-purple-200/80 bg-white/90 backdrop-blur-md overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-purple-100/80 shadow-[0_4px_25px_rgba(98,63,153,0.04)] text-left">
            {[
              { num: "01", label: "Banks" },
              { num: "02", label: "NBFCs" },
              { num: "03", label: "Cooperative Banks" },
              { num: "04", label: "Fintechs" },
              { num: "05", label: "MSME Platforms" },
              { num: "06", label: "Digital Marketplaces" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] hover:bg-purple-50/50 transition-colors"
              >
                <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#7c3aed] mb-4 block">
                  {item.num}
                </span>
                <span className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Footnote / Disclaimer */}
          <p className="text-xs sm:text-[13px] text-slate-500 font-normal text-center mt-6 sm:mt-8 tracking-wide">
            Approved client and partner logos can be added once publication permissions are confirmed.
          </p>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-900/20 hover:opacity-95 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <span>Explore Our Solutions</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

/* ─────────────────────────────────────────────
   Milestone Expedition Data (Mountain Summits)
───────────────────────────────────────────── */
const mountainMilestones = [
  {
    year: "2018",
    emoji: "🚀",
    summit: "Genesis Basecamp",
    elevation: "Alt: 600m",
    title: "iFLOW is Founded",
    desc: "Assembled core banking & fintech engineering leaders to build India's premier digital lending technology suite.",
    badge: "Genesis",
    metric: "Day 1",
    highlight: "Core R&D Rails",
    colors: ["#623f99", "#8b5cf6"],
    x: 280,
    roadY: 460,
    cardTop: 190,
  },
  {
    year: "2019",
    emoji: "🏦",
    summit: "Product Ascent",
    elevation: "Alt: 1,400m",
    title: "Flagship LOS Launched",
    desc: "Released Loan Origination System V1.0 enabling instant digital onboarding for our first tier-1 bank partner.",
    badge: "Product V1",
    metric: "LOS Engine",
    highlight: "1st Banking Partner",
    colors: ["#7c3aed", "#9333ea"],
    x: 740,
    roadY: 340,
    cardTop: 80,
  },
  {
    year: "2020",
    emoji: "🧠",
    summit: "AI Innovation Peak",
    elevation: "Alt: 2,800m",
    title: "AI Underwriting Engine",
    desc: "Proprietary credit intelligence deployed, slashing loan turnaround time by 70% with real-time risk scoring.",
    badge: "AI Peak",
    metric: "70% Faster TAT",
    highlight: "Real-time AI",
    colors: ["#9333ea", "#a855f7"],
    x: 1200,
    roadY: 200,
    cardTop: 20,
  },
  {
    year: "2021",
    emoji: "🤝",
    summit: "Co-Lending Valley Pass",
    elevation: "Alt: 1,800m",
    title: "Co-Lending Infrastructure",
    desc: "Pioneered automated bank-NBFC co-lending rails under RBI framework, managing disbursals and splits at scale.",
    badge: "RBI Rails",
    metric: "Bank + NBFC",
    highlight: "RBI Aligned",
    colors: ["#a855f7", "#c026d3"],
    x: 1660,
    roadY: 420,
    cardTop: 150,
  },
  {
    year: "2022",
    emoji: "📈",
    summit: "Growth Pinnacle",
    elevation: "Alt: 3,600m",
    title: "Crossed ₹500 Cr Volume",
    desc: "Expanded across MSME, retail, and agri-loans. Onboarded 10+ marquee financial institutions across India.",
    badge: "Scale Peak",
    metric: "₹500+ Cr Disbursed",
    highlight: "10+ BFSI Leaders",
    colors: ["#c026d3", "#db2777"],
    x: 2120,
    roadY: 190,
    cardTop: 20,
  },
  {
    year: "2023",
    emoji: "💎",
    summit: "Full Suite Plateau",
    elevation: "Alt: 2,900m",
    title: "Full Unified Lending Suite",
    desc: "Complete end-to-end architecture: LOS + LMS + Collections + Real-Time Analytics under a single unified pane.",
    badge: "Full Stack",
    metric: "End-to-End",
    highlight: "Unified SaaS",
    colors: ["#9a3f91", "#7c3aed"],
    x: 2580,
    roadY: 340,
    cardTop: 80,
  },
  {
    year: "2024",
    emoji: "🌏",
    summit: "National Scale Ridge",
    elevation: "Alt: 4,200m",
    title: "Pan-India RegTech Scale",
    desc: "Active across 15+ Indian states with automated RBI compliance monitoring and proactive fraud defenses.",
    badge: "Pan-India",
    metric: "15+ States",
    highlight: "Automated RBI Audits",
    colors: ["#7c3aed", "#623f99"],
    x: 3040,
    roadY: 220,
    cardTop: 25,
  },
  {
    year: "2025+",
    emoji: "✨",
    summit: "Highest Apex Summit",
    elevation: "Alt: 5,000m+",
    title: "The Next Horizon",
    desc: "Pioneering embedded finance, autonomous credit workflows, and cross-border lending capabilities for Indian lenders.",
    badge: "Highest Peak",
    metric: "Global Ambition",
    highlight: "Autonomous Lending",
    colors: ["#623f99", "#ec4899"],
    x: 3500,
    roadY: 160,
    cardTop: 15,
  },
];

/* ─────────────────────────────────────────────
   3-D Tilt Summit Card
───────────────────────────────────────────── */
function SummitCard({
  item,
  isSelected,
  onClick,
}: {
  item: (typeof mountainMilestones)[0];
  isSelected: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(750px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = isSelected
        ? "perspective(750px) scale3d(1.03, 1.03, 1.03)"
        : "perspective(750px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    }
  };

  const gradient = `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-[300px] select-none cursor-pointer rounded-2xl transition-all duration-300 relative group ${
        isSelected
          ? "ring-2 ring-purple-500 shadow-[0_14px_38px_rgba(124,58,237,0.22)]"
          : "hover:shadow-[0_14px_32px_rgba(124,58,237,0.14)] shadow-[0_6px_22px_rgba(98,63,153,0.07)]"
      }`}
      style={{
        transform: isSelected ? "scale3d(1.03, 1.03, 1.03)" : "scale3d(1, 1, 1)",
      }}
    >
      {/* Outer ambient glow on hover / select */}
      <div
        className={`absolute -inset-0.5 rounded-2xl transition-opacity duration-500 blur-sm ${
          isSelected ? "opacity-60" : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ background: gradient }}
        aria-hidden="true"
      />

      {/* Card Body - Light Background */}
      <div className="relative rounded-2xl border border-purple-100 bg-white/95 backdrop-blur-xl p-4 overflow-hidden transition-all duration-300">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-1/2 -left-full h-[200%] w-1/2 bg-purple-200/25 rotate-12 group-hover:translate-x-[420%] transition-transform duration-700 ease-in-out" />
        </div>

        {/* Top Summit Elevation & Year Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Emoji in soft glowing pill */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-lg shadow-xs group-hover:scale-115 transition-transform duration-300"
            style={{ boxShadow: `0 2px 10px ${item.colors[0]}22` }}
          >
            {item.emoji}
          </div>

          <div className="flex flex-col items-start min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#623f99] flex items-center gap-1">
              <Mountain className="w-3 h-3 text-pink-500 inline" />
              {item.summit}
            </span>
            <span className="text-[9px] font-bold text-slate-500">{item.elevation}</span>
          </div>

          {/* Year pill */}
          <span
            className="ml-auto text-xs font-black px-2.5 py-1 rounded-full text-white shadow-xs"
            style={{ background: gradient }}
          >
            {item.year}
          </span>
        </div>

        {/* Milestone Title */}
        <h3 className="text-sm font-extrabold text-slate-900 leading-snug mb-1.5 group-hover:text-[#623f99] transition-colors duration-200 line-clamp-1">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] leading-relaxed text-slate-600 mb-2.5 line-clamp-2 group-hover:text-slate-800 transition-colors duration-200">
          {item.desc}
        </p>

        {/* Bottom Highlight / Metric Bar */}
        <div className="flex items-center justify-between pt-1.5 border-t border-purple-100 text-[10px]">
          <span className="font-semibold text-purple-700 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping inline-block" />
            {item.highlight}
          </span>
          <span className="font-black text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/80">
            {item.metric}
          </span>
        </div>

        {/* Bottom Accent line */}
        <div
          className="mt-2.5 h-[2px] rounded-full transition-all duration-500"
          style={{
            background: gradient,
            width: isSelected ? "100%" : "0%",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Company Roadmap Component
   Horizontal Scrolling Mountain & Hill Highway
───────────────────────────────────────────── */
// Pre-computed static stars to avoid Math.random() on every render & prevent hydration mismatches
const STATIC_STARS = Array.from({ length: 45 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rand1 = seed / 233280;
  const rand2 = ((seed * 9301 + 49297) % 233280) / 233280;
  const rand3 = ((seed * 19301 + 29297) % 233280) / 233280;
  return {
    id: i,
    x: (i * 82) % 3700,
    y: Math.round(20 + rand1 * 320),
    size: Number((rand2 * 2.2 + 0.8).toFixed(1)),
    dur: Number((rand3 * 5 + 4).toFixed(1)),
    delay: Number((rand1 * 4).toFixed(1)),
  };
});

function CompanyRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Pre-computed static stars for 60fps & no hydration mismatch
  const stars = STATIC_STARS;

  // Track Dimensions
  const TRACK_WIDTH = 3700;
  const TRACK_HEIGHT = 700;

  // Build smooth cubic bezier road path that curves up & down hills and mountain peaks
  const roadPath = (() => {
    let p = "M 40,490 ";
    for (let i = 0; i < mountainMilestones.length; i++) {
      const cur = mountainMilestones[i];
      if (i === 0) {
        p += `C 140,490 180,${cur.roadY} ${cur.x},${cur.roadY} `;
      } else {
        const prev = mountainMilestones[i - 1];
        const dx = (cur.x - prev.x) * 0.45;
        p += `C ${prev.x + dx},${prev.roadY} ${cur.x - dx},${cur.roadY} ${cur.x},${cur.roadY} `;
      }
    }
    p += "C 3580,160 3640,160 3680,160";
    return p;
  })();

  // Smooth scroll to a specific milestone
  const scrollToMilestone = (idx: number) => {
    setSelectedIdx(idx);
    const container = containerRef.current;
    if (!container) return;
    const target = mountainMilestones[idx];
    const offset = target.x - container.clientWidth / 2;
    container.scrollTo({
      left: Math.max(0, offset),
      behavior: "smooth",
    });
  };

  // Scroll left / right buttons
  const scrollStep = (direction: "left" | "right") => {
    const nextIdx =
      direction === "right"
        ? Math.min(mountainMilestones.length - 1, selectedIdx + 1)
        : Math.max(0, selectedIdx - 1);
    scrollToMilestone(nextIdx);
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeftState(containerRef.current?.scrollLeft || 0);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftState - walk;
  };
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;
    const onWindowMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onWindowMouseUp);
    return () => window.removeEventListener("mouseup", onWindowMouseUp);
  }, [isDragging]);

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20"
      style={{
        background: "linear-gradient(180deg, #fbfaff 0%, #f4edff 35%, #fbf8ff 70%, #ffffff 100%)", borderTop: "1px solid rgba(233, 213, 255, 0.6)", borderBottom: "1px solid rgba(233, 213, 255, 0.6)",
      }}
    >
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes shimmer-t {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
                @keyframes beacon-beam {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
        @keyframes float-particle {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), -75px) scale(1.6) rotate(var(--rot)); }
        }
        @keyframes car-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px #a855f7) drop-shadow(0 0 16px #ec4899); }
          50% { filter: drop-shadow(0 0 16px #ec4899) drop-shadow(0 0 28px #38bdf8); }
        }
        .roadmap-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .roadmap-scrollbar::-webkit-scrollbar-track {
          background: #f1edfa;
          border-radius: 9999px;
        }
        .roadmap-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #7c3aed, #ec4899);
          border-radius: 9999px;
        }
      `}</style>

      {/* Header Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center mb-10 sm:mb-14">
        <p className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.25em] text-[#7c3aed] uppercase mb-4 text-center">
          EXPEDITION ROADMAP
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-tight text-center max-w-3xl mx-auto">
          Company{" "}
          <span className="font-serif italic font-normal text-slate-900">
            Roadmap.
          </span>
        </h2>
      </div>

      {/* ── Horizontal Scrollable Mountain Landscape Viewport ── */}
      <div className="relative w-full overflow-hidden">
        {/* Floating Left & Right Floating Quick Arrows */}
        <button
          type="button"
          onClick={() => scrollStep("left")}
          disabled={selectedIdx === 0}
          aria-label="Scroll Left"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full border border-purple-200 bg-white/95 hover:bg-purple-50 text-slate-700 hover:text-purple-700 items-center justify-center backdrop-blur-lg shadow-xl transition-all hover:scale-110 disabled:opacity-20"
        >
          <ChevronLeft className="w-6 h-6 text-purple-300" />
        </button>
        <button
          type="button"
          onClick={() => scrollStep("right")}
          disabled={selectedIdx === mountainMilestones.length - 1}
          aria-label="Scroll Right"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full border border-purple-200 bg-white/95 hover:bg-purple-50 text-slate-700 hover:text-purple-700 items-center justify-center backdrop-blur-lg shadow-xl transition-all hover:scale-110 disabled:opacity-20"
        >
          <ChevronRight className="w-6 h-6 text-pink-300" />
        </button>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-full overflow-x-auto roadmap-scrollbar select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Inner Mountain Canvas Track */}
          <div
            className="relative"
            style={{
              width: `${TRACK_WIDTH}px`,
              height: `${TRACK_HEIGHT}px`,
            }}
          >
            {/* SVG Mountain Range, Hills, Highway & Beacons */}
            <svg
              viewBox={`0 0 ${TRACK_WIDTH} ${TRACK_HEIGHT}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Glow & Blur Filters */}
                <filter id="roadNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="16" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="rglow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="carglow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="10" />
                </filter>
                <filter id="orbglow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>

                {/* Milestone Gradients */}
                {mountainMilestones.map((m, i) => (
                  <radialGradient key={i} id={`mg${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={m.colors[1]} />
                    <stop offset="100%" stopColor={m.colors[0]} />
                  </radialGradient>
                ))}

                {/* Vertical Summit Beacon Gradients */}
                {mountainMilestones.map((m, i) => (
                  <linearGradient key={i} id={`beaconGrad${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor={m.colors[1]} stopOpacity="0.8" />
                    <stop offset="40%" stopColor={m.colors[0]} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={m.colors[0]} stopOpacity="0" />
                  </linearGradient>
                ))}

                {/* Mountain Gradients */}
                <linearGradient id="farMountainsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#25084a" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#080214" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="midMountainsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3d0e72" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0d041e" stopOpacity="1" />
                </linearGradient>

                {/* Rover Vehicle Gradient */}
                <linearGradient id="roverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <radialGradient id="roverHeadlight" cx="100%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Twinkling Night Stars */}
              {stars.map((s) => (
                <circle
                  key={s.id}
                  cx={s.x}
                  cy={s.y}
                  r={s.size}
                  fill="#c084fc" opacity="0.6"
                  style={{
                    animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                  }}
                />
              ))}

              {/* ── 1. Far Mountain Silhouettes ── */}
              <path
                d="M 0,700 L 0,380 L 180,240 L 420,380 L 740,160 L 1020,360 L 1200,110 L 1420,330 L 1660,260 L 1920,350 L 2120,95 L 2380,310 L 2580,200 L 2820,340 L 3040,130 L 3280,290 L 3500,80 L 3700,240 L 3700,700 Z"
                fill="url(#farMountainsGrad)"
                stroke="#c4b5fd"
                strokeWidth="1.5"
              />

              {/* ── 2. Mid Range Rolling Hills & Ridges ── */}
              <path
                d="M 0,700 L 0,470 Q 280,390 540,460 Q 820,290 1200,430 Q 1520,320 1860,460 Q 2120,270 2480,440 Q 2820,290 3180,410 Q 3420,250 3700,400 L 3700,700 Z"
                fill="url(#midMountainsGrad)"
                stroke="#a78bfa"
                strokeWidth="2"
              />

              {/* ── 3. Vertical Summit Beacons Shooting Into Sky ── */}
              {mountainMilestones.map((m, i) => (
                <polygon
                  key={i}
                  points={`${m.x - 22},${m.roadY} ${m.x + 22},${m.roadY} ${m.x + 4},0 ${m.x - 4},0`}
                  fill={`url(#beaconGrad${i})`}
                  style={{ animation: `beacon-beam 3s ease-in-out ${i * 0.4}s infinite` }}
                />
              ))}

              {/* ── 4. Outer Highway Neon Glow ── */}
              <path
                d={roadPath}
                fill="none"
                stroke="rgba(168, 85, 247, 0.35)"
                strokeWidth="58"
                strokeLinecap="round"
                filter="url(#roadNeonGlow)"
              />

              {/* ── 5. Highway Curb Rails ── */}
              <path
                d={roadPath}
                fill="none"
                stroke="rgba(192, 132, 252, 0.85)"
                strokeWidth="44"
                strokeLinecap="round"
              />

              {/* ── 6. Cyber Asphalt Road Deck ── */}
              <path
                d={roadPath}
                fill="none"
                stroke="#0e0422"
                strokeWidth="38"
                strokeLinecap="round"
              />

              {/* ── 7. Asphalt Lane Center ── */}
              <path
                d={roadPath}
                fill="none"
                stroke="#080216"
                strokeWidth="32"
                strokeLinecap="round"
              />

              {/* ── 8. Animated Dashed White Center Line ── */}
              <path
                d={roadPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="20 16"
                opacity="0.9"
                filter="url(#rglow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-36"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>

              {/* ── 9. Milestone Summit Checkpoint Pads ── */}
              {mountainMilestones.map((m, i) => {
                const isFocused = selectedIdx === i;
                return (
                  <g key={i}>
                    {/* Radar Pulse 1 */}
                    <circle cx={m.x} cy={m.roadY} r="24" fill={m.colors[0]} opacity="0">
                      <animate
                        attributeName="r"
                        values={isFocused ? "20;50;20" : "18;38;18"}
                        dur={isFocused ? "1.5s" : "2.4s"}
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values={isFocused ? "0.9;0;0.9" : "0.6;0;0.6"}
                        dur={isFocused ? "1.5s" : "2.4s"}
                        begin={`${i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Outer Dock Pad */}
                    <circle
                      cx={m.x}
                      cy={m.roadY}
                      r={isFocused ? "22" : "18"}
                      fill={`url(#mg${i})`}
                      filter="url(#orbglow)"
                      opacity="0.9"
                    />
                    <circle
                      cx={m.x}
                      cy={m.roadY}
                      r={isFocused ? "19" : "15"}
                      fill={`url(#mg${i})`}
                      stroke="#ffffff"
                      strokeWidth={isFocused ? "2.5" : "1.5"}
                    />
                    <circle cx={m.x} cy={m.roadY} r="6" fill="#ffffff" />

                    {/* Orbiting Satellite Photon */}
                    <circle cx={m.x} cy={m.roadY - 14} r="2.5" fill="#ffffff">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`0 ${m.x} ${m.roadY}`}
                        to={`360 ${m.x} ${m.roadY}`}
                        dur={`${3.5 + i * 0.4}s`}
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Roadside Elevation Label */}
                    <text
                      x={m.x}
                      y={m.roadY + 32}
                      textAnchor="middle"
                      fill="#475569"
                      fontSize="11"
                      fontWeight="900"
                      letterSpacing="0.5"
                    >
                      {m.year} • {m.elevation.replace("Alt: ", "")}
                    </text>

                    {/* Laser Tether Stem linking summit pad to card above */}
                    <line
                      x1={m.x}
                      y1={m.roadY - 20}
                      x2={m.x}
                      y2={m.cardTop + 145}
                      stroke={m.colors[1]}
                      strokeWidth={isFocused ? "2.5" : "1.5"}
                      strokeDasharray="4 3"
                      opacity={isFocused ? "1" : "0.75"}
                    />
                  </g>
                );
              })}

              {/* ── 10. Start Terminal (at x=40, y=490) ── */}
              <g>
                <circle cx="40" cy="490" r="28" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 4">
                  <animateTransform attributeName="transform" type="rotate" from="0 40 490" to="360 40 490" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="490" r="16" fill="#623f99" opacity="0.8" />
                <circle cx="40" cy="490" r="6" fill="#ffffff" />
                <text x="40" y="535" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="900" letterSpacing="1">
                  START 2018
                </text>
              </g>

              {/* ── 11. End Launchpad Pinnacle (at x=3680, y=160) ── */}
              <g>
                <circle cx="3680" cy="160" r="32" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="5 5">
                  <animateTransform attributeName="transform" type="rotate" from="360 3680 160" to="0 3680 160" dur="10s" repeatCount="indefinite" />
                </circle>
                <circle cx="3680" cy="160" r="22" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3">
                  <animateTransform attributeName="transform" type="rotate" from="0 3680 160" to="3680 3680 160" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx="3680" cy="160" r="14" fill="#ec4899" opacity="0.85" filter="url(#rglow)" />
                <circle cx="3680" cy="160" r="6" fill="#ffffff" />
                <text x="3680" y="210" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="900" letterSpacing="1">
                  NEXT HORIZON
                </text>
              </g>

              {/* ── 12. Cyber Rover Mountain Capsule Traveling Highway ── */}
              <g style={{ animation: "car-pulse 2.5s ease-in-out infinite" }}>
                <ellipse rx="32" ry="14" fill="url(#roverHeadlight)" filter="url(#carglow)">
                  <animateMotion dur="24s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#mountainRoadPathEl" />
                  </animateMotion>
                </ellipse>
                <rect
                  x="-16"
                  y="-9"
                  width="32"
                  height="18"
                  rx="9"
                  fill="url(#roverGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  filter="url(#rglow)"
                >
                  <animateMotion dur="24s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#mountainRoadPathEl" />
                  </animateMotion>
                </rect>
                <circle r="4.5" fill="#ffffff">
                  <animateMotion dur="24s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#mountainRoadPathEl" />
                  </animateMotion>
                </circle>
              </g>

              {/* Hidden Path Reference */}
              <path id="mountainRoadPathEl" d={roadPath} fill="none" stroke="none" />
            </svg>

            {/* ── HTML Summit Cards Positioned Directly Over Peaks ── */}
            {mountainMilestones.map((m, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${m.x - 150}px`,
                  top: `${m.cardTop}px`,
                  zIndex: selectedIdx === i ? 30 : 20,
                }}
              >
                <SummitCard
                  item={m}
                  isSelected={selectedIdx === i}
                  onClick={() => scrollToMilestone(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Expedition Coda ── */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-xs tracking-[.25em] uppercase font-bold mb-3">
          Climbing Higher with Every Partnership
        </p>
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-pink-500"
              style={{ animation: `bounce-d 1.2s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
