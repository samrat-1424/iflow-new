"use client";

import React from "react";
import { Check, Minus, Sparkles, BrainCircuit, ShieldAlert, Cpu } from "lucide-react";

interface ComparisonRow {
  feature: string;
  aiMlEngine: boolean;
  legacyBureau: boolean;
  detail: string;
  category?: string;
}

export default function AiMlScoreComparison() {
  const comparisonData: ComparisonRow[] = [
    {
      feature: "Sub-100ms Real-Time Inference TAT",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Ultra-low latency decisioning enables instant credit approvals at point-of-sale checkout and digital onboarding.",
    },
    {
      feature: "5,000+ Alternative & Cash-Flow Data Points",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Blends traditional bureau history with Account Aggregator bank statements, GST invoices, device signals, and utility records.",
    },
    {
      feature: "High-Confidence New-to-Credit (NTC) Scoring",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Proprietary digital footprint models evaluate thin-file applicants, preventing unwarranted 'no-hit' rejections.",
    },
    {
      feature: "Continuous Model Drift Surveillance (PSI Tracking)",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Automated pipelines continuously monitor population stability indices and model decay, retraining weights on the fly.",
    },
    {
      feature: "Up to 35% Lower Portfolio NPA & Defaults",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Non-linear gradient boosted trees identify hidden default correlations that static linear scorecards consistently miss.",
    },
    {
      feature: "Dynamic Risk-Based Pricing & Sanction Limits",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Calibrates precise loan limits, tenures, and interest spreads dynamically tailored to individual repayment capacity.",
    },
    {
      feature: "Explainable AI (XAI) with SHAP / LIME Reason Codes",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Generates explicit adverse action codes and audit-ready decision trails meeting RBI Fair Practice Code guidelines.",
    },
    {
      feature: "No-Code Business Rules Engine (BRE) Policy Agility",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Credit teams update hard-knock parameters, risk bands, and champion-challenger policies in minutes without engineering sprints.",
    },
    {
      feature: "Multi-Model Ensemble Orchestration",
      aiMlEngine: true,
      legacyBureau: false,
      detail: "Executes credit risk, fraud anomaly, and social credibility models concurrently to produce unified holistic scoring.",
    },
    {
      feature: "Traditional 300–900 Credit Bureau Ingestion",
      aiMlEngine: true,
      legacyBureau: true,
      detail: "Seamlessly pulls and digests CIBIL, Experian, Equifax, and CRIF High Mark credit reports alongside alternate data.",
    },
  ];

  return (
    <section 
      id="comparison" 
      aria-labelledby="comparison-heading"
      className="relative py-20 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
            INTELLIGENCE BENCHMARK
          </span>
          <h2 id="comparison-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            iFLOW AI Intelligent Suite vs Legacy Credit Scorecards
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Compare why Tier-1 banks, innovative NBFCs, and digital fintechs migrate from rigid legacy scorecards to iFLOW’s adaptive machine learning stack.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-purple-600 font-medium mb-3">
          <span>Swipe horizontally to compare full benchmark &rarr;</span>
        </div>

        {/* Comparison Table Container */}
        <div className="rounded-3xl border border-purple-200/90 overflow-hidden shadow-xl shadow-purple-950/5 bg-white">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-200">
            <table 
              className="w-full text-left border-collapse min-w-[700px]"
              aria-label="iFLOW AI Intelligent Suite vs Legacy Credit Scorecards Comparison"
            >
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="py-5 px-6 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 w-[42%]">
                    Capability / Evaluation Dimension
                  </th>
                  <th className="py-5 px-6 text-center w-[29%] bg-gradient-to-r from-purple-50/60 to-purple-100/40 border-x border-purple-100">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#623f99] text-white flex items-center justify-center">
                        <BrainCircuit className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-[#623f99] tracking-tight">
                        iFLOW AI Intelligent Suite
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-center text-xs sm:text-sm font-semibold text-slate-500 w-[29%]">
                    Legacy Bureau Scorecards
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-purple-50/20 transition-colors duration-150 group"
                  >
                    <td className="py-4.5 px-6">
                      <h3 className="font-semibold text-slate-900 group-hover:text-[#623f99] transition-colors text-sm sm:text-[15px]">
                        {row.feature}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                        {row.detail}
                      </p>
                    </td>

                    {/* iFLOW Column */}
                    <td className="py-4.5 px-6 text-center bg-gradient-to-r from-purple-50/30 to-purple-100/20 border-x border-purple-100">
                      {row.aiMlEngine ? (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 mx-auto shadow-2xs">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400 mx-auto">
                          <Minus className="w-4 h-4" />
                        </div>
                      )}
                    </td>

                    {/* Legacy Bureau Column */}
                    <td className="py-4.5 px-6 text-center">
                      {row.legacyBureau ? (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 mx-auto">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-400 mx-auto">
                          <Minus className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Insight Banner */}
          <div className="py-4 px-6 bg-gradient-to-r from-purple-50/80 via-white to-purple-50/60 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
              <span>
                <strong>Conclusion:</strong> iFLOW combines traditional bureau accuracy with alternative big data to unlock 25–40% higher approvals with lower risk.
              </span>
            </div>
            <span className="font-mono text-[11px] font-bold text-[#623f99] uppercase tracking-wider">
              Sub-100ms Inference Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
