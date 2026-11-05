"use client";

import React from "react";
import { Check, Minus, Sparkles, ShieldAlert, Gauge, Activity } from "lucide-react";

interface ComparisonRow {
  feature: string;
  bicri: boolean;
  legacyBureau: boolean;
  detail: string;
  category?: string;
}

export default function BicriComparison() {
  const comparisonData: ComparisonRow[] = [
    {
      feature: "Thin-File & NTC MSME Coverage (98%+)",
      bicri: true,
      legacyBureau: false,
      detail:
        "Evaluates unrated kiranas, retail merchants, and small enterprises using alternative data, eliminating unwarranted 'no-hit' rejections.",
    },
    {
      feature: "Real-Time Ingestion (AA, GSTN, POS, E-Way)",
      bicri: true,
      legacyBureau: false,
      detail:
        "Pulls live Account Aggregator bank streams, GSTR-1/3B filings, and POS commerce data with zero reporting lag.",
    },
    {
      feature: "Circular Trading & Invoice Fraud Triangulation",
      bicri: true,
      legacyBureau: false,
      detail:
        "Algorithmic cross-validation between buyer and supplier GSTNs detects artificial revenue inflation, shell vendors, and circular billing.",
    },
    {
      feature: "Sub-3-Minute Automated Decisioning TAT",
      bicri: true,
      legacyBureau: false,
      detail:
        "Replaces 3 to 7 days of manual CA document collection and physical verification with instant API underwriting.",
    },
    {
      feature: "Proprietary Trade Credit & Distributor Velocity",
      bicri: true,
      legacyBureau: false,
      detail:
        "Analyzes supplier payment punctuality, distributor purchase orders, and trade credit discipline across supply chains.",
    },
    {
      feature: "Dynamic Cash-Flow & Working Capital Run Rates",
      bicri: true,
      legacyBureau: false,
      detail:
        "Evaluates real-time Average Bank Balance (ABB), debit-credit velocity, inward cheque returns, and seasonal cash volatility.",
    },
    {
      feature: "Dynamic Limit & Risk-Based Pricing Engine",
      bicri: true,
      legacyBureau: false,
      detail:
        "Recommends tailored working capital credit lines and calibrated interest rate spreads linked to borrower repayment capacity.",
    },
    {
      feature: "Up to 35% Lower 1st-Year MSME Portfolio NPAs",
      bicri: true,
      legacyBureau: false,
      detail:
        "Multi-dimensional early warning signals (EWS) catch operational liquidity stress months before formal 90-day DPD defaults.",
    },
    {
      feature: "Entity Commercial + Promoter Consumer Dual-Scoring",
      bicri: true,
      legacyBureau: false,
      detail:
        "Harmonizes the business's commercial operating strength with the promoters' individual repayment track record.",
    },
    {
      feature: "Standard 300–900 Multi-Bureau Normalization",
      bicri: true,
      legacyBureau: true,
      detail:
        "Synthesizes and normalizes credit reports from CIBIL, Experian, Equifax, and CRIF High Mark alongside alternate parameters.",
    },
  ];

  return (
    <section
      id="bicri-comparison"
      aria-labelledby="bicri-comparison-heading"
      className="relative py-20 px-6 sm:px-8 lg:px-16 bg-white border-b border-purple-100/70 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
            CREDIT INTELLIGENCE BENCHMARK
          </span>
          <h2
            id="bicri-comparison-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
          >
            iFLOW BICRI vs Traditional Credit Bureau
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Compare why banks, NBFCs, and supply-chain lenders deploy BICRI to underwrite MSMEs and retailers who fall through the cracks of traditional bureau scores.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-purple-600 font-medium mb-3">
          <span>Swipe horizontally to view comparison</span>
          <span aria-hidden="true">→</span>
        </div>

        {/* Comparison Table Card */}
        <div className="rounded-2xl border border-purple-200/80 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-purple-100 bg-slate-50/70">
                  <th
                    scope="col"
                    className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-600 w-5/12"
                  >
                    Capability &amp; Risk Parameter
                  </th>
                  <th
                    scope="col"
                    className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-[#3B1259] bg-purple-50/60 border-x border-purple-200/60 w-3.5/12"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9a3f91] animate-pulse" />
                      <span className="font-extrabold text-sm sm:text-base text-[#3B1259]">
                        iFLOW BICRI
                      </span>
                      <span className="ml-auto hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200/80 text-purple-900">
                        AI Multimodal
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 w-3.5/12"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-600">
                        Legacy Bureau Only
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/60 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-purple-50/30 transition-colors duration-150 group"
                  >
                    {/* Feature & Description */}
                    <td className="py-4 px-6 align-top">
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-[#623f99] transition-colors">
                        {row.feature}
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed font-normal">
                        {row.detail}
                      </p>
                    </td>

                    {/* iFLOW BICRI Column */}
                    <td className="py-4 px-6 align-top bg-purple-50/30 border-x border-purple-200/50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        </div>
                        <span className="text-xs font-bold text-emerald-800 hidden sm:inline">
                          Native &amp; Real-Time
                        </span>
                      </div>
                    </td>

                    {/* Legacy Bureau Column */}
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center gap-2">
                        {row.legacyBureau ? (
                          <>
                            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-600 flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[2.2]" />
                            </div>
                            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                              Basic / Lagged
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center shrink-0">
                              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                            <span className="text-xs text-rose-600 font-medium hidden sm:inline">
                              Not Supported
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Callout */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50/80 via-white to-purple-50/80 border-t border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="w-2 h-2 rounded-full bg-[#9a3f91] shrink-0" />
              <span>
                <strong>Conclusion:</strong> BICRI expands the addressable borrower universe by 4.2x while cutting first-year NPAs by up to 35%.
              </span>
            </div>
            <a
              href="#bicri-simulator"
              className="font-bold text-[#7E22CE] hover:text-[#9a3f91] inline-flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <span>Test BICRI Score Simulator</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
