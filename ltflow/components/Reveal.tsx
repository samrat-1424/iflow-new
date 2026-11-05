"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
  // Allows for custom animation states if needed, but defaults to the bottom-to-top fade + zoom
  animationType?: "fade-up" | "fade-in" | "zoom-in";
}

export default function Reveal({
  children,
  threshold = 0.15,
  delay = 0,
  className = "",
  animationType = "fade-up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Hidden state: 40px below + slightly scaled down + invisible
  const hiddenStyles = {
    opacity: 0,
    transform: animationType === "fade-up" ? "translateY(40px) scale(0.95)" : 
               animationType === "zoom-in" ? "scale(0.8)" : "none",
    transition: `all 700ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
  };

  // Visible state: natural position
  const shownStyles = {
    opacity: 1,
    transform: "translateY(0) scale(1)",
    transition: `all 700ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
  };

  return (
    <div
      ref={ref}
      style={visible ? shownStyles : hiddenStyles}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
