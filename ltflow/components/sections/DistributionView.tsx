"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionRenderer from "@/components/SectionRenderer";
import {
  Network,
  Share2,
  Building2,
  Users,
  LineChart,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  BrainCircuit,
  Coins,
  CreditCard,
  RefreshCw,
  BarChart3,
  Activity,
  Workflow,
  FileCheck,
  ChevronDown,
  FileText,
  Lock,
  Wallet,
  Landmark,
  Smartphone,
  Scale,
  Check,
  Minus,
  HelpCircle,
  Briefcase,
  Sliders,
  Database,
  LucideIcon,
} from "lucide-react";

interface DistributionViewProps {
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

function parseBulletPoints(text: string | null | undefined): string[] {
  if (!text) return [];
  return sanitize(text)
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").replace(/^#+\s*/, "").trim())
    .filter((line) => Boolean(line) && line.length > 2);
}

export default function DistributionView({ solution }: DistributionViewProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const sections: any[] = solution?.sections || [];

  // ────────────────────────────────────────────────────────────────────────────
  // Section Finders from Strapi
  // ────────────────────────────────────────────────────────────────────────────
  // Section 0: Partnership Models Section ("OUR OFFERINGS THROUGH OUR STRATEGIC PARTNERS")
  const secOfferings =
    sections.find(
      (s) =>
        s.__component === "solution.partnership-models-section" ||
        String(s.title || "").toLowerCase().includes("our offerings") ||
        (Array.isArray(s.models) && s.models.length > 0)
    ) || {};

  // Section 1: BNPL / Workflow Section ("End-to-End Partner Lifecycle Journey")
  const secWorkflow =
    sections.find(
      (s) =>
        s &&
        (s.__component === "solution.bnpl-workflow-section" ||
          s.__component === "solution.workflow-section" ||
          String(s.title || "").toLowerCase().includes("partner lifecycle"))
    ) ||
    sections.find(
      (s) =>
        s &&
        (s.id === 11 ||
          (Array.isArray(s.left_features) && s.left_features.length > 0) ||
          (Array.isArray(s.right_features) && s.right_features.length > 0))
    ) || {};

  // Section 2: Lifecycle Feature Sections (IDs 783-788 or feature-sections with distribution lifecycle badge / features)
  const lifecycleSections = sections.filter(
    (s: any) =>
      s &&
      s.__component === "solution.feature-section" &&
      (String(s.badge || "").toLowerCase().includes("distribution lifecycle") ||
        (typeof s.id === "number" && s.id >= 783 && s.id <= 788) ||
        (s.image && s.features && String(s.features).includes("**")))
  );

  // Track all handled section IDs so remaining dynamic sections appear in additionalSections
  const handledIds = new Set([
    secOfferings?.id,
    secWorkflow?.id,
    ...lifecycleSections.map((s: any) => s.id),
    ...sections
      .filter(
        (s: any) =>
          s &&
          (s.__component === "solution.bnpl-workflow-section" ||
            s.__component === "solution.partnership-models-section" ||
            s.__component === "solution.feature-section")
      )
      .map((s: any) => s.id),
  ].filter(Boolean));
  const additionalSections = sections.filter(
    (s: any) => s && (!s.id || !handledIds.has(s.id))
  );

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Hero Overview Section Data
  // ────────────────────────────────────────────────────────────────────────────
  const heroBadge = "SMART LOAN DISTRIBUTION PLATFORM";
  const heroTitle =
    sanitize(solution?.title) || "Accelerate Loan Reach Through an Intelligent Distribution Network";
  const heroSubtitle =
    sanitize(solution?.description) ||
    "Connect lenders with the right borrowers through a digital-first network built for banks, NBFCs, and fintech companies to accelerate loan disbursals with automated rule-based routing.";
  const heroBannerImg = toUrl(solution?.banner?.url || "/uploads/distrbution_9a85df6e30.png");

  const heroHighlights = [
    "Omnichannel partner lead capture via digital portals, APIs, and mobile apps",
    "Intelligent Business Rule Engine (BRE) routing leads to optimal lending partners",
    "Unified multi-product catalog spanning secured, unsecured, & investment products",
    "Automated commission calculation, transparent GST invoicing, & escrow payouts",
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 2. Offerings & Product Architecture Data (From Strapi Section 0)
  // ────────────────────────────────────────────────────────────────────────────
  const offeringsTitle =
    sanitize(secOfferings.title) || "OUR OFFERINGS THROUGH OUR STRATEGIC PARTNERS";
  const offeringsSubtitle =
    sanitize(secOfferings.description) ||
    "Explore our wide range of offerings, meticulously designed to fulfill the distinct requirements of your customer network.";

  const rawModels = Array.isArray(secOfferings.models) && secOfferings.models.length > 0
    ? secOfferings.models
    : [
        {
          name: "Secured Loans",
          features:
            "- Home Loan\n- Loan Against Property\n- Loan against Security\n- CGTMSE\n- Overdraft/OD\n- Working Capital\n- Vehicle Finance/Refinance\n- Construction Finance",
        },
        {
          name: "Unsecured Loans",
          features:
            "- Personal Loans\n- Business Loans\n- Education Loans\n- CGTMSE\n- Overdraft/DOD\n- Invoice Financing",
        },
        {
          name: "Investments",
          features:
            "- Mutual Funds\n- Bonds and Debentures\n- Fixed Deposits\n- Portfolio Management Services (PMS)",
        },
      ];

  const modelCategoryMeta: Record<
    string,
    { badge: string; icon: LucideIcon; metric: string; metricLabel: string; gradient: string }
  > = {
    secured: {
      badge: "COLLATERAL-BACKED LENDING",
      icon: Building2,
      metric: "Up to ₹50 Cr",
      metricLabel: "Ticket Size",
      gradient: "from-blue-600/10 via-purple-600/5 to-transparent",
    },
    unsecured: {
      badge: "CASH-FLOW & WORKING CAPITAL",
      icon: Wallet,
      metric: "< 24 Hrs",
      metricLabel: "Sanction TAT",
      gradient: "from-purple-600/10 via-pink-600/5 to-transparent",
    },
    investments: {
      badge: "WEALTH & CAPITAL SOLUTIONS",
      icon: LineChart,
      metric: "Institutional",
      metricLabel: "Asset Grade",
      gradient: "from-emerald-600/10 via-teal-600/5 to-transparent",
    },
  };

  const offeringsCards = rawModels.map((m: any, idx: number) => {
    const rawName = sanitize(m.name || m.title || `Offering ${idx + 1}`);
    const nameLower = rawName.toLowerCase();
    const key = nameLower.includes("unsecured")
      ? "unsecured"
      : nameLower.includes("invest")
      ? "investments"
      : "secured";
    const meta = modelCategoryMeta[key];
    const items = parseBulletPoints(m.features);

    return {
      id: m.id || idx,
      name: rawName,
      badge: meta.badge,
      icon: meta.icon,
      metric: meta.metric,
      metricLabel: meta.metricLabel,
      gradient: meta.gradient,
      items: items.length > 0 ? items : ["Comprehensive lender network", "Competitive partner payout rates"],
    };
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 3. End-to-End Partner Lifecycle Journey Data (From Strapi Section 1)
  // ────────────────────────────────────────────────────────────────────────────
  const workflowBadge =
    sanitize(lifecycleSections[0]?.badge) ||
    sanitize(secWorkflow.badge) ||
    "THE DISTRIBUTION LIFECYCLE";
  const workflowTitle =
    sanitize(secWorkflow.title) || "End-to-End Partner Lifecycle Journey";
  const workflowSubtitle =
    sanitize(lifecycleSections[0]?.description) ||
    sanitize(secWorkflow.description) ||
    "A unified distribution architecture connecting lead-gen partners, origination engines, automated BRE decisioning, and institutional capital partners in real time.";
  const workflowImg = toUrl(
    secWorkflow.image?.url ||
      "/uploads/67a4873fe9bbf8694ebc694d_user_interface_1_p_500_4ab86ea618.png"
  );

  const rawLeft = Array.isArray(secWorkflow.left_features) ? secWorkflow.left_features : [];
  const rawRight = Array.isArray(secWorkflow.right_features) ? secWorkflow.right_features : [];

  const defaultJourneySteps = [
    {
      idx: "01",
      badge: "LEAD GENERATION & SOURCING",
      title: "Apply Now, Flow & Lead-Gen Partners",
      subtitle: "Omnichannel lead capture across digital media, partner portals, and ecosystem integrations.",
      desc: "Connect direct selling agents, digital aggregators, and referral partners via white-label portals and open lending APIs.",
      icon: Smartphone,
      metric: "Omnichannel",
      metricLabel: "Capture",
      points: [
        "Dynamic digital application forms with instant mobile OTP verification",
        "Configurable partner attribution tagging and referral link generation",
        "Drop-off capture with automated re-engagement notifications",
      ],
    },
    {
      idx: "02",
      badge: "DECISIONING & INTELLIGENT MATCHING",
      title: "Rule Engine & Policy Segmentation",
      subtitle: "Every lead is assessed with an in-house BRE and AI models which assign the lead to the right lender.",
      desc: "Evaluate applicant credit profiles, eligibility filters, and risk thresholds to match borrowers with approving lenders.",
      icon: BrainCircuit,
      metric: "< 95ms",
      metricLabel: "Decision Latency",
      points: [
        "Multi-bureau credit score assessment across CIBIL, Experian, & CRIF",
        "Algorithmic match-making against live lender underwriting appetites",
        "Instant rejection filtering preventing unnecessary bureau enquiries",
      ],
    },
    {
      idx: "03",
      badge: "CAPITAL & ORIGINATION LAYER",
      title: "Originating BC & Capital Partners",
      subtitle: "Every lead with verified credit segmentation is assessed by originator and co-lending capital simultaneously.",
      desc: "Facilitate tripartite co-lending alignments, BC originator handoffs, and institutional balance sheet allocation.",
      icon: Landmark,
      metric: "Multi-Lender",
      metricLabel: "Syndication",
      points: [
        "Simultaneous co-lending eligibility screening (80:20 & 90:10 ratios)",
        "Automated loan file compilation with digital KYC verification",
        "Direct API handoff into partner core banking and origination systems",
      ],
    },
    {
      idx: "04",
      badge: "LENDER NETWORK ALLOCATION",
      title: "Lending Partners Ecosystem",
      subtitle: "Leads are assessed with partner underwriting capabilities across diverse risk and product segments.",
      desc: "Empower 50+ banks, NBFCs, and digital credit funds to review pre-qualified files tailored to their risk criteria.",
      icon: Network,
      metric: "50+ Lenders",
      metricLabel: "Ecosystem",
      points: [
        "Dynamic ticket size routing from micro-loans up to ₹50 Cr corporate debt",
        "Real-time lender underwriting webhooks with instantaneous in-principle sanction",
        "Dedicated institutional credit review workbenches with document OCR",
      ],
    },
    {
      idx: "05",
      badge: "UNIFIED SERVICING INTERFACE",
      title: "One Platform Multi-Product Hub",
      subtitle: "Empower your distribution network to originate and manage multiple loan products from a single window.",
      desc: "Consolidate personal, MSME, secured, vehicle, and investment products into an all-in-one partner command center.",
      icon: Layers,
      metric: "100% Unified",
      metricLabel: "Interface",
      points: [
        "Single-sign-on (SSO) partner dashboard with role-based branch hierarchies",
        "Comprehensive product catalog with live interest rate and term calculators",
        "White-label customer portals for partner brand differentiation",
      ],
    },
    {
      idx: "06",
      badge: "REAL-TIME TRACKING & GOVERNANCE",
      title: "Know Your Application & Status MIS",
      subtitle: "Every action, query, document approval, and payout milestone is updated for complete transparency.",
      desc: "Provide end-to-end visibility for partners, loan applicants, and internal operations teams with live status webhooks.",
      icon: Activity,
      metric: "Real-Time",
      metricLabel: "Visibility",
      points: [
        "Real-time milestone push notifications via SMS, WhatsApp, and email",
        "Automated commission ledger calculation with slab-based incentives",
        "Granular audit logs compliant with RBI 2025 Digital Lending guidelines",
      ],
    },
  ];

  // Map Strapi features into the 6 journey steps with dynamic content & respective Strapi images
  const journeySteps = defaultJourneySteps.map((step, idx) => {
    const strapiSec = lifecycleSections[idx];
    if (strapiSec) {
      let title = "";
      let subtitle = "";
      if (strapiSec.features) {
        const rawF = String(strapiSec.features);
        const boldMatch = rawF.match(/\*\*([^*]+)\*\*/);
        if (boldMatch) {
          title = boldMatch[1].trim();
          subtitle = rawF.replace(boldMatch[0], "").trim();
        } else {
          subtitle = rawF.trim();
        }
      }
      const rawImgUrl = strapiSec.image?.url || strapiSec.image?.data?.attributes?.url;
      const stepImg = rawImgUrl ? toUrl(rawImgUrl) : null;

      return {
        ...step,
        title: sanitize(title) || sanitize(strapiSec.title) || step.title,
        subtitle: sanitize(subtitle) || sanitize(strapiSec.description) || step.subtitle,
        image: stepImg || workflowImg,
      };
    }

    let strapiItem = null;
    if (idx < 3 && rawLeft[idx]) {
      strapiItem = rawLeft[idx];
    } else if (idx >= 3 && rawRight[idx - 3]) {
      strapiItem = rawRight[idx - 3];
    }

    if (strapiItem) {
      return {
        ...step,
        title: sanitize(strapiItem.title) || step.title,
        subtitle: sanitize(strapiItem.description) || step.subtitle,
        image: workflowImg,
      };
    }
    return {
      ...step,
      image: workflowImg,
    };
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 4. Strategic Business Value Data (3 Pillars matching Co-Lending Layout)
  // ────────────────────────────────────────────────────────────────────────────
  const strategicBenefits = [
    {
      tag: "CONVERSION EFFICIENCY",
      title: "Smart Rule-Based Lead Allocation",
      desc: "Eliminate lost leads and manual back-and-forth. Our in-house Business Rule Engine automatically pairs borrower credit profiles with the exact bank or NBFC highest probability to sanction.",
      metric: "3.2x Higher",
      metricLabel: "Conversion Rate",
      footerHighlight: "Instant Soft Sanctions",
      icon: Zap,
    },
    {
      tag: "OPERATIONAL TRANSPARENCY",
      title: "Automated Partner MIS & Payouts",
      desc: "Replace spreadsheet disputes with automated commission tracking. Calculate multi-tier partner commission slabs, generate GST-compliant invoices, and settle payouts through bank escrow rails.",
      metric: "Zero Drift",
      metricLabel: "Payout Disputes",
      footerHighlight: "T+0 Settlement Rails",
      icon: RefreshCw,
    },
    {
      tag: "ENTERPRISE COMPLIANCE",
      title: "100% RBI Digital Lending Compliant",
      desc: "Built to adhere strictly to RBI Master Directions on digital lending. Features explicit borrower consent, encrypted document handling, institutional escrow fund flows, and unalterable audit trails.",
      metric: "100%",
      metricLabel: "Regulatory Alignment",
      footerHighlight: "RBI 2025 Audit Ready",
      icon: ShieldCheck,
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 5. Complete Distribution Capabilities Data (12 Modules across 4 Tabs)
  // ────────────────────────────────────────────────────────────────────────────
  const distributionModules = [
    {
      title: "Omnichannel Partner Portals",
      description:
        "Branded web and mobile application portals for direct selling agents, corporate distributors, and field executives with biometric authentication.",
      category: "Partner Management",
      icon: Smartphone,
    },
    {
      title: "Multi-Tier Sub-Agent Hierarchy",
      description:
        "Manage master distributors, regional branches, franchise networks, and individual agents with granular access controls and performance scorecards.",
      category: "Partner Management",
      icon: Users,
    },
    {
      title: "Instant Digital Partner Onboarding",
      description:
        "Paperless partner registration with automated Aadhaar, PAN, GST verification, bank penny-drop validation, and digital agreement e-sign.",
      category: "Partner Management",
      icon: FileCheck,
    },
    {
      title: "Configurable Rule Engine (BRE)",
      description:
        "Visual policy matrix matching applicants based on credit score, FOIR, PIN code serviceability, business turnover, and vintage filters.",
      category: "Underwriting & BRE",
      icon: BrainCircuit,
    },
    {
      title: "Parallel Credit Bureau Ingestion",
      description:
        "Simultaneous API inquiry across CIBIL, Experian, Equifax, and CRIF High Mark with consolidated summary metrics and duplicate lead detection.",
      category: "Underwriting & BRE",
      icon: Activity,
    },
    {
      title: "Document OCR & AI Validation",
      description:
        "Automated extraction and authenticity verification for bank statements, GST returns, ITR filings, salary slips, and business KYC docs.",
      category: "Underwriting & BRE",
      icon: Cpu,
    },
    {
      title: "Comprehensive Multi-Product Catalog",
      description:
        "Standardized digital product masters covering home loans, business lines, personal credit, education loans, and mutual fund investments.",
      category: "Product & Catalog",
      icon: Layers,
    },
    {
      title: "Dynamic Loan Rate & EMI Calculators",
      description:
        "Interactive comparison simulators allowing partners to compare tenure, interest rates, processing fees, and net payouts across all lenders.",
      category: "Product & Catalog",
      icon: Coins,
    },
    {
      title: "Lender Appetite Matrix",
      description:
        "Real-time synchronization with bank credit limits, target product segments, and branch capacities to optimize loan allocation efficiency.",
      category: "Product & Catalog",
      icon: Landmark,
    },
    {
      title: "Automated Commission Calculation",
      description:
        "Configurable payout models supporting flat percentages, slab-based incentives, milestone volume bonuses, and automated TDS deductions.",
      category: "Settlements & MIS",
      icon: CreditCard,
    },
    {
      title: "Escrow Banking & T+0 Settlement",
      description:
        "Direct integration with nodal bank accounts and payment gateways for instant, audited partner commission transfers upon loan disbursement.",
      category: "Settlements & MIS",
      icon: Wallet,
    },
    {
      title: "Real-Time Application Status Webhooks",
      description:
        "Bi-directional webhooks and event streaming keeping partners, borrowers, and lender ops teams aligned at every loan lifecycle milestone.",
      category: "Settlements & MIS",
      icon: BarChart3,
    },
  ];

  const categories = [
    "all",
    "Partner Management",
    "Underwriting & BRE",
    "Product & Catalog",
    "Settlements & MIS",
  ];

  const filteredModules =
    activeTab === "all"
      ? distributionModules
      : distributionModules.filter((m) => m.category === activeTab);

  // ────────────────────────────────────────────────────────────────────────────
  // 6. Distribution Workflow Pipeline Data (5 Stages)
  // ────────────────────────────────────────────────────────────────────────────
  const pipelineStages = [
    {
      step: 1,
      title: "Lead Ingestion",
      badge: "Sourcing",
      desc: "Omnichannel capture through digital portals, mobile app SDKs, and partner APIs with instant OTP authentication and dedupe checks.",
      features: ["Partner attribution", "Aadhaar e-KYC", "Negative list scan"],
    },
    {
      step: 2,
      title: "Intelligent BRE Routing",
      badge: "Assessment",
      desc: "Rule engine runs multi-bureau lookups and matches applicant risk profiles against live lender underwriting policies.",
      features: ["Multi-bureau API", "Policy matching", "< 95ms decision"],
    },
    {
      step: 3,
      title: "Lender Syndication",
      badge: "Submission",
      desc: "Pre-qualified application file is simultaneously submitted to optimal banks, NBFCs, or co-lending capital partners.",
      features: ["Direct API handoff", "Co-lending 80:20", "Document packaging"],
    },
    {
      step: 4,
      title: "Digital Sanction",
      badge: "Approval",
      desc: "Lenders issue formal sanction letter, verified with digital borrower agreement signing and bank account mandate setup.",
      features: ["e-Sign agreement", "e-NACH setup", "Instant KFS issue"],
    },
    {
      step: 5,
      title: "Disbursal & Payout",
      badge: "Settlement",
      desc: "Fund transfer executed via RTGS/NEFT/IMPS while partner commissions are automatically credited to their registered bank accounts.",
      features: ["T+0 Escrow disbursal", "Automated GST invoice", "Real-time MIS"],
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 7. Distribution Technology Benchmark Matrix
  // ────────────────────────────────────────────────────────────────────────────
  const comparisonData = [
    {
      feature: "Lead Decisioning & Allocation TAT",
      modern: "Real-Time (< 3 Mins via AI & BRE)",
      legacy: "2 – 5 Days (Manual File Handover)",
      advantage: "Eliminates dropped leads and accelerates conversion across network",
    },
    {
      feature: "Product Catalog Breadth",
      modern: "Secured, Unsecured, & Investment Products",
      legacy: "Single product or siloed agreements",
      advantage: "One window for retail personal, MSME, mortgages, and wealth assets",
    },
    {
      feature: "Application Status Transparency",
      modern: "100% Real-Time Webhooks & Portal MIS",
      legacy: "Opaque manual phone & email follow-ups",
      advantage: "Full visibility of verification, credit sanction, and disbursal progress",
    },
    {
      feature: "Partner Commission Reconciliation",
      modern: "Automated Slab Engine & T+0 Escrow Settlement",
      legacy: "Manual spreadsheet reconciliation (30–60 Days)",
      advantage: "Zero payout disputes with automated GST invoices and instant transfers",
    },
    {
      feature: "Sub-Agent & DSA Hierarchy Control",
      modern: "Granular Role-Based Portal Access",
      legacy: "Unmanaged offline broker chains",
      advantage: "Complete governance over branch managers, sub-agents, and DSA teams",
    },
    {
      feature: "Regulatory & Data Security Standard",
      modern: "100% RBI 2025 Digital Lending Compliance",
      legacy: "Vulnerable unencrypted document sharing",
      advantage: "Enterprise data masking, consent management, and tamper-proof audit trails",
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 8. FAQ Data (Direct from Strapi CMS)
  // ────────────────────────────────────────────────────────────────────────────
  const faqTitle = sanitize(solution?.faq_section?.title) || "You Ask. We Answer!";
  const defaultFaqs = [
    {
      id: 1,
      question: "What is the Distribution model in digital lending?",
      answer:
        "The Distribution model enables partners such as financial institutions, fintech platforms, aggregators, and DSAs to distribute loan products to their customers through a seamless digital platform. It helps lenders expand their reach while allowing partners to offer financing solutions efficiently.",
    },
    {
      id: 2,
      question: "Who can become a distribution partner?",
      answer:
        "Banks, NBFCs, fintech companies, marketplaces, aggregators, DSAs, and digital platforms with access to customer networks can become distribution partners to monetize their customer base with pre-qualified credit products.",
    },
    {
      id: 3,
      question: "What types of loans can be distributed through the platform?",
      answer:
        "Partners can distribute a comprehensive multi-product suite including MSME business loans, personal loans, home loans, loans against property, working capital finance, vehicle loans, and investment products.",
    },
    {
      id: 4,
      question: "What support is provided to distribution partners?",
      answer:
        "Partners receive dedicated digital onboarding support, open REST APIs, turnkey web and mobile portals, training resources, and real-time commission reconciliation tools.",
    },
    {
      id: 5,
      question: "How quickly are loans processed and disbursed?",
      answer:
        "With automated digital verification, instant bureau scoring, and rule-based matching, loan sanction offers can happen in under 3 minutes, with fund disbursal executed within hours.",
    },
  ];

  const strapiFaqs =
    solution?.faq_section?.faqs && solution.faq_section.faqs.length > 0
      ? solution.faq_section.faqs.map((f: any) => ({
          id: f.id,
          question: sanitize(f.question),
          answer: sanitize(f.answer),
        }))
      : defaultFaqs;

  return (
    <div className="min-h-screen bg-white text-slate-800">
            {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: HERO OVERVIEW SECTION
          Directly driven by Strapi solution metadata & banner
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        aria-labelledby="overview-heading"
        className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-[#faf8fd] via-white to-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-5 border border-purple-200/60 shadow-2xs w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                {heroBadge}
              </div>

              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
              >
                Empower Channel Partners. Accelerate Loan Distribution.
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
                {heroSubtitle}
              </p>

              {/* Bullet Features with Gradient Checkmarks */}
              <div className="space-y-3.5 mb-8">
                {heroHighlights.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Schedule Network Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#partner-offerings"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-purple-50/50 hover:border-purple-200 hover:text-[#623f99] transition-all duration-300 shadow-xs"
                >
                  <span>Explore Offerings</span>
                </a>
              </div>
            </div>

            {/* Right Graphic Column: Banner from Strapi */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg rounded-3xl border border-purple-200/90 bg-white p-5 sm:p-7 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/50 via-white to-purple-50/30 flex items-center justify-center border border-slate-100 shadow-inner">
                  <Image
                    src={heroBannerImg}
                    alt="Loan Distribution Platform"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                </div>

                {/* Micro Metrics Strip */}
                <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Lender Network
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#623f99]">
                      50+ Lenders
                    </span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Decision TAT
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700">
                      &lt; 3 Mins
                    </span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      MIS Tracking
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0a1f44]">
                      100% Real-Time
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: STRATEGIC OFFERINGS & MULTI-PRODUCT ARCHITECTURE
          Directly driven by Strapi Section 0: OUR OFFERINGS THROUGH OUR STRATEGIC PARTNERS
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="partner-offerings"
        aria-labelledby="offerings-heading"
        className="py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#9a3f91]" />
              MULTI-PRODUCT ARCHITECTURE
            </span>
            <h2
              id="offerings-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {offeringsTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {offeringsSubtitle}
            </p>
          </div>

          {/* 3 Strategic Offering Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offeringsCards.map((card: any) => {
              const IconComp = card.icon;

              return (
                <div
                  key={card.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-white to-purple-50/20 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/10 hover:border-purple-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header Strip */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#623f99] border border-purple-200/60 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#9a3f91] bg-purple-50/80 border border-purple-200/60 px-3 py-1 rounded-full uppercase tracking-wider">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#623f99] transition-colors leading-snug">
                      {card.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 mb-6 font-medium">
                      Multi-lender institutional fulfillment across risk categories
                    </p>

                    {/* Products List with Emerald Checks */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      {card.items.map((prod: any, pIdx: number) => (
                        <div key={pIdx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-700">
                            {prod}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Metric Highlight */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                        {card.metricLabel}
                      </span>
                      <span className="text-sm font-bold text-[#623f99]">
                        {card.metric}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-purple-50 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] text-[#623f99] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 3: END-TO-END PARTNER LIFECYCLE JOURNEY
          Directly driven by Strapi Section 1: solution.bnpl-workflow-section
          Structured exactly like LOS "A CONNECTED ORIGINATION LAYER"
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="partner-journey"
        aria-labelledby="journey-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd]/50 border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Network className="w-3.5 h-3.5 text-[#9a3f91]" />
              {workflowBadge}
            </span>
            <h2
              id="journey-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {workflowTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {workflowSubtitle}
            </p>
          </div>

          {/* 6 Alternating Showcase Phases (LOS Connected Layer Style) */}
          <div className="space-y-24">
            {journeySteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = step.icon;

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
                        PHASE {step.idx}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-base sm:text-lg font-medium text-[#623f99] leading-relaxed">
                      {step.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>

                    {/* Checkmark Highlights */}
                    <div className="space-y-3 pt-2">
                      {step.points.map((pt, pIdx) => (
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
                      <div className="px-4 py-2 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                            {step.metricLabel}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {step.metric}
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
                    <div className="relative rounded-3xl border border-purple-200/80 bg-white p-5 sm:p-7 shadow-xl shadow-purple-950/5 overflow-hidden group">
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 border border-slate-100 flex items-center justify-center shadow-inner">
                        <Image
                          src={step.image || workflowImg}
                          alt={step.title}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium text-slate-700">
                          {step.title} Architecture
                        </span>
                        <span className="font-mono text-[#7c3aed] font-semibold">
                          Live iFLOW Distribution Rail
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

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 4: STRATEGIC BUSINESS VALUE (3 PILLARS CO-LENDING STYLE)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="business-benefits"
        aria-labelledby="benefits-heading"
        className="py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-[#9a3f91]" />
              MEASURABLE ROI & VALUE
            </span>
            <h2
              id="benefits-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              Proven Growth for Enterprise Distribution Networks
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Empower sourcing channels, optimize loan conversion, eliminate settlement disputes, and remain 100% compliant with RBI digital lending guidelines.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {strategicBenefits.map((item, idx) => {
              const IconComp = item.icon;

              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/10 hover:border-purple-300"
                >
                  <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#623f99] border border-purple-200/60 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#9a3f91] bg-purple-50 border border-purple-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#623f99] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                        {item.metricLabel}
                      </span>
                      <span className="text-base font-extrabold text-[#623f99]">
                        {item.metric}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                      {item.footerHighlight}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 5: COMPLETE PLATFORM CAPABILITIES (12 MODULES WITH TABS)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="platform-modules"
        aria-labelledby="modules-heading"
        className="py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd]/50 border-b border-purple-100/70"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-[#9a3f91]" />
              FULL CAPABILITY STACK
            </span>
            <h2
              id="modules-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              Enterprise Modules Built for Channel Scale
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              From lead capture to automated credit decisioning, commission calculations, and banking escrow settlements.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === cat
                    ? "bg-[#623f99] text-white shadow-md shadow-purple-950/20 scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-purple-200 hover:text-[#623f99]"
                }`}
              >
                {cat === "all" ? "All Capabilities (12)" : cat}
              </button>
            ))}
          </div>

          {/* 12 Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredModules.map((mod, idx) => {
              const IconComp = mod.icon;

              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center border border-purple-200/60 shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {mod.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#623f99] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                    <span>Configurable API & Webhook</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 6: DISTRIBUTION WORKFLOW PIPELINE (INTERACTIVE STEPPER)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="distribution-pipeline"
        aria-labelledby="pipeline-heading"
        className="py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Workflow className="w-3.5 h-3.5 text-[#9a3f91]" />
              THE OPERATING PIPELINE
            </span>
            <h2
              id="pipeline-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              5-Stage Accelerated Distribution Flow
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Click through each pipeline phase to see how applications flow from sourcing to loan disbursement and partner settlement.
            </p>
          </div>

          {/* Stepper Buttons Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
            {pipelineStages.map((stage) => {
              const isActive = activePipelineStep === stage.step;

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActivePipelineStep(stage.step)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white border-transparent shadow-lg shadow-purple-950/20 scale-102"
                      : "bg-slate-50 hover:bg-purple-50/50 text-slate-700 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-purple-100 text-[#623f99]"
                      }`}
                    >
                      0{stage.step}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider ${
                        isActive ? "text-purple-200" : "text-slate-400"
                      }`}
                    >
                      {stage.badge}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold truncate block">{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          {(() => {
            const currentStage =
              pipelineStages.find((s) => s.step === activePipelineStep) ||
              pipelineStages[0];

            return (
              <div className="rounded-3xl border border-purple-200/90 bg-gradient-to-br from-purple-50/40 via-white to-white p-8 sm:p-12 shadow-xl shadow-purple-950/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-[#623f99] uppercase tracking-wider">
                      Stage 0{currentStage.step} • {currentStage.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                      {currentStage.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                      {currentStage.desc}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-3">
                      {currentStage.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-purple-200/80 text-xs font-semibold text-slate-800 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-center lg:justify-end">
                    <div className="w-full max-w-xs p-6 rounded-2xl bg-white border border-slate-200 shadow-md text-center">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#623f99] flex items-center justify-center mx-auto mb-3">
                        <Activity className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                        SLA Target
                      </span>
                      <span className="text-xl font-extrabold text-[#623f99] block mb-2">
                        &lt; 3 Minutes
                      </span>
                      <p className="text-xs text-slate-500 leading-snug">
                        Automated decisioning & webhook trigger to partner MIS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 7: DISTRIBUTION TECHNOLOGY BENCHMARK MATRIX
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="technology-benchmark"
        aria-labelledby="benchmark-heading"
        className="py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd]/50 border-b border-purple-100/70"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-[#9a3f91]" />
              PLATFORM BENCHMARK
            </span>
            <h2
              id="benchmark-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              Why Digital Lenders Choose iFLOW Distribution
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Compare our automated, API-driven distribution infrastructure against offline brokerage networks and generic aggregators.
            </p>
          </div>

          {/* Benchmark Table */}
          <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/80">
                    <th className="py-5 px-6 sm:px-8 text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
                      Capability / Dimension
                    </th>
                    <th className="py-5 px-6 sm:px-8 text-xs font-bold font-mono text-[#623f99] uppercase tracking-wider bg-purple-50/70 border-x border-purple-100">
                      iFLOW Distribution Platform
                    </th>
                    <th className="py-5 px-6 sm:px-8 text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                      Traditional Offline DSAs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonData.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-purple-50/30 transition-colors"
                    >
                      <td className="py-5 px-6 sm:px-8 font-semibold text-slate-900">
                        {row.feature}
                        <span className="block text-[11px] font-normal text-slate-500 mt-1">
                          {row.advantage}
                        </span>
                      </td>
                      <td className="py-5 px-6 sm:px-8 font-bold text-[#623f99] bg-purple-50/30 border-x border-purple-100/60">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 stroke-[2.5]" />
                          <span>{row.modern}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Minus className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          <span>{row.legacy}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 8: ADDITIONAL DYNAMIC STRAPI SECTIONS
          Renders any extra dynamic sections authored in Strapi
      ────────────────────────────────────────────────────────────────────────── */}
      {additionalSections.length > 0 && (
        <section id="additional-sections" className="space-y-0">
          {additionalSections.map((sec, idx) => (
            <SectionRenderer key={sec.id || idx} section={sec} />
          ))}
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 9: FAQ ACCORDION
          Directly driven by Strapi FAQ Component
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="faq"
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
            {strapiFaqs.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
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
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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
          SECTION 10: ENTERPRISE CALL-TO-ACTION (CTA)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        aria-labelledby="cta-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-bold tracking-widest uppercase mb-6 border border-white/15">
            <Share2 className="w-3.5 h-3.5 text-purple-200" />
            ENTERPRISE DEPLOYMENT
          </span>

          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto mb-6"
          >
            Ready to Supercharge Your{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              Distribution Network?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
            Connect your bank, NBFC, or channel partner network to iFLOW's intelligent distribution engine. Deploy in weeks with turnkey APIs, white-label partner portals, and real-time commission reconciliation.
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
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-300"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

