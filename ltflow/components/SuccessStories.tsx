"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";

type Story = {
  id: number;
  client: string;
  person?: string;
  area: string;
  quote: string;
  category: string;
};

const tabs: string[] = [
  "All",
  "Acquisition",
  "Product Studio",
  "Delivery",
  "Asset Management",
];

const stories: Story[] = [
  {
    id: 1,
    client: "Bank of Maharashtra",
    person: "Gaurav Tripathi - AGM",
    area: "Co-Lending Transformation",
    category: "Product Studio",
    quote: "iFLOW enabled us to launch and manage our co-lending operations efficiently with configurable workflows, seamless partner integration, and automated loan lifecycle management. The platform significantly reduced operational complexity and improved turnaround times.",
  },
  {
    id: 2,
    client: "Cosmos Bank",
    person: "Anish Deshpande - Manager",
    area: "Digital Onboarding & Product Configuration",
    category: "Acquisition",
    quote: "The flexibility of iFLOW allowed us to build multiple onboarding journeys and product schemes with minimal effort. The platform helped us accelerate loan processing while maintaining complete control over our lending workflows.",
  },
  {
    id: 3,
    client: "The Zoroastrian Co-operative Bank",
    person: "Tanaz – Credit Head",
    area: "Journey, LOS & Automated Credit Assessment",
    category: "Acquisition",
    quote: "iFLOW digitized our lending operations through a comprehensive onboarding journey, LOS, automated eligibility calculations, and CAM report generation. This has enhanced our underwriting efficiency and improved decision-making.",
  },
  {
    id: 4,
    client: "Shaan Finance",
    person: "Santosh Jena - Credit Head",
    area: "End-to-End Lending Digitization",
    category: "Delivery",
    quote: "Partnering with iFLOW transformed our lending operations from manual processes to a fully digital ecosystem. From onboarding and underwriting to disbursement, LMS, and collections, the platform has streamlined our entire business.",
  },
  {
    id: 5,
    client: "Urban Money",
    person: "Deepak Kushwaha",
    area: "API Infrastructure Services",
    category: "Acquisition",
    quote: "iFLOW's API ecosystem enabled seamless integration across our lending processes. Their scalable architecture and quick deployment capabilities helped us accelerate digital transformation initiatives.",
  },
  {
    id: 6,
    client: "Capwise",
    person: "Usha",
    area: "Working Capital & Business Loan Platform",
    category: "Delivery",
    quote: "iFLOW delivered a robust lending infrastructure for our high-ticket working capital and business loan products. Their LOS, LMS, collection management, and customer journey capabilities provided a strong foundation for growth.",
  },
  {
    id: 7,
    client: "Navnit Group",
    area: "End-to-End Project Execution",
    category: "Delivery",
    quote: "The iFLOW team demonstrated exceptional project management capabilities while delivering our lending platform. Their ability to manage the entire implementation lifecycle ensured a smooth and successful deployment.",
  },
  {
    id: 8,
    client: "Marsh Proptech",
    person: "Khushal Kadakia",
    area: "Financial API Integration",
    category: "Delivery",
    quote: "iFLOW's API services helped us streamline our financial processes through secure integrations and automation. The implementation improved operational efficiency and reduced manual intervention significantly.",
  },
  {
    id: 9,
    client: "Saveo",
    person: "Amit Kumar – CEO",
    area: "Healthcare Finance API Services",
    category: "Acquisition",
    quote: "The API-driven architecture provided by iFLOW enabled us to strengthen our healthcare financing ecosystem. Their integration capabilities helped us automate critical financial verification processes.",
  },
  {
    id: 10,
    client: "UnoFIN",
    area: "BNPL Healthcare Lending Platform",
    category: "Product Studio",
    quote: "iFLOW successfully transformed our healthcare BNPL business by replacing spreadsheet-driven operations with a scalable digital platform. The automation improved productivity, accuracy, and customer experience.",
  },
  {
    id: 11,
    client: "DocBoyz",
    person: "Ashok Kumar – Founder",
    area: "Debt Management & Agency Management",
    category: "Asset Management",
    quote: "iFLOW delivered a comprehensive debt management and agency management solution tailored to our requirements. The platform improved collection tracking, operational visibility, and overall efficiency.",
  },
  {
    id: 12,
    client: "GoKwik",
    area: "BNPL & Intelligent Credit Eligibility",
    category: "Product Studio",
    quote: "iFLOW's intelligent credit eligibility engine helped us strengthen our BNPL offering by evaluating customers in real time during checkout. The integration improved approval quality and conversion rates.",
  },
  {
    id: 13,
    client: "ScoreMe",
    person: "Bhavesh Bansal",
    area: "LMS for Daily Collection Management",
    category: "Asset Management",
    quote: "The customized Loan Management System provided by iFLOW enabled efficient handling of high-volume daily EMI collections. The platform delivers the reliability and scalability our business requires.",
  },
  {
    id: 14,
    client: "Finvesco Capital",
    person: "Karthik Kolluri - CTO",
    area: "AI-Powered Business Lending",
    category: "Product Studio",
    quote: "iFLOW's no-code platform and AI-driven Business Rule Engine enabled us to automate eligibility assessments across multiple business and equipment loan products. The configurable architecture supports rapid product innovation.",
  },
  {
    id: 15,
    client: "CureBay",
    person: "Sibbon Tarfdar",
    area: "Healthcare Finance API Ecosystem",
    category: "Acquisition",
    quote: "iFLOW's API services helped us build a connected healthcare financing ecosystem by simplifying integrations and enabling seamless data exchange across stakeholders.",
  },
];

function getInitials(name: string): string {
  const clean = name.replace("The ", "");
  const parts = clean.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return clean.slice(0, 2).toUpperCase();
}

function StoryCard({ story }: { story: Story }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300 p-6 flex flex-col justify-between flex-shrink-0 w-[310px] sm:w-[350px] min-h-[380px] relative overflow-hidden">
      <span className="absolute -right-4 -top-8 text-[120px] font-serif text-purple-50 select-none pointer-events-none">
        "
      </span>

      <div>
        <div className="flex items-center gap-3.5 mb-5 relative z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#623f99]/10 to-[#9a3f91]/10 border border-[#623f99]/20 text-[#623f99] font-bold text-sm select-none">
            {getInitials(story.client)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
              {story.client}
            </h3>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 bg-[#623f99]/5 text-[#623f99] text-[10px] font-bold uppercase tracking-wider rounded-md">
              {story.area}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-gray-600 font-medium italic relative z-10 mb-6">
          &ldquo;{story.quote}&rdquo;
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-auto flex justify-between items-center relative z-10">
        <span className="text-[11px] font-bold text-[#9a3f91] uppercase tracking-wider bg-[#9a3f91]/5 px-2 py-0.5 rounded">
          {story.category}
        </span>
        {story.person && (
          <span className="text-[11px] font-semibold text-gray-500 italic truncate max-w-[180px]">
            &mdash; {story.person}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef<boolean>(false);
  const positionRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const isAll = activeTab === "All";

  const filteredStories = isAll
    ? stories
    : stories.filter((s) => s.category === activeTab);

  // Duplicate for seamless loop on "All" tab
  const displayStories = isAll
    ? [...filteredStories, ...filteredStories]
    : filteredStories;

  // requestAnimationFrame-based scroll — zero CSS animations
  useEffect(() => {
    if (!isAll) return;

    const track = trackRef.current;
    if (!track) return;

    positionRef.current = 0;
    track.style.transform = "translateX(0px)";

    const animate = () => {
      if (!isPausedRef.current) {
        positionRef.current += 0.6;
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= halfWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isAll]);

  return (
    <section
      className="w-full py-16 bg-gradient-to-b from-[#fbfbfb] to-[#f4f3f7] relative overflow-hidden"
      style={{
        backgroundImage: "url('/hero/globe.png')",
        backgroundPosition: "top right",
        backgroundSize: "380px auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading + Tabs inside Reveal for scroll-in animation */}
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1b1f3b] tracking-tight">
              Client Success Stories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              Discover how leading banks, NBFCs, and fintech companies transform their lending ecosystem using iFLOW.
            </p>
          </div>

          <div className="flex overflow-x-auto scrollbar-none space-x-3 mb-10 justify-start md:justify-center pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-shrink-0 cursor-pointer px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] border-transparent text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Stories strip — outside Reveal so transform context doesn't block mouse events */}
      {isAll ? (
        <div
          className="overflow-hidden w-full cursor-pointer mt-2"
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          <div
            ref={trackRef}
            className="flex gap-6 px-6"
            style={{ width: "max-content", willChange: "transform" }}
          >
            {displayStories.map((story, idx) => (
              <StoryCard key={`${story.id}-${idx}`} story={story} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="overflow-x-auto pb-6 scrollbar-none -mx-4 px-4">
            <div className="flex gap-6 flex-nowrap">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
