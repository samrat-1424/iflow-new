"use client";

import React, { useState } from "react";
import {
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  GripVertical,
  MoreHorizontal,
  ArrowRight,
  Plus,
  Play,
  Send,
  Check,
  FileCode,
  ShieldCheck,
  Database,
  Layers,
} from "lucide-react";

interface RuleItem {
  num: string;
  name: string;
  status: "Active" | "Editing" | "Draft";
  partner: string;
  product: string;
  priority: string;
  conditions: Array<{
    num: number;
    variable: string;
    operator: string;
    value: string;
    type: "Mandatory" | "Weighted";
  }>;
  thenAction: string;
  elseAction: string;
  elseTarget: string;
}

const RULES_DATA: RuleItem[] = [
  {
    num: "01",
    name: "Application completeness",
    status: "Active",
    partner: "All Partners",
    product: "Universal",
    priority: "01 — Sequential",
    conditions: [
      {
        num: 1,
        variable: "KYC verification status",
        operator: "equals",
        value: "Verified / Pass",
        type: "Mandatory",
      },
      {
        num: 2,
        variable: "Mandatory document upload",
        operator: "is present & valid",
        value: "PAN, Aadhaar, GSTIN",
        type: "Mandatory",
      },
    ],
    thenAction: "Pass to bureau verification stage",
    elseAction: "Request missing documents from applicant",
    elseTarget: "Applicant retry queue",
  },
  {
    num: "02",
    name: "Credit bureau policy",
    status: "Active",
    partner: "Northstar Finance",
    product: "MSME Growth Loan",
    priority: "01 — Sequential",
    conditions: [
      {
        num: 1,
        variable: "Commercial bureau score",
        operator: "is greater than or equal to",
        value: "680 (CIBIL / Experian)",
        type: "Mandatory",
      },
      {
        num: 2,
        variable: "Overdue accounts in last 12m",
        operator: "equals",
        value: "0 instances",
        type: "Mandatory",
      },
      {
        num: 3,
        variable: "DPD > 30 in last 24m",
        operator: "is less than",
        value: "1 occurrence",
        type: "Weighted",
      },
    ],
    thenAction: "Proceed to obligation calculation",
    elseAction: "Hard decline under bureau policy",
    elseTarget: "Rejection workflow",
  },
  {
    num: "03",
    name: "Obligation assessment",
    status: "Editing",
    partner: "Northstar Finance",
    product: "MSME Growth Loan",
    priority: "02 — Sequential",
    conditions: [
      {
        num: 1,
        variable: "Bureau score",
        operator: "is greater than or equal to",
        value: "Configured threshold",
        type: "Mandatory",
      },
      {
        num: 2,
        variable: "Existing obligations",
        operator: "is within",
        value: "Applicable policy limit",
        type: "Mandatory",
      },
      {
        num: 3,
        variable: "Business vintage",
        operator: "meets or exceeds",
        value: "Product requirement",
        type: "Weighted",
      },
    ],
    thenAction: "Continue to eligibility evaluation",
    elseAction: "Refer for review under configured policy",
    elseTarget: "Underwriter queue",
  },
  {
    num: "04",
    name: "Business stability",
    status: "Draft",
    partner: "Northstar Finance",
    product: "MSME Growth Loan",
    priority: "03 — Sequential",
    conditions: [
      {
        num: 1,
        variable: "GST filing consistency",
        operator: "greater than or equal to",
        value: "95% over last 12 months",
        type: "Mandatory",
      },
      {
        num: 2,
        variable: "Bank statement turnover trend",
        operator: "is positive or stable",
        value: "YoY growth >= 8%",
        type: "Weighted",
      },
    ],
    thenAction: "Proceed to maximum credit line matrix",
    elseAction: "Require field business verification",
    elseTarget: "Field inspection queue",
  },
  {
    num: "05",
    name: "Eligibility calculation",
    status: "Draft",
    partner: "Northstar Finance",
    product: "MSME Growth Loan",
    priority: "04 — Sequential",
    conditions: [
      {
        num: 1,
        variable: "FOIR / IIR ratio",
        operator: "is less than or equal to",
        value: "60% of verified net cashflow",
        type: "Mandatory",
      },
      {
        num: 2,
        variable: "ABB (Average Bank Balance)",
        operator: "is greater than",
        value: "3x monthly EMI",
        type: "Mandatory",
      },
    ],
    thenAction: "Issue provisional sanction offer",
    elseAction: "Adjust requested loan amount",
    elseTarget: "Counter-offer desk",
  },
  {
    num: "06",
    name: "Decision matrix",
    status: "Draft",
    partner: "Northstar Finance",
    product: "MSME Growth Loan",
    priority: "05 — Final Output",
    conditions: [
      {
        num: 1,
        variable: "Composite risk tier",
        operator: "is one of",
        value: "Tier A / Tier B+",
        type: "Mandatory",
      },
      {
        num: 2,
        variable: "Sanction compliance checklist",
        operator: "all items",
        value: "Satisfied / Signed",
        type: "Mandatory",
      },
    ],
    thenAction: "Generate sanction letter & disburse",
    elseAction: "Hold for Credit Committee Signoff",
    elseTarget: "Level 3 Escalate",
  },
];

const TABS = ["Simple IF", "IF—THEN", "Formula", "Nested group"] as const;

export default function BreRuleStudioSection() {
  const selectedRuleIndex = 2; // Fixed to Rule 03 (Obligation assessment)
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Simple IF");
  const [previewActive, setPreviewActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentRule = RULES_DATA[2]; // Fixed to Obligation assessment

  const handlePreview = () => {
    setPreviewActive(true);
    setTimeout(() => setPreviewActive(false), 2400);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="rule-configuration-studio"
      aria-labelledby="rule-studio-heading"
      className="relative py-20 sm:py-28 px-6 sm:px-8 lg:px-16 bg-gradient-to-b from-[#fbf9fe] via-[#f7f3fd] to-[#fbf9fe] border-b border-purple-100/70 overflow-hidden text-slate-900"
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-[450px] h-[450px] rounded-full bg-fuchsia-200/25 blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-mono font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
            <Sliders className="w-3.5 h-3.5 text-[#9a3f91]" />
            SIGNATURE CAPABILITY
          </span>

          <h2
            id="rule-studio-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Configure Credit Rules Without{" "}
            <span className="bg-gradient-to-r from-[#623f99] via-[#7c3aed] to-[#9a3f91] bg-clip-text text-transparent">
              Rebuilding Your Application
            </span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            Give authorised Credit, Risk, and Policy teams a structured interface to maintain decision logic according to institutional policies and product requirements.
          </p>
        </div>

        {/* Studio Window Card Mockup */}
        <div className="rounded-3xl border border-purple-200/70 bg-white shadow-2xl shadow-purple-950/5 overflow-hidden transition-all">
          {/* Studio Top Control Bar */}
          <div className="px-6 sm:px-8 py-5 border-b border-slate-200/80 bg-gradient-to-r from-purple-50/40 via-white to-purple-50/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                <span>BRE STUDIO</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-500">MSME GROWTH</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Business Rule Configuration
              </h3>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
              {/* Draft status indicator */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Draft saved
              </span>

              {/* Preview evaluation button */}
              <button
                type="button"
                onClick={handlePreview}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                {previewActive ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                    <span className="text-emerald-700">Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-slate-600 fill-slate-600" />
                    Preview evaluation
                  </>
                )}
              </button>

              {/* Submit for review button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#623f99] to-[#9a3f91] hover:from-[#533089] hover:to-[#86307e] shadow-md shadow-purple-900/15 transition-all cursor-pointer"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    Submitted to Review!
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3 text-white/90" />
                    Submit for review
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Studio Body: Left Sidebar + Right Main Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* ── Left Sidebar: Rule Set (Col 1-4) ── */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-slate-50/50 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                    RULE SET · 06 RULES
                  </span>
                  <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                    Sequential Mode
                  </span>
                </div>

                <div className="space-y-2.5">
                  {RULES_DATA.map((rule) => {
                    const isSelected = rule.num === "03";
                    return (
                      <div
                        key={rule.num}
                        className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between select-none transform-none transition-none ${
                          isSelected
                            ? "bg-white border-2 border-[#7c3aed] shadow-md shadow-purple-900/5 text-slate-900 ring-2 ring-purple-100 cursor-default"
                            : "bg-white/60 border-2 border-slate-200/70 text-slate-700 cursor-default"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center ${
                              isSelected
                                ? "bg-purple-600 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {rule.num}
                          </span>
                          <div>
                            <p className="text-sm font-bold tracking-tight text-slate-900">
                              {rule.name}
                            </p>
                            <span
                              className={`text-[11px] font-semibold tracking-wide ${
                                rule.status === "Active"
                                  ? "text-emerald-600"
                                  : rule.status === "Editing"
                                  ? "text-purple-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {rule.status}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar bottom info pill */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 text-xs text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  Dual-Control Audited
                </span>
                <span className="font-mono text-[11px] text-slate-400 font-semibold">
                  v2.4
                </span>
              </div>
            </div>

            {/* ── Right Main Canvas: Rule Builder Panel (Col 5-12) ── */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                {/* Rule Meta Row: Partner / Product / Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                      Partner
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-800">
                      {currentRule.partner}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                      Product
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-800">
                      {currentRule.product}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                      Priority
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-bold text-slate-800">
                      {currentRule.priority}
                    </div>
                  </div>
                </div>

                {/* Mode Tabs + Add Condition */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-6">
                  <div className="flex items-center gap-6">
                    {TABS.map((tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`text-xs font-bold tracking-tight pb-2 -mb-2 border-b-2 transition-all cursor-pointer ${
                            isActive
                              ? "border-[#7c3aed] text-[#7c3aed]"
                              : "border-transparent text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#7c3aed] hover:text-[#623f99] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add condition
                  </button>
                </div>

                {/* IF Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#7c3aed] text-white text-xs font-extrabold tracking-wide uppercase shadow-2xs">
                    IF
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    All of the following conditions are true
                  </span>
                </div>

                {/* Condition Rows List */}
                <div className="space-y-3 mb-6">
                  {currentRule.conditions.map((cond) => (
                    <div
                      key={cond.num}
                      className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50/90 hover:border-purple-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Drag Handle */}
                        <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors shrink-0" />

                        {/* Condition number */}
                        <span className="w-6 h-6 rounded-full bg-slate-200/80 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {cond.num}
                        </span>

                        {/* Condition fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 flex-1 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              VARIABLE
                            </span>
                            <span className="font-bold text-slate-900 tracking-tight">
                              {cond.variable}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              OPERATOR
                            </span>
                            <span className="font-medium text-slate-600">
                              {cond.operator}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              VALUE
                            </span>
                            <span className="font-semibold text-slate-900">
                              {cond.value}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tag & Menu */}
                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            cond.type === "Mandatory"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-purple-50 text-[#7c3aed] border border-purple-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              cond.type === "Mandatory"
                                ? "bg-emerald-500"
                                : "bg-[#7c3aed]"
                            }`}
                          />
                          {cond.type}
                        </span>
                        <button
                          type="button"
                          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* THEN Action Row */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-extrabold tracking-wide uppercase">
                      THEN
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">
                        ACTION
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {currentRule.thenAction}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0" />
                </div>

                {/* ELSE Action Row */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-amber-600 text-white text-xs font-extrabold tracking-wide uppercase">
                      ELSE
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                        EXCEPTION OUTCOME
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {currentRule.elseAction}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300 text-xs font-bold self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    {currentRule.elseTarget}
                  </span>
                </div>
              </div>

              {/* Bottom Disclaimer Footnote */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-normal italic">
                  Pictorial configuration shown for demonstration only. Thresholds depend on institutional policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

