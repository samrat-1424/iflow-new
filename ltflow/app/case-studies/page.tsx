import type { Metadata } from "next";
import CaseStudies from "@/components/CaseStudies";

export const metadata: Metadata = {
  title: "Digital Lending Success Stories & Case Studies | iFLOW",
  description: "See how banks, NBFCs, and fintech companies improve lending operations with iFLOW's digital lending solutions through real-world case studies and business success stories.",
  alternates: {
    canonical: "https://iflow.co.in/case-studies",
  },
  openGraph: {
    title: "Digital Lending Success Stories & Case Studies | iFLOW",
    description: "See how banks, NBFCs, and fintech companies improve lending operations with iFLOW's digital lending solutions through real-world case studies.",
    url: "https://iflow.co.in/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Lending Success Stories & Case Studies | iFLOW",
    description: "See how banks, NBFCs, and fintech companies improve lending operations with iFLOW's digital lending solutions.",
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <CaseStudies />
    </main>
  );
}

