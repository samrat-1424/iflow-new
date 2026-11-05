"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Solution } from "@/utils/Solution";

interface SolutionCardProps {
  solution: Solution;
  showContinueButton?: boolean;
  isLarge?: boolean;
}

const getShortDesc = (slug: string, metaDesc?: string): string => {
  const customDescs: Record<string, string> = {
    "co-lending": "Facilitate automated tripartite lending partnership between banks & NBFCs.",
    "distribution": "Optimize channel networks and smart loan distribution operations.",
    "loan-origination-los": "Streamline lead ingestion, underwriting, and risk assessment workflows.",
    "loan-management-lms": "Automate servicing, repayment lifecycle, and real-time ledger management.",
    "bicri": "Unlock deep analytics, operational business intelligence, and risk insights.",
    "bnpl-product-suite": "Deploy instant credit models and flexible buy-now-pay-later checkouts.",
    "msme-and-agri-tech-on-boarding-journeys": "Digitize complex rural, MSME, and agri-focused onboarding routes.",
    "collection": "Power intelligence-driven recovery journeys and customer repayment routes.",
    "on-boarding-journey": "Ensure seamless digital KYC, verification, and onboarding flows."
  };
  return customDescs[slug] || metaDesc || "Innovative digital credit platform and lending solution.";
};

export default function SolutionCard({
  solution,
  showContinueButton = true,
  isLarge = false,
}: SolutionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shortDescription = getShortDesc(solution.slug, solution.meta_description);

  return (
    <div 
      className="w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: "1000px",
        height: "260px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transformStyle: "preserve-3d",
          transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer",
        }}
      >
        {/* FRONT FACE */}
        <div
          className="flex flex-col border border-gray-200 rounded-3xl bg-white shadow-[0_8px_25px_-8px_rgba(26,43,73,0.06)] hover:shadow-[0_15px_35px_-8px_rgba(154,63,145,0.14)] transition-shadow duration-300 p-6 items-center justify-center gap-4"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Solution Banner / Image */}
          <div className="w-full relative flex items-center justify-center h-28">
            <div className="relative w-[85px] h-[85px] transition-transform duration-500 hover:scale-105">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "http://localhost:1337"}${solution.banner.url}`}
                alt={solution.banner.alt || "Solution Banner"}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Solution Title */}
          <h3 className="text-[16px] font-bold text-[#1a2b49] text-center leading-tight">
            {solution.title}
          </h3>
        </div>

        {/* BACK FACE */}
        <div
          className="flex flex-col border border-[#9a3f91]/25 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-[0_8px_30px_-8px_rgba(154,63,145,0.12)] p-6 items-center justify-between text-center"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Back Header - Small Title */}
          <div>
            <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              {solution.title}
            </h4>
            <div className="w-8 h-[2px] bg-[#9a3f91]/30 mx-auto rounded-full" />
          </div>

          {/* Solution Description */}
          <p className="text-[12px] text-gray-600 font-medium leading-relaxed px-1">
            {shortDescription}
          </p>

          {/* Explorable Link */}
          <div className="flex flex-col items-center w-full mt-2">
            <Link
              href={`/solutions/${solution.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#9a3f91] to-[#1a2b49] rounded-full hover:shadow-md hover:scale-105 transition-all duration-300 w-fit"
            >
              Explore Solution
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
