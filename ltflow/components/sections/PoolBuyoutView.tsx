"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CountUp from "@/components/CountUp";
import SectionRenderer from "@/components/SectionRenderer";
import {
  Layers,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  Database,
  Sliders,
  Check,
  ChevronDown,
  FileCheck,
  Eye,
  Scale,
  HelpCircle,
  LucideIcon,
  Zap,
  Target,
  FileText,
  Network,
  RotateCw,
  FolderKanban,
  ShieldCheck,
  Activity,
  Coins,
  CreditCard,
  Building2,
  RefreshCw,
  Cpu,
  Server,
  Filter,
  PieChart,
  Clock,
  Lock,
  Minus,
  AlertTriangle,
} from "lucide-react";

interface PoolBuyoutViewProps {
  solution: any;
}

const BASE_IMG_URL = process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "https://cms.ltflow.com";

function toUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE_IMG_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function sanitize(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/\ufffd/g, "–")
    .replace(/â€“/g, "–")
    .replace(/â€”/g, "—")
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/48 weeks/g, "4–8 weeks")
    .replace(/vsDirect/g, "vs Direct")
    .trim();
}

/**
 * Extracts bullet points from Strapi features string (markdown or newline separated)
 */
function parseBulletPoints(text: string | null | undefined): string[] {
  if (!text) return [];
  return sanitize(text)
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").replace(/^#+\s*/, "").trim())
    .filter((line) => Boolean(line) && line.length > 2);
}

/**
 * Intelligently maps Pool Buyout capability/challenge cards to contextual icons
 */
function getPoolBuyoutCardIcon(title: string = "", description: string = ""): LucideIcon {
  const t = (title + " " + description).toLowerCase();
  if (t.includes("upload") || t.includes("tape") || t.includes("scrub") || t.includes("ingest")) return Database;
  if (t.includes("validat") || t.includes("data error") || t.includes("reconciliation") || t.includes("check")) return FileCheck;
  if (t.includes("eligib") || t.includes("cibil") || t.includes("filter") || t.includes("select")) return Filter;
  if (t.includes("diligence") || t.includes("underwrit") || t.includes("audit") || t.includes("inspect")) return Eye;
  if (t.includes("valua") || t.includes("yield") || t.includes("npv") || t.includes("pricing") || t.includes("cash flow")) return TrendingUp;
  if (t.includes("assign") || t.includes("legal") || t.includes("contract") || t.includes("ptc") || t.includes("da")) return Scale;
  if (t.includes("migrat") || t.includes("cbs") || t.includes("lms") || t.includes("core")) return Server;
  if (t.includes("collect") || t.includes("repay") || t.includes("escrow") || t.includes("settle") || t.includes("split")) return Coins;
  if (t.includes("report") || t.includes("mis") || t.includes("monitor") || t.includes("surveill") || t.includes("analytics")) return BarChart3;
  if (t.includes("complian") || t.includes("rbi") || t.includes("regulat")) return ShieldCheck;
  if (t.includes("speed") || t.includes("manual") || t.includes("delay")) return Clock;
  if (t.includes("risk") || t.includes("loss") || t.includes("challenge") || t.includes("penalty")) return AlertTriangle;
  return Layers;
}

/**
 * Parses numeric stats from Strapi strings e.g. "₹50,000 Cr+", "120+", "99.9%"
 */
function parseStatValue(val: string | null | undefined) {
  if (!val) return { prefix: "", numericValue: 0, suffix: "", decimals: 0, hasNumeric: false };
  const str = String(val).trim();
  const hasRupee = str.includes("₹") || str.toLowerCase().includes("cr");
  const cleanStr = str.replace(/₹/g, "").trim();
  const numMatch = cleanStr.match(/[\d.]+/);
  if (!numMatch) {
    return { prefix: "", numericValue: 0, suffix: str, decimals: 0, hasNumeric: false };
  }
  const numStr = numMatch[0];
  const numericValue = parseFloat(numStr) || 0;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  let suffix = cleanStr.slice(cleanStr.indexOf(numStr) + numStr.length).trim();
  if (suffix.toLowerCase().startsWith("cr")) {
    suffix = " Cr" + suffix.slice(2);
  }
  const prefix = hasRupee ? "₹" : "";
  return { prefix, numericValue, suffix, decimals, hasNumeric: numericValue > 0 };
}

export default function PoolBuyoutView({ solution }: PoolBuyoutViewProps) {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // All dynamic sections from Strapi Content Manager
  const sections: any[] = solution?.sections || [];

  // ────────────────────────────────────────────────────────────────────────────
  // Why Pool Buyout Group (Strapi Sections 2, 3, 4 unified into 3-pillar showcase)
  // ────────────────────────────────────────────────────────────────────────────
  const whyPoolBuyoutSections = sections.filter((s) => {
    const b = String(s.badge || "").toLowerCase();
    const t = String(s.title || "").toLowerCase();
    const feat = String(s.features || "").toLowerCase();
    return (
      s.__component === "solution.feature-section" &&
      (b.includes("why pool buyout") ||
        t.includes("enterprise portfolio teams") ||
        feat.includes("expand your loan book") ||
        feat.includes("acquire performing portfolios") ||
        feat.includes("reduce manual processes"))
    );
  });

  const whyPillarsMeta = [
    {
      badge: "SCALABLE AUM EXPANSION",
      defaultTitle: "Expand Your Loan Book Efficiently",
      metric: "Automated Ingestion",
      metricLabel: "Sourcing Efficiency",
      icon: Zap,
      points: [
        "Automated tape ingestion filtering loan accounts against configurable credit policy",
        "Automated LTV, DPD, bureau, and geographic concentration knockout triggers",
        "Scalable balance sheet and AUM expansion without expanding branch networks",
      ],
    },
    {
      badge: "RISK MITIGATION & DUE DILIGENCE",
      defaultTitle: "Acquire Performing Portfolios with Confidence",
      metric: "Auditable Governance",
      metricLabel: "Risk Management",
      icon: ShieldCheck,
      points: [
        "Built-in due diligence workflows validating document completeness & repayment histories",
        "Automated exception handling and risk-weighted bucket classification",
        "Independent collateral assessment and legal title verification workflows",
      ],
    },
    {
      badge: "OPERATIONAL AUTOMATION",
      defaultTitle: "Automate Manual Workflows",
      metric: "Streamlined Opex",
      metricLabel: "Process Automation",
      icon: Cpu,
      points: [
        "Eliminate spreadsheet dependencies with a single auditable, workflow-driven digital platform",
        "Dynamic NPV valuation, CPR prepayment modeling, and cash-flow loss curves",
        "Seamless Core Banking System (CBS) and LMS portfolio migration and ledger setup",
      ],
    },
  ];

  const whyPillars = whyPillarsMeta.map((meta, idx) => {
    const sec = whyPoolBuyoutSections[idx] || {};
    const rawFeat = sec.features || "";
    const titleMatch = rawFeat.match(/\*\*([^*]+)\*\*/);
    let title = titleMatch ? titleMatch[1].trim() : meta.defaultTitle;
    let desc = rawFeat
      ? rawFeat
          .replace(/^#+\s*\*\*([^*]+)\*\*/, "")
          .replace(/^#+\s*/gm, "")
          .trim()
      : "";

    title = title
      .replace(/Reduce Manual Processes by 80%/gi, "Automate Manual Workflows")
      .replace(/10x Faster Ingestion/gi, "Automated Ingestion")
      .replace(/100,000\+/gi, "Large-Scale")
      .replace(/80% Lower Opex/gi, "Streamlined Opex");

    desc = desc
      .replace(/Reduce Manual Processes by 80%/gi, "Automate Manual Workflows")
      .replace(/100,000\+/gi, "high-volume")
      .replace(/80%/g, "significant");

    const image = sec.image?.url
      ? toUrl(sec.image.url)
      : idx === 0
      ? toUrl("/uploads/Knowledge_Representation_Text_Analysis_6b153cbba9.webp")
      : idx === 1
      ? toUrl("/uploads/697b0ad4672c4545ce46b097_Top_Fintech_Lending_for_Startups_to_Know_in_2026_India_and_Global_8726864b0e.jpg")
      : toUrl("/uploads/Custom_Built_Chatbots_1_433c4f542e.webp");

    return {
      idx: String(idx + 1).padStart(2, "0"),
      badge: meta.badge,
      title,
      desc: desc || "Acquire performing portfolios with speed, precision, and complete auditability.",
      points: meta.points,
      image,
      metric: meta.metric,
      metricLabel: meta.metricLabel,
      icon: meta.icon,
    };
  });

  const whyMainSec = whyPoolBuyoutSections[0] || {};
  const whyBadge = sanitize(whyMainSec.badge) || "WHY POOL BUYOUT?";
  const whyTitle = sanitize(whyMainSec.title) || "Built for Enterprise Portfolio Teams";
  const whySubtitle =
    sanitize(whyMainSec.description) ||
    "iFLOW eliminates the inefficiencies of traditional loan portfolio acquisition, giving you speed, accuracy, and full auditability.";

  const whyIds = new Set(whyPoolBuyoutSections.map((s) => s.id).filter(Boolean));
  const faqData = solution?.faq_section || {};
  const dynamicFaqs: any[] = faqData.faqs || [];
  const faqTitle = sanitize(faqData.title) || "Frequently Asked Questions";


  // ────────────────────────────────────────────────────────────────────────────
  // JSON-LD Structured Data Schema for Google Rich SEO Snippets
  // ────────────────────────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "iFLOW Loan Pool Buyout & Direct Assignment Platform",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Cloud Native (AWS, Azure, Kubernetes)",
        "description":
          "Enterprise digital platform for loan pool buyout, Direct Assignment (DA), and PTC securitization. Features automated tape scrubbing, yield valuation, and seamless CBS core banking migration.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
        },
      },
      ...(dynamicFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": dynamicFaqs.map((faq: any) => ({
                "@type": "Question",
                "name": sanitize(faq.question),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": sanitize(faq.answer),
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div id="platform-capabilities" className="w-full bg-white text-slate-900">
      {/* JSON-LD Schema for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: EXECUTIVE OVERVIEW — Institutional Portfolio Acquisition
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        aria-labelledby="overview-heading"
        className="relative py-20 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
              EXECUTIVE OVERVIEW
            </span>
            <h2 id="overview-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Institutional Loan Portfolio Acquisition (DA &amp; PTC) Platform
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Replace spreadsheet chaos with an automated, auditable platform designed for Banks, NBFCs, and HFCs to acquire performing loan books at enterprise scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: 3 Architectural Pillars */}
            <div className="lg:col-span-6 space-y-4">
              {/* Pillar 1 */}
              <div className="group rounded-2xl p-5 sm:p-6 bg-white border border-purple-100/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#623f99] border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors duration-300">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                      AUTOMATED TAPE SCRUBBING
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      Automated Loan Tape Ingestion &amp; Validation
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Scrub and validate loan records against configurable credit policies, bureau criteria, DPD knockouts, and portfolio concentrations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-purple-50/70 via-white to-purple-50/40 border border-purple-200 shadow-md shadow-purple-900/5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                      REAL-TIME PORTFOLIO VALUATION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      Dynamic Yield &amp; Cash Flow Stress Testing
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Compute Net Present Value (NPV), prepayment CPR models, and delinquency loss curves dynamically to price portfolios with institutional precision.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group rounded-2xl p-5 sm:p-6 bg-white border border-purple-100/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#623f99] border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors duration-300">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                      SEAMLESS CBS MIGRATION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      Automated Ledger &amp; Escrow Settlement
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Migrate assigned loan records directly into your Core Banking (CBS) and LMS with automated NACH re-routing, tripartite reconciliation, and escrow split.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Architecture Graphic */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-purple-200/90 bg-gradient-to-br from-white via-purple-50/30 to-white p-7 sm:p-9 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />
                
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-purple-100/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-xs font-semibold text-slate-500">
                      iFLOW_Pool_Buyout_Engine.v2
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    RBI DA Compliant
                  </span>
                </div>

                {/* Workflow Stack visualizer */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 flex items-center justify-between border border-slate-800">
                    <span className="text-[#a259e6] font-bold">1. Tape Ingestion</span>
                    <span className="text-slate-400">Automated Tape Scrubbing</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-50 text-[#623f99] flex items-center justify-between border border-purple-200 font-semibold">
                    <span>2. Stratification &amp; Cut-offs</span>
                    <span className="text-emerald-700">Policy Compliance Verified</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white text-slate-700 flex items-center justify-between border border-purple-100 shadow-2xs font-medium">
                    <span>3. Dynamic Yield &amp; NPV</span>
                    <span className="text-purple-600 font-bold">Cash Flow Modeling Active</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white text-slate-700 flex items-center justify-between border border-purple-100 shadow-2xs font-medium">
                    <span>4. Legal Assignment &amp; Escrow</span>
                    <span className="text-emerald-600 font-bold">Automated Escrow Routing</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white flex items-center justify-between shadow-md font-bold">
                    <span>5. CBS Migration &amp; Servicing</span>
                    <span className="text-purple-200">Seamless Ledger Sync</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-purple-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Direct Assignment &amp; PTC Support</span>
                  <span className="font-mono text-[#623f99] font-bold">End-to-End Workflow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          DYNAMIC STRAPI SECTIONS: Iterating all components configured in Strapi
      ────────────────────────────────────────────────────────────────────────── */}
      {sections.map((section: any, sectionIdx: number) => {
        const compType = section.__component || "";

        // ──────────────────────────────────────────────────────────────────────
        // Intercept and render unified "Why Pool Buyout?" 3-Pillar Showcase
        // ──────────────────────────────────────────────────────────────────────
        if (whyIds.has(section.id)) {
          if (section.id === whyPoolBuyoutSections[0]?.id) {
            return (
              <section
                key="why-pool-buyout-combined"
                id="why-pool-buyout"
                aria-labelledby="why-pool-heading"
                className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {whyBadge}
                    </span>
                    <h2
                      id="why-pool-heading"
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
                    >
                      {whyTitle}
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {whySubtitle}
                    </p>
                  </div>

                  {/* 3 Alternating Showcase Pillars */}
                  <div className="space-y-24">
                    {whyPillars.map((pillar, idx) => {
                      const isEven = idx % 2 === 0;
                      const IconComp = pillar.icon;

                      return (
                        <div
                          key={idx}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                        >
                          {/* Text Column */}
                          <div
                            className={`lg:col-span-6 space-y-6 ${
                              isEven ? "order-1" : "order-1 lg:order-2"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#623f99] border border-purple-200/70 tracking-widest uppercase">
                                PILLAR {pillar.idx}
                              </span>
                              <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                {pillar.badge}
                              </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                              {pillar.title}
                            </h3>

                            <p className="text-base sm:text-lg font-medium text-[#623f99] leading-relaxed">
                              {pillar.desc}
                            </p>

                            {/* Checkmark Highlights */}
                            <div className="space-y-3 pt-2">
                              {pillar.points.map((pt, pIdx) => (
                                <div key={pIdx} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  </div>
                                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
                                    {pt}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Metric Tag Box */}
                            <div className="pt-4 flex items-center gap-4">
                              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 shadow-2xs">
                                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                                    {pillar.metricLabel}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                                    {pillar.metric}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Graphic Column */}
                          <div
                            className={`lg:col-span-6 ${
                              isEven ? "order-2" : "order-2 lg:order-1"
                            }`}
                          >
                            <div className="relative rounded-3xl border border-purple-200/80 bg-gradient-to-br from-[#faf8fd] to-white p-5 sm:p-7 shadow-xl shadow-purple-950/5 overflow-hidden group">
                              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center shadow-inner">
                                <Image
                                  src={pillar.image}
                                  alt={pillar.title}
                                  fill
                                  className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                                  unoptimized
                                />
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                <span className="font-medium text-slate-700">
                                  {pillar.title}
                                </span>
                                <span className="font-mono text-[#7c3aed] font-semibold">
                                  Verified Portfolio Control
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }
          return null;
        }

        // ──────────────────────────────────────────────────────────────────────
        // 1. FEATURE SECTION (What is Pool Buyout?, Built for Enterprise Teams, etc.)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.feature-section" ||
          compType === "sections.feature-showcase"
        ) {
          const fTitle = sanitize(section.title);
          const fDesc = sanitize(section.description);
          const fBadge = sanitize(section.badge);
          const fImage = section.image?.url ? toUrl(section.image.url) : null;
          const bullets = parseBulletPoints(section.features);
          const isAlternating = sectionIdx % 2 !== 0;

          return (
            <section
              key={section.id || `feature-${sectionIdx}`}
              className={`relative py-20 px-6 sm:px-8 lg:px-16 border-b border-purple-100/70 overflow-hidden ${
                isAlternating ? "bg-[#faf8fd]" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                {/* Header if standalone */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                  {fBadge && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {fBadge}
                    </span>
                  )}
                  {fTitle && (
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {fTitle}
                    </h2>
                  )}
                  {fDesc && (
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {fDesc}
                    </p>
                  )}
                </div>

                <div className={`grid grid-cols-1 ${fImage ? "lg:grid-cols-12 gap-10 lg:gap-14" : "max-w-4xl mx-auto"} items-center`}>
                  {/* Left Column: Markdown content & highlights */}
                  <div className={fImage ? "lg:col-span-6 space-y-4" : "space-y-4"}>
                    {bullets.length > 0 ? (
                      <div className="space-y-3">
                        {bullets.map((bullet: string, bIdx: number) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-purple-100/80 shadow-2xs"
                          >
                            <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : section.features ? (
                      <div className="prose prose-slate max-w-none text-slate-600 text-base leading-relaxed bg-white p-6 rounded-2xl border border-purple-100/80">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.features}
                        </ReactMarkdown>
                      </div>
                    ) : null}
                  </div>

                  {/* Right Column: High-Res Graphic Frame from Strapi */}
                  {fImage && (
                    <div className="lg:col-span-6">
                      <div className="relative rounded-3xl border border-purple-200/90 bg-white p-4 sm:p-6 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                          <Image
                            src={fImage}
                            alt={fTitle ? `${fTitle} loan portfolio acquisition architecture` : "iFLOW Pool Buyout Feature"}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 2. COLLECTION CARDS (Challenges or Platform Capabilities)
        // ──────────────────────────────────────────────────────────────────────
        if (compType === "solution.collection-cards") {
          const rawTitle = sanitize(section.title) || "Platform Capabilities";
          const cardDesc = sanitize(section.description) || "";
          const cards: any[] = section.cards || [];
          const isChallenges = rawTitle.toLowerCase().includes("challenge");
          const isAlternating = sectionIdx % 2 !== 0;

          return (
            <section
              key={section.id || `cards-${sectionIdx}`}
              className={`relative py-20 px-6 sm:px-8 lg:px-16 border-b border-purple-100/70 overflow-hidden ${
                isAlternating ? "bg-[#faf8fd]" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    {isChallenges ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-[#9a3f91]" />
                    ) : (
                      <FolderKanban className="w-3.5 h-3.5 text-[#9a3f91]" />
                    )}
                    {sanitize(section.badge) || (isChallenges ? "INDUSTRY CHALLENGES" : "PLATFORM FEATURES")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {rawTitle}
                  </h2>
                  {cardDesc && (
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {cardDesc}
                    </p>
                  )}
                </div>

                <div className={`grid gap-6 sm:gap-8 ${
                  cards.length === 1
                    ? "max-w-xl mx-auto grid-cols-1"
                    : cards.length === 2
                    ? "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {cards.map((card: any, cIdx: number) => {
                    const cTitle = sanitize(card.title);
                    const cDesc = sanitize(card.description);
                    const cIconUrl = card.icon?.url ? toUrl(card.icon.url) : null;
                    const CardIcon = getPoolBuyoutCardIcon(cTitle, cDesc);

                    return (
                      <div
                        key={card.id || cIdx}
                        className="group rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center border border-purple-100/80 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 overflow-hidden p-2.5">
                              {cIconUrl ? (
                                <Image
                                  src={cIconUrl}
                                  alt={`${cTitle} icon`}
                                  width={36}
                                  height={36}
                                  className="object-contain"
                                  unoptimized
                                />
                              ) : (
                                <CardIcon className="w-6 h-6 transition-colors" />
                              )}
                            </div>
                            <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full group-hover:text-[#9a3f91] group-hover:border-purple-200 transition-colors">
                              #{cIdx + 1}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                            {cTitle}
                          </h3>

                          {cDesc && (
                            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                              {cDesc}
                            </p>
                          )}
                        </div>

                        {card.button_text && (
                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                            <span>{card.button_text}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 3. BICRI FEATURES (Comprehensive Product Capabilities & Simplified DA Process)
        // ──────────────────────────────────────────────────────────────────────
        if (compType === "solution.bicri-features") {
          const rawTitle = sanitize(section.title) || "Comprehensive Product Capabilities";
          const rawDesc = sanitize(section.description);
          const cards: any[] = section.cards || [];

          // Find hero walkthrough video or image from section.image or cards[...].image
          const rawMedia =
            section.image?.url ||
            cards.find((c: any) => c.image?.url)?.image?.url ||
            null;
          const mainMediaUrl = rawMedia ? toUrl(rawMedia) : null;
          const isVideo = mainMediaUrl && /\.(mp4|webm|ogg)$/i.test(mainMediaUrl);
          const isAlternating = sectionIdx % 2 !== 0;

          return (
            <section
              key={section.id || `bicri-${sectionIdx}`}
              className={`relative py-24 px-6 sm:px-8 lg:px-16 border-b border-purple-100/70 overflow-hidden ${
                isAlternating ? "bg-[#faf8fd]" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
                    {sanitize(section.badge) || "PORTFOLIO STRUCTURING & EXECUTION"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {rawTitle}
                  </h2>
                  {rawDesc && (
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {rawDesc}
                    </p>
                  )}
                </div>

                {/* Prominent Walkthrough Video / Interface Showcase (As seen in POOLFLOW dashboard) */}
                {mainMediaUrl && (
                  <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/15 border border-purple-200/90 mb-16 bg-slate-950 group">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] z-10" />

                    {/* Window Title Bar */}
                    <div className="px-5 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="ml-2 font-sans font-semibold text-slate-300">
                          POOLFLOW™ Enterprise Platform Walkthrough — Batch List &amp; Active Tranche Monitor
                        </span>
                      </div>
                      <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
                        Live Tranche Monitor
                      </span>
                    </div>

                    {isVideo ? (
                      <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden">
                        <video
                          src={mainMediaUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover block"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[16/9] bg-white flex items-center justify-center p-4">
                        <Image
                          src={mainMediaUrl}
                          alt={rawTitle}
                          fill
                          sizes="(max-width: 1280px) 100vw, 1200px"
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Features Cards Grid below Video */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cards.map((card: any, idx: number) => {
                    const cTitle = sanitize(card.title);
                    const cDesc = sanitize(card.description);
                    const cIconUrl = card.icon?.url ? toUrl(card.icon.url) : null;
                    const CardIcon = getPoolBuyoutCardIcon(cTitle, cDesc);

                    return (
                      <div
                        key={card.id || idx}
                        className="rounded-3xl border border-purple-100/90 bg-white p-6 sm:p-7 shadow-xs hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                      >
                        <div>
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-[#623f99] flex items-center justify-center mb-5 border border-purple-200/60 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 overflow-hidden p-2.5">
                            {cIconUrl ? (
                              <Image
                                src={cIconUrl}
                                alt={cTitle}
                                width={32}
                                height={32}
                                className="object-contain"
                                unoptimized
                              />
                            ) : (
                              <CardIcon className="w-6 h-6 transition-colors" />
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2 leading-snug">
                            {cTitle}
                          </h3>
                          {cDesc && (
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                              {cDesc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 4. ARCHITECTURE SECTION (Enterprise System Architecture)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.architecture-section" ||
          (section.items && section.items.length > 0)
        ) {
          const rawTitle = sanitize(section.title) || "Enterprise System Architecture";
          const items: any[] = section.items || [];
          const isAlternating = sectionIdx % 2 !== 0;

          return (
            <section
              key={section.id || `arch-${sectionIdx}`}
              className={`relative py-24 px-6 sm:px-8 lg:px-16 border-b border-purple-100/70 overflow-hidden ${
                isAlternating ? "bg-[#faf8fd]" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    <Server className="w-3.5 h-3.5 text-[#9a3f91]" />
                    {sanitize(section.badge) || "SYSTEM ARCHITECTURE"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {rawTitle}
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                    Robust microservices topology engineered for high-concurrency loan portfolio ingestion and statutory reporting.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item: any, iIdx: number) => {
                    const itemLabel = sanitize(item.label || item.title || `Module ${iIdx + 1}`);
                    const ItemIcon = getPoolBuyoutCardIcon(itemLabel);

                    return (
                      <div
                        key={item.id || iIdx}
                        className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all duration-300 flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#623f99] flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors">
                          <ItemIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            MODULE #{iIdx + 1}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#623f99] transition-colors">
                            {itemLabel}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 5. WORKFLOW SECTION (End-to-End Portfolio Acquisition Journey)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.workflow-section" ||
          (section.steps && section.steps.length > 0)
        ) {
          const steps: any[] = section.steps || [];
          const currentStep = steps[activeWorkflowIdx] || steps[0];

          return (
            <section
              key={section.id || `wf-${sectionIdx}`}
              id="acquisition-lifecycle"
              aria-labelledby={`wf-heading-${sectionIdx}`}
              className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    <Activity className="w-3.5 h-3.5 text-[#9a3f91]" />
                    {sanitize(section.badge) || "ACQUISITION WORKFLOW"}
                  </span>
                  <h2 id={`wf-heading-${sectionIdx}`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {sanitize(section.title) || "End-to-End Portfolio Acquisition Journey"}
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                    A strictly governed 10-step institutional lifecycle from initial tape ingestion to post-migration servicing.
                  </p>
                </div>

                {/* Workflow Stepper Progress Navigation */}
                <div className="mb-12">
                  <div className="overflow-x-auto pb-4 scrollbar-none">
                    <div className="relative min-w-[700px] md:min-w-0">
                      {/* Connecting Track */}
                      <div className="absolute top-5 left-6 right-6 h-[2.5px] bg-slate-200 z-0 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] rounded-full transition-all duration-500"
                          style={{
                            width: `${(activeWorkflowIdx / Math.max(1, steps.length - 1)) * 100}%`,
                          }}
                        />
                      </div>

                      {/* Step Nodes */}
                      <div className="flex items-start justify-between relative z-10">
                        {steps.map((step: any, sIdx: number) => {
                          const isActive = sIdx === activeWorkflowIdx;
                          const isPassed = sIdx < activeWorkflowIdx;
                          const stepTitle = sanitize(step.title);
                          const StepIcon = getPoolBuyoutCardIcon(stepTitle, step.description);

                          return (
                            <button
                              key={step.id || sIdx}
                              onClick={() => setActiveWorkflowIdx(sIdx)}
                              className="flex flex-col items-center group focus:outline-none transition-all duration-300 flex-1 px-1 cursor-pointer"
                            >
                              <div
                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                                  isActive
                                    ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white ring-4 ring-purple-200 shadow-lg shadow-purple-500/25 scale-110"
                                    : isPassed
                                    ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-sm"
                                    : "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#623f99] group-hover:text-[#623f99] shadow-2xs"
                                }`}
                              >
                                <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>

                              <span
                                className={`mt-3 text-[11px] sm:text-xs text-center leading-snug break-words max-w-[85px] transition-all duration-300 ${
                                  isActive
                                    ? "font-bold text-[#623f99] scale-105"
                                    : isPassed
                                    ? "font-semibold text-slate-800"
                                    : "font-medium text-slate-500 group-hover:text-slate-900"
                                }`}
                              >
                                {stepTitle}
                              </span>

                              <span className="text-[9.5px] font-mono text-slate-400 uppercase mt-0.5">
                                Step {sIdx + 1}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Step Details Showcase */}
                {currentStep && (
                  <div className="max-w-4xl mx-auto rounded-3xl border border-purple-200/90 bg-white p-7 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

                    <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-900/20">
                        {React.createElement(getPoolBuyoutCardIcon(currentStep.title, currentStep.description), {
                          className: "w-8 h-8",
                        })}
                      </div>

                      <div className="flex-1 space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#623f99] text-xs font-mono font-bold uppercase tracking-wider">
                            PHASE {activeWorkflowIdx + 1} OF {steps.length}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Enterprise Validated
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                          {sanitize(currentStep.title)}
                        </h3>

                        {currentStep.description && (
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                            {sanitize(currentStep.description)}
                          </p>
                        )}

                        {/* Navigation Buttons */}
                        <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs sm:text-sm">
                          <button
                            onClick={() => setActiveWorkflowIdx((prev) => Math.max(0, prev - 1))}
                            disabled={activeWorkflowIdx === 0}
                            className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-xl border transition-colors ${
                              activeWorkflowIdx === 0
                                ? "opacity-40 cursor-not-allowed border-slate-200 text-slate-400"
                                : "border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                            }`}
                          >
                            <span>&larr; Previous Phase</span>
                          </button>

                          <button
                            onClick={() =>
                              setActiveWorkflowIdx((prev) => Math.min(steps.length - 1, prev + 1))
                            }
                            disabled={activeWorkflowIdx === steps.length - 1}
                            className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-xl transition-all ${
                              activeWorkflowIdx === steps.length - 1
                                ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                                : "bg-[#623f99] text-white hover:bg-[#4d3179] shadow-sm cursor-pointer"
                            }`}
                          >
                            <span>Next Phase &rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 6. SUCCESS STATS / BY THE NUMBERS
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.success-stats" ||
          (section.stats && section.stats.length > 0)
        ) {
          const stats: any[] = section.stats || [];

          return (
            <section
              key={section.id || `stats-${sectionIdx}`}
              id="stats"
              aria-labelledby={`stats-heading-${sectionIdx}`}
              className="relative py-20 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    <TrendingUp className="w-3.5 h-3.5 text-[#9a3f91]" />
                    {sanitize(section.badge) || "BY THE NUMBERS"}
                  </span>
                  <h2 id={`stats-heading-${sectionIdx}`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {sanitize(section.title) || "The Scale and Trust Institutions Place in iFLOW"}
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                    Verified metrics demonstrated across institutional portfolio acquisitions in Indian commercial banking.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  {stats.map((stat: any, idx: number) => {
                    const parsed = parseStatValue(stat.value);

                    return (
                      <div
                        key={stat.id || idx}
                        className="rounded-3xl border border-purple-200/80 bg-gradient-to-br from-white via-purple-50/20 to-white p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <p className="text-3xl sm:text-4xl font-black text-[#623f99] tracking-tight flex items-baseline justify-center">
                          {parsed.hasNumeric ? (
                            <CountUp
                              end={parsed.numericValue}
                              prefix={parsed.prefix}
                              suffix={parsed.suffix ? ` ${parsed.suffix}` : ""}
                              duration={2000}
                              decimals={parsed.decimals}
                              className="font-black"
                            />
                          ) : (
                            <span>{stat.value}</span>
                          )}
                        </p>
                        <h3 className="text-sm font-bold text-slate-900 mt-2">
                          {sanitize(stat.label)}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 7. DEFAULT / ANY OTHER STRAPI COMPONENT
        // ──────────────────────────────────────────────────────────────────────
        return (
          <div key={section.id || `sec-${sectionIdx}`}>
            <SectionRenderer section={section} index={sectionIdx} solutionSlug="pool-buyout" />
          </div>
        );
      })}



      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: FAQS (Dynamically extracted from Strapi)
      ────────────────────────────────────────────────────────────────────────── */}
      {dynamicFaqs.length > 0 && (
        <section
          id="faqs"
          aria-labelledby="faq-heading"
          className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
        >
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <FileCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {faqTitle}
              </h2>
            </div>

            {/* Accordion Stack (Mapped dynamically from Strapi) */}
            <div className="space-y-4">
              {dynamicFaqs.map((faq: any, idx: number) => {
                const isOpen = openFaqIdx === idx;
                const question = sanitize(faq.question);
                const answer = sanitize(faq.answer);

                return (
                  <div
                    key={faq.id || idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-purple-300 bg-purple-50/20 shadow-md shadow-purple-950/5"
                        : "border-slate-200/80 bg-white hover:border-purple-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="font-semibold text-sm sm:text-base text-slate-900">
                        {question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "bg-[#623f99] text-white rotate-180"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 sm:px-7 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-purple-100/60">
                        <p className="whitespace-pre-line">{answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: STRATEGIC ENTERPRISE CALL TO ACTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden">
                {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7c3aed]/20 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 w-96 h-96 rounded-full bg-[#e51ede]/15 blur-[140px]"
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase border border-white/15">
            <Zap className="w-3.5 h-3.5 text-purple-300" />
            ENTERPRISE DEPLOYMENT
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Digitize Your{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              Loan Portfolio Acquisition?
            </span>
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Schedule a confidential briefing and technical demonstration with our structured finance and portfolio solutions specialists.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#9a3f91] to-[#e51ede] text-white font-bold text-sm sm:text-base shadow-xl shadow-fuchsia-950/40 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              <span>Schedule a Platform Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all duration-300"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
