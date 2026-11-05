
"use client";

// import { useEffect } from "react"; 
import HeroSection from "@/sections/HeroSection";
import TrustedClientsSection from "@/components/TrustedClientsSection";
import StatsSection from "@/components/StatsSection";
// import LeaderSection from "@/components/LeaderSection";
// import TeamSection from "@/components/TeamSection";
import SolutionsSection from "@/components/SolutionsSection";
import Testimonials from "@/components/Testimonials";
//import CaseStudies from "@/components/CaseStudies";
import BlogSection from "@/components/BlogSection";
import SuccessStories from "@/components/SuccessStories";
import Image from "next/image";
import Link from "next/link";
import CustomerFocusedSection from "@/components/CustomerFocusedSection";
import ConnectedEcosystemSection from "@/components/ConnectedEcosystemSection";
import AboutProgressSection from "@/components/AboutProgressSection";
import Reveal from "@/components/Reveal";
import ScrollZoomSection from "@/components/home/ScrollZoomSection";

export default function Home() {   //thisline 
  return (
    <>
      <style jsx global>{`
        html, body {
          overflow-x: clip; 
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "iFLOW - Digital Lending Infrastructure",
            "description": "iFLOW provides seamless digital lending infrastructure for Banks, NBFCs, and E-commerce. Streamline operations, reduce costs, and optimize credit decisioning.",
            "url": "https://iflow.co.in"
          })
        }}
      />
      <main>
      {/* HOME */}
      <section id="hero">
        <Reveal threshold={0.1}>
          <HeroSection />
        </Reveal>
      </section>

      {/* SCROLL ZOOM JOURNEY SECTION */}
      <ScrollZoomSection />

      {/* Trusted Clients Section */}
      <section>
        <Reveal delay={100}>
          <TrustedClientsSection />  
        </Reveal>
      </section>

      {/* Our Solutions Section */}
      <section>
        <SolutionsSection showContinueButton={false} isHome={true} /> 
      </section>

      {/* A Connected Ecosystem Section */}
      <section id="ecosystem">
        <Reveal>
          <ConnectedEcosystemSection />
        </Reveal>
      </section>

      {/* Curated Solutions For (Temporarily hidden - can be restored or removed later) */}
      {/* <section>
        <Reveal>
          <CustomerFocusedSection />
        </Reveal>
      </section> */}



      {/* ABOUT */}
      <section id="about">
        {/* LeaderSection and TeamSection removed from home page */}
      </section>

      {/* SUCCESS STORIES */}
      {/* <section id="success-stories">
        <SuccessStories />
      </section> */}


      {/* CASE STUDIES */}
      <section id="case-studies">
        {/* <CaseStudies />  */}
      </section>

      {/* TESTIMONIALS / SUCCESS STORIES */}
      <section>
        <Reveal>
          <Testimonials />
        </Reveal>
      </section>


      {/* ABOUT IFLOW: Progress isn't a destination */}
      <section id="about-progress">
        <Reveal>
          <AboutProgressSection />
        </Reveal>
      </section>
      {/* BLOGS */}
      <section id="blogs">
        <Reveal>
          <BlogSection />
        </Reveal>
      </section>

      {/* DEMO CTA */}
        <section id="demo">
          {/* <ContactUs /> */}
        </section>


      </main>
    </>
  );
}
