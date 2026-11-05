"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Search, ChevronDown } from "lucide-react";

// ─── iFLOW Brand Palette ──────────────────────────────────────────────────────
// Primary:   #3B1259  (deep purple)
// Accent:    #7E22CE  (vivid purple)
// Highlight: #9a3f91  (fuchsia)
// Text:      #0B132B  (near-black dark navy)
// ─────────────────────────────────────────────────────────────────────────────

interface OpportunityItem {
  id: string;
  title: string;
  subtitle: string;
  meta?: string[];
  category: "banks" | "nbfc" | "fintech";
  actionText?: string;
}

/** iFLOW-specific lending opportunity data replacing Tender247 government tenders */
const OPPORTUNITIES_DATA: Record<string, OpportunityItem[]> = {
  banks: [
    {
      id: "bank-1",
      title: "Retail Home Loan Origination",
      subtitle: "Automated underwriting & KYC verification",
      meta: ["Credit Decisioning", "Bureau Integration"],
      category: "banks",
      actionText: "Explore solution",
    },
    {
      id: "bank-2",
      title: "Co-lending Programme Setup",
      subtitle: "Bank-NBFC co-origination infrastructure",
      meta: ["Pool Management", "Collections Workflow"],
      category: "banks",
      actionText: "Explore solution",
    },
    {
      id: "bank-3",
      title: "MSME Working Capital Loans",
      subtitle: "GST-linked & cash-flow based lending",
      meta: ["API Stack", "Real-time Decisioning"],
      category: "banks",
      actionText: "Explore solution",
    },
  ],
  nbfc: [
    {
      id: "nbfc-1",
      title: "Consumer Durable Lending",
      subtitle: "Point-of-sale BNPL & EMI infrastructure",
      meta: ["e-NACH Setup", "Instant Disbursal"],
      category: "nbfc",
      actionText: "Explore solution",
    },
    {
      id: "nbfc-2",
      title: "Gold Loan Digitalisation",
      subtitle: "Branch + digital hybrid gold loan flow",
      meta: ["LTV Monitoring", "Auction Workflow"],
      category: "nbfc",
      actionText: "Explore solution",
    },
    {
      id: "nbfc-3",
      title: "Microfinance JLG Loans",
      subtitle: "Group lending with field-officer app",
      meta: ["Offline Capable", "RBI-compliant"],
      category: "nbfc",
      actionText: "Explore solution",
    },
  ],
  fintech: [
    {
      id: "fin-1",
      title: "Embedded Finance Integration",
      subtitle: "Plug lending into any e-commerce / SaaS",
      meta: ["REST APIs", "Low-code Widgets"],
      category: "fintech",
      actionText: "Explore solution",
    },
    {
      id: "fin-2",
      title: "Credit-as-a-Service Platform",
      subtitle: "White-label LOS/LMS for fintech brands",
      meta: ["Multi-tenant", "Custom Branding"],
      category: "fintech",
      actionText: "Explore solution",
    },
    {
      id: "fin-3",
      title: "AI Credit Scoring Engine",
      subtitle: "Alternate data & bureau score blending",
      meta: ["ML Models", "Bureau APIs"],
      category: "fintech",
      actionText: "Explore solution",
    },
  ],
};

export default function ScrollZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const wordLeftRef = useRef<HTMLParagraphElement>(null);
  const wordRightRef = useRef<HTMLParagraphElement>(null);

  const [activeCategory, setActiveCategory] = useState<"banks" | "nbfc" | "fintech">("banks");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Auto-advance the highlighted card every 3.2 s
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedItemIndex((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, [activeCategory]);

  // 60 fps scroll-driven zoom using direct DOM mutation + rAF (no React re-renders)
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const update = () => {
      if (!containerRef.current || !frameRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const trackLen = rect.height - vh;
      if (trackLen <= 0) { ticking = false; return; }

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / trackLen));

      const isMobile = window.innerWidth <= 768;
      const minScale = isMobile ? 0.26 : 0.19;

      // easeOutCubic — natural deceleration
      const zoomThresh = 0.50;
      const zp = Math.min(1, progress / zoomThresh);
      const ez = 1 - Math.pow(1 - zp, 3);

      const scale = minScale + (1 - minScale) * ez;
      const shift = ez * (isMobile ? window.innerWidth * 0.50 : window.innerWidth * 0.38);
      const opacity = Math.max(0, 1 - zp * 2.2);
      const radius = Math.max(0, 20 * (1 - ez));
      const shadowA = Math.max(0, 0.30 * (1 - ez));

      frameRef.current.style.transform = `scale(${scale.toFixed(4)})`;
      frameRef.current.style.borderRadius = `${radius.toFixed(1)}px`;
      frameRef.current.style.boxShadow = `0 30px 80px rgba(59, 18, 89, ${shadowA.toFixed(3)})`;

      if (wordLeftRef.current) {
        wordLeftRef.current.style.transform = `translateX(-${shift.toFixed(1)}px)`;
        wordLeftRef.current.style.opacity = opacity.toFixed(3);
      }
      if (wordRightRef.current) {
        wordRightRef.current.style.transform = `translateX(${shift.toFixed(1)}px)`;
        wordRightRef.current.style.opacity = opacity.toFixed(3);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; rafId = requestAnimationFrame(update); }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update(); // seed initial state

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const items = OPPORTUNITIES_DATA[activeCategory];
  const current = items[selectedItemIndex] ?? items[0];

  const catLabels: Record<string, string> = {
    banks: "Banks",
    nbfc: "NBFCs",
    fintech: "Fintech",
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white select-none"
      style={{ height: "380vh" }}
      aria-label="iFLOW Lending Journey — From opportunity to team in motion"
    >
      {/* ── Sticky Viewport ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">

        {/* ── Split Words Layer (z-10, beneath frame when frame is big) ──── */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8 md:px-12"
          aria-hidden="true"
        >
          <p
            ref={wordLeftRef}
            className="flex-1 text-right text-[clamp(18px,3.8vw,56px)] font-black uppercase tracking-tight text-[#0B132B] leading-[1.08] will-change-transform pr-4 sm:pr-6 md:pr-8"
          >
            FROM AN<br />OPPORTUNITY
          </p>

          {/* centre gap — matches thumbnail width at minScale */}
          <div className="shrink-0 w-[28vw] sm:w-[26vw] md:w-[23vw] lg:w-[21vw] max-w-[340px]" />

          <p
            ref={wordRightRef}
            className="flex-1 text-left text-[clamp(18px,3.8vw,56px)] font-black uppercase tracking-tight text-[#0B132B] leading-[1.08] will-change-transform pl-4 sm:pl-6 md:pl-8"
          >
            TO A TEAM<br />IN MOTION.
          </p>
        </div>

        {/* ── Zooming Frame (z-20 — rises above words as it expands) ──────── */}
        <div
          ref={frameRef}
          className="relative z-20 w-full h-full overflow-hidden flex items-center justify-center will-change-transform origin-center"
          style={{
            transform: "scale(0.19)",
            transformOrigin: "50% 50%",
            boxShadow: "0 30px 80px rgba(59,18,89,0.20)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
            background: "linear-gradient(135deg, #f7f3ff 0%, #f0e8ff 50%, #faf6ff 100%)",
          }}
        >
          {/* ── Background Image — light, clearly visible ─────────────── */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src="/discovery-bg-purple.webp"
              alt="iFLOW lending architecture illustration"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center select-none"
              style={{ opacity: 0.95 }}
            />
            {/* Soft subtle vignettes for clean border transitions */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/70 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/70 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/50 to-transparent" />

            {/* Ambient purple aura */}
            <div className="absolute left-[25%] top-[35%] w-96 h-96 rounded-full bg-purple-400/10 blur-[90px]" />
            <div className="absolute right-[20%] top-[40%] w-80 h-80 rounded-full bg-fuchsia-400/10 blur-[80px]" />

            {/* Concentric radar rings matching bidcontrol247 */}
            <div className="absolute left-[32%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none opacity-25">
              <div className="absolute inset-0 rounded-full border border-purple-500/50 animate-ping" style={{ animationDuration: "5s" }} />
              <div className="absolute inset-10 rounded-full border border-fuchsia-500/40 animate-pulse" />
              <div className="absolute inset-24 rounded-full border border-violet-500/30" />
            </div>
          </div>

          {/* ── Interactive Content ──────────────────────────────────────── */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: Glass Discovery Panel */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start relative">


              {/* Glass window card — light glassmorphism */}
              <div className="w-full max-w-[540px] bg-white/88 backdrop-blur-2xl rounded-2xl border border-purple-200/50 shadow-[0_20px_60px_rgba(59,18,89,0.15)] p-5 sm:p-6">

                {/* Window header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    {/* iFLOW mini brand chip */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#3B1259] to-[#7E22CE] border border-purple-400/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-300 animate-pulse" />
                      <span className="text-[11px] font-bold tracking-wider text-white uppercase">iFLOW</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Digital Lending Platform</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded">
                    SAMPLE
                  </span>
                </div>

                {/* Search bar — light */}
                <div className="relative flex items-center bg-[#F8F6FF] border border-purple-200/60 rounded-xl px-3.5 py-2.5 mb-4 shadow-inner shadow-purple-100/40">
                  <Search className="w-4 h-4 text-purple-400 shrink-0 mr-2.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium truncate">
                    {current.title}
                  </span>
                  <span className="w-0.5 h-4 bg-[#9a3f91] animate-pulse ml-1 shrink-0" />
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1" role="group" aria-label="Choose lending segment">
                  {(["banks", "nbfc", "fintech"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setActiveCategory(cat); setSelectedItemIndex(0); }}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                        activeCategory === cat
                          ? "bg-gradient-to-r from-[#3B1259] to-[#9a3f91] text-white border-purple-400/30 shadow-sm shadow-purple-900/20"
                          : "bg-slate-100/80 hover:bg-purple-50 text-slate-600 border-slate-200/80"
                      }`}
                    >
                      {catLabels[cat]}
                    </button>
                  ))}
                </div>

                {/* Opportunity / solution cards */}
                <div className="space-y-2.5">
                  {items.map((item, idx) => {
                    const sel = selectedItemIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItemIndex(idx)}
                        className={`relative rounded-xl p-3 sm:p-3.5 transition-all duration-300 cursor-pointer border ${
                          sel
                            ? "bg-gradient-to-r from-purple-50 via-fuchsia-50/60 to-purple-50/40 border-purple-400/60 shadow-md shadow-purple-900/8 ring-1 ring-purple-300/40"
                            : "bg-white/70 hover:bg-white border-slate-200/80 hover:border-purple-200/80"
                        }`}
                      >
                        {sel && (
                          <span className="absolute top-3.5 right-3.5 w-4 h-4 rounded-full bg-fuchsia-500 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                        <div className="pr-6">
                          {sel && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#7E22CE] bg-purple-100/80 border border-purple-200/60 px-1.5 py-0.5 rounded inline-block mb-1">
                              FEATURED SOLUTION
                            </span>
                          )}
                          <h4 className={`text-xs sm:text-sm font-bold leading-snug ${sel ? "text-[#3B1259]" : "text-slate-800"}`}>
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                            {item.subtitle}
                          </p>
                          {sel && item.meta && (
                            <div className="mt-2.5 pt-2 border-t border-purple-100 flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium">
                                {item.meta.map((m, i) => (
                                  <span key={i} className="bg-white px-2 py-0.5 rounded border border-purple-200/60">
                                    {m}
                                  </span>
                                ))}
                              </div>
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7E22CE] hover:text-[#9a3f91]">
                                <span>{item.actionText}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom status bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 border border-purple-200/60 text-[#7E22CE] flex items-center justify-center font-bold text-[10px]">
                      ↗
                    </span>
                    <div>
                      <span className="font-semibold text-slate-800 block leading-tight">Solution shortlisted</span>
                      <span className="text-[10px] text-slate-400">Next: schedule a demo &amp; go-live</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#7E22CE]">Ready</span>
                </div>

              </div>
            </div>

            {/* RIGHT: Scene Copy */}
            <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
              <div className="w-full max-w-lg bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 shadow-[0_20px_50px_rgba(59,18,89,0.08)]">
                {/* Step kicker */}
                <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#7E22CE] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a3f91] animate-pulse" />
                  01 / LENDING DISCOVERY
                </span>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl font-black text-[#0B132B] tracking-tight leading-[1.1] mb-3">
                  Lending Discovery
                  <br />
                  <span className="bg-gradient-to-r from-[#7E22CE] via-[#9a3f91] to-[#3B1259] bg-clip-text text-transparent font-serif italic font-medium">
                    &amp; Shortlisting
                  </span>
                </h2>

                {/* Body */}
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5">
                  Discover tailored digital lending infrastructure for Banks, NBFCs and Fintechs across retail, MSME and co-lending programmes. Shortlist relevant architectures, then deploy seamlessly in 4–8 weeks.
                </p>

                {/* CTA Link */}
                <a
                  href="/solutions"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7E22CE] hover:text-[#3B1259] transition-colors mb-6"
                >
                  <span className="border-b border-purple-300 group-hover:border-[#623f99] pb-0.5">Explore all lending solutions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Milestone pills */}
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-700 pt-2 border-t border-purple-100/60">
                  {["01 Discover", "02 Configure", "03 Deploy"].map((label, i) => (
                    <React.Fragment key={label}>
                      {i > 0 && <span className="text-slate-300">·</span>}
                      <span className="px-2.5 py-1 rounded-full bg-purple-50/80 border border-purple-200/60 text-purple-900 shadow-xs">
                        {label}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom chapter bar */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-between px-8 text-[10px] sm:text-xs font-semibold text-slate-500/70 pointer-events-none">
            <span className="tracking-widest">01 — DISCOVER</span>
            <div className="flex items-center gap-1.5 animate-bounce text-slate-600/60">
              <span>SCROLL TO EXPLORE</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
            <span className="font-mono text-[10px]">iFLOW PLATFORM</span>
          </div>

        </div>
      </div>
    </section>
  );
}
