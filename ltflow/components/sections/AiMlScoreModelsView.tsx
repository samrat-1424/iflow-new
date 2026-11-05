"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CountUp from "@/components/CountUp";

import SectionRenderer from "@/components/SectionRenderer";
import {
  BrainCircuit,
  Cpu,
  Layers,
  Workflow,
  ShieldCheck,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Lock,
  Server,
  TrendingUp,
  BarChart3,
  Database,
  Sliders,
  Check,
  ChevronDown,
  FileCheck,
  Eye,
  Scale,
  Binary,
  HelpCircle,
  LucideIcon,
  Zap,
  Target,
  FileText,
  Network,
  RotateCw,
  FolderKanban,
  Users,
} from "lucide-react";

interface AiMlScoreModelsViewProps {
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
    .trim();
}

/**
 * Parses markdown features into title and description
 */
/**
 * Extracts bullet points from Strapi features string (markdown or newline separated)
 */
function parseBulletPoints(text: string | null | undefined): string[] {
  if (!text) return [];
  return sanitize(text)
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter((line) => Boolean(line) && !line.startsWith("#"));
}

function parseFeatureMarkdown(
  text: string | null | undefined,
  defaultTitle: string = "",
  defaultDesc: string = ""
): { title: string; description: string } {
  if (!text) return { title: defaultTitle, description: defaultDesc };

  const clean = sanitize(text);
  const boldMatch = clean.match(/^\*\*(.*?)\*\*\s*([\s\S]*)$/);
  if (boldMatch) {
    return {
      title: boldMatch[1].trim(),
      description: boldMatch[2].trim(),
    };
  }

  const lines = clean.split("\n").filter(Boolean);
  if (lines.length > 1) {
    return {
      title: lines[0].replace(/^[-*#\s]+/, "").trim(),
      description: lines.slice(1).join(" ").trim(),
    };
  }

  return { title: clean, description: defaultDesc };
}

/**
 * Fallback metadata for 6 Business Value challenges
 */
const BUSINESS_VALUE_FALLBACKS = [
  {
    badge: "RISK & CAPITAL",
    icon: ShieldCheck,
    image: "/uploads/Optimized_risk_bf435ee882.png",
    metricLabel: "PORTFOLIO RISK",
    metric: "Up to 35% Lower NPA",
  },
  {
    badge: "DISTRIBUTION & REACH",
    icon: Users,
    image: "/uploads/Extend_reach_0feeb93744.png",
    metricLabel: "EFFICIENCY",
    metric: "3x Conversion Velocity",
  },
  {
    badge: "OPERATIONAL SPEED",
    icon: Zap,
    image: "/uploads/Faster_Disbursement_5d620dea14.png",
    metricLabel: "RESOLUTION",
    metric: "90% First-Touch AI",
  },
  {
    badge: "COLLECTION WORKFLOWS",
    icon: Workflow,
    image: "/uploads/zero_excuse_06387960cf.png",
    metricLabel: "RECOVERY",
    metric: "40% Faster Collections",
  },
  {
    badge: "OPERATIONAL VISIBILITY",
    icon: Eye,
    image: "/uploads/Go_live_8fb9b74087.png",
    metricLabel: "TELEMETRY",
    metric: "100% Real-Time Audit",
  },
  {
    badge: "GOVERNANCE & FAIR LENDING",
    icon: Scale,
    image: "/uploads/Business_handshake_in_a_store_setting_d6ce02ef81.png",
    metricLabel: "COMPLIANCE",
    metric: "RBI-Ready Explainability",
  },
];

/**
 * Fallback metadata for Policy Operationalised 3-Step Flow
 */
const POLICY_STEP_FALLBACKS = [
  {
    tag: "POLICY DEFINITION",
    icon: Sliders,
    footerNote: "No-Code Rule Authoring",
  },
  {
    tag: "DATA & MODEL EVALUATION",
    icon: Cpu,
    footerNote: "Real-Time Rule Execution",
  },
  {
    tag: "DECISION PRODUCTION",
    icon: CheckCircle2,
    footerNote: "Controlled Review Routing",
  },
];

/**
 * Group consecutive feature sections into cohesive multi-item sections
 */
function groupSections(rawSections: any[]): any[] {
  const result: any[] = [];
  let currentFeatureGroup: any[] = [];

  const flushFeatureGroup = () => {
    if (currentFeatureGroup.length === 0) return;
    if (currentFeatureGroup.length === 1) {
      result.push(currentFeatureGroup[0]);
    } else {
      const first = currentFeatureGroup[0];
      const isBusinessValue =
        String(first.badge || "").toLowerCase().includes("business value") ||
        String(first.title || "").toLowerCase().includes("challenge") ||
        currentFeatureGroup.length >= 4;

      const isStepFlow =
        !isBusinessValue &&
        (String(first.badge || "").toLowerCase().includes("policy") ||
         String(first.title || "").toLowerCase().includes("policy") ||
         currentFeatureGroup.length <= 3);

      result.push({
        __component: "grouped-feature-section",
        id: first.id || `grouped-${result.length}`,
        badge: first.badge,
        title: first.title,
        description: first.description,
        isBusinessValue,
        isStepFlow,
        items: currentFeatureGroup,
      });
    }
    currentFeatureGroup = [];
  };

  for (const sec of rawSections) {
    if (sec.__component === "solution.feature-section" || sec.__component === "sections.feature-showcase") {
      if (currentFeatureGroup.length > 0 && sec.badge && sec.title && sec.badge !== currentFeatureGroup[0].badge) {
        flushFeatureGroup();
      }
      currentFeatureGroup.push(sec);
    } else {
      flushFeatureGroup();
      result.push(sec);
    }
  }
  flushFeatureGroup();

  return result;
}

/**
 * Intelligently maps BRE capabilities to contextual icons
 */
function getBreCardIcon(title: string = "", description: string = ""): LucideIcon {
  const t = (title + " " + description).toLowerCase();
  if (t.includes("faster") || t.includes("speed") || t.includes("instant")) return Zap;
  if (t.includes("business-led") || t.includes("no-code") || t.includes("product") || t.includes("setup")) return Sliders;
  if (t.includes("standard") || t.includes("govern") || t.includes("compliance")) return ShieldCheck;
  if (t.includes("explain") || t.includes("xai") || t.includes("shap") || t.includes("inspect")) return Eye;
  if (t.includes("ai-assisted") || t.includes("model") || t.includes("analysis") || t.includes("ituring")) return BrainCircuit;
  if (t.includes("integration") || t.includes("api") || t.includes("connect") || t.includes("layer")) return Network;
  if (t.includes("evitar") || t.includes("voice") || t.includes("agent")) return Workflow;
  if (t.includes("iflow") || t.includes("platform") || t.includes("scoring")) return Layers;
  if (t.includes("parameter") || t.includes("variable") || t.includes("cibil")) return Binary;
  if (t.includes("rule") || t.includes("logic")) return Workflow;
  if (t.includes("accept") || t.includes("approv")) return CheckCircle2;
  if (t.includes("reject") || t.includes("fail")) return ShieldCheck;
  if (t.includes("underwrit") || t.includes("refer") || t.includes("manual")) return Eye;
  if (t.includes("maker") || t.includes("checker") || t.includes("control")) return Scale;
  if (t.includes("analytic") || t.includes("log") || t.includes("audit")) return BarChart3;
  return Sparkles;
}

/**
 * Tags model cards with metadata badges for quick comprehension
 */
function getModelMetadata(idx: number, name: string = ""): {
  tag: string;
  category: string;
  targetBorrower: string;
  latency: string;
  perfMetric: string;
  col1Label: string;
  col1Value: string;
  col2Label: string;
  col2Value: string;
  col3Label: string;
  col3Value: string;
} {
  const n = name.toLowerCase();
  if (n.includes("agent")) {
    return {
      tag: "AUTONOMOUS WORKFLOW AGENTS & DECISIONS",
      category: "Multi-Agent LLM Orchestrator",
      targetBorrower: "Origination & Loan Operations",
      latency: "< 120ms",
      perfMetric: "Workflow Automation",
      col1Label: "CORE CAPABILITY",
      col1Value: "Autonomous Multi-Agent Orchestration",
      col2Label: "KEY WORKFLOWS",
      col2Value: "Credit Decisions & Fraud Detection",
      col3Label: "OPERATIONAL IMPACT",
      col3Value: "Streamlined Lending Automation",
    };
  }
  if (n.includes("voice")) {
    return {
      tag: "REAL-TIME MULTILINGUAL VOICE AI",
      category: "Multilingual Speech & Sentiment AI",
      targetBorrower: "Borrower Engagement & Collections",
      latency: "< 150ms",
      perfMetric: "Conversational Speech",
      col1Label: "CORE CAPABILITY",
      col1Value: "Multilingual Conversational AI",
      col2Label: "KEY WORKFLOWS",
      col2Value: "Loan Recovery, Servicing & Reminders",
      col3Label: "OPERATIONAL IMPACT",
      col3Value: "Seamless Human Agent Handover",
    };
  }
  if (n.includes("generative") || n.includes("genai") || n.includes("document")) {
    return {
      tag: "FINANCIAL DOCUMENT INTELLIGENCE & OCR",
      category: "Multimodal Vision & Financial OCR",
      targetBorrower: "Underwriting & Credit Committees",
      latency: "< 180ms",
      perfMetric: "Document Intelligence",
      col1Label: "CORE CAPABILITY",
      col1Value: "Financial Document Intelligence & OCR",
      col2Label: "KEY WORKFLOWS",
      col2Value: "Application Summaries & Verification",
      col3Label: "OPERATIONAL IMPACT",
      col3Value: "High Accuracy & Minimal Manual Work",
    };
  }
  if (n.includes("credit score") || n.includes("risk")) {
    return {
      tag: "CORE DEFAULT PROBABILITY & SCORING",
      category: "Gradient Boosted Tree / Ensemble",
      targetBorrower: "Retail, MSME & Salaried",
      latency: "< 95ms",
      perfMetric: "Real-Time Scoring",
      col1Label: "CORE CAPABILITY",
      col1Value: "Borrower Behavior & Default Probability",
      col2Label: "KEY WORKFLOWS",
      col2Value: "Alternative & Traditional Data Ingestion",
      col3Label: "OPERATIONAL IMPACT",
      col3Value: "Instant Real-Time Lending Decisions",
    };
  }
  if (n.includes("bicri")) {
    return {
      tag: "MSME & COMMERCIAL INTELLIGENCE",
      category: "Bureau + GST Cashflow Vector",
      targetBorrower: "MSME & Sole Proprietorships",
      latency: "< 120ms",
      perfMetric: "Commercial Intelligence",
      col1Label: "CORE CAPABILITY",
      col1Value: "MSME & Commercial Intelligence",
      col2Label: "KEY WORKFLOWS",
      col2Value: "Bureau + GST Cashflow Vector",
      col3Label: "OPERATIONAL IMPACT",
      col3Value: "Holistic Credit Underwriting",
    };
  }
  return {
    tag: `AI SCORING ENGINE #${idx + 1}`,
    category: "Machine Learning Classifier",
    targetBorrower: "All Credit Profiles",
    latency: "< 100ms",
    perfMetric: "Intelligent Decisioning",
    col1Label: "CORE CAPABILITY",
    col1Value: "Advanced Machine Learning Model",
    col2Label: "KEY WORKFLOWS",
    col2Value: "Automated Credit Scoring",
    col3Label: "OPERATIONAL IMPACT",
    col3Value: "Real-time Decision Velocity",
  };
}

export default function AiMlScoreModelsView({ solution }: AiMlScoreModelsViewProps) {
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [breFilter, setBreFilter] = useState<string>("all");
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);

  // All dynamic sections from Strapi Content Manager (excluding only "AI Based BRE")
  const rawSections: any[] = (solution?.sections || []).filter((section: any) => {
    const isAiBasedBre = String(section.title || "").toLowerCase().includes("ai based bre");
    return !isAiBasedBre;
  });
  const sections = groupSections(rawSections);
  const faqData = solution?.faq_section || {};

  // ────────────────────────────────────────────────────────────────────────────
  // Strapi FAQs Data
  // ────────────────────────────────────────────────────────────────────────────
  const faqTitle = sanitize(faqData.title) || "Frequently Asked Questions";
  const dynamicFaqs: any[] = faqData.faqs || [];

  // ────────────────────────────────────────────────────────────────────────────
  // End-to-End Decisioning Pipeline Steps
  // ────────────────────────────────────────────────────────────────────────────
  const pipelineSteps = [
    {
      num: 1,
      name: "Multimodal Data Ingestion",
      tag: "INPUT AGGREGATION",
      desc: "Seamless ingestion of credit bureau records, Account Aggregator banking statements, GST filings, and verified borrower signals.",
      latency: "15ms",
      icon: Database,
    },
    {
      num: 2,
      name: "Real-Time Feature Engineering",
      tag: "FEATURE STORE",
      desc: "Transformation of raw financial and behavioral data into structured risk indicators, debt ratios, and cash-flow vectors.",
      latency: "25ms",
      icon: Binary,
    },
    {
      num: 3,
      name: "Parallel Ensemble ML Inference",
      tag: "MODEL EXECUTION",
      desc: "Concurrent execution across credit risk models, business health scoring, and behavioral models to evaluate applicant risk.",
      latency: "35ms",
      icon: BrainCircuit,
    },
    {
      num: 4,
      name: "BRE Policy Matrix & Cut-offs",
      tag: "RULE FILTERING",
      desc: "Execution of configurable policy rules, hard-knock knockouts, FOIR thresholds, and sanction band matrices with dual maker-checker governance.",
      latency: "10ms",
      icon: Workflow,
    },
    {
      num: 5,
      name: "Explainable AI (XAI) Audit Trail",
      tag: "COMPLIANCE & SHAP",
      desc: "Automated generation of SHAP/LIME top-contributing reason codes for regulatory adverse action notices and immutable audit logging.",
      latency: "5ms",
      icon: Scale,
    },
    {
      num: 6,
      name: "Instant Sanction & Payout Routing",
      tag: "DECISION OUTCOME",
      desc: "Webhook dispatch delivering Accept, Dynamic Limit, Interest Rate, or Refer-to-Underwriter outcome straight to LOS/LMS.",
      latency: "< 5ms",
      icon: Zap,
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────
  // JSON-LD Structured Data Schema for Rich Google SEO Snippets
  // ────────────────────────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "iFLOW AI Intelligent Suite & Business Rules Engine",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Cloud Native (AWS, Azure, Kubernetes)",
        "description":
          "Production-grade AI/ML credit scoring models and Business Rules Engine (BRE) delivering automated loan underwriting, alternative data ingestion, and explainable AI compliance.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
        },
      },
      ...(dynamicFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "mainEntity": dynamicFaqs.map((faq: any) => ({
                "@type": "Question",
                "name": sanitize(faq.question),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": sanitize(faq.answer),
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div id="platform-capabilities" className="w-full bg-white text-slate-900">
      {/* JSON-LD Schema for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION 1: EXECUTIVE OVERVIEW — Adaptive AI Decisioning Architecture
      ────────────────────────────────────────────────────────────────────────── */}
      <section 
        id="overview"
        aria-labelledby="overview-heading"
        className="relative py-20 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
              EXECUTIVE OVERVIEW
            </span>
            <h2 id="overview-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              AI Intelligent Suite: Adaptive Credit Underwriting Architecture
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Modernize underwriting with an end-to-end AI Intelligent Suite that automates alternative data ingestion, predictive risk evaluation, and credit policy rules seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: 3 Architectural Pillars */}
            <div className="lg:col-span-6 space-y-4">
              {/* Pillar 1 */}
              <div className="group rounded-2xl p-5 sm:p-6 bg-white border border-purple-100/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#623f99] border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors duration-300">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                      MULTIMODAL DATA INGESTION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      Alternative &amp; Behavioral Data Ingestion
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Synthesize traditional bureau scores with real-time Account Aggregator bank cashflows, GST invoicing, device telemetry, and utility records for comprehensive borrower profiling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-purple-50/70 via-white to-purple-50/40 border border-purple-200 shadow-md shadow-purple-900/5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                      INTELLIGENT SUITE ORCHESTRATION
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      Automated Real-Time Decision Engine
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Cloud-native microservices power the AI Intelligent Suite, executing credit policy checks and limit recommendations directly across digital onboarding journeys.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group rounded-2xl p-5 sm:p-6 bg-white border border-purple-100/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#623f99] border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors duration-300">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] font-bold text-[#9a3f91] uppercase tracking-wider block mb-1">
                      EXPLAINABLE AI &amp; GOVERNANCE
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      Explainable AI &amp; Regulatory Governance
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Transparent decisioning framework providing clear adverse action reason codes, risk factor weights, and auditable governance aligned with lending guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Architecture Graphic */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl border border-purple-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-purple-950/10 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />
                
                {/* Visual Pipeline Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#623f99] flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        iFLOW AI Intelligent Decision Mesh
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">
                        INTELLIGENT ARCHITECTURE
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Automated Workflow
                  </span>
                </div>

                {/* Stack Visualization */}
                <div className="py-6 space-y-3.5">
                  {/* Layer 1: Data Ingestion */}
                  <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono text-xs font-bold">
                        L1
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Omnichannel Data Layer
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Credit Bureaus + Account Aggregator + GST + Business Data
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      Ingestion
                    </span>
                  </div>

                  {/* Layer 2: Feature Store & AI Models */}
                  <div className="rounded-xl p-3.5 bg-gradient-to-r from-purple-50 via-purple-100/40 to-fuchsia-50 border border-purple-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#623f99] text-white flex items-center justify-center font-mono text-xs font-bold">
                        L2
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#623f99]">
                          AI Intelligent Suite Model Ensemble
                        </p>
                        <p className="text-[11px] text-slate-600">
                          Credit Risk + Business Assessment + Behavioral Intelligence
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#9a3f91] font-bold uppercase">
                      Inference
                    </span>
                  </div>

                  {/* Layer 3: Business Rules Engine */}
                  <div className="rounded-xl p-3.5 bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center font-mono text-xs font-bold">
                        L3
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Business Rules Engine (BRE)
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Configurable Policies + Custom Knockouts + Limit Rules
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      Policy
                    </span>
                  </div>

                  {/* Layer 4: Output & Audit */}
                  <div className="rounded-xl p-3.5 bg-emerald-50/70 border border-emerald-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                        L4
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-950">
                          Decision Output &amp; Audit Trail
                        </p>
                        <p className="text-[11px] text-emerald-700">
                          Automated Approvals, Referrals &amp; Comprehensive Audit Logging
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase">
                      Webhook
                    </span>
                  </div>
                </div>

                {/* Footer Badges */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold">Explainable AI (XAI)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
                    <span className="font-semibold">ISO 27001 &amp; SOC-2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          DYNAMIC STRAPI SECTIONS RENDERER (Renders all Strapi sections in order)
      ────────────────────────────────────────────────────────────────────────── */}
      {sections.map((section: any, sectionIdx: number) => {
        const compType = section.__component;

        // ──────────────────────────────────────────────────────────────────────
        // 1. PARTNERSHIP MODELS SECTION (AI Models Suite from Strapi)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.partnership-models-section" ||
          (section.models && section.models.length > 0)
        ) {
          const rawTitle = sanitize(section.title);
          const modelsTitle = rawTitle.includes("LoanTap")
            ? "iFLOW AI Intelligent Suite: Production Model Suite"
            : rawTitle || "iFLOW AI Intelligent Model Suite";
          const modelsDesc =
            sanitize(section.description) ||
            "Continuous, production-grade artificial intelligence models built for high-throughput automated credit decisioning:";
          const dynamicModels: any[] = section.models || [];
          const activeModel = dynamicModels[selectedModelIdx] || dynamicModels[0] || {};
          const activeModelBullets = parseBulletPoints(activeModel.features);
          const activeModelMeta = getModelMetadata(selectedModelIdx, activeModel.name);

          return (
            <React.Fragment key={section.id || `models-${sectionIdx}`}>
              <section 
                id="ai-model-suite"
                aria-labelledby={`models-heading-${sectionIdx}`}
                className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                      <BrainCircuit className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {sanitize(section.badge) || "PRODUCTION AI MODELS"}
                    </span>
                    <h2 id={`models-heading-${sectionIdx}`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {modelsTitle}
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {modelsDesc}
                    </p>
                  </div>

                  {/* Interactive Model Selector Tabs */}
                  <div 
                    className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10"
                    role="tablist"
                    aria-label="AI Credit Scoring Models Suite"
                  >
                    {dynamicModels.map((model: any, idx: number) => {
                      const isSelected = selectedModelIdx === idx;
                      const cleanName = sanitize(model.name || model.title || `Model ${idx + 1}`);
                      return (
                        <button
                          key={model.id || idx}
                          role="tab"
                          aria-selected={isSelected}
                          aria-controls={`model-panel-${idx}`}
                          id={`model-tab-${idx}`}
                          onClick={() => setSelectedModelIdx(idx)}
                          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-lg shadow-purple-900/20 scale-[1.02]"
                              : "bg-slate-50 border border-slate-200/80 text-slate-700 hover:border-purple-200 hover:bg-purple-50/40"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                          <span>{cleanName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Featured Active Model Showcase Card */}
                  {activeModel.name && (
                    <div 
                      role="tabpanel"
                      id={`model-panel-${selectedModelIdx}`}
                      aria-labelledby={`model-tab-${selectedModelIdx}`}
                      className="rounded-3xl border border-purple-200/90 bg-gradient-to-br from-white via-purple-50/20 to-white p-7 sm:p-10 shadow-2xl shadow-purple-950/5 relative overflow-hidden mb-14 transition-all duration-300 ease-in-out"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: Model Information & Features */}
                        <div className="lg:col-span-7 space-y-5">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100 text-[#623f99] text-xs font-mono font-bold uppercase tracking-wider border border-purple-200/60 shadow-2xs">
                              {activeModelMeta.tag}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              {activeModelMeta.perfMetric}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {sanitize(activeModel.name)}
                          </h3>

                          {activeModel.description && (
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                              {sanitize(activeModel.description)}
                            </p>
                          )}

                          {/* Features Checklist parsed from Strapi */}
                          <div className="space-y-3 pt-2">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                              KEY CAPABILITIES &amp; HIGHLIGHTS
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {activeModelBullets.map((bullet: string, bIdx: number) => (
                                <div
                                  key={bIdx}
                                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-purple-100/80 shadow-2xs"
                                >
                                  <div className="w-5 h-5 rounded-md bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  </div>
                                  <span className="text-xs sm:text-sm text-slate-700 leading-snug font-medium">
                                    {bullet}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Model Specification Meta Row - Updated with latest model content */}
                          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block tracking-wider">
                                {activeModelMeta.col1Label}
                              </span>
                              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5 block leading-snug">
                                {activeModelMeta.col1Value}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block tracking-wider">
                                {activeModelMeta.col2Label}
                              </span>
                              <span className="font-bold text-slate-800 text-xs sm:text-sm mt-0.5 block leading-snug">
                                {activeModelMeta.col2Value}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block tracking-wider">
                                {activeModelMeta.col3Label}
                              </span>
                              <span className="font-bold text-[#623f99] text-xs sm:text-sm mt-0.5 block leading-snug">
                                {activeModelMeta.col3Value}
                              </span>
                            </div>
                          </div>


                        </div>

                        {/* Right: Diagram Image from Strapi - 16:9 widescreen fit */}
                        <div className="lg:col-span-5 flex items-center justify-center">
                          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl border border-purple-200/90 bg-slate-900/5 shadow-xl shadow-purple-950/10 flex items-center justify-center group overflow-hidden">
                            {activeModel.diagram?.url ? (
                              <>
                                <Image
                                  src={toUrl(activeModel.diagram.url)}
                                  alt={`Architecture and workflow diagram for ${sanitize(activeModel.name)} AI credit scoring model`}
                                  fill
                                  priority
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  unoptimized
                                />

                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-center p-6 text-purple-400">
                                <BrainCircuit className="w-20 h-20 mb-3 animate-pulse text-[#623f99]" />
                                <span className="font-mono text-xs font-bold text-slate-700">
                                  {sanitize(activeModel.name)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Secondary 4-Card Overview Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dynamicModels.map((model: any, idx: number) => {
                      const isCurrent = selectedModelIdx === idx;
                      const bullets = parseBulletPoints(model.features);
                      const meta = getModelMetadata(idx, model.name);
                      const modelImg = model.diagram?.url ? toUrl(model.diagram.url) : null;

                      return (
                        <div
                          key={model.id || idx}
                          onClick={() => setSelectedModelIdx(idx)}
                          className={`group rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                            isCurrent
                              ? "border-[#623f99] bg-purple-50/40 shadow-lg shadow-purple-950/10 -translate-y-1 ring-2 ring-[#623f99]/20"
                              : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5"
                          }`}
                        >
                          <div>
                            {/* Card Top Image Frame */}
                            {modelImg && (
                              <div className="relative w-full aspect-[16/9] bg-slate-100 border-b border-slate-100 overflow-hidden">
                                <Image
                                  src={modelImg}
                                  alt={sanitize(model.name)}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  unoptimized
                                />

                              </div>
                            )}

                            <div className="p-5">
                              {!modelImg && (
                                <div className="flex items-center justify-between mb-4">
                                  <span className="font-mono text-[10px] font-bold text-[#9a3f91] uppercase">
                                    MODEL #{idx + 1}
                                  </span>
                                  <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                    {meta.latency}
                                  </span>
                                </div>
                              )}

                              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#623f99] transition-colors">
                                {sanitize(model.name)}
                              </h3>

                              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-2">
                                {bullets[0] || "Advanced artificial intelligence credit evaluation model."}
                              </p>
                            </div>
                          </div>

                          <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                            <span>{isCurrent ? "Active Selection" : "View Architecture"}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              
            </React.Fragment>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 2. COLLECTION CARDS (AI Based BRE or any Strapi cards collection)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.collection-cards" ||
          (section.cards && section.cards.length > 0)
        ) {
          const isAiBasedBre = String(section.title || "").toLowerCase().includes("ai based bre");
          if (isAiBasedBre) {
            return null;
          }

          const rawTitle = sanitize(section.title) || "Platform Capabilities";
          const cardDesc = sanitize(section.description);
          const cards: any[] = section.cards || [];

          if (cards.length === 0) {
            return null;
          }

          // Otherwise: Dynamic Custom Collection Cards added from Strapi (e.g. "sllssls")
          return (
            <section
              key={section.id || `custom-cards-${sectionIdx}`}
              className="relative py-20 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  {section.badge && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                      <FolderKanban className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {sanitize(section.badge)}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {rawTitle}
                  </h2>
                  {cardDesc && (
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {cardDesc}
                    </p>
                  )}
                </div>

                <div className={`grid gap-6 sm:gap-8 ${
                  cards.length === 1
                    ? "max-w-xl mx-auto grid-cols-1"
                    : cards.length === 2
                    ? "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {cards.map((card: any, cIdx: number) => {
                    const cTitle = sanitize(card.title);
                    const cDesc = sanitize(card.description);
                    const cIconUrl = card.icon?.url ? toUrl(card.icon.url) : (card.image?.url ? toUrl(card.image.url) : null);
                    const CardIcon = getBreCardIcon(card.title, card.description);

                    return (
                      <div
                        key={card.id || cIdx}
                        className="group relative rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div
                          className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        <div>
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 text-[#623f99] flex items-center justify-center border border-purple-200/60 shadow-2xs mb-6 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 overflow-hidden p-2.5">
                            {cIconUrl ? (
                              <Image
                                src={cIconUrl}
                                alt={`${cTitle} icon`}
                                width={40}
                                height={40}
                                className="object-contain"
                                unoptimized
                              />
                            ) : (
                              <CardIcon className="w-6 h-6 transition-colors" />
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                            {cTitle}
                          </h3>

                          {cDesc && (
                            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                              {cDesc}
                            </p>
                          )}
                        </div>

                        {card.button_text && (
                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                            <span>{card.button_text}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
                // ──────────────────────────────────────────────────────────────────────
        // 3. GROUPED FEATURE SECTIONS (Business Value Cards & Operational Workflow)
        // ──────────────────────────────────────────────────────────────────────
        if (compType === "grouped-feature-section") {
          const gBadge = sanitize(section.badge);
          const gTitle = sanitize(section.title);
          const gDesc = sanitize(section.description);
          const isBusinessValue = section.isBusinessValue;

          if (isBusinessValue) {
            return (
              <section
                key={section.id || `grouped-${sectionIdx}`}
                className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                      <Target className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {gBadge || "BUSINESS VALUE"}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {gTitle || "Designed for Real Financial Services Challenges"}
                    </h2>
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {gDesc ||
                        "How leading financial institutions deploy production AI and explainable rules to improve credit decisioning, operational velocity, and governance at scale."}
                    </p>
                  </div>

                  {/* Business Value Cards Grid (3 Columns, Exactly matching Co-Lending Section 2 / user screenshot) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items.map((it: any, i: number) => {
                      const parsed = parseFeatureMarkdown(it.features, it.title, it.description);
                      const fallback = BUSINESS_VALUE_FALLBACKS[i % BUSINESS_VALUE_FALLBACKS.length];
                      const itemTitle = (sanitize(it.title) && sanitize(it.title) !== gTitle && !sanitize(it.title).toLowerCase().includes("challenge"))
                        ? sanitize(it.title)
                        : (parsed.title || sanitize(it.title));
                      const itemDesc = sanitize(it.description) || parsed.description;
                      const itemImg = it.image?.url ? toUrl(it.image.url) : toUrl(fallback.image);
                      const metricLabel = it.metricLabel || fallback.metricLabel;
                      const metric = it.metric || fallback.metric;

                      return (
                        <div
                          key={it.id || i}
                          className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300"
                        >
                          <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                          {/* Top Graphic / Image Frame */}
                          <div className="relative w-full aspect-[4/3] bg-slate-100 border-b border-slate-100 overflow-hidden">
                            <Image
                              src={itemImg}
                              alt={itemTitle}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              unoptimized
                            />
                          </div>

                          {/* Body Content */}
                          <div className="p-7 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                                {itemTitle}
                              </h3>
                              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                                {itemDesc}
                              </p>
                            </div>

                            {/* Metric Highlight Box */}
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                                  {metricLabel}
                                </span>
                                <span className="text-sm sm:text-base font-bold text-[#0a1f44] tracking-tight">
                                  {metric}
                                </span>
                              </div>
                              <div className="w-9 h-9 rounded-full bg-purple-50 text-[#623f99] flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-colors">
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

          // Operational Policy Step Flow (Sections 2-4)
          return (
            <section
              key={section.id || `grouped-${sectionIdx}`}
              className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                    <Workflow className="w-3.5 h-3.5 text-[#9a3f91]" />
                    {gBadge || "POLICY, OPERATIONALISED"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {gTitle || "Turn Credit Policy Into Configurable Decision Logic"}
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                    {gDesc ||
                      "From initial policy parameterization to automated rule evaluation and controlled decision production."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {section.items.map((it: any, i: number) => {
                    const parsed = parseFeatureMarkdown(it.features, it.title, it.description);
                    const fallback = POLICY_STEP_FALLBACKS[i % POLICY_STEP_FALLBACKS.length];
                    const itemTitle = (sanitize(it.title) && sanitize(it.title) !== gTitle)
                      ? sanitize(it.title)
                      : (parsed.title || sanitize(it.title));
                    const itemDesc = sanitize(it.description) || parsed.description;
                    const StepIcon = fallback.icon;

                    return (
                      <div
                        key={it.id || i}
                        className="group relative rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:border-purple-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/80 text-[#623f99] flex items-center justify-center border border-purple-200/60 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 shadow-2xs">
                              <StepIcon className="w-5 h-5" />
                            </div>
                            <span className="font-mono text-[11px] font-bold text-[#9a3f91] px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100">
                              STEP 0{i + 1}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                            {fallback.tag}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                            {itemTitle}
                          </h3>
                          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
                            {itemDesc}
                          </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                          <span>{fallback.footerNote}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // 4. FEATURE SECTION (Dynamic Feature Showcase added from Strapi)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.feature-section" ||
          compType === "sections.feature-showcase"
        ) {
          const fTitle = sanitize(section.title);
          const fDesc = sanitize(section.description);
          const fBadge = sanitize(section.badge);
          const fImage = section.image?.url ? toUrl(section.image.url) : null;
          const bullets = parseBulletPoints(section.features);
          const isAlternating = sectionIdx % 2 !== 0;

          return (
            <section
              key={section.id || `feature-${sectionIdx}`}
              className={`relative py-20 px-6 sm:px-8 lg:px-16 border-b border-purple-100/70 overflow-hidden ${
                isAlternating ? "bg-[#faf8fd]" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                {/* Header if standalone */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                  {fBadge && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                      {fBadge}
                    </span>
                  )}
                  {fTitle && (
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {fTitle}
                    </h2>
                  )}
                  {fDesc && (
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                      {fDesc}
                    </p>
                  )}
                </div>

                <div className={`grid grid-cols-1 ${fImage ? "lg:grid-cols-12 gap-10 lg:gap-14" : "max-w-4xl mx-auto"} items-center`}>
                  {/* Left Column (or full width if no image) */}
                  <div className={fImage ? "lg:col-span-6 space-y-4" : "space-y-4"}>
                    {bullets.length > 0 ? (
                      <div className="space-y-3">
                        {bullets.map((bullet: string, bIdx: number) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-purple-100/80 shadow-2xs"
                          >
                            <div className="w-6 h-6 rounded-lg bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <span className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : section.features ? (
                      <div className="prose prose-slate max-w-none text-slate-600 text-base leading-relaxed bg-white p-6 rounded-2xl border border-purple-100/80">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {section.features}
                        </ReactMarkdown>
                      </div>
                    ) : null}
                  </div>

                  {/* Right Column: High-Res Graphic Frame from Strapi */}
                  {fImage && (
                    <div className="lg:col-span-6">
                      <div className="relative rounded-3xl border border-purple-200/90 bg-white p-4 sm:p-6 shadow-2xl shadow-purple-950/10 overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />
                        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                          <Image
                            src={fImage}
                            alt={fTitle ? `${fTitle} overview and technical workflow interface` : "iFLOW Platform Feature"}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 4. WORKFLOW SECTION (Dynamic Stepper from Strapi)
        // ──────────────────────────────────────────────────────────────────────
        if (
          compType === "solution.workflow-section" ||
          (section.steps && section.steps.length > 0)
        ) {
          return (
            <div key={section.id || `wf-${sectionIdx}`}>
              <SectionRenderer section={section} index={sectionIdx} solutionSlug="ai-intelligent-suite" />
            </div>
          );
        }

        // ──────────────────────────────────────────────────────────────────────
        // 5. SUCCESS STATS / CUSTOMER SUCCESS / ANY OTHER STRAPI COMPONENT
        // ──────────────────────────────────────────────────────────────────────
        return (
          <div key={section.id || `sec-${sectionIdx}`}>
            <SectionRenderer section={section} index={sectionIdx} solutionSlug="ai-intelligent-suite" />
          </div>
        );
      })}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: 6-STEP DECISIONING LIFECYCLE (Interactive Stepper Pipeline)
      ────────────────────────────────────────────────────────────────────────── */}
      <section 
        id="underwriting-lifecycle"
        aria-labelledby="lifecycle-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-[#9a3f91]" />
              UNDERWRITING LIFECYCLE
            </span>
            <h2 id="lifecycle-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              6-Step AI Decisioning Pipeline, Fully Automated
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              From raw telemetry intake to straight-through sanction, every stage executes through event-driven, low-latency microservices.
            </p>
          </div>

          {/* Stepper Node Navigation */}
          <div className="mb-12">
            <div className="overflow-x-auto pb-4 scrollbar-none">
              <div className="relative min-w-[700px] md:min-w-0">
                {/* Connecting Track */}
                <div className="absolute top-5 left-6 right-6 h-[2.5px] bg-slate-200 z-0 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] rounded-full transition-all duration-500"
                    style={{
                      width: `${(activeStepIdx / Math.max(1, pipelineSteps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {/* Step Nodes */}
                <div className="flex items-start justify-between relative z-10">
                  {pipelineSteps.map((step, idx) => {
                    const isActive = idx === activeStepIdx;
                    const isPassed = idx < activeStepIdx;
                    const StepIcon = step.icon;

                    return (
                      <button
                        key={step.num}
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
                          <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>

                        <span
                          className={`mt-3 text-[11px] sm:text-xs text-center leading-snug break-words max-w-[90px] transition-all duration-300 ${
                            isActive
                              ? "font-bold text-[#623f99] scale-105"
                              : isPassed
                              ? "font-semibold text-slate-800"
                              : "font-medium text-slate-500 group-hover:text-slate-900"
                          }`}
                        >
                          {step.name}
                        </span>

                        <span className="text-[9.5px] font-mono text-slate-400 uppercase mt-0.5">
                          Step {step.num}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active Step Details Showcase */}
          {pipelineSteps[activeStepIdx] && (
            <div className="max-w-4xl mx-auto rounded-3xl border border-purple-200/90 bg-gradient-to-br from-white via-purple-50/20 to-white p-7 sm:p-10 shadow-xl shadow-purple-950/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

              <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-900/20">
                  {React.createElement(pipelineSteps[activeStepIdx].icon, { className: "w-8 h-8" })}
                </div>

                <div className="flex-1 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#623f99] text-xs font-mono font-bold uppercase tracking-wider">
                      {pipelineSteps[activeStepIdx].tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Automated Step
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {pipelineSteps[activeStepIdx].name}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {pipelineSteps[activeStepIdx].desc}
                  </p>

                  {/* Step Navigation Controls */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs sm:text-sm">
                    <button
                      onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
                      disabled={activeStepIdx === 0}
                      className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-xl border transition-colors ${
                        activeStepIdx === 0
                          ? "opacity-40 cursor-not-allowed border-slate-200 text-slate-400"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                      }`}
                    >
                      <span>&larr; Previous Step</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveStepIdx((prev) => Math.min(pipelineSteps.length - 1, prev + 1))
                      }
                      disabled={activeStepIdx === pipelineSteps.length - 1}
                      className={`inline-flex items-center gap-1 font-semibold px-4 py-2 rounded-xl transition-all ${
                        activeStepIdx === pipelineSteps.length - 1
                          ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                          : "bg-[#623f99] text-white hover:bg-[#4d3179] shadow-sm cursor-pointer"
                      }`}
                    >
                      <span>Next Step &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: SCALE & PORTFOLIO IMPACT BY THE NUMBERS
      ────────────────────────────────────────────────────────────────────────── */}
      <section 
        id="capabilities-overview" 
        aria-labelledby="capabilities-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-[#faf8fd] border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
              CORE ARCHITECTURAL PILLARS
            </span>
            <h2 id="capabilities-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Key Capabilities of the AI Intelligent Suite
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Modular lending architecture engineered to help financial institutions automate underwriting, enhance credit quality, and streamline risk assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="rounded-3xl border border-purple-200/80 bg-white p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Multivariate Risk Scoring
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Combines traditional credit bureau records with banking statements and cash-flow data for accurate borrower profiling.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-200/80 bg-white p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 text-[#9a3f91] flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Automated Decisioning
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Streamlined rule evaluation and automated decision execution enable faster loan turnaround times across digital channels.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-200/80 bg-white p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Proactive Risk Management
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Continuous portfolio surveillance and early indicator tracking help credit teams identify emerging risks early.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-200/80 bg-white p-7 text-center shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 text-[#9a3f91] flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Modular Cloud Architecture
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Flexible, cloud-native microservices designed to scale effortlessly as your lending operations expand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: RESPONSIBLE AI, GOVERNANCE & SECURITY
      ────────────────────────────────────────────────────────────────────────── */}
      <section 
        id="governance"
        aria-labelledby="governance-heading"
        className="relative py-24 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
              ETHICAL AI &amp; GOVERNANCE
            </span>
            <h2 id="governance-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Bank-Grade Compliance, Fair Lending &amp; Explainable AI
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Engineered from the ground up for strict regulatory auditability, demographic fairness, and enterprise security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center mb-5">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Explainable AI (XAI)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every decision delivers granular SHAP (SHapley Additive exPlanations) values identifying the exact features influencing risk ratings, empowering underwriters and fulfilling adverse notice mandates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono font-bold text-[#623f99]">
                SHAP &amp; LIME INTEGRATION
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#9a3f91] flex items-center justify-center mb-5">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Zero-Trust Data Protection
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hardware Security Module (HSM) encryption, AES-256 for data at rest, and TLS 1.3 in transit. Borrower telemetry is never co-mingled across multi-tenant partner instances.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono font-bold text-[#9a3f91]">
                ISO 27001 &amp; SOC-2 TYPE II
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7c3aed] flex items-center justify-center mb-5">
                  <RotateCw className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Continuous Bias Monitoring
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Automated auditing routines test for disparate impact and demographic parity, ensuring models assess purely objective creditworthiness free of bias.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono font-bold text-[#7c3aed]">
                FAIR LENDING ALIGNMENT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: FAQS (Dynamically extracted from Strapi)
      ────────────────────────────────────────────────────────────────────────── */}
      {dynamicFaqs.length > 0 && (
        <section 
          id="faqs"
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
              {dynamicFaqs.map((faq: any, idx: number) => {
                const isOpen = openFaqIdx === idx;
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
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SECTION: STRATEGIC ENTERPRISE CALL TO ACTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#3B1259] via-[#501c78] to-[#2d0b47] text-white overflow-hidden">
                {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7c3aed]/20 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 w-96 h-96 rounded-full bg-[#e51ede]/15 blur-[140px]"
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase border border-white/15">
            <Zap className="w-3.5 h-3.5 text-purple-300" />
            ENTERPRISE DEPLOYMENT
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Supercharge Your Credit Underwriting with{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              AI Intelligent Suite?
            </span>
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Schedule a confidential technical briefing and sandbox demonstration with our quantitative credit modeling engineers.
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all duration-300"
            >
              <span>Explore All Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
