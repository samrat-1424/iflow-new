"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LosComparison from "@/components/sections/LosComparison";
import DigitalApplicationJourney from "@/components/sections/DigitalApplicationJourney";
import SectionRenderer from "@/components/SectionRenderer";
import {
  ClipboardCheck,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Network,
  Cpu,
  BrainCircuit,
  Smartphone,
  Coins,
  RefreshCw,
  CreditCard,
  RotateCw,
  BarChart3,
  PieChart,
  Activity,
  Workflow,
  Building,
  Users,
  Target,
  FileCheck,
  ChevronDown,
  Star,
  FileText,
  Eye,
  Server,
  CloudLightning,
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
  HelpCircle,
  LucideIcon,
  Check,
  Search,
  Filter,
  CheckCheck,
  FolderKanban,
  FileSpreadsheet,
} from "lucide-react";

interface LoanOriginationLosViewProps {
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

/**
 * Parses markdown features or bullet points
 */
function parseBulletPoints(text: string | null | undefined): string[] {
  if (!text) return [];
  return sanitize(text)
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").replace(/^#+\s*/, "").trim())
    .filter((line) => Boolean(line) && line.length > 2);
}

/**
 * Parses heading and description from markdown features text (e.g. "**Digital application journeys**\n\nFlows for products...")
 */
function parseShowcaseFeature(text: string | null | undefined, defaultTitle = "", defaultDesc = "") {
  if (!text) return { title: defaultTitle, desc: defaultDesc };
  const cleaned = sanitize(text);
  const boldMatch = cleaned.match(/^\*\*(.*?)\*\*/);
  if (boldMatch) {
    const title = boldMatch[1].trim();
    const desc = cleaned.replace(/^\*\*.*?\*\*\s*/, "").trim() || defaultDesc;
    return { title, desc };
  }
  const lines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length > 1) {
    return { title: lines[0].replace(/^#+\s*/, "").trim(), desc: lines.slice(1).join(" ") };
  }
  return { title: defaultTitle, desc: cleaned || defaultDesc };
}

/**
 * Intelligently picks a relevant icon for loan product cards
 */
function getProductIcon(title: string = ""): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("personal")) return User;
  if (t.includes("mutual fund") || t.includes("lamf") || t.includes("securities")) return LineChart;
  if (t.includes("business") || t.includes("sme") || t.includes("msme")) return Briefcase;
  if (t.includes("vehicle") || t.includes("ev") || t.includes("auto") || t.includes("car")) return Car;
  if (t.includes("bnpl") || t.includes("pay later") || t.includes("consumer")) return CreditCard;
  if (t.includes("education") || t.includes("student")) return GraduationCap;
  if (t.includes("home") || t.includes("mortgage") || t.includes("lap")) return Building2;
  if (t.includes("gold")) return Coins;
  return ClipboardCheck;
}

/**
 * Returns contextual product metadata / descriptions if Strapi card description is brief
 */
function getProductFallbackDesc(title: string = ""): { desc: string; badge: string } {
  const t = title.toLowerCase();
  if (t.includes("personal")) {
    return {
      desc: "Instant paperless journeys with Aadhaar e-KYC, bank statement OCR, and pre-approved limits in under 3 minutes.",
      badge: "Instant Disbursal",
    };
  }
  if (t.includes("mutual fund") || t.includes("lamf")) {
    return {
      desc: "Real-time lien marking with CAMS / KFintech APIs, instant collateral valuation, and low-margin credit lines.",
      badge: "Secured Portfolio",
    };
  }
  if (t.includes("business") || t.includes("sme")) {
    return {
      desc: "Automated GST triangulation, bank cash flow underwriting, and multi-director identity verification.",
      badge: "Cash-Flow Underwritten",
    };
  }
  if (t.includes("vehicle") || t.includes("ev")) {
    return {
      desc: "Automated Vahan RC verification, dealer invoice matching, fast track asset hypothecation, and split disbursements.",
      badge: "Asset-Backed",
    };
  }
  if (t.includes("bnpl") || t.includes("pay later")) {
    return {
      desc: "Sub-second checkout credit decisions, zero-cost EMI schedules, merchant SDK integrations, and automated mandate debit.",
      badge: "Point of Sale",
    };
  }
  if (t.includes("education")) {
    return {
      desc: "Co-borrower evaluation, student enrollment verification, flexible moratorium schedules, and direct institution payouts.",
      badge: "Specialized Tenure",
    };
  }
  return {
    desc: "Configurable digital onboarding workflow with customizable credit policies, verification checks, and e-signatures.",
    badge: "Configurable Journey",
  };
}

/**
 * Intelligently picks a relevant icon for Business Benefits cards
 */
function getBenefitIcon(title: string = ""): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("connected journey") || t.includes("coordinate")) return Workflow;
  if (t.includes("configurable") || t.includes("product journey")) return Sliders;
  if (t.includes("visibility") || t.includes("track")) return Eye;
  if (t.includes("risk") || t.includes("assessment") || t.includes("bureau")) return BrainCircuit;
  if (t.includes("integration") || t.includes("flexible") || t.includes("approach")) return Network;
  if (t.includes("operations") || t.includes("approval") || t.includes("review")) return Scale;
  return Sparkles;
}

/**
 * Intelligently picks a relevant icon for Complete LOS Modules cards
 */
function getModuleIcon(title: string = ""): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("onboarding") || t.includes("application")) return Smartphone;
  if (t.includes("scheme") || t.includes("product")) return Sliders;
  if (t.includes("dedupe") || t.includes("verification")) return ShieldCheck;
  if (t.includes("kyc") || t.includes("ckyc")) return User;
  if (t.includes("document") || t.includes("ocr")) return FileText;
  if (t.includes("banking") || t.includes("income") || t.includes("statement")) return BarChart3;
  if (t.includes("bureau")) return Database;
  if (t.includes("fraud") || t.includes("aml")) return Lock;
  if (t.includes("scoring") || t.includes("ai credit")) return BrainCircuit;
  if (t.includes("bre") || t.includes("decisioning")) return Cpu;
  if (t.includes("partner") || t.includes("co-lending")) return Building2;
  if (t.includes("appraisal") || t.includes("approval")) return Scale;
  if (t.includes("processing") || t.includes("pre-disbursement")) return Zap;
  if (t.includes("reporting") || t.includes("visibility")) return Activity;
  return ClipboardCheck;
}

/**
 * Provides rich fallback descriptions for 14 LOS Modules if Strapi has repetitive placeholder text
 */
function getModuleRichDesc(title: string = "", defaultDesc = ""): { desc: string; category: string } {
  const t = title.toLowerCase();
  if (t.includes("onboarding") || t.includes("application")) {
    return {
      desc: "Omnichannel customer intake across web, mobile, and branch portals with auto-save drafts and drop-off recovery.",
      category: "Customer Journey",
    };
  }
  if (t.includes("scheme") || t.includes("product")) {
    return {
      desc: "Configure interest rate matrices, tenure options, processing fee structures, and repayment methods per scheme.",
      category: "Product Engine",
    };
  }
  if (t.includes("dedupe") || t.includes("verification")) {
    return {
      desc: "Internal database dedupe, mobile/email validation, and cross-application negative list screening in real time.",
      category: "Verification",
    };
  }
  if (t.includes("kyc") || t.includes("ckyc")) {
    return {
      desc: "UIDAI Aadhaar OTP e-KYC, CKYC registry fetch, DigiLocker docs, and biometric face liveness detection.",
      category: "Verification",
    };
  }
  if (t.includes("document") || t.includes("ocr")) {
    return {
      desc: "AI computer vision parses salary slips, ITR returns, and bank statements with automated tamper detection.",
      category: "Verification",
    };
  }
  if (t.includes("banking") || t.includes("income")) {
    return {
      desc: "Consent-based Account Aggregator bank statement analytics calculating average monthly balance, inward bounces, and FOIR.",
      category: "Underwriting",
    };
  }
  if (t.includes("bureau")) {
    return {
      desc: "Direct parallel API pull from CIBIL, Experian, Equifax, and CRIF High Mark combined into a unified credit profile.",
      category: "Underwriting",
    };
  }
  if (t.includes("fraud") || t.includes("aml")) {
    return {
      desc: "Real-time checking against hunter databases, politically exposed persons (PEP) lists, and sanction databases.",
      category: "Risk Control",
    };
  }
  if (t.includes("scoring") || t.includes("ai credit")) {
    return {
      desc: "Gradient boosted machine learning models score thin-file and New-to-Credit (NTC) applicants beyond traditional credit history.",
      category: "Underwriting",
    };
  }
  if (t.includes("bre") || t.includes("decisioning")) {
    return {
      desc: "Visual no-code Business Rule Engine evaluates hard knocks, debt-to-income limits, and pricing grids in < 95ms.",
      category: "Decision Engine",
    };
  }
  if (t.includes("partner") || t.includes("co-lending")) {
    return {
      desc: "Joint lending policy filters, dynamic risk-sharing ratios, and tripartite escrow settlement compliance.",
      category: "Co-Lending",
    };
  }
  if (t.includes("appraisal") || t.includes("approval")) {
    return {
      desc: "Configurable maker-checker hierarchies, underwriter notes, exception workflows, and tiered sanction authority limits.",
      category: "Credit Operations",
    };
  }
  if (t.includes("processing") || t.includes("pre-disbursement")) {
    return {
      desc: "Automated sanction letter generation, Aadhaar e-Sign agreement execution, e-NACH mandate, and disbursement handoff.",
      category: "Disbursement",
    };
  }
  if (t.includes("reporting") || t.includes("visibility")) {
    return {
      desc: "Executive pipeline dashboards, TAT surveillance, underwriter productivity analytics, and RBI audit logs.",
      category: "Analytics & Audit",
    };
  }

  return {
    desc: defaultDesc && !defaultDesc.startsWith("Configure this capability around")
      ? defaultDesc
      : "Enterprise capability configured around institutional risk policies, connected APIs, and lending scope.",
    category: "Platform Capability",
  };
}

/**
 * Intelligently picks a relevant icon for workflow steps
 */
function getWorkflowIcon(title: string = ""): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("lead") || t.includes("intake") || t.includes("sourc")) return Smartphone;
  if (t.includes("kyc") || t.includes("ident") || t.includes("verif")) return ShieldCheck;
  if (t.includes("bank") || t.includes("financ") || t.includes("statement") || t.includes("aa")) return BarChart3;
  if (t.includes("bureau") || t.includes("cibil") || t.includes("dedupe")) return Database;
  if (t.includes("underwrit") || t.includes("bre") || t.includes("rule") || t.includes("assess")) return BrainCircuit;
  if (t.includes("sanction") || t.includes("letter") || t.includes("kfs")) return FileCheck;
  if (t.includes("sign") || t.includes("mandate") || t.includes("nach")) return Lock;
  if (t.includes("disburs") || t.includes("handoff") || t.includes("lms")) return Zap;
  return Workflow;
}

export default function LoanOriginationLosView({ solution }: LoanOriginationLosViewProps) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [activeModuleCategory, setActiveModuleCategory] = useState<string>("All");

  const sections: any[] = solution?.sections || [];

  // ────────────────────────────────────────────────────────────────────────────
  // Dynamic Section Finders (Matches Strapi content while providing safe fallbacks)
  // ────────────────────────────────────────────────────────────────────────────
  const secOverview =
    sections.find(
      (s) =>
        s.__component === "solution.feature-section" &&
        (String(s.title || "").toLowerCase().includes("efficiency") ||
          String(s.title || "").toLowerCase().includes("origination") ||
          String(s.description || "").toLowerCase().includes("onboarding"))
    ) || sections[0] || {};

  const secUnderwriting =
    sections.find(
      (s) =>
        s.id !== secOverview?.id &&
        (s.__component === "solution.feature-section" ||
          (s.features && String(s.features).toLowerCase().includes("automates borrower onboarding")) ||
          (s.image && String(s.image.url || "").includes("image_4")))
    ) || sections[1] || {};

  // Find Section 3: BUSINESS BENEFITS
  const secBusinessBenefits = sections.find(
    (s) =>
      String(s.badge || "").toUpperCase().includes("BUSINESS BENEFITS") ||
      String(s.title || "").toLowerCase().includes("visibility and coordination")
  );

  // Find Section 2: COMPLETE LOS MODULES
  const secCompleteModules = sections.find(
    (s) =>
      String(s.badge || "").toUpperCase().includes("COMPLETE LOS MODULES") ||
      String(s.title || "").toLowerCase().includes("everything your origination team needs")
  );

  // Find Section: Product Cards (Personal, SME, LAMF, etc.)
  const secProducts =
    sections.find(
      (s) =>
        s.__component === "solution.collection-cards" &&
        s.id !== secCompleteModules?.id &&
        s.id !== secBusinessBenefits?.id &&
        (String(s.title || "").toLowerCase().includes("onboarding paths") ||
          String(s.title || "").toLowerCase().includes("loan products") ||
          (Array.isArray(s.cards) && s.cards.some((c: any) => String(c.title || "").toLowerCase().includes("personal loan"))))
    ) || {};

  // Find Sections 4, 5, 6, 7: A CONNECTED ORIGINATION LAYER (4 showcase items)
  const secConnectedLayers = sections.filter(
    (s) =>
      String(s.badge || "").toUpperCase().includes("CONNECTED ORIGINATION LAYER") ||
      String(s.title || "").toLowerCase().includes("complete loan origination lifecycle") ||
      (s.image && String(s.image.url || "").includes("Professional_Loan_Application_Workspace")) ||
      (s.image && String(s.image.url || "").includes("Automated_KYC_Verification")) ||
      (s.image && String(s.image.url || "").includes("Credit_Analyst_Reviewing")) ||
      (s.image && String(s.image.url || "").includes("Loan_Operations_Workflow_Dashboard"))
  );

  const secWorkflow =
    sections.find((s) => s.__component === "solution.workflow-section");

  // Track all handled section IDs so they are not rendered twice in additionalSections
  const handledIds = new Set(
    [
      secOverview?.id,
      secUnderwriting?.id,
      secProducts?.id,
      secBusinessBenefits?.id,
      secCompleteModules?.id,
      secWorkflow?.id,
      ...secConnectedLayers.map((s) => s.id),
    ].filter(Boolean)
  );

  // Additional sections added dynamically from Strapi CMS
  const additionalSections = sections.filter(
    (s: any) => s && (!s.id || !handledIds.has(s.id))
  );

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Overview Section Data
  // ────────────────────────────────────────────────────────────────────────────
  const overviewTitle =
    sanitize(secOverview.title) ||
    "Maximize Efficiency with Our Next-Gen Loan Origination System";
  const overviewSubtitle =
    sanitize(secOverview.description) ||
    "Drive customer conversions and streamline the complete onboarding journey from sourcing to instant disbursement.";
  const overviewRawFeatures = secOverview.features || "";
  const overviewImg = toUrl(secOverview.image?.url || "/uploads/image_3_b1f6cffbec.png");

  const overviewParagraphs = overviewRawFeatures
    ? overviewRawFeatures.split(/\n\s*\n/).map((p: string) => sanitize(p)).filter(Boolean)
    : [
        "Faster to configure and deploy with modular microservices.",
        "Create personalised, friction-free loan journeys for any credit product.",
        "50+ pre-built third-party fintech and verification integrations.",
      ];

  // ────────────────────────────────────────────────────────────────────────────
  // 2. A CONNECTED ORIGINATION LAYER Data (Sections 4, 5, 6, 7 from Strapi)
  // ────────────────────────────────────────────────────────────────────────────
  const connectedLayerBadge =
    secConnectedLayers[0]?.badge || "A CONNECTED ORIGINATION LAYER";
  const connectedLayerTitle =
    sanitize(secConnectedLayers[0]?.title) ||
    "One Platform. The Complete Loan Origination Lifecycle.";
  const connectedLayerDesc =
    sanitize(secConnectedLayers[0]?.description) ||
    "Bring application data, verification, credit assessment, documentation, approvals and handoffs into one configurable workflow.";

  const connectedPillars = [
    {
      idx: "01",
      badge: "CHANNEL ORCHESTRATION",
      title: "Digital Application Journeys",
      subtitle: "Flows for products, borrower categories and sourcing channels.",
      image: toUrl(
        secConnectedLayers[0]?.image?.url ||
          "/uploads/Professional_Loan_Application_Workspace_7cabc0ce18.webp"
      ),
      icon: Smartphone,
      points: [
        "Dynamic form rendering with conditional field validations",
        "Omnichannel lead capture with instant OTP verification",
        "Drop-off tracking with automated applicant recovery nudges",
      ],
      metric: "Channel Agnostic",
      metricLabel: "Sourcing",
    },
    {
      idx: "02",
      badge: "INSTANT IDENTITY & FRAUD CHECKS",
      title: "Automated Verification",
      subtitle: "Coordinate KYC, dedupe, OCR, bureau, banking and configured checks.",
      image: toUrl(
        secConnectedLayers[1]?.image?.url ||
          "/uploads/Automated_KYC_Verification_at_Work_3161f994d2.webp"
      ),
      icon: ShieldCheck,
      points: [
        "Paperless Aadhaar OTP & DigiLocker e-KYC integration",
        "AI biometric liveness detection and facial image matching",
        "Real-time fraud negative lists and internal cross-application dedupe",
      ],
      metric: "100% Digital KYC",
      metricLabel: "Verification",
    },
    {
      idx: "03",
      badge: "HIGH-SPEED RULE ENGINE (BRE)",
      title: "Credit Decisioning",
      subtitle: "Combine rules, partner eligibility, scores and affordability indicators.",
      image: toUrl(
        secConnectedLayers[2]?.image?.url ||
          "/uploads/Credit_Analyst_Reviewing_Loan_Decision_e77b37131a.webp"
      ),
      icon: BrainCircuit,
      points: [
        "Visual no-code business rule engine (BRE) policy configuration",
        "Parallel inquiries across CIBIL, Experian, Equifax, and CRIF",
        "Account Aggregator cash-flow analysis & GST triangulation",
      ],
      metric: "< 95ms Decision",
      metricLabel: "Latency",
    },
    {
      idx: "04",
      badge: "OPERATIONS & DISBURSAL HUB",
      title: "Centralised Processing",
      subtitle: "Manage status, documents, comments, tasks and approval handoffs.",
      image: toUrl(
        secConnectedLayers[3]?.image?.url ||
          "/uploads/Loan_Operations_Workflow_Dashboard_19676c62f8.webp"
      ),
      icon: Scale,
      points: [
        "Configurable maker-checker hierarchies and exception handling",
        "Automated digital sanction letters & RBI Key Fact Statements",
        "Aadhaar e-Sign execution & instant core LMS / escrow disbursal",
      ],
      metric: "T+0 Disbursal",
      metricLabel: "Settlement",
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // 3. BUSINESS BENEFITS Section Data (Section 3 from Strapi)
  // ────────────────────────────────────────────────────────────────────────────
  const benefitsBadge =
    secBusinessBenefits?.badge || "BUSINESS BENEFITS";
  const benefitsTitle =
    sanitize(secBusinessBenefits?.title) ||
    "Improve Visibility and Coordination Across Loan Origination";
  const benefitsDesc =
    sanitize(secBusinessBenefits?.description) ||
    "Eliminate operational silos, accelerate underwriting velocity, and establish unified governance from lead capture to final disbursal.";

  const benefitsRawCards = secBusinessBenefits?.cards || [];
  const benefitsCards =
    benefitsRawCards.length > 0
      ? benefitsRawCards.map((c: any) => ({
          title: sanitize(c.title),
          description: sanitize(c.description),
          icon: getBenefitIcon(c.title),
        }))
      : [
          {
            title: "A More Connected Journey",
            description:
              "Coordinate applicant data, document verification, risk eligibility, and disbursal approvals in one continuous digital thread.",
            icon: Workflow,
          },
          {
            title: "Configurable Product Journeys",
            description:
              "Launch and customize retail, SME, vehicle, and co-lending product workflows in minutes without core code changes.",
            icon: Sliders,
          },
          {
            title: "Better Application Visibility",
            description:
              "Real-time executive dashboards track pipeline velocity, underwriter queue SLAs, and drop-off bottlenecks instantly.",
            icon: Eye,
          },
          {
            title: "Integrated Risk Assessment",
            description:
              "Harmonize credit bureau reports, banking cash flows, fraud indicators, and machine learning models for holistic decisioning.",
            icon: BrainCircuit,
          },
          {
            title: "Flexible Integration Approach",
            description:
              "Adopt iFLOW as a complete turnkey cloud LOS or integrate specialized microservices (KYC, BRE, Document OCR) into legacy CBS.",
            icon: Network,
          },
          {
            title: "Structured Credit Operations",
            description:
              "Enforce institutional credit governance with configurable maker-checker approval matrices and full audit trails.",
            icon: Scale,
          },
        ];

  // ────────────────────────────────────────────────────────────────────────────
  // 4. COMPLETE LOS MODULES Section Data (Section 2 from Strapi)
  // ────────────────────────────────────────────────────────────────────────────
  const modulesBadge =
    secCompleteModules?.badge || "COMPLETE LOS MODULES";
  const modulesTitle =
    sanitize(secCompleteModules?.title) ||
    "Everything Your Origination Team Needs in One Configurable Platform";
  const modulesDesc =
    sanitize(secCompleteModules?.description) ||
    "A connected capability set for customer journeys, risk assessment, credit operations and processing.";

  const rawModuleCards = secCompleteModules?.cards || [];
  const allModules = rawModuleCards.map((card: any) => {
    const cleanTitle = sanitize(card.title);
    const richData = getModuleRichDesc(cleanTitle, sanitize(card.description));
    const Icon = getModuleIcon(cleanTitle);
    return {
      title: cleanTitle,
      description: richData.desc,
      category: richData.category,
      icon: Icon,
    };
  });

  const moduleCategories = [
    "All",
    "Customer Journey",
    "Verification",
    "Underwriting",
    "Credit Operations",
  ];

  const filteredModules =
    activeModuleCategory === "All"
      ? allModules
      : allModules.filter((m: any) =>
          activeModuleCategory === "Customer Journey"
            ? m.category === "Customer Journey" || m.category === "Product Engine"
            : activeModuleCategory === "Verification"
            ? m.category === "Verification" || m.category === "Risk Control"
            : activeModuleCategory === "Underwriting"
            ? m.category === "Underwriting" || m.category === "Decision Engine" || m.category === "Co-Lending"
            : m.category === "Credit Operations" || m.category === "Disbursement" || m.category === "Analytics & Audit"
        );

  // ────────────────────────────────────────────────────────────────────────────
  // 5. Underwriting & Verification Section Data (Strapi Sec 1)
  // ────────────────────────────────────────────────────────────────────────────
  const underwritingTitle =
    sanitize(secUnderwriting.title) ||
    "Automated Underwriting, Instant KYC & Real-Time Decisioning";
  const underwritingBadge =
    sanitize(secUnderwriting.badge) || "UNDERWRITING & VERIFICATION";
  const underwritingDesc =
    sanitize(secUnderwriting.description) ||
    "Eliminate manual processing delays with automated document validation, real-time bureau inquiries, and AI-driven credit risk evaluation.";
  const underwritingImg = toUrl(secUnderwriting.image?.url || "/uploads/image_4_540ed15640.png");

  const underwritingBullets = secUnderwriting.features
    ? parseBulletPoints(secUnderwriting.features)
    : [
        "Automates borrower onboarding and loan application processing with zero paper delays.",
        "Performs digital KYC, PAN verification, and dedupe checks against fraud databases.",
        "Calculates FOIR, debt-to-income ratios, and banking cash flows in under 60 seconds.",
        "Generates instant sanction letters with RBI-compliant Key Fact Statements.",
      ];

  // ────────────────────────────────────────────────────────────────────────────
  // 6. Supported Loan Products Cards (Strapi Sec 2 Cards)
  // ────────────────────────────────────────────────────────────────────────────
  const productsBadge = sanitize(secProducts.badge) || "MULTI-PRODUCT ARCHITECTURE";
  const productsTitle =
    sanitize(secProducts.title) || "Build Tailored Onboarding Paths for Diverse Loan Products";
  const productsDesc =
    sanitize(secProducts.description) ||
    "Configure bespoke borrower journeys, validation checks, and policy rules for any retail, MSME, or commercial lending category.";

  const rawCards =
    secProducts.cards && secProducts.cards.length > 0
      ? secProducts.cards
      : [
          { title: "Personal Loan" },
          { title: "Loan Against Mutual Funds" },
          { title: "Business / SME Loan" },
          { title: "Vehicle / EV Loan" },
          { title: "Buy Now, Pay Later" },
          { title: "Education Loan" },
        ];

  // ────────────────────────────────────────────────────────────────────────────
  // 7. Default 8-Step End-to-End Workflow Pipeline
  // ────────────────────────────────────────────────────────────────────────────
  const workflowBadge = sanitize(secWorkflow?.badge) || "END-TO-END PIPELINE";
  const workflowTitle =
    sanitize(secWorkflow?.title) || "8-Step Digital Origination Lifecycle, Fully Automated";
  const workflowSteps =
    secWorkflow?.steps && secWorkflow.steps.length > 0
      ? secWorkflow.steps
      : [
          {
            title: "Omnichannel Lead Ingestion",
            description:
              "Capture leads from self-serve web portals, mobile apps, DSA partners, or branch desks with instant mobile OTP authentication.",
            tag: "Sourcing & Consent",
            stat: "< 30s Intake",
          },
          {
            title: "Digital KYC & Identity Verification",
            description:
              "Real-time integration with UIDAI Aadhaar e-KYC, DigiLocker, PAN NSDL verification, and AI-powered biometric face match.",
            tag: "Paperless KYC",
            stat: "100% Digital",
          },
          {
            title: "Financial Analysis & Bank OCR",
            description:
              "Automated Account Aggregator fetch, PDF bank statement parsing, salary slip OCR, and GST triangulation in real time.",
            tag: "Cash-Flow Intel",
            stat: "6 Mos Banking",
          },
          {
            title: "Multi-Bureau Pull & Dedupe",
            description:
              "Simultaneous inquiries across CIBIL, Experian, Equifax, and CRIF High Mark combined with internal negative list screening.",
            tag: "Bureau Aggregation",
            stat: "Parallel Pull",
          },
          {
            title: "BRE Policy & Risk Underwriting",
            description:
              "Configurable business rule engine executes eligibility policies, debt-to-income (FOIR) ratios, and AI risk scorecards.",
            tag: "Automated BRE",
            stat: "< 95ms Decision",
          },
          {
            title: "Digital Sanction Letter & KFS",
            description:
              "Instant generation of customized loan sanction letter, repayment amortization schedule, and RBI Key Fact Statement (KFS).",
            tag: "Sanction Generation",
            stat: "Instant PDF",
          },
          {
            title: "Aadhaar e-Sign & e-NACH Mandate",
            description:
              "Legally binding digital loan agreement execution via Aadhaar e-Sign and automated recurring repayment mandate registration.",
            tag: "Legal & Mandate",
            stat: "Zero Paperwork",
          },
          {
            title: "Core LMS Handoff & Disbursal",
            description:
              "Automated loan booking into iFLOW LMS or core banking system with split escrow payouts and instant disbursal triggers.",
            tag: "Disbursement",
            stat: "T+0 Settlement",
          },
        ];

  const activeStep = workflowSteps[activeStepIdx] || workflowSteps[0];
  const ActiveStepIcon = getWorkflowIcon(activeStep.title);

  // ────────────────────────────────────────────────────────────────────────────
  // 8. FAQ Data (Strapi FAQ Section or High Quality Fallbacks)
  // ────────────────────────────────────────────────────────────────────────────
  const faqTitle = sanitize(solution?.faq_section?.title) || "You Ask. We Answer!";
  const faqList: { question: string; answer: string }[] =
    solution?.faq_section?.faqs && solution.faq_section.faqs.length > 0
      ? solution.faq_section.faqs.map((f: any) => ({
          question: sanitize(f.question),
          answer: typeof f.answer === "string" ? f.answer : String(f.answer || ""),
        }))
      : [
          {
            question: "What is a Loan Origination System (LOS)?",
            answer:
              "A Loan Origination System (LOS) is an enterprise digital platform that manages and automates the entire borrower onboarding lifecycle from initial lead ingestion, identity verification, and credit underwriting through sanction letter generation and disbursement preparation.",
          },
          {
            question: "How does iFLOW LOS achieve decisioning in under 3 minutes?",
            answer:
              "iFLOW LOS combines automated identity verification (Aadhaar e-KYC, PAN), real-time Account Aggregator bank statement analysis, parallel multi-bureau API inquiries, and a high-speed Business Rule Engine (BRE) to evaluate applicant eligibility without human intervention.",
          },
          {
            question: "Is iFLOW LOS compliant with RBI's 2025 Digital Lending Directions?",
            answer:
              "Yes. iFLOW LOS is architected strictly around RBI Digital Lending guidelines, featuring direct lender-to-borrower fund flows, automated Key Fact Statement (KFS) generation, dual-party consent logs, and full cryptographic audit trails.",
          },
          {
            question: "Can iFLOW LOS support multiple distinct loan products simultaneously?",
            answer:
              "Absolutely. The platform features a modular product configuration engine allowing lenders to create bespoke application flows, underwriting scorecards, and document requirements for Personal Loans, SME/Business Loans, Vehicle/EV Loans, BNPL, Gold Loans, and Education Loans.",
          },
          {
            question: "How does iFLOW LOS integrate with existing core banking or LMS systems?",
            answer:
              "iFLOW provides open RESTful APIs and event-driven webhooks that seamlessly sync sanctioned loan files, applicant data, and auto-debit mandates into existing Loan Management Systems (LMS), core banking systems (CBS), or ERP ledgers.",
          },
        ];

  return (
    <div className="w-full bg-white">
      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: OVERVIEW & STRATEGIC EFFICIENCY (Strapi Sec 0)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        aria-labelledby="overview-heading"
        className="relative py-20 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-[#fbf9fd] via-white to-white border-b border-purple-100/70 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 w-96 h-96 rounded-full bg-purple-200/40 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-fuchsia-100/30 blur-[100px]"
        />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading, Overview, Bullet Points */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase border border-purple-200/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                CLOUD LOAN ORIGINATION SYSTEM
              </span>

              <h2
                id="overview-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
              >
                {overviewTitle}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {overviewSubtitle}
              </p>

              {/* Parsed Overview Highlights */}
              <div className="space-y-3 pt-2">
                {overviewParagraphs.map((para: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                      {para}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#connected-origination-layer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white text-sm font-semibold shadow-md shadow-purple-500/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Connected Layer</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#los-comparison"
                  className="px-6 py-3 rounded-full border border-purple-200 bg-white text-sm font-semibold text-[#623f99] hover:bg-purple-50 transition-colors shadow-2xs"
                >
                  Compare with Legacy LOS
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Architecture Graphic from Strapi */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-purple-200/90 bg-white p-4 sm:p-6 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <Image
                    src={overviewImg}
                    alt={overviewTitle}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                    unoptimized
                  />
                </div>

                {/* Status Badges */}
                <div className="mt-5 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold">Sub-3 Min Sanction</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Zap className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
                    <span className="font-semibold">80+ Pre-Built Integrations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 2: A CONNECTED ORIGINATION LAYER (REVAMPED BESPOKE SHOWCASE)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="connected-origination-layer"
        aria-labelledby="connected-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Network className="w-3.5 h-3.5 text-[#9a3f91]" />
              {connectedLayerBadge}
            </span>
            <h2
              id="connected-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {connectedLayerTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {connectedLayerDesc}
            </p>
          </div>

          {/* 4 Alternating Showcase Pillars */}
          <div className="space-y-24">
            {connectedPillars.map((pillar, idx) => {
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
          SECTION 3: BUSINESS BENEFITS (REVAMPED ENTERPRISE BENTO GRID)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="business-benefits"
        aria-labelledby="benefits-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-200/30 blur-[120px]"
        />

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
              {benefitsBadge}
            </span>
            <h2
              id="benefits-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {benefitsTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {benefitsDesc}
            </p>
          </div>

          {/* 6 Benefits Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefitsCards.map((card: any, idx: number) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-3xl p-8 bg-white border border-slate-200/90 shadow-xs hover:border-purple-300 hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Accent Top Strip */}
                  <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/70 text-[#623f99] flex items-center justify-center border border-purple-200/60 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full uppercase group-hover:text-[#9a3f91] group-hover:border-purple-200 transition-colors">
                        BENEFIT 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                      {card.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#7c3aed]">
                    <span>Institutional Value</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 4: COMPLETE LOS MODULES (14 CAPABILITY MATRIX)
      ────────────────────────────────────────────────────────────────────────── */}
      {allModules.length > 0 && (
        <section
          id="complete-los-modules"
          aria-labelledby="modules-heading"
          className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#9a3f91]" />
                {modulesBadge}
              </span>
              <h2
                id="modules-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
              >
                {modulesTitle}
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                {modulesDesc}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
              {moduleCategories.map((cat) => {
                const isActive = activeModuleCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveModuleCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#623f99] text-white shadow-md shadow-purple-500/20 scale-105"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* 14 Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredModules.map((module: any, idx: number) => {
                const Icon = module.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-3xl p-6 bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-950/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#623f99] flex items-center justify-center border border-purple-100 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[9.5px] font-bold text-slate-400 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-full uppercase">
                          {module.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                        {module.title}
                      </h3>

                      <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                        {module.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#7c3aed]">
                      <span>Configurable</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 5: AUTOMATED UNDERWRITING & VERIFICATION (Strapi Sec 1)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="underwriting"
        aria-labelledby="underwriting-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
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
                      Bureau Inquiries
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#623f99]">
                      Real-Time API
                    </span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Paperless KYC
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700">
                      100% Digital
                    </span>
                  </div>
                  <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Audit Trail
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0a1f44]">
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
                id="underwriting-heading"
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
          SECTION 6: SUPPORTED LOAN PRODUCTS (Strapi Sec 2 Cards)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="loan-products"
        aria-labelledby="products-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/3 w-80 h-80 rounded-full bg-purple-200/30 blur-[100px]"
        />

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#9a3f91]" />
              {productsBadge}
            </span>
            <h2
              id="products-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {productsTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              {productsDesc}
            </p>
          </div>

          {/* Dynamic 6 Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {rawCards.map((card: any, idx: number) => {
              const cardTitle = sanitize(card.title);
              const fallback = getProductFallbackDesc(cardTitle);
              const cardDesc = sanitize(card.description) || fallback.desc;
              const Icon = getProductIcon(cardTitle);
              const isHovered = hoveredCardIdx === idx;

              return (
                <div
                  key={card.id || idx}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  className={`group relative rounded-3xl p-7 sm:p-8 bg-white border transition-all duration-300 flex flex-col justify-between ${
                    isHovered
                      ? "border-purple-300 shadow-xl shadow-purple-950/10 -translate-y-1"
                      : "border-slate-200/80 shadow-xs hover:border-purple-200 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-[#623f99] flex items-center justify-center border border-purple-200/60 shadow-xs group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6 transition-colors" />
                      </div>
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-full group-hover:text-[#9a3f91] group-hover:border-purple-200 transition-colors">
                        {fallback.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                      {cardTitle}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {cardDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#7c3aed]">
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      Configure Product Flow
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 7: INTERACTIVE DIGITAL APPLICATION JOURNEY (Embedded Component)
      ────────────────────────────────────────────────────────────────────────── */}
      <DigitalApplicationJourney />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 8: 8-STEP END-TO-END WORKFLOW PIPELINE
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="workflow"
        aria-labelledby="workflow-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-y border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Workflow className="w-3.5 h-3.5 text-[#9a3f91]" />
              {workflowBadge}
            </span>
            <h2
              id="workflow-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
            >
              {workflowTitle}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              From lead capture to disbursal trigger, every milestone executes through high-speed event-driven microservices.
            </p>
          </div>

          {/* Stepper Timeline Navigation */}
          <div className="mb-12">
            <div className="overflow-x-auto pb-4 scrollbar-none">
              <div className="relative min-w-[760px] md:min-w-0">
                <div className="absolute top-5 left-6 right-6 h-[2.5px] bg-slate-200 z-0 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] rounded-full transition-all duration-500"
                    style={{
                      width: `${(activeStepIdx / Math.max(1, workflowSteps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-start justify-between relative z-10">
                  {workflowSteps.map((step: any, idx: number) => {
                    const isActive = idx === activeStepIdx;
                    const isPassed = idx < activeStepIdx;
                    const NodeIcon = getWorkflowIcon(step.title);
                    const cleanTitle = sanitize(step.title);

                    return (
                      <button
                        key={step.id || idx}
                        onClick={() => setActiveStepIdx(idx)}
                        className="flex flex-col items-center group focus:outline-none transition-all duration-300 flex-1 px-1 cursor-pointer"
                      >
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            isActive
                              ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white ring-4 ring-purple-200 shadow-lg shadow-purple-500/25 scale-110"
                              : isPassed
                              ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-sm"
                              : "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#623f99] group-hover:text-[#623f99] shadow-2xs"
                          }`}
                        >
                          <NodeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>

                        <span
                          className={`mt-3 text-[11px] sm:text-xs text-center leading-snug break-words max-w-[85px] transition-all duration-300 ${
                            isActive
                              ? "font-bold text-[#623f99] scale-105"
                              : isPassed
                              ? "font-semibold text-slate-800"
                              : "font-medium text-slate-500 group-hover:text-slate-900"
                          }`}
                        >
                          {cleanTitle}
                        </span>

                        <span className="text-[9.5px] font-mono text-slate-400 uppercase mt-0.5">
                          Step {idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active Step Showcase Card */}
          {activeStep && (
            <div className="max-w-4xl mx-auto rounded-3xl border border-purple-200/90 bg-white p-7 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

              <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-900/20">
                  <ActiveStepIcon className="w-8 h-8" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider text-[#9a3f91] uppercase">
                      Stage {activeStepIdx + 1} of {workflowSteps.length} • {activeStep.tag || "Automated Check"}
                    </span>
                    {activeStep.stat && (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                        {activeStep.stat}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {sanitize(activeStep.title)}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {sanitize(activeStep.description)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 9: TECHNOLOGY BENCHMARK (LosComparison)
      ────────────────────────────────────────────────────────────────────────── */}
      <LosComparison />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 10: ADDITIONAL DYNAMIC STRAPI SECTIONS
      ────────────────────────────────────────────────────────────────────────── */}
      {additionalSections.length > 0 && (
        <div id="additional-sections" className="space-y-0">
          {additionalSections.map((sec: any, idx: number) => (
            <div key={sec.id || `extra-los-${idx}`} className="section">
              <SectionRenderer
                section={sec}
                index={idx}
                solutionSlug="loan-origination-los"
              />
            </div>
          ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 11: INTERACTIVE FAQ SECTION (Strapi solution.faq_section)
      ────────────────────────────────────────────────────────────────────────── */}
      <section
        id="los-faq"
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

          {/* Accordion Stack (Mapped dynamically from Strapi) */}
          <div className="space-y-4">
            {faqList.map((faq: any, idx: number) => {
              const isOpen = openFaqIdx === idx;
              const question = sanitize(faq.question);
              const answer = sanitize(faq.answer);

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
          SECTION 12: BOTTOM CTA BANNER (ENTERPRISE DEPLOYMENT)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden">
        {/* Ambient Glows matching website images & theme */}
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
            Accelerate Your Loan Originations with{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              iFLOW Cloud LOS
            </span>
          </h2>

          <p className="text-purple-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Join leading banks, NBFCs, and fintech platforms cutting decision time to under 3 minutes while cutting operational costs by 45%. Schedule a live architecture walkthrough today.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
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

          {/* Quick Metrics / Compliance Trust Badges */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-purple-200/90 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Decision Time &lt; 3 Mins</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>80+ Pre-Built Fintech APIs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% RBI Digital Lending Compliant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
