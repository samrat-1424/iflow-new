"use client";

// components/Testimonials.tsx
import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

interface TestimonialData {
  logo: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
  // Dynamic Inline CSS styles for hover card background, shadow, and avatar color
  hoverBg: string;
  hoverShadow: string;
  brandColor: string;
}

const testimonials: TestimonialData[] = [
  {
    logo: "/hero/bom.png",
    quote: "“iFLOW enabled us to launch and manage our co-lending operations efficiently with configurable workflows, seamless partner integration, and automated loan lifecycle management. The platform significantly reduced operational complexity and improved turnaround times.”",
    name: "Gaurav Tripathi",
    role: "AGM - Co-Lending Transformation",
    initials: "GT",
    gradient: "from-purple-500 to-purple-600",
    hoverBg: "linear-gradient(135deg, #0a3a60 0%, #021f38 100%)",
    hoverShadow: "0 20px 40px rgba(10, 58, 96, 0.3)",
    brandColor: "#0a3a60",
  },
  {
    logo: "/hero/cosmos.png",
    quote: "“The flexibility of iFLOW allowed us to build multiple onboarding journeys and product schemes with minimal effort. The platform helped us accelerate loan processing while maintaining complete control over our lending workflows.”",
    name: "Anish Deshpande",
    role: "Manager - Digital Onboarding & Product Config",
    initials: "AD",
    gradient: "from-red-600 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #9f2a2a 0%, #3d3f92 100%)",
    hoverShadow: "0 20px 40px rgba(159, 42, 42, 0.3)",
    brandColor: "#9f2a2a",
  },
  {
    logo: "/hero/zor.jpg",
    quote: "“iFLOW digitized our lending operations through a comprehensive onboarding journey, LOS, automated eligibility calculations, and CAM report generation. This has enhanced our underwriting efficiency and improved decision-making.”",
    name: "Tanaz",
    role: "Credit Head - Journey, LOS & Credit Assessment",
    initials: "TZ",
    gradient: "from-red-500 to-rose-600",
    hoverBg: "linear-gradient(135deg, #b33939 0%, #450a0a 100%)",
    hoverShadow: "0 20px 40px rgba(179, 57, 57, 0.3)",
    brandColor: "#b33939",
  },
  {
    logo: "/hero/shaan.png",
    quote: "“Partnering with iFLOW transformed our lending operations from manual processes to a fully digital ecosystem. From onboarding and underwriting to disbursement, LMS, and collections, the platform has streamlined our entire business.”",
    name: "Santosh Jena",
    role: "Credit Head - End-to-End Lending Digitization",
    initials: "SJ",
    gradient: "from-purple-500 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #0056b3 0%, #001a33 100%)",
    hoverShadow: "0 20px 40px rgba(0, 86, 179, 0.3)",
    brandColor: "#0056b3",
  },
  {
    logo: "/hero/urban.png",
    quote: "“iFLOW's API ecosystem enabled seamless integration across our lending processes. Their scalable architecture and quick deployment capabilities helped us accelerate digital transformation initiatives.”",
    name: "Deepak Kushwaha",
    role: "API Infrastructure Services",
    initials: "DK",
    gradient: "from-slate-500 to-slate-600",
    hoverBg: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
    hoverShadow: "0 20px 40px rgba(51, 65, 85, 0.3)",
    brandColor: "#334155",
  },
  {
    logo: "/hero/capwise.png",
    quote: "“iFLOW delivered a robust lending infrastructure for our high-ticket working capital and business loan products. Their LOS, LMS, collection management, and customer journey capabilities provided a strong foundation for growth.”",
    name: "Usha",
    role: "Working Capital & Business Loan Platform",
    initials: "US",
    gradient: "from-purple-400 to-purple-600",
    hoverBg: "linear-gradient(135deg, #0080c7 0%, #004066 100%)",
    hoverShadow: "0 20px 40px rgba(0, 128, 199, 0.3)",
    brandColor: "#0080c7",
  },
  {
    logo: "/hero/navnit.png",
    quote: "“The iFLOW team demonstrated exceptional project management capabilities while delivering our lending platform. Their ability to manage the entire implementation lifecycle ensured a smooth and successful deployment.”",
    name: "Navnit Group Team",
    role: "End-to-End Project Execution",
    initials: "NG",
    gradient: "from-purple-500 to-slate-600",
    hoverBg: "linear-gradient(135deg, #2e549b 0%, #172a4e 100%)",
    hoverShadow: "0 20px 40px rgba(46, 84, 155, 0.3)",
    brandColor: "#2e549b",
  },
  {
    logo: "/hero/marsh.png",
    quote: "“iFLOW's API services helped us streamline our financial processes through secure integrations and automation. The implementation improved operational efficiency and reduced manual intervention significantly.”",
    name: "Khushal Kadakia",
    role: "Financial API Integration",
    initials: "KK",
    gradient: "from-purple-500 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #002e79 0%, #001233 100%)",
    hoverShadow: "0 20px 40px rgba(0, 46, 121, 0.3)",
    brandColor: "#002e79",
  },
  {
    logo: "/hero/saveo.png",
    quote: "“The API-driven architecture provided by iFLOW enabled us to strengthen our healthcare financing ecosystem. Their integration capabilities helped us automate critical financial verification processes.”",
    name: "Amit Kumar",
    role: "CEO - Healthcare Finance API Services",
    initials: "AK",
    gradient: "from-indigo-400 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #494494 0%, #201a4b 100%)",
    hoverShadow: "0 20px 40px rgba(73, 68, 148, 0.3)",
    brandColor: "#494494",
  },
  {
    logo: "/hero/unofin.png",
    quote: "“iFLOW successfully transformed our healthcare BNPL business by replacing spreadsheet-driven operations with a scalable digital platform. The automation improved productivity, accuracy, and customer experience.”",
    name: "UnoFIN Team",
    role: "BNPL Healthcare Lending Platform",
    initials: "UF",
    gradient: "from-purple-500 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #993f90 0%, #4c1a47 100%)",
    hoverShadow: "0 20px 40px rgba(153, 63, 144, 0.3)",
    brandColor: "#993f90",
  },
  {
    logo: "/hero/docboyz.png",
    quote: "“iFLOW delivered a comprehensive debt management and agency management solution tailored to our requirements. The platform improved collection tracking, operational visibility, and overall efficiency.”",
    name: "Ashok Kumar",
    role: "Founder - Debt & Agency Management",
    initials: "AK",
    gradient: "from-red-500 to-rose-600",
    hoverBg: "linear-gradient(135deg, #ec1f24 0%, #750f12 100%)",
    hoverShadow: "0 20px 40px rgba(236, 31, 36, 0.3)",
    brandColor: "#ec1f24",
  },
  {
    logo: "/hero/gokwik.png",
    quote: "“iFLOW's intelligent credit eligibility engine helped us strengthen our BNPL offering by evaluating customers in real time during checkout. The integration improved approval quality and conversion rates.”",
    name: "GoKwik Team",
    role: "BNPL & Intelligent Credit Eligibility",
    initials: "GK",
    gradient: "from-purple-500 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #004c8d 0%, #002646 100%)",
    hoverShadow: "0 20px 40px rgba(0, 76, 141, 0.3)",
    brandColor: "#004c8d",
  },
  {
    logo: "/hero/scoreme.png",
    quote: "“The customized Loan Management System provided by iFLOW enabled efficient handling of high-volume daily EMI collections. The platform delivers the reliability and scalability our business requires.”",
    name: "Bhavesh Bansal",
    role: "LMS for Daily Collection Management",
    initials: "BB",
    gradient: "from-violet-500 to-fuchsia-600",
    hoverBg: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
    hoverShadow: "0 20px 40px rgba(124, 58, 237, 0.25)",
    brandColor: "#7c3aed",
  },
  {
    logo: "/hero/finvesco.png",
    quote: "“iFLOW's no-code platform and AI-driven Business Rule Engine enabled us to automate eligibility assessments across multiple business and equipment loan products. The configurable architecture supports rapid product innovation.”",
    name: "Karthik Kolluri",
    role: "CTO - AI-Powered Business Lending",
    initials: "KK",
    gradient: "from-amber-500 to-orange-600",
    hoverBg: "linear-gradient(135deg, #d97706 0%, #78350f 100%)",
    hoverShadow: "0 20px 40px rgba(217, 119, 6, 0.25)",
    brandColor: "#d97706",
  },
  {
    logo: "/hero/curebay.png",
    quote: "“iFLOW's API services helped us build a connected healthcare financing ecosystem by simplifying integrations and enabling seamless data exchange across stakeholders.”",
    name: "Sibbon Tarfdar",
    role: "Healthcare Finance API Ecosystem",
    initials: "ST",
    gradient: "from-emerald-500 to-green-600",
    hoverBg: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
    hoverShadow: "0 20px 40px rgba(5, 150, 105, 0.25)",
    brandColor: "#059669",
  },
];

export default function Testimonials() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  return (
    <Reveal>
      <section className="w-full bg-[#f8fafc]/60 py-20 relative overflow-hidden">
        {/* Decorative ambient background blurs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -z-10" />

        {/* Global Styles for Infinite Marquee Smooth Movement */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee-scroll {
            display: flex;
            animation: marquee-scroll 45s linear infinite;
            width: max-content;
          }
          .animate-marquee-scroll.paused {
            animation-play-state: paused;
          }
        `}} />

        <div className="w-full">
          {/* Section Header */}
          <div 
            className="max-w-4xl mx-auto text-center mb-12 sm:mb-14 px-6"
            onMouseEnter={() => setIsHeaderHovered(true)}
            onMouseLeave={() => setIsHeaderHovered(false)}
          >
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-purple-700 mb-3">
              CLIENT TESTIMONIALS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Success{" "}
              <span className="text-[#9a3f91]">
                Stories
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
              Straight from lending leaders, credit heads, and partners transforming financial operations with iFLOW.
            </p>
          </div>

          {/* Marquee Outer Container */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Elegant fade masks on borders */}
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fdfdfe] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fdfdfe] to-transparent z-10 pointer-events-none" />

            {/* Marquee Inner Scroller Track */}
            <div className={`animate-marquee-scroll flex gap-6 px-3 ${isHeaderHovered || hoveredCardId ? 'paused' : ''}`}>
              {/* First Copy of Cards */}
              {testimonials.map((t, idx) => {
                const cardId = `first-${idx}`;
                const isHovered = hoveredCardId === cardId;

                return (
                  <div
                    key={cardId}
                    onMouseEnter={() => setHoveredCardId(cardId)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={
                      isHovered
                        ? {
                            background: t.hoverBg,
                            borderColor: "transparent",
                            boxShadow: t.hoverShadow,
                            transform: "translateY(-8px)",
                          }
                        : {}
                    }
                    className="bg-white rounded-3xl border border-slate-100/90 p-8 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out flex flex-col justify-between h-[380px] w-[350px] md:w-[400px] shrink-0"
                  >
                    {/* Logo & Quote */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`font-serif text-5xl leading-none -mt-4 select-none transition-colors duration-300 ${isHovered ? "text-white/20" : "text-purple-100"}`}>“</span>
                        {/* Always present clean white badge for logos */}
                        <div className="bg-white border border-slate-100/50 rounded-2xl px-4 py-1.5 flex items-center justify-center shadow-sm h-11 shrink-0 w-28 relative">
                          <Image
                            src={t.logo}
                            alt={t.name}
                            fill
                            className="object-contain p-1"
                            sizes="112px"
                          />
                        </div>
                      </div>

                      <p className={`text-[14.5px] leading-relaxed font-normal transition-colors duration-300 ${isHovered ? "text-white" : "text-slate-700"}`}>
                        {t.quote}
                      </p>
                    </div>

                    {/* Divider & User Details */}
                    <div className="mt-6 flex flex-col">
                      <div className={`w-full h-[1px] mb-5 transition-colors duration-300 ${isHovered ? "bg-white/20" : "bg-slate-100/80"}`} />
                      <div className="flex items-center gap-3">
                        {/* Profile Initials with hover transition to white bg */}
                        {isHovered ? (
                          <div
                            style={{ color: t.brandColor }}
                            className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm bg-white shadow-sm transition-all duration-300"
                          >
                            {t.initials}
                          </div>
                        ) : (
                          <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white shadow-sm bg-gradient-to-tr ${t.gradient} transition-all duration-300`}>
                            {t.initials}
                          </div>
                        )}
                        
                        <div className="flex flex-col">
                          <span className={`font-bold text-[14.5px] leading-none transition-colors duration-300 ${isHovered ? "text-white" : "text-slate-900"}`}>
                            {t.name}
                          </span>
                          <span className={`text-[12px] font-medium mt-1 transition-colors duration-300 ${isHovered ? "text-white/70" : "text-slate-400"}`}>
                            {t.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Second Copy of Cards for seamless infinite loop */}
              {testimonials.map((t, idx) => {
                const cardId = `second-${idx}`;
                const isHovered = hoveredCardId === cardId;

                return (
                  <div
                    key={cardId}
                    onMouseEnter={() => setHoveredCardId(cardId)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={
                      isHovered
                        ? {
                            background: t.hoverBg,
                            borderColor: "transparent",
                            boxShadow: t.hoverShadow,
                            transform: "translateY(-8px)",
                          }
                        : {}
                    }
                    className="bg-white rounded-3xl border border-slate-100/90 p-8 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out flex flex-col justify-between h-[380px] w-[350px] md:w-[400px] shrink-0"
                  >
                    {/* Logo & Quote */}
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`font-serif text-5xl leading-none -mt-4 select-none transition-colors duration-300 ${isHovered ? "text-white/20" : "text-purple-100"}`}>“</span>
                        {/* Always present clean white badge for logos */}
                        <div className="bg-white border border-slate-100/50 rounded-2xl px-4 py-1.5 flex items-center justify-center shadow-sm h-11 shrink-0 w-28 relative">
                          <Image
                            src={t.logo}
                            alt={t.name}
                            fill
                            className="object-contain p-1"
                            sizes="112px"
                          />
                        </div>
                      </div>

                      <p className={`text-[14.5px] leading-relaxed font-normal transition-colors duration-300 ${isHovered ? "text-white" : "text-slate-700"}`}>
                        {t.quote}
                      </p>
                    </div>

                    {/* Divider & User Details */}
                    <div className="mt-6 flex flex-col">
                      <div className={`w-full h-[1px] mb-5 transition-colors duration-300 ${isHovered ? "bg-white/20" : "bg-slate-100/80"}`} />
                      <div className="flex items-center gap-3">
                        {/* Profile Initials with hover transition to white bg */}
                        {isHovered ? (
                          <div
                            style={{ color: t.brandColor }}
                            className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm bg-white shadow-sm transition-all duration-300"
                          >
                            {t.initials}
                          </div>
                        ) : (
                          <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm text-white shadow-sm bg-gradient-to-tr ${t.gradient} transition-all duration-300`}>
                            {t.initials}
                          </div>
                        )}
                        
                        <div className="flex flex-col">
                          <span className={`font-bold text-[14.5px] leading-none transition-colors duration-300 ${isHovered ? "text-white" : "text-slate-900"}`}>
                            {t.name}
                          </span>
                          <span className={`text-[12px] font-medium mt-1 transition-colors duration-300 ${isHovered ? "text-white/70" : "text-slate-400"}`}>
                            {t.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
