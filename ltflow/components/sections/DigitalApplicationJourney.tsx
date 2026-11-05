"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Sparkles, ShieldCheck, FileCheck, Building2, User, Car, Home, Briefcase } from "lucide-react";

interface StepData {
  id: number;
  title: string;
  subtitle: string;
  formTitle: string;
  formSubtitle: string;
}

const STEPS: StepData[] = [
  {
    id: 1,
    title: "Select a loan product",
    subtitle: "Choose a configured product",
    formTitle: "Select a loan product",
    formSubtitle: "Choose the loan product that best matches your requirement.",
  },
  {
    id: 2,
    title: "Enter basic details",
    subtitle: "Configured fields and checks",
    formTitle: "Enter basic details",
    formSubtitle: "Provide applicant and employment details for instant validation.",
  },
  {
    id: 3,
    title: "Verify identity",
    subtitle: "Configured fields and checks",
    formTitle: "Verify identity",
    formSubtitle: "Real-time verification against official government databases.",
  },
  {
    id: 4,
    title: "Complete the application",
    subtitle: "Configured fields and checks",
    formTitle: "Complete the application",
    formSubtitle: "This illustrative screen adapts to the selected product and lender workflow.",
  },
  {
    id: 5,
    title: "Submit documents",
    subtitle: "Configured fields and checks",
    formTitle: "Submit documents",
    formSubtitle: "Zero paperwork with automated Account Aggregator and digital uploads.",
  },
  {
    id: 6,
    title: "Verification & eligibility",
    subtitle: "Configured fields and checks",
    formTitle: "Verification & eligibility",
    formSubtitle: "Automated underwriting rules, dedupe, and policy calculations.",
  },
  {
    id: 7,
    title: "Credit assessment",
    subtitle: "Configured fields and checks",
    formTitle: "Credit assessment",
    formSubtitle: "Real-time bureau inquiry and AI/ML risk assessment models.",
  },
  {
    id: 8,
    title: "Status & next steps",
    subtitle: "Configured fields and checks",
    formTitle: "Status & next steps",
    formSubtitle: "Digital sanction generation, instant e-Sign, and mandate setup.",
  },
];

interface DigitalApplicationJourneyProps {
  badge?: string;
  title?: string;
  description?: string;
}

export default function DigitalApplicationJourney({
  badge = "DIGITAL APPLICATION JOURNEYS",
  title = "Interactive Loan Origination Journey: From Application to Instant Sanction",
  description = "Experience our end-to-end digital lending flow. Guide borrowers through product selection, instant KYC verification, bank statement analysis, and automated underwriting in under 3 minutes.",
}: DigitalApplicationJourneyProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<string>("Personal loan");

  // Step 2 state
  const [applicantName, setApplicantName] = useState<string>("Alex Rivera");
  const [phoneNumber, setPhoneNumber] = useState<string>("+91 98765 43210");
  const [email, setEmail] = useState<string>("alex.rivera@enterprise.com");
  const [employmentType, setEmploymentType] = useState<string>("Salaried");

  // Step 4 state (Image 2)
  const [applicantDetail, setApplicantDetail] = useState<string>("Illustrative field");
  const [validationStatus, setValidationStatus] = useState<string>("Validated ✓");
  const [applicationRef, setApplicationRef] = useState<string>("IFL-2025-01482");

  const progressPercentage = Math.round((currentStep / STEPS.length) * 100);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(1); // loop or restart
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentStepData = STEPS[currentStep - 1];

  const loanProducts = [
    { id: "personal", name: "Personal loan", icon: User },
    { id: "business", name: "Business loan", icon: Briefcase },
    { id: "home", name: "Home loan", icon: Home },
    { id: "vehicle", name: "Vehicle loan", icon: Car },
  ];

  return (
    <section 
      id="digital-application-journey" 
      aria-labelledby="journey-heading"
      className="py-20 px-4 sm:px-6 lg:px-16 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#7E22CE] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#7E22CE]" />
            {badge}
          </span>
          <h2 
            id="journey-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Journey Card Wrapper */}
        <div className="bg-[#f8f9fd] rounded-3xl border border-slate-200/90 p-5 sm:p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Stepper Column (8 Steps) */}
            <div className="lg:col-span-5 space-y-2.5">
              {STEPS.map((step) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white border-2 border-slate-900 shadow-md ring-1 ring-slate-900/10"
                        : "hover:bg-white/80 border-2 border-transparent"
                    }`}
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isCompleted
                          ? "bg-[#7E22CE] text-white"
                          : isActive
                          ? "bg-[#7E22CE] text-white ring-2 ring-purple-200"
                          : "border border-slate-300 text-slate-500 bg-white"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="pt-0.5 min-w-0">
                      <p
                        className={`text-sm sm:text-base font-semibold leading-snug truncate ${
                          isActive
                            ? "text-[#7E22CE]"
                            : "text-slate-800"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Interactive Form Screen */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 flex flex-col justify-between min-h-[560px]">
                <div>
                  {/* Top Header of Form */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-[#7E22CE] flex items-center justify-center text-white text-xs font-black tracking-wider shadow-sm">
                        IF
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        Loan application
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-[#7E22CE] hover:text-[#5B1699] transition-colors cursor-pointer"
                    >
                      Save &amp; exit
                    </button>
                  </div>

                  {/* Step & Progress Bar */}
                  <div className="flex items-center gap-4 mb-7 text-xs font-medium text-slate-500">
                    <span className="shrink-0 font-semibold text-slate-700">
                      Step {currentStep} of {STEPS.length}
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7E22CE] rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="shrink-0 font-bold text-slate-700">
                      {progressPercentage}%
                    </span>
                  </div>

                  {/* Form Step Header */}
                  <div className="mb-6">
                    <p className="text-xs font-bold tracking-wider text-[#7E22CE] uppercase mb-1.5">
                      YOUR APPLICATION
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {currentStepData.formTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      {currentStepData.formSubtitle}
                    </p>
                  </div>

                  {/* Dynamic Step Content */}
                  <div className="py-1">
                    {/* STEP 1: SELECT A LOAN PRODUCT */}
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {loanProducts.map((prod) => {
                          const isSelected = selectedProduct === prod.name;
                          const IconComp = prod.icon;
                          return (
                            <button
                              key={prod.id}
                              type="button"
                              onClick={() => setSelectedProduct(prod.name)}
                              className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? "border-2 border-[#7E22CE] bg-purple-50/60 shadow-sm"
                                  : "border-slate-200 hover:border-purple-300 bg-white"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-slate-700">
                                  {/* Diamond icon as shown in screenshot */}
                                  <span className="text-base font-light">◇</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">
                                  {prod.name}
                                </span>
                              </div>
                              <span
                                className={`text-xs font-medium ${
                                  isSelected ? "text-[#7E22CE] font-semibold" : "text-slate-400"
                                }`}
                              >
                                {isSelected ? "Selected" : "Choose"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* STEP 2: ENTER BASIC DETAILS */}
                    {currentStep === 2 && (
                      <div className="space-y-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Full Legal Name
                          </label>
                          <input
                            type="text"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#7E22CE]"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="text-xs font-semibold text-slate-600">
                                Mobile Number
                              </label>
                              <span className="text-[11px] font-semibold text-emerald-600">
                                Verified ✓
                              </span>
                            </div>
                            <input
                              type="text"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#7E22CE]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                              Work Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#7E22CE]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            Employment Type
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Salaried", "Self-Employed", "Business Owner"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setEmploymentType(type)}
                                className={`text-xs py-2 px-3 rounded-lg border font-medium text-center transition-all ${
                                  employmentType === type
                                    ? "border-[#7E22CE] bg-purple-50 text-[#7E22CE] font-bold"
                                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: VERIFY IDENTITY */}
                    {currentStep === 3 && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Aadhaar Paperless e-KYC
                            </p>
                            <p className="text-xs text-slate-500">
                              Verified instantly via UIDAI OTP
                            </p>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Verified ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              PAN Card Verification
                            </p>
                            <p className="text-xs text-slate-500">
                              ABCDE1234F – Name matched 100%
                            </p>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Validated ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Liveness &amp; Face Match
                            </p>
                            <p className="text-xs text-slate-500">
                              AI biometric score: 99.4% confidence
                            </p>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Passed ✓
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: COMPLETE THE APPLICATION (EXACT MATCH TO ATTACHED IMAGE 2) */}
                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Applicant detail
                          </label>
                          <input
                            type="text"
                            value={applicantDetail}
                            onChange={(e) => setApplicantDetail(e.target.value)}
                            className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#7E22CE]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Validation status
                          </label>
                          <input
                            type="text"
                            value={validationStatus}
                            onChange={(e) => setValidationStatus(e.target.value)}
                            className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#7E22CE]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1.5">
                            Application reference
                          </label>
                          <input
                            type="text"
                            value={applicationRef}
                            onChange={(e) => setApplicationRef(e.target.value)}
                            className="w-full text-sm font-medium text-slate-800 border border-slate-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-[#7E22CE]"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 5: SUBMIT DOCUMENTS */}
                    {currentStep === 5 && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Account Aggregator (OneMoney / Setu)
                            </p>
                            <p className="text-xs text-slate-500">
                              6 months automated banking data pulled
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#7E22CE] bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                            Auto-Fetched ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Income Proof / Form 16
                            </p>
                            <p className="text-xs text-slate-500">
                              Uploaded: Form16_FY24-25.pdf
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Parsed ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Current Address Proof
                            </p>
                            <p className="text-xs text-slate-500">
                              Electricity_Bill_Latest.pdf
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Verified ✓
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: VERIFICATION & ELIGIBILITY */}
                    {currentStep === 6 && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Dedupe &amp; Negative List Screen
                            </p>
                            <p className="text-xs text-slate-500">
                              Checked across internal and fraud databases
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Clear ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Employer Category Check
                            </p>
                            <p className="text-xs text-slate-500">
                              Tier-1 Corporate listed company
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Approved ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Debt-to-Income / FOIR Ratio
                            </p>
                            <p className="text-xs text-slate-500">
                              Calculated 32.4% (Threshold: 55%)
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#7E22CE] bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                            Optimal ✓
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STEP 7: CREDIT ASSESSMENT */}
                    {currentStep === 7 && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Bureau Credit Score (CIBIL / Experian)
                            </p>
                            <p className="text-xs text-slate-500">
                              Score: 785 – Prime tier, 0 write-offs
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Excellent ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              iFLOW AI/ML Default Probability
                            </p>
                            <p className="text-xs text-slate-500">
                              0.42% expected default (Ultra low risk)
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#7E22CE] bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                            Tier 1 ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Approved Limit &amp; Terms
                            </p>
                            <p className="text-xs text-slate-500">
                              Sanction limit: ₹15,00,000 @ 10.5% p.a.
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Sanctioned ✓
                          </span>
                        </div>
                      </div>
                    )}

                    {/* STEP 8: STATUS & NEXT STEPS */}
                    {currentStep === 8 && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 text-left">
                          <p className="text-sm font-bold text-emerald-900 mb-1">
                            Application Sanctioned &amp; Ready for Disbursal
                          </p>
                          <p className="text-xs text-emerald-700 leading-relaxed">
                            All underwriting policies passed. The customer has signed the loan agreement and registered an e-NACH auto-debit mandate.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Digital Sanction Letter
                            </p>
                            <p className="text-xs text-slate-500">
                              Signed sanction letter PDF generated
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Generated ✓
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              Aadhaar e-Sign &amp; e-NACH Mandate
                            </p>
                            <p className="text-xs text-slate-500">
                              e-Signed with timestamp &amp; mandate active
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Complete ✓
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Footer Buttons */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 transition-all ${
                      currentStep === 1
                        ? "opacity-40 cursor-not-allowed text-slate-400 bg-slate-50"
                        : "text-slate-700 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                    }`}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#7E22CE] hover:bg-[#6b21a8] text-white shadow-md shadow-purple-500/20 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentStep === STEPS.length ? "Restart journey" : "Continue"}
                    </span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
