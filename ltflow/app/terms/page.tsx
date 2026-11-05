import type { Metadata } from "next";
import TermsOfUse from "@/components/TermsOfUse";

export const metadata: Metadata = {
  title: "Terms of Use | iFLOW",
  description:
    "Read the iFLOW Terms of Use to understand the rules and guidelines for using our enterprise lending technology platform.",
  alternates: {
    canonical: "/terms",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function TermsPage() {
  return <TermsOfUse />;
}
