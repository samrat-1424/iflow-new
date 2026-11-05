"use client";

import React, { useState } from "react";
import { Lock, X, ArrowRight, CheckCircle2, Building2, Mail, User } from "lucide-react";

interface CaseStudyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudyTitle?: string;
  caseStudySlug?: string;
  onSuccess: () => void;
}

export default function CaseStudyAccessModal({
  isOpen,
  onClose,
  caseStudyTitle,
  caseStudySlug,
  onSuccess,
}: CaseStudyAccessModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

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

      // 3. Mark as unlocked in sessionStorage (resets on new browser session)
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

      // 4. Trigger success callback
      onSuccess();
    } catch (err: any) {
      console.error("Error submitting case study access form:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Purple Brand Gradient */}
        <div className="relative bg-gradient-to-r from-[#623f99] via-[#7d3b9e] to-[#9a3f91] px-6 pt-6 pb-5 text-white overflow-hidden">
          {/* Subtle Ambient Dots */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase text-purple-100 mb-3 border border-white/20">
            <Lock className="w-3.5 h-3.5" />
            <span>Unlock Full Story</span>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
            {caseStudyTitle ? caseStudyTitle : "Access Case Study"}
          </h3>
          <p className="mt-2 text-sm text-purple-100/90 leading-relaxed">
            Fill in your details below to continue and read the full case study.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          {/* Full Name */}
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#623f99]/30 focus:border-[#623f99] transition-all bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>

          {/* Work Email */}
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#623f99]/30 focus:border-[#623f99] transition-all bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>

          {/* Company Name */}
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#623f99]/30 focus:border-[#623f99] transition-all bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#623f99] to-[#9a3f91] hover:opacity-95 text-white font-medium py-3 px-6 rounded-xl shadow-md shadow-[#623f99]/20 transition-all duration-200 cursor-pointer text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Unlocking Content...</span>
                </>
              ) : (
                <>
                  <span>Continue to See Content</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Security & Privacy Reassurance */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>Instant access • Read the complete case study immediately</span>
          </div>
        </form>
      </div>
    </div>
  );
}
