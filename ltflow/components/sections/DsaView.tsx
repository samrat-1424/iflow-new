"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionRenderer from "@/components/SectionRenderer";
import DsaComparison from "@/components/sections/DsaComparison";
import {
  Users,
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Wallet,
  Coins,
  FileText,
  Lock,
  Plus,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronDown,
  Briefcase,
  Layers,
  HelpCircle,
  FileCheck,
  FileCheck2,
  Sliders,
  Scale,
  Building,
  Network,
  Activity,
  LucideIcon,
} from "lucide-react";

interface DsaViewProps {
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
    .replace(/LT flow/gi, "iFLOW Network")
    .replace(/Loantap/gi, "iFLOW")
    .trim();
}

function parseBulletPoints(text: string | null | undefined): { title: string; desc: string }[] {
  if (!text) return [];
  const rawLines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const items: { title: string; desc: string }[] = [];

  let currentTitle = "";
  let currentDesc = "";

  for (const line of rawLines) {
    if (line.startsWith("- ")) {
      if (currentTitle) {
        items.push({ title: currentTitle, desc: currentDesc.trim() });
      }
      currentTitle = line.replace(/^- /, "").trim();
      currentDesc = "";
    } else {
      currentDesc += (currentDesc ? " " : "") + line;
    }
  }

  if (currentTitle) {
    items.push({ title: currentTitle, desc: currentDesc.trim() });
  }

  return items;
}

// Icon helper for collection cards based on title keyword
function getCardIcon(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("invoice") || t.includes("reconciliation")) return FileCheck2;
  if (t.includes("payout")) return Wallet;
  if (t.includes("sma") || t.includes("search")) return Sliders;
  if (t.includes("report") || t.includes("analytics") || t.includes("mis")) return BarChart3;
  if (t.includes("maker") || t.includes("audit")) return ShieldCheck;
  if (t.includes("sla") || t.includes("escalation")) return Zap;
  return Layers;
}

export default function DsaView({ solution }: DsaViewProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const sections: any[] = solution?.sections || [];

  // ────────────────────────────────────────────────────────────────────────────
  // Dynamic Strapi Sections for DSA Management System
  // ────────────────────────────────────────────────────────────────────────────
  // Section 0: INDUSTRY SPECIFIC
  const secIndustry = sections.find(
    (s) =>
      s &&
      (String(s.title || "").toUpperCase().includes("INDUSTRY SPECIFIC") ||
        String(s.description || "").toLowerCase().includes("zero leakage") ||
        String(s.description || "").toLowerCase().includes("qualify"))
  );

  // Section 1: BUILT-IN RULE ENGINE
  const secRuleEngine = sections.find(
    (s) =>
      s &&
      (String(s.title || "").toUpperCase().includes("RULE ENGINE") ||
        String(s.description || "").toLowerCase().includes("automate your loan"))
  );

  // Section 2: ALL-IN-ONE DSA SOFTWARE
  const secAllInOne = sections.find(
    (s) =>
      s &&
      (String(s.title || "").toUpperCase().includes("ALL-IN-ONE") ||
        String(s.description || "").toLowerCase().includes("connectors"))
  );

  // Section 3: Collection Cards ("Financial Control From Calculation to Settlement.")
  const secCollectionCards = sections.find(
    (s) =>
      s &&
      (s.__component === "solution.collection-cards" ||
        String(s.title || "").toLowerCase().includes("financial control") ||
        (Array.isArray(s.cards) && s.cards.length > 0))
  );

  // Track handled IDs so remaining dynamic sections render in additionalSections
  const handledIds = new Set(
    [
      secIndustry?.id,
      secRuleEngine?.id,
      secAllInOne?.id,
      secCollectionCards?.id,
    ].filter(Boolean)
  );

  const additionalSections = sections.filter(
    (s: any) => s && (!s.id || !handledIds.has(s.id))
  );

  // Dynamic Bullet Points from Strapi Markdown
  const industryPoints = parseBulletPoints(secIndustry?.features);
  const ruleEnginePoints = parseBulletPoints(secRuleEngine?.features);
  const allInOnePoints = parseBulletPoints(secAllInOne?.features);

  // Dynamic Feature Cards from Strapi (Control That Follows Every Workflow)
  const featureCardsHeading =
    sanitize(solution?.feature_cards_heading) || "Control That Follows Every Workflow";
  const featureCardsDescription =
    sanitize(solution?.feature_cards_description) ||
    "Protect sensitive operational information with configurable access, accountability and oversight.";
  const featureCards = Array.isArray(solution?.feature_cards) ? solution.feature_cards : [];

  // Dynamic FAQs from Strapi
  const faqTitle = sanitize(solution?.faq_section?.title) || "You Ask. We Answer!";
  const faqs = Array.isArray(solution?.faq_section?.faqs) && solution.faq_section.faqs.length > 0
    ? solution.faq_section.faqs
    : [
        {
          id: 1,
          question: "What is a DSA management solution?",
          answer:
            "A DSA (Direct Selling Agent) management solution is a digital platform that helps lenders manage the complete DSA lifecycle, including onboarding, lead assignment, application tracking, document collection, commission management, and performance monitoring.",
        },
        {
          id: 2,
          question: "How does iFLOW help manage DSA operations?",
          answer:
            "iFLOW automates the entire DSA workflow by enabling digital onboarding, real-time lead distribution, application status tracking, document verification, and automated payout management.",
        },
        {
          id: 3,
          question: "Can multiple DSAs work on the platform simultaneously?",
          answer:
            "Yes. The platform is designed to support multiple DSAs, branches, and sales teams simultaneously with granular role-based access control.",
        },
      ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: DSA PLATFORM OVERVIEW (REQUESTED SHOWCASE & INTERACTIVE UI)
          Color theme: Website Royal Purple (#623f99), Vivid Violet (#7c3aed),
          and Magenta (#9a3f91)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="dsa-overview"
        aria-labelledby="dsa-heading"
        className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-[#faf8fd] via-white to-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
      >
        {/* Ambient atmospheric glows aligned with website theme */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#9a3f91]/15 rounded-full blur-[100px] -z-10"
        />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#9a3f91]" />
              FOR DIRECT SELLING AGENTS
            </div>

            {/* Main Heading */}
            <h2
              id="dsa-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-3.5"
            >
              Run Your Entire DSA Business From One Platform.
            </h2>

            {/* Description Subtitle */}
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Bring loan enquiries, multiple lenders, customer documents, employee follow-ups and
              commission settlements out of disconnected spreadsheets and messaging platforms—and
              into one structured workspace.
            </p>
          </div>

          {/* ────────────────────────────────────────────────────────────────────────
              CENTRAL DASHBOARD PREVIEW UI (INTERACTIVE MOCKUP MATCHING DESIGN)
          ──────────────────────────────────────────────────────────────────────── */}
          <div className="relative max-w-5xl mx-auto">
            {/* Ambient Purple Backdrop Halo */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-gradient-to-r from-purple-300/35 via-fuchsia-300/25 to-purple-200/35 rounded-[32px] blur-2xl -z-10"
            />

            {/* Dashboard Card Container */}
            <div className="relative rounded-2xl sm:rounded-3xl border border-purple-200/90 bg-white shadow-2xl shadow-purple-950/15 overflow-hidden">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-white border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#623f99] to-[#9a3f91] flex items-center justify-center text-white text-[10px] font-black shadow-xs">
                      iF
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                      iFLOW
                    </span>
                  </div>
                  <span className="text-slate-300 text-xs">|</span>
                  <span className="text-xs font-semibold text-slate-600 tracking-tight">
                    DSA Business
                  </span>
                </div>

                {/* User Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200/80 flex items-center justify-center text-[#7c3aed] text-xs font-bold shadow-2xs">
                    AK
                  </div>
                </div>
              </div>

              {/* Main Dashboard Layout (Sidebar + Work Area) */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[490px]">
                {/* Left Dark Sidebar (Theme matching website dark accents) */}
                <aside className="md:col-span-3 bg-[#170f29] text-white p-4 sm:p-5 flex flex-col justify-between border-r border-purple-950/50">
                  <div className="space-y-1.5">
                    {[
                      { id: "overview", label: "Overview", icon: LayoutDashboard },
                      { id: "leads", label: "Leads", icon: Users },
                      { id: "applications", label: "Applications", icon: FileText },
                      { id: "commission", label: "Commission", icon: Wallet },
                      { id: "reports", label: "Reports", icon: BarChart3 },
                    ].map((item) => {
                      const isActive = activeSidebarTab === item.id;
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSidebarTab(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-purple-800/80 to-purple-900/60 text-white font-semibold shadow-inner border-l-3 border-[#9a3f91]"
                              : "text-purple-200/70 hover:text-white hover:bg-purple-950/40"
                          }`}
                        >
                          <IconComp
                            className={`w-4 h-4 ${
                              isActive ? "text-[#c084fc]" : "text-purple-300/60"
                            }`}
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-purple-900/50 text-[11px] text-purple-300/70 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Active Lenders</span>
                      <span className="font-mono font-bold text-white">11 Lenders</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-purple-400/60">
                      <span>Status</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Synchronized
                      </span>
                    </div>
                  </div>
                </aside>

                {/* Right Work Area */}
                <div className="md:col-span-9 bg-[#faf9fd] p-4 sm:p-6 space-y-5">
                  {/* Top Greeting & New Enquiry Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        MONDAY, 18 JUN
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Good morning, Arjun
                      </h3>
                    </div>

                    <Link
                      href="/book-a-demo"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#623f99] to-[#7c3aed] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New enquiry</span>
                    </Link>
                  </div>

                  {/* 4 KPI Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Card 1: Total enquiries */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-medium text-slate-500">
                          Total enquiries
                        </span>
                        <div className="w-5 h-5 rounded-md bg-purple-50 text-[#7c3aed] flex items-center justify-center">
                          <TrendingUp className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        1,284
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-1">
                        <span>+12%</span>
                        <span className="text-slate-400 font-normal">vs last month</span>
                      </div>
                    </div>

                    {/* Card 2: Active applications */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-medium text-slate-500">
                          Active applications
                        </span>
                        <div className="w-5 h-5 rounded-md bg-purple-50 text-[#7c3aed] flex items-center justify-center">
                          <FileText className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        326
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium mt-1">
                        Across 11 lenders
                      </div>
                    </div>

                    {/* Card 3: Disbursed value */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-medium text-slate-500">
                          Disbursed value
                        </span>
                        <div className="w-5 h-5 rounded-md bg-purple-50 text-[#7c3aed] flex items-center justify-center">
                          <Wallet className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#623f99] tracking-tight">
                        ₹8.42 Cr
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium mt-1">
                        This quarter
                      </div>
                    </div>

                    {/* Card 4: Commission receivable */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-medium text-slate-500">
                          Commission receivable
                        </span>
                        <div className="w-5 h-5 rounded-md bg-purple-50 text-[#9a3f91] flex items-center justify-center">
                          <Coins className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#9a3f91] tracking-tight">
                        ₹12.8 L
                      </div>
                      <div className="text-[10px] text-[#9a3f91] font-semibold mt-1">
                        ₹4.2 L pending
                      </div>
                    </div>
                  </div>

                  {/* Two-Column Chart & Lender Performance Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    {/* Left: Application pipeline */}
                    <div className="sm:col-span-7 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-900">
                          Application pipeline
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Last 6 months
                        </span>
                      </div>

                      {/* Bar Chart Mockup with elegant brand purple gradients */}
                      <div className="h-32 flex items-end justify-between gap-2 pt-2 px-1">
                        {[
                          { month: "Jan", height: "42%" },
                          { month: "Feb", height: "58%" },
                          { month: "Mar", height: "52%" },
                          { month: "Apr", height: "76%" },
                          { month: "May", height: "88%" },
                          { month: "Jun", height: "100%" },
                        ].map((bar, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                          >
                            <div className="w-full relative flex items-end justify-center h-24">
                              <div
                                style={{ height: bar.height }}
                                className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-[#623f99] via-[#7c3aed] to-[#c084fc] transition-all duration-300 group-hover:brightness-110 shadow-xs"
                              />
                            </div>
                            <span className="text-[10px] font-mono font-medium text-slate-400 group-hover:text-slate-800 transition-colors">
                              {bar.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Lender performance */}
                    <div className="sm:col-span-5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-900">
                          Lender performance
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Applications
                        </span>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            name: "Axis Finance",
                            count: 88,
                            max: 100,
                            barColor: "bg-[#623f99]",
                          },
                          {
                            name: "Prime NBFC",
                            count: 62,
                            max: 100,
                            barColor: "bg-[#9a3f91]",
                          },
                          {
                            name: "Unity Bank",
                            count: 49,
                            max: 100,
                            barColor: "bg-[#7c3aed]",
                          },
                          {
                            name: "Capital One",
                            count: 32,
                            max: 100,
                            barColor: "bg-[#4c1d95]",
                          },
                        ].map((lender, lIdx) => (
                          <div key={lIdx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-700">
                                {lender.name}
                              </span>
                              <span className="font-mono font-bold text-slate-900">
                                {lender.count}
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                style={{
                                  width: `${(lender.count / lender.max) * 100}%`,
                                }}
                                className={`h-full ${lender.barColor} rounded-full transition-all duration-500`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────────────────────
                THE 5 BOTTOM STAT CARDS (EXACT METRICS FROM IMAGE)
            ──────────────────────────────────────────────────────────────────────── */}
            <div className="mt-8 rounded-2xl border border-purple-100/90 bg-white p-5 sm:p-6 shadow-xl shadow-purple-900/5">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:divide-x sm:divide-slate-100">
                <div className="text-center sm:text-left sm:pl-0">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#623f99] tracking-tight">
                    1,284
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    Total enquiries
                  </div>
                </div>

                <div className="text-center sm:text-left sm:pl-6">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#7c3aed] tracking-tight">
                    326
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    Active applications
                  </div>
                </div>

                <div className="text-center sm:text-left sm:pl-6">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#623f99] tracking-tight">
                    ₹8.42 Cr
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    Total disbursement
                  </div>
                </div>

                <div className="text-center sm:text-left sm:pl-6">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#9a3f91] tracking-tight">
                    ₹12.8 L
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    Commission receivable
                  </div>
                </div>

                <div className="text-center sm:text-left sm:pl-6 col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
                    42
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    Pending follow-ups
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: TWO SPECIALISED SOLUTIONS. ONE CONNECTED DSA ECOSYSTEM.
          Comparison table: For DSAs vs For Banks
      ────────────────────────────────────────────────────────────────────────── */}
      <DsaComparison />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 3: DYNAMIC STRAPI DSA FEATURE SECTIONS
          Section 0: INDUSTRY SPECIFIC (Qualify, Distribute & Track Leads)
          Section 1: BUILT-IN RULE ENGINE (Automate Your Loan Journey)
          Section 2: ALL-IN-ONE DSA SOFTWARE (Manage Connectors, Teams & Performance)
          Completely dynamic from Strapi Content Manager!
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="dsa-capabilities"
        className="py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70"
      >
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Feature 1: INDUSTRY SPECIFIC */}
          {secIndustry && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#623f99] border border-purple-200/70 tracking-widest uppercase">
                    PHASE 01
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#9a3f91] uppercase tracking-wider">
                    {sanitize(secIndustry.title) || "INDUSTRY SPECIFIC"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {sanitize(secIndustry.description) ||
                    "Qualify, Distribute & Track Leads With Zero Leakage"}
                </h3>

                {/* Bullet Features directly from Strapi markdown */}
                <div className="space-y-4 pt-2">
                  {industryPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          {pt.title}
                        </span>
                        {pt.desc && (
                          <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">
                            {pt.desc}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media column (Video or Image directly from Strapi) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl border border-purple-200/80 bg-white p-5 sm:p-7 shadow-xl shadow-purple-950/5 overflow-hidden">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
                    {secIndustry.image?.url?.endsWith(".mp4") ? (
                      <video
                        src={toUrl(secIndustry.image.url)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={toUrl(
                          secIndustry.image?.url || "/uploads/DSAA_1_02a4bc0e77.mp4"
                        )}
                        alt={sanitize(secIndustry.title) || "DSA Lead Capture"}
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      {sanitize(secIndustry.title)}
                    </span>
                    <span className="font-mono text-[#7c3aed] font-semibold">
                      Live iFLOW Rail
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feature 2: BUILT-IN RULE ENGINE */}
          {secRuleEngine && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Media column (Alternating layout: order-2 on mobile, order-1 on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative rounded-3xl border border-purple-200/80 bg-white p-5 sm:p-7 shadow-xl shadow-purple-950/5 overflow-hidden group">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 border border-slate-100 flex items-center justify-center shadow-inner">
                    <Image
                      src={toUrl(
                        secRuleEngine.image?.url || "/uploads/dsanew1_d0456714aa.png"
                      )}
                      alt={sanitize(secRuleEngine.title) || "Built-In Rule Engine"}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      {sanitize(secRuleEngine.title)}
                    </span>
                    <span className="font-mono text-[#7c3aed] font-semibold">
                      Automated Decisioning
                    </span>
                  </div>
                </div>
              </div>

              {/* Text column */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#623f99] border border-purple-200/70 tracking-widest uppercase">
                    PHASE 02
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#9a3f91] uppercase tracking-wider">
                    {sanitize(secRuleEngine.title) || "BUILT-IN RULE ENGINE"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {sanitize(secRuleEngine.description) ||
                    "Automate Your Loan Journey & Team Workflows"}
                </h3>

                {/* Bullet Features directly from Strapi markdown */}
                <div className="space-y-4 pt-2">
                  {ruleEnginePoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          {pt.title}
                        </span>
                        {pt.desc && (
                          <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">
                            {pt.desc}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Feature 3: ALL-IN-ONE DSA SOFTWARE */}
          {secAllInOne && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#623f99] border border-purple-200/70 tracking-widest uppercase">
                    PHASE 03
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#9a3f91] uppercase tracking-wider">
                    {sanitize(secAllInOne.title) || "ALL-IN-ONE DSA SOFTWARE"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {sanitize(secAllInOne.description) ||
                    "Manage Connectors, Teams & Performance in One Place"}
                </h3>

                {/* Bullet Features directly from Strapi markdown */}
                <div className="space-y-4 pt-2">
                  {allInOnePoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          {pt.title}
                        </span>
                        {pt.desc && (
                          <span className="text-xs text-slate-600 leading-relaxed block mt-0.5">
                            {pt.desc}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media column */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl border border-purple-200/80 bg-white p-5 sm:p-7 shadow-xl shadow-purple-950/5 overflow-hidden group">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 border border-slate-100 flex items-center justify-center shadow-inner">
                    <Image
                      src={toUrl(
                        secAllInOne.image?.url || "/uploads/dsanew2_5fac0d4948.png"
                      )}
                      alt={sanitize(secAllInOne.title) || "All In One DSA Software"}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      {sanitize(secAllInOne.title)}
                    </span>
                    <span className="font-mono text-[#7c3aed] font-semibold">
                      Live Dashboard Rail
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 3: STRAPI COLLECTION CARDS SECTION (ID 305)
          "Financial Control From Calculation to Settlement."
          100% Dynamic from Strapi Content Manager!
      ────────────────────────────────────────────────────────────────────────── */}
      {secCollectionCards && (
        <section
          id="financial-control"
          className="py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd]/50 border-b border-purple-100/70"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              {secCollectionCards.badge && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                  <Coins className="w-3.5 h-3.5 text-[#9a3f91]" />
                  {sanitize(secCollectionCards.badge)}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {sanitize(secCollectionCards.title) ||
                  "Financial Control From Calculation to Settlement."}
              </h2>
              {secCollectionCards.description && (
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {sanitize(secCollectionCards.description)}
                </p>
              )}
            </div>

            {/* 6 Collection Cards Grid */}
            {Array.isArray(secCollectionCards.cards) && secCollectionCards.cards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {secCollectionCards.cards.map((card: any, cIdx: number) => {
                  const IconComponent = getCardIcon(card.title || "");
                  return (
                    <div
                      key={card.id || cIdx}
                      className="group rounded-3xl border border-purple-200/80 bg-white p-7 shadow-xl shadow-purple-950/5 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-950/10 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#623f99] flex items-center justify-center transition-colors group-hover:bg-[#623f99] group-hover:text-white">
                          <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110 duration-300" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          {sanitize(card.title)}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {sanitize(card.description)}
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                        <span>{card.button_text || "Enterprise Module"}</span>
                        <div className="w-8 h-8 rounded-full bg-purple-50 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] text-[#623f99] group-hover:text-white flex items-center justify-center transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 4: STRAPI FEATURE CARDS SECTION
          "Control That Follows Every Workflow"
          100% Dynamic from Strapi Content Manager!
      ────────────────────────────────────────────────────────────────────────── */}
      {featureCards.length > 0 && (
        <section
          id="workflow-control"
          className="py-20 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
                GOVERNANCE & COMPLIANCE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {featureCardsHeading}
              </h2>
              {featureCardsDescription && (
                <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {featureCardsDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCards.map((card: any, idx: number) => (
                <div
                  key={card.id || idx}
                  className="rounded-2xl border border-purple-100/90 bg-[#faf8fd]/50 hover:bg-white p-6 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      {sanitize(card.title)}
                    </h4>
                    {card.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                        {sanitize(card.description)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 5: ADDITIONAL DYNAMIC STRAPI SECTIONS
          Renders any other dynamic sections authored in Content Manager!
      ────────────────────────────────────────────────────────────────────────── */}
      {additionalSections.length > 0 && (
        <section id="additional-sections" className="space-y-0">
          {additionalSections.map((sec, idx) => (
            <SectionRenderer key={sec.id || idx} section={sec} />
          ))}
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 6: DYNAMIC FAQ ACCORDION FROM STRAPI
          100% Dynamic from Strapi Content Manager!
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <FileCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {faqTitle}
            </h2>
          </div>

          {/* Accordion list directly from Strapi Content Manager (matching Co-Lending FAQ) */}
          <div className="space-y-4">
            {faqs.map((faq: any, fIdx: number) => {
              const isOpen = openFaqIndex === fIdx;
              const question = sanitize(faq.question);
              const answer = sanitize(faq.answer);

              return (
                <div
                  key={faq.id || fIdx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-purple-300 bg-purple-50/20 shadow-md shadow-purple-950/5"
                      : "border-slate-200/80 bg-white hover:border-purple-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
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

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 7: ENTERPRISE DEPLOYMENT CTA
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        aria-labelledby="cta-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden"
      >
        {/* Glow lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-semibold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/10 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            ENTERPRISE DEPLOYMENT
          </span>

          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto mb-6"
          >
            Ready to Supercharge Your{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              DSA Business?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
            Connect your branch network, loan agents, and lender partners to iFLOW&apos;s intelligent DSA platform.
            Deploy in weeks with ready-to-use lender integrations and transparent commission tracking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#501c78] font-bold text-sm sm:text-base shadow-xl shadow-black/20 hover:bg-purple-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>Schedule Platform Demo</span>
              <ArrowRight className="w-4 h-4 text-[#501c78]" />
            </Link>
            <a
              href="#dsa-overview"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white font-medium text-sm sm:text-base border border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-300"
            >
              <span>Explore Platform Features</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-purple-200/80 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Multi-Lender API Push</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Lead Leakage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Payout Settlement</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
