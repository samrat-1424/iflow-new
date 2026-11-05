import AboutSections from "./AboutSectionsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Iflow Digital Lending Technology Company | Iflow",
  description:
    "Iflow is a fintech company building lending technology for banks and NBFCs across India. We work on origination, credit decisioning, collections, and more, all under one platform.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Iflow Digital Lending Technology Company | Iflow",
    description: "Iflow is a fintech company building lending technology for banks and NBFCs across India. We work on origination, credit decisioning, collections, and more, all under one platform.",
    url: "https://iflow.co.in/about",
    siteName: "Iflow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Iflow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Iflow Digital Lending Technology Company | Iflow",
    description: "Iflow is a fintech company building lending technology for banks and NBFCs across India. We work on origination, credit decisioning, collections, and more, all under one platform.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About iFLOW",
            "description": "Learn about iFLOW's mission to transform financial operations through adaptive AI, smart loan architecture, and responsible digital lending ecosystems.",
            "url": "https://iflow.co.in/about"
          })
        }}
      />
      <main className="min-h-screen bg-white">
        <AboutSections />
      </main>
    </>
  );
}