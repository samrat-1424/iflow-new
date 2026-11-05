import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GenericResourceSection from "@/components/GenericResourceSection";
import GenericSection from "@/components/sections/GenericSection";
import { fetchResourceBySlug } from "@/services/resourcesService";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import {
  RESOURCE_INDUSTRIES,
  ResourceIndustry,
} from "@/utils/resourcesData";

interface ResourceDetailPageProps {
  params: Promise<{ slug: string }>;
}

function resolveIndustry(slug: string): ResourceIndustry | undefined {
  const s = slug.toLowerCase();
  if (s === "retail" || s === "retail-credit" || s === "retail-loans") {
    return RESOURCE_INDUSTRIES.retail;
  }
  if (s === "msme" || s === "msme-business" || s === "msme-finance") {
    return RESOURCE_INDUSTRIES.msme;
  }
  if (s === "agriculture" || s === "agri" || s === "agri-tech") {
    return RESOURCE_INDUSTRIES.agriculture;
  }
  if (s === "wholesale" || s === "corporate" || s === "wholesale-co-lending") {
    return RESOURCE_INDUSTRIES.wholesale;
  }
  return RESOURCE_INDUSTRIES[s];
}

export async function generateStaticParams() {
  return [
    { slug: "retail" },
    { slug: "msme" },
    { slug: "agriculture" },
    { slug: "wholesale" },
  ];
}

export async function generateMetadata(
  { params }: ResourceDetailPageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = resolveIndustry(resolvedParams.slug);

  if (industry) {
    return {
      title: `${industry.title} | Iflow Digital Lending`,
      description: industry.description.slice(0, 160),
      alternates: {
        canonical: `/resources/${industry.slug}`,
      },
      icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
      },
    };
  }

  const resource = await fetchResourceBySlug(resolvedParams.slug);
  const canonicalUrl = `/resources/${resolvedParams.slug}`;
  if (!resource) {
    return {
      title: "Resource not found",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }
  const title = resource.title || "Resource";
  const description = (resource.content || "").slice(0, 160);
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const industry = resolveIndustry(slug);

  // If this slug matches one of the 4 redesigned industry parts
  if (industry) {
    const otherIndustries = Object.values(RESOURCE_INDUSTRIES).filter(
      (ind) => ind.slug !== industry.slug
    );

    return (
      <main className="bg-white min-h-screen">
        {/* ── 1. Hero Section with Dark Background & Glow Overlay ── */}
        <section className="relative overflow-hidden bg-[#16092e] text-white min-h-[500px] flex items-center pt-28 sm:pt-36 pb-16 sm:pb-20">
          {/* Background Image with Dark Vignette */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={industry.heroBgImage}
              alt={industry.title}
              className="w-full h-full object-cover object-right md:object-center pointer-events-none select-none"
            />
            {/* Dark Purple Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#17082e] via-[#1a0a33]/85 sm:via-[#1a0a33]/65 to-[#120524]/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#140827]/85 via-transparent to-[#100722]/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 lg:px-14">
            {/* Eyebrow */}
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#c084fc] uppercase mb-4 block">
              INDUSTRY
            </span>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl">
              {industry.title}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-purple-200/90 font-medium mt-4 max-w-3xl leading-snug">
              {industry.tagline}
            </p>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mt-4 max-w-3xl font-normal">
              {industry.description}
            </p>
          </div>
        </section>

        {/* ── 2. Split Section: "Lending challenges we solve" vs "How iFLOW helps" ── */}
        <section className="bg-slate-50/70 py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Challenges */}
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#7c3aed] uppercase block mb-3">
                THE CHALLENGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
                Lending challenges we{" "}
                <span className="text-[#9a3f91]">
                  solve
                </span>
              </h2>

              <div className="space-y-4">
                {industry.challenges.map((challenge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
                  >
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Approach & Metrics */}
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#7c3aed] uppercase block mb-3">
                THE APPROACH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                How iFLOW{" "}
                <span className="text-[#9a3f91]">
                  helps
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {industry.approachText}
              </p>

              {/* 2x2 Metrics Cards */}
              <div className="grid grid-cols-2 gap-4">
                {industry.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:border-purple-200 hover:shadow-md"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#623f99] tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-[10.5px] font-mono font-semibold tracking-wider text-slate-400 uppercase mt-2">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Solutions for this industry ── */}
        <section className="py-20 bg-purple-50/20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#7c3aed] uppercase text-center block mb-2">
              STACK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12 tracking-tight">
              Solutions for{" "}
              <span className="text-[#9a3f91]">
                this industry
              </span>
            </h2>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.solutions.map((sol) => {
                const IconComp = sol.icon;
                return (
                  <Link
                    key={sol.slug}
                    href={`/solutions/${sol.slug}`}
                    className="group relative flex flex-col justify-between p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-300 transition-all duration-300"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center mb-5 group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all shadow-sm">
                        <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug">
                        {sol.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                        {sol.blurb}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#7c3aed] group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ── 4. Bottom Industry Navigation Pills ── */}
            <div className="mt-16 pt-8 flex flex-wrap items-center justify-center gap-3">
              {otherIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/resources/${ind.slug}`}
                  className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:text-[#623f99] hover:border-purple-300 hover:bg-purple-50/50 shadow-sm transition-all"
                >
                  {ind.navTitle}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Fallback to original implementation if not one of the 4 industry parts
  const resource = await fetchResourceBySlug(slug);
  if (!resource) return notFound();

  // Generate content based on resource title/slug
  const getResourceContent = (title: string, slugStr: string) => {
    const lowerTitle = title.toLowerCase();
    const lowerSlug = slugStr.toLowerCase();

    if (lowerTitle.includes("msme") || lowerSlug.includes("msme")) {
      return {
        headingParts: ["Intelligent ", "Credit Risk Assessment", " for MSME"],
        description:
          "Assess retailer creditworthiness and business potential beyond traditional credit indicators. BICRI brings together financial information, credit history, trade relationships and relevant business data to support more informed decisions.",
      };
    } else if (lowerTitle.includes("retail") || lowerSlug.includes("retail")) {
      return {
        headingParts: ["Smart ", "Financing Solutions", " for Retail"],
        description:
          "Empowering retail businesses with flexible credit lines and **real-time risk assessment**. Enhance cash flow management and inventory financing with our data-driven approach.",
      };
    } else if (lowerTitle.includes("wholesale") || lowerSlug.includes("wholesale")) {
      return {
        headingParts: ["Trade ", "Finance Platform", " for Wholesale"],
        description:
          "Streamline B2B transactions with **intelligent working capital solutions**. Enable faster trade cycles with automated credit evaluation and supply chain financing.",
      };
    } else if (
      lowerTitle.includes("agriculture") ||
      lowerSlug.includes("agriculture") ||
      lowerTitle.includes("agri")
    ) {
      return {
        headingParts: ["Agricultural ", "Supply Chain Financing", ""],
        description:
          "Digital lending solutions tailored for agri-businesses. From farm to market, we provide credit access based on **crop cycles, weather data, and market trends** with minimal documentation.",
      };
    } else {
      return {
        headingParts: ["Financial ", "Solutions", ` for ${title}`],
        description:
          "Innovative financing solutions powered by AI and data analytics to help businesses grow with confidence and agility.",
      };
    }
  };

  const content = getResourceContent(resource.title, slug);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <section className="py-16 lg:ml-20 ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              <span className="text-[#1a2b49]">{content.headingParts[0]}</span>
              <span className="text-[#9a3f91]">{content.headingParts[1]}</span>
              <span className="text-[#1a2b49]">{content.headingParts[2]}</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {content.description.split("**").map((part, index) =>
                index % 2 === 1 ? (
                  <strong key={index} className="text-[#1a2b49] font-bold">
                    {part}
                  </strong>
                ) : (
                  <span key={index}>{part}</span>
                )
              )}
            </p>
            <Link href="/book-a-demo">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-6">
        {resource.content && resource.content.length > 0 && typeof resource.content === "string" && (
          <div className="text-gray-600 text-lg leading-relaxed mb-12 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img
                    className="w-full h-auto rounded-lg my-8 block"
                    {...props}
                  />
                ),
                p: ({ children }) => <p className="mb-4">{children}</p>,
              }}
            >
              {resource.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* Focus Items - Conditional Layout Based on Slug */}
      {(() => {
        const slugLower = slug.toLowerCase();

        if (slugLower === "msme") {
          return (
            <GenericResourceSection
              items={resource.focus_items || []}
              layoutType="dark-cards"
              title="Why choose iFLOW?"
            />
          );
        } else if (slugLower === "retail" || slugLower === "wholesale") {
          return (
            <GenericResourceSection
              items={resource.focus_items || []}
              layoutType="grid"
              banner={resource.banner}
              title={slugLower === "retail" ? "Retail Lending Asset Classes" : "Wholesale Lending Asset Classes"}
            />
          );
        } else {
          return (
            <GenericResourceSection
              items={resource.focus_items || []}
              layoutType="circular"
            />
          );
        }
      })()}

      {/* FAQ Section */}
      {resource.faq_section && resource.faq_section.faqs && resource.faq_section.faqs.length > 0 && (
        <GenericSection
          data={resource.faq_section}
          layoutType="faq"
        />
      )}
    </main>
  );
}
