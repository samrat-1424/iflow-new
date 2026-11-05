"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  NAV_SOLUTIONS,
  NAV_CATEGORIES,
  NAV_SOLUTIONS_COL1,
  NAV_SOLUTIONS_COL2,
  NAV_SOLUTIONS_COL3,
} from "@/utils/solutionsData";
import { RESOURCE_NAV_ITEMS } from "@/utils/resourcesData";

const NAV_LINKS = [
  { label: "Solutions", action: "/solutions", type: "route" },
  { label: "Resources", action: "/resources/retail", type: "route" },
  { label: "Case Studies", action: "/case-studies", type: "route" },
  { label: "Blogs", action: "/blogs", type: "route" },
  { label: "About Us", action: "/about", type: "route" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (nav: {
    label: string;
    action: string;
    type: string;
  }) => {
    if (nav.label.toUpperCase() === "HOME") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      setIsOpen(false);
      return;
    }

    if (nav.type === "scroll") {
      if (pathname === "/") {
        const section = document.getElementById(nav.action);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/#${nav.action}`);
      }
    } else {
      router.push(nav.action);
    }
    setIsOpen(false);
  };

  const isResourcesPage = pathname?.startsWith("/resources");

  const renderMobileMenu = (customClasses = "") => (
    <div className={`md:hidden px-4 pb-4 bg-white rounded-b-3xl shadow-md border-t border-slate-100 ${customClasses}`}>
      <nav className="flex flex-col space-y-1 pt-2">
        {NAV_LINKS.map((nav) => {
          const isSolutions = nav.action === "/solutions";
          const isResources = nav.label === "Resources";

          return (
            <div key={nav.label} className="border-b border-slate-100 last:border-b-0 py-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleNavClick(nav)}
                  className="cursor-pointer text-base text-slate-800 hover:text-[#623f99] font-semibold py-2 text-left"
                >
                  {nav.label}
                </button>
                {isSolutions && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileSolutionsOpen(!mobileSolutionsOpen);
                    }}
                    className="p-2 text-slate-500 hover:text-[#623f99]"
                    aria-label="Toggle solutions list"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180 text-[#623f99]" : ""
                        }`}
                    />
                  </button>
                )}
                {isResources && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileResourcesOpen(!mobileResourcesOpen);
                    }}
                    className="p-2 text-slate-500 hover:text-[#623f99]"
                    aria-label="Toggle resources list"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180 text-[#623f99]" : ""
                        }`}
                    />
                  </button>
                )}
              </div>

              {/* Mobile Solutions List */}
              {isSolutions && mobileSolutionsOpen && (
                <div className="pl-3 pr-2 py-2 mb-2 space-y-3 bg-purple-50/40 rounded-2xl max-h-80 overflow-y-auto">
                  {NAV_SOLUTIONS.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/solutions/${item.slug}`}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileSolutionsOpen(false);
                      }}
                      className="block py-1 text-left group"
                    >
                      <span className="text-[10px] font-bold text-[#9a3f91] uppercase tracking-wider block">
                        {item.tag}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-[#623f99] block">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-500 line-clamp-1 block">
                        {item.blurb}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/solutions"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileSolutionsOpen(false);
                    }}
                    className="block text-xs font-bold text-[#623f99] pt-1"
                  >
                    Explore full ecosystem →
                  </Link>
                </div>
              )}

              {/* Mobile Resources List */}
              {isResources && mobileResourcesOpen && (
                <div className="pl-3 pr-2 py-2 mb-2 space-y-2 bg-purple-50/40 rounded-2xl">
                  {RESOURCE_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileResourcesOpen(false);
                      }}
                      className="block py-1.5 text-left text-sm font-semibold text-slate-800 hover:text-[#623f99]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="pt-3 pb-1">
        <Link
          href="/book-a-demo"
          onClick={() => setIsOpen(false)}
          className="block text-center w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white text-sm font-semibold shadow-md"
        >
          Book a Demo
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`z-50 ${isResourcesPage ? "absolute top-0 left-0 right-0 bg-transparent" : "relative"}`}>
      {isResourcesPage ? (
        /* Transparent Header for Resource Pages */
        <div className="bg-transparent relative h-auto pb-0 overflow-visible">
          <TopBar
            navLinks={NAV_LINKS}
            handleNavClick={handleNavClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isTransparent
          />
          {isOpen && renderMobileMenu("mx-4 mt-2 rounded-3xl shadow-2xl border border-slate-100")}
        </div>
      ) : (
        /* Modern Header for all standard pages - NO purple top bar, unified with resources style */
        <div className="bg-white/95 backdrop-blur-md relative h-auto pb-0 overflow-visible border-b border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <TopBar
            navLinks={NAV_LINKS}
            handleNavClick={handleNavClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {isOpen && renderMobileMenu("mx-4 mt-2 rounded-3xl shadow-2xl border border-slate-100")}
        </div>
      )}

      {/* Sticky Header (only appears after scrolling) */}
      <div
        aria-hidden={!showSticky}
        style={{ display: showSticky ? "block" : "none" }}
        className={`fixed top-0 left-0 w-full bg-transparent z-50 transform transition-all duration-300 ${showSticky
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
          }`}
      >
        <div className="bg-white/95 backdrop-blur-md relative overflow-visible shadow-sm border-b border-slate-100">
          <TopBar
            navLinks={NAV_LINKS}
            handleNavClick={handleNavClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          {isOpen && renderMobileMenu("mx-4 mt-2 rounded-3xl shadow-2xl border border-slate-100")}
        </div>
      </div>
    </div>
  );
};

interface NavLink {
  label: string;
  action: string;
  type: string;
}

interface TopBarProps {
  navLinks: NavLink[];
  handleNavClick: (nav: NavLink) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: string;
  isTransparent?: boolean;
}

const TopBar = ({
  navLinks,
  handleNavClick,
  isOpen,
  setIsOpen,
  size = "default",
  isTransparent = false,
}: TopBarProps) => {
  const pathname = usePathname();
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isResourcesHovered, setIsResourcesHovered] = useState(false);
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSolutionsMouseEnter = () => {
    if (solutionsTimeoutRef.current) {
      clearTimeout(solutionsTimeoutRef.current);
      solutionsTimeoutRef.current = null;
    }
    setIsSolutionsHovered(true);
  };

  const handleSolutionsMouseLeave = () => {
    if (solutionsTimeoutRef.current) {
      clearTimeout(solutionsTimeoutRef.current);
    }
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsHovered(false);
    }, 180);
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
      resourcesTimeoutRef.current = null;
    }
    setIsResourcesHovered(true);
  };

  const handleResourcesMouseLeave = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesHovered(false);
    }, 180);
  };

  return (
    <header className={`max-w-7xl mx-auto px-6 md:px-10 lg:px-14 ${isTransparent ? "py-4 sm:py-5" : "py-3 sm:py-3.5"} bg-transparent flex items-center justify-between relative overflow-visible`}>
      {/* Logo - only iFLOW image logo directly, no white badge */}
      <Link href="/" className="inline-flex items-center">
        <div className="relative w-32 h-8 sm:w-36 sm:h-9 cursor-pointer">
          <Image
            src={isTransparent ? "/hero/logo-white.png" : "/hero/logo.png"}
            alt="iFLOW Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 items-center relative">
        {navLinks.map((nav) => {
          const isSolutions = nav.action === "/solutions";
          const isResources = nav.label === "Resources";
          const isActive =
            pathname === nav.action ||
            (nav.action === "home" && pathname === "/") ||
            (isSolutions && pathname.startsWith("/solutions")) ||
            (isResources && pathname.startsWith("/resources"));

          if (isSolutions) {
            return (
              <div
                key={nav.label}
                className="relative py-2 group"
                onMouseEnter={handleSolutionsMouseEnter}
                onMouseLeave={handleSolutionsMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(nav)}
                  className={`cursor-pointer text-sm font-semibold flex items-center gap-1.5 transition-colors ${isTransparent
                    ? isSolutionsHovered || isActive
                      ? "text-white font-bold"
                      : "text-white/90 hover:text-white group-hover:text-white"
                    : isSolutionsHovered || isActive
                      ? "text-[#623f99]"
                      : "text-slate-800 hover:text-[#623f99] group-hover:text-[#623f99]"
                    }`}
                >
                  <span>{nav.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isSolutionsHovered
                      ? `rotate-180 ${isTransparent ? "text-white" : "text-[#623f99]"}`
                      : isTransparent
                        ? "text-white/75 group-hover:rotate-180 group-hover:text-white"
                        : "text-slate-400 group-hover:rotate-180 group-hover:text-[#623f99]"
                      }`}
                  />
                </button>

                {/* Dropdown Mega-Menu with continuous hover bridge */}
                <div
                  className={`absolute top-full left-[-20px] sm:left-[-60px] md:left-[-100px] lg:left-[-160px] xl:left-[-200px] pt-2 z-50 transition-all duration-200 ${isSolutionsHovered
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
                    }`}
                  onMouseEnter={handleSolutionsMouseEnter}
                  onMouseLeave={handleSolutionsMouseLeave}
                >
                  <div className="w-[1000px] max-w-[calc(100vw-2rem)] rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xl shadow-purple-950/15">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {NAV_CATEGORIES.map((category) => (
                        <div key={category.title} className="flex flex-col">
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-[#9a3f91] pb-1.5 mb-1.5 border-b border-purple-100/80 block">
                            {category.title}
                          </span>
                          <div className="space-y-1">
                            {category.items.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <Link
                                  key={item.slug}
                                  href={`/solutions/${item.slug}`}
                                  onClick={() => setIsSolutionsHovered(false)}
                                  className="group/item flex items-start gap-2 p-1.5 rounded-xl hover:bg-purple-50/70 transition-all text-left"
                                >
                                  <div className="w-6 h-6 rounded-md bg-purple-50 text-[#7c3aed] group-hover/item:bg-[#7c3aed] group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                    <IconComponent className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-bold text-[12.5px] text-slate-900 group-hover/item:text-[#623f99] transition-colors leading-snug truncate">
                                      {item.name}
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                                      {item.blurb}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA Banner */}
                    <Link
                      href="/solutions"
                      onClick={() => setIsSolutionsHovered(false)}
                      className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#3c2262] via-[#5c2b7f] to-[#8d367a] px-5 py-2.5 text-white transition-all hover:opacity-95 shadow-md group/bar"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-white">
                          Explore the full iFLOW ecosystem
                        </span>
                        <span className="text-[11px] text-purple-200 font-medium hidden sm:inline">
                          · 13 Enterprise Solutions
                        </span>
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-white flex items-center gap-1 group-hover/bar:translate-x-0.5 transition-transform">
                        View all solutions ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }

          if (isResources) {
            return (
              <div
                key={nav.label}
                className="relative py-2 group"
                onMouseEnter={handleResourcesMouseEnter}
                onMouseLeave={handleResourcesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(nav)}
                  className={`cursor-pointer text-sm font-semibold flex items-center gap-1.5 transition-colors ${isTransparent
                    ? isResourcesHovered || isActive
                      ? "text-white font-bold"
                      : "text-white/90 hover:text-white group-hover:text-white"
                    : isResourcesHovered || isActive
                      ? "text-[#623f99]"
                      : "text-slate-800 hover:text-[#623f99] group-hover:text-[#623f99]"
                    }`}
                >
                  <span>{nav.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isResourcesHovered
                      ? `rotate-180 ${isTransparent ? "text-white" : "text-[#623f99]"}`
                      : isTransparent
                        ? "text-white/75 group-hover:rotate-180 group-hover:text-white"
                        : "text-slate-400 group-hover:rotate-180 group-hover:text-[#623f99]"
                      }`}
                  />
                </button>

                {/* Resources Dropdown Menu with continuous hover bridge */}
                <div
                  className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ${isResourcesHovered
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
                    }`}
                  onMouseEnter={handleResourcesMouseEnter}
                  onMouseLeave={handleResourcesMouseLeave}
                >
                  <div className="w-[320px] rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-2xl shadow-purple-950/15">
                    <div className="flex flex-col space-y-1">
                      {RESOURCE_NAV_ITEMS.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.href}
                          onClick={() => setIsResourcesHovered(false)}
                          className="group/res block p-3 rounded-xl hover:bg-purple-50/70 transition-all text-left"
                        >
                          <div className="font-semibold text-[14px] text-slate-800 group-hover/res:text-[#623f99] transition-colors leading-snug">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <button
              key={nav.label}
              onClick={() => handleNavClick(nav)}
              className={`cursor-pointer text-sm font-semibold transition-colors ${isTransparent
                ? isActive
                  ? "text-white font-bold"
                  : "text-white/90 hover:text-white"
                : isActive
                  ? "text-[#623f99]"
                  : "text-slate-800 hover:text-[#623f99]"
                }`}
            >
              {nav.label}
            </button>
          );
        })}
      </nav>

      {/* CTA Button Desktop */}
      <div className="hidden md:block">
        <Link href="/book-a-demo" rel="noopener noreferrer">
          <button
            className="cursor-pointer text-white text-sm font-semibold px-5.5 py-2 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] hover:opacity-95 hover:shadow-lg shadow-md transition-all duration-200 hover:scale-[1.02]"
          >
            Book a Demo
          </button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer p-1.5 rounded-lg transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
            }`}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
