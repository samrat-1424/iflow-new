import type { Metadata } from "next";
import BookADemoForm from "@/components/BookADemoForm";

export const metadata: Metadata = {
  title: "Book a Demo for Digital Lending Solutions | Iflow",
  description: "Want to see how iflow works before you commit? Book a quick product demo with our team, we'll walk you through the platform and answer any questions specific to your lending setup.",
  alternates: {
    canonical: "/book-a-demo",
  },
};

export default function BookADemo() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 mt-12 md:mt-12">
      <BookADemoForm />
    </div>
  );
}
