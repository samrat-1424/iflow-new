"use client";

import React from "react";
import Image from "next/image";
import {
  Users,
  Zap,
  Sliders,
  ShieldCheck,
  FileCheck,
  BrainCircuit,
  Network,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

interface BreBuiltForTeamsSectionProps {
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
  defaultDescription: string;
  metricLabel: string;
  metric: string;
  icon: LucideIcon;
  defaultImage: string;
}

const PILLAR_DEFAULTS: Record<number, PillarDefault> = {
  0: {
    badge: "VELOCITY & AUTOMATION",
    defaultTitle: "Faster Loan Approvals",
    defaultDescription:
      "Automate configured underwriting decisions and reduce avoidable manual steps to deliver instant, high-confidence sanction outcomes.",
    metricLabel: "Decision Speed",
    metric: "< 200ms Execution",
    icon: Zap,
    defaultImage: "/uploads/Faster_Loan_Approvals_with_Automation_95e8e2d1e9.webp",
  },
  1: {
    badge: "NO-CODE AGILITY",
    defaultTitle: "Business-Led Configuration",
    defaultDescription:
      "Maintain product-specific policy logic, scoring matrices, and threshold rules through a structured, visual no-code interface.",
    metricLabel: "Policy Deployment",
    metric: "Zero Dev Dependency",
    icon: Sliders,
    defaultImage: "/uploads/Business_led_Product_Configuration_54f4050a29.webp",
  },
  2: {
    badge: "CONTROL & COMPLIANCE",
    defaultTitle: "Standardised Governance",
    defaultDescription:
      "Apply consistent rules across all distribution channels while preserving controlled review, exception handling, and approval paths.",
    metricLabel: "Audit Standard",
    metric: "100% Policy Adherence",
    icon: ShieldCheck,
    defaultImage: "/uploads/Standardised_Governance_Framework_5f64dffd9d.webp",
  },
  3: {
    badge: "TRANSPARENCY & AUDIT",
    defaultTitle: "Explainable Decisioning",
    defaultDescription:
      "Inspect parameters, executed rules, calculated scores, eligibility outcomes, and complete decision context with full audit traceability.",
    metricLabel: "Traceability",
    metric: "Full Decision Replay",
    icon: FileCheck,
    defaultImage: "/uploads/Explainable_Decisioning_Dashboard_183b46759b.webp",
  },
  4: {
    badge: "INTELLIGENT SCORING",
    defaultTitle: "AI-Assisted Analysis",
    defaultDescription:
      "Complement deterministic business rules with machine learning models and contextual data summaries where supported for deeper risk insight.",
    metricLabel: "Model Synergy",
    metric: "Rules + ML Ensembles",
    icon: BrainCircuit,
    defaultImage: "/uploads/AI_Assisted_Analysis_Dashboard_00ddc080d1.webp",
  },
  5: {
    badge: "MODULAR STACK",
    defaultTitle: "Integration-Ready Layer",
    defaultDescription:
      "Connect seamlessly with an existing Loan Origination System (LOS), core banking, and external verification APIs via low-latency endpoints.",
    metricLabel: "Interoperability",
    metric: "REST API Connectors",
    icon: Network,
    defaultImage: "/uploads/Integration_Ready_API_Connectivity_ecaa344160.webp",
  },
};

function parseSectionData(sec: any, fallback: PillarDefault) {
  let title = sanitize(sec?.title);
  let description = sanitize(sec?.description);

  const rawFeatures = typeof sec?.features === "string" ? sec.features : "";

  if (rawFeatures) {
    const boldMatch = rawFeatures.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      if (!title || title.toLowerCase().includes("designed to improve")) {
        title = boldMatch[1].trim();
      }
      const remainder = rawFeatures.replace(boldMatch[0], "").trim();
      if (!description && remainder) {
        description = remainder;
      }
    } else if (!description) {
      description = rawFeatures.trim();
    }
  }

  return {
    title: title || fallback.defaultTitle,
    description: description || fallback.defaultDescription,
  };
}

export default function BreBuiltForTeamsSection({
  allSections,
  solution,
}: BreBuiltForTeamsSectionProps) {
  if (!allSections || allSections.length === 0) return null;

  const mainSec = allSections[0] || {};
  const badge = sanitize(mainSec.badge) || "BUILT FOR LENDING TEAMS";
  const title =
    sanitize(mainSec.title) ||
    "Designed to Improve the Control and Consistency of Credit Decisioning";
  const description =
    sanitize(mainSec.description) ||
    "How credit policy makers, risk officers, and underwriting teams automate decisions, govern complex rules, and deploy updates without IT backlogs.";

  // Build the 6 pillars matching the exact Co-Lending "Why Co-Lending Matters" 3-column card style
  const pillars = Array.from({ length: 6 }, (_, idx) => {
    const sec = allSections[idx];
    const fallback = PILLAR_DEFAULTS[idx] || PILLAR_DEFAULTS[0];

    let parsedTitle = fallback.defaultTitle;
    let parsedDescription = fallback.defaultDescription;

    if (sec) {
      const parsed = parseSectionData(sec, fallback);
      parsedTitle = parsed.title;
      parsedDescription = parsed.description;
    }

    const imageUrl = toUrl(sec?.image?.url) || toUrl(fallback.defaultImage);
    const secBadge = sanitize(sec?.badge);
    const cardBadge =
      secBadge && !secBadge.toUpperCase().includes("BUILT FOR LENDING TEAMS")
        ? secBadge
        : fallback.badge;

    return {
      badge: cardBadge,
      title: parsedTitle,
      description: parsedDescription,
      image: imageUrl,
      icon: fallback.icon,
      metricLabel: fallback.metricLabel,
      metric: fallback.metric,
    };
  });

  return (
    <section
      id="built-for-lending-teams"
      aria-labelledby="built-for-lending-teams-heading"
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
        {/* Section Header matching Co-Lending "Why Co-Lending Matters" */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-[#9a3f91]" />
            {badge}
          </span>
          <h2
            id="built-for-lending-teams-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* 6 Cards Grid (Matching Co-Lending 3-Pillars Card Style in a 2x3 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
              >
                {/* Image Container with Top-Left Floating Badge */}
                <div className="relative w-full aspect-[16/10] bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
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
                      <IconComp className="w-14 h-14 text-purple-300" />
                    </div>
                  )}
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
  );
}

