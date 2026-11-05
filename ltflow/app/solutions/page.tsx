import SolutionCard from "@/components/SolutionCard";
import { fetchSolutions } from "@/services/solutionsService";
import { Solution } from "@/utils/Solution";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  SOLUTION_GROUPS,
  getSolutionBySlug,
} from "@/utils/solutionsData";

export const metadata: Metadata = {
  title: "Digital Lending Solutions for Banks & NBFCs | Iflow",
  description:
    "Manage the complete lending lifecycle with iflow's digital lending solutions. From onboarding and LOS to collections, co-lending, and BNPL, built for banks, NBFCs, and fintechs.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Digital Lending Solutions for Banks & NBFCs | Iflow",
    description:
      "Manage the complete lending lifecycle with iflow's digital lending solutions. From onboarding and LOS to collections, co-lending, and BNPL, built for banks, NBFCs, and fintechs.",
    url: "https://iflow.co.in/solutions",
    siteName: "Iflow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "iFLOW Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Lending Solutions for Banks & NBFCs | Iflow",
    description:
      "Manage the complete lending lifecycle with iflow's digital lending solutions. From onboarding and LOS to collections, co-lending, and BNPL, built for banks, NBFCs, and fintechs.",
    images: ["/og-image.png"],
  },
};

export const revalidate = 60;

export default async function SolutionsPage() {
  let solutions: Solution[] = [];

  try {
    const { solutions: fetchedSolutions } = await fetchSolutions({
      page: 1,
      pageSize: 100,
    });

    solutions = fetchedSolutions;
  } catch (error) {
    console.error("Error fetching solutions:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "iFLOW Solutions",
            description:
              "Discover iFLOW's comprehensive digital lending solutions, including LOS, LMS, and Co-lending platforms designed to streamline financial operations and risk.",
            url: "https://iflow.co.in/solutions",
          }),
        }}
      />

      {/* ── REDESIGNED MODERN SOLUTIONS SECTION (Matches iflow-brand-redesign preview) ── */}
      <div className="relative overflow-hidden bg-white w-full">
        {/* Atmospheric Glow Backgrounds */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-200/40 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-fuchsia-100/40 blur-[100px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-10 pb-20">
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-widest text-[#7c3aed] uppercase mb-4">
            iFLOW Solutions
          </p>

          {/* Main Hero Heading with Gradient Accent */}
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12] max-w-4xl">
            Every module of modern lending,{" "}
            <span className="text-[#9a3f91]">
              connected
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mt-5">
            Twelve enterprise-grade products spanning origination, credit
            intelligence, servicing and growth — running on one platform,
            sharing one data spine.
          </p>

          {/* Solutions Groups Grid */}
          <div className="mt-14 space-y-16">
            {SOLUTION_GROUPS.map((group) => (
              <section key={group.label} className="relative">
                {/* Group Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {group.label}
                  </h2>
                  <div className="h-[1px] flex-1 bg-slate-200/80" />
                </div>

                {/* 3-Column Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.slugs.map((slug) => {
                    const item = getSolutionBySlug(slug);
                    if (!item) return null;
                    const IconComp = item.icon;

                    return (
                      <Link
                        key={item.slug}
                        href={`/solutions/${item.slug}`}
                        className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-950/10"
                      >
                        <div>
                          {/* Top Row: Icon Badge & Arrow */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#623f99] flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#623f99] group-hover:to-[#9a3f91] group-hover:text-white transition-all duration-300 shadow-sm">
                              <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-50 group-hover:text-[#623f99] transition-colors">
                              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </div>

                          {/* Tag */}
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a3f91] block mb-1.5">
                            {item.tag}
                          </span>

                          {/* Title */}
                          <h3 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#623f99] transition-colors">
                            {item.name}
                          </h3>

                          {/* Description */}
                          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                            {item.blurb}
                          </p>
                        </div>

                        {/* Bottom Link Action */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#623f99]">
                          <span>Explore module</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRESERVED ORIGINAL CODE (HIDDEN AS REQUESTED: "dont remove remove code only hide") ── */}
      <div className="hidden" aria-hidden="true">
        <section className="relative w-full py-12 px-4 sm:px-6 lg:px-16 overflow-hidden">
          {/* 48.svg — bottom left, matches homepage exactly */}
          <div className="hidden md:block">
            <div
              className="absolute bottom-24 left-0 w-[500px] h-[400px] pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <Image
                src="/hero/48.svg"
                alt="Background Shape"
                fill
                className="object-contain object-top-left opacity-90"
                priority
              />
            </div>
          </div>

          {/* Mobile Backgrounds */}
          <div className="block md:hidden">
            <div
              className="absolute top-0 right-0 w-[300px] h-[350px] pointer-events-none overflow-hidden"
              style={{ zIndex: 0 }}
            >
              <Image
                src="/hero/43-mobile.png"
                alt="Mobile Top Shape"
                fill
                className="object-contain object-right opacity-80"
                priority
              />
            </div>
            <div
              className="absolute bottom-10 left-0 w-[250px] h-[250px] pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <Image
                src="/hero/48.png"
                alt="Mobile Bottom Shape"
                fill
                className="object-contain object-left opacity-80"
                priority
              />
            </div>
          </div>

          <Reveal className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#1a2b49] ">
                iFLOW Solutions
              </h2>
              <p className="text-3xl text-gray-500 font-medium mt-1">
                {" "}
                Our Solutions
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {solutions.length > 0 ? (
                solutions.map((solution) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    showContinueButton={false}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No solutions found.
                </p>
              )}
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
