import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { Solution } from "@/utils/Solution";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionRenderer from "@/components/SectionRenderer";
import GenericSection from "@/components/sections/GenericSection";
import PoolBuyoutComparison from "@/components/sections/PoolBuyoutComparison";
import CoLendingComparison from "@/components/sections/CoLendingComparison";
import CoLendingView from "@/components/sections/CoLendingView";
import AiMlScoreModelsView from "@/components/sections/AiMlScoreModelsView";
import PoolBuyoutView from "@/components/sections/PoolBuyoutView";
import BicriView from "@/components/sections/BicriView";
import LoanOriginationLosView from "@/components/sections/LoanOriginationLosView";
import LoanManagementLmsView from "@/components/sections/LoanManagementLmsView";
import DistributionView from "@/components/sections/DistributionView";
import DsaView from "@/components/sections/DsaView";
import DigitalApplicationJourney from "@/components/sections/DigitalApplicationJourney";
import LmsDisbursementSection from "@/components/sections/LmsDisbursementSection";
import ApiSecurityGovernanceSection from "@/components/sections/ApiSecurityGovernanceSection";
import FieldCommandCentreSection from "@/components/sections/FieldCommandCentreSection";
import BreDualModesSection from "@/components/sections/BreDualModesSection";
import BreRuleStudioSection from "@/components/sections/BreRuleStudioSection";
import PlayingCardDeck from "@/components/hero/PlayingCardDeck";
import React from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Layers,
  Handshake,
  Network,
  ClipboardCheck,
  CalendarClock,
  Gauge,
  ShoppingBag,
  Tractor,
  PhoneCall,
  Braces,
  BrainCircuit,
  Users,
  Cpu,
  LucideIcon,
} from "lucide-react";
import { NAV_SOLUTIONS, getSolutionBySlug } from "@/utils/solutionsData";

interface SolutionHeroConfig {
  tag: string;
  name: string;
  titlePrefix: string;
  titleGradient: string;
  titleSuffix: string;
  description: string;
  stats: Array<{ value: string; label: string }>;
  capabilities: string[];
  statusBadge: string;
  icon: LucideIcon;
}

function getSolutionHeroConfig(slug: string, solution: Solution): SolutionHeroConfig {
  const s = slug.toLowerCase();

  if (s === "co-lending") {
    return {
      tag: "CO-LENDING PLATFORM",
      name: "Co-Lending",
      titlePrefix: "India's Most Trusted",
      titleGradient: "Co-Lending Platform",
      titleSuffix: "for Banks & NBFCs",
      description:
        "End-to-end co-lending lifecycle management — from partner onboarding and loan origination to collections, settlement, and analytics. Built for RBI compliance. Deployed in weeks.",
      stats: [
        { value: "80:20 & 90:10", label: "CLM 1 & 2 SUPPORT" },
        { value: "T+0", label: "ESCROW SETTLEMENT" },
        { value: "100%", label: "RBI COMPLIANT" },
      ],
      capabilities: [
        "Automated Escrow Flow",
        "Dynamic Repayment Split",
        "Tripartite Reconciliation",
        "RBI 2025 Audit Trail",
      ],
      statusBadge: "RBI Directions 2025",
      icon: Handshake,
    };
  }

  if (s === "loan-origination-los" || s === "los" || s === "loan-origination-system") {
    return {
      tag: "LOAN ORIGINATION SYSTEM",
      name: "Loan Origination System",
      titlePrefix: "Accelerate customer onboarding with our",
      titleGradient: "Loan Origination System",
      titleSuffix: "",
      description:
        "Connect application journeys, document management, OCR, bureau and banking analysis, fraud checks, AI-driven scoring, and configurable business rules in a unified workflow.",
      stats: [
        { value: "< 3 mins", label: "DECISION TIME" },
        { value: "80+", label: "PRE-BUILT APIS" },
        { value: "45%", label: "LOWER OPEX" },
      ],
      capabilities: [
        "Multi-Bureau Connectors",
        "Configurable Rule Engine",
        "Digital Document Verification",
        "Instant Sanction Letter",
      ],
      statusBadge: "Enterprise Ready",
      icon: ClipboardCheck,
    };
  }

  if (
    s === "loan-management-lms" ||
    s === "lms" ||
    s === "loan-management-system" ||
    s.includes("lms")
  ) {
    return {
      tag: "LOAN MANAGEMENT SYSTEM",
      name: "Loan Management System",
      titlePrefix: "Streamline your loan lifecycle with our",
      titleGradient: "Loan Management System",
      titleSuffix: "",
      description:
        "Manage loan disbursement, repayment schedules, account servicing, payment processing, reconciliation, and collections through a configurable platform built for banks and NBFCs.",
      stats: [
        { value: "99.99%", label: "BILLING ACCURACY" },
        { value: "5M+", label: "LOANS SERVICED" },
        { value: "Zero", label: "LEDGER DRIFT" },
      ],
      capabilities: [
        "Multi-Product Engine",
        "Automated NACH & Mandates",
        "Dynamic Interest Schedules",
        "RBI Regulatory Reporting",
      ],
      statusBadge: "Real-Time Servicing",
      icon: CalendarClock,
    };
  }

  if (s === "bicri") {
    return {
      tag: "CREDIT RISK INTELLIGENCE",
      name: "BICRI",
      titlePrefix: "BICRI:",
      titleGradient: "AI-Powered Credit Intelligence",
      titleSuffix: "for Retailers and MSMEs",
      description:
        "Assess retailer creditworthiness and business potential beyond traditional credit indicators. BICRI brings together financial information, credit history, trade relationships and relevant business data to support more informed decisions.",
      stats: [
        { value: "95%+", label: "MODEL ACCURACY" },
        { value: "1,000+", label: "BEHAVIORAL SIGNALS" },
        { value: "35%", label: "LOWER FIRST-YEAR NPA" },
      ],
      capabilities: [
        "Alternate Data Signals",
        "Bank Statement Analyzer",
        "GST & Invoice Cross-Check",
        "Early Warning Alerts",
      ],
      statusBadge: "AI Intelligence",
      icon: Gauge,
    };
  }

  if (s === "bnpl-product-suite") {
    return {
      tag: "RETAIL CREDIT SUITE",
      name: "BNPL Product Suite",
      titlePrefix: "Fast, flexible",
      titleGradient: "BNPL Credit Experiences",
      titleSuffix: "at Scale",
      description:
        "Launch merchant-led or issuer-led BNPL products with sub-second credit decisioning. Seamlessly integrate across e-commerce, in-store, and partner ecosystems with full lifecycle management.",
      stats: [
        { value: "< 300ms", label: "DECISION LATENCY" },
        { value: "0% - 36%", label: "CUSTOM TENURES" },
        { value: "10x", label: "CONVERSION BOOST" },
      ],
      capabilities: [
        "POS & Checkout SDKs",
        "Instant Credit Line Setup",
        "Multi-Merchant Settlement",
        "Auto-Debit Collections",
      ],
      statusBadge: "Instant Credit Core",
      icon: ShoppingBag,
    };
  }

  if (s === "pool-buyout") {
    return {
      tag: "PORTFOLIO ACQUISITION",
      name: "Pool Buyout",
      titlePrefix: "Digitize Your Entire",
      titleGradient: "Loan Portfolio Acquisition",
      titleSuffix: "Lifecycle",
      description:
        "From due diligence and valuation to assignment, migration, and monitoring — iFLOW Pool Buyout Platform gives Banks, NBFCs, and HFCs enterprise-grade control over every transaction.",
      stats: [
        { value: "Automated", label: "TAPE INGESTION" },
        { value: "Dynamic", label: "PORTFOLIO VALUATION" },
        { value: "Seamless", label: "CBS MIGRATION" },
      ],
      capabilities: [
        "Automated Pool Sampling",
        "Risk & Yield Valuation",
        "Tape Scrubbing Engine",
        "Escrow & Account Split",
      ],
      statusBadge: "Bank & NBFC Certified",
      icon: Layers,
    };
  }

  if (s === "dsa" || s === "dsa-management-system") {
    return {
      tag: "DSA MANAGEMENT SYSTEM",
      name: "DSA Management",
      titlePrefix: "Empower your partner channel with",
      titleGradient: "DSACRM Platform",
      titleSuffix: "",
      description:
        "Built to bridge the gap between DSAs and lenders. Making lead sourcing, loan processing, and commission management seamless and 100% digital with scalable infrastructure.",
      stats: [
        { value: "50,000+", label: "ACTIVE AGENTS" },
        { value: "Real-Time", label: "COMMISSION SETTLEMENT" },
        { value: "Zero", label: "LEAD LEAKAGE" },
      ],
      capabilities: [
        "Mobile Lead Capture",
        "Automated De-dupe Checks",
        "Custom Commission Grids",
        "Direct Lender API Push",
      ],
      statusBadge: "Channel Partner CRM",
      icon: Users,
    };
  }

  if (s === "distribution") {
    return {
      tag: "LOAN DISTRIBUTION",
      name: "Distribution",
      titlePrefix: "Optimize channel partner networks with",
      titleGradient: "Smart Loan Distribution",
      titleSuffix: "",
      description:
        "Connect lenders with the right borrowers through a digital-first network built for banks, NBFCs, and fintech companies to accelerate loan disbursals.",
      stats: [
        { value: "360°", label: "NETWORK VISIBILITY" },
        { value: "Smart", label: "RULE-BASED ROUTING" },
        { value: "2.5x", label: "DISBURSAL GROWTH" },
      ],
      capabilities: [
        "Partner Sourcing Portals",
        "Product Catalog Engine",
        "Multi-Lender Submission",
        "Real-Time Commission MIS",
      ],
      statusBadge: "High-Volume Network",
      icon: Network,
    };
  }

  if (
    s === "collection" ||
    s === "collections" ||
    s === "debt-collection" ||
    s === "collection-management"
  ) {
    return {
      tag: "COLLECTIONS MANAGEMENT",
      name: "Collection",
      titlePrefix: "Intelligent",
      titleGradient: "Collections Management",
      titleSuffix: "Platform",
      description:
        "AI-powered collections suite with smart delinquency prioritization, omnichannel outreach, and automated workflows. Improve recovery rates by 40%+ while maintaining customer relationships.",
      stats: [
        { value: "40%+", label: "RECOVERY BOOST" },
        { value: "Omnichannel", label: "VOICE, SMS, WHATSAPP" },
        { value: "100%", label: "RBI CODE COMPLIANT" },
      ],
      capabilities: [
        "Propensity-to-Pay Models",
        "Automated Payment Links",
        "Field Agent Mobile CRM",
        "Settlement Approval Flows",
      ],
      statusBadge: "AI Delinquency Scoring",
      icon: PhoneCall,
    };
  }

  if (s === "on-boarding-journey") {
    return {
      tag: "API SERVICES & ONBOARDING",
      name: "API Services",
      titlePrefix: "Deliver frictionless onboarding with",
      titleGradient: "Powerful API Services",
      titleSuffix: "",
      description:
        "Deliver a smooth borrower experience with iFLOW's digital onboarding platform and lending API services. Integrate KYC, bureau checks, and loan flows in days.",
      stats: [
        { value: "< 45 sec", label: "KYC COMPLETION" },
        { value: "150+", label: "INTEGRATED APIS" },
        { value: "99.95%", label: "SERVICE UPTIME" },
      ],
      capabilities: [
        "Paperless Video KYC",
        "Bank Account Verification",
        "Real-Time Bureau Ingestion",
        "Instant OCR & Face Match",
      ],
      statusBadge: "Plug-and-Play APIs",
      icon: Braces,
    };
  }

  if (s === "ai-intelligent-suite" || s === "ai-ml-score-models") {
    return {
      tag: "AI INTELLIGENT SUITE",
      name: "AI Intelligent Suite",
      titlePrefix: "Next-gen lending powered by",
      titleGradient: "AI Intelligent Suite",
      titleSuffix: "",
      description:
        "Comprehensive credit decisioning and risk intelligence suite designed for modern lenders. Unify alternative data, predictive intelligence, and agile business rules for smarter, faster loan evaluations.",
      stats: [
        { value: "Dynamic", label: "RISK ASSESSMENT" },
        { value: "Real-Time", label: "CREDIT DECISIONING" },
        { value: "Automated", label: "POLICY WORKFLOWS" },
      ],
      capabilities: [
        "Alternative Data Ingestion",
        "Explainable AI (XAI)",
        "Automated Retraining",
        "Portfolio Risk Heatmaps",
      ],
      statusBadge: "AI Intelligent Core",
      icon: BrainCircuit,
    };
  }

  if (s === "msme-and-agri-tech-on-boarding-journeys") {
    return {
      tag: "MSME & AGRI ONBOARDING",
      name: "MSME & Agri Onboarding",
      titlePrefix: "Simplify borrower journeys for",
      titleGradient: "MSME & Agri Lending",
      titleSuffix: "",
      description:
        "Digital onboarding journeys designed to serve underserved segments faster, with minimal friction, vernacular interfaces, and full regulatory compliance.",
      stats: [
        { value: "100%", label: "PAPERLESS IN FIELD" },
        { value: "Vernacular", label: "MULTI-LANGUAGE FLOW" },
        { value: "70%", label: "FASTER SANCTION" },
      ],
      capabilities: [
        "Field Agent Offline Mode",
        "Mandi & GST Analytics",
        "Satellite Land Verification",
        "Voice-Guided Workflows",
      ],
      statusBadge: "Rural & Agri Ready",
      icon: Tractor,
    };
  }

  if (
    s === "ai-based-bre" ||
    s === "ai-bre" ||
    s === "bre" ||
    s === "business-rules-engine"
  ) {
    const customTitle = solution?.title || "AI Based BRE";
    return {
      tag: "BUSINESS RULES ENGINE",
      name: customTitle,
      titlePrefix: "Intelligent credit decisioning with our",
      titleGradient: customTitle,
      titleSuffix: "",
      description:
        solution?.meta_description ||
        "Execute dynamic credit policies, complex scorecards, and multi-bureau decisioning in milliseconds with iflow's AI-powered Business Rules Engine.",
      stats: [
        { value: "< 200ms", label: "EXECUTION LATENCY" },
        { value: "100%", label: "NO-CODE POLICY EDITING" },
        { value: "99.99%", label: "DECISION ACCURACY" },
      ],
      capabilities: [
        "Visual Rule Builder & Decision Trees",
        "Multi-Bureau Scoring & Matrix Execution",
        "Real-Time Champion/Challenger A/B Testing",
        "Full Audit Trail & Explainability",
      ],
      statusBadge: "Next-Gen Decisioning",
      icon: Cpu,
    };
  }

  // Generic fallback for any other slug
  const matchedNav = getSolutionBySlug(slug);
  return {
    tag: matchedNav?.tag || (solution?.title ? solution.title.toUpperCase() : "LENDING SOLUTION"),
    name: matchedNav?.name || solution?.title || "Lending Solution",
    titlePrefix: "Transform lending with our",
    titleGradient: solution?.title || matchedNav?.name || "Digital Lending Platform",
    titleSuffix: "",
    description:
      solution?.meta_description ||
      matchedNav?.blurb ||
      "Innovative financial technology solution designed to transform your lending operations and deliver exceptional customer experiences.",
    stats: [
      { value: "99.99%", label: "UPTIME SLA" },
      { value: "API-First", label: "MODULAR STACK" },
      { value: "Enterprise", label: "SECURITY GRADE" },
    ],
    capabilities: [
      "Cloud-Native Scalability",
      "Role-Based Access Control",
      "Full Regulatory Compliance",
      "Open Banking Connectors",
    ],
    statusBadge: "Production Ready",
    icon: matchedNav?.icon || Sparkles,
  };
}


interface EnterpriseDeploymentConfig {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText: string;
  secondaryBtnHref: string;
  metrics: string[];
}

function getEnterpriseDeploymentConfig(solution: Solution): EnterpriseDeploymentConfig {
  const slug = (solution.slug || "").toLowerCase();
  const name = (solution as any).name || solution.title || "Digital Lending";

  if (slug === "on-boarding-journey" || slug === "api-services") {
    return {
      titlePrefix: "Accelerate Your Digital Onboarding with ",
      titleHighlight: "iFLOW Cloud Platform",
      description:
        "Join leading banks, NBFCs, and fintech platforms cutting decision time to under 3 minutes while cutting operational costs by 45%. Schedule a live architecture walkthrough today.",
      primaryBtnText: "Schedule a Platform Demo",
      primaryBtnHref: "/book-a-demo",
      secondaryBtnText: "Explore All Solutions",
      secondaryBtnHref: "/solutions",
      metrics: [
        "Decision Time < 3 Mins",
        "80+ Pre-Built Fintech APIs",
        "100% RBI Digital Lending Compliant",
      ],
    };
  }

  if (slug.includes("collection")) {
    return {
      titlePrefix: "Accelerate Your Field & Digital Recoveries with ",
      titleHighlight: "iFLOW Collection Cloud",
      description:
        "Join leading lenders and recovery networks maximizing recovery rates, automating omnichannel communication, and tracking field agents in real-time.",
      primaryBtnText: "Schedule a Platform Demo",
      primaryBtnHref: "/book-a-demo",
      secondaryBtnText: "Explore All Solutions",
      secondaryBtnHref: "/solutions",
      metrics: [
        "Live Field Agent Tracking",
        "Omnichannel Automated Dunning",
        "100% RBI Fair Practice Compliant",
      ],
    };
  }

  if (slug.includes("bnpl")) {
    return {
      titlePrefix: "Accelerate Your Checkout Lending with ",
      titleHighlight: "iFLOW BNPL Suite",
      description:
        "Empower merchants and consumers with instant credit line issuance, flexible repayment schedules, and sub-second underwriting.",
      primaryBtnText: "Schedule a Platform Demo",
      primaryBtnHref: "/book-a-demo",
      secondaryBtnText: "Explore All Solutions",
      secondaryBtnHref: "/solutions",
      metrics: [
        "Sub-Second Underwriting",
        "Merchant SDK Integrations",
        "100% RBI Digital Lending Compliant",
      ],
    };
  }

  return {
    titlePrefix: "Accelerate Your Operations with ",
    titleHighlight: "iFLOW Cloud Platform",
    description:
      "Join leading banks, NBFCs, and fintech platforms cutting decision time to under 3 minutes while cutting operational costs by 45%. Schedule a live architecture walkthrough today.",
    primaryBtnText: "Schedule a Platform Demo",
    primaryBtnHref: "/book-a-demo",
    secondaryBtnText: "Explore All Solutions",
    secondaryBtnHref: "/solutions",
    metrics: [
      "Decision Time < 3 Mins",
      "80+ Pre-Built Fintech APIs",
      "100% RBI Digital Lending Compliant",
    ],
  };
}

export default function SolutionDetail({ solution }: { solution: Solution | null }) {

  // Debug: Log sections to see what we're receiving from Strapi


  if (!solution) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-white">
        {/* Icon */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75h4.5m-4.5 4.5h4.5m-9 6h13.5A2.25 2.25 0 0021 18V6A2.25 2.25 0 0018.75 3.75H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Solution Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, we couldn't find the solution you're looking for. It may have been
          removed or the link is incorrect.
        </p>

        {/* Back button */}
        <Link
          href="/solutions"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Back to Solutions
        </Link>
      </div>
    );
  }

  const buttonLink = "/book-a-demo";
  const heroConfig = getSolutionHeroConfig(solution.slug, solution);
  const HeroIcon = heroConfig.icon;

  // Filter other related solutions for bottom cards section
  const relatedSolutions = NAV_SOLUTIONS.filter(
    (item) => item.slug !== solution.slug && item.slug !== solution.slug.replace("dsa", "dsa-management-system")
  ).slice(0, 3);

  return (
    <div className="bg-[#f8f5fb] min-h-screen">
      {/* ── Redesigned Modern Hero Section with Ambient Background Design ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#fdfbfe] via-[#f7f2fb]/80 to-white border-b border-slate-100 min-h-[calc(100vh-80px)] min-h-[calc(100dvh-80px)] flex flex-col justify-center py-10 sm:py-12 lg:py-14">
        {/* Atmospheric purple & magenta glow lighting (matches Case Studies & Solutions) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-[500px] w-[500px] rounded-full bg-purple-200/50 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-1/4 h-[350px] w-[450px] rounded-full bg-[#9a3f91]/12 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-24 h-80 w-80 rounded-full bg-fuchsia-100/40 blur-[100px]"
        />

        {/* Fine decorative grid pattern overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 z-10 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Eyebrow, Heading, Description, CTA Buttons, Trust Points */}
            <div className="lg:col-span-7 relative z-20">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/70 text-[#7c3aed] text-xs font-mono font-bold tracking-wider uppercase mb-3.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#7c3aed]" />
                {heroConfig.tag}
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.14] mb-3.5">
                {heroConfig.titlePrefix ? `${heroConfig.titlePrefix} ` : ""}
                <span className="bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] bg-clip-text text-transparent">
                  {heroConfig.titleGradient}
                </span>
                {heroConfig.titleSuffix ? ` ${heroConfig.titleSuffix}` : ""}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-base text-slate-600 mb-5 leading-relaxed font-normal max-w-xl">
                {heroConfig.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#platform-capabilities"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-purple-50/50 hover:border-purple-200 hover:text-[#623f99] transition-all duration-300 shadow-xs"
                >
                  <span>Explore Platform</span>
                </a>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>RBI Directions 2025 Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
                  <span>4–8 Weeks Deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#623f99] flex-shrink-0" />
                  <span>ISO 27001 & SOC-2</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Playing Card Flourish & Accumulated Spotlight Card */}
            <div className="lg:col-span-5 relative z-10 flex items-center justify-center">
              <PlayingCardDeck
                solutionSlug={solution.slug}
                initialTag={heroConfig.tag}
                initialName={heroConfig.name}
                initialStatusBadge={heroConfig.statusBadge}
                initialStats={heroConfig.stats}
                initialCapabilities={heroConfig.capabilities}
              />
            </div>
          </div>
        </div>
      </div>

      {solution.slug !== "bicri" && solution.full_content && solution.full_content.trim() && (
        <article className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-12 bg-transparent">
          {/* Solution Content */}
          <div className="prose prose-lg md:prose-xl max-w-none mb-12 text-gray-700 leading-relaxed font-sans prose-headings:text-[#0a1f44] prose-headings:font-bold prose-a:text-[#a259e6] hover:prose-a:text-[#8b45c9] prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-8 mt-10 text-[#0a1f44]" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-14 text-[#0a1f44]" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-[#0a1f44]" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-[#2a3f64]" {...props} />
                ),
                h5: ({ node, ...props }) => (
                  <h5 className="text-lg md:text-xl font-medium mb-2 mt-5 text-[#3a4f74]" {...props} />
                ),
                h6: ({ node, ...props }) => (
                  <h6 className="text-base font-semibold mb-2 mt-4 uppercase tracking-wider text-gray-500" {...props} />
                ),
                p: ({ node, ...props }) => <p className="mb-6 text-lg text-gray-600 leading-8" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul className="list-none space-y-3 mb-8 ml-0 pl-0" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal marker:text-[#a259e6] marker:font-bold space-y-3 mb-8 pl-6 text-lg text-gray-600" {...props} />
                ),
                li: ({ node, className, children, ...props }) => {
                  // Check if this is an unordered list item to add custom checkmark or bullet
                  const isOrdered = (node as any)?.parent?.tagName === 'ol';
                  return (
                    <li className={`flex ${!isOrdered ? 'items-start space-x-3' : ''} text-gray-600 text-lg`} {...props}>
                      {!isOrdered && (
                        <span className="flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 text-[#a259e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      )}
                      <span>{children}</span>
                    </li>
                  );
                },
                a: ({ node, ...props }) => (
                  <a className="text-[#a259e6] hover:text-[#8b45c9] underline decoration-2 underline-offset-4 transition-colors font-medium" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-[#a259e6] bg-purple-50 rounded-r-lg p-6 my-8 italic text-gray-700 text-xl shadow-sm" {...props} />
                ),
                code: ({ node, inline, ...props }: any) => 
                  inline ? (
                    <code className="bg-gray-100 text-[#a259e6] px-2 py-1 rounded text-sm font-mono" {...props} />
                  ) : (
                    <div className="bg-gray-900 rounded-xl overflow-hidden my-8 shadow-lg">
                      <div className="flex items-center px-4 py-2 bg-gray-800">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      <pre className="p-4 text-sm text-gray-300 font-mono overflow-x-auto">
                        <code {...props} />
                      </pre>
                    </div>
                  ),
                img: ({ node, ...props }) => (
                  <img
                    className="w-full max-w-4xl mx-auto h-auto object-contain rounded-2xl shadow-xl border border-gray-100 my-10 animate-float-3d hover:scale-[1.02] transition-transform duration-500"
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="my-12 border-t-2 border-gray-100 w-24 mx-auto rounded-full" {...props} />
                ),
              }}
            >
              {solution.full_content}
            </ReactMarkdown>
          </div>
        </article>
      )}

      {/* Bespoke robust layouts for Co-Lending, AI Intelligent Suite, Pool Buyout, BICRI, and Loan Origination LOS */}
      {solution.slug === "co-lending" ? (
        <CoLendingView solution={solution} />
      ) : solution.slug === "ai-intelligent-suite" || solution.slug === "ai-ml-score-models" ? (
        <AiMlScoreModelsView solution={solution} />
      ) : solution.slug === "pool-buyout" ? (
        <PoolBuyoutView solution={solution} />
      ) : solution.slug === "bicri" ? (
        <BicriView solution={solution} />
      ) : solution.slug === "loan-origination-los" ? (
        <LoanOriginationLosView solution={solution} />
      ) : solution.slug === "loan-management-lms" || solution.slug === "lms" ? (
        <LoanManagementLmsView solution={solution} />
      ) : solution.slug === "distribution" ? (
        <DistributionView solution={solution} />
      ) : solution.slug === "dsa" || solution.slug === "dsa-management-system" ? (
        <DsaView solution={solution} />
      ) : (
        <>
          {(solution.slug === "ai-based-bre" || solution.slug === "bre" || solution.slug === "business-rules-engine") && (
            <>
              <div id="dual-decisioning-modes" className="section">
                <BreDualModesSection />
              </div>
              <div id="rule-configuration-studio" className="section">
                <BreRuleStudioSection />
              </div>
            </>
          )}

          {solution.sections && solution.sections.length > 0 && (
            <div id="platform-capabilities" className="space-y-0">
              {solution.sections
                .filter((section) => {
                  const loc = section.display_location || solution.display_location || "both";
                  if (loc === "only_main") return false;
                  if (solution.slug === 'pool-buyout') {
                    const isCustomerSuccess =
                      section.__component === 'solution.customer-success' ||
                      String(section.title || "").toLowerCase().includes('customer success') ||
                      String(section.badge || "").toLowerCase().includes('customer success');
                    return !isCustomerSuccess;
                  }
                  if (solution.slug === 'bicri') {
                    const isKeyFeatures =
                      String(section.title || "").toLowerCase().includes('key features') ||
                      String(section.badge || "").toLowerCase().includes('key features');
                    return !isKeyFeatures;
                  }
                  if (solution.slug === 'ai-intelligent-suite' || solution.slug === 'ai-ml-score-models') {
                    const isAiBasedBre = String(section.title || "").toLowerCase().includes("ai based bre");
                    return !isAiBasedBre;
                  }
                  if (solution.slug === 'loan-origination-los') {
                    const isBuildOnboardingPaths =
                      String(section.title || "").toLowerCase().includes('build onboarding paths');
                    return !isBuildOnboardingPaths;
                  }
                  return true;
                })
                .map((section, index) => {
                  const isOnboardingJourney =
                    solution.slug === "on-boarding-journey" || solution.slug === "api-services";
                  const hasSecuritySectionInStrapi = (solution.sections || []).some(
                    (s: any) =>
                      s.__component === "solution.security-governance" ||
                      String(s.title || "").toLowerCase().includes("security and control") ||
                      String(s.badge || "").toLowerCase().includes("security & governance")
                  );
                  const firstCollectionIndex = (solution.sections || []).findIndex(
                    (s: any) => s.__component === "solution.collection-cards"
                  );
                  const shouldInsertSecurityBeforeThis =
                    isOnboardingJourney &&
                    !hasSecuritySectionInStrapi &&
                    ((firstCollectionIndex !== -1 && index === firstCollectionIndex) ||
                     (firstCollectionIndex === -1 && index === (solution.sections || []).length - 1));
                  const isCompleteLosModules =
                    solution.slug === "loan-origination-los" &&
                    (String(section.badge || "").toUpperCase().includes("COMPLETE LOS MODULES") ||
                     String(section.title || "").toLowerCase().includes("everything your origination team needs"));

                  const isLmsBuiltToShape =
                    (solution.slug === "loan-management-lms" || solution.slug === "lms") &&
                    (String(section.title || "").toLowerCase().includes("built to shape") ||
                     String(section.badge || "").toLowerCase().includes("built to shape"));

                  return (
                    <React.Fragment key={`section-${section.id || 'new'}-${index}`}>
                      {isLmsBuiltToShape && (
                        <div id="disbursement-management" className="section">
                          <LmsDisbursementSection />
                        </div>
                      )}
                      {shouldInsertSecurityBeforeThis && (
                        <div id="security-governance" className="section">
                          <ApiSecurityGovernanceSection />
                        </div>
                      )}
                      <div className="section">
                        <SectionRenderer section={section} solution={solution} index={index} solutionSlug={solution.slug} />
                      </div>
                      {isCompleteLosModules && (
                        <div id="digital-application-journey" className="section">
                          <DigitalApplicationJourney />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
          )}

          {/* Pool Buyout Comparison Section */}
          {solution.slug === 'pool-buyout' && (
            <PoolBuyoutComparison />
          )}

          {/* Field Command Centre Section for Collection */}
          {solution.slug === "collection" && (
            <div id="field-command-centre" className="section">
              <FieldCommandCentreSection />
            </div>
          )}

          {/* Feature Cards Section (Compliance & Accountable Operations) */}
          {solution.feature_cards && solution.feature_cards.length > 0 && (
            <section className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden">
              {/* Background ambient lighting */}
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-100/35 rounded-full blur-[120px] pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute top-1/3 right-0 w-80 h-80 bg-fuchsia-100/25 rounded-full blur-[110px] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative max-w-7xl mx-auto z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                  {/* Left Column: Eyebrow, Heading, Description & Trust Metric Tag */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
                        COMPLIANCE &amp; GOVERNANCE
                      </span>
                    </div>

                    {solution.feature_cards_heading && (
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                        {solution.feature_cards_heading}
                      </h2>
                    )}

                    {solution.feature_cards_description && (
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl mb-7">
                        {solution.feature_cards_description}
                      </p>
                    )}

                    {/* Trust Metric Badge */}
                    <div className="pt-2 flex items-center gap-4">
                      <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                            Audit Trail Standard
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            100% RBI Fair Practice &amp; DPDP Compliant
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 2-Column Feature Cards Grid */}
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {solution.feature_cards.map((card, cIdx) => {
                        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "http://localhost:1337";
                        const iconUrl = card.icon?.url
                          ? (card.icon.url.startsWith("http") ? card.icon.url : `${baseUrl}${card.icon.url}`)
                          : null;

                        return (
                          <div
                            key={card.id || cIdx}
                            className="group relative rounded-2xl p-5 sm:p-6 bg-white border border-purple-100/90 shadow-[0_4px_20px_rgba(27,16,50,0.04)] hover:shadow-lg hover:border-purple-300 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5"
                          >
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7c3aed] flex items-center justify-center flex-shrink-0 group-hover:bg-[#623f99] group-hover:text-white transition-colors duration-300">
                              {iconUrl ? (
                                <div className="relative w-5 h-5">
                                  <Image
                                    src={iconUrl}
                                    alt={card.icon?.alt || card.title}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              ) : (
                                <ShieldCheck className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {card.title && (
                                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                                  {card.title}
                                </h3>
                              )}
                              {card.description && (
                                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                                  {card.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section (Standalone) */}
          {solution.faq_section && (
            <GenericSection
              data={solution.faq_section}
              layoutType="faq"
            />
          )}

          {/* ── ENTERPRISE DEPLOYMENT CTA BANNER (Matching LOS / Co-Lending standard) ── */}
          {(() => {
            const cta = getEnterpriseDeploymentConfig(solution);
            return (
              <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden">
                {/* Ambient Glows matching website theme */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7c3aed]/25 blur-[130px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 top-10 w-96 h-96 rounded-full bg-[#e51ede]/20 blur-[140px]"
                />

                <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase border border-white/15 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                    ENTERPRISE DEPLOYMENT
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
                    {cta.titlePrefix}
                    <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
                      {cta.titleHighlight}
                    </span>
                  </h2>

                  <p className="text-purple-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
                    {cta.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href={cta.primaryBtnHref}
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#9a3f91] to-[#e51ede] text-white font-bold text-sm sm:text-base shadow-xl shadow-fuchsia-950/40 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
                    >
                      <span>{cta.primaryBtnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={cta.secondaryBtnHref}
                      className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-300"
                    >
                      <span>{cta.secondaryBtnText}</span>
                    </Link>
                  </div>

                  {/* Quick Metrics / Compliance Trust Badges */}
                  <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-purple-200/90 font-medium">
                    {cta.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}
        </>
      )}

      {/* ── Related / Other Solutions Section (Explore All Solution Cards) ── */}
      <section className="relative py-20 px-6 md:px-10 lg:px-14 bg-gradient-to-b from-[#f8f5fb] via-white to-[#f8f5fb] border-t border-purple-100/60 overflow-hidden">
        {/* Ambient decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-purple-200/40 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-fuchsia-100/40 blur-[90px]"
        />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#7c3aed] uppercase block mb-3">
                CONNECTED ECOSYSTEM
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                Explore More{" "}
                <span className="bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] bg-clip-text text-transparent">
                  iFLOW Solutions
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                Twelve enterprise-grade lending modules running on one connected platform — built to streamline your entire credit lifecycle.
              </p>
            </div>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-200 bg-white text-xs sm:text-sm font-semibold text-[#623f99] hover:bg-purple-50 transition-colors shadow-xs self-start md:self-auto"
            >
              <span>View All 12 Modules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedSolutions.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/solutions/${item.slug}`}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-950/10"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 shadow-sm">
                        <ItemIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-50 group-hover:text-[#623f99] transition-colors">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a3f91] block mb-1.5">
                      {item.tag}
                    </span>

                    <h3 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {item.blurb}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
