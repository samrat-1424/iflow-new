"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Settings, Users, Network, Smartphone, Cpu, Plug, BrainCircuit, UserCircle, BarChart, ClipboardCheck, IdCard, CheckCircle, Fingerprint, Link2, CreditCard, Mail, MessageSquare, MessageCircle, CheckSquare, Landmark, Zap, Code2, Database, LayoutTemplate, FileCode, GitMerge, ImageIcon, Tag, Palette } from 'lucide-react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'about', title: '2. About iFlow' },
  { id: 'eligibility', title: '3. Eligibility' },
  { id: 'permitted-use', title: '4. Permitted Use' },
  { id: 'intellectual-property', title: '5. Intellectual Property Rights' },
  { id: 'user-accounts', title: '6. User Accounts' },
  { id: 'enterprise-services', title: '7. Enterprise Services' },
  { id: 'third-party', title: '8. Third Party Integrations' },
  { id: 'data-privacy', title: '9. Data Privacy' },
  { id: 'confidential', title: '10. Confidential Information' },
  { id: 'availability', title: '11. Availability of Services' },
  { id: 'disclaimer', title: '12. Disclaimer of Warranties' },
  { id: 'limitation', title: '13. Limitation of Liability' },
  { id: 'indemnification', title: '14. Indemnification' },
  { id: 'compliance', title: '15. Compliance' },
  { id: 'suspension', title: '16. Suspension or Termination' },
  { id: 'modification', title: '17. Modification of Terms' },
  { id: 'governing-law', title: '18. Governing Law' },
  { id: 'severability', title: '19. Severability' },
  { id: 'force-majeure', title: '20. Force Majeure' },
  { id: 'contact', title: '21. Contact Information' },
];

export default function TermsOfUse() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans pb-20">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center leading-tight">
            Terms of Use
          </h1>
          <p className="mt-4 text-center text-gray-300 max-w-2xl mx-auto">
            Last Updated: June 2026
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Content Cards */}
        <div className="lg:w-2/3 xl:w-3/4 space-y-6">
          
          <section id="acceptance" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">1. Acceptance of Terms</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                By accessing or using iFlow's enterprise lending technology platform, website, APIs, services, or any related products (collectively, the "Services"), you agree to be bound by these Terms of Use ("Terms").
              </p>
              <p>
                If you are accessing or using the Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and your acceptance of these Terms will be treated as acceptance by that organization.
              </p>
              <p>
                If you do not agree to these Terms, you must not access or use the Services.
              </p>
            </div>
          </section>

          <section id="about" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">2. About iFlow</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                iFlow is a comprehensive enterprise lending technology platform. Our platform provides end-to-end digital lending solutions for Banks, Non-Banking Financial Companies (NBFCs), FinTech companies, Housing Finance Companies (HFCs), and other financial institutions.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Our Platform Includes:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <FileText className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Loan Origination System</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Settings className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Loan Management System</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Users className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Collections</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Network className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Co-Lending Platform</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Smartphone className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Digital Onboarding</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Cpu className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Business Rule Engine</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Plug className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">API Integrations</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <BrainCircuit className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">AI Decision Engine</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <UserCircle className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Customer Portal</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <BarChart className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Reporting & Analytics</span>
                </div>
              </div>
            </div>
          </section>

          <section id="eligibility" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">3. Eligibility</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>You may use the Services only if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are a legal entity registered and operating in India</li>
                <li>You are authorized to conduct financial services business under applicable laws</li>
                <li>You have entered into a separate commercial agreement with LoanTap Financial Technologies Pvt. Ltd.</li>
                <li>You comply with all applicable laws, regulations, and regulatory guidelines</li>
              </ul>
            </div>
          </section>

          <section id="permitted-use" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">4. Permitted Use</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>Subject to your compliance with these Terms and your commercial agreement with us, you may use the Services for:</p>
              
              <h3 className="font-semibold text-gray-900 mt-6">Permitted Activities</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing loan applications</li>
                <li>Managing loan portfolios</li>
                <li>Customer onboarding and KYC</li>
                <li>Collection management</li>
                <li>Reporting and analytics</li>
              </ul>

              <h3 className="font-semibold text-gray-900 mt-6">Additional Uses</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>API integrations</li>
                <li>Rule configuration</li>
                <li>Workflow automation</li>
                <li>User management</li>
                <li>Data export and reporting</li>
              </ul>
            </div>
          </section>

          <section id="intellectual-property" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">5. Intellectual Property Rights</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                All intellectual property rights in the Services, including but not limited to software, source code, APIs, UI/UX designs, documentation, trademarks, and logos, are owned by LoanTap Financial Technologies Pvt. Ltd.
              </p>
              <p>
                Your use of the Services does not grant you any ownership rights to our intellectual property. You are granted only a limited, non-exclusive, non-transferable license to use the Services as set forth in your commercial agreement.
              </p>

              <h3 className="text-lg font-semibold text-[#0f172a] mt-8 mb-4">Protected Intellectual Property:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Code2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Software</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Database className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Source Code</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Plug className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">APIs</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <LayoutTemplate className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">UI/UX</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Cpu className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Architecture</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <FileCode className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Documentation</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <GitMerge className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Workflow</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Logos</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Tag className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Trademarks</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Palette className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Marketing Assets</span>
                </div>
              </div>
            </div>
          </section>

          <section id="user-accounts" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">6. User Accounts</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>To access certain features of the Services, you must create user accounts for your authorized personnel. You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of account credentials</li>
                <li>All activities that occur under your accounts</li>
                <li>Notifying us immediately of any unauthorized access or security breaches</li>
                <li>Ensuring that all account information is accurate and up-to-date</li>
                <li>Implementing appropriate access controls and user permissions</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that violate these Terms or pose a security risk.</p>
            </div>
          </section>

          <section id="enterprise-services" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">7. Enterprise Services</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                The Services are provided on an enterprise basis pursuant to a separate commercial agreement. The specific features, service levels, support, pricing, and terms applicable to your use will be set forth in your commercial agreement.
              </p>
              <p>
                In the event of any conflict between these Terms and your commercial agreement, the commercial agreement shall prevail.
              </p>
              <p>
                Enterprise services may include dedicated support, custom integrations, white-labeling options, SLA commitments, and other features as agreed upon in your commercial agreement.
              </p>
            </div>
          </section>

          <section id="third-party" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">8. Third Party Integrations</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>
                iFlow integrates with various third-party services to provide comprehensive functionality. Your use of these integrations is subject to the terms and conditions of the respective third parties.
              </p>

              <h3 className="text-lg font-semibold text-[#0f172a] mt-8 mb-4">Integrated Third Party Services:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <ClipboardCheck className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Credit Bureau</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <IdCard className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">PAN</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <CheckCircle className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">CKYC</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Fingerprint className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Aadhaar</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Link2 className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Account Aggregator</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <CreditCard className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Payment Gateway</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Mail className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Email</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <MessageSquare className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">SMS</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <MessageCircle className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">WhatsApp</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <CheckSquare className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">eSign</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Landmark className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Bank APIs</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[#623f99]/10 p-3 rounded-xl mb-4 text-[#623f99]">
                    <Zap className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-medium text-gray-800 text-center">Webhooks</span>
                </div>
              </div>
              
              <p className="mt-4">
                We do not guarantee the availability or performance of third party services and are not responsible for any issues arising from their use.
              </p>
            </div>
          </section>

          <section id="data-privacy" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">9. Data Privacy</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, and protect your data. By using the Services, you consent to our Privacy Policy.</p>
              <p>You are responsible for ensuring that you have all necessary rights and consents to provide customer data to the Services and for your own compliance with applicable data protection laws, including but not limited to the Digital Personal Data Protection Act, 2023.</p>
              <p>We implement industry-standard security measures to protect your data, including encryption, access controls, regular security audits, and compliance with applicable data protection regulations.</p>
            </div>
          </section>

          <section id="confidential" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">10. Confidential Information</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>Each party agrees to maintain the confidentiality of any confidential information received from the other party and to use such information only for the purposes of performing under the commercial agreement.</p>
              <p>Confidential information includes, but is not limited to, technical specifications, business processes, customer data, pricing information, and any information marked as confidential or that would reasonably be considered confidential.</p>
              <p>These confidentiality obligations shall survive termination of your use of the Services for a period of five (5) years.</p>
            </div>
          </section>

          <section id="availability" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">11. Availability of Services</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>We strive to make the Services available 24/7, but we do not guarantee uninterrupted access. The Services may be unavailable during maintenance windows, upgrades, or due to circumstances beyond our control.</p>
              <p>We will use commercially reasonable efforts to provide advance notice of planned maintenance. Service level agreements (SLAs), if applicable, will be specified in your commercial agreement.</p>
              <p>We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with reasonable notice where practicable.</p>
            </div>
          </section>

          <section id="disclaimer" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">12. Disclaimer of Warranties</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
              <p>We do not warrant that the Services will be error-free, uninterrupted, secure, or free from viruses or other harmful components. Any material downloaded or otherwise obtained through the use of the Services is accessed at your own risk.</p>
            </div>
          </section>

          <section id="limitation" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">13. Limitation of Liability</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL LOANTAP FINANCIAL TECHNOLOGIES PVT. LTD. BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>
              <p>Our total liability for any claims arising out of or related to these Terms or the Services shall not exceed the amounts paid by you to us for the Services in the twelve (12) months preceding the claim.</p>
              <p>Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities, so some of the above limitations may not apply to you.</p>
            </div>
          </section>

          <section id="indemnification" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">14. Indemnification</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>You agree to indemnify, defend, and hold harmless LoanTap Financial Technologies Pvt. Ltd., its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your access to or use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Any data or content you provide to the Services</li>
              </ul>
            </div>
          </section>

          <section id="compliance" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">15. Compliance</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>You agree to comply with all applicable laws, regulations, and regulatory guidelines in your use of the Services, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>RBI Guidelines</li>
                <li>Digital Personal Data Protection Act</li>
                <li>Cyber Security Framework</li>
                <li>Information Technology Act</li>
                <li>Digital Lending Guidelines</li>
                <li>Financial Regulations</li>
              </ul>
              <p>You are solely responsible for ensuring that your use of the Services complies with all applicable regulatory requirements for your industry and jurisdiction.</p>
            </div>
          </section>

          <section id="suspension" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">16. Suspension or Termination</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, with or without notice, effective immediately. Grounds for suspension or termination include, but are not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violation of these Terms</li>
                <li>Non-payment of fees under your commercial agreement</li>
                <li>Fraudulent or illegal activities</li>
                <li>Security concerns</li>
                <li>Requests from law enforcement or regulatory authorities</li>
              </ul>
              <p>Upon termination, your right to use the Services will immediately cease. Provisions that by their nature should survive termination shall survive, including confidentiality, intellectual property rights, and limitation of liability.</p>
            </div>
          </section>

          <section id="modification" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">17. Modification of Terms</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last Updated" date.</p>
              <p>Your continued use of the Services after any such changes constitutes your acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Services.</p>
              <p>For enterprise customers, material changes to Terms that affect your commercial agreement may require mutual written consent as specified in your agreement.</p>
            </div>
          </section>

          <section id="governing-law" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">18. Governing Law</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
              <p>Any disputes arising out of or related to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, India.</p>
              <p>You agree to submit to the personal jurisdiction of such courts and waive any jurisdictional, venue, or inconvenient forum objections to such courts.</p>
            </div>
          </section>

          <section id="severability" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">19. Severability</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</p>
              <p>The invalid, illegal, or unenforceable provision shall be deemed modified to the minimum extent necessary to make it valid, legal, and enforceable. If such modification is not possible, the provision shall be deemed deleted from these Terms.</p>
            </div>
          </section>

          <section id="force-majeure" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">20. Force Majeure</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>We shall not be liable for any failure or delay in performing our obligations under these Terms due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, government actions, epidemics, pandemics, or failures of third-party services or infrastructure.</p>
              <p>In the event of force majeure, our obligations shall be suspended for the duration of such circumstances, and we will use reasonable efforts to find alternative means of performance.</p>
            </div>
          </section>

          <section id="contact" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 scroll-mt-28">
            <h2 className="text-[26px] font-medium text-[#0f172a] mb-4">21. Contact Information</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-[17px]">
              <p>If you have any questions about these Terms or need legal assistance, please contact us:</p>
              <ul className="space-y-2 mt-4">
                <li><strong>Support:</strong> <a href="mailto:info@iflow.co.in" className="text-[#623f99] hover:underline">info@iflow.co.in</a></li>
                <li><strong>Website:</strong> <a href="https://www.iflow.co.in" target="_blank" rel="noopener noreferrer" className="text-[#623f99] hover:underline">www.iflow.co.in</a></li>
              </ul>
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Table of Contents */}
        <div className="hidden lg:block lg:w-1/3 xl:w-1/4">
          <div className="sticky top-28 bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-4">On This Page</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-2 text-[15px] rounded-r-lg border-l-4 transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#623f99]/10 border-[#623f99] text-[#623f99] font-medium'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

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
