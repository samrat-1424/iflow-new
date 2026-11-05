import React from "react";

export default function PoolBuyoutComparison() {
  const comparisonData = [
    {
      parameter: "Objective",
      poolBuyout: "Purchase existing loan portfolios",
      coLending: "Co-originate new loans jointly",
    },
    {
      parameter: "Ownership",
      poolBuyout: "Buyer owns 100% post-transfer",
      coLending: "Shared between both parties",
    },
    {
      parameter: "Loan Stage",
      poolBuyout: "Pre-disbursed, performing loans",
      coLending: "New originations only",
    },
    {
      parameter: "Funding",
      poolBuyout: "Full consideration paid upfront",
      coLending: "Split disbursement at origination",
    },
    {
      parameter: "Use Case",
      poolBuyout: "Balance sheet expansion, liquidity",
      coLending: "Priority sector lending compliance",
    },
    {
      parameter: "Process",
      poolBuyout: "Due diligence → assignment → migration",
      coLending: "Eligibility → joint sanction → disbursement",
    },
    {
      parameter: "Risk Sharing",
      poolBuyout: "Buyer bears full portfolio risk",
      coLending: "Risk shared in agreed proportion",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-[#a259e6] text-xs font-bold tracking-wider uppercase mb-4">
            COMPARISON
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a1f44] text-center mb-4">
            Pool Buyout vs Co-Lending
          </h2>
          <p className="text-gray-500 text-lg">
            Different mechanisms for different growth strategies
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="py-6 px-8 text-gray-500 font-medium w-1/4">Parameter</th>
                  <th className="py-6 px-8 text-center w-3/8">
                    <span className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#a259e6] text-white font-medium text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pool Buyout
                    </span>
                  </th>
                  <th className="py-6 px-8 text-center w-3/8">
                    <span className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-gray-100 text-gray-600 font-medium text-sm">
                      Co-Lending
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-8 font-medium text-[#0a1f44]">{row.parameter}</td>
                    <td className="py-5 px-8 text-center text-gray-600">{row.poolBuyout}</td>
                    <td className="py-5 px-8 text-center text-gray-600">{row.coLending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
