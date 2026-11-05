"use client";

import React from "react";
import Image from "next/image";
import {
  Target,
  ShoppingBag,
  Store,
  HeartPulse,
  Factory,
  Truck,
  Users,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

interface IndustryCardItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  badge: string;
  icon: LucideIcon;
  metricLabel: string;
  metric: string;
}

interface BNPLIndustryCardsSectionProps {
  mainSection?: any;
  allSections?: any[];
}

export default function BNPLIndustryCardsSection({
  mainSection,
  allSections = [],
}: BNPLIndustryCardsSectionProps) {
  const badge =
    mainSection?.badge || "Industry use cases";
  const title =
    mainSection?.title || "Built for Diverse Business and Lending Ecosystems";
  const description =
    mainSection?.description ||
    "Adapt financing programmes to how each sector buys, sells and manages working capital.";

  // Extract cards dynamically from all sections
  const cards: IndustryCardItem[] = (allSections.length > 0 ? allSections : [mainSection])
    .filter(Boolean)
    .map((sec: any, idx: number) => {
      const rawFeatures = sec.features || "";
      const boldMatch = rawFeatures.match(/\*\*(.*?)\*\*/);
      let cardTitle = boldMatch ? boldMatch[1].trim() : sec.title || "";
      let cardDesc = rawFeatures.replace(/\*\*(.*?)\*\*/, "").trim();
      cardDesc = cardDesc.replace(/^\s*\n+/, "").trim();

      const imgUrl =
        sec.image?.url ||
        sec.image?.data?.attributes?.url ||
        "";

      const t = cardTitle.toLowerCase();
      let cardBadge = "USE CASE";
      let Icon: LucideIcon = ShoppingBag;
      let metricLabel = "Programme";
      let metric = "Credit Solution";

      if (t.includes("commerce") || t.includes("marketplace")) {
        cardBadge = "E-COMMERCE";
        Icon = ShoppingBag;
        metricLabel = "Financing Mode";
        metric = "Checkout & Receivables";
      } else if (t.includes("fmcg") || t.includes("retail")) {
        cardBadge = "RETAIL DISTRIBUTION";
        Icon = Store;
        metricLabel = "Credit Structure";
        metric = "Kirana & Inventory";
      } else if (t.includes("pharma") || t.includes("health")) {
        cardBadge = "HEALTH & PHARMA";
        Icon = HeartPulse;
        metricLabel = "Network Reach";
        metric = "Distributor & Franchise";
      } else if (t.includes("manufactur") || t.includes("supply chain")) {
        cardBadge = "SUPPLY CHAIN";
        Icon = Factory;
        metricLabel = "Working Capital";
        metric = "Invoice & Procurement";
      } else if (t.includes("wholesale") || t.includes("b2b")) {
        cardBadge = "B2B COMMERCE";
        Icon = Truck;
        metricLabel = "Payment Flow";
        metric = "Structured Supplier";
      } else if (t.includes("msme") || t.includes("small business")) {
        cardBadge = "MSME GROWTH";
        Icon = Users;
        metricLabel = "Merchant Credit";
        metric = "Flexible Credit Lines";
      }

      return {
        id: sec.id || idx,
        title: cardTitle,
        description: cardDesc,
        image: imgUrl,
        badge: cardBadge,
        icon: Icon,
        metricLabel,
        metric,
      };
    });

  return (
    <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Target className="w-3.5 h-3.5 text-[#9a3f91]" />
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* 6 Cards Grid (Matching "Why Co-Lending Matters" Card Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id || i}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
              >
                {/* Image Container with Floating Badge */}
                <div className="relative w-full aspect-[16/10] bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <IconComp className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10.5px] font-mono font-bold tracking-wider text-[#623f99] border border-purple-100 shadow-2xs">
                      <IconComp className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Metric Highlight Box */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        {card.metricLabel}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#0a1f44] tracking-tight">
                        {card.metric}
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

