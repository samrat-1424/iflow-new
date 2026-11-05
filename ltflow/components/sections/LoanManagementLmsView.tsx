"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionRenderer from "@/components/SectionRenderer";
import LmsComparison from "@/components/sections/LmsComparison";
import {
  CalendarClock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Network,
  Cpu,
  BrainCircuit,
  Coins,
  CreditCard,
  RotateCw,
  RefreshCw,
  BarChart3,
  Activity,
  Workflow,
  Users,
  FileCheck,
  ChevronDown,
  FileText,
  Eye,
  Server,
  Clock,
  Lock,
  User,
  LineChart,
  Briefcase,
  Car,
  GraduationCap,
  Scale,
  Sliders,
  Database,
  Building2,
  LucideIcon,
  Check,
  Receipt,
  Landmark,
  Wallet,
  HelpCircle,
} from "lucide-react";

interface LoanManagementLmsViewProps {
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
    .replace(/\s+/g, " ")
    .trim();
}

function isValidPoint(text: string | null | undefined): boolean {
  if (!text || text.length < 4) return false;
  if (/(.)\1{3,}/i.test(text)) return false;
  if (/cvcj|dhhd|asdf|qwerty|zzzz|xxxx/i.test(text)) return false;
  if (!text.includes(' ') && text.length > 10) return false;
  return true;
}

function parseBulletPoints(text: string | null | undefined): string[] {
  if (!text) return [];
  return sanitize(text)
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").replace(/^#+\s*/, "").trim())
    .filter((line) => Boolean(line) && line.length > 2);
}

function getProductIcon(title: string = ""): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("personal")) return User;
  if (t.includes("business") || t.includes("sme") || t.includes("msme")) return Briefcase;
  if (t.includes("vehicle") || t.includes("ev") || t.includes("auto") || t.includes("car")) return Car;
  if (t.includes("gold")) return Coins;
  if (t.includes("bnpl") || t.includes("pay later") || t.includes("consumer")) return CreditCard;
  if (t.includes("education") || t.includes("student")) return GraduationCap;
  if (t.includes("mutual fund") || t.includes("lamf")) return LineChart;
  if (t.includes("home") || t.includes("mortgage") || t.includes("lap")) return Building2;
  return Landmark;
}

function getAdaptIcon(title: string = ""): LucideIcon {
  const t = (title || "").toLowerCase();
  if (t.includes("product") || t.includes("config")) return Sliders;
  if (t.includes("interest") || t.includes("charge") || t.includes("fee")) return Coins;
  if (t.includes("repayment") || t.includes("schedule") || t.includes("frequency")) return CalendarClock;
  if (t.includes("modification") || t.includes("change")) return RefreshCw;
  if (t.includes("role") || t.includes("permission") || t.includes("access")) return ShieldCheck;
  if (t.includes("workflow") || t.includes("step") || t.includes("approval")) return Workflow;
  return Sliders;
}

function getProductFallbackDesc(title: string = ""): { desc: string; badge: string } {
  const t = title.toLowerCase();
  if (t.includes("personal")) {
    return {
      desc: "Automated recurring NACH/e-Mandate debits, flexible prepayment allocation, and instant digital foreclosure NOC generation.",
      badge: "Unsecured Servicing",
    };
  }
  if (t.includes("business") || t.includes("sme")) {
    return {
      desc: "Multi-tranche drawdowns, OD/CC revolving limits, daily interest calculation, and automated GST/cash flow reconciliation.",
      badge: "Commercial Cash Flow",
    };
  }
  if (t.includes("vehicle") || t.includes("ev")) {
    return {
      desc: "Hypothecation surveillance, dealer payout schedules, step-up/step-down EMI structures, and post-dated cheque tracking.",
      badge: "Asset-Backed",
    };
  }
  if (t.includes("gold")) {
    return {
      desc: "Dynamic LTV tracking against daily gold prices, bullet repayment schedules, margin call alerts, and automated auction workflows.",
      badge: "Collateral Linked",
    };
  }
  if (t.includes("bnpl") || t.includes("pay later")) {
    return {
      desc: "High-volume micro-transaction ledger, zero-cost EMI schedules, merchant settlement batches, and instant UPI AutoPay debit.",
      badge: "Sub-Second Clearing",
    };
  }
  if (t.includes("education")) {
    return {
      desc: "Course-duration moratorium schedules, step-up EMI repayment plans, co-borrower joint servicing, and direct university tranches.",
      badge: "Moratorium Friendly",
    };
  }
  return {
    desc: "Configurable loan lifecycle servicing with bespoke amortization, charge matrices, and institutional compliance.",
    badge: "Configurable Ledger",
  };
}

export default function LoanManagementLmsView({ solution }: LoanManagementLmsViewProps) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeModuleCategory, setActiveModuleCategory] = useState<string>("All");

  // State for interactive disbursement batch review button
  const [makerReviewed, setMakerReviewed] = useState<boolean>(false);
  const [activeDisbStep, setActiveDisbStep] = useState<number>(4);

  const sections: any[] = solution?.sections || [];

  // ────────────────────────────────────────────────────────────────────────────
  // Section Finders from Strapi
  // ────────────────────────────────────────────────────────────────────────────
  const secOverview =
    sections.find(
      (s) =>
        s.__component === "solution.feature-section" &&
        (String(s.title || "").toLowerCase().includes("everything you need") ||
          String(s.description || "").toLowerCase().includes("configurable"))
    ) || sections[0] || {};

  // Section 1: Underwriting / Servicing Lifecycle feature section (with image_4_540ed15640.png)
  const secUnderwriting =
    sections.find(
      (s) =>
        s.id !== secOverview?.id &&
        s.__component === "solution.feature-section" &&
        ((s.image && String(s.image.url || "").includes("image_4")) ||
          (s.features && String(s.features).includes("Manages loan servicing")))
    ) ||
    sections.find(
      (s) =>
        s.id !== secOverview?.id &&
        s.__component === "solution.feature-section" &&
        Boolean(s.image?.url)
    ) ||
    {};

  // Section 2: Multi-Product cards ("Built to shape the future of lending")
  const secProducts =
    sections.find(
      (s) =>
        s.__component === "solution.collection-cards" &&
        (String(s.title || "").toLowerCase().includes("built to shape") ||
          (Array.isArray(s.cards) &&
            s.cards.some((c: any) =>
              String(c.title || "").toLowerCase().includes("personal loan")
            )))
    ) || {};

  // Find all Strapi feature-sections for The Servicing Journey (Sections 5 through 12)
  const secServicingFeatureSections = sections.filter((s) => {
    const imgUrl = String(s.image?.url || "");
    const badge = String(s.badge || "").toLowerCase();
    const title = String(s.title || "").toLowerCase();
    const feat = String(s.features || "").toLowerCase();
    return (
      s.__component === "solution.feature-section" &&
      s.id !== secOverview?.id &&
      s.id !== secUnderwriting?.id &&
      (badge.includes("servicing journey") ||
        title.includes("manage the loan lifecycle") ||
        imgUrl.includes("Loan_Activation") ||
        imgUrl.includes("Disbursement_Preparation") ||
        imgUrl.includes("Bank_Disbursement") ||
        imgUrl.includes("Account_Servicing") ||
        imgUrl.includes("Repayment_Processing") ||
        imgUrl.includes("Reconciliation") ||
        imgUrl.includes("Collections_Dashboard") ||
        imgUrl.includes("Loan_Closure") ||
        feat.includes("loan activation") ||
        feat.includes("disbursement preparation") ||
        feat.includes("bank disbursement") ||
        feat.includes("account servicing") ||
        feat.includes("repayment processing") ||
        feat.includes("reconciliation") ||
        feat.includes("collections") ||
        feat.includes("loan closure"))
    );
  });

  const secServicingCards = sections.find(
    (s) =>
      s.__component === "solution.collection-cards" &&
      (String(s.title || "").toLowerCase().includes("manage the loan lifecycle") ||
        String(s.badge || "").toLowerCase().includes("servicing journey"))
  );

  const secAdaptServicing = sections.find(
    (s) =>
      s.__component === "solution.collection-cards" &&
      (String(s.title || "").toLowerCase().includes("adapt loan servicing") ||
        String(s.badge || "").toLowerCase().includes("configured for your model"))
  );

  // Track all handled section IDs so remaining dynamic sections appear in additionalSections
  const handledIds = new Set(
    [
      secOverview?.id,
      secUnderwriting?.id,
      secProducts?.id,
      secServicingCards?.id,
      secAdaptServicing?.id,
      ...secServicingFeatureSections.map((s) => s.id),
    ].filter(Boolean)
  );

  // Sections rendered dynamically in additionalSections (e.g. Adapt Loan Servicing collection cards)
  const additionalSections = sections.filter(
    (s: any) =>
      s &&
      (!s.id || !handledIds.has(s.id)) &&
      !String(s.badge || "").toLowerCase().includes("servicing journey")
  );

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Overview Section Data (Strapi Sec 0)
  // ────────────────────────────────────────────────────────────────────────────
  const overviewTitle =
    sanitize(secOverview.title) ||
    "Everything you need in a modern lending platform";
  const overviewSubtitle =
    sanitize(secOverview.description) ||
    "At its core, our loan management system is highly configurable, enabling lenders to tailor nearly every aspect of the servicing journey from activation to closure.";
  const overviewRawFeatures = secOverview.features || "";
  const overviewImg = toUrl(secOverview.image?.url || "/uploads/image_2_69cec9f456.png");

  const overviewParagraphs = overviewRawFeatures
    ? parseBulletPoints(overviewRawFeatures)
    : [
        "Flexible repayment options & dynamic interest schedules",
        "Real-time loan restructuring & moratorium management",
        "Automated DPD tracking & RBI IRAC asset classification",
        "Integrated core accounting ledgers & regulatory reporting",
      ];

  // ────────────────────────────────────────────────────────────────────────────
  // 2. Multi-Product Core Engine Data ("Built to shape the future of lending")
  // ────────────────────────────────────────────────────────────────────────────
  const productsBadge = sanitize(secProducts.badge) || "MULTI-PRODUCT ARCHITECTURE";
  const productsTitle =
    sanitize(secProducts.title) || "Built to shape the future of lending";
  const productsDesc =
    sanitize(secProducts.description) ||
    "Configure bespoke repayment schedules, interest accrual conventions, grace periods, and accounting rules for diverse retail and commercial loan products.";

  const rawCards =
    secProducts.cards && secProducts.cards.length > 0
      ? secProducts.cards
      : [
          { title: "Personal Loan" },
          { title: "Business / SME Loan" },
          { title: "Vehicle / EV Loan" },
          { title: "Gold Loan" },
          { title: "Buy Now, Pay Later" },
          { title: "Education Loan" },
        ];

  // ────────────────────────────────────────────────────────────────────────────
  // Section 1: Underwriting / Lifecycle Servicing Engine Data (image_4 from Strapi)
  // ────────────────────────────────────────────────────────────────────────────
  const underwritingTitle =
    sanitize(secUnderwriting.title) ||
    "Automated Servicing & Portfolio Operations Engine";
  const underwritingBadge =
    sanitize(secUnderwriting.badge) || "LIFECYCLE LOAN SERVICING & OPERATIONS";
  const underwritingDesc =
    sanitize(secUnderwriting.description) ||
    "Manage the entire post-disbursement lifecycle with automated schedule generation, daily interest accruals, integrated repayment tracking, and real-time portfolio analytics.";
  const underwritingImg = toUrl(secUnderwriting.image?.url || "/uploads/image_4_540ed15640.png");

  const underwritingBullets = secUnderwriting.features
    ? parseBulletPoints(secUnderwriting.features)
    : [
        "Manages loan servicing throughout the loan lifecycle",
        "Tracks repayments, schedules, and outstanding balances",
        "Automates collections, reminders, and payment processing",
        "Provides real-time loan portfolio monitoring and reporting",
      ];

  // ────────────────────────────────────────────────────────────────────────────
  // 3. THE SERVICING JOURNEY — Extracted Directly from Strapi Feature Sections
  // ────────────────────────────────────────────────────────────────────────────
  const defaultPillarsMetadata = [
    {
      title: "Loan Activation",
      badge: "ACCOUNT ONBOARDING & ACTIVATION",
      subtitle: "Set up account, product association, identifiers and servicing information.",
      image: "/uploads/i_FLOW_Loan_Activation_Complete_e3b93a2082.webp",
      metric: "Sub-Second LAN",
      metricLabel: "Activation",
      icon: CheckCircle2,
      points: [
        "Automated loan booking from LOS handoff with instant LAN generation",
        "Multi-tranche disbursement schedule initialization & fee deduction",
        "Double-entry general ledger creation with RBI audit trails",
      ],
    },
    {
      title: "Disbursement Preparation",
      badge: "DISBURSEMENT CONTROLS & REVIEW",
      subtitle: "Review eligible loans, capture amounts and track tranches where configured.",
      image: "/uploads/i_FLOW_Disbursement_Preparation_Dashboard_834aaf8958.webp",
      metric: "Dual Authorization",
      metricLabel: "Governance",
      icon: FileCheck,
      points: [
        "Pre-disbursement checklist validation & maker-checker dual signoff",
        "Beneficiary bank account penny-drop verification & mandate checks",
        "Holdback management and tranche release conditional triggers",
      ],
    },
    {
      title: "Bank Disbursement",
      badge: "PAYMENT RAILS & SETTLEMENT",
      subtitle: "Prepare payment data, approvals and payout references where supported.",
      image: "/uploads/Modern_Bank_Disbursement_Dashboard_83c8d10d5b.webp",
      metric: "Instant API Rails",
      metricLabel: "Execution",
      icon: Zap,
      points: [
        "Direct integration with Host-to-Host (H2H), RTGS, NEFT, & IMPS rails",
        "Real-time payout reference capture & bank UTR reconciliation",
        "Instant borrower SMS & WhatsApp notification upon fund release",
      ],
    },
    {
      title: "Account Servicing",
      badge: "CORE BALANCE & INTEREST ENGINE",
      subtitle: "Maintain balances, schedules, status and controlled servicing activity.",
      image: "/uploads/i_FLOW_Account_Servicing_Dashboard_d460ea7027.webp",
      metric: "Daily Accruals",
      metricLabel: "Servicing",
      icon: Cpu,
      points: [
        "Daily interest accrual computation across reducing or flat rates",
        "Moratorium handling, broken period calculations, & restructure schedules",
        "Real-time customer portal sync for amortisation schedule downloads",
      ],
    },
    {
      title: "Repayment Processing",
      badge: "COLLECTIONS & RECURRING MANDATES",
      subtitle: "Track dues, receipts and allocations according to lender-defined rules.",
      image: "/uploads/i_FLOW_Repayment_Processing_Dashboard_c67ba7fec2.webp",
      metric: "> 90% Success",
      metricLabel: "Clearing",
      icon: CreditCard,
      points: [
        "Automated NACH / e-Mandate / UPI AutoPay clearing queue presentation",
        "Configurable waterfall settlement (penalties, interest, principal)",
        "Automated bounce charge application & re-presentation schedules",
      ],
    },
    {
      title: "Reconciliation",
      badge: "GENERAL LEDGER RECONCILIATION",
      subtitle: "Compare records, surface exceptions and resolve discrepancies.",
      image: "/uploads/i_FLOW_Reconciliation_Dashboard_e87694439c.webp",
      metric: "Zero Ledger Drift",
      metricLabel: "Reconciliation",
      icon: RefreshCw,
      points: [
        "Automated tripartite matching between bank statements, LMS, & escrow",
        "Exception management workbench with one-click suspense clearing",
        "Daily ledger balancing ensuring zero ledger drift across accounts",
      ],
    },
    {
      title: "Collections & NPA Management",
      badge: "DELINQUENCY & RBI IRAC CLASSIFICATION",
      subtitle: "Organise overdue worklists, follow-ups and outcomes where enabled.",
      image: "/uploads/i_FLOW_Collections_Dashboard_Illustration_f83226c7b4.webp",
      metric: "100% IRAC Compliant",
      metricLabel: "Surveillance",
      icon: ShieldCheck,
      points: [
        "Automated DPD buckets tracking & dynamic allocation to collection worklists",
        "Omnichannel automated payment reminders via SMS, WhatsApp, & IVR",
        "Automated RBI IRAC asset classification (SMA-0, SMA-1, SMA-2, NPA)",
      ],
    },
    {
      title: "Loan Closure",
      badge: "FORECLOSURE & BUREAU CLOSURE",
      subtitle: "Coordinate final dues, payments, records and documents where configured.",
      image: "/uploads/Loan_Closure_Dashboard_Illustration_8bcf6ccb6d.webp",
      metric: "Instant Digital NOC",
      metricLabel: "Termination",
      icon: FileText,
      points: [
        "Real-time foreclosure quote calculation with interest till payoff date",
        "Automated collateral release authorization & lien removal triggers",
        "Instant generation of digitally signed No Objection Certificate (NOC)",
      ],
    },
  ];

  // Map each Strapi feature section directly, preserving the user's exact content from CMS Content Manager
  const servicingPillars = (
    secServicingFeatureSections.length > 0
      ? secServicingFeatureSections
      : defaultPillarsMetadata
  ).map((sec: any, idx: number) => {
    const meta = defaultPillarsMetadata[idx] || defaultPillarsMetadata[0];
    const rawFeat = sec.features || "";
    
    // 1. Extract clean bold title from Strapi (ignoring trailing gibberish)
    let derivedTitle = sanitize(sec.title);
    if (!derivedTitle || derivedTitle.toLowerCase().includes("manage the loan lifecycle")) {
      const match = rawFeat.match(/\*\*([^*]+)\*\*/);
      if (match) {
        derivedTitle = match[1].trim();
      }
    }
    const finalTitle = derivedTitle || meta.title;

    // 2. Extract clean subtitle and valid points from rawFeat (filtering out test noise)
    const textWithoutTitle = rawFeat.replace(/^\s*\*\*([^*]+)\*\*[^\n]*/, "").trim();
    const lines = textWithoutTitle
      .split(/\n+/)
      .map((l: string) => l.replace(/^[-*•]\s*/, "").trim())
      .filter((l: string) => Boolean(l) && isValidPoint(l));

    const subtitle = (lines[0] && isValidPoint(lines[0])) ? lines[0] : (meta.subtitle || meta.title);
    const userPoints = lines.slice(1).filter(isValidPoint);

    const points = [
      ...userPoints,
      ...meta.points.filter((dp: string) => !userPoints.includes(dp)),
    ].slice(0, 3);

    return {
      id: sec.id || `servicing-phase-${idx}`,
      idx: String(idx + 1).padStart(2, "0"),
      title: finalTitle,
      badge: sanitize(sec.badge) || meta.badge,
      subtitle,
      points,
      rawFeatures: rawFeat,
      image: toUrl(sec.image?.url || meta.image),
      icon: meta.icon,
      metric: meta.metric,
      metricLabel: meta.metricLabel,
    };
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 4. Complete LMS Modules Data (12 Servicing Modules across 5 categories)
  // ────────────────────────────────────────────────────────────────────────────
  const lmsModules = [
    {
      title: "Loan Account Activation",
      description:
        "Automate core loan booking from LOS handoff, generate unique loan account numbers (LAN), and initialize double-entry ledger accounts.",
      category: "Account Servicing",
      icon: CheckCircle2,
    },
    {
      title: "Dynamic Interest & Charge Engine",
      description:
        "Support reducing balance, flat rate, compounding, daily interest accruals, broken period calculations, and penal charges.",
      category: "Accounting & Ledger",
      icon: Cpu,
    },
    {
      title: "Disbursement Execution & Tranches",
      description:
        "Manage held-back amounts, progressive construction tranches, maker-checker authorizations, and direct bank payout APIs.",
      category: "Account Servicing",
      icon: Zap,
    },
    {
      title: "Repayment Processing & Allocation",
      description:
        "Automated waterfall payment allocation prioritizing penal charges, fees, overdue interest, current interest, and principal.",
      category: "Repayments & NACH",
      icon: Receipt,
    },
    {
      title: "Automated e-NACH & UPI AutoPay",
      description:
        "Orchestrate multi-rail mandate presentment with intelligent re-presentment retry heuristics and bounce reason tracking.",
      category: "Repayments & NACH",
      icon: CreditCard,
    },
    {
      title: "Escrow & Co-Lending Split Ledger",
      description:
        "Execute automated 80:20 / 90:10 repayment splits, tripartite escrow settlements, and partner bank shadow ledger synchronization.",
      category: "Accounting & Ledger",
      icon: Landmark,
    },
    {
      title: "Automated Bank Reconciliation",
      description:
        "Direct CBS / bank statement scraping with AI auto-matching, suspense account resolution queues, and zero ledger drift.",
      category: "Accounting & Ledger",
      icon: RefreshCw,
    },
    {
      title: "Delinquency & RBI IRAC Classification",
      description:
        "Automated Day-Past-Due (DPD) surveillance bucketing accounts into SMA-0, SMA-1, SMA-2, and NPA in real time.",
      category: "Collections & NPA",
      icon: ShieldCheck,
    },
    {
      title: "Hard & Soft Collections Workflows",
      description:
        "Intelligent collection worklists, automated WhatsApp/SMS payment reminders, dialer integrations, and settlement authorization.",
      category: "Collections & NPA",
      icon: Users,
    },
    {
      title: "Restructuring, Moratorium & Recast",
      description:
        "Execute loan tenure recasts, balloon payment adjustments, interest moratoriums, and COVID/regulatory debt restructuring.",
      category: "Account Servicing",
      icon: Sliders,
    },
    {
      title: "Loan Closure & Digital NOC",
      description:
        "Automate final dues settlement, excess amount refunds, lien release documentation, and instant digital NOC certificate dispatch.",
      category: "Governance",
      icon: FileCheck,
    },
    {
      title: "RBI Regulatory Reporting & Audit Trails",
      description:
        "Automated credit bureau monthly reporting (CIBIL, Experian, Equifax, CRIF), RBI master reporting, and immutable audit logs.",
      category: "Governance",
      icon: Database,
    },
  ];

  const moduleCategories = [
    "All",
    "Account Servicing",
    "Repayments & NACH",
    "Accounting & Ledger",
    "Collections & NPA",
    "Governance",
  ];

  const filteredModules =
    activeModuleCategory === "All"
      ? lmsModules
      : lmsModules.filter((m) => m.category === activeModuleCategory);

  // ────────────────────────────────────────────────────────────────────────────
  // 5. Strategic Business Benefits Data (Co-Lending card layout from user reference)
  // ────────────────────────────────────────────────────────────────────────────
  const strategicPillars = [
    {
      badge: "ACCOUNTING & RECONCILIATION",
      title: "Zero Ledger Drift & Real-Time Balancing",
      description:
        "Every repayment, disbursement, and interest accrual posts directly to a double-entry core ledger, ensuring 100% daily trial balance accuracy and eliminating end-of-day suspense accounts.",
      image: toUrl("/uploads/Professional_Loan_Application_Workspace_7cabc0ce18.webp"),
      icon: Landmark,
      metricLabel: "Reconciliation",
      metric: "Zero Ledger Drift",
    },
    {
      badge: "REPAYMENTS & VELOCITY",
      title: "Automated Multi-Rail Repayments & NACH",
      description:
        "Multi-rail auto-debit presentment across e-NACH, BBPS, and UPI AutoPay with smart retry heuristics minimizes default risk, accelerates clearing cycles, and reduces bounce fees.",
      image: toUrl("/uploads/Faster_Disbursement_5d620dea14.png"),
      icon: Zap,
      metricLabel: "Clearing Success",
      metric: "> 90% Success",
    },
    {
      badge: "REGULATORY & GOVERNANCE",
      title: "Continuous RBI IRAC & Portfolio Surveillance",
      description:
        "Automated Day-Past-Due (DPD) surveillance buckets accounts into SMA-0, SMA-1, SMA-2, and NPA on day 90 with automated 4-bureau submission files and regulatory audit trails.",
      image: toUrl("/uploads/Credit_Analyst_Reviewing_Loan_Decision_e77b37131a.webp"),
      icon: ShieldCheck,
      metricLabel: "Compliance",
      metric: "100% IRAC Compliant",
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 6. Interactive 8-Step Servicing Stepper Lifecycle
  // ────────────────────────────────────────────────────────────────────────────
  const pipelineSteps = [
    {
      id: 1,
      title: "Loan Activation & Booking",
      tag: "ACCOUNT INITIALIZATION",
      stat: "Sub-Second Activation",
      description:
        "Ingest approved sanction parameters from LOS, generate unique Loan Account Number (LAN), and configure the primary loan amortization ledger.",
      points: [
        "Automated loan booking from sanction webhook with zero manual re-entry.",
        "Generates repayment schedules matching reducing balance or flat interest schemes.",
        "Initializes institutional double-entry general ledger and linked escrow accounts.",
      ],
    },
    {
      id: 2,
      title: "Disbursement Execution",
      tag: "FUND TRANSFERS",
      stat: "Immediate Bank Rails",
      description:
        "Execute automated multi-tranche disbursements to verified borrower bank accounts with integrated maker-checker controls and holdbacks.",
      points: [
        "Direct API payouts via IMPS, NEFT, RTGS, and sponsor bank host-to-host.",
        "Automatic validation of beneficiary name matching penny-drop records.",
        "Held-back amount retention queues for progressive construction / SME drawdowns.",
      ],
    },
    {
      id: 3,
      title: "Mandate Setup & Presentment",
      tag: "COLLECTION CHANNELS",
      stat: "Multi-Rail Autopay",
      description:
        "Orchestrate e-NACH, NPCI NACH, and UPI AutoPay mandate activation for seamless automated recurring EMI debits.",
      points: [
        "Pre-notifies borrowers via automated WhatsApp & SMS 48 hours before presentation.",
        "Automated batch generation compliant with sponsor bank and NPCI file specifications.",
        "Dynamic mandate tracking with instant notification of mandate status changes.",
      ],
    },
    {
      id: 4,
      title: "Billing & Due Run Engine",
      tag: "DUE PROCESSING",
      stat: "Batch Processing",
      description:
        "Execute scheduled end-of-day (EOD) and start-of-day (SOD) batch processes to accrue interest, generate dues, and calculate late penalties.",
      points: [
        "Daily automated accruals for reducing balance and compound interest formulas.",
        "Configurable broken-period interest, grace periods, and holiday calendar handling.",
        "Generates borrower demand notices, tax receipts, and monthly Statements of Account.",
      ],
    },
    {
      id: 5,
      title: "Collections & Clearing",
      tag: "PAYMENT PROCESSING",
      stat: "Real-Time Clearing",
      description:
        "Process clearing returns, reconcile successful debits, and trigger automated smart re-presentment retry workflows for bounced debits.",
      points: [
        "Automatic ingestion and parsing of NPCI clearing files and payment gateway webhooks.",
        "Intelligent bounce retry scheduler based on borrower past salary credit patterns.",
        "Suspense account queue with instant AI-driven statement auto-reconciliation.",
      ],
    },
    {
      id: 6,
      title: "Waterfall Allocation & Escrow",
      tag: "ACCOUNTING LEDGER",
      stat: "Strict Dual Entry",
      description:
        "Apply received repayments through a configurable priority waterfall and execute automated co-lending split accounting.",
      points: [
        "Precedence-based allocation: Penal fees → Charges → Overdue Interest → Principal.",
        "Automated 80:20 or 90:10 co-lending split ledger updates with partner bank accounts.",
        "Instant transaction journalization to maintain continuous zero ledger drift.",
      ],
    },
    {
      id: 7,
      title: "NPA & Recovery Management",
      tag: "DELINQUENCY SURVEILLANCE",
      stat: "Automated DPD",
      description:
        "Classify delinquent accounts into SMA and NPA buckets based on RBI IRAC guidelines and execute recovery workflows.",
      points: [
        "Automated Day-Past-Due (DPD) surveillance bucketing into SMA-0, SMA-1, SMA-2, and NPA.",
        "Configurable soft dunning worklists with predictive caller queues and WhatsApp bot nudges.",
        "Structured debt restructuring, tenure recast, and settlement waiver authorizations.",
      ],
    },
    {
      id: 8,
      title: "Loan Closure & NOC",
      tag: "ACCOUNT TERMINATION",
      stat: "Instant Digital NOC",
      description:
        "Verify final settlement, issue automated No Objection Certificates (NOC), release liens, and update credit bureaus.",
      points: [
        "Automated foreclosure calculations including interest rebates and waiver approvals.",
        "Instant generation and dispatch of digitally signed No Objection Certificates (NOC).",
        "Automated closure flags reported in monthly CIBIL, Experian, Equifax, and CRIF files.",
      ],
    },
  ];

  const activeStep = pipelineSteps[activeStepIdx] || pipelineSteps[0];

  // ────────────────────────────────────────────────────────────────────────────
  // 7. Interactive Disbursement Batch Stepper Steps
  // ────────────────────────────────────────────────────────────────────────────
  const disbSteps = [
    {
      id: 1,
      title: "Ready to disburse",
      status: "Completed",
    },
    {
      id: 2,
      title: "Validate details",
      status: "Completed",
    },
    {
      id: 3,
      title: "Prepare bank file",
      status: "Completed",
    },
    {
      id: 4,
      title: "Maker verification",
      status: makerReviewed ? "Completed" : "Awaiting action",
      actionLabel: "Review",
    },
    {
      id: 5,
      title: "Checker approval",
      status: makerReviewed ? "Awaiting action" : "Pending",
    },
    {
      id: 6,
      title: "Payment released",
      status: "Pending",
    },
  ];

  const handleReviewToggle = () => {
    setMakerReviewed((prev) => !prev);
    setActiveDisbStep((prev) => (prev === 4 ? 5 : 4));
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 8. FAQ Section Data
  // ────────────────────────────────────────────────────────────────────────────
  const strapiFaqs = solution?.faq_section?.faqs || [];
  const faqTitle = sanitize(solution?.faq_section?.title) || "You Ask. We Answer!";
  const faqList =
    strapiFaqs.length > 0
      ? strapiFaqs.map((f: any) => ({
          question: sanitize(f.question || f.title),
          answer: sanitize(f.answer || f.description),
        }))
      : [
          {
            question: "What is a Loan Management System (LMS) and how does it differ from LOS?",
            answer:
              "A Loan Origination System (LOS) manages borrower onboarding, credit appraisal, and underwriting up to sanction. A Loan Management System (LMS) is the core operational engine that manages the entire lifecycle of a loan following sanction — including disbursement execution, repayment scheduling, interest calculation, automated mandate debit, escrow accounting, collections, and regulatory compliance.",
          },
          {
            question: "What operations can be managed through iFLOW LMS?",
            answer:
              "iFLOW LMS manages end-to-end loan servicing: multi-tranche disbursements, reducing/flat/compounding interest accruals, e-NACH/UPI mandate presentation, tripartite co-lending escrow split accounting, real-time bank reconciliation, RBI IRAC DPD tracking, and automated NOC generation.",
          },
          {
            question: "How does iFLOW LMS automate EMI collections?",
            answer:
              "iFLOW LMS integrates directly with NPCI e-NACH, BBPS, and UPI AutoPay. It triggers automated borrower WhatsApp/SMS reminders 48 hours prior to due dates, presents debits to sponsor banks, processes clearing responses in real-time, and schedules automated retry attempts for failed debits.",
          },
          {
            question: "How does iFLOW LMS ensure zero ledger drift?",
            answer:
              "Unlike traditional batch-based systems, iFLOW LMS operates an event-driven double-entry general ledger. Every financial transaction (disbursement, interest accrual, repayment, waiver) is recorded with balanced debits and credits, guaranteeing instant trial balance accuracy and continuous reconciliation with core banking statements.",
          },
          {
            question: "Can iFLOW LMS support co-lending servicing?",
            answer:
              "Yes. iFLOW LMS features native tripartite co-lending escrow support. When repayments are received from borrowers, our automated waterfall split allocates funds between the Bank (e.g. 80%) and the NBFC (e.g. 20%) in accordance with RBI CLM directions, updating partner shadow ledgers automatically.",
          },
        ];

  return (
    <div id="platform-capabilities" className="w-full bg-white text-slate-900 overflow-hidden">
      
      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: EXECUTIVE OVERVIEW — Core Platform Capabilities (Strapi Sec 0)
      ────────────────────────────────────────────────────────────────────────── */}
      <section id="overview" className="relative py-20 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden">
        {/* Ambient background decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-20 w-80 h-80 rounded-full bg-purple-200/40 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-40 w-96 h-96 rounded-full bg-fuchsia-100/40 blur-[120px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                CORE PLATFORM CAPABILITIES
              </span>

              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
              >
                {overviewTitle}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
                {overviewSubtitle}
              </p>

              {/* Bullet Features with Gradient Checkmarks */}
              <div className="space-y-3.5 mb-8">
                {overviewParagraphs.map((para, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {para}
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
                  <span>Schedule Platform Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#servicing-journey-connected"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-purple-50/50 hover:border-purple-200 hover:text-[#623f99] transition-all duration-300 shadow-xs"
                >
                  <span>Explore Servicing Journey</span>
                </a>
              </div>
            </div>

            {/* Right Image Graphic Column */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[16/10] sm:aspect-[4/3] rounded-3xl border border-purple-200/90 bg-white p-3 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/50 to-white flex items-center justify-center">
                  <Image
                    src={overviewImg}
                    alt={overviewTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: DISBURSEMENT MANAGEMENT — (Placed BEFORE "Built to shape")
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="disbursement-management"
        className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                DISBURSEMENT MANAGEMENT
              </span>

              <h2
                id="disbursement-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
              >
                Bring Greater Control to Loan Disbursement Operations
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
                Coordinate system-level disbursement and bank-level payment execution with clearer transaction status and approval visibility.
              </p>

              {/* 2-Column Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      Ready-to-disburse loan queue
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      Held-back amount management
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      Maker-checker authorisation
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      Amount, date and beneficiary review
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      Multiple tranches where applicable
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      Payout references where supported
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="border-l-2 border-[#623f99] pl-3.5 py-0.5">
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Bank portal interaction, file formats, and payment APIs depend on implementation and banking integration.
                </p>
              </div>
            </div>

            {/* Right Mockup Showcase Card */}
            <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-lg rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
                
                {/* Card Header */}
                <div className="px-6 sm:px-7 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      Disbursement batch
                    </h3>
                    <p className="font-mono text-xs text-slate-400 mt-0.5">
                      DB-240814-08 · 24 loans
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#623f99] border border-purple-200/60">
                    In progress
                  </span>
                </div>

                {/* Vertical Stepper Body */}
                <div className="px-6 sm:px-7 py-5">
                  <div className="space-y-4">
                    {disbSteps.map((step, idx) => {
                      const isCompleted = step.status === "Completed";
                      const isActive = step.status === "Awaiting action";

                      return (
                        <div key={step.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3.5">
                            {/* Step Indicator */}
                            <div className="relative flex items-center justify-center">
                              {isCompleted ? (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center shadow-xs">
                                  <Check className="w-4 h-4 stroke-[2.5]" />
                                </div>
                              ) : isActive ? (
                                <div className="w-7 h-7 rounded-full border-2 border-[#623f99] bg-purple-50 text-[#623f99] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                                  {step.id}
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center font-mono text-xs font-semibold">
                                  {step.id}
                                </div>
                              )}
                            </div>

                            {/* Step Text */}
                            <div>
                              <span
                                className={`text-sm leading-snug block ${
                                  isActive
                                    ? "font-bold text-slate-900"
                                    : isCompleted
                                    ? "font-semibold text-slate-800"
                                    : "font-medium text-slate-600"
                                }`}
                              >
                                {step.title}
                              </span>
                              <span
                                className={`text-xs block mt-0.5 ${
                                  isActive
                                    ? "text-[#9a3f91] font-medium"
                                    : "text-slate-400"
                                }`}
                              >
                                {isCompleted
                                  ? "Completed"
                                  : isActive
                                  ? "Awaiting action"
                                  : "Pending"}
                              </span>
                            </div>
                          </div>

                          {step.actionLabel && (
                            <div>
                              <button
                                type="button"
                                onClick={handleReviewToggle}
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-2xs ${
                                  makerReviewed
                                    ? "bg-purple-100 text-[#623f99] border border-purple-200"
                                    : "bg-purple-50 hover:bg-purple-100 text-[#623f99] border border-purple-200/80 cursor-pointer active:scale-95"
                                }`}
                              >
                                <span>{makerReviewed ? "Reviewed" : step.actionLabel}</span>
                                {!makerReviewed && (
                                  <ArrowRight className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Banner */}
                <div className="px-6 sm:px-7 pb-6 pt-2">
                  <div className="rounded-2xl bg-slate-50/90 border border-slate-100 p-4 grid grid-cols-3 gap-3 text-left">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Batch value
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                        ₹2,84,50,000
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Loans
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                        24
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Exceptions
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#9a3f91] font-mono">
                        02
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 3: MULTI-PRODUCT ARCHITECTURE — Built to shape the future of lending
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="supported-products"
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#9a3f91]" />
              {productsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {productsTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {productsDesc}
            </p>
          </div>

          {/* 6 Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rawCards.map((card: any, idx: number) => {
              const cleanTitle = sanitize(card.title);
              const IconComp = getProductIcon(cleanTitle);
              const fallback = getProductFallbackDesc(cleanTitle);
              const cardDesc = sanitize(card.description) || fallback.desc;
              const badgeText = fallback.badge;
              const iconUrl = card.icon?.url;

              return (
                <div
                  key={card.id || idx}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                >
                  <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-[#623f99] flex items-center justify-center border border-purple-200/60 shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                        {iconUrl ? (
                          <div className="relative w-7 h-7">
                            <Image
                              src={toUrl(iconUrl)}
                              alt={cleanTitle}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <IconComp className="w-6 h-6" />
                        )}
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#9a3f91] bg-purple-50 border border-purple-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {badgeText}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#623f99] transition-colors">
                      {cleanTitle}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {cardDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                    <span>Configure Lifecycle Rules</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 4: UNIFIED LOAN SERVICING & LEDGER OPERATIONS ENGINE (IMAGE_4)
          Directly driven by Strapi Feature-Section (image_4_540ed15640.png)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="automated-servicing"
        aria-labelledby="servicing-engine-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd]/50 border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Graphic from Strapi */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xl shadow-purple-950/5 overflow-hidden group">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Image
                    src={underwritingImg}
                    alt={underwritingTitle}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Micro Metrics Strip */}
                <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Ledger Tracking
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#623f99]">
                      Real-Time DPD
                    </span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Auto Collections
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700">
                      NACH / UPI Auto
                    </span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Compliance
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      RBI 2025 Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase border border-purple-200/60 shadow-2xs">
                <BrainCircuit className="w-3.5 h-3.5 text-[#9a3f91]" />
                {underwritingBadge}
              </span>

              <h2
                id="servicing-engine-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
              >
                {underwritingTitle}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {underwritingDesc}
              </p>

              {/* Bullet Features List */}
              <div className="space-y-3.5 pt-1">
                {underwritingBullets.map((bullet: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 transition-colors shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 5: THE SERVICING JOURNEY — A Connected Servicing Layer (Modeled on LOS Architecture)
          Directly driven by Strapi Content Manager Feature-Sections
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="servicing-journey-connected"
        aria-labelledby="servicing-journey-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Network className="w-3.5 h-3.5 text-[#9a3f91]" />
              THE SERVICING JOURNEY
            </span>
            <h2
              id="servicing-journey-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              Manage the Loan Lifecycle Beyond Origination
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              From activating a loan account to processing repayments, automated reconciliation, and managing collections — coordinate key servicing activities through a single unified system.
            </p>
          </div>

          {/* 8 Alternating Showcase Pillars */}
          <div className="space-y-24">
            {servicingPillars.map((pillar, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = pillar.icon;

              return (
                <div
                  key={pillar.id || idx}
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
                        PHASE {pillar.idx}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-base sm:text-lg font-medium text-[#623f99] leading-relaxed">
                      {pillar.subtitle}
                    </p>

                    {/* Checkmark Highlights */}
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

                    {/* Metric Tag Box */}
                    <div className="pt-2 flex items-center gap-4">
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
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      </div>

                      {/* Bottom Banner */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-medium text-slate-700">
                          {pillar.title} Module
                        </span>
                        <span className="font-mono text-[#7c3aed] font-semibold">
                          Live Architecture
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
          SECTION 5: COMPLETE LMS MODULES — 12 Modules with Category Filters
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="servicing-modules"
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Workflow className="w-3.5 h-3.5 text-[#9a3f91]" />
              COMPLETE LMS CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Institutional Capabilities Built into One Unified Core
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              From activating loan accounts to automated e-NACH clearing, co-lending escrow accounting, and debt recovery — everything running on one unified core ledger.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {moduleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveModuleCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeModuleCategory === cat
                    ? "bg-[#623f99] text-white shadow-md shadow-purple-900/20"
                    : "bg-slate-50 text-slate-600 hover:bg-purple-50 hover:text-[#623f99] border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 12 Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredModules.map((mod, idx) => {
              const ModIcon = mod.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/5 hover:border-purple-300"
                >
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center border border-purple-100 shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                        <ModIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:text-[#9a3f91] group-hover:border-purple-200 transition-colors">
                        {mod.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#623f99] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                    <span>Institutional Capability</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 6: STRATEGIC BUSINESS VALUE — Co-Lending Style 3-Pillar Cards
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="business-benefits"
        className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/3 w-80 h-80 rounded-full bg-purple-200/30 blur-[100px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
              WHY LMS MATTERS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              The Strategic Case for Modern Cloud LMS at Scale
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              How leading financial institutions leverage real-time double-entry accounting, automated clearing, and unified governance to eliminate ledger drift.
            </p>
          </div>

          {/* 3 Strategic Pillar Cards (Co-Lending Reference Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategicPillars.map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                >
                  {/* Top Image Container with Floating Pill Badge */}
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
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Metric Highlight Box */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          {pillar.metricLabel}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                          {pillar.metric}
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-purple-50 text-[#7c3aed] flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors shadow-2xs">
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
          SECTION 7: END-TO-END PIPELINE — 8-Step Interactive Servicing Lifecycle
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="servicing-pipeline"
        className="py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#9a3f91]" />
              END-TO-END PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              8-Step Digital Loan Servicing Journey, Fully Automated
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Coordinate every event from initial loan booking and disbursement to automated e-NACH clearance and final NOC release.
            </p>
          </div>

          {/* Stepper Navigation Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-10">
            {pipelineSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStepIdx(idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                  activeStepIdx === idx
                    ? "bg-[#623f99] text-white border-[#623f99] shadow-lg shadow-purple-900/20 scale-[1.02]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40"
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    activeStepIdx === idx ? "text-purple-200" : "text-[#9a3f91]"
                  }`}
                >
                  Step {step.id}
                </span>
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {step.title.split("&")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          <div className="rounded-3xl border border-purple-200/90 bg-gradient-to-br from-white via-purple-50/20 to-white p-7 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#623f99] via-[#9a3f91] to-[#623f99] absolute top-0 left-0" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Detail */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold text-[#623f99] bg-purple-100/80 px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
                    PHASE 0{activeStep.id} · {activeStep.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {activeStep.stat}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
                  {activeStep.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                  {activeStep.description}
                </p>

                <div className="space-y-2.5">
                  {activeStep.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Mini-Dashboard Graphic */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      EXECUTION STATUS
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </div>

                  <div className="py-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Service Pipeline</span>
                      <span className="font-mono font-bold text-slate-900">
                        iFLOW Core LMS
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Ledger Posting</span>
                      <span className="font-mono font-bold text-emerald-600">
                        Real-Time Dual Entry
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Audit Verification</span>
                      <span className="font-mono font-bold text-[#623f99]">
                        Immutable SHA-256
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>Phase Completion</span>
                      <span className="font-bold text-slate-800">
                        {Math.round(((activeStepIdx + 1) / 8) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#623f99] to-[#9a3f91] h-full rounded-full transition-all duration-300"
                        style={{ width: `${((activeStepIdx + 1) / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 8: BENCHMARK TABLE — Modern Cloud LMS vs Legacy Loan Management
      ────────────────────────────────────────────────────────────────────────── */}
      <LmsComparison />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 9: ADAPT LOAN SERVICING TO YOUR LENDING PRODUCTS
          Configured for your model — Modular Product Architecture
      ────────────────────────────────────────────────────────────────────────── */}
      {secAdaptServicing && (
        <section
          id="adapt-loan-servicing"
          className="py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                {sanitize(secAdaptServicing.badge) || "CONFIGURED FOR YOUR MODEL"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                {sanitize(secAdaptServicing.title) || "Adapt Loan Servicing to Your Lending Products"}
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                {sanitize(secAdaptServicing.description) ||
                  "Align product parameters, servicing rules, access, and workflow steps to the institution's agreed operational requirements."}
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(secAdaptServicing.cards || []).map((card: any, idx: number) => {
                const cardTitle = sanitize(card.title);
                const cardDesc = sanitize(card.description);
                const IconComp = getAdaptIcon(cardTitle);

                return (
                  <div
                    key={card.id || idx}
                    className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                  >
                    <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-[#623f99] flex items-center justify-center border border-purple-200/60 shadow-2xs group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[#9a3f91] bg-purple-50 border border-purple-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Configurable
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#623f99] transition-colors">
                        {cardTitle}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {cardDesc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                      <span>Institutional Parameter</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 10: ADDITIONAL DYNAMIC STRAPI SECTIONS (Content Manager Dynamic)
      ────────────────────────────────────────────────────────────────────────── */}
      {additionalSections.length > 0 && (
        <div id="additional-sections" className="space-y-0">
          {additionalSections.map((sec: any, idx: number) => (
            <div key={sec.id || `extra-lms-${idx}`} className="section">
              <SectionRenderer
                section={sec}
                index={idx}
                solutionSlug="loan-management-lms"
              />
            </div>
          ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 10: FAQ SECTION (Strapi solution.faq_section with Expandable Accordion)
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

          {/* Accordion Stack (Mapped dynamically from Strapi) */}
          <div className="space-y-4">
            {faqList.map((item: any, idx: number) => {
              const isOpen = openFaqIdx === idx;
              const question = sanitize(item.question);
              const answer = sanitize(item.answer);

              return (
                <div
                  key={idx}
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

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 11: ENTERPRISE CTA BANNER
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase border border-white/15 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            ENTERPRISE DEPLOYMENT
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
            Modernize Your Loan Servicing Operations with{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              iFLOW LMS
            </span>
          </h2>

          <p className="text-purple-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal mb-10">
            Eliminate suspense accounts, automate multi-rail e-NACH clearing, and empower operations with sub-second loan accounting and double-entry precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-a-demo"
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
