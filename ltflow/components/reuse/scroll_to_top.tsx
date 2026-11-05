"use client";
import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
    onClick={scrollToTop}
    className={`fixed bottom-6 right-6 p-3 bg-[#1d4b6e] z-10 text-white rounded-full shadow-lg transition-opacity ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    aria-label="Go to top"
  >
    <ArrowUpIcon
                    aria-hidden="true"
                    className="size-8 text-white "
                  />
  </button>
  );
};

export default ScrollToTop;
