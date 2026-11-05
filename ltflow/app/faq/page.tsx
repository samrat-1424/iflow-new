import type { Metadata } from "next";
import Faq from "@/components/Faq";
import { fetchFaqs } from "@/services/faqService";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | iFLOW",
  description:
    "Find answers to common questions about iFLOW's enterprise lending technology platform and services.",
  alternates: {
    canonical: "/faq",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function FaqPage() {
  const categories = await fetchFaqs();

  return <Faq categories={categories} />;
}
