"use client";

import React from "react";
import Image from "next/image";
import {
  Layers,
  Check,
  Briefcase,
  Tractor,
  UserCheck,
  TrendingUp,
  Home,
  Building,
  Car,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

interface MsmeProductUseCasesSectionProps {
  allSections: any[];
  solution?: any;
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
    .replace(/\ufffd/g, "")
    .replace(/LT flow/gi, "iFLOW Network")
    .replace(/Loantap/gi, "iFLOW")
    .trim();
}

interface PillarDefault {
  badge: string;
  defaultTitle: string;
  defaultSubtitle: string;
  points: string[];
  metricLabel: string;
  metric: string;
  icon: LucideIcon;
  defaultImage: string;
}

const PILLAR_DEFAULTS: Record<number, PillarDefault> = {
  0: {
    badge: "COMMERCIAL & MSME",
    defaultTitle: "MSME Lending",
    defaultSubtitle: "Business, promoter, financial and banking details.",
    points: [
      "Automated GST triangulation and 36-month bank statement cash flow analysis",
      "Real-time Udyam registration and MCA promoter shareholding validation",
      "Multi-director e-KYC and digital board resolution documentation",
    ],
    metricLabel: "MSME Sizing",
    metric: "Instant Assessment",
    icon: Briefcase,
    defaultImage: "/uploads/Modern_MSME_Lending_Dashboard_Banner_0f1dbee8a6.webp",
  },
  1: {
    badge: "RURAL & AGRI TECH",
    defaultTitle: "Agricultural Lending",
    defaultSubtitle: "Landholding, crop, activity and scheme details.",
    points: [
      "Digital land records (RoR) verification and satellite crop health mapping",
      "Kisan Credit Card (KCC) and seasonal harvesting cycle repayment schedules",
      "Vernacular assisted field-agent mode with offline geographic data capture",
    ],
    metricLabel: "Agri Underwriting",
    metric: "100% Paperless in Field",
    icon: Tractor,
    defaultImage: "/uploads/Agricultural_Lending_Farm_Finance_Banner_a5a53a6468.webp",
  },
  2: {
    badge: "RETAIL UNSECURED",
    defaultTitle: "Personal Loans",
    defaultSubtitle: "Clear journeys for salaried and self-employed customers.",
    points: [
      "Instant salary slip parsing and Net Monthly Income (NMI) verification",
      "Real-time bureau score pull with auto-populated FOIR calculations",
      "Sub-3-minute sanction letter generation with video KYC (V-KYC)",
    ],
    metricLabel: "Sanction Time",
    metric: "< 3 Mins",
    icon: UserCheck,
    defaultImage: "/uploads/Personal_Loans_Made_Simple_a4ccea4bf1.webp",
  },
  3: {
    badge: "WORKING CAPITAL",
    defaultTitle: "Business Loans",
    defaultSubtitle: "Product-specific onboarding for business requirements.",
    points: [
      "Account Aggregator consent flow for instant audited financials ingestion",
      "Merchant POS transaction velocity and invoice factoring verification",
      "Dynamic credit limit setting with configurable repayment tenures",
    ],
    metricLabel: "Capital Speed",
    metric: "T+0 Disbursal",
    icon: TrendingUp,
    defaultImage: "/uploads/Business_Loans_Team_Onboarding_fded8acaad.webp",
  },
  4: {
    badge: "MORTGAGES & HOUSING",
    defaultTitle: "Home Loans",
    defaultSubtitle: "Applicant, property and financial workflows.",
    points: [
      "Co-applicant income aggregation and relationship matrix validation",
      "Legal & technical valuation report upload with geo-tagged property photos",
      "Automated CERSAI registration checks and title search verification",
    ],
    metricLabel: "Mortgage Journey",
    metric: "End-to-End Digital",
    icon: Home,
    defaultImage: "/uploads/Home_Loans_Made_Simple_a541439288.webp",
  },
  5: {
    badge: "SECURED EQUITY",
    defaultTitle: "Loan Against Property",
    defaultSubtitle: "Secured journeys with property documentation.",
    points: [
      "Commercial and residential property encumbrance checks",
      "Automated Loan-to-Value (LTV) limits and risk-adjusted pricing tiers",
      "Digital document vault with secure e-stamping and tripartite agreement flows",
    ],
    metricLabel: "Collateral Appraisal",
    metric: "Higher LTV Accuracy",
    icon: Building,
    defaultImage: "/uploads/Secured_Journey_to_Property_Finance_5e76a9b106.webp",
  },
  6: {
    badge: "AUTO & ASSET LEASING",
    defaultTitle: "Vehicle Financing",
    defaultSubtitle: "Customer, vehicle and dealer information.",
    points: [
      "Instant VAHAN API integration for RC, chassis, and hypothecation checks",
      "Direct dealer portal integration for quotation validation and pro-forma invoice",
      "Instant delivery order (DO) generation and direct dealer payment disbursement",
    ],
    metricLabel: "Dealer Processing",
    metric: "Instant DO",
    icon: Car,
    defaultImage: "/uploads/Vehicle_Financing_Journey_with_AI_Support_c124741685.webp",
  },
  7: {
    badge: "STUDENT & SKILL FINANCE",
    defaultTitle: "Education Loans",
    defaultSubtitle: "Student, co-applicant and course workflows.",
    points: [
      "Verified domestic & global university database with I-20 / admission letter validation",
      "Co-borrower income underwriting and moratorium period structuring",
      "Direct overseas fee remittance and multi-currency disbursement support",
    ],
    metricLabel: "Student Coverage",
    metric: "Global Campus",
    icon: GraduationCap,
    defaultImage: "/uploads/Bright_Education_Loan_Journey_Infographic_88d3c10a76.webp",
  },
};

function parseSectionFeatures(sec: any, fallback: PillarDefault) {
  let title = sanitize(sec?.title);
  let subtitle = sanitize(sec?.description);
  let points: string[] = [];

  const rawFeatures = typeof sec?.features === "string" ? sec.features : "";

  if (rawFeatures) {
    // If features contains bold title like **MSME Lending**
    const boldMatch = rawFeatures.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      if (!title || title.toLowerCase().includes("across lending products")) {
        title = boldMatch[1].trim();
      }
      const remainder = rawFeatures.replace(boldMatch[0], "").trim();
      const lines = remainder
        .split(/\n+/)
        .map((l: string) => l.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean);

      if (lines.length > 0 && (!subtitle || subtitle.toLowerCase().includes("generic form"))) {
        subtitle = lines[0];
      }

      if (lines.length > 1) {
        points = lines.slice(1);
      }
    } else {
      const lines = rawFeatures
        .split(/\n+/)
        .map((l: string) => l.trim().replace(/^[-*•]\s*/, ""))
        .filter(Boolean);
      if (lines.length > 0 && !subtitle) {
        subtitle = lines[0];
      }
      if (lines.length > 1) {
        points = lines.slice(1);
      }
    }
  }

  return {
    title: title || fallback.defaultTitle,
    subtitle: subtitle || fallback.defaultSubtitle,
    points: points.length > 0 ? points : fallback.points,
  };
}

export default function MsmeProductUseCasesSection({
  allSections,
  solution,
}: MsmeProductUseCasesSectionProps) {
  if (!allSections || allSections.length === 0) return null;

  const mainSec = allSections[0] || {};
  const badge = sanitize(mainSec.badge) || "PRODUCT USE CASES";
  const title =
    sanitize(mainSec.title) ||
    "Digital Onboarding Journeys Across Lending Products";
  const description =
    sanitize(mainSec.description) ||
    "Distinct application experiences instead of one generic form — purpose-built for each borrowing persona and product class.";

  // Build the 8 pillars matching the LOS A CONNECTED ORIGINATION LAYER layout
  const pillars = Array.from({ length: 8 }, (_, idx) => {
    const sec = allSections[idx];
    const fallback = PILLAR_DEFAULTS[idx] || PILLAR_DEFAULTS[0];

    let parsedTitle = fallback.defaultTitle;
    let parsedSubtitle = fallback.defaultSubtitle;
    let parsedPoints = fallback.points;

    if (sec) {
      const parsed = parseSectionFeatures(sec, fallback);
      parsedTitle = parsed.title;
      parsedSubtitle = parsed.subtitle;
      parsedPoints = parsed.points;
    }

    const imageUrl = toUrl(sec?.image?.url) || toUrl(fallback.defaultImage);
    const secBadge = sanitize(sec?.badge);
    const categoryBadge =
      secBadge && !secBadge.toUpperCase().includes("PRODUCT USE CASES")
        ? secBadge
        : fallback.badge;

    return {
      idx: `0${idx + 1}`,
      badge: categoryBadge,
      title: parsedTitle,
      subtitle: parsedSubtitle,
      points: parsedPoints,
      image: imageUrl,
      icon: fallback.icon,
      metricLabel: fallback.metricLabel,
      metric: fallback.metric,
    };
  });

  return (
    <section
      id="product-use-cases"
      aria-labelledby="product-use-cases-heading"
      className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
    >
      {/* Soft atmospheric background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-purple-100/35 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-100/25 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header matching LOS A CONNECTED ORIGINATION LAYER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#9a3f91]" />
            {badge}
          </span>
          <h2
            id="product-use-cases-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* 8 Alternating Showcase Pillars matching LOS A CONNECTED ORIGINATION LAYER */}
        <div className="space-y-24">
          {pillars.map((pillar, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = pillar.icon;

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

                  {pillar.subtitle && (
                    <p className="text-base sm:text-lg font-medium text-[#623f99] leading-relaxed">
                      {pillar.subtitle}
                    </p>
                  )}

                  {/* Checkmark Highlights */}
                  {pillar.points.length > 0 && (
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
                  )}

                  {/* Metric Tag Box */}
                  <div className="pt-4 flex items-center gap-4">
                    <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
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
                      {pillar.image ? (
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-purple-50/50">
                          <Icon className="w-16 h-16 text-purple-300" />
                        </div>
                      )}
                    </div>

                    {/* Bottom Banner */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium text-slate-700">
                        {pillar.title} Journey
                      </span>
                      <span className="font-mono text-[#7c3aed] font-semibold">
                        Digital Onboarding
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
