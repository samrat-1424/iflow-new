"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Handshake,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  BrainCircuit,
  Layers,
} from "lucide-react";

interface PlayingCardDeckProps {
  solutionSlug?: string;
  initialTag?: string;
  initialName?: string;
  initialStatusBadge?: string;
  initialStats?: Array<{ value: string; label: string }>;
  initialCapabilities?: string[];
}

export default function PlayingCardDeck({
  solutionSlug = "co-lending",
  initialTag,
  initialName,
  initialStatusBadge,
  initialStats,
  initialCapabilities,
}: PlayingCardDeckProps) {
  const isAiMl = solutionSlug === "ai-intelligent-suite" || solutionSlug === "ai-ml-score-models";
  const isPoolBuyout = solutionSlug === "pool-buyout";

  // ── Exact Card Content (Single Main Card — Tailored by Solution) ────────
  const mainCard = {
    tag: initialTag || (isAiMl ? "AI INTELLIGENT SUITE" : isPoolBuyout ? "PORTFOLIO ACQUISITION" : "CO-LENDING PLATFORM"),
    name: initialName || (isAiMl ? "AI Intelligent Suite" : isPoolBuyout ? "Pool Buyout" : "Co-Lending"),
    statusBadge: initialStatusBadge || (isAiMl ? "AI Intelligent Core" : isPoolBuyout ? "RBI DA Directions 2025" : "RBI Directions 2025"),
    stats: initialStats || (isAiMl ? [
      { value: "2.5x", label: "BETTER GINI SCORE" },
      { value: "Real-Time", label: "DYNAMIC LIMITS" },
      { value: "Continuous", label: "MODEL DRIFT MONITORING" },
    ] : isPoolBuyout ? [
      { value: "₹5,000 Cr+", label: "POOLS DIGITIZED" },
      { value: "T+2 Days", label: "DUE DILIGENCE CYCLE" },
      { value: "Seamless", label: "CBS MIGRATION" },
    ] : [
      { value: "80:20 & 90:10", label: "CLM 1 & 2 SUPPORT" },
      { value: "T+0", label: "ESCROW SETTLEMENT" },
      { value: "100%", label: "RBI COMPLIANT" },
    ]),
    capabilities: initialCapabilities || (isAiMl ? [
      "Alternative Data Ingestion",
      "Explainable AI (XAI)",
      "Automated Retraining",
      "Portfolio Risk Heatmaps",
    ] : isPoolBuyout ? [
      "Automated Pool Sampling",
      "Risk & Yield Valuation",
      "Tape Scrubbing Engine",
      "Escrow & Account Split",
    ] : [
      "Automated Escrow Flow",
      "Dynamic Repayment Split",
      "Tripartite Reconciliation",
      "RBI 2025 Audit Trail",
    ]),
    footerLeft: isAiMl ? "ISO 27001 & SOC-2" : isPoolBuyout ? "Direct Assignment & PTC" : "Enterprise Tenant Security",
    footerRight: isAiMl ? "Automated Decisioning" : isPoolBuyout ? "RBI & Audit Compliant" : "RBI & SOC-2",
  };

  // ── 3D Card Flourish State ─────────────────────────────────────────────────
  // isSpread: false = cards initially rest accumulated in the deck
  //           true  = on first scroll, cards blossom out into 3D flourish
  const [isSpread, setIsSpread] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const isManualOverrideRef = useRef(false);
  const overrideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Viewport Detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Page Scroll Driven Flourish & Accumulation ─────────────────────────────
  // Initially on page load, cards remain cleanly stacked in the deck.
  // On the first scroll down, cards start showing their 3D flourish ribbon effect.
  // When scrolled back to the top (scrollY <= 10px), cards fold back into the deck.
  // When scrolled past the hero section (scrollY > 700px), cards tuck away cleanly.
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (isManualOverrideRef.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        const foldThreshold = typeof window !== "undefined" ? Math.max(700, window.innerHeight * 0.85) : 700;
        // On first scroll down (scrollY > 15px), cards blossom outward into their 3D ribbon flourish
        if (scrollY > 15 && scrollY <= foldThreshold) {
          setIsSpread((prev) => (prev ? prev : true));
        } else if (scrollY <= 10) {
          // At the very top before scrolling, cards remain cleanly stacked in the deck
          setIsSpread((prev) => (prev ? false : prev));
        } else if (scrollY > foldThreshold) {
          // Beyond the hero section, fold cards back into the deck
          setIsSpread((prev) => (prev ? false : prev));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── 3D Gyroscopic Tilt on Mouse Move ───────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // ── Manual Toggle: Click to Flourish / Accumulate ──────────────────────────
  const toggleFlourish = useCallback(() => {
    isManualOverrideRef.current = true;
    if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);

    setIsSpread((prev) => !prev);

    // Keep manual override active for 4 seconds after user interaction
    overrideTimerRef.current = setTimeout(() => {
      isManualOverrideRef.current = false;
    }, 4000);
  }, []);

  // ── 6 Luxury Flourished Cards in the Deck ──────────────────────────────────
  // Luxury card backs fanning in 3D across the header and gathering into the main card
  const flourishDeck = isAiMl
    ? [
        { id: "flourish-6", suit: "♠", rank: "A", depth: 6, label: "ENSEMBLE MODEL CORE" },
        { id: "flourish-5", suit: "♦", rank: "K", depth: 5, label: "EXPLAINABLE AI (XAI)" },
        { id: "flourish-4", suit: "♣", rank: "Q", depth: 4, label: "REAL-TIME BRE ENGINE" },
        { id: "flourish-3", suit: "♥", rank: "J", depth: 3, label: "ALTERNATIVE DATA GRAPH" },
        { id: "flourish-2", suit: "♠", rank: "10", depth: 2, label: "MODEL DRIFT SURVEILLANCE" },
        { id: "flourish-1", suit: "♦", rank: "9", depth: 1, label: "BICRI RISK INDEX" },
      ]
    : isPoolBuyout
    ? [
        { id: "flourish-6", suit: "♠", rank: "A", depth: 6, label: "TAPE SCRUBBING ENGINE" },
        { id: "flourish-5", suit: "♦", rank: "K", depth: 5, label: "PORTFOLIO STRATIFICATION" },
        { id: "flourish-4", suit: "♣", rank: "Q", depth: 4, label: "VALUATION & YIELD MODEL" },
        { id: "flourish-3", suit: "♥", rank: "J", depth: 3, label: "ESCROW & SETTLEMENT FLOW" },
        { id: "flourish-2", suit: "♠", rank: "10", depth: 2, label: "SEAMLESS CBS MIGRATION" },
        { id: "flourish-1", suit: "♦", rank: "9", depth: 1, label: "DA & PTC SECURITIZATION" },
      ]
    : [
        { id: "flourish-6", suit: "♠", rank: "A", depth: 6, label: "PLATFORM ARCHITECTURE" },
        { id: "flourish-5", suit: "♦", rank: "K", depth: 5, label: "ESCROW LEDGER CORE" },
        { id: "flourish-4", suit: "♣", rank: "Q", depth: 4, label: "MULTI-TENANT RECON" },
        { id: "flourish-3", suit: "♥", rank: "J", depth: 3, label: "REGULATORY AUDIT 2025" },
        { id: "flourish-2", suit: "♠", rank: "10", depth: 2, label: "DYNAMIC REPAYMENT SPLIT" },
        { id: "flourish-1", suit: "♦", rank: "9", depth: 1, label: "CLM 1 & 2 ENGINE" },
      ];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[440px] mx-auto select-none pt-5 sm:pt-7"
      style={{ perspective: "1800px" }}
      aria-label="3D Playing Card Flourish — Co-Lending"
    >
      {/* ── CSS Keyframe Animations for 3D Microgravity Floating ─────────────── */}
      <style jsx>{`
        @keyframes flourishWave {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          50% {
            transform: translateY(-4px) rotateZ(0.4deg);
          }
        }
        .flourish-floating {
          animation: flourishWave 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* ── 3D Canvas with Parallax Tilt ─────────────────────────────────────── */}
      <div
        className="relative w-full h-[445px] sm:h-[460px] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── 6 Flourished Cards (Spread across header, accumulate into right card) ── */}
        {flourishDeck.map((card) => {
          const idx = card.depth; // 1 to 6 (1 is directly behind main card, 6 is outermost)

          // 1. Accumulated Position: Tight physical card deck stack directly under main card
          const deckX = (idx % 2 === 0 ? -1 : 1) * (idx * 2);
          const deckY = -idx * 4;
          const deckZ = -idx * 14;
          const deckRotZ = (idx % 2 === 0 ? -1 : 1) * (idx * 0.7);
          const deckRotY = 0;
          const deckRotX = 0;
          const deckScale = 1 - idx * 0.015;

          // 2. Flourished Position: Sweeping 3D ribbon arcing gracefully across the header page
          // Controlled horizontal spread: -20px, -40px, -60px, -80px, -100px, -120px
          const flourishX = isMobile
            ? (idx % 2 === 0 ? -1 : 1) * (idx * 12)
            : -idx * 20;

          // Gentle upward arc that stays completely safe within the container top padding
          const flourishY = isMobile
            ? -idx * 4
            : -idx * 3 - Math.sin((idx / 6) * Math.PI) * 8; // Max upward offset is only ~14px

          // 3D Depth & Rotations: Genuine cardistry fan with 3D yaw, pitch, and depth
          const flourishZ = -idx * 20;
          const flourishRotZ = isMobile
            ? (idx % 2 === 0 ? -1 : 1) * (idx * 2)
            : -idx * 3.2; // -3.2°, -6.4°, -9.6°, -12.8°, -16°, -19.2°
          const flourishRotY = isMobile ? 0 : -idx * 2.8; // 3D yaw angle facing towards the viewer
          const flourishRotX = isMobile ? 0 : idx * 1.2; // 3D pitch
          const flourishScale = 1 - idx * 0.018;

          // Active transforms depending on isSpread
          const currentX = isSpread ? flourishX : deckX;
          const currentY = isSpread ? flourishY : deckY;
          const currentZ = isSpread ? flourishZ : deckZ;
          const currentRotZ = isSpread ? flourishRotZ : deckRotZ;
          const currentRotY = isSpread ? flourishRotY : deckRotY;
          const currentRotX = isSpread ? flourishRotX : deckRotX;
          const currentScale = isSpread ? flourishScale : deckScale;

          // Staggered cascade delay:
          // When spreading: cards fan outward sequentially from 1 to 6
          // When accumulating: cards gather inward sequentially from 6 to 1
          const transitionDelay = isSpread ? (idx - 1) * 45 : (6 - idx) * 35;
          const zIndex = 30 - idx * 3;

          return (
            <div
              key={card.id}
              onClick={toggleFlourish}
              style={{
                transform: `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateZ(${currentRotZ}deg) rotateY(${currentRotY}deg) rotateX(${currentRotX}deg) scale(${currentScale})`,
                zIndex,
                transition: `transform 650ms cubic-bezier(0.25, 1, 0.35, 1) ${transitionDelay}ms, box-shadow 400ms ease`,
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 rounded-3xl border-2 border-white/70 bg-gradient-to-br from-[#120424] via-[#2d0c4d] to-[#0a0216] p-4 sm:p-5 shadow-2xl shadow-purple-950/40 overflow-hidden cursor-pointer will-change-transform transform-gpu group hover:border-purple-300"
            >
              {/* Luxury Playing Card Back Design (Guilloche lattice pattern with holographic seal) */}
              <div
                className={`relative w-full h-full rounded-2xl border border-white/25 overflow-hidden flex flex-col justify-between p-3.5 bg-gradient-to-br from-purple-900/40 via-fuchsia-950/20 to-purple-950/60 ${
                  isSpread ? "flourish-floating" : ""
                }`}
                style={{
                  animationDelay: `${idx * 0.35}s`,
                }}
              >
                {/* Intricate Geometric Micro-Grid Pattern */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-25 [background-image:radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:9px_9px]"
                />

                {/* Symmetrical Corner Pips */}
                <div className="flex items-center justify-between text-white/70 text-[10px] font-mono font-bold select-none z-10">
                  <div className="flex flex-col items-center leading-none">
                    <span>{card.rank}</span>
                    <span className="text-[#e51ede] text-xs">{card.suit}</span>
                  </div>
                  <span className="text-[8px] uppercase tracking-widest text-purple-200/70 font-semibold">
                    iFLOW DECK
                  </span>
                </div>

                {/* Center Metallic Foil Holographic Medallion */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-12 h-12 rounded-full border border-purple-300/50 bg-white/10 backdrop-blur-xs flex items-center justify-center shadow-lg shadow-purple-900/30 group-hover:scale-105 group-hover:border-purple-300 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-purple-200" />
                  </div>
                  <span className="text-[7.5px] font-mono font-bold tracking-[0.2em] text-purple-300/75 uppercase mt-1.5">
                    {card.label}
                  </span>
                </div>

                {/* Inverted Bottom Corner Pips */}
                <div className="flex items-center justify-between text-white/70 text-[10px] font-mono font-bold select-none z-10">
                  <span className="text-[8px] tracking-wider text-purple-200/70 font-semibold">
                    FINTECH
                  </span>
                  <div className="flex flex-col items-center leading-none rotate-180">
                    <span>{card.rank}</span>
                    <span className="text-[#e51ede] text-xs">{card.suit}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── THE ONE ACCUMULATED MAIN CARD (Right side place where it is) ──── */}
        <div
          onClick={toggleFlourish}
          style={{
            transform:
              isHovered && !isSpread
                ? "translate3d(0, -4px, 20px) scale(1.01)"
                : "translate3d(0, 0, 0) scale(1)",
            zIndex: 40,
            transition: "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease",
          }}
          className="absolute inset-0 rounded-3xl border border-purple-200/90 bg-white shadow-2xl shadow-purple-950/20 p-6 sm:p-7 flex flex-col justify-between overflow-hidden will-change-transform transform-gpu cursor-pointer"
        >
          {/* Top Decorative Purple/Magenta Gradient Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

          <div>
            {/* ── Card Header ─────────────────────────────────────────────── */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center p-2.5 shadow-md shadow-purple-900/20 flex-shrink-0">
                  {isAiMl ? (
                    <BrainCircuit className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                  ) : isPoolBuyout ? (
                    <Layers className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                  ) : (
                    <Handshake className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
                  )}
                </div>
                <div>
                  <span className="font-mono text-[9.5px] font-bold tracking-[0.2em] text-[#9a3f91] uppercase block">
                    {mainCard.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    {mainCard.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* ── Key Metrics Grid ────────────────────────────────────────── */}
            <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-slate-100 bg-slate-50/70 rounded-xl px-3 text-center">
              {mainCard.stats.map((stat, i) => (
                <div key={i} className="flex flex-col justify-center">
                  <div className="text-base sm:text-lg font-extrabold text-[#0a1f44] tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase block mt-1.5 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Key Capabilities Pills ──────────────────────────────────── */}
            <div className="mt-4">
              <span className="text-[10.5px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-2.5">
                CORE CAPABILITIES
              </span>
              <div className="flex flex-wrap gap-2">
                {mainCard.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50/70 border border-purple-100 text-slate-700 text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                    <span>{cap}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Card Footer: Security / Architecture ──────────────────────── */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7c3aed]" />
              <span className="font-medium text-slate-600">
                {mainCard.footerLeft}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#623f99] font-bold">
              {mainCard.footerRight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
