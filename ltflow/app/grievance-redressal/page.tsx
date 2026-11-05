import type { Metadata } from "next";
import React from 'react';
import ScrollSpy from './ScrollSpy';

export const metadata: Metadata = {
  title: "Grievance Redressal | iFLOW",
  description:
    "Read the iFLOW Grievance Redressal Policy to understand how customer complaints are addressed efficiently and transparently.",
  alternates: {
    canonical: "/grievance-redressal",
  },
};

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'applicability', title: '2. Applicability' },
  { id: 'purpose', title: '3. Purpose' },
  { id: 'principles', title: '4. Principles of Grievance Redressal' },
  { id: 'lodge', title: '5. How to Lodge a Complaint' },
  { id: 'escalation', title: '6. Escalation Process' },
  { id: 'officer', title: '7. Grievance Redressal Officer' },
  { id: 'amendments', title: '8. Policy Review & Amendments' },
];

export default function GrievanceRedressalPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans pb-20 scroll-smooth">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center leading-tight">
            Grievance Redressal Policy
          </h1>
          <p className="mt-4 text-center text-gray-300 max-w-2xl mx-auto">
            Last Updated: July 2026
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Content Cards */}
        <div className="lg:w-2/3 xl:w-3/4 space-y-6">
          
          <section id="introduction" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">1. Introduction</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                The Grievance Redressal Policy of <strong className="text-gray-900 font-medium">iFLOW</strong> ensures that customer complaints are addressed efficiently and transparently. This policy provides a structured framework to resolve issues promptly while maintaining fairness.
              </p>
            </div>
          </section>

          <section id="applicability" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">2. Applicability</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                This policy applies to all customer grievances related to <strong className="text-gray-900 font-medium">iFLOW’s</strong> services.
              </p>
            </div>
          </section>

          <section id="purpose" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">3. Purpose</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                Our goal is to ensure timely, impartial, and effective handling of grievances through a structured resolution process.
              </p>
            </div>
          </section>

          <section id="principles" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">4. Principles of Grievance Redressal</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-gray-900 font-medium">Fairness & Equality</strong> – All customers receive unbiased treatment.</li>
                <li><strong className="text-gray-900 font-medium">Timely Resolution</strong> – Complaints are addressed promptly.</li>
                <li><strong className="text-gray-900 font-medium">Transparency</strong> – Customers are informed about escalation procedures.</li>
                <li><strong className="text-gray-900 font-medium">Compliance</strong> – Our responses align with regulatory requirements.</li>
              </ul>
            </div>
          </section>

          <section id="lodge" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">5. How to Lodge a Complaint</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                Customers can submit complaints via email at <a href="mailto:info@iflow.co.in" className="text-[#623f99] hover:underline">info@iflow.co.in</a> or through postal mail at our registered address.
              </p>
            </div>
          </section>

          <section id="escalation" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">6. Escalation Process</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>If you are unsatisfied with the initial support or need to escalate your issue, please direct your complaints to our Grievance Redressal Officer at <a href="mailto:info@iflow.co.in" className="text-[#623f99] hover:underline">info@iflow.co.in</a>.</p>
              
              <h3 className="font-semibold text-gray-900 mt-6">Resolution Timelines:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>First response within 48 hours</li>
                <li>Resolution within 21 business days</li>
              </ul>
            </div>
          </section>

          <section id="officer" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">7. Grievance Redressal Officer</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Name</p>
                    <p className="text-lg text-gray-900 font-semibold">Mr. Ajay Chaudhary</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Email</p>
                    <a href="mailto:info@iflow.co.in" className="text-lg text-[#623f99] font-medium hover:underline break-all">info@iflow.co.in</a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Phone</p>
                    <a href="tel:+918793001310" className="text-lg text-[#623f99] font-medium hover:underline break-all">+91 87930-01310</a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Working Hours</p>
                    <p className="text-lg text-gray-800 font-medium">Monday–Friday, 9:30 AM – 6:30 PM</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Registered Office</p>
                    <p className="text-gray-800 leading-relaxed">
                      306, Sangeeta Ramchand (Kartik) CHSL<br/>
                      New Link Road 5 Kartik Complex,<br/>
                      Opp Laxmi Ind Estate, Andheri (W)<br/>
                      Mumbai, Maharashtra, India - 400053
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">Corporate Office</p>
                    <p className="text-gray-800 leading-relaxed">
                      Office No. 103, 1st Floor, Hermes Waves,<br/>
                      Kalyani Nagar, Pune,<br/>
                      Maharashtra, India, 411006
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section id="amendments" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">8. Policy Review & Amendments</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>This policy is reviewed annually to ensure compliance with legal and operational requirements.</p>
              <p>The Board of Directors reserves the right to amend it as necessary.</p>
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Table of Contents */}
        <div className="hidden lg:block lg:w-1/3 xl:w-1/4">
          <div className="sticky top-28 bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-4">On This Page</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="toc-link block w-full text-left px-4 py-2 text-[15px] rounded-r-lg border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <ScrollSpy sectionIds={sections.map(s => s.id)} />

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
