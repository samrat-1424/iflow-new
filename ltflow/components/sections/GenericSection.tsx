"use client";

import { useState } from "react";
import { Container } from "@/components/reuse/container";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CountUp from "@/components/CountUp";
import {
  Sparkles,
  TrendingUp,
  Cpu,
  RotateCw,
  Globe,
  FileCheck,
  ChevronDown,
  BarChart3,
  FileText,
  Eye,
  Brain,
  CheckCircle2,
  GitFork,
  Coins,
  CreditCard,
  RefreshCw,
  Activity,
  Workflow,
  Upload,
  ShieldCheck,
  Target,
  Search,
  Database,
  PieChart,
  Smartphone,
  Building,
  ArrowRight,
  ArrowDown,
  Plus,
  Minus
} from "lucide-react";

interface GenericSectionProps {
  data: any;
  layoutType?: "grid" | "stats" | "tabs" | "hexagon-tabs" | "three-column" | "two-column" | "bicri" | "showcase" | "faq" | "modern-cards" | "architecture" | "workflow" | "customer-success" | "data-ecosystem";
  bgColor?: string;
  textColor?: string;
  useIconStyle?: boolean;
  index?: number;
  solutionSlug?: string;
}

const getCoLendingIcon = (title: string) => {
  const t = (title || "").toLowerCase();
  if (t.includes("priority sector") || t.includes("compliance")) return TrendingUp;
  if (t.includes("credit decisioning") || t.includes("ai credit")) return Cpu;
  if (t.includes("settlement")) return RotateCw;
  if (t.includes("partnership")) return Globe;
  if (t.includes("origination") || t.includes("paperless")) return FileCheck;
  if (t.includes("analytics")) return BarChart3;
  return null;
};

const getCardIcon = (title: string = "", description: string = "") => {
  const text = (title + " " + description).toLowerCase();
  if (text.includes("credit") || text.includes("decision") || text.includes("underwrit") || text.includes("intelligence")) {
    return Brain;
  }
  if (text.includes("co-lend") || text.includes("infrastructure")) {
    return GitFork;
  }
  if (text.includes("digitise") || text.includes("dsa") || text.includes("distribution") || text.includes("partner")) {
    return Globe;
  }
  if (text.includes("automat") || text.includes("operation") || text.includes("digital lending") || text.includes("process")) {
    return Cpu;
  }
  if (text.includes("collection") || text.includes("reconcil") || text.includes("repay")) {
    return RefreshCw;
  }
  if (text.includes("scale lending") || text.includes("growth") || text.includes("technology") || text.includes("scale")) {
    return TrendingUp;
  }
  if (text.includes("risk") || text.includes("complian") || text.includes("audit") || text.includes("security")) {
    return ShieldCheck;
  }
  if (text.includes("disburs") || text.includes("card") || text.includes("pay")) {
    return CreditCard;
  }
  if (text.includes("analytics") || text.includes("report") || text.includes("stat")) {
    return BarChart3;
  }
  return Brain;
};

const getPoolBuyoutIcon = (title: string) => {
  const t = (title || "").toLowerCase();
  if (t.includes("expansion")) return TrendingUp;
  if (t.includes("capital") || t.includes("optimization")) return Coins;
  if (t.includes("liquidity")) return RefreshCw;
  if (t.includes("growth")) return Target;
  if (t.includes("efficiency") || t.includes("operational")) return Cpu;
  if (t.includes("diversification") || t.includes("risk")) return ShieldCheck;
  if (t.includes("upload") || t.includes("import")) return Upload;
  if (t.includes("validation") || t.includes("check")) return ShieldCheck;
  if (t.includes("eligibility") || t.includes("rule")) return Target;
  if (t.includes("diligence") || t.includes("audit")) return Search;
  if (t.includes("valuation") || t.includes("irr") || t.includes("pricing")) return BarChart3;
  if (t.includes("assignment") || t.includes("transfer") || t.includes("legal")) return FileText;
  if (t.includes("migration") || t.includes("onboarding")) return Database;
  if (t.includes("collection") || t.includes("nach")) return RotateCw;
  if (t.includes("reporting") || t.includes("dashboard")) return PieChart;
  return Globe;
};

const getWorkflowIcon = (title: string) => {
  const t = (title || "").toLowerCase();
  if (t.includes("application")) return FileText;
  if (t.includes("kyc")) return Eye;
  if (t.includes("credit") || t.includes("assessment") || t.includes("underwriting")) return Brain;
  if (t.includes("approval")) return CheckCircle2;
  if (t.includes("split") || t.includes("funding")) return GitFork;
  if (t.includes("disbursement")) return Coins;
  if (t.includes("collection")) return CreditCard;
  if (t.includes("settlement")) return RefreshCw;
  if (t.includes("monitoring") || t.includes("analytics")) return Activity;
  return Workflow;
};

const getArchitectureIcon = (label: string) => {
  const l = (label || "").toLowerCase();
  if (l.includes("selling") || l.includes("seller")) return Globe;
  if (l.includes("upload")) return Upload;
  if (l.includes("platform") || l.includes("iflow")) return Cpu;
  if (l.includes("validation")) return ShieldCheck;
  if (l.includes("diligence")) return Search;
  if (l.includes("assignment")) return FileText;
  if (l.includes("buyer")) return Coins;
  if (l.includes("collection")) return RotateCw;
  if (l.includes("analytics") || l.includes("dashboard")) return BarChart3;

  // Co-Lending specific labels
  if (l.includes("borrower")) return Smartphone;
  if (l.includes("bank")) return Building;
  if (l.includes("nbfc") || l.includes("hfc")) return Coins;
  if (l.includes("core banking") || l.includes("cbs")) return Database;
  if (l.includes("api") || l.includes("third-party")) return Workflow;

  return Globe; // fallback
};

const getStatIcon = (label: string) => {
  const l = (label || "").toLowerCase();
  if (l.includes("partner") || l.includes("lender")) return Building;
  if (l.includes("portfolio") || l.includes("₹") || l.includes("cr") || l.includes("loan")) return Coins;
  if (l.includes("api") || l.includes("integration") || l.includes("system")) return Workflow;
  if (l.includes("uptime") || l.includes("platform") || l.includes("availability")) return Activity;
  return BarChart3;
};

export default function GenericSection({
  data,
  layoutType = "grid",
  bgColor = "bg-white",
  textColor = "text-gray-900",
  useIconStyle = false,
  index = 0,
  solutionSlug,
}: GenericSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!data) return null;

  // Utility: Extract image URL from various Strapi formats
  const getImageUrl = (imageData: any): string | null => {
    if (!imageData) return null;
    if (typeof imageData === "string") return imageData;
    if (imageData.url) return imageData.url;
    if (imageData.data) {
      if (Array.isArray(imageData.data)) {
        return imageData.data[0]?.attributes?.url || null;
      }
      return imageData.data.attributes?.url || null;
    }
    return null;
  };

  // Utility: Parse features from markdown or array
  const parseFeatures = (features: any): string[] => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === "string") {
      return features
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => line.replace(/^[\*\-]\s*\*?\*?/, "").trim())
        .filter((line) => line.length > 0);
    }
    return [];
  };

  // Utility: Parse numeric value, currency prefix, and unit suffix for stats
  const parseStatValue = (val: string) => {
    if (!val) return { prefix: "", numericValue: 0, suffix: "", hasNumeric: false };
    // Strip ₹ symbol completely as requested
    const raw = val.replace(/₹/g, "").trim();

    // Detect other currency symbols if present
    let prefix = "";
    if (raw.includes("$")) prefix = "$";
    else if (raw.includes("€")) prefix = "€";
    else if (raw.includes("£")) prefix = "£";

    // Find the number in raw string (including commas and decimals e.g. 50,000 or 50000)
    const rawNumMatch = raw.match(/[\d,.]+/);
    if (!rawNumMatch) {
      return { prefix: "", numericValue: 0, suffix: raw, hasNumeric: false };
    }

    const numStr = rawNumMatch[0];
    const numericValue = parseFloat(numStr.replace(/,/g, "")) || 0;

    // Extract suffix: characters after number
    const numEndIdx = raw.indexOf(numStr) + numStr.length;
    let suffix = raw.substring(numEndIdx).replace(/[$€£]/g, "").trim();

    // If suffix starts with alphabetic characters (like "Cr+"), add a space before it
    if (suffix && /^[A-Za-z]/.test(suffix)) {
      suffix = " " + suffix;
    }

    // If prefix wasn't set by symbol, check before number
    if (!prefix) {
      const beforeNum = raw.substring(0, raw.indexOf(numStr)).replace(/[$€£]/g, "").trim();
      if (beforeNum) prefix = beforeNum + " ";
    }

    return { prefix, numericValue, suffix, hasNumeric: numericValue > 0 };
  };

  // Utility: Render markdown with custom styling
  const renderMarkdown = (content: string, highlightColor = "text-purple-600") => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <>{children}</>,
        strong: ({ children }) => <span className={highlightColor}>{children}</span>,
      }}
    >
      {content}
    </ReactMarkdown>
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_IMG_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://cms.ltflow.com"
      : "http://localhost:1337");
  const toFullUrl = (url: string | null | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // LAYOUT: Stats Section
  if (layoutType === "stats") {
    const stats = data.stats || [];
    return (
      <section className={`py-16 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {(data.badge || solutionSlug === "collection") && (
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-100/30">
                {data.badge}
              </span>
            </div>
          )}
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${data.description ? 'mb-6' : 'mb-10'} text-center ${textColor}`}>
            {data.title}
          </h2>
          {data.description && (
            <p className="text-left text-gray-600 mb-10 max-w-3xl mx-auto">{data.description}</p>
          )}
          <div className={`grid grid-cols-2 gap-6 md:gap-8 ${stats.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
              stats.length === 3 ? 'md:grid-cols-3 lg:grid-cols-3' :
                stats.length === 2 ? 'md:grid-cols-2 lg:grid-cols-2' :
                  stats.length === 1 ? 'md:grid-cols-1 lg:grid-cols-1' :
                    'md:grid-cols-3 lg:grid-cols-5'
            }`}>
            {stats.map((stat: any, idx: number) => {
              const { prefix, numericValue, suffix, hasNumeric } = parseStatValue(stat.value);
              const Icon = getStatIcon(stat.label);

              return (
                <div key={stat.id || idx} className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 min-h-[200px] sm:min-h-[220px]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-purple-100/50 flex-shrink-0">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                  </div>
                  
                  {/* Fixed height number container to prevent layout shifts during counting */}
                  <div className="min-h-[48px] sm:min-h-[56px] flex items-center justify-center mb-2 w-full">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-center whitespace-nowrap flex items-center justify-center gap-x-0.5">
                      {hasNumeric ? (
                        <>
                          {prefix && <span className="text-purple-600">{prefix}</span>}
                          <CountUp end={numericValue} duration={2000} />
                          {suffix && <span className="text-slate-900">{suffix}</span>}
                        </>
                      ) : (
                        stat.value
                      )}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Tabs Section — original pill-button style (co-lending, etc.)
  if (layoutType === "tabs") {
    const models = data.models || [];
    const activeModel = models[activeTab];

    return (
      <section className={`py-24 ${bgColor} ${textColor}`}>
        <div className="w-full px-4 sm:px-6 lg:px-16 text-center">
          {data.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-semibold uppercase tracking-wider mb-2">
              {data.badge}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-4">{data.title}</h2>
          {data.description && <p className="mt-4 text-purple-100/80 max-w-4xl mx-auto">{data.description}</p>}

          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            {models.map((model: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                  activeTab === idx
                    ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white border-transparent shadow-lg shadow-purple-950/40"
                    : "border-purple-300/30 text-purple-200/80 hover:text-white hover:border-purple-300/60"
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>

          {activeModel && (
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-white">{activeModel.title}</h3>
                  <p className="mt-4 text-purple-100/75 leading-relaxed">{activeModel.description}</p>
                  {activeModel.features && (
                    <ul className="mt-6 space-y-2.5">
                      {parseFeatures(activeModel.features).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-purple-100/90">
                          <span className="text-purple-300 mt-1 font-bold">✔</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  {(activeModel.image || activeModel.diagram) ? (
                    <div className="relative w-full aspect-square max-w-[420px] rounded-full overflow-hidden border-8 border-white/10 shadow-2xl bg-white flex items-center justify-center p-8 mx-auto group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none"></div>
                      <Image
                        src={toFullUrl(getImageUrl(activeModel.image || activeModel.diagram))}
                        alt={activeModel.title || "Partnership Model"}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[400px] bg-purple-700/30 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">No image available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // LAYOUT: Hexagon Tabs (Distribution solution only)
  if (layoutType === "hexagon-tabs") {
    const models = data.models || [];
    const activeModel = models[activeTab];
    const features = activeModel ? parseFeatures(activeModel.features) : [];

    // Distribute features across up to 4 columns
    const NUM_COLS = Math.min(4, features.length || 1);
    const columns: string[][] = Array.from({ length: NUM_COLS }, () => []);
    features.forEach((f, i) => columns[i % NUM_COLS].push(f));
    const nonEmptyCols = columns.filter((c) => c.length > 0);

    return (
      <section className="pt-8 pb-10 bg-white relative overflow-hidden">
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
            {Array.from({ length: 28 }).map((_, i) => (
              <line
                key={i}
                x1={-250 + i * 55} y1="0"
                x2={100 + i * 55} y2="600"
                stroke="#ed3bf6ff" strokeWidth="1" opacity="0.12"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
          {/* Title & Description */}
          {data.badge && (
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              {data.badge}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-4 uppercase tracking-wide">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg">{data.description}</p>
          )}

          {/* Hexagon Tabs */}
          <div className="flex items-end justify-center gap-4 md:gap-14" style={{ minHeight: "220px" }}>
            {models.map((model: any, idx: number) => {
              const isActive = idx === activeTab;
              const W = 160;
              const H = Math.round(W * 1.12);

              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className="flex flex-col items-center focus:outline-none"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {/* Hexagon */}
                  <div
                    style={{
                      width: W,
                      height: H,
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      background: isActive
                        ? "linear-gradient(135deg, #6a0d8fff, rgba(146, 17, 238, 1))"
                        : "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      transform: isActive ? "scale(1)" : "scale(0.8)",
                      transformOrigin: "center",
                    }}
                  >
                    <span
                      style={{
                        color: isActive ? "white" : "#b01ab0ff",
                        fontWeight: 700,
                        fontSize: 16,
                        textAlign: "center",
                        padding: "0 18px",
                        lineHeight: 1.3,
                      }}
                    >
                      {model.name}
                    </span>
                  </div>

                  {/* Downward triangle */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: `${W * 0.14}px solid transparent`,
                      borderRight: `${W * 0.14}px solid transparent`,
                      borderTop: `${W * 0.11}px solid ${isActive ? "#8f0d8fff" : "#e5e7eb"}`,
                      transition: "all 0.3s ease",
                      transform: isActive ? "scale(1)" : "scale(0.8)",
                      transformOrigin: "top center",
                    }}
                  />

                  {/* Stand base */}
                  <div
                    style={{
                      width: W * 0.38,
                      height: 9,
                      background: isActive ? "#8b0d8fff" : "#d1d5db",
                      borderRadius: 4,
                      transition: "all 0.3s ease",
                      transform: isActive ? "scale(1)" : "scale(0.8)",
                      transformOrigin: "top center",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Features grid - Fixed height container */}
          <div
            style={{
              minHeight: "300px",
              marginTop: "32px",
            }}
          >
            {nonEmptyCols.length > 0 && (
              <div
                className="rounded-3xl overflow-hidden h-full"
                style={{
                  background: "linear-gradient(135deg, #750d80ff 0%, #c015b2ff 55%, #e51edeff 100%)",
                }}
              >
                <div
                  className="grid divide-x divide-purple-400/30 h-full"
                  style={{ gridTemplateColumns: `repeat(${nonEmptyCols.length}, 1fr)` }}
                >
                  {nonEmptyCols.map((col, ci) => (
                    <div key={ci} className="divide-y divide-purple-400/30">
                      {col.map((item, ii) => (
                        <div key={ii} className="py-5 px-4 text-white text-sm text-center">
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Three Column (BNPL style....distribution,bnpl)
  if (layoutType === "three-column") {
    const imageUrl = getImageUrl(data.image);

    return (
      <section className={`pt-40 pb-8 lg:pb-12 ${bgColor} ${textColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="mb-20 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center max-w-xl mx-auto leading-[1.2]">
              {data.title && renderMarkdown(data.title, "text-[#9a3f91]")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-x-8 gap-y-16 items-start">
            {/* Left side (Features 1 & 2) */}
            <div className="space-y-16 mt-8">
              {data.left_features?.map((item: any, i: number) => (
                <div key={i}>
                  <div className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center font-bold mb-5 text-sm shadow-md">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-medium mb-3 text-gray-800 tracking-tight">{item.title}</h4>
                  <p className="text-gray-600 leading-[1.7] text-sm pr-6">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Central phone image */}
            <div className="flex justify-center relative w-full lg:w-[320px] mx-auto hidden lg:block">
              {/* Animated Glow Background */}
              <div className="absolute top-[45%] left-1/2 w-[280px] h-[280px] bg-gradient-to-tr from-purple-400 to-purple-300 rounded-full blur-[80px] mix-blend-multiply animate-pulse-glow pointer-events-none z-0"></div>

              {imageUrl ? (
                <div className="relative w-full aspect-[1/2.05] animate-float drop-shadow-2xl z-10">
                  <Image
                    src={toFullUrl(imageUrl)}
                    alt={data.title || "Workflow"}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-[300px] h-[600px] border-8 border-[#1a1a1a] rounded-[2.5rem] bg-gray-50 flex items-center justify-center text-gray-400 drop-shadow-xl">
                  Phone Mockup Content
                </div>
              )}
            </div>

            {/* Right side (Features 3 & 4) */}
            <div className="space-y-16 mt-8 pl-8">
              {data.right_features?.map((item: any, i: number) => (
                <div key={i}>
                  <div className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center font-bold mb-5 text-sm shadow-md">
                    {data.left_features?.length ? data.left_features.length + i + 1 : i + 3}
                  </div>
                  <h4 className="text-xl font-medium mb-3 text-gray-800 tracking-tight">{item.title}</h4>
                  <p className="text-gray-600 leading-[1.7] text-sm pr-6">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Central phone image for mobile view */}
          <div className="flex justify-center mt-16 relative w-full max-w-[280px] mx-auto block lg:hidden">
            {/* Animated Glow Background (Mobile) */}
            <div className="absolute top-[45%] left-1/2 w-[220px] h-[220px] bg-gradient-to-tr from-purple-400 to-purple-300 rounded-full blur-[60px] mix-blend-multiply animate-pulse-glow pointer-events-none z-0"></div>

            {imageUrl && (
              <div className="relative w-full aspect-[1/2.05] animate-float drop-shadow-2xl z-10">
                <Image
                  src={toFullUrl(imageUrl)}
                  alt={data.title || "Workflow"}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: BICRI Style (image + cards grid)
  if (layoutType === "bicri") {
    const mainImage = getImageUrl(data.image) || getImageUrl(data.cards?.[0]?.image);

    return (
      <section className={`py-20 pb-40 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-16">
            {renderMarkdown(data.title, "text-[#9a3f91]")}
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {mainImage && (
              <div className="relative w-full h-[450px]">
                {mainImage.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={toFullUrl(mainImage)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image src={toFullUrl(mainImage)} alt="BICRI" fill className="object-contain" />
                )}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.cards?.map((card: any) => {
                const iconUrl = getImageUrl(card.icon);
                return (
                  <div
                    key={card.id}
                    className="rounded-xl p-8 shadow-md bg-[#a15cbd] hover:shadow-xl transition flex flex-col items-center"
                  >
                    {iconUrl && (
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white mb-6 shadow">
                        <Image
                          src={toFullUrl(iconUrl)}
                          alt={card.title}
                          width={40}
                          height={40}
                          className=""
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-3 text-center text-white">{card.title}</h3>
                    <p className="text-white text-center">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Modern Cards Style (pool-buyout redesign)
  if (layoutType === "modern-cards") {
    const mainImage = getImageUrl(data.image) || getImageUrl(data.cards?.[0]?.image);

    return (
      <section className={`py-24 pb-40 ${bgColor}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center tracking-tight ${data.description ? 'mb-6' : 'mb-16'}`}>
            {renderMarkdown(data.title, "text-[#9a3f91]")}
          </h2>

          {data.description && (
            <div className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-16 leading-relaxed">
              {renderMarkdown(data.description)}
            </div>
          )}

          <div className="flex flex-col gap-16 lg:gap-20 items-center">
            {/* Top Row: Video / Image */}
            {mainImage && mainImage.match(/\.(mp4|webm|ogg)$/i) ? (
              <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(162,_89,_230,_0.12)] border border-gray-100/50">
                <video
                  src={toFullUrl(mainImage)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.02] block"
                />
              </div>
            ) : mainImage ? (
              <div className="relative w-full max-w-6xl mx-auto h-auto aspect-video max-h-[700px] flex items-center justify-center rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(162,_89,_230,_0.12)] border border-gray-100/50 bg-white">
                <Image src={toFullUrl(mainImage)} alt="BICRI" fill className="object-contain" />
              </div>
            ) : null}

            {/* Bottom Row: Features Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {data.cards?.map((card: any) => {
                const iconUrl = getImageUrl(card.icon);
                return (
                  <div
                    key={card.id}
                    className="group bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
                  >
                    {iconUrl && (
                      <div className="w-12 h-12 rounded-xl bg-[#f8f5ff] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-[#eaddff]">
                        <Image
                          src={toFullUrl(iconUrl)}
                          alt={card.title}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#9a3f91] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Showcase (alternating two-column), Lms,Los, Api-services
  if (layoutType === "showcase") {
    const isEven = index % 2 !== 0;
    const imageUrl = getImageUrl(data.image);

    return (
      <section className={`py-20 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {data.badge && (
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-100/30">
                {data.badge}
              </span>
            </div>
          )}
          {data.title && (
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-tight uppercase ${data.description ? 'mb-5' : 'mb-15'}`}>
              {renderMarkdown(data.title, "text-slate-900")}
            </h2>
          )}
          {data.description && (
            <p className="text-gray-600 text-center text-lg max-w-3xl mx-auto mb-16">{data.description}</p>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {isEven ? (
              <>
                <div>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ children }) => (
                        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-4 block">
                          {children}
                        </span>
                      ),
                      ul: ({ children }) => <ul className="space-y-7">{children}</ul>,
                      li: ({ children }) => (
                        <li className="flex items-start gap-4">
                          <svg
                            className="w-7 h-7 mt-1 text-gray-900 flex-shrink-0 font-bold"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                            />
                          </svg>
                          <span className="text-gray-700 text-xl leading-relaxed [&>p]:inline [&>p]:mb-0 [&>p]:text-inherit">{children}</span>
                        </li>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-700 text-xl leading-relaxed mb-6 last:mb-0">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {data.features}
                  </ReactMarkdown>
                </div>
                {imageUrl && (
                  <div className="relative w-full h-auto flex items-center justify-center">
                    {imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        src={toFullUrl(imageUrl)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-contain drop-shadow-xl animate-float-3d scale-110 lg:scale-[1.3] rounded-2xl"
                      />
                    ) : (
                      <Image
                        src={toFullUrl(imageUrl)}
                        alt={data.title}
                        width={800}
                        height={480}
                        className="w-full h-auto object-contain rounded-2xl drop-shadow-xl animate-float-3d"
                        sizes="(max-width:1024px) 100vw, 50vw"
                        unoptimized
                      />
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {imageUrl && (
                  <div className="relative w-full h-auto flex items-center justify-center">
                    {imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        src={toFullUrl(imageUrl)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-contain drop-shadow-xl animate-float-3d scale-110 lg:scale-[1.3] rounded-2xl"
                      />
                    ) : (
                      <Image
                        src={toFullUrl(imageUrl)}
                        alt={data.title}
                        width={800}
                        height={480}
                        className="w-full h-auto object-contain rounded-2xl drop-shadow-xl animate-float-3d"
                        sizes="(max-width:1024px) 100vw, 50vw"
                        unoptimized
                      />
                    )}
                  </div>
                )}
                <div>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ children }) => (
                        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-4 block">
                          {children}
                        </span>
                      ),
                      ul: ({ children }) => <ul className="space-y-7">{children}</ul>,
                      li: ({ children }) => (
                        <li className="flex items-start gap-4">
                          <svg
                            className="w-7 h-7 mt-1 text-gray-900 flex-shrink-0 font-bold"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                            />
                          </svg>
                          <span className="text-gray-700 text-xl leading-relaxed [&>p]:inline [&>p]:mb-0 [&>p]:text-inherit">{children}</span>
                        </li>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-700 text-xl leading-relaxed mb-6 last:mb-0">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {data.features}
                  </ReactMarkdown>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: FAQ Array Style (Revamped to match high-converting LOS / Co-Lending standard)
  if (layoutType === "faq") {
    const rawTitle = data?.title;
    const faqTitle =
      rawTitle && typeof rawTitle === "string" && rawTitle.trim()
        ? rawTitle.replace(/[\*\#\_]/g, "").trim()
        : "You Ask. We Answer!";

    const defaultFaqs = [
      {
        question: "What are API services in a digital lending platform?",
        answer:
          "API services enable seamless integration between lending platforms and third-party systems, allowing lenders to automate processes such as borrower onboarding, verification, credit assessment, and loan disbursement.",
      },
      {
        question: "What types of integrations are supported through API services?",
        answer:
          "API services integrate with KYC verification providers (Aadhaar, PAN, CKYC, DigiLocker), credit bureaus (CIBIL, Experian, CRIF, Equifax), payment gateways, banking APIs, e-signature platforms, and fraud detection engines.",
      },
      {
        question: "How do API services improve lending operations?",
        answer:
          "By enabling real-time automated data exchange between systems, API services eliminate manual data entry, reduce turnaround time to under 3 minutes, and ensure cryptographic compliance with RBI Digital Lending guidelines.",
      },
      {
        question: "How does iFLOW ensure high uptime and API security?",
        answer:
          "iFLOW APIs run on high-availability cloud architecture with mTLS authentication, rate limiting, role-based access control, SOC-2 compliance, and end-to-end data encryption in transit and at rest.",
      },
    ];

    const faqs =
      Array.isArray(data?.faqs) && data.faqs.length > 0
        ? data.faqs
        : defaultFaqs;

    return (
      <section
        id="faq"
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
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug"
            >
              {faqTitle}
            </h2>
          </div>

          {/* Accordion Stack */}
          <div className="space-y-4">
            {faqs.map((faq: any, i: number) => {
              const isOpen = openFaq === i;
              const question =
                typeof faq.question === "string"
                  ? faq.question.trim()
                  : "Frequently Asked Question";
              const answer =
                typeof faq.answer === "string" ? faq.answer.trim() : "";

              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-purple-300 bg-purple-50/20 shadow-md shadow-purple-950/5"
                      : "border-slate-200/80 bg-white hover:border-purple-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
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
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0 leading-relaxed">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 space-y-1 mb-2">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 space-y-1 mb-2">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => <li>{children}</li>,
                        }}
                      >
                        {answer}
                      </ReactMarkdown>
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

  // LAYOUT: Architecture Section (Ecosystem flowchart)
  if (layoutType === "architecture") {
    const items = data.items || [];
    return (
      <section className={`py-24 ${bgColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          {(data.title || data.badge) && (
            <div className="text-center mb-16 max-w-3xl mx-auto">
              {data.badge && (
                <span className="inline-block px-4 py-1.5 bg-[#f4e6fc] text-[#9a3f91] rounded-full text-xs font-bold uppercase tracking-widest border border-[#e8ccf7] shadow-sm mb-4">
                  {data.badge}
                </span>
              )}
              {data.title && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 text-center">
                  {data.title}
                </h2>
              )}
            </div>
          )}

          {/* Flowchart container box */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#fbf9fe] via-[#f7f3fb] to-white rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100 flex flex-col items-center">
            <div className="flex flex-col items-center w-full max-w-md space-y-6">
              {items.map((item: any, idx: number) => {
                const iconUrl = getImageUrl(item.icon);
                const isHighlighted = item.highlight;
                const isLast = idx === items.length - 1;
                const IconComponent = getArchitectureIcon(item.label);

                return (
                  <div key={item.id || idx} className="flex flex-col items-center w-full">
                    {/* Node Card */}
                    <div
                      className="w-full py-4 px-6 rounded-2xl flex items-center justify-between border transition-all duration-300 bg-white border-purple-100 text-slate-900 shadow-sm hover:border-[#9a3f91] hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        {iconUrl ? (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f3eafd] border border-[#e8d5f8]">
                            <div className="relative w-5 h-5">
                              <Image
                                src={toFullUrl(iconUrl)}
                                alt={item.label}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        ) : (
                          // Lucide React icon based on label
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f3eafd] border border-[#e8d5f8] text-[#9a3f91]">
                            <IconComponent className="w-5 h-5" />
                          </div>
                        )}
                        <span className="text-base font-bold tracking-wide text-slate-900">
                          {item.label}
                        </span>
                      </div>

                      {/* Chevron/indicator right aligned */}
                      <div className="w-2.5 h-2.5 rounded-full bg-[#9a3f91] animate-pulse" />
                    </div>

                    {/* Connecting Arrow */}
                    {!isLast && (
                      <div className="flex flex-col items-center my-1 select-none">
                        <div className="w-[2px] h-8 bg-gradient-to-b from-[#623f99] to-[#9a3f91] flex flex-col justify-end items-center">
                          <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-[#9a3f91] transform rotate-45 mb-1" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Caption/Footer */}
            <div className="mt-8 text-center text-xs font-semibold text-gray-500 uppercase tracking-widest">
              ENTERPRISE ARCHITECTURE DIAGRAM
            </div>
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Workflow Section (Ecosystem flowchart / step lifecycle)
  if (layoutType === "workflow") {
    const steps = data.steps || [];
    const activeStep = steps[activeTab] || steps[0] || {};
    const activeStepIconUrl = getImageUrl(activeStep.icon);
    const progressPercent = steps.length > 1 ? (activeTab / (steps.length - 1)) * 100 : 100;

    return (
      <section className="py-20 bg-gradient-to-b from-[#fbf9fe] via-[#f7f3fb] to-white text-slate-900 border-y border-purple-100/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          {(data.title || data.badge) && (
            <div className="text-center mb-14 max-w-3xl mx-auto">
              {data.badge && (
                <span className="inline-block px-4 py-1.5 bg-purple-100/80 text-[#9a3f91] rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200/60 shadow-sm">
                  {data.badge}
                </span>
              )}
              {data.title && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center tracking-tight text-slate-900 leading-tight">
                  {data.title}
                </h2>
              )}
              {data.description && (
                <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  {data.description}
                </p>
              )}
            </div>
          )}

          {/* Steps Timeline Row */}
          <div className="max-w-6xl mx-auto mb-12">
            {/* Scrollable container on small screens to prevent squeezing */}
            <div className="overflow-x-auto scrollbar-none py-6 px-4">
              <div className="relative min-w-[720px] md:min-w-0">
                {/* Connecting Line Container */}
                <div className="absolute top-5 left-8 right-8 h-[3px] bg-purple-100/80 z-0 rounded-full">
                  {/* Active Progress Line */}
                  <div
                    className="h-full bg-gradient-to-r from-[#623f99] via-[#9a3f91] to-[#e51edeff] rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Steps Nodes */}
                <div className="flex items-start justify-between relative z-10">
                  {steps.map((step: any, idx: number) => {
                    const stepIcon = getImageUrl(step.icon);
                    const isActive = idx === activeTab;
                    const isPassed = idx < activeTab;
                    const StepIconComponent = getWorkflowIcon(step.title);

                    return (
                      <button
                        key={step.id || idx}
                        onClick={() => setActiveTab(idx)}
                        className="flex flex-col items-center group focus:outline-none transition-all duration-300 flex-1 px-1"
                      >
                        {/* Circle Icon Node */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white ring-4 ring-purple-200 shadow-lg shadow-purple-500/30 scale-110"
                              : isPassed
                              ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-md hover:scale-105"
                              : "bg-white border-2 border-purple-200 text-[#623f99] group-hover:border-[#9a3f91] group-hover:scale-105 shadow-sm"
                          }`}
                        >
                          {stepIcon ? (
                            <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                              <Image
                                src={toFullUrl(stepIcon)}
                                alt={step.title}
                                fill
                                className={`object-contain ${!isActive && !isPassed ? "opacity-75 group-hover:opacity-100" : ""}`}
                              />
                            </div>
                          ) : (
                            <StepIconComponent
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                isActive || isPassed
                                  ? "text-white"
                                  : "text-[#623f99] group-hover:text-[#9a3f91]"
                              }`}
                            />
                          )}
                        </div>

                        {/* Step Title Label */}
                        <div className="mt-3 flex flex-col items-center">
                          <span
                            className={`text-[10px] sm:text-xs text-center leading-snug break-words max-w-[85px] sm:max-w-[100px] transition-all duration-300 ${
                              isActive
                                ? "font-bold text-[#9a3f91] scale-105"
                                : isPassed
                                ? "font-semibold text-slate-900"
                                : "font-medium text-gray-500 group-hover:text-[#9a3f91]"
                            }`}
                          >
                            {step.title}
                          </span>
                          
                          {/* Active Indicator Pill */}
                          {isActive && (
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9a3f91] animate-ping" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active Step Detail Card */}
          {activeStep.title && (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-100 shadow-[0_12px_40px_rgba(154,63,145,0.08)] relative overflow-hidden transition-all duration-300">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#9a3f91] to-[#e51edeff]" />

              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Step Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/70 border border-purple-200/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {activeStepIconUrl ? (
                    <div className="relative w-7 h-7">
                      <Image
                        src={toFullUrl(activeStepIconUrl)}
                        alt={activeStep.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    (() => {
                      const ActiveIconComponent = getWorkflowIcon(activeStep.title);
                      return <ActiveIconComponent className="w-7 h-7 text-[#9a3f91]" />;
                    })()
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-purple-100/80 text-[#9a3f91] rounded-full text-xs font-bold uppercase tracking-wider">
                      Step {activeTab + 1} of {steps.length}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {activeStep.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    );
  }

  // LAYOUT: Data Ecosystem Section (Integrations & Assessment Workflow Diagram)
  if (layoutType === "data-ecosystem") {
    const badge = data.badge || "INTEGRATIONS & DATA ECOSYSTEM";
    const title = data.title || "Connect Relevant Business Data to the Assessment Workflow";
    const description =
      data.description ||
      "A consent-led architecture designed around available, authorised sources and implementation scope.";
    const centerBrand = data.center_brand || "iFLOW";
    const centerTitle = data.center_title || "BICRI Intelligence Layer";
    const centerSubtitle = data.center_subtitle || "Processing • Validation • Assessment";
    const centerIconUrl = getImageUrl(data.center_icon);
    const footerNote =
      data.footer_note ||
      "Illustrative architecture. Actual sources and outputs depend on consent, availability and configuration.";

    const defaultLeft = [
      "Banking & cash flow",
      "Credit information",
      "Trade & commerce",
      "Business context",
    ];
    const defaultRight = [
      "Risk segmentation",
      "Business insights",
      "Limit recommendations",
      "Structured reports",
    ];

    const rawLeft =
      data.left_items && data.left_items.length > 0
        ? data.left_items
        : data.left_features && data.left_features.length > 0
        ? data.left_features
        : defaultLeft;

    const rawRight =
      data.right_items && data.right_items.length > 0
        ? data.right_items
        : data.right_features && data.right_features.length > 0
        ? data.right_features
        : defaultRight;

    const leftList = rawLeft.map((item: any) =>
      typeof item === "string" ? item : item.label || item.title || ""
    );
    const rightList = rawRight.map((item: any) =>
      typeof item === "string" ? item : item.label || item.title || ""
    );

    return (
      <section className={`py-20 md:py-28 ${bgColor || "bg-[#f8f7fd]"} relative overflow-hidden`}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-4xl mb-14 md:mb-16">
            {badge && (
              <p className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#7c3aed] mb-4">
                {badge}
              </p>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0f172a] tracking-tight leading-[1.18] mb-4">
                {renderMarkdown(title, "text-[#7c3aed]")}
              </h2>
            )}
            {description && (
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
                {description}
              </p>
            )}
          </div>

          {/* Architecture Diagram Workflow */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 xl:gap-8 my-6">
            {/* Left Inputs Column */}
            <div className="w-full lg:w-[280px] xl:w-[310px] flex flex-col gap-3.5 sm:gap-4">
              {leftList.map((label: string, idx: number) => (
                <div
                  key={`left-${idx}`}
                  className="bg-white rounded-xl sm:rounded-2xl px-6 py-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex items-center group cursor-default"
                >
                  <span className="text-[#1e293b] font-medium text-sm sm:text-base group-hover:text-[#623f99] transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Left to Center Arrow */}
            <div className="hidden lg:flex items-center justify-center px-1 text-[#7c3aed]">
              <ArrowRight className="w-6 h-6 stroke-[2.2] animate-pulse" />
            </div>
            <div className="flex lg:hidden items-center justify-center py-2 text-[#7c3aed]">
              <ArrowDown className="w-5 h-5 stroke-[2.2] animate-bounce" />
            </div>

            {/* Center Intelligence Hub Card */}
            <div className="w-full lg:flex-1 max-w-[500px] bg-[#0c1829] rounded-[28px] sm:rounded-[32px] p-8 sm:p-12 text-center text-white border border-slate-800 shadow-[0_20px_50px_rgba(12,24,41,0.28)] relative overflow-hidden flex flex-col items-center justify-center min-h-[260px] sm:min-h-[290px] group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(124,58,237,0.22)]">
              {/* Subtle ambient gradient aura */}
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.22),_transparent_70%)] pointer-events-none"
                aria-hidden="true"
              />

              {/* Center Icon */}
              <div className="relative mb-3 flex items-center justify-center">
                {centerIconUrl ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={toFullUrl(centerIconUrl)}
                      alt={centerTitle}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform duration-300">
                    <Database className="w-9 h-9 stroke-[1.8]" />
                  </div>
                )}
              </div>

              {/* Center Brand */}
              {centerBrand && (
                <span className="text-[11px] sm:text-xs font-black tracking-[0.25em] uppercase text-white/90 mb-2 block">
                  {centerBrand}
                </span>
              )}

              {/* Center Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
                {centerTitle}
              </h3>

              {/* Center Subtitle */}
              {centerSubtitle && (
                <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
                  {centerSubtitle}
                </p>
              )}
            </div>

            {/* Center to Right Arrow */}
            <div className="hidden lg:flex items-center justify-center px-1 text-[#7c3aed]">
              <ArrowRight className="w-6 h-6 stroke-[2.2] animate-pulse" />
            </div>
            <div className="flex lg:hidden items-center justify-center py-2 text-[#7c3aed]">
              <ArrowDown className="w-5 h-5 stroke-[2.2] animate-bounce" />
            </div>

            {/* Right Outputs Column */}
            <div className="w-full lg:w-[280px] xl:w-[310px] flex flex-col gap-3.5 sm:gap-4">
              {rightList.map((label: string, idx: number) => (
                <div
                  key={`right-${idx}`}
                  className="bg-white rounded-xl sm:rounded-2xl px-6 py-4 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex items-center group cursor-default"
                >
                  <span className="text-[#1e293b] font-medium text-sm sm:text-base group-hover:text-[#623f99] transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note / Caption */}
          {footerNote && (
            <div className="mt-14 sm:mt-16 text-center">
              <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-3xl mx-auto leading-relaxed">
                {footerNote}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // LAYOUT: Customer Success / Case Study
  if (layoutType === "customer-success") {
    const logoUrl = getImageUrl(data.companyLogo);
    return (
      <section className="py-20 bg-gradient-to-b from-[#f8f6fc] via-[#f4f0fa] to-white text-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {data.badge && (
              <span className="inline-block px-4 py-1.5 bg-[#f4e6fc] text-[#9a3f91] rounded-full text-xs font-bold uppercase tracking-widest border border-[#e8ccf7] shadow-sm mb-4">
                {data.badge}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center tracking-tight text-slate-900">
              {data.title}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-xl border border-purple-100/80">
            {/* Left Column */}
            <div className="w-full lg:w-[40%] bg-gradient-to-br from-[#623f99] to-[#9a3f91] p-8 lg:p-10 flex flex-col justify-between text-white">
              <div>
                <div className="flex items-center gap-4 mb-10">
                  {logoUrl ? (
                    <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center border border-white/30 p-2">
                      <Image src={toFullUrl(logoUrl)} alt={data.companyName || "Company Logo"} width={40} height={40} className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center border border-white/30">
                      <Building className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{data.companyName}</h3>
                    <p className="text-purple-100 text-sm mt-1">{data.companySubtitle}</p>
                  </div>
                </div>

                <div className="space-y-0">
                  {data.stats?.map((stat: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-white/20 last:border-0">
                      <span className="text-purple-100 text-sm">{stat.label}</span>
                      <span className="text-white font-bold text-base">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex gap-1">
                {Array.from({ length: data.stars || 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-300 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[60%] p-8 lg:p-12 flex flex-col gap-7 justify-center bg-[#fcfaff]">
              {data.businessChallenge && (
                <div>
                  <h4 className="text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-2">Business Challenge</h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{data.businessChallenge}</p>
                </div>
              )}
              {data.iflowSolution && (
                <div>
                  <h4 className="text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-2">iFlow Solution</h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{data.iflowSolution}</p>
                </div>
              )}
              {data.businessImpact && (
                <div>
                  <h4 className="text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-2">Business Impact</h4>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{data.businessImpact}</p>
                </div>
              )}
              {(data.quoteText || data.quoteAuthor) && (
                <div className="mt-2 pl-5 border-l-4 border-[#9a3f91] bg-purple-50/60 p-4 rounded-r-2xl">
                  {data.quoteText && <p className="text-slate-900 text-base font-medium italic leading-relaxed mb-2">"{data.quoteText}"</p>}
                  {data.quoteAuthor && <p className="text-[#9a3f91] text-sm font-bold">{data.quoteAuthor}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Grid (default - Collection Cards style)
  return (
    <section className={`py-20 sm:py-24 bg-gradient-to-b from-[#faf8fd] via-white to-[#faf8fd]/50 border-b border-purple-100/70 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6">
        {(data.title || data.badge || data.description) && (
          <div className="text-center mb-14 max-w-3xl mx-auto">
            {data.badge && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
                {data.badge}
              </span>
            )}
            {data.title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4 text-center">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
                {data.description}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.cards?.map((card: any, idx: number) => {
            const iconUrl = getImageUrl(card.icon);
            const imageUrl = getImageUrl(card.image);
            const displayUrl = useIconStyle ? (iconUrl || imageUrl) : (imageUrl || iconUrl);
            const isHovered = hoveredCardIdx === idx;
            const CardIconComponent = getCardIcon(card.title, card.description);

            if (solutionSlug === "co-lending" || solutionSlug === "pool-buyout") {
              const IconComponent = solutionSlug === "co-lending"
                ? getCoLendingIcon(card.title)
                : getPoolBuyoutIcon(card.title);
              return (
                <div
                  key={card.id || idx}
                  onMouseEnter={() => setHoveredCardIdx(idx)}
                  onMouseLeave={() => setHoveredCardIdx(null)}
                  className={
                    "rounded-3xl p-7 sm:p-8 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[175px] bg-white " +
                    (isHovered
                      ? "border-2 border-[#9a3f91] ring-4 ring-[#9a3f91]/15 shadow-xl shadow-[#9a3f91]/10 scale-[1.02]"
                      : "border border-purple-100/80 shadow-[0_8px_25px_rgba(27,16,50,0.04)] hover:border-purple-200 hover:scale-[1.01]")
                  }
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 border border-purple-100/30">
                    {displayUrl ? (
                      <div className="relative w-6 h-6">
                        <Image
                          src={toFullUrl(displayUrl)}
                          alt={card.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : IconComponent ? (
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    ) : (
                      <CardIconComponent className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={card.id || idx}
                onMouseEnter={() => setHoveredCardIdx(idx)}
                onMouseLeave={() => setHoveredCardIdx(null)}
                className={
                  "group relative rounded-3xl p-7 sm:p-8 text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[175px] bg-white " +
                  (isHovered
                    ? "border-2 border-[#9a3f91] ring-4 ring-[#9a3f91]/15 shadow-xl shadow-[#9a3f91]/10 scale-[1.02]"
                    : "border border-purple-100/90 shadow-[0_8px_25px_rgba(27,16,50,0.04)] hover:border-purple-200 hover:scale-[1.01]")
                }
              >
                <div
                  className={
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 " +
                    (isHovered
                      ? "bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white shadow-md shadow-[#623f99]/30"
                      : "bg-[#f3eafd] text-[#9a3f91] border border-[#e8d5f8] group-hover:bg-[#623f99] group-hover:text-white")
                  }
                >
                  {displayUrl ? (
                    <div className="relative w-6 h-6">
                      <Image
                        src={toFullUrl(displayUrl)}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <CardIconComponent className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <h3
                    className={
                      "text-base sm:text-lg font-bold mb-2 leading-snug transition-colors " +
                      (isHovered ? "text-[#623f99]" : "text-slate-900 group-hover:text-[#623f99]")
                    }
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
