"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CountUp from "@/components/CountUp";
import CoLendingComparison from "@/components/sections/CoLendingComparison";
import SectionRenderer from "@/components/SectionRenderer";
import {
  Handshake,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Network,
  Cpu,
  BrainCircuit,
  Smartphone,
  Coins,
  RefreshCw,
  CreditCard,
  RotateCw,
  BarChart3,
  PieChart,
  Activity,
  Workflow,
  Building,
  Users,
  Target,
  FileCheck,
  ChevronDown,
  Star,
  FileText,
  Eye,
  Server,
  CloudLightning,
  Clock,
  LucideIcon,
} from "lucide-react";

interface CoLendingViewProps {
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
 * Parses markdown features string from Strapi feature-section:
 * Returns the extracted heading as `title` and remainder as `description`
 */
function parseFeatureMarkdown(
  featuresText: string | null | undefined,
  defaultTitle = "",
  defaultDesc = ""
) {
  if (!featuresText) return { title: defaultTitle, description: defaultDesc };
  const cleaned = sanitize(featuresText);
  const lines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);

  // Find heading line (starts with ## or # or bold wrapped)
  const headingLine = lines.find(
    (l) => l.startsWith("#") || (l.startsWith("**") && l.endsWith("**"))
  );
  let title = defaultTitle;
  if (headingLine) {
    title = headingLine.replace(/^#+\s*/, "").replace(/^\*\*|\*\*$/g, "").trim();
  }

  // Remainder is the description
  const descLines = lines.filter((l) => l !== headingLine);
  const description = descLines.join(" ").trim() || defaultDesc;

  return { title, description };
}

/**
 * Intelligently picks a relevant icon for capability cards from Strapi
 */
function getCapabilityIcon(title: string = "", description: string = ""): LucideIcon {
  const text = (title + " " + description).toLowerCase();
  if (text.includes("orchestrat") || text.includes("routing") || text.includes("co-origination")) {
    return Network;
  }
  if (text.includes("underwrit") || text.includes("ai") || text.includes("model") || text.includes("scoring")) {
    return BrainCircuit;
  }
  if (text.includes("originat") || text.includes("paperless") || text.includes("ekyc") || text.includes("journey")) {
    return Smartphone;
  }
  if (text.includes("fund") || text.includes("disburs") || text.includes("escrow") || text.includes("money")) {
    return Coins;
  }
  if (text.includes("collection") || text.includes("recovery") || text.includes("nach") || text.includes("delinquen")) {
    return CreditCard;
  }
  if (text.includes("reconcil") || text.includes("settlement") || text.includes("daily") || text.includes("split")) {
    return Layers;
  }
  if (text.includes("analytics") || text.includes("portfolio") || text.includes("npa") || text.includes("dashboard")) {
    return Activity;
  }
  if (text.includes("api") || text.includes("gateway") || text.includes("developer") || text.includes("rest")) {
    return Workflow;
  }
  if (text.includes("complian") || text.includes("rbi") || text.includes("regulatory") || text.includes("audit")) {
    return ShieldCheck;
  }
  return Sparkles;
}

/**
 * Intelligently picks a relevant icon for workflow steps from Strapi
 */
function getWorkflowIcon(title: string = ""): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("app") || t.includes("intake") || t.includes("lead")) return FileText;
  if (t.includes("kyc") || t.includes("verif") || t.includes("ident")) return Eye;
  if (t.includes("credit") || t.includes("assess") || t.includes("score")) return BrainCircuit;
  if (t.includes("approv") || t.includes("sanction")) return CheckCircle2;
  if (t.includes("split") || t.includes("fund") || t.includes("alloc")) return Coins;
  if (t.includes("disburs") || t.includes("transfer") || t.includes("payout")) return Zap;
  if (t.includes("collect") || t.includes("repay") || t.includes("nach")) return CreditCard;
  if (t.includes("settle") || t.includes("recon")) return RotateCw;
  if (t.includes("monitor") || t.includes("surveill") || t.includes("alert")) return Activity;
  return Workflow;
}

/**
 * Parses numeric stats from Strapi strings e.g. "2400cr+", "500+", "99.9%"
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

export default function CoLendingView({ solution }: CoLendingViewProps) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);

  const sections: any[] = solution?.sections || [];

  // ────────────────────────────────────────────────────────────────────────────
  // Dynamic Section Finders (Robust to reordering in Strapi Content Manager)
  // ────────────────────────────────────────────────────────────────────────────
  const secOverview =
    sections.find(
      (s) =>
        s.__component === "solution.feature-section" &&
        (String(s.title || "").toLowerCase().includes("what is") ||
          String(s.description || "").toLowerCase().includes("smarter way"))
    ) || sections[0] || {};

  const secWhyPillar1 =
    sections.find(
      (s) =>
        String(s.badge || "").toLowerCase().includes("why co-lending") ||
        (s.features && String(s.features).includes("Extend Reach"))
    ) || sections[1] || {};

  const secWhyPillar2 =
    sections.find(
      (s) =>
        s.__component === "solution.feature-section" &&
        s.features &&
        String(s.features).toLowerCase().includes("optimised risk")
    ) || sections[2] || {};

  const secWhyPillar3 =
    sections.find(
      (s) =>
        s.__component === "solution.feature-section" &&
        s.features &&
        String(s.features).toLowerCase().includes("faster disbursement")
    ) || sections[3] || {};

  const secCards =
    sections.find((s) => s.__component === "solution.collection-cards") ||
    sections[4] || {};

  const secCustomerSuccess =
    sections.find((s) => s.__component === "solution.customer-success") ||
    sections[5] || {};

  const secWhyIflow1 =
    sections.find(
      (s) =>
        String(s.badge || "").toLowerCase().includes("why iflow") ||
        (s.features && String(s.features).includes("Go live"))
    ) || sections[6] || {};

  const secWhyIflow2 =
    sections.find(
      (s) =>
        s.__component === "solution.feature-section" &&
        s.features &&
        (String(s.features).includes("uptime") || String(s.features).includes("zero excuses"))
    ) || sections[7] || {};

  const secStats =
    sections.find((s) => s.__component === "solution.success-stats") ||
    sections[8] || {};

  const secWorkflow =
    sections.find((s) => s.__component === "solution.workflow-section") ||
    sections[9] || {};

  // Track all core section IDs already rendered in bespoke positions
  const handledIds = new Set(
    [
      secOverview?.id,
      secWhyPillar1?.id,
      secWhyPillar2?.id,
      secWhyPillar3?.id,
      secCards?.id,
      secCustomerSuccess?.id,
      secWhyIflow1?.id,
      secWhyIflow2?.id,
      secStats?.id,
      secWorkflow?.id,
    ].filter(Boolean)
  );

  // Dynamic additional sections added from Strapi Content Manager (e.g. new Feature sections)
  const additionalSections = sections.filter(
    (s: any) => s && (!s.id || !handledIds.has(s.id))
  );

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Overview Section Data from Strapi
  // ────────────────────────────────────────────────────────────────────────────
  const overviewTitle = sanitize(secOverview.title) || "What is Co-Lending?";
  const overviewSubtitle = (
    sanitize(secOverview.description) || "A smarter way to lend, together."
  )
    .replace(/\r?\n+/g, " ")
    .trim();
  const overviewRawFeatures = secOverview.features || "";
  const overviewImg = toUrl(secOverview.image?.url || "/uploads/colendinng_338cc9c8e1.png");

  // Parse 3 paragraphs of overview features from Strapi
  const overviewParagraphs = overviewRawFeatures
    .split(/\n\s*\n/)
    .map((p: string) => sanitize(p))
    .filter(Boolean);

  // ────────────────────────────────────────────────────────────────────────────
  // 2. Strategic Pillars Data from Strapi (Sections 1, 2, 3)
  // ────────────────────────────────────────────────────────────────────────────
  const pillar1Parsed = parseFeatureMarkdown(
    secWhyPillar1.features,
    "Extend Reach to Underserved Segments",
    "Co-lending enables banks to leverage NBFC networks to reach last-mile borrowers while meeting Priority Sector Lending mandates without branch expansion."
  );
  const pillar2Parsed = parseFeatureMarkdown(
    secWhyPillar2.features,
    "Optimised Risk & Capital Allocation",
    "Banks deploy capital at scale with credit risk shared at the agreed ratio. NBFCs retain skin in the game, aligning incentives for origination and collections."
  );
  const pillar3Parsed = parseFeatureMarkdown(
    secWhyPillar3.features,
    "Faster Disbursements, Lower TAT",
    "iFLOW's automated fund flow engine reduces disbursement TAT from 72 hours to under 4 hours via paperless, digital workflows."
  );

  const whyCoLendingBadge = sanitize(secWhyPillar1.badge) || "Why Co-Lending Matters";
  const whyCoLendingTitle = sanitize(secWhyPillar1.title) || "The strategic case for co-lending at scale";

  const strategicPillars = [
    {
      badge: "DISTRIBUTION & REACH",
      title: pillar1Parsed.title,
      description: pillar1Parsed.description,
      image: toUrl(secWhyPillar1.image?.url || "/uploads/Extend_reach_0feeb93744.png"),
      icon: Users,
      metricLabel: "Mandate",
      metric: "Priority Sector Lending",
    },
    {
      badge: "RISK & CAPITAL",
      title: pillar2Parsed.title,
      description: pillar2Parsed.description,
      image: toUrl(secWhyPillar2.image?.url || "/uploads/Optimized_risk_bf435ee882.png"),
      icon: ShieldCheck,
      metricLabel: "Risk Sharing",
      metric: "80:20 / 90:10 Ratio",
    },
    {
      badge: "OPERATIONAL SPEED",
      title: pillar3Parsed.title,
      description: pillar3Parsed.description,
      image: toUrl(secWhyPillar3.image?.url || "/uploads/Faster_Disbursement_5d620dea14.png"),
      icon: Zap,
      metricLabel: "Velocity",
      metric: "TAT < 4 Hours",
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 3. Platform Capabilities Cards from Strapi (Section 4)
  // ────────────────────────────────────────────────────────────────────────────
  const capabilitiesBadge = sanitize(secCards.badge) || "Platform Features";
  const capabilitiesTitle = sanitize(secCards.title) || "Every capability you need on one platform";
  const capabilitiesDesc =
    sanitize(secCards.description) ||
    "Purpose-built for co-lending — not adapted from a generic loan management system.";
  const dynamicCards: any[] = secCards.cards || [];

  // ────────────────────────────────────────────────────────────────────────────
  // 4. Workflow Steps from Strapi (Section 9)
  // ────────────────────────────────────────────────────────────────────────────
  const workflowBadge = sanitize(secWorkflow.badge) || "End-to-End Workflow";
  const workflowTitle = sanitize(secWorkflow.title) || "9-step co-lending lifecycle, fully automated";
  const dynamicSteps: any[] = secWorkflow.steps || [];

  const activeStep = dynamicSteps[activeStepIdx] || dynamicSteps[0] || {};
  const ActiveStepIcon = getWorkflowIcon(activeStep.title || "");

  // ────────────────────────────────────────────────────────────────────────────
  // 5. Why iFLOW Architecture from Strapi (Sections 6 & 7)
  // ────────────────────────────────────────────────────────────────────────────
  const whyIflowBadge = sanitize(secWhyIflow1.badge) || "Why iFLOW";
  const whyIflowTitle = sanitize(secWhyIflow1.title) || "Built different, proven at scale";

  const iflowItem1Parsed = parseFeatureMarkdown(
    secWhyIflow1.features,
    "Go live in 4–8 weeks, not 12+ months",
    "Pre-built connectors for 150+ systems, no-code product configuration, and a dedicated implementation team means you're live and disbursing in weeks."
  );
  const iflowItem2Parsed = parseFeatureMarkdown(
    secWhyIflow2.features,
    "99.9% uptime, zero excuses",
    "Multi-region active-active deployment on AWS Mumbai and Azure India. Kubernetes auto-scaling handles 10x traffic spikes without degradation."
  );

  const dynamicIflowCards = [
    {
      badge: "TIME-TO-MARKET",
      title: iflowItem1Parsed.title,
      description: iflowItem1Parsed.description,
      image: toUrl(secWhyIflow1.image?.url || "/uploads/Go_live_8fb9b74087.png"),
      icon: Clock,
      highlight: "Rapid Launch",
    },
    {
      badge: "RELIABILITY",
      title: iflowItem2Parsed.title,
      description: iflowItem2Parsed.description,
      image: toUrl(secWhyIflow2.image?.url || "/uploads/zero_excuse_06387960cf.png"),
      icon: CloudLightning,
      highlight: "Active-Active SLA",
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 6. Statistics from Strapi (Section 8)
  // ────────────────────────────────────────────────────────────────────────────
  const statsBadge = sanitize(secStats.badge) || "By the Numbers";
  const statsTitle = sanitize(secStats.title) || "Scale that speaks for itself";
  const dynamicStats: any[] = secStats.stats || [];

  // ────────────────────────────────────────────────────────────────────────────
  // 7. Customer Success Case Study from Strapi (Section 5)
  // ────────────────────────────────────────────────────────────────────────────
  const csBadge = sanitize(secCustomerSuccess.badge) || "Customer Success";
  const csTitle = sanitize(secCustomerSuccess.title) || "Real Results from Real Institutions";
  const csCompanyName = sanitize(secCustomerSuccess.companyName) || "Shaan Finance";
  const csCompanySubtitle = sanitize(secCustomerSuccess.companySubtitle) || "NBFC — Retail & MSME Lending";
  const csChallenge = sanitize(secCustomerSuccess.businessChallenge);
  const csSolution = sanitize(secCustomerSuccess.iflowSolution);
  const csImpact = sanitize(secCustomerSuccess.businessImpact);
  const csQuote = sanitize(secCustomerSuccess.quoteText);
  const csAuthor = sanitize(secCustomerSuccess.quoteAuthor);
  const csStars = secCustomerSuccess.stars || 5;
  const csStats: any[] = secCustomerSuccess.stats || [];

  // ────────────────────────────────────────────────────────────────────────────
  // 8. FAQs from Strapi
  // ────────────────────────────────────────────────────────────────────────────
  const faqData = solution?.faq_section || {};
  const faqTitle = sanitize(faqData.title) || "You Ask. We Answer!";
  const dynamicFaqs: any[] = faqData.faqs || [];

  return (
    <div id="platform-capabilities" className="w-full bg-white text-slate-900">
      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: EXECUTIVE OVERVIEW — What is Co-Lending? (Strapi Sec 0)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
              EXECUTIVE OVERVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {overviewTitle}
            </h2>
            {overviewSubtitle && (
              <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto whitespace-normal sm:whitespace-nowrap">
                {overviewSubtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Operating Model Content from Strapi */}
            <div className="lg:col-span-6 space-y-5">
              {/* If Strapi has paragraphs, render them dynamically */}
              {overviewParagraphs.length > 0 ? (
                <div className="space-y-4">
                  {overviewParagraphs.map((para: string, idx: number) => {
                    const isCore = idx === 0;
                    const isSplit = idx === 1;
                    const isPlatform = idx === 2;

                    return (
                      <div
                        key={idx}
                        className={`group rounded-2xl p-5 border transition-all duration-300 ${
                          isPlatform
                            ? "bg-gradient-to-br from-purple-50/70 via-white to-purple-50/40 border-purple-200 shadow-md shadow-purple-900/5 hover:shadow-lg"
                            : "bg-white border-purple-100/80 shadow-xs hover:border-purple-200 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                              isPlatform
                                ? "bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white shadow-sm"
                                : isSplit
                                ? "bg-fuchsia-50 text-[#9a3f91] border border-fuchsia-100"
                                : "bg-purple-50 text-[#623f99] border border-purple-100"
                            }`}
                          >
                            {isPlatform ? (
                              <Handshake className="w-5 h-5" />
                            ) : isSplit ? (
                              <Coins className="w-5 h-5" />
                            ) : (
                              <Building className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                              {isPlatform
                                ? "AUTOMATED ECOSYSTEM"
                                : isSplit
                                ? "JOINT CO-ORIGINATION MODEL"
                                : "RBI REGULATORY FRAMEWORK"}
                            </span>
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                              {para}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback if features text was empty in Strapi */
                <div className="prose prose-slate max-w-none text-slate-600 text-base leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {overviewRawFeatures}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Right Column: High-Res Architecture Graphic from Strapi */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-purple-200/90 bg-white p-4 sm:p-6 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <Image
                    src={overviewImg}
                    alt={overviewTitle}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                    unoptimized
                  />
                </div>

                {/* Status Badges */}
                <div className="mt-5 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold">CLM 1 &amp; CLM 2 Supported</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Zap className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
                    <span className="font-semibold">Automated Escrow Routing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: STRATEGIC VALUE — Why Co-Lending Matters (Strapi Sec 1, 2, 3)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-[#9a3f91]" />
              {whyCoLendingBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {whyCoLendingTitle}
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              How leading financial institutions leverage shared balance sheets and localized distribution to expand credit securely.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategicPillars.map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[16/10] bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10.5px] font-mono font-bold tracking-wider text-[#623f99] border border-purple-100 shadow-2xs">
                        <IconComp className="w-3.5 h-3.5 text-[#9a3f91]" />
                        {pillar.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Metric Highlight Box */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          {pillar.metricLabel}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#0a1f44] tracking-tight">
                          {pillar.metric}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center group-hover:bg-[#623f99] group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 3: MODEL COMPARISON — Co-Lending vs Direct Lending
      ────────────────────────────────────────────────────────────────────────── */}
      <CoLendingComparison />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 4: PLATFORM CAPABILITIES — Every Capability on One Platform (Strapi Sec 4)
      ────────────────────────────────────────────────────────────────────────── */}
      {dynamicCards.length > 0 && (
        <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-1/3 w-80 h-80 rounded-full bg-purple-200/30 blur-[100px]"
          />

          <div className="relative max-w-7xl mx-auto z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#9a3f91]" />
                {capabilitiesBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {capabilitiesTitle}
              </h2>
              {capabilitiesDesc && (
                <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                  {capabilitiesDesc}
                </p>
              )}
            </div>

            {/* Capability Cards Grid (Dynamically mapped from Strapi s4.cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {dynamicCards.map((card: any, idx: number) => {
                const Icon = getCapabilityIcon(card.title, card.description);
                const isHovered = hoveredCardIdx === idx;
                const cardTitle = sanitize(card.title);
                const cardDesc = sanitize(card.description);

                return (
                  <div
                    key={card.id || idx}
                    onMouseEnter={() => setHoveredCardIdx(idx)}
                    onMouseLeave={() => setHoveredCardIdx(null)}
                    className={`group relative rounded-3xl p-7 sm:p-8 bg-white border transition-all duration-300 flex flex-col justify-between ${
                      isHovered
                        ? "border-purple-300 shadow-xl shadow-purple-950/10 -translate-y-1"
                        : "border-slate-200/80 shadow-xs hover:border-purple-200 hover:shadow-md"
                    }`}
                  >
                    {/* Top Bar on Hover */}
                    <div
                      className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div>
                      {/* Icon and Tag Row */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-[#623f99] flex items-center justify-center border border-purple-200/60 shadow-xs group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                          <Icon className="w-6 h-6 transition-colors" />
                        </div>
                        <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full group-hover:text-[#9a3f91] group-hover:border-purple-200 transition-colors">
                          FEATURE #{idx + 1}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                        {cardTitle}
                      </h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                        {cardDesc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {card.button_text || "Enterprise Module"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 5: END-TO-END WORKFLOW — (Strapi Sec 9)
      ────────────────────────────────────────────────────────────────────────── */}
      {dynamicSteps.length > 0 && (
        <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Workflow className="w-3.5 h-3.5 text-[#9a3f91]" />
                {workflowBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {workflowTitle}
              </h2>
              <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                From borrower intake to post-disbursement surveillance, every stage executes through event-driven microservices.
              </p>
            </div>

            {/* Stepper Timeline Navigation (Dynamically mapped from Strapi s9.steps) */}
            <div className="mb-12">
              <div className="overflow-x-auto pb-4 scrollbar-none">
                <div className="relative min-w-[760px] md:min-w-0">
                  {/* Connecting Track */}
                  <div className="absolute top-5 left-6 right-6 h-[2.5px] bg-slate-200 z-0 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] rounded-full transition-all duration-500"
                      style={{
                        width: `${(activeStepIdx / Math.max(1, dynamicSteps.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Step Nodes */}
                  <div className="flex items-start justify-between relative z-10">
                    {dynamicSteps.map((step: any, idx: number) => {
                      const isActive = idx === activeStepIdx;
                      const isPassed = idx < activeStepIdx;
                      const NodeIcon = getWorkflowIcon(step.title);
                      const cleanTitle = sanitize(step.title);

                      return (
                        <button
                          key={step.id || idx}
                          onClick={() => setActiveStepIdx(idx)}
                          className="flex flex-col items-center group focus:outline-none transition-all duration-300 flex-1 px-1 cursor-pointer"
                        >
                          {/* Circle Node */}
                          <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                              isActive
                                ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white ring-4 ring-purple-200 shadow-lg shadow-purple-500/25 scale-110"
                                : isPassed
                                ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-sm"
                                : "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#623f99] group-hover:text-[#623f99] shadow-2xs"
                            }`}
                          >
                            <NodeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>

                          {/* Title Label */}
                          <span
                            className={`mt-3 text-[11px] sm:text-xs text-center leading-snug break-words max-w-[85px] transition-all duration-300 ${
                              isActive
                                ? "font-bold text-[#623f99] scale-105"
                                : isPassed
                                ? "font-semibold text-slate-800"
                                : "font-medium text-slate-500 group-hover:text-slate-900"
                            }`}
                          >
                            {cleanTitle}
                          </span>

                          <span className="text-[9.5px] font-mono text-slate-400 uppercase mt-0.5">
                            Step {idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Step Showcase Card */}
            {activeStep.title && (
              <div className="max-w-4xl mx-auto rounded-3xl border border-purple-200/90 bg-gradient-to-br from-white via-purple-50/20 to-white p-7 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

                <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                  {/* Left: Step Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-900/20">
                    <ActiveStepIcon className="w-8 h-8" />
                  </div>

                  {/* Right: Step Details from Strapi */}
                  <div className="flex-1 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#623f99] text-xs font-mono font-bold uppercase tracking-wider">
                        STEP {activeStepIdx + 1} OF {dynamicSteps.length}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Automated Milestone
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {sanitize(activeStep.title)}
                    </h3>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      {sanitize(activeStep.description)}
                    </p>

                    {/* Step Controls */}
                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs sm:text-sm">
                      <button
                        onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                        disabled={activeStepIdx === 0}
                        className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-xl border transition-colors ${
                          activeStepIdx === 0
                            ? "opacity-40 cursor-not-allowed border-slate-200 text-slate-400"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                        }`}
                      >
                        <span>&larr; Previous Step</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveStepIdx((prev) => Math.min(dynamicSteps.length - 1, prev + 1))
                        }
                        disabled={activeStepIdx === dynamicSteps.length - 1}
                        className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-xl transition-all ${
                          activeStepIdx === dynamicSteps.length - 1
                            ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                            : "bg-[#623f99] text-white hover:bg-[#4d3179] shadow-sm cursor-pointer"
                        }`}
                      >
                        <span>Next Step &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 6: ENTERPRISE ARCHITECTURE — Why iFLOW (Strapi Sec 6 & 7)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Server className="w-3.5 h-3.5 text-[#9a3f91]" />
              {whyIflowBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {whyIflowTitle}
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Engineered for bank-grade compliance, low-latency API throughput, and rapid partner integrations.
            </p>
          </div>

          {/* 2-Card Deck (Dynamically populated from Strapi Sec 6 & 7) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {dynamicIflowCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <div
                  key={i}
                  className="group rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Tag & Metric */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[11px] font-mono font-bold tracking-wider text-[#623f99] border border-purple-100">
                        <IconComp className="w-3.5 h-3.5 text-[#9a3f91]" />
                        {card.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        {card.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Graphic Frame from Strapi */}
                  <div className="relative w-full aspect-[16/10] mt-7 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 7: BY THE NUMBERS — (Strapi Sec 8 Stats)
      ────────────────────────────────────────────────────────────────────────── */}
      {dynamicStats.length > 0 && (
        <section className="relative py-20 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <BarChart3 className="w-3.5 h-3.5 text-[#9a3f91]" />
                {statsBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {statsTitle}
              </h2>
            </div>

            {/* Stat Cards Grid (Dynamically mapped from Strapi s8.stats) */}
            <div
              className={`grid gap-6 sm:gap-8 ${
                dynamicStats.length === 4
                  ? "grid-cols-2 lg:grid-cols-4"
                  : dynamicStats.length === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-2"
              }`}
            >
              {dynamicStats.map((stat: any, idx: number) => {
                const { prefix, numericValue, suffix, decimals, hasNumeric } = parseStatValue(
                  stat.value
                );
                const statLabel = sanitize(stat.label);

                // Choose icon based on label keywords
                const l = statLabel.toLowerCase();
                const StatIcon = l.includes("partner")
                  ? Building
                  : l.includes("port") || l.includes("cr")
                  ? Coins
                  : l.includes("api") || l.includes("integ")
                  ? Workflow
                  : Activity;

                return (
                  <div
                    key={stat.id || idx}
                    className="group rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center mx-auto mb-5 border border-purple-100 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                      <StatIcon className="w-7 h-7" />
                    </div>

                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      {hasNumeric ? (
                        <CountUp
                          end={numericValue}
                          prefix={prefix}
                          suffix={suffix}
                          decimals={decimals}
                        />
                      ) : (
                        sanitize(stat.value)
                      )}
                    </div>

                    <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-500 mt-2 block">
                      {statLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 8: CUSTOMER SUCCESS — (Strapi Sec 5)
      ────────────────────────────────────────────────────────────────────────── */}
      {(csChallenge || csSolution || csImpact || csQuote) && (
        <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Star className="w-3.5 h-3.5 text-[#9a3f91]" />
                {csBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {csTitle}
              </h2>
            </div>

            {/* Case Study Card (100% dynamically mapped from Strapi s5) */}
            <div className="rounded-3xl border border-purple-200/90 bg-white shadow-2xl shadow-purple-950/5 overflow-hidden flex flex-col lg:flex-row">
              {/* Left Column: Brand Hero & Key Numbers */}
              <div className="w-full lg:w-5/12 bg-gradient-to-br from-[#623f99] to-[#9a3f91] p-8 sm:p-10 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center font-bold text-xl text-white shadow-inner">
                      <Building className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight leading-none">
                        {csCompanyName}
                      </h3>
                      {csCompanySubtitle && (
                        <p className="text-xs sm:text-sm text-purple-100/90 mt-1.5 font-medium">
                          {csCompanySubtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Metrics Stack from Strapi s5.stats */}
                  {csStats.length > 0 && (
                    <div className="space-y-4 py-4 border-y border-white/20">
                      {csStats.map((m: any, i: number) => (
                        <div key={m.id || i} className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-purple-100 font-medium">
                            {sanitize(m.label)}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                            {sanitize(m.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stars Rating & Status */}
                <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-300">
                    {Array.from({ length: csStars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-300" />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-white/90 font-bold uppercase tracking-wider">
                    VERIFIED CLIENT
                  </span>
                </div>
              </div>

              {/* Right Column: Case Story Breakdown & Quote from Strapi */}
              <div className="w-full lg:w-7/12 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-5">
                  {csChallenge && (
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#9a3f91]">
                        BUSINESS CHALLENGE
                      </h4>
                      <p className="mt-1.5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {csChallenge}
                      </p>
                    </div>
                  )}

                  {csSolution && (
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#623f99]">
                        iFLOW SOLUTION
                      </h4>
                      <p className="mt-1.5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {csSolution}
                      </p>
                    </div>
                  )}

                  {csImpact && (
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                        MEASURABLE IMPACT
                      </h4>
                      <p className="mt-1.5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {csImpact}
                      </p>
                    </div>
                  )}
                </div>

                {/* Testimonial Quote */}
                {csQuote && (
                  <div className="pt-5 border-t border-slate-100">
                    <blockquote className="italic text-slate-800 text-sm sm:text-base leading-relaxed border-l-4 border-[#9a3f91] pl-4">
                      {csQuote}
                    </blockquote>
                    {csAuthor && (
                      <div className="mt-3 pl-4 flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {csAuthor}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          DYNAMIC ADDITIONAL SECTIONS FROM STRAPI (Added via Content Manager)
      ────────────────────────────────────────────────────────────────────────── */}
      {additionalSections.length > 0 && (
        <div className="space-y-0">
          {additionalSections.map((sec: any, idx: number) => (
            <SectionRenderer
              key={sec.id || `extra-colending-${idx}`}
              section={sec}
              index={idx}
              solutionSlug="co-lending"
            />
          ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 9: FAQ — (Strapi solution.faq_section)
      ────────────────────────────────────────────────────────────────────────── */}
      {dynamicFaqs.length > 0 && (
        <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden">
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
          SECTION 10: READY TO TRANSFORM CTA
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

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-white/15 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            ENTERPRISE DEPLOYMENT
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Launch Your Co-Lending Program in{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              Under 4 Weeks?
            </span>
          </h2>

          <p className="mt-3.5 text-purple-100/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Schedule a personalized walkthrough with our lending technology architects. We will demonstrate live CLM 1 &amp; CLM 2 escrow flows configured for your exact credit policy.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#9a3f91] to-[#e51ede] text-white font-bold text-sm sm:text-base shadow-xl shadow-fuchsia-950/40 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              <span>Schedule a Platform Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-300"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>

          {/* Compliance Checklist */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm text-purple-200/80 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>RBI Co-Lending 2025 Audit Trail</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>SOC-2 &amp; ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>T+0 Automated Escrow Reconciliation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
