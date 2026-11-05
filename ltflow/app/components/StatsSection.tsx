// app/components/StatsSection.tsx
"use client";

export default function StatsSection() {
  return (
    <section className="bg-[#f7faff] py-2 px-4 md:px-16 text-center">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center">
          <img src="/hero/statsicon.png" alt="Users" className="w-8 h-8 mb-2" />
          <p className="text-xl  text-[#222]">2.5M</p>
          <p className="text-sm text-gray-600 mt-1">Users Onboarded</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center">
          <img src="/hero/statsicon.png" alt="Business Partners" className="w-8 h-8 mb-2" />
          <p className="text-xl  text-[#222]">50+</p>
          <p className="text-sm text-gray-600 mt-1">Business Partners</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center">
          <img src="/hero/statsicon.png" alt="Gross Loan Value" className="w-8 h-8 mb-2" />
          <p className="text-xl  text-[#222]">₹5,000 Cr+</p>
          <p className="text-sm text-gray-600 mt-1">Gross Loan Value</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center">
          <img src="/hero/statsicon.png" alt="Co-lending" className="w-8 h-8 mb-2" />
          <p className="text-xl  text-[#222]">₹2500 Cr+</p>
          <p className="text-sm text-gray-600 mt-1">Disbursal on Co-lending</p>
        </div>

      </div>

      {/* Tagline Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1d2c4d]">
          A Digital Lending Infrastructure that is{' '}
          <span className="text-[#9a3f91]">SEAMLESS</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-700 mt-3">
          We help Banks, NBFCs and E-commerce players streamline operations, reduce costs and address discrepancies in sourcing, credit decisioning.
        </p>
      </div>
    </section>
  );
}
