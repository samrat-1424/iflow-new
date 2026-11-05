"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionRenderer from "@/components/SectionRenderer";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Database,
  Store,
  Scale,
  FileCheck,
  Activity,
  Coins,
  AlertTriangle,
  ChevronDown,
  HelpCircle,
  Search,
  Network,
  Truck,
  Building,
  Tractor,
  BarChart3,
  TrendingUp,
  FileText,
  Workflow,
  Cpu,
  Globe,
  LucideIcon,
} from "lucide-react";

interface BicriViewProps {
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
 * Renders inline markdown bold formatting (e.g. "**BICRI Score?**") with an accent highlight
 */
function renderMarkdownTitle(title: string) {
  if (!title) return null;
  const parts = title.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const text = part.slice(2, -2);
      return (
        <span key={index} className="text-[#9a3f91]">
          {text}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * Parses markdown overview content from Strapi (e.g., image + evaluation headings)
 */
function parseOverviewContent(rawContent: string | null | undefined) {
  if (!rawContent || !rawContent.trim()) return null;

  // Extract embedded image markdown: ![alt](url)
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
  const imgMatch = rawContent.match(imgRegex);
  const imageUrl = imgMatch ? toUrl(imgMatch[2]) : null;
  const imageAlt = imgMatch ? imgMatch[1] : "BICRI Credit Evaluation Overview";

  // Strip image from text and parse #### Headings with descriptions
  const textWithoutImg = rawContent.replace(imgRegex, "").trim();
  const points: { title: string; desc: string }[] = [];

  const blocks = textWithoutImg.split(/####\s+/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx !== -1) {
      const title = sanitize(trimmed.slice(0, colonIdx));
      const desc = sanitize(trimmed.slice(colonIdx + 1).replace(/^[\s\n:]+/, ""));
      if (title && desc) {
        points.push({ title, desc });
      }
    } else {
      const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length > 0) {
        const title = sanitize(lines[0]);
        const desc = sanitize(lines.slice(1).join(" "));
        if (title) points.push({ title, desc });
      }
    }
  }

  return { imageUrl, imageAlt, points };
}

/**
 * Contextual icon mapper for collection cards
 */
function getCollectionCardIcon(title: string): LucideIcon {
  const t = (title || "").toLowerCase();
  if (t.includes("retailer")) return Store;
  if (t.includes("distributor")) return Truck;
  if (t.includes("supply-chain") || t.includes("supply chain")) return Layers;
  if (t.includes("embedded")) return Zap;
  if (t.includes("agri")) return Tractor;
  if (t.includes("working capital") || t.includes("trade credit")) return Coins;
  if (t.includes("broader") || t.includes("assessment")) return Activity;
  if (t.includes("msme")) return BarChart3;
  if (t.includes("recommendation") || t.includes("limit")) return CheckCircle2;
  if (t.includes("report") || t.includes("structured")) return FileCheck;
  if (t.includes("configurable") || t.includes("journey")) return Workflow;
  if (t.includes("ecosystem")) return Network;
  return Globe;
}

export default function BicriView({ solution }: BicriViewProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState<string>("");

  const sections: any[] = solution?.sections || [];
  const faqData = solution?.faq_section || {};

  // 1. Parsed Strapi Overview Content (from solution.full_content / solution.content)
  const overviewData = parseOverviewContent(solution?.full_content || solution?.content);

  // 2. All Strapi "solution.bicri-features" sections ("Why Choose BICRI Score?" & "Key Features of BICRI Score")
  const bicriFeatureSections = sections.filter(
    (s: any) =>
      s.__component === "solution.bicri-features" ||
      String(s.title || "").toLowerCase().includes("bicri score") ||
      String(s.title || "").toLowerCase().includes("key features")
  );

  // 3. Three Perspectives Sections (solution.feature-section with badge "THREE PERSPECTIVES" or consecutive group)
  const perspectiveSections = sections.filter(
    (s: any) =>
      s.__component === "solution.feature-section" &&
      (String(s.badge || "").toLowerCase().includes("perspective") ||
        (s.features && String(s.features).toLowerCase().includes("assess more of the msme")) ||
        (s.features && String(s.features).toLowerCase().includes("trade-credit decisions")) ||
        (s.features && String(s.features).toLowerCase().includes("complete business profile")))
  );

  // 4. Collection-Cards Sections (e.g. APPLICATIONS & WHY iFLOW BICRI)
  const collectionCardSections = sections.filter(
    (s: any) => s.__component === "solution.collection-cards"
  );

  // 5. Data Ecosystem / Assessment Architecture Section
  const dataEcosystemSection = sections.find(
    (s: any) =>
      s.__component === "solution.data-ecosystem" ||
      s.__component === "solution.integrations-ecosystem" ||
      s.__component === "solution.bnpl-workflow-section" ||
      String(s.title || "").toLowerCase().includes("assessment workflow") ||
      String(s.title || "").toLowerCase().includes("business data")
  );

  // 6. Remaining custom sections from Strapi
  const otherSections = sections.filter(
    (s: any) =>
      !bicriFeatureSections.includes(s) &&
      !perspectiveSections.includes(s) &&
      !collectionCardSections.includes(s) &&
      s !== dataEcosystemSection
  );

  // Strapi FAQs
  const faqTitle = sanitize(faqData.title) || "You Ask. We Answer!";
  const dynamicFaqs: any[] = faqData.faqs || [];

  const filteredFaqs = dynamicFaqs.filter((f: any) => {
    if (!faqSearch.trim()) return true;
    const q = (f.question || "").toLowerCase();
    const a = (f.answer || "").toLowerCase();
    const query = faqSearch.toLowerCase();
    return q.includes(query) || a.includes(query);
  });

  // ────────────────────────────────────────────────────────────────────────────
  // Dynamic SEO Structured Data Schema (JSON-LD) for Google Rich Results
  // ────────────────────────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "iFLOW BICRI - Business Indicator for Credit Rating",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Cloud-Native (AWS, Azure, Sovereign Indian Cloud)",
        "description":
          solution?.meta_description ||
          solution?.description ||
          "AI-driven commercial credit intelligence platform evaluating MSMEs and retailers through Account Aggregator cash-flow telemetry, GST triangulation, trade credit velocity, and multi-bureau synthesis.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://iflow.co.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Solutions",
            "item": "https://iflow.co.in/solutions",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "BICRI Credit Rating",
            "item": "https://iflow.co.in/solutions/bicri",
          },
        ],
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
    <div className="relative w-full bg-white text-slate-800 antialiased selection:bg-purple-100 selection:text-purple-900">
      {/* ── Dynamic Google Rich Results Schema ────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: DYNAMIC STRAPI OVERVIEW / EVALUATION PILLARS (From Content)
          ═══════════════════════════════════════════════════════════════════════ */}
      {overviewData && (
        <section
          id="bicri-overview"
          aria-labelledby="overview-heading"
          className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/60 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
                HOLISTIC CREDIT EVALUATION
              </span>
              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
              >
                Comprehensive Credit Assessment for{" "}
                <span className="text-[#9a3f91]">Retailers &amp; MSMEs</span>
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                Combining financial telemetry, credit history, real-time POS sales data, and trade relationships to support informed lending decisions.
              </p>
            </div>

            {/* 2-Column Layout: Illustration on Left, 5 Evaluation Pillars on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Architecture Illustration from Strapi */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                {overviewData.imageUrl ? (
                  <div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(59,18,89,0.12)] border border-purple-100/90 bg-white p-4 group">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden flex items-center justify-center bg-purple-50/30">
                      <Image
                        src={overviewData.imageUrl}
                        alt={overviewData.imageAlt}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 select-none"
                      />
                    </div>
                    <div className="mt-4 pt-3 border-t border-purple-100/70 flex items-center justify-between text-xs font-semibold text-slate-600 px-2">
                      <span className="text-[#3B1259]">BICRI Intelligence Model</span>
                      <span className="text-[#9a3f91] text-[11px] font-mono">Multi-source Sync</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full max-w-[440px] p-8 rounded-3xl bg-gradient-to-br from-[#3B1259] to-[#7E22CE] text-white shadow-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300">
                        CREDIT RISK INTELLIGENCE
                      </span>
                      <h3 className="text-2xl font-black mt-2 mb-3">
                        Beyond the Traditional Credit Bureau
                      </h3>
                      <p className="text-xs text-purple-200 leading-relaxed font-normal">
                        Brings together multi-source banking streams, GST validation, and trade credit ledgers to empower risk underwriting for thin-file borrowers.
                      </p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-purple-400/30 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <Sparkles className="w-5 h-5 text-fuchsia-300" />
                      </div>
                      <div>
                        <span className="text-xs font-bold block">360° MSME Scoring</span>
                        <span className="text-[10px] text-purple-200">Financial • POS • Trade • Social</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: 5 Evaluation Pillars from Strapi Content */}
              <div className="lg:col-span-7 space-y-4">
                {overviewData.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#fcfaff] border border-purple-100/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 border border-purple-200/60 flex items-center justify-center text-[#7E22CE] shrink-0 font-black text-xs">
                      0{idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                        {pt.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: DYNAMIC STRAPI BICRI-FEATURES SECTIONS (Why Choose & Key Features)
          ═══════════════════════════════════════════════════════════════════════ */}
      {bicriFeatureSections.map((section: any, secIdx: number) => {
        const isAlternate = secIdx % 2 !== 0;
        const cards: any[] = section.cards || [];
        const rawMedia =
          section.image?.url ||
          cards.find((c: any) => c.image?.url)?.image?.url ||
          null;
        const mainMediaUrl = rawMedia ? toUrl(rawMedia) : null;

        return (
          <section
            key={section.id || secIdx}
            id={`bicri-features-${secIdx}`}
            aria-labelledby={`features-heading-${secIdx}`}
            className={`relative py-24 px-6 sm:px-8 lg:px-16 border-b border-purple-100/60 overflow-hidden ${
              isAlternate ? "bg-white" : "bg-[#fcfaff]"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              {/* Dynamic Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                  {section.badge || (secIdx === 0 ? "WHY CHOOSE BICRI" : "PRODUCT CAPABILITIES")}
                </span>
                <h2
                  id={`features-heading-${secIdx}`}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
                >
                  {renderMarkdownTitle(section.title || "BICRI Score Features")}
                </h2>
                {section.description && (
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                    {sanitize(section.description)}
                  </p>
                )}
              </div>

              {/* Layout: Image + Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Visual Image / Preview (Alternating sides for visual rhythm) */}
                <div
                  className={`lg:col-span-5 relative flex items-center justify-center ${
                    isAlternate ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {mainMediaUrl ? (
                    <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(59,18,89,0.12)] border border-purple-100 bg-white p-4 flex items-center justify-center group">
                      <Image
                        src={mainMediaUrl}
                        alt={section.title || "BICRI Feature"}
                        width={420}
                        height={520}
                        className="object-contain w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-500 select-none"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full max-w-[420px] p-8 rounded-3xl bg-gradient-to-br from-[#3B1259] to-[#7E22CE] text-white shadow-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-300">
                          ENTERPRISE INTELLIGENCE
                        </span>
                        <h3 className="text-2xl font-black mt-2 mb-3">
                          Data-Driven Credit Certainty
                        </h3>
                        <p className="text-xs text-purple-200 leading-relaxed font-normal">
                          Configured for commercial banks, NBFCs, and fintech platforms to streamline risk categorization and loan sanctions.
                        </p>
                      </div>
                      <div className="mt-8 pt-4 border-t border-purple-400/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">Instant Decision Engine</span>
                          <span className="text-[10px] text-purple-200">Continuous Risk Monitoring</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4 Cards Grid */}
                <div
                  className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 ${
                    isAlternate ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {cards.map((card: any, idx: number) => {
                    const cardIconUrl = card.icon?.url ? toUrl(card.icon.url) : null;
                    return (
                      <div
                        key={card.id || idx}
                        className="group p-6 rounded-2xl bg-white border border-purple-100/90 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#623f99] mb-4 group-hover:scale-110 transition-transform">
                            {cardIconUrl ? (
                              <Image
                                src={cardIconUrl}
                                alt={card.title}
                                width={28}
                                height={28}
                                className="object-contain"
                              />
                            ) : (
                              <CheckCircle2 className="w-6 h-6 text-[#9a3f91]" />
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2">
                            {card.title}
                          </h3>

                          {/* Description */}
                          {card.description && (
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                              {sanitize(card.description)}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#623f99]">
                          <span>BICRI Capability</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: THREE PERSPECTIVES (Credit Intelligence for Trade Ecosystem)
          ═══════════════════════════════════════════════════════════════════════ */}
      {perspectiveSections.length > 0 && (
        <section
          id="three-perspectives"
          aria-labelledby="perspectives-heading"
          className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/60 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                {perspectiveSections[0]?.badge || "THREE PERSPECTIVES"}
              </span>
              <h2
                id="perspectives-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
              >
                {perspectiveSections[0]?.title || "Credit Intelligence That Supports the Entire Trade Ecosystem"}
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                Designed to bridge communication between lenders, distributors, and MSME retailers through structured risk indicators.
              </p>
            </div>

            {/* 3 Perspectives Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {perspectiveSections.map((sec: any, idx: number) => {
                const imgUrl = sec.image?.url ? toUrl(sec.image.url) : null;
                // Parse heading and description from features markdown
                const rawFeatures = sec.features || "";
                const titleMatch = rawFeatures.match(/\*\*(.*?)\*\*/);
                const title = titleMatch ? titleMatch[1] : (sec.title || `Perspective 0${idx + 1}`);
                const desc = rawFeatures.replace(/\*\*.*?\*\*/, "").trim();

                return (
                  <div
                    key={sec.id || idx}
                    className="group relative flex flex-col justify-between rounded-3xl bg-[#fcfaff] border border-purple-100/90 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Perspective Image Preview */}
                    {imgUrl && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden bg-purple-50/40">
                        <Image
                          src={imgUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        />
                      </div>
                    )}

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#623f99] transition-colors">
                          {title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-purple-100/70 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                        <span>Explore Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: STRAPI COLLECTION-CARDS (Applications & Why iFLOW BICRI)
          ═══════════════════════════════════════════════════════════════════════ */}
      {collectionCardSections.map((sec: any, secIdx: number) => {
        const isAlternate = secIdx % 2 !== 0;
        const cards: any[] = sec.cards || [];

        return (
          <section
            key={sec.id || secIdx}
            id={`collection-${sec.id || secIdx}`}
            aria-labelledby={`collection-heading-${secIdx}`}
            className={`relative py-24 px-6 sm:px-8 lg:px-16 border-b border-purple-100/60 overflow-hidden ${
              isAlternate ? "bg-[#faf8fd]" : "bg-white"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                {sec.badge && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                    {sec.badge}
                  </span>
                )}
                <h2
                  id={`collection-heading-${secIdx}`}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
                >
                  {renderMarkdownTitle(sec.title || "Credit Intelligence Use Cases")}
                </h2>
                {sec.description && (
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                    {sanitize(sec.description)}
                  </p>
                )}
              </div>

              {/* 6 Cards Responsive Grid (2-col on mobile, 3-col on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card: any, idx: number) => {
                  const Icon = getCollectionCardIcon(card.title);
                  const iconUrl = card.icon?.url ? toUrl(card.icon.url) : null;

                  return (
                    <div
                      key={card.id || idx}
                      className="group p-6 sm:p-7 rounded-2xl bg-white border border-purple-100/90 shadow-2xs hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#623f99] mb-4 group-hover:scale-110 transition-transform shadow-2xs">
                          {iconUrl ? (
                            <Image
                              src={iconUrl}
                              alt={card.title}
                              width={26}
                              height={26}
                              className="object-contain"
                            />
                          ) : (
                            <Icon className="w-6 h-6 stroke-[2]" />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2">
                          {card.title}
                        </h3>

                        {/* Description */}
                        {card.description && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {sanitize(card.description)}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#623f99]">
                        <span>{card.button_text || "Know more"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: DYNAMIC STRAPI DATA ECOSYSTEM ARCHITECTURE
          ═══════════════════════════════════════════════════════════════════════ */}
      {dataEcosystemSection && (
        <section
          id="ecosystem"
          aria-labelledby="ecosystem-heading"
          className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/60 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Dynamic Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Network className="w-3.5 h-3.5 text-[#9a3f91]" />
                {sanitize(dataEcosystemSection.badge) || "INTEGRATIONS & DATA ECOSYSTEM"}
              </span>
              <h2
                id="ecosystem-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
              >
                {dataEcosystemSection.title || "Connect Relevant Business Data to the Assessment Workflow"}
              </h2>
              {dataEcosystemSection.description && (
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                  {sanitize(dataEcosystemSection.description)}
                </p>
              )}
            </div>

            {/* Dynamic Connected Ecosystem Architecture Grid */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#faf7ff] via-white to-purple-50/40 border border-purple-200/80 shadow-[0_20px_50px_rgba(59,18,89,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Authorized Ingestion Sources from Strapi */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    01 / AUTHORIZED DATA FEEDS
                  </span>
                  {(dataEcosystemSection.left_items ||
                    dataEcosystemSection.left_features || [
                    { label: "Banking & cash flow" },
                    { label: "Credit information" },
                    { label: "Trade & commerce" },
                    { label: "Business context" },
                  ]).map((item: any, i: number) => {
                    const label = item.label || item.title || "";
                    return (
                      <div
                        key={item.id || i}
                        className="p-4 rounded-xl bg-white border border-purple-100 shadow-2xs flex items-center gap-3.5 hover:border-purple-300 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200/60 flex items-center justify-center text-[#7E22CE] shrink-0">
                          {i === 0 ? (
                            <Database className="w-4 h-4" />
                          ) : i === 1 ? (
                            <Scale className="w-4 h-4" />
                          ) : i === 2 ? (
                            <Store className="w-4 h-4" />
                          ) : (
                            <FileCheck className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{label}</h4>
                          <span className="text-[10px] text-slate-400">Consent-Driven Input</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Middle Column: Central Intelligence Layer from Strapi */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-b from-[#3B1259] via-[#4d166d] to-[#7E22CE] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-fuchsia-500/20 to-transparent pointer-events-none" />
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4 shadow">
                    <ShieldCheck className="w-8 h-8 text-fuchsia-300" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-fuchsia-300 uppercase">
                    {dataEcosystemSection.center_brand || "iFLOW"}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 mb-2">
                    {dataEcosystemSection.center_title || "BICRI Intelligence Layer"}
                  </h3>
                  <p className="text-xs text-purple-200 leading-relaxed font-normal mb-4 max-w-xs">
                    {dataEcosystemSection.center_subtitle || "Processing • Validation • Assessment"}
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[10px] font-bold text-white border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>100% Consent-Driven &amp; DPDP Compliant</span>
                  </div>
                </div>

                {/* Right Column: Decision Outputs from Strapi */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    02 / ACTIONABLE DECISION OUTPUTS
                  </span>
                  {(dataEcosystemSection.right_items ||
                    dataEcosystemSection.right_features || [
                    { label: "Risk segmentation" },
                    { label: "Business insights" },
                    { label: "Limit recommendations" },
                    { label: "Structured reports" },
                  ]).map((item: any, i: number) => {
                    const label = item.label || item.title || "";
                    return (
                      <div
                        key={item.id || i}
                        className="p-4 rounded-xl bg-white border border-purple-100 shadow-2xs flex items-center gap-3.5 hover:border-purple-300 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 shrink-0">
                          {i === 0 ? (
                            <Activity className="w-4 h-4" />
                          ) : i === 1 ? (
                            <Layers className="w-4 h-4" />
                          ) : i === 2 ? (
                            <Coins className="w-4 h-4" />
                          ) : (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{label}</h4>
                          <span className="text-[10px] text-slate-400">Automated Intelligence</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Footer Note from Strapi */}
              {dataEcosystemSection.footer_note && (
                <p className="text-[11px] text-center text-slate-400 italic mt-8 pt-4 border-t border-purple-100/60">
                  {sanitize(dataEcosystemSection.footer_note)}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: OTHER DYNAMIC SECTIONS CONFIGURED IN STRAPI
          ═══════════════════════════════════════════════════════════════════════ */}
      {otherSections.map((sec, idx) => {
        if (sec.__component === "solution.feature-section") {
          const imgUrl = sec.image?.url ? toUrl(sec.image.url) : null;
          return (
            <section
              key={sec.id || idx}
              className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fc] border-b border-purple-100/60 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    {sec.badge && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase border border-purple-200/60 shadow-2xs">
                        {sec.badge}
                      </span>
                    )}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {renderMarkdownTitle(sec.title || "Enterprise Platform Capabilities")}
                    </h2>
                    {sec.description && (
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        {sanitize(sec.description)}
                      </p>
                    )}
                    {sec.features && (
                      <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {sanitize(sec.features)}
                      </div>
                    )}
                  </div>

                  {imgUrl && (
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border border-purple-100 bg-white p-3 group">
                        <Image
                          src={imgUrl}
                          alt={sec.image?.alt || sec.title || "Solution Feature"}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        return (
          <div key={sec.id || idx}>
            <SectionRenderer section={sec} index={idx} solutionSlug="bicri" />
          </div>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8: DYNAMIC STRAPI FREQUENTLY ASKED QUESTIONS (Accordion)
          ═══════════════════════════════════════════════════════════════════════ */}
      {dynamicFaqs.length > 0 && (
        <section
          id="faq"
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

            {/* Accordion Stack */}
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

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 9: ENTERPRISE CALL TO ACTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        aria-label="Deploy BICRI Platform"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white text-center overflow-hidden"
      >
        {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7c3aed]/20 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 w-96 h-96 rounded-full bg-[#e51ede]/15 blur-[140px]"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-fuchsia-300 text-xs font-bold tracking-widest uppercase mb-4 border border-white/20 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-fuchsia-300" />
            ENTERPRISE DEPLOYMENT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Transform Your MSME Credit Portfolio with{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              BICRI Intelligence
            </span>
          </h2>
          <p className="text-sm sm:text-base text-purple-200 max-w-2xl mx-auto leading-relaxed mb-8">
            Deploy automated alternate data credit underwriting for Banks, NBFCs, and Digital Fintechs in 4–8 weeks. Full DPDP Act 2023 &amp; RBI compliance built-in.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#9a3f91] to-[#e51ede] text-white font-bold text-sm sm:text-base shadow-xl shadow-fuchsia-950/40 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
            >
              <span>Schedule a Platform Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/20 border border-white/20 transition-all"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
