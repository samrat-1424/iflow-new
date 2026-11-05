"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Solution } from "@/utils/Solution";
import { fetchSolutions } from "@/services/solutionsService";
import Reveal from "@/components/Reveal";
import {
  ArrowUpRight,
  Layers,
  FileText,
  GitFork,
  Link2,
  Cpu,
  Wallet,
  Users,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Workflow,
  Sparkles,
  Gauge,
  ClipboardList,
} from "lucide-react";

interface SolutionsSectionProps {
  title?: string;
  subtitle?: string;
  pageSize?: number;
  showContinueButton?: boolean;
  isHome?: boolean;
}

interface SolutionMeta {
  tag: string;
  tagColor: string;
  defaultDesc: string;
  icon: any;
  featured?: boolean;
  image?: string;
}

const SOLUTION_META: Record<string, SolutionMeta> = {
  "co-lending": {
    tag: "CO-LENDING",
    tagColor: "text-purple-700",
    defaultDesc: "Connect partners, simplify collaboration, and move capital with confidence.",
    icon: Link2,
    featured: true,
    image: "/hero/colen.png",
  },
  "distribution": {
    tag: "DISTRIBUTION",
    tagColor: "text-purple-700",
    defaultDesc: "Optimize channel partner networks and smart loan distribution operations.",
    icon: GitFork,
    featured: true,
    image: "/hero/distrbution.png",
  },
  "loan-origination-los": {
    tag: "LOS",
    tagColor: "text-purple-700",
    defaultDesc: "Make onboarding, underwriting, and disbursement feel effortless.",
    icon: ClipboardList,
  },
  "loan-management-lms": {
    tag: "LMS",
    tagColor: "text-purple-700",
    defaultDesc: "A clearer way to manage the entire loan lifecycle, from servicing to settlement.",
    icon: FileText,
  },
  "bicri": {
    tag: "CREDIT RISK",
    tagColor: "text-purple-700",
    defaultDesc: "Unlock deep analytics, operational credit intelligence, and behavioral signals.",
    icon: Gauge,
  },
  "bnpl-product-suite": {
    tag: "RETAIL CREDIT",
    tagColor: "text-purple-700",
    defaultDesc: "Deploy instant credit models and flexible buy-now-pay-later checkouts at scale.",
    icon: Wallet,
  },
  "msme-and-agri-tech-on-boarding-journeys": {
    tag: "ONBOARDING",
    tagColor: "text-purple-700",
    defaultDesc: "Digitize complex rural, MSME, and agri-focused borrowing journeys with ease.",
    icon: Users,
  },
  "collection": {
    tag: "COLLECTIONS",
    tagColor: "text-purple-700",
    defaultDesc: "Power intelligence-driven recovery journeys and automated customer repayment routes.",
    icon: TrendingUp,
  },
  "on-boarding-journey": {
    tag: "API SERVICES",
    tagColor: "text-purple-700",
    defaultDesc: "Integrate KYC, bureau checks, verification, and lending flows via robust APIs.",
    icon: Layers,
  },
  "ai-intelligent-suite": {
    tag: "AI INTELLIGENT SUITE",
    tagColor: "text-purple-700",
    defaultDesc: "Put intelligent automation and machine learning to work where it makes the biggest difference.",
    icon: Cpu,
    featured: true,
    image: "/hero/AI.png",
  },
  "ai-ml-score-models": {
    tag: "AI INTELLIGENT SUITE",
    tagColor: "text-purple-700",
    defaultDesc: "Put intelligent automation and machine learning to work where it makes the biggest difference.",
    icon: Cpu,
    featured: true,
    image: "/hero/AI.png",
  },
  "pool-buyout": {
    tag: "CAPITAL FLOW",
    tagColor: "text-purple-700",
    defaultDesc: "Streamline portfolio acquisition, risk assessment, and capital transfer with precision.",
    icon: Sparkles,
    featured: true,
    image: "/hero/pullbuyout.png",
  },
  "dsa": {
    tag: "DSA PLATFORM",
    tagColor: "text-purple-700",
    defaultDesc: "Empower direct selling agents with end-to-end partner tracking and payout workflows.",
    icon: Briefcase,
  },
  "dsa-management-system": {
    tag: "DSA PLATFORM",
    tagColor: "text-purple-700",
    defaultDesc: "Empower direct selling agents with end-to-end partner tracking and payout workflows.",
    icon: Briefcase,
  },
  "ai-based-bre": {
    tag: "RULES ENGINE",
    tagColor: "text-purple-700",
    defaultDesc: "Automate credit policies, complex scorecards, and multi-bureau decisioning in milliseconds.",
    icon: Cpu,
  },
};

const ORDERED_SOLUTIONS = [
  { id: 1, title: "Co-lending", slug: "co-lending" },
  { id: 2, title: "AI Intelligent Suite", slug: "ai-intelligent-suite" },
  { id: 3, title: "Loan Origination System", slug: "loan-origination-los" },
  { id: 4, title: "Loan Management System", slug: "loan-management-lms" },
  { id: 5, title: "Collection", slug: "collection" },
  { id: 6, title: "Pool Buyout", slug: "pool-buyout" },
  { id: 7, title: "Distribution", slug: "distribution" },
  { id: 8, title: "MSME and Agri Tech On-Boarding Journeys", slug: "msme-and-agri-tech-on-boarding-journeys" },
  { id: 9, title: "DSA Management System", slug: "dsa" },
  { id: 10, title: "API-Services", slug: "on-boarding-journey" },
  { id: 11, title: "BICRI", slug: "bicri" },
  { id: 12, title: "BNPL Product Suite", slug: "bnpl-product-suite" },
];

export default function SolutionsSection({
  isHome = true,
}: SolutionsSectionProps) {
  const [solutions, setSolutions] = useState(ORDERED_SOLUTIONS);

  useEffect(() => {
    fetchSolutions({ page: 1, pageSize: 100 })
      .then(({ solutions: fetchedSolutions }) => {
        if (fetchedSolutions && fetchedSolutions.length > 0) {
          // Keep canonical order but merge fetched info if needed
          const map = new Map(fetchedSolutions.map((s) => [s.slug, s]));
          const baseList = ORDERED_SOLUTIONS.map((s) => {
            const fetched = map.get(s.slug) || map.get(s.slug.replace("dsa", "dsa-management-system"));
            return fetched ? { ...s, ...fetched, id: s.id } : s;
          });

          // Also include any new solutions from Strapi that aren't in ORDERED_SOLUTIONS
          const orderedSlugs = new Set(ORDERED_SOLUTIONS.map((s) => s.slug));
          const extraSolutions = fetchedSolutions.filter(
            (s) => !orderedSlugs.has(s.slug) && s.slug !== "dsa-management-system" && s.slug !== "ai-ml-score-models"
          );

          setSolutions([...baseList, ...extraSolutions]);
        }
      })
      .catch((err) => {
        console.error("Error fetching solutions:", err);
      });
  }, []);

  return (
    <section id="solutions" className="w-full py-20 px-6 sm:px-10 lg:px-16 bg-white overflow-hidden">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <Reveal threshold={0.1} animationType="fade-up">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-purple-700 mb-3">
            IFLOW SOLUTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore our latest in{" "}
            <span className="text-[#9a3f91]">
              lending technology
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl mx-auto leading-relaxed">
            Twelve enterprise-grade lending modules on one connected platform — built to
            run the entire loan lifecycle.
          </p>
        </Reveal>
      </div>

      {/* Solutions Cards Grid */}
      <div className="max-w-7xl mx-auto">
        {/* Top Featured Row: 2 Large Cards (Co-lending & Distribution) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {solutions.slice(0, 2).map((solution) => {
            const meta = SOLUTION_META[solution.slug] || {
              tag: "LENDING",
              tagColor: "text-purple-700",
              defaultDesc: "Comprehensive digital lending module designed for scale.",
              icon: Sparkles,
            };
            const Icon = meta.icon;

            return (
              <Reveal key={solution.slug} threshold={0.08} animationType="fade-up">
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="group relative flex flex-col justify-between p-8 rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1.5 transition-all duration-300 min-h-[380px] overflow-hidden"
                >
                  <div>
                    {/* Top Row: Icon + Arrow */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B1259] via-[#5B1F84] to-[#7E22CE] text-white flex items-center justify-center shadow-md shadow-purple-950/20 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#623f99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    {/* Tag + Title + Description */}
                    <p className="text-[11px] font-mono font-semibold tracking-wider uppercase text-purple-700 mb-1.5">
                      {meta.tag}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                      {meta.defaultDesc}
                    </p>
                  </div>

                  {/* Featured Graphic/Banner Container */}
                  <div className="mt-6 pt-4 w-full h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-purple-50 via-slate-50 to-pink-50/40 border border-purple-100/60 flex items-center justify-center overflow-hidden relative">
                    {meta.image ? (
                      <div className="relative w-full h-full p-4 flex items-center justify-center">
                        <Image
                          src={meta.image}
                          alt={solution.title}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="text-purple-400 font-mono text-xs uppercase tracking-wider">
                        iFLOW MODULE
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Tier 2 & Tier 3: Unified 3-Column Grid */}
        {(() => {
          const poolBuyout = solutions.find((s) => s.slug === "pool-buyout") || solutions[5];
          const distribution = solutions.find((s) => s.slug === "distribution") || solutions[6];
          const msme = solutions.find((s) => s.slug === "msme-and-agri-tech-on-boarding-journeys") || solutions[7];

          const poolMeta = (poolBuyout && SOLUTION_META[poolBuyout.slug]) || {
            tag: "CAPITAL FLOW",
            tagColor: "text-purple-700",
            defaultDesc: "Streamline portfolio acquisition, risk assessment, and capital transfer with precision.",
            icon: Sparkles,
            image: "/hero/pullbuyout.png",
          };
          const PoolIcon = poolMeta.icon;

          const rightCards = [distribution, msme].filter(Boolean);

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-6 sm:mb-8">
              {/* Row 1: LOS, LMS, Collection (3 cards) */}
              {solutions.slice(2, 5).map((solution, index) => {
                const meta = SOLUTION_META[solution.slug] || {
                  tag: "MODULE",
                  tagColor: "text-purple-700",
                  defaultDesc: "Next-generation digital lending infrastructure engineered for scale.",
                  icon: Sparkles,
                };
                const Icon = meta.icon;

                return (
                  <Reveal
                    key={solution.slug}
                    threshold={0.08}
                    animationType="fade-up"
                    delay={(index % 3) * 80}
                    className="h-full flex flex-col"
                  >
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="group relative flex flex-col justify-between p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1.5 transition-all duration-300 h-full min-h-[220px] flex-1"
                    >
                      <div>
                        {/* Top Row: Icon + Arrow */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3B1259] via-[#5B1F84] to-[#7E22CE] text-white flex items-center justify-center shadow-md shadow-purple-950/15 group-hover:scale-105 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#623f99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>

                        {/* Tag + Title + Description */}
                        <p className="text-[10px] font-mono font-semibold tracking-wider uppercase text-purple-700 mb-1">
                          {meta.tag}
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2 min-h-[3.25rem] flex items-start">
                          {solution.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                          {meta.defaultDesc}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}

              {/* Row 2: Pool Buyout (Spans 2 columns, covering both LOS and LMS) */}
              {poolBuyout && (
                <Reveal
                  threshold={0.08}
                  animationType="fade-up"
                  className="col-span-1 md:col-span-2 lg:col-span-2 h-full"
                >
                  <Link
                    href={`/solutions/${poolBuyout.slug}`}
                    className="group relative flex flex-col justify-between p-8 rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1.5 transition-all duration-300 h-full min-h-[380px] lg:min-h-[468px] overflow-hidden"
                  >
                    <div>
                      {/* Top Row: Icon + Arrow */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B1259] via-[#5B1F84] to-[#7E22CE] text-white flex items-center justify-center shadow-md shadow-purple-950/20 group-hover:scale-105 transition-transform">
                          <PoolIcon className="w-6 h-6" />
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#623f99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      {/* Tag + Title + Description */}
                      <p className="text-[11px] font-mono font-semibold tracking-wider uppercase text-purple-700 mb-1.5">
                        {poolMeta.tag}
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2">
                        {poolBuyout.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                        {poolMeta.defaultDesc}
                      </p>
                    </div>

                    {/* Featured Graphic/Banner Container */}
                    <div className="mt-6 pt-4 w-full flex-1 min-h-[170px] sm:min-h-[200px] rounded-2xl bg-gradient-to-br from-purple-50 via-slate-50 to-pink-50/40 border border-purple-100/60 flex items-center justify-center overflow-hidden relative">
                      <div className="relative w-full h-full p-4 flex items-center justify-center">
                        <Image
                          src={poolMeta.image || "/hero/pullbuyout.png"}
                          alt={poolBuyout.title}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Row 2 Right Column: Stacked Distribution & MSME (Aligned in Column 3, exactly like Collection) */}
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-7 h-full">
                {rightCards.map((solution, idx) => {
                  const meta = SOLUTION_META[solution.slug] || {
                    tag: "MODULE",
                    tagColor: "text-purple-700",
                    defaultDesc: "Next-generation digital lending infrastructure engineered for scale.",
                    icon: Sparkles,
                  };
                  const Icon = meta.icon;

                  return (
                    <Reveal
                      key={solution.slug}
                      threshold={0.08}
                      animationType="fade-up"
                      delay={idx * 80}
                      className="flex-1 flex flex-col"
                    >
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className="group relative flex flex-col justify-between p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1.5 transition-all duration-300 flex-1 min-h-[220px]"
                      >
                        <div>
                          {/* Top Row: Icon + Arrow */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3B1259] via-[#5B1F84] to-[#7E22CE] text-white flex items-center justify-center shadow-md shadow-purple-950/15 group-hover:scale-105 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#623f99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>

                          {/* Tag + Title + Description */}
                          <p className="text-[10px] font-mono font-semibold tracking-wider uppercase text-purple-700 mb-1">
                            {meta.tag}
                          </p>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2">
                            {solution.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                            {meta.defaultDesc}
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Tier 4: Bottom 4 Cards (DSA, API, BICRI, BNPL - Parallel with Same Size) */}
        {(() => {
          const bottomOrder = [
            "dsa",
            "on-boarding-journey",
            "bicri",
            "bnpl-product-suite",
          ];
          const remainingCards = bottomOrder
            .map((slug) =>
              solutions.find(
                (s) =>
                  s.slug === slug ||
                  (slug === "dsa" && s.slug === "dsa-management-system")
              )
            )
            .filter(Boolean) as typeof solutions;

          // Include any dynamically added solutions from Strapi (e.g. AI Based BRE)
          const handledSlugs = new Set([
            "co-lending",
            "ai-intelligent-suite",
            "loan-origination-los",
            "loan-management-lms",
            "collection",
            "pool-buyout",
            "distribution",
            "msme-and-agri-tech-on-boarding-journeys",
            "dsa",
            "dsa-management-system",
            "on-boarding-journey",
            "bicri",
            "bnpl-product-suite",
            "ai-ml-score-models",
          ]);
          const dynamicExtra = solutions.filter((s) => !handledSlugs.has(s.slug));
          const allBottomCards = [...remainingCards, ...dynamicExtra];

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {allBottomCards.map((solution, index) => {
                const meta = SOLUTION_META[solution.slug] || {
                  tag: "MODULE",
                  tagColor: "text-purple-700",
                  defaultDesc: "Next-generation digital lending infrastructure engineered for scale.",
                  icon: Sparkles,
                };
                const Icon = meta.icon;

                return (
                  <Reveal
                    key={solution.slug}
                    threshold={0.08}
                    animationType="fade-up"
                    delay={(index % 4) * 80}
                    className="h-full flex flex-col"
                  >
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="group relative flex flex-col justify-between p-7 rounded-3xl border border-slate-200/90 bg-white hover:border-purple-300 shadow-sm hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1.5 transition-all duration-300 h-full min-h-[260px] flex-1"
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Top Row: Icon + Arrow */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3B1259] via-[#5B1F84] to-[#7E22CE] text-white flex items-center justify-center shadow-md shadow-purple-950/15 group-hover:scale-105 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#623f99] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>

                          {/* Tag + Title + Description */}
                          <p className="text-[10px] font-mono font-semibold tracking-wider uppercase text-purple-700 mb-1">
                            {meta.tag}
                          </p>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#623f99] transition-colors mb-2 min-h-[3.25rem] flex items-start">
                            {solution.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                            {meta.defaultDesc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          );
        })()}
      </div>
    </section>
  );
}
