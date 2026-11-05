import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Data Protection & Privacy",
  description:
    "Read the iFLOW Privacy Policy to understand how we collect, use, and protect your personal data while using our digital lending infrastructure and services.",
  alternates: {
    canonical: "/privacy-policy",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

async function fetchPrivacyPolicy() {
  const cmsToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

  try {
    const response = await fetch(
      `${baseUrl}/privacy-policy?populate=*`, 
     
    );

    if (!response.ok) {
      throw new Error("Failed to fetch privacy policy");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return null;
  }
}

export const revalidate = 3600; // Revalidate every hour

export default async function PrivacyPolicyPage() {
  const policy = await fetchPrivacyPolicy();

  if (!policy) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Privacy Policy Not Found
        </h2>
        <p className="text-gray-500">
          Sorry, we couldn't load the privacy policy at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight">
            {policy.title || "Privacy Policy for iFLOW"}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="prose prose-lg prose-gray max-w-none
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-headings:mt-8
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
          prose-ul:list-decimal prose-ul:ml-6 prose-ul:space-y-2
          prose-li:text-gray-700
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800">
          {typeof policy.content === 'string' ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {policy.content}
            </ReactMarkdown>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: policy.content }} />
          )}
        </div>

        {(policy.lastUpdated || policy.updatedAt) && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date(policy.lastUpdated || policy.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
