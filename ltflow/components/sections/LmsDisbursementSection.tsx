"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ShieldCheck, FileCheck, Layers, Sparkles } from "lucide-react";

interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  state: "completed" | "active" | "pending";
  actionLabel?: string;
}

const DISBURSEMENT_STEPS: StepItem[] = [
  {
    id: 1,
    title: "Ready to disburse",
    subtitle: "Completed",
    state: "completed",
  },
  {
    id: 2,
    title: "Validate details",
    subtitle: "Completed",
    state: "completed",
  },
  {
    id: 3,
    title: "Prepare bank file",
    subtitle: "Completed",
    state: "completed",
  },
  {
    id: 4,
    title: "Maker verification",
    subtitle: "Awaiting action",
    state: "active",
    actionLabel: "Review",
  },
  {
    id: 5,
    title: "Checker approval",
    subtitle: "Pending",
    state: "pending",
  },
  {
    id: 6,
    title: "Payment released",
    subtitle: "Pending",
    state: "pending",
  },
];

const LEFT_FEATURES = [
  "Ready-to-disburse loan queue",
  "Held-back amount management",
  "Maker-checker authorisation",
];

const RIGHT_FEATURES = [
  "Amount, date and beneficiary review",
  "Multiple tranches where applicable",
  "Payout references where supported",
];

export default function LmsDisbursementSection() {
  const [activeStepId, setActiveStepId] = useState<number>(4);
  const [makerReviewed, setMakerReviewed] = useState<boolean>(false);

  const handleReviewToggle = () => {
    setMakerReviewed(!makerReviewed);
    setActiveStepId(makerReviewed ? 4 : 5);
  };

  return (
    <section
      id="disbursement-management"
      className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#faf7fd] to-white border-b border-purple-100/70 overflow-hidden"
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Copy, Checklist, and Note */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Tagline / Badge */}
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
              DISBURSEMENT MANAGEMENT
            </span>

            {/* Main Title */}
            <h2
              id="disbursement-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"
            >
              Bring Greater Control to Loan Disbursement Operations
            </h2>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
              Coordinate system-level disbursement and bank-level payment execution with clearer transaction status and approval visibility.
            </p>

            {/* Two-Column Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              {/* Column 1 */}
              <div className="space-y-4">
                {LEFT_FEATURES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                {RIGHT_FEATURES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100/80 text-[#623f99] flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-200/60 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Disclaimer / Callout Bar */}
            <div className="border-l-2 border-[#623f99] pl-4 py-1">
              <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                Bank portal interaction, file formats, and payment APIs depend on implementation and banking integration.
              </p>
            </div>
          </div>

          {/* Right Column: High-Fidelity Disbursement Batch Mockup Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-purple-950/5 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/10 hover:border-purple-200">
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#623f99] via-[#9a3f91] to-[#623f99]" />

              {/* Card Header */}
              <div className="p-6 sm:p-7 pb-5 flex items-start justify-between border-b border-slate-100 bg-white">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Disbursement batch
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    DB-240814-08 · 24 loans
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#623f99] text-xs font-bold font-mono border border-purple-100 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#9a3f91] animate-pulse" />
                  In progress
                </span>
              </div>

              {/* Stepper Timeline List */}
              <div className="px-6 sm:px-7 py-6 relative">
                <div className="space-y-5 relative">
                  {/* Connected Background Vertical Line */}
                  <div
                    className="absolute left-[15px] top-3 bottom-5 w-0.5 bg-slate-200 -z-0"
                    aria-hidden="true"
                  />

                  {DISBURSEMENT_STEPS.map((step) => {
                    // Check dynamic state if Maker is reviewed
                    const isCompleted =
                      step.id < activeStepId ||
                      (step.id === 4 && makerReviewed);
                    const isActive =
                      !isCompleted && step.id === activeStepId;
                    const isPending =
                      !isCompleted && !isActive;

                    return (
                      <div
                        key={step.id}
                        className="flex items-center justify-between relative z-10 group"
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Step Indicator Circle */}
                          {isCompleted ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </div>
                          ) : isActive ? (
                            <div className="w-8 h-8 rounded-full border-2 border-[#623f99] bg-white text-[#623f99] font-bold text-xs flex items-center justify-center ring-4 ring-purple-100 shadow-xs flex-shrink-0">
                              {step.id}
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full border border-slate-200 bg-white text-slate-400 font-medium text-xs flex items-center justify-center flex-shrink-0">
                              {step.id}
                            </div>
                          )}

                          {/* Step Text Info */}
                          <div>
                            <span
                              className={`text-sm leading-snug block ${
                                isActive
                                  ? "font-bold text-slate-900"
                                  : isCompleted
                                  ? "font-semibold text-slate-800"
                                  : "font-medium text-slate-600"
                              }`}
                            >
                              {step.title}
                            </span>
                            <span
                              className={`text-xs block mt-0.5 ${
                                isActive
                                  ? "text-amber-600 font-medium"
                                  : "text-slate-400"
                              }`}
                            >
                              {isCompleted
                                ? "Completed"
                                : isActive
                                ? "Awaiting action"
                                : "Pending"}
                            </span>
                          </div>
                        </div>

                        {/* Action Badge / Button (for Active Step, e.g. Maker Review) */}
                        {step.actionLabel && (
                          <div>
                            <button
                              type="button"
                              onClick={handleReviewToggle}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-2xs ${
                                makerReviewed
                                  ? "bg-purple-100 text-[#623f99] border border-purple-200"
                                  : "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 cursor-pointer active:scale-95"
                              }`}
                            >
                              <span>{makerReviewed ? "Reviewed" : step.actionLabel}</span>
                              {!makerReviewed && (
                                <ArrowRight className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Summary Metrics Banner */}
              <div className="px-6 sm:px-7 pb-6 pt-2">
                <div className="rounded-2xl bg-slate-50/90 border border-slate-100 p-4 grid grid-cols-3 gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Batch value
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      ₹2,84,50,000
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Loans
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                      24
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Exceptions
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#9a3f91] font-mono">
                      02
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

