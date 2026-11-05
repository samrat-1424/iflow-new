import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import { fetchCaseStudy, fetchCaseStudies } from "@/services/caseStudyService";

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const data = await fetchCaseStudies({ pageSize: 100 });
    return (data.caseStudies || []).map((cs) => ({
      slug: cs.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for case studies:", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: CaseStudyDetailPageProps
): Promise<Metadata> {
  const resolvedParams = (await params) as { slug: string };
  const caseStudy = await fetchCaseStudy(resolvedParams.slug);
  const canonicalUrl = `https://iflow.co.in/case-studies/${resolvedParams.slug}`;

  if (!caseStudy) {
    return {
      title: "Case Study not found | iFLOW",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  const title = caseStudy.meta_title || `${caseStudy.title} | iFLOW Case Study`;
  const description = caseStudy.meta_description || caseStudy.subtitle || (caseStudy.full_content || "").slice(0, 160);
  const images = caseStudy.banner?.url ? [`${process.env.NEXT_PUBLIC_STRAPI_IMG_URL || 'http://localhost:1337'}${caseStudy.banner.url}`] : [];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const resolvedParams = (await params) as { slug: string };
  const caseStudy = await fetchCaseStudy(resolvedParams.slug);

  if (!caseStudy) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.subtitle || caseStudy.meta_description || "",
    "url": `https://iflow.co.in/case-studies/${caseStudy.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "iFLOW",
      "url": "https://iflow.co.in"
    },
    "author": {
      "@type": "Organization",
      "name": caseStudy.author || "iFLOW Team"
    },
    "datePublished": caseStudy.published_on || caseStudy.date || "2026-01-01"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyDetail caseStudy={caseStudy} />
    </>
  );
}

