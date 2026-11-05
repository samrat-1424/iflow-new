"use client";

import { useEffect } from "react";

export default function HashScroller() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const el = document.getElementById(sectionId);
      if (el) {
        // Give the page a moment to render
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  return null;
}
