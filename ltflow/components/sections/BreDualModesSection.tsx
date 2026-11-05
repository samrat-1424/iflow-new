"use client";

import React from "react";
import {
  Sparkles,
  GitFork,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";

export default function BreDualModesSection() {
  const modeASteps = [
    { num: "01", title: "Application data" },
    { num: "02", title: "Data validation" },
    { num: "03", title: "Rule evaluation" },
    { num: "04", title: "Score & eligibility" },
    { num: "05", title: "Policy outcome" },
  ];

  const modeBChecks = [
    { label: "Bureau policy", status: "Passed", type: "pass" },
    { label: "Obligation assessment", status: "Passed", type: "pass" },
    { label: "Business vintage", status: "Review", type: "review" },
  ];

  return (
    <section
      id="dual-decisioning-modes"
      aria-labelledby="dual-modes-heading"
      className="relative py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-[#1d0b38] via-[#2d0f48] to-[#160626] border-b border-purple-900/40 overflow-hidden text-white"
    >
      {/* Atmospheric lighting glows matching website theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-1/4 w-96 h-96 rounded-full bg-[#ec4899]/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/10 blur-[140px]"
      />

      {/* Subtle fine grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/25 text-purple-200 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
            ONE ENGINE · TWO MODES
          </span>

          <h2
            id="dual-modes-heading"
            className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-tight"
          >
            Automate Routine Decisions. Give{" "}
            <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
              Underwriters Visibility
            </span>{" "}
            Into the Rest.
          </h2>

          <p className="mt-4 text-purple-200/80 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            A unified decisioning framework for straight-through processing and explainable individual case review.
          </p>
        </div>

        {/* 3-Column Interactive Architecture Layout: Mode A | Shared Decision Core | Mode B */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ── Mode A Card (Left Column) ── */}
          <div className="lg:col-span-5 rounded-3xl border border-purple-400/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 sm:p-9 backdrop-blur-xl relative flex flex-col justify-between hover:border-purple-400/40 transition-all shadow-2xl shadow-purple-950/40 h-full group">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#ec4899] uppercase">
                  MODE A · AUTOMATED
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              </div>

              <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight mb-2.5 group-hover:text-purple-200 transition-colors">
                Background decisioning
              </h3>

              <p className="text-sm text-purple-200/75 leading-relaxed font-normal mb-8">
                Evaluate applications through configured LOS integrations without manual handling for every case.
              </p>

              {/* 5 Step Sequence */}
              <div className="space-y-3">
                {modeASteps.map((step) => (
                  <div
                    key={step.num}
                    className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-purple-300/10 flex items-center justify-between hover:bg-white/[0.08] hover:border-purple-400/30 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-purple-300 w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-400/25">
                        {step.num}
                      </span>
                      <span className="text-sm font-semibold text-white tracking-tight">
                        {step.title}
                      </span>
                    </div>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tag */}
            <div className="mt-8 pt-4 border-t border-purple-400/15 flex items-center justify-between text-xs text-purple-300/80">
              <span className="font-medium">Execution: Straight-Through (STP)</span>
              <span className="font-mono text-emerald-400 font-semibold">&lt; 95ms</span>
            </div>
          </div>

          {/* ── Central Shared Decision Core (Center Column) ── */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-6 lg:py-0">
            {/* Concentric rotating rings with animated orbit */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer dashed spinning ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-purple-400/40 animate-[spin_24s_linear_infinite]" />

              {/* Middle ring */}
              <div className="absolute w-32 h-32 rounded-full border border-purple-300/30 animate-[spin_18s_linear_infinite_reverse]" />

              {/* Glowing center circle */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#7c3aed] via-[#9a3f91] to-[#ec4899] flex items-center justify-center shadow-xl shadow-purple-600/50">
                <GitFork className="w-9 h-9 text-white stroke-[2.2] drop-shadow-md" />
              </div>
            </div>

            {/* Core Label */}
            <div className="mt-4">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-purple-300/80 mb-1 block">
                SHARED DECISION CORE
              </span>
              <h4 className="text-2xl font-extrabold text-white tracking-tight">
                iFLOW BRE
              </h4>
              <p className="mt-1.5 text-xs text-purple-200/70 font-medium leading-relaxed">
                Policy rules · Scorecards<br />Eligibility · Routing
              </p>
            </div>
          </div>

          {/* ── Mode B Card (Right Column) ── */}
          <div className="lg:col-span-5 rounded-3xl border border-purple-400/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 sm:p-9 backdrop-blur-xl relative flex flex-col justify-between hover:border-purple-400/40 transition-all shadow-2xl shadow-purple-950/40 h-full group">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#ec4899] uppercase">
                  MODE B · EXPLAINABLE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50" />
              </div>

              <h3 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight mb-2.5 group-hover:text-purple-200 transition-colors">
                Manual case processing
              </h3>

              <p className="text-sm text-purple-200/75 leading-relaxed font-normal mb-8">
                Let authorised underwriters inspect inputs, execution, score, eligibility, and final decision context.
              </p>

              {/* Underwriter UI Preview Card */}
              <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-2xl text-slate-900 border border-purple-100">
                {/* Top Reference & Status */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                    BRE-1047
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    In review
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mb-4">
                  Business Growth Loan
                </h4>

                {/* Score Output Banner */}
                <div className="pt-3 pb-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Illustrative score output
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#7c3aed]">
                      72
                    </span>
                    <span className="text-xs text-slate-400 font-bold">/100</span>
                  </div>
                </div>

                {/* Verification Rows */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {modeBChecks.map((chk, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1.5 text-xs"
                    >
                      <span className="font-medium text-slate-700">
                        {chk.label}
                      </span>
                      {chk.type === "pass" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10.5px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {chk.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold text-[10.5px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          {chk.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Tag */}
            <div className="mt-8 pt-4 border-t border-purple-400/15 flex items-center justify-between text-xs text-purple-300/80">
              <span className="font-medium">Governance: Maker-Checker Audited</span>
              <span className="font-mono text-purple-200 font-semibold">Full Trace</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

