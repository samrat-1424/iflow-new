"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import SectionRenderer from "@/components/SectionRenderer";
import { CaseStudy, fetchCaseStudies, DEFAULT_CASE_STUDIES } from "@/services/caseStudyService";
import CaseStudyAccessModal from "./CaseStudyAccessModal";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Building2,
} from "lucide-react";

const CATEGORIES = [
  { id: "AI & CREDIT", label: "AI & CREDIT" },
  { id: "CO-LENDING", label: "CO-LENDING" },
  { id: "LENDING OPERATIONS", label: "LENDING OPERATIONS" },
  { id: "COLLECTIONS", label: "COLLECTIONS" },
  { id: "DSA & DISTRIBUTION", label: "DSA & DISTRIBUTION" },
  { id: "DIGITAL LENDING", label: "DIGITAL LENDING" },
];

const CATEGORY_MODAL_TITLES: Record<string, string> = {
  "AI & CREDIT": "AI & Credit",
  "CO-LENDING": "Co-Lending",
  "LENDING OPERATIONS": "Lending Operations",
  "COLLECTIONS": "Collections",
  "DSA & DISTRIBUTION": "DSA & Distribution",
  "DIGITAL LENDING": "Digital Lending",
};

export default function CaseStudies() {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("AI & CREDIT");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsUnlocked(sessionStorage.getItem("iflow_case_study_unlocked") === "true");
    }
  }, []);

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        const data = await fetchCaseStudies();
        const baseList = data.caseStudies && data.caseStudies.length > 0 ? data.caseStudies : [];
        const mergedList = [...baseList];
        DEFAULT_CASE_STUDIES.forEach((def) => {
          const exists = mergedList.some((s) => {
            const sCat = (s.category || "").toUpperCase();
            const defCat = (def.category || "").toUpperCase();
            return (sCat && defCat && sCat === defCat) || s.slug === def.slug;
          });
          if (!exists) {
            mergedList.push(def);
          }
        });
        setCaseStudies(mergedList.length > 0 ? mergedList : DEFAULT_CASE_STUDIES);
      } catch (err) {
        console.error("Error loading case studies:", err);
        setCaseStudies(DEFAULT_CASE_STUDIES);
      } finally {
        setLoading(false);
      }
    }
    loadCaseStudies();
  }, []);

  const scrollToStories = () => {
    const storiesEl = document.getElementById("case-stories-list");
    if (storiesEl) {
      storiesEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenStudy = (study: CaseStudy) => {
    const cat = (study.category || "").toUpperCase();
    const modalTitle = CATEGORY_MODAL_TITLES[cat] || study.title;
    const studyToOpen = { ...study, title: modalTitle };
    if (isUnlocked) {
      router.push(`/case-studies/${study.slug}`);
    } else {
      setSelectedStudy(studyToOpen);
      setIsModalOpen(true);
    }
  };

  const handleModalSuccess = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("iflow_case_study_unlocked", "true");
    }
    setIsUnlocked(true);
    setIsModalOpen(false);
    if (selectedStudy) {
      router.push(`/case-studies/${selectedStudy.slug}`);
    }
  };

  const imgBase = process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "http://localhost:1337";

  // Filter case studies by selected category
  const filteredStudies = caseStudies.filter((study) => {
    if (activeCategory === "ALL") return true;
    const cat = (study.category || "").toUpperCase();
    const active = activeCategory.toUpperCase();
    return cat === active || cat.includes(active) || active.includes(cat);
  });

  return (
    <div className="bg-white min-h-screen">
      {/* ── Redesigned Modern Case Studies Hero (Matches Solution Section Design) ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#fdfbfe] via-[#f7f2fb]/80 to-white border-b border-slate-100 py-12 sm:py-16 lg:py-20">
        {/* Atmospheric purple & magenta glow lighting (matches Solution Section) */}
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

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 z-10">
          <Reveal threshold={0.1} animationType="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Eyebrow, Heading, Description, CTA Buttons, Trust Points */}
              <div className="lg:col-span-7">
                {/* Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/70 text-[#7c3aed] text-xs font-mono font-bold tracking-wider uppercase mb-5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#7c3aed]" />
                  CLIENT SUCCESS STORIES
                </div>

                {/* Main Heading with Gradient Accent */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14] mb-5">
                  Real lending challenges. <br className="hidden sm:inline" />
                  <span className="text-[#9a3f91]">
                    Real business outcomes.
                  </span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed font-normal max-w-2xl">
                  Explore how iFLOW helps leading banks, NBFCs, and fintech lenders streamline lending operations, eliminate reconciliation bottlenecks, and scale loan portfolios with confidence.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <button
                    onClick={scrollToStories}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  >
                    <span>Explore Case Studies</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/book-a-demo"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-purple-50/50 hover:border-purple-200 hover:text-[#623f99] transition-all duration-300 shadow-xs"
                  >
                    <span>Book a Demo</span>
                  </Link>
                </div>

                {/* Trust Checkmarks */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Verified Production Outcomes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
                    <span>Banks &amp; Tier-1 NBFCs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#623f99] flex-shrink-0" />
                    <span>100% RBI Compliance</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Case Study Spotlight Card (Shaan Finance) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-purple-100/90 bg-white/95 backdrop-blur-md shadow-2xl shadow-purple-950/10 p-7 sm:p-9 overflow-hidden transition-all duration-300 hover:shadow-purple-900/15">
                  {/* Decorative Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91]" />

                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white flex items-center justify-center p-3 shadow-md shadow-purple-900/20 flex-shrink-0">
                        <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="font-mono text-[10.5px] font-bold tracking-[0.2em] text-[#9a3f91] uppercase block">
                          FEATURED • CO-LENDING
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                          Shaan Finance
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          NBFC — Retail &amp; MSME Lending
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Outcome
                    </span>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-slate-100 bg-slate-50/70 rounded-2xl px-3 text-center">
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-[#0a1f44] tracking-tight leading-none">
                        42 Pools
                      </div>
                      <span className="text-[9px] sm:text-[9.5px] font-mono tracking-wider text-slate-500 uppercase block mt-1.5 leading-snug">
                        POOLS ACQUIRED
                      </span>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-[#0a1f44] tracking-tight leading-none">
                        ₹3,200 Cr
                      </div>
                      <span className="text-[9px] sm:text-[9.5px] font-mono tracking-wider text-slate-500 uppercase block mt-1.5 leading-snug">
                        PORTFOLIO VALUE
                      </span>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-[#0a1f44] tracking-tight leading-none">
                        75%
                      </div>
                      <span className="text-[9px] sm:text-[9.5px] font-mono tracking-wider text-slate-500 uppercase block mt-1.5 leading-snug">
                        TIME SAVED
                      </span>
                    </div>
                  </div>

                  {/* Executive Quote Block */}
                  <div className="mt-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-100/80">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed italic">
                      &ldquo;iFLOW transformed our Co-lending operation from a bottleneck to our fastest-growing revenue stream with real-time visibility.&rdquo;
                    </p>
                    <span className="text-[11px] font-bold text-[#623f99] mt-2 block not-italic">
                      — Credit Head, Shaan Finance
                    </span>
                  </div>

                  {/* Card Footer with Direct Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-[#7c3aed]" />
                      <span className="font-medium text-slate-600">Verified Client Story</span>
                    </div>
                    <button
                      onClick={() => {
                        const shaanStudy =
                          caseStudies.find(
                            (s) =>
                              s.slug === "co-lending" ||
                              (s.category && s.category.toUpperCase().includes("CO-LENDING"))
                          ) || caseStudies[0];
                        if (shaanStudy) {
                          handleOpenStudy(shaanStudy);
                        } else {
                          router.push("/case-studies/co-lending");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#623f99] hover:text-[#9a3f91] transition-colors cursor-pointer group"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Explore Our Case Studies Section */}
      <div id="case-stories-list" className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-16 sm:py-24">
        <Reveal threshold={0.1} animationType="fade-up">
          <div className="mb-10">
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#7c3aed] uppercase block mb-3">
              ALL CLIENT STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              Explore Our{" "}
              <span className="text-[#9a3f91]">
                Case Studies
              </span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              Discover how iFLOW technology is helping lending businesses simplify complexity, improve decision-making, and scale operations.
            </p>
          </div>

          {/* Category Filter Pills Header */}
          <div className="flex flex-wrap items-center gap-2.5 mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-md shadow-purple-950/20 font-semibold scale-[1.02]"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 hover:border-purple-200 hover:bg-purple-50/50 shadow-2xs"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Case Studies Display Grid */}
        {loading ? (
          <div className="h-64 bg-gray-100 animate-pulse rounded-3xl border border-gray-200" />
        ) : filteredStudies.length > 0 ? (
          <div className="space-y-8">
            {filteredStudies.map((study) => {
              const isComingSoon = study.coming_soon === true;

              return (
                <Reveal key={study.id} threshold={0.1} animationType="fade-up">
                  <div
                    className={`group relative rounded-3xl transition-all duration-300 ${
                      isComingSoon
                        ? "bg-[#FAFAFC]/90 border border-gray-200/80 p-8 sm:p-10 max-w-xl shadow-xs"
                        : "bg-gradient-to-br from-[#FAF5FF]/70 via-[#FDFBFD] to-white border border-[#9a3f91]/30 hover:border-[#9a3f91]/60 p-8 sm:p-12 shadow-sm hover:shadow-xl"
                    }`}
                  >
                    {/* Top Row: Category Badge & Coming Soon Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-semibold tracking-widest text-[#9a3f91] uppercase">
                        {study.category_badge || study.category}
                      </span>
                      {isComingSoon && (
                        <span className="bg-white border border-gray-200 text-gray-400 font-mono text-xs px-3.5 py-1 rounded-full shadow-2xs">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-8 flex flex-col justify-between">
                        <div>
                          <h3
                            className={`text-2xl sm:text-3xl lg:text-3xl font-serif font-bold leading-tight mb-4 ${
                              isComingSoon ? "text-gray-700 font-semibold" : "text-[#0A2D5F] group-hover:text-[#623f99] transition-colors"
                            }`}
                          >
                            {study.title}
                          </h3>

                          {study.subtitle && (
                            <p className="text-gray-600 text-base sm:text-lg font-normal leading-relaxed mb-6 max-w-2xl">
                              {study.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Optional Center Image / Graphic */}
                        {study.banner?.url ? (
                          <div className="relative w-full h-48 sm:h-64 my-6 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                            <Image
                              src={`${imgBase}${study.banner.url}`}
                              alt={study.banner.alt || study.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          /* Fallback Animated Network Diagram Graphic */
                          <div className="my-6 flex justify-center items-center py-4">
                            {!isComingSoon ? (
                              <div className="relative w-36 h-36 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#9a3f91]/30 animate-spin" style={{ animationDuration: '15s' }} />
                                <div className="w-20 h-20 rounded-full bg-[#623f99]/10 flex items-center justify-center border border-[#9a3f91]/20">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] flex items-center justify-center text-white text-xs font-bold shadow-md">
                                    AI
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="relative w-28 h-20 flex items-center justify-center opacity-60">
                                <svg className="w-full h-full" viewBox="0 0 120 80">
                                  <circle cx="60" cy="40" r="6" fill="#9a3f91" />
                                  <circle cx="20" cy="20" r="4" fill="#623f99" />
                                  <circle cx="100" cy="20" r="4" fill="#623f99" />
                                  <circle cx="30" cy="65" r="4" fill="#623f99" />
                                  <circle cx="90" cy="65" r="4" fill="#623f99" />
                                  <line x1="60" y1="40" x2="20" y2="20" stroke="#9a3f91" strokeWidth="1" strokeDasharray="2 2" />
                                  <line x1="60" y1="40" x2="100" y2="20" stroke="#9a3f91" strokeWidth="1" strokeDasharray="2 2" />
                                  <line x1="60" y1="40" x2="30" y2="65" stroke="#9a3f91" strokeWidth="1" strokeDasharray="2 2" />
                                  <line x1="60" y1="40" x2="90" y2="65" stroke="#9a3f91" strokeWidth="1" strokeDasharray="2 2" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Footer Info & Explore Action Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100/80">
                          <div className="flex flex-wrap items-center gap-3">
                            {study.metrics && (
                              <span className="text-xs font-mono font-semibold text-[#623f99] tracking-wide">
                                {study.metrics}
                              </span>
                            )}
                            {study.tag && (
                              <span className="bg-[#F3E8FF] text-[#623f99] font-medium text-xs px-3.5 py-1.5 rounded-full">
                                {study.tag}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleOpenStudy(study)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#623f99] hover:text-[#9a3f91] transition-colors cursor-pointer group-hover:translate-x-0.5"
                          >
                            <span>Explore</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Coming Soon</p>
          </div>
        )}
      </div>

      {/* Case Studies Sections Rendered dynamically based on each component's display_location */}
      <div className="w-full">
        {caseStudies.length > 0 && (
          <div className="space-y-0">
            {caseStudies.map((study) =>
              study.sections && study.sections.length > 0 ? (
                <div key={`sections-${study.id}`} className="space-y-0">
                  {study.sections
                    .filter((sec: any) => {
                      const loc = sec.display_location || study.display_location || "both";
                      return loc === "both" || loc === "only_main";
                    })
                    .map((sec: any, idx: number) => (
                      <SectionRenderer
                        key={sec.id || idx}
                        section={sec}
                        solutionSlug={study.slug}
                        index={idx}
                      />
                    ))}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Access Gate Modal */}
      <CaseStudyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseStudyTitle={selectedStudy?.title}
        caseStudySlug={selectedStudy?.slug}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
