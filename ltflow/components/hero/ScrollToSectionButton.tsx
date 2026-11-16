"use client";

import type { ReactNode } from "react";

interface ScrollToSectionButtonProps {
  targetId: string;
  className?: string;
  children: ReactNode;
}

/**
 * Smoothly scrolls to a section by DOM id without mutating the browser URL hash.
 */
export default function ScrollToSectionButton({
  targetId,
  className,
  children,
}: ScrollToSectionButtonProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

