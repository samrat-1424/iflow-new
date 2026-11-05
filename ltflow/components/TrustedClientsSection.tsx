"use client";

import Image from "next/image";
import Reveal from "./Reveal";

interface ClientItem {
  name: string;
  src: string;
}

const CLIENTS: ClientItem[] = [
  { name: "Bank of Maharashtra", src: "/partners/bom.png" },
  { name: "Cosmos Bank", src: "/partners/cosmos.png" },
  { name: "Shaan Finance", src: "/partners/shaan.png" },
  { name: "Capwise", src: "/partners/capwise.png" },
  { name: "Urban Money", src: "/partners/urban.png" },
  { name: "Marsh", src: "/partners/marsh.png" },
  { name: "Raisn", src: "/partners/raisn.png" },
  { name: "SaveO", src: "/partners/saveo.png" },
  { name: "Unofin", src: "/partners/unofin.png" },
  { name: "Gokwik", src: "/partners/gokwik.png" },
  { name: "ScoreMe", src: "/partners/scoreme.png" },
  { name: "DocBoyz", src: "/partners/docboyz.png" },
  { name: "CureBay", src: "/partners/curebay.png" },
];

export default function TrustedClientsSection() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...CLIENTS, ...CLIENTS];

  return (
    <Reveal>
      <section className="relative w-full overflow-hidden py-6 sm:py-8 bg-white border-y border-slate-100">
        {/* Soft edge fade masks seamlessly blending into white background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Section Heading with compact margin */}
        <div className="max-w-7xl mx-auto px-6 mb-4 sm:mb-5 text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-slate-400">
            TRUSTED BY LEADING INDUSTRY PLAYERS
          </p>
        </div>

        {/* Infinite Marquee Track - Large Prominent Equal Height & Width Logos */}
        <div className="overflow-hidden w-full">
          <div className="flex gap-6 sm:gap-8 lg:gap-10 items-center min-w-max animate-ticker py-1">
            {marqueeItems.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex items-center justify-center transition-all duration-300 group cursor-default"
              >
                <div className="relative flex items-center justify-center h-14 sm:h-16 md:h-18 w-44 sm:w-52 md:w-60 flex-shrink-0">
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={440}
                    height={120}
                    className="h-11 sm:h-13 md:h-[60px] w-auto max-w-[170px] sm:max-w-[200px] md:max-w-[225px] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-ticker {
            animation: ticker 35s linear infinite;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </Reveal>
  );
}
