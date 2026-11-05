"use client";

import React from "react";
import { Check, Minus, Sparkles, ShieldCheck, Zap } from "lucide-react";

interface ComparisonRow {
  feature: string;
  modernLms: boolean;
  legacyLms: boolean;
  detail: string;
}

export default function LmsComparison() {
  const comparisonData: ComparisonRow[] = [
    {
      feature: "Real-Time Event-Driven Accounting (No EOD Batch Bottlenecks)",
      modernLms: true,
      legacyLms: false,
      detail: "Sub-second ledger posting and continuous balance updates eliminate hours of frozen overnight batch processing (EOD / BOD).",
    },
    {
      feature: "Zero Ledger Drift & Automated Bank Reconciliation",
      modernLms: true,
      legacyLms: false,
      detail: "Real-time double-entry core ledger automatically matches bank statements, escrow accounts, and receipts with zero reconciliation drift.",
    },
    {
      feature: "Multi-Rail Automated Collections (e-NACH, UPI AutoPay, BBPS)",
      modernLms: true,
      legacyLms: false,
      detail: "Intelligent auto-debit orchestration presents repayment mandates with smart retry schedules, reducing return penalties and bounces.",
    },
    {
      feature: "Dynamic Multi-Tranche Disbursement & Held-Back Controls",
      modernLms: true,
      legacyLms: false,
      detail: "Coordinate milestone-based tranches, maker-checker authorization, and bank payment APIs with complete transaction visibility.",
    },
    {
      feature: "Native Co-Lending Escrow & Dynamic Repayment Split",
      modernLms: true,
      legacyLms: false,
      detail: "Automates 80:20 / 90:10 repayment waterfalls, partner ledger maintenance, and tripartite escrow settlement for RBI CLM compliance.",
    },
    {
      feature: "Flexible Interest Engines (Reducing, Flat, Penal & Compounding)",
      modernLms: true,
      legacyLms: false,
      detail: "No-code interest rule matrices adapt to day-count conventions (30/360, Actual/365), broken periods, and moratoriums without core code changes.",
    },
    {
      feature: "Automated RBI IRAC Norms & Real-Time NPA Classification",
      modernLms: true,
      legacyLms: false,
      detail: "Continuous DPD tracking automatically buckets loans into SMA-0, SMA-1, SMA-2, and NPA categories in strict adherence to RBI directions.",
    },
    {
      feature: "Self-Service Borrower Portal & Instant Digital NOC / SOA",
      modernLms: true,
      legacyLms: false,
      detail: "Automated generation of Statements of Account (SOA), interest certificates, payment links, and instant digital No Objection Certificates (NOC).",
    },
    {
      feature: "Restructuring, Foreclosure & Moratorium Recast",
      modernLms: true,
      legacyLms: false,
      detail: "Simulate and execute tenure recasts, balloon repayments, EMI holidays, and partial prepayment allocations in one click.",
    },
    {
      feature: "Open API Architecture for Seamless CBS & Payment Rails",
      modernLms: true,
      legacyLms: false,
      detail: "Pre-built bi-directional connectors sync with Finacle, Flexcube, BaNCS, payment gateways, and credit bureaus in real time.",
    },
  ];

  return (
    <section
      id="lms-comparison"
      aria-labelledby="lms-comparison-heading"
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
            id="lms-comparison-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
          >
            Modern Cloud LMS vs Legacy Loan Management Systems
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            How next-generation event-driven ledger architecture replaces brittle legacy CBS platforms with real-time accuracy and zero ledger drift.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-50/90 border-b border-slate-200/80 p-5 sm:p-6 text-xs sm:text-sm font-bold tracking-tight">
            <div className="col-span-6 sm:col-span-6 text-slate-700 uppercase tracking-wider text-[11px] font-mono">
              CAPABILITY & FUNCTIONALITY
            </div>
            <div className="col-span-3 sm:col-span-3 text-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#623f99] text-white text-[11px] font-mono tracking-wider shadow-2xs">
                <Zap className="w-3 h-3 text-amber-300" />
                iFLOW LMS
              </span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-center text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              LEGACY LMS / CBS
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonData.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-5 sm:p-6 items-center hover:bg-purple-50/30 transition-colors duration-150"
              >
                {/* Feature Name & Description */}
                <div className="col-span-6 sm:col-span-6 pr-4">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 leading-snug">
                    {row.feature}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">
                    {row.detail}
                  </p>
                </div>

                {/* iFLOW LMS Checkmark */}
                <div className="col-span-3 sm:col-span-3 flex justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center border border-purple-200/70 shadow-2xs">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                {/* Legacy LMS Cross / Minus */}
                <div className="col-span-3 sm:col-span-3 flex justify-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Minus className="w-3.5 h-3.5 stroke-[2]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Banner */}
          <div className="bg-gradient-to-r from-purple-50/80 via-white to-purple-50/80 border-t border-slate-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#623f99] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#623f99]" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                Designed for Banks, NBFCs, and Digital Lenders requiring high-volume ledger precision.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#623f99] hover:bg-[#523380] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex-shrink-0"
            >
              <span>Schedule Architecture Review</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

