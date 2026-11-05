"use client";

import React from "react";
import { Check, Minus, Sparkles, ShieldCheck, Zap } from "lucide-react";

interface ComparisonRow {
  feature: string;
  modernLos: boolean;
  legacyLos: boolean;
  detail: string;
}

export default function LosComparison() {
  const comparisonData: ComparisonRow[] = [
    {
      feature: "Application Decisioning TAT (< 3 Mins)",
      modernLos: true,
      legacyLos: false,
      detail: "Automated business rule engine (BRE) delivers real-time eligibility and sanction decisions instead of 3–7 days of manual reviews.",
    },
    {
      feature: "100% Paperless Digital KYC & Onboarding",
      modernLos: true,
      legacyLos: false,
      detail: "Direct API integration with UIDAI Aadhaar e-KYC, DigiLocker, PAN NSDL, Face Match, and Video KYC (V-CIP).",
    },
    {
      feature: "Automated Account Aggregator & Bank OCR",
      modernLos: true,
      legacyLos: false,
      detail: "Real-time cash flow extraction and automated fraud triangulation replace manual Excel-based bank spread entry.",
    },
    {
      feature: "Multi-Bureau Aggregation & Dedupe",
      modernLos: true,
      legacyLos: false,
      detail: "Parallel inquiries across CIBIL, Experian, Equifax, and CRIF with proprietary cross-channel dedupe logic.",
    },
    {
      feature: "No-Code Credit Policy & Scorecard Agility",
      modernLos: true,
      legacyLos: false,
      detail: "Risk teams update underwriting policy rules, cut-offs, and risk tiers in minutes without vendor change requests.",
    },
    {
      feature: "Omnichannel Intake (Web, App, DSA, Branch)",
      modernLos: true,
      legacyLos: false,
      detail: "Unified borrower profile across customer self-serve portals, field agent mobile apps, DSA partners, and branch desks.",
    },
    {
      feature: "Instant Digital Sanction & Key Fact Statement (KFS)",
      modernLos: true,
      legacyLos: false,
      detail: "Dynamic sanction letter generation with automated RBI-compliant KFS calculation and Aadhaar e-Sign.",
    },
    {
      feature: "Instant Auto-Debit Mandate (e-NACH & UPI)",
      modernLos: true,
      legacyLos: false,
      detail: "Borrowers set up recurring repayment mandates at origination, reducing post-disbursement collection fallout.",
    },
    {
      feature: "RBI Digital Lending Directions 2025 Compliance",
      modernLos: true,
      legacyLos: false,
      detail: "Direct lender-to-borrower disbursement verification, cryptographic audit trails, and strict data localization.",
    },
    {
      feature: "Open Architecture with 80+ Pre-Built APIs",
      modernLos: true,
      legacyLos: false,
      detail: "Pre-configured connectors for credit bureaus, identity verification, payment gateways, and core LMS ledgers.",
    },
  ];

  return (
    <section
      id="los-comparison"
      aria-labelledby="los-comparison-heading"
      className="relative py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-y border-purple-100/70 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-200/30 blur-[120px]"
      />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
            TECHNOLOGY BENCHMARK
          </span>
          <h2
            id="los-comparison-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
          >
            Modern Cloud LOS vs Legacy Loan Origination Systems
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Compare how iFLOW’s event-driven digital loan origination system eliminates manual bottlenecks, slashes turnaround time, and accelerates disbursals.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-purple-600 font-medium mb-3">
          <span>← Swipe horizontally to inspect comparison →</span>
        </div>

        {/* Comparison Table Container */}
        <div className="rounded-3xl border border-purple-100/80 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-purple-100 bg-slate-900 text-white">
                  <th className="py-5 px-6 sm:px-8 font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-300 w-1/2">
                    Key Origination Criteria
                  </th>
                  <th className="py-5 px-6 sm:px-8 text-center w-1/4 bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white">
                    <div className="inline-flex flex-col items-center gap-1">
                      <span className="font-bold text-sm sm:text-base tracking-tight">
                        iFLOW Cloud LOS
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono tracking-wider font-semibold uppercase">
                        Recommended
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 sm:px-8 text-center w-1/4 font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-400">
                    Legacy / Traditional LOS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors duration-200 hover:bg-purple-50/30 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="py-4 px-6 sm:px-8">
                      <div className="font-semibold text-slate-900 text-sm sm:text-base">
                        {row.feature}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                        {row.detail}
                      </div>
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-center bg-purple-50/25 border-x border-purple-100/70">
                      {row.modernLos ? (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 shadow-2xs">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400">
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-center">
                      {row.legacyLos ? (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 shadow-2xs">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400">
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Banner */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50/80 via-white to-purple-50/80 border-t border-purple-100 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#7c3aed]" />
              <span>Full compliance with RBI Master Directions on Digital Lending</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#623f99]">
              <Zap className="w-3.5 h-3.5" />
              <span>Average 85% reduction in manual underwriting overhead</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
