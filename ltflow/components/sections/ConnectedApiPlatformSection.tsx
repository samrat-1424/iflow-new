"use client";

import React from "react";
import Image from "next/image";
import {
  Network,
  Check,
  ShieldCheck,
  UserCheck,
  Fingerprint,
  BarChart3,
  LucideIcon,
} from "lucide-react";

interface ConnectedApiPlatformSectionProps {
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

function parsePoints(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n+/)
    .map((l) => l.trim().replace(/^[-*•]\s*/, ""))
    .filter(Boolean);
}

interface PillarConfig {
  defaultTitle: string;
  defaultSubtitle: string;
  badge: string;
  metricLabel: string;
  metric: string;
  icon: LucideIcon;
}

const DEFAULT_PILLARS: PillarConfig[] = [
  {
    defaultTitle: "Credit Score & Bureau Analytics",
    defaultSubtitle: "Fetch real-time credit reports and automated insights across leading credit bureaus.",
    badge: "BUREAU & SCORING",
    metricLabel: "Latency",
    metric: "Sub-Second Pull",
    icon: BarChart3,
  },
  {
    defaultTitle: "Instant PAN Verification",
    defaultSubtitle: "Direct government database query with real-time fraud and tax identity validation.",
    badge: "TAX & IDENTITY",
    metricLabel: "Verification",
    metric: "Direct ITD / NSDL",
    icon: ShieldCheck,
  },
  {
    defaultTitle: "Comprehensive Customer KYC",
    defaultSubtitle: "Automated document upload, validation, and regulatory due diligence workflows.",
    badge: "REGULATORY COMPLIANCE",
    metricLabel: "Onboarding",
    metric: "100% Paperless",
    icon: UserCheck,
  },
  {
    defaultTitle: "Aadhaar-Based Instant Verification",
    defaultSubtitle: "Secure OTP and biometric identity validation for frictionless borrower onboarding.",
    badge: "BIOMETRIC & OTP",
    metricLabel: "Ecosystem",
    metric: "Real-Time Match",
    icon: Fingerprint,
  },
];

export default function ConnectedApiPlatformSection({
  allSections,
  solution,
}: ConnectedApiPlatformSectionProps) {
  if (!allSections || allSections.length === 0) return null;

  const mainSec = allSections[0] || {};
  const badge = sanitize(mainSec.badge) || "CONNECTED INTELLIGENT PLATFORM";
  const title =
    sanitize(mainSec.title) ||
    "Connected Solutions in One Intelligent Platform";
  const description =
    sanitize(mainSec.description) ||
    "iFLOW simplifies compliance-heavy digital workflows into intelligent, automated modules, from verification to document management and execution.";

  const pillars = allSections.map((sec, idx) => {
    const config = DEFAULT_PILLARS[idx] || DEFAULT_PILLARS[0];
    const points = parsePoints(sec?.features);
    const isMainTitle = idx === 0 && sanitize(sec?.title) === title;
    const itemTitle = isMainTitle ? config.defaultTitle : (sanitize(sec?.title) || config.defaultTitle);
    const itemSubtitle =
      idx === 0
        ? "Fetch real-time credit reports and automated insights across leading credit bureaus."
        : points[0] || config.defaultSubtitle;
    const itemPoints = idx === 0 ? points : points;
    const imageUrl = toUrl(sec?.image?.url);

    return {
      idx: `0${idx + 1}`,
      badge: sanitize(sec?.badge) || config.badge,
      title: itemTitle,
      subtitle: itemSubtitle,
      points: itemPoints,
      image: imageUrl,
      icon: config.icon,
      metricLabel: config.metricLabel,
      metric: config.metric,
    };
  });

  return (
    <section
      id="connected-solutions"
      aria-labelledby="connected-solutions-heading"
      className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Network className="w-3.5 h-3.5 text-[#9a3f91]" />
            {badge}
          </span>
          <h2
            id="connected-solutions-heading"
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

        {/* Alternating Showcase Pillars matching LOS A CONNECTED ORIGINATION LAYER */}
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
