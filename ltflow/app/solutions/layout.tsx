"use client";

import { useEffect } from "react";

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
    return () => {
      html.style.overflowX = "";
      body.style.overflowX = "";
    };
  }, []);

  return <>{children}</>;
}
