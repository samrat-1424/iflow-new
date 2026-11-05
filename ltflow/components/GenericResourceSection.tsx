"use client";

import Image from "next/image";

interface FocusItem {
  id: number;
  title: string;
  icon: string;
  order: number;
  description?: string; 
}

interface GenericResourceSectionProps {
  items: FocusItem[];
  layoutType: "dark-cards" | "grid" | "circular";
  title?: string;
  banner?: string;
}

export default function GenericResourceSection({
  items,
  layoutType,
  title,
  banner,
}: GenericResourceSectionProps) {
  if (!items || items.length === 0) return null;

  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "http://localhost:1337";

  // LAYOUT: Dark Cards (MSME)
  if (layoutType === "dark-cards") {
    return (
      <section className="relative py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center md:text-left">
            {title || "Why choose iFLOW?"}
          </h2>
          <p className="text-gray-300 mb-12 max-w-3xl text-center md:text-left">
            Get fast, flexible, and collateral-free MSME Business loans of up to ₹30 lakhs with a simple,
            digital-first process and doorstep service in your preferred language.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sortedItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6">
                  {item.icon && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.icon.startsWith("http") ? item.icon : `${baseUrl}${item.icon}`}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.description || ""}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Grid (Retail/Wholesale)
  if (layoutType === "grid") {
    const colorScheme = { bg: "bg-purple-600", text: "text-white" };

    return (
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            {title || "Lending Asset Classes"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className={`${colorScheme.bg} ${colorScheme.text} p-8 rounded-lg flex flex-col justify-center shadow-lg`}
              >
                {item.icon && (
                  <div className="mb-4">
                    <div className="relative w-12 h-12 mx-auto md:mx-0">
                      <Image
                        src={item.icon.startsWith("http") ? item.icon : `${baseUrl}${item.icon}`}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                {item.description && <p className="leading-relaxed">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // LAYOUT: Circular (Agriculture)
  if (layoutType === "circular") {
    return (
      <div className="w-full bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 py-20 relative overflow-hidden">
        {/* Abstract background blobs for depth */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        <h2 className="text-3xl font-bold mb-16 text-center text-white">
          Integrated Offering
        </h2>
        
        <div className="relative w-full max-w-7xl mx-auto px-4" style={{ height: "700px" }}>
          {/* SVG for connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
            preserveAspectRatio="xMidYMid meet"
          >
            {sortedItems.length >= 5 && (
              <>
                {/* Warehousing (50%, 5%) to qwwer (15%, 25%) */}
                <line x1="50%" y1="8%" x2="15%" y2="28%" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 5" opacity="0.8" className="animated-line" />
                <line x1="50%" y1="8%" x2="85%" y2="28%" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 5" opacity="0.8" className="animated-line" />
                <line x1="15%" y1="32%" x2="15%" y2="48%" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 5" opacity="0.8" className="animated-line" />
                <line x1="85%" y1="32%" x2="85%" y2="48%" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 5" opacity="0.8" className="animated-line" />
                <line x1="15%" y1="52%" x2="50%" y2="63%" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 5" opacity="0.8" className="animated-line" />
                <line x1="85%" y1="52%" x2="50%" y2="63%" stroke="#c084fc" strokeWidth="2" strokeDasharray="8 5" opacity="0.8" className="animated-line" />
              </>
            )}
          </svg>

          {/* Cards positioned absolutely */}
          <div className="relative w-full h-full">
            {sortedItems.map((item, index) => {
              let posStyle: React.CSSProperties = {};

              // Position cards based on sorted order
              if (sortedItems.length >= 5) {
                switch (index) {
                  case 0:
                    // Top center - Warehousing
                    posStyle = { left: "50%", top: "0%", transform: "translate(-50%, 0%)" };
                    break;
                  case 1:
                    // Left top
                    posStyle = { left: "15%", top: "20%", transform: "translate(-50%, 0%)" };
                    break;
                  case 2:
                    // Right top
                    posStyle = { left: "85%", top: "20%", transform: "translate(-50%, 0%)" };
                    break;
                  case 3:
                    // Left middle
                    posStyle = { left: "15%", top: "40%", transform: "translate(-50%, 0%)" };
                    break;
                  case 4:
                    // Right middle
                    posStyle = { left: "85%", top: "40%", transform: "translate(-50%, 0%)" };
                    break;
                  case 5:
                    // Bottom center
                    posStyle = { left: "50%", top: "60%", transform: "translate(-50%, 0%)" };
                    break;
                }
              }

              return (
                <div
                  key={item.id}
                  className="absolute flex flex-col items-center card-item card-float"
                  style={posStyle}
                >
                  <div className="bg-white rounded-lg shadow-md p-4 w-44 text-center hover:shadow-lg transition-shadow">
                    {item.icon && (
                      <div className="mb-3 flex justify-center">
                        <div className="relative w-12 h-12">
                          <Image
                            src={item.icon.startsWith("http") ? item.icon : `${baseUrl}${item.icon}`}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          .card-item {
            z-index: 10;
          }

          @keyframes cardFloat {
            0%, 100% {
              transform: translate(-50%, 0px);
            }
            50% {
              transform: translate(-50%, -10px);
            }
          }

          @keyframes dashMove {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -40;
            }
          }

          .card-float {
            animation: cardFloat 3s ease-in-out infinite;
          }

          .animated-line {
            animation: dashMove 2s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
}
