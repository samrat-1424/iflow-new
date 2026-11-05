import React from "react";
import { Check, Minus, Sparkles } from "lucide-react";

export default function CoLendingComparison() {
  const comparisonData = [
    {
      feature: "Priority Sector Lending (PSL) compliance",
      coLending: true,
      directLending: false,
      detail: "Banks meet regulatory PSL targets without building local branch networks",
    },
    {
      feature: "Shared credit risk between partners",
      coLending: true,
      directLending: false,
      detail: "Risk distributed per 80:20 or 90:10 ratio with aligned collection incentives",
    },
    {
      feature: "Lower borrower interest rate",
      coLending: true,
      directLending: false,
      detail: "Blended interest rate combines low-cost bank capital with NBFC margin",
    },
    {
      feature: "NBFC customer origination advantage",
      coLending: true,
      directLending: false,
      detail: "Leverages hyper-local NBFC distribution for MSME and rural borrowers",
    },
    {
      feature: "Bank balance sheet efficiency",
      coLending: true,
      directLending: false,
      detail: "Deploy large ticket institutional capital without direct servicing opex",
    },
    {
      feature: "Automated fund flow & escrow settlement",
      coLending: true,
      directLending: false,
      detail: "T+0 / T+1 tripartite automated escrow with zero manual intervention",
    },
    {
      feature: "Single system of record & audit ledger",
      coLending: true,
      directLending: true,
      detail: "Unified ledger tracking loans, repayments, and regulatory submissions",
    },
    {
      feature: "AI-powered credit underwriting",
      coLending: true,
      directLending: true,
      detail: "Multi-bureau parallel pull with alternative data scoring",
    },
    {
      feature: "Full single-lender borrower ownership",
      coLending: false,
      directLending: true,
      detail: "Direct lending retains 100% borrower ownership on single balance sheet",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-y border-purple-100/60 overflow-hidden">
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
            MODEL COMPARISON
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
            Co-Lending vs Direct Lending
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Comparing joint balance sheet origination against traditional single-lender deployment to maximize yield, compliance, and distribution reach.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="rounded-3xl border border-purple-100/80 bg-white shadow-xl shadow-purple-950/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-purple-100 bg-slate-900 text-white">
                  <th className="py-5 px-6 sm:px-8 font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-300 w-1/2">
                    Key Operating Criteria
                  </th>
                  <th className="py-5 px-6 sm:px-8 text-center w-1/4 bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white">
                    <div className="inline-flex flex-col items-center gap-1">
                      <span className="font-bold text-sm sm:text-base tracking-tight">
                        Co-Lending (iFLOW)
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono tracking-wider font-semibold uppercase">
                        Recommended
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 sm:px-8 text-center w-1/4 font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-400">
                    Direct Lending
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
                      <div className="text-xs text-slate-500 mt-0.5 font-normal">
                        {row.detail}
                      </div>
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-center bg-purple-50/20 border-x border-purple-100/70">
                      {row.coLending ? (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 shadow-2xs">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400">
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-center">
                      {row.directLending ? (
                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 shadow-2xs">
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

          {/* Table Footer Insight */}
          <div className="py-4 px-6 sm:px-8 bg-slate-50/70 border-t border-purple-100/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span className="font-medium text-slate-600">
              Compliant with RBI Circular on Co-Lending by Banks and NBFCs to Priority Sector.
            </span>
            <span className="font-mono text-[#623f99] font-bold">
              CLM 1 &amp; CLM 2 Supported
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
