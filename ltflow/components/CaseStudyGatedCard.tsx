"use client";

import React, { useState } from "react";
import { Lock, ArrowRight, CheckCircle2, Building2, Mail, User, ShieldCheck } from "lucide-react";

interface CaseStudyGatedCardProps {
  caseStudyTitle: string;
  caseStudySlug: string;
  onUnlock: () => void;
}

export default function CaseStudyGatedCard({
  caseStudyTitle,
  caseStudySlug,
  onUnlock,
}: CaseStudyGatedCardProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setError("Please fill in all details to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Send notification email to samratkumar1424@gmail.com and info@iflow.co.in
      await fetch("/api/case-study-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          caseStudyTitle: caseStudyTitle,
          caseStudySlug: caseStudySlug,
        }),
      });


      // 3. Mark unlocked in sessionStorage (resets on new browser session)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("iflow_case_study_unlocked", "true");
        sessionStorage.setItem(
          "iflow_case_study_lead",
          JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            company: form.company.trim(),
            date: new Date().toISOString(),
          })
        );
      }

      // 4. Trigger unlock state in UI
      onUnlock();
    } catch (err: any) {
      console.error("Error unlocking case study:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative my-8 sm:my-12">
      {/* Blurred background teaser simulation */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-purple-100 shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="max-w-xl mx-auto text-center">
          {/* Lock Icon Badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#623f99]/10 to-[#9a3f91]/10 border border-[#623f99]/20 text-[#623f99] mb-5 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>

          <span className="block text-xs font-mono font-semibold tracking-widest text-[#9a3f91] uppercase mb-2">
            EXCLUSIVE CONTENT
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0A2D5F] leading-tight mb-3">
            Unlock the Full Case Study
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
            Complete the form below to access in-depth technical blueprints, step-by-step implementation journeys, and quantitative business outcomes.
          </p>

          <form onSubmit={handleSubmit} className="text-left space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm px-4 py-2.5 rounded-xl">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#623f99]/30 focus:border-[#623f99] transition-all bg-gray-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Work Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#623f99]/30 focus:border-[#623f99] transition-all bg-gray-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Bank / NBFC / FinTech"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#623f99]/30 focus:border-[#623f99] transition-all bg-gray-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#623f99] to-[#9a3f91] hover:opacity-95 text-white font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-[#623f99]/20 transition-all duration-200 cursor-pointer text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Unlocking Full Story...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock & Continue to Content</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span>Instant access • Read the complete case study immediately</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
