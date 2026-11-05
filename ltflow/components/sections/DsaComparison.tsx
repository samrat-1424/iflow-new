"use client";

import React from "react";
import { Briefcase, Landmark, Sparkles } from "lucide-react";

interface DsaComparisonRow {
  capability: string;
  forDsas: string;
  forBanks: string;
}

export default function DsaComparison() {
  const comparisonData: DsaComparisonRow[] = [
    {
      capability: "Primary user",
      forDsas: "DSA firms & individual DSAs",
      forBanks: "Banks & financial institutions",
    },
    {
      capability: "Main objective",
      forDsas: "Run a loan distribution business",
      forBanks: "Govern the bank's DSA network",
    },
    {
      capability: "Lead management",
      forDsas: "Capture, assign & follow up",
      forBanks: "Monitor & govern DSA-sourced leads",
    },
    {
      capability: "Application tracking",
      forDsas: "Across multiple lenders",
      forBanks: "Through BRE and bank LOS",
    },
    {
      capability: "User structure",
      forDsas: "Employees, teams & connectors",
      forBanks: "Bank, regional & approval roles",
    },
    {
      capability: "Onboarding",
      forDsas: "Internal connectors / sub-DSAs",
      forBanks: "Formal registration & due diligence",
    },
    {
      capability: "Product control",
      forDsas: "Lender & product information",
      forBanks: "Bank product & DSA mapping",
    },
    {
      capability: "Commission",
      forDsas: "Receivables & partner settlements",
      forBanks: "Calculate, approve & reconcile",
    },
    {
      capability: "Reporting",
      forDsas: "Business, team & lender performance",
      forBanks: "Regional, branch, finance & audit MIS",
    },
    {
      capability: "Integrations",
      forDsas: "Configured lender / service systems",
      forBanks: "CBS & LOS, subject to scope",
    },
  ];

  return (
    <section
      id="dsa-solution-family"
      aria-labelledby="dsa-family-heading"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-purple-200/35 blur-[130px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 rounded-full bg-[#9a3f91]/15 blur-[100px] -z-10"
      />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
            THE IFLOW DSA SOLUTION FAMILY
          </span>
          <h2
            id="dsa-family-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug"
          >
            Two Specialised Solutions. One Connected DSA Ecosystem.
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Different users. Different operating models. Purpose-built workflows for each.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="rounded-2xl sm:rounded-3xl border border-purple-200/80 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-purple-900/60 bg-[#170f29] text-white">
                  <th className="py-4.5 sm:py-5 px-6 sm:px-8 font-bold text-xs sm:text-sm uppercase tracking-wider text-purple-200/90 w-1/3">
                    Capability
                  </th>
                  <th className="py-4.5 sm:py-5 px-6 sm:px-8 font-bold text-xs sm:text-sm text-white w-1/3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-purple-800/80 flex items-center justify-center text-[#c084fc]">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <span className="tracking-tight">For DSAs</span>
                    </div>
                  </th>
                  <th className="py-4.5 sm:py-5 px-6 sm:px-8 font-bold text-xs sm:text-sm text-white w-1/3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-purple-800/80 flex items-center justify-center text-[#c084fc]">
                        <Landmark className="w-3.5 h-3.5" />
                      </div>
                      <span className="tracking-tight">For Banks</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors hover:bg-purple-50/50 ${
                        isEven ? "bg-white" : "bg-[#faf9fd]/60"
                      }`}
                    >
                      {/* Capability */}
                      <td className="py-4 px-6 sm:px-8 font-bold text-xs sm:text-sm text-slate-900">
                        {row.capability}
                      </td>

                      {/* For DSAs */}
                      <td className="py-4 px-6 sm:px-8 font-medium text-xs sm:text-sm text-slate-600">
                        {row.forDsas}
                      </td>

                      {/* For Banks */}
                      <td className="py-4 px-6 sm:px-8 font-medium text-xs sm:text-sm text-slate-600">
                        {row.forBanks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

