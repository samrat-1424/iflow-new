import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SolutionDetail from "@/components/SolutionDetail";
import { fetchSolution, fetchSolutions } from "@/services/solutionsService";

interface SolutionDetailPageProps {
  params: Promise<{ slug: string }>;
}

const SOLUTION_SEO_MAP: Record<string, { title: string; description: string }> = {
  "co-lending": {
    title: "Digital Co-Lending Platform for Banks & NBFCs | Iflow",
    description: "Running a co-lending program is complex, but iflow makes it manageable. Our co-lending platform handles fund flow, reconciliation, and compliance, so your team can stay focused on growth.",
  },
  "distribution": {
    title: "Loan Distribution Management Platform for Lenders | Iflow",
    description: "Expand your loan reach with iflow's lending distribution platform. Connect lenders with the right borrowers through a digital-first network built for banks, NBFCs, and fintech companies.",
  },
  "loan-origination-los": {
    title: "Loan Origination System (LOS) Software for Banks & NBFCs | iFLOW",
    description: "Accelerate digital lending with iFLOW's Loan Origination System (LOS). Automate paperless onboarding, instant e-KYC, multi-bureau scoring, BRE underwriting, and instant sanctions.",
  },
  "loan-management-lms": {
    title: "Loan Management System (LMS) Software for Lenders | Iflow",
    description: "Manage disbursements, repayments, and borrower records in one place. Iflow's loan management system helps lenders stay in control at every stage of the loan lifecycle.",
  },
  "bicri": {
    title: "BICRI – AI-Powered Business Credit Intelligence for MSMEs & Retailers | Iflow",
    description: "Evaluate MSMEs and retailers beyond traditional credit scores with iflow's BICRI. Ingests Account Aggregator cash flows, GST triangulation, and trade credit velocity in under 3 minutes.",
  },
  "bnpl-product-suite": {
    title: "Buy Now Pay Later (BNPL) Platform & Software | Iflow",
    description: "Launch and manage Buy Now Pay Later products with iflow's end-to-end BNPL suite, featuring flexible repayment structures, merchant integrations, and real-time credit decisions, all in one place.",
  },
  "msme-and-agri-tech-on-boarding-journeys": {
    title: "MSME & Agri Lending Onboarding Solutions | Iflow",
    description: "Simplify borrower onboarding for MSME and agri lending with iflow. Our digital onboarding journeys are designed to serve underserved segments faster, with minimal friction and full compliance.",
  },
  "collection": {
    title: "Loan Collection Management Software | Iflow",
    description: "Improve recovery operations with iflow's collection management software. Automate payment reminders, collections, tracking, and workflows for banks, NBFCs, and digital lending businesses.",
  },
  "on-boarding-journey": {
    title: "Digital Onboarding Platform with Powerful API Services | Iflow",
    description: "Deliver a smooth borrower experience with iflow's digital onboarding platform and lending API services. Integrate KYC, bureau checks, and loan flows quickly with our robust API stack.",
  },
  "ai-intelligent-suite": {
    title: "AI Intelligent Suite for Smarter Lending | Iflow",
    description: "Make faster, more accurate credit decisions with iflow's AI Intelligent Suite. Our platform uses alternative data and machine learning to build credit scoring models aligned with your lending portfolio.",
  },
  "ai-ml-score-models": {
    title: "AI Intelligent Suite for Smarter Lending | Iflow",
    description: "Make faster, more accurate credit decisions with iflow's AI Intelligent Suite. Our platform uses alternative data and machine learning to build credit scoring models aligned with your lending portfolio.",
  },
  "pool-buyout": {
    title: "Loan Pool Buyout Platform for Banks & NBFCs | Iflow",
    description: "Streamline portfolio acquisition, risk assessment, and capital transfer with precision using iflow's digital loan pool buyout platform.",
  },
  "dsa": {
    title: "DSA Management System Software for Lenders | Iflow",
    description: "Empower direct selling agents with end-to-end partner tracking, onboarding, and payout workflows using iflow's DSA Management System.",
  },
  "dsa-management-system": {
    title: "DSA Management System Software for Lenders | Iflow",
    description: "Empower direct selling agents with end-to-end partner tracking, onboarding, and payout workflows using iflow's DSA Management System.",
  },
  "ai-based-bre": {
    title: "AI Based BRE – Intelligent Business Rules Engine | Iflow",
    description: "Automate credit underwriting policies, scoring matrices, and instant decisioning with iflow's AI-powered Business Rules Engine (BRE).",
  },
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const seoSlugs = Object.keys(SOLUTION_SEO_MAP);
  try {
    const { solutions } = await fetchSolutions({ pageSize: 100 });
    const fetchedSlugs = solutions.map((s) => s.slug);
    const allSlugs = Array.from(new Set([...seoSlugs, ...fetchedSlugs]));
    return allSlugs.map((slug) => ({ slug }));
  } catch {
    return seoSlugs.map((slug) => ({ slug }));
  }
}

export async function generateMetadata(
  { params }: SolutionDetailPageProps
): Promise<Metadata> {
  const resolvedParams = (await params) as { slug: string };
  const solution = await fetchSolution(resolvedParams.slug);
  const canonicalUrl = `/solutions/${resolvedParams.slug}`;
  if (!solution) {
    return {
      title: "Solution not found",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  // Use the exact SEO mapping if available, otherwise fall back to Strapi dynamic metadata
  const mappedSEO = SOLUTION_SEO_MAP[resolvedParams.slug];
  const title = mappedSEO?.title || solution?.meta_title || solution?.title || "Solution";
  const description = mappedSEO?.description || solution?.meta_description || (solution?.full_content || "").slice(0, 160);

  const images = solution.banner?.url ? [`${process.env.STRAPI_IMG_URL || "https://cms.ltflow.com"}${solution.banner.url}`] : [];
  return {
    title,
    description,
    alternates: {
      canonical: `/solutions/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export const revalidate = 60;

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const resolvedParams = (await params) as { slug: string };
  if (resolvedParams.slug === "ai-ml-score-models") {
    redirect("/solutions/ai-intelligent-suite");
  }
  const solution = await fetchSolution(resolvedParams.slug);
  if (!solution) return notFound();
  return <SolutionDetail solution={solution} />;
}

 