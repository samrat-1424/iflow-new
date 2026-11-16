"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Building2,
  CheckCircle2,
  Zap,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Check,
  Clock,
  Layers,
  Cpu,
  GitBranch,
} from "lucide-react";

export default function BookADemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    message: "",
    product: "LOS",
    consent: true,
  });

  const productOptions = [
    { value: "LOS", label: "Loan Origination (LOS)", short: "LOS" },
    { value: "LMS", label: "Loan Management (LMS)", short: "LMS" },
    { value: "CO_LENDING", label: "Co-lending", short: "Co-lending" },
    { value: "BICRI", label: "BICRI (Credit Risk)", short: "BICRI Risk" },
    { value: "MSME_AGRI", label: "MSME & Agri-Tech", short: "MSME & Agri" },
    { value: "BNPL", label: "BNPL Product Suite", short: "BNPL" },
    { value: "DISTRIBUTION", label: "Distribution Solution", short: "Distribution" },
    { value: "COLLECTIONS", label: "Collections Management", short: "Collections" },
    { value: "API_SERVICES", label: "API Services", short: "API Gateway" },
    { value: "FRAUD_MGMT", label: "Fraud Management", short: "Fraud Mgmt" },
    { value: "AIML", label: "AI Intelligent Suite", short: "AI Suite" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleProductSelect(value: string) {
    setForm((prev) => ({ ...prev, product: value }));
    setIsDropdownOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.product) {
      alert("Please select a product");
      return;
    }
    setLoading(true);

    try {
      const productLabel =
        productOptions.find((opt) => opt.value === form.product)?.label || form.product;
      const rawBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";
      const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

      // 1. Send the email directly from the frontend
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          company: form.company,
          product: productLabel,
          message: form.message,
        }),
      });

      // 2. Save data to backend / Strapi with graceful fallback
      try {
        await fetch(`${baseUrl}/queries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              full_name: form.name,
              mobile: form.mobile,
              email: form.email,
              subject: `Product: ${productLabel} | Company: ${form.company}`,
              message: form.message,
            },
          }),
        });
      } catch (strapiErr) {
        console.warn("Strapi log:", strapiErr);
      }

      setSubmitted(true);
      setForm({
        name: "",
        mobile: "",
        email: "",
        company: "",
        message: "",
        product: "LOS",
        consent: true,
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  const selectedProductObj = productOptions.find((opt) => opt.value === form.product);

  // Submitted Success View
  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white border-2 border-purple-200/90 shadow-2xl shadow-purple-950/20 p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#623f99] via-[#9a3f91] to-[#623f99]" />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#623f99] to-[#9a3f91] text-white shadow-lg shadow-purple-900/30">
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#623f99] text-xs font-bold uppercase tracking-wider mb-3 border border-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-[#9a3f91]" />
          Form Submitted Successfully
        </span>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] tracking-tight">
          Thank you! We&apos;ve Received Your Request
        </h2>

        <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Our lending solutions team has received your inquiry. We will walk you through the platform
          and answer questions specific to your lending setup.
        </p>

        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-purple-50 via-fuchsia-50/40 to-indigo-50 border border-purple-200/80 max-w-sm mx-auto text-xs text-slate-700 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-[#623f99]">
            <Clock className="w-3.5 h-3.5 text-[#9a3f91]" />
            <span>Response Time: Typically within 2 hours</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            A confirmation email has been dispatched to your email.
          </p>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white font-semibold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/20 border-2 border-purple-200/80 bg-white grid grid-cols-1 lg:grid-cols-12 transition-all">
      {/* =====================================================================
          LEFT HERO PANEL: Colorful Website Theme Gradient (Compact & One-Screen)
      ===================================================================== */}
      <div className="lg:col-span-5 bg-gradient-to-br from-[#623f99] via-[#7b3c95] to-[#9a3f91] p-5 sm:p-7 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Atmospheric Blur Orbs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-fuchsia-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-bold uppercase tracking-wider text-purple-100 mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 text-purple-200" />
            <span>Product &amp; Sales Demo</span>
          </div>

          {/* Main Title */}
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight leading-tight text-white mb-2 sm:mb-3">
            Step into the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white">
              Future of Lending
            </span>
          </h2>

          <p className="text-purple-100 text-xs sm:text-[13px] leading-relaxed mb-4 sm:mb-5 font-normal">
            Have questions? Want to see how iFLOW works before you commit? Book a quick product demo
            with our team. We&apos;ll walk you through the platform and answer questions specific to
            your lending setup.
          </p>

          {/* Colorful Highlight Feature Chips */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white shrink-0">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Rapid Origination (LOS)</p>
                <p className="text-[10px] text-purple-100">Paperless sanction</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white shrink-0">
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">AI Underwriting (BICRI)</p>
                <p className="text-[10px] text-purple-100">Algorithmic risk &amp; policy rules</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white shrink-0">
                <GitBranch className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Co-Lending &amp; Collections</p>
                <p className="text-[10px] text-purple-100">RBI CLM Model 1 &amp; 2 compliant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Contact */}
        <div className="relative z-10 pt-3 border-t border-white/20 flex flex-col gap-1 text-[11px]">
         
          <div className="flex items-center gap-2 text-purple-200 text-[11px]">
            <span>Helpline:</span>
            <a href="tel:+918793001310" className="text-white font-bold hover:underline">
              +91-87930-01310
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================================
          RIGHT FORM PANEL: Compact, Fit in One Screen & High Conversion
      ===================================================================== */}
      <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7 bg-white flex flex-col justify-between">
        <div>
          {/* Form Header */}
          <div className="mb-3.5">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9a3f91] mb-0.5">
              HAVE QUESTIONS? OR LOOKING FOR PRODUCT &amp; SALES DEMO
            </p>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] tracking-tight">
              Send us a Message
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Row 1: Full Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Full Name <span className="text-[#9a3f91]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-purple-400">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg pl-9 pr-3 py-1.5 sm:py-2 text-xs bg-[#FAF8FF] border border-purple-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9a3f91]/25 focus:border-[#623f99] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Mobile <span className="text-[#9a3f91]">*</span>
                </label>
                <div className="relative flex rounded-lg border border-purple-200 bg-[#FAF8FF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#9a3f91]/25 focus-within:border-[#623f99] transition-all">
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 text-xs font-medium text-purple-700 border-r border-purple-200 select-none">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile number"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="w-full rounded-r-lg px-2.5 py-1.5 sm:py-2 text-xs bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Email <span className="text-[#9a3f91]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-purple-400">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg pl-9 pr-3 py-1.5 sm:py-2 text-xs bg-[#FAF8FF] border border-purple-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9a3f91]/25 focus:border-[#623f99] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Company
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-purple-400">
                    <Building2 className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Enter Company Name"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full rounded-lg pl-9 pr-3 py-1.5 sm:py-2 text-xs bg-[#FAF8FF] border border-purple-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9a3f91]/25 focus:border-[#623f99] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Product Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Product <span className="text-[#9a3f91]">*</span>
              </label>

              {/* Quick Compact Chips */}
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {productOptions.slice(0, 6).map((opt) => {
                  const isSelected = form.product === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => setForm((prev) => ({ ...prev, product: opt.value }))}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
                        isSelected
                          ? "bg-gradient-to-r from-[#623f99] to-[#9a3f91] text-white shadow-sm font-semibold"
                          : "bg-purple-50 text-slate-700 border border-purple-200 hover:bg-purple-100/70"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      <span>{opt.short}</span>
                    </button>
                  );
                })}
              </div>

              {/* Compact Dropdown */}
              <div ref={dropdownRef} className="relative">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full rounded-lg px-3 py-1.5 bg-[#FAF8FF] hover:bg-purple-50/50 border border-purple-200 text-slate-800 text-xs cursor-pointer flex justify-between items-center transition-all"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Layers className="w-3.5 h-3.5 text-[#623f99]" />
                    <span className="font-medium text-slate-900 truncate">
                      {selectedProductObj ? selectedProductObj.label : "Select product"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#623f99] transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl border border-purple-200 max-h-48 overflow-y-auto py-1">
                    {productOptions.map((option) => (
                      <div
                        key={option.value}
                        onClick={() => handleProductSelect(option.value)}
                        className={`px-3 py-1.5 cursor-pointer text-xs flex items-center justify-between transition-colors ${
                          form.product === option.value
                            ? "bg-purple-50 text-[#623f99] font-bold"
                            : "text-slate-700 hover:bg-purple-50/80 hover:text-[#623f99]"
                        }`}
                      >
                        <span>{option.label}</span>
                        {form.product === option.value && (
                          <Check className="w-3.5 h-3.5 text-[#623f99]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Describe your project"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg p-2.5 text-xs bg-[#FAF8FF] border border-purple-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9a3f91]/25 focus:border-[#623f99] transition-all"
                rows={2}
              />
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2 pt-0.5">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                required
                className="mt-0.5 h-3.5 w-3.5 rounded border-purple-300 text-[#623f99] focus:ring-[#623f99] cursor-pointer accent-[#623f99] shrink-0"
              />
              <label
                htmlFor="consent"
                className="text-[10px] sm:text-[11px] text-slate-500 cursor-pointer select-none leading-snug"
              >
                By Submitting this form, I agree to receive marketing calls, emails, RCS, SMS and
                WhatsApp messages from iFLOW and its affiliates.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
                loading
                  ? "bg-purple-300 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-[#623f99] via-[#853da1] to-[#9a3f91] text-white shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-900/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
