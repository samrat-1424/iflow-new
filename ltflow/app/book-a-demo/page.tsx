import type { Metadata } from "next";
import BookADemoForm from "@/components/BookADemoForm";

export const metadata: Metadata = {
  title: "Book a Demo for Digital Lending Solutions | Iflow",
  description:
    "Want to see how iflow works before you commit? Book a quick product demo with our team, we'll walk you through the platform and answer any questions specific to your lending setup.",
  alternates: {
    canonical: "/book-a-demo",
  },
};

export default function BookADemoPage() {
  return (
    <main className="min-h-[calc(100dvh-64px)] relative overflow-hidden bg-gradient-to-b from-[#F6F3FC] via-[#FAF8FF] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* Ambient background glow circles matching website Hero theme */}
      <div className="absolute -top-28 -left-28 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-0 w-[420px] h-[420px] bg-fuchsia-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[280px] bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Radial Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #623f99 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* The Central Robust, Colorful, Structural Demo Section */}
      <div className="relative z-10 w-full flex justify-center items-center my-auto">
        <BookADemoForm />
      </div>
    </main>
  );
}
