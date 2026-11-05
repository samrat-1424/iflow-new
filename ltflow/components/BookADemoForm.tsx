"use client";
import { useState, useRef, useEffect } from "react";

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
    product: "",
    consent: false,
  });

  const productOptions = [
    { value: "LOS", label: "Loan Origination (LOS)" },
    { value: "LMS", label: "Loan Management (LMS)" },
    { value: "CO_LENDING", label: "Co-lending" },
    { value: "BICRI", label: "BICRI (Credit Risk Assessment)" },
    { value: "BNPL", label: "BNPL Product Suite" },
    { value: "MSME_AGRI", label: "MSME & Agri-Tech" },
    { value: "DISTRIBUTION", label: "Distribution Solution" },
    { value: "COLLECTIONS", label: "Collections Management" },
    { value: "API_SERVICES", label: "API Services" },
    { value: "FRAUD_MGMT", label: "Fraud Management" },
    { value: "AIML", label: "AI Intelligent Suite" },
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
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleProductSelect(value: string) {
    setForm({ ...form, product: value });
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
      const productLabel = productOptions.find((opt) => opt.value === form.product)?.label || form.product;
      const rawBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";
      const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
      
      // 1. Send the email directly from the frontend
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          company: form.company,
          product: productLabel,
          message: form.message,
        }),
      });

      // 2. Save the data to the Strapi server
      const res = await fetch(`${baseUrl}/queries`, {
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

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.error?.message || errorData.error || `Error: ${res.status}`;
        throw new Error(typeof errorMessage === "object" ? JSON.stringify(errorMessage) : errorMessage);
      }
      setSubmitted(true);
      setForm({
        name: "",
        mobile: "",
        email: "",
        company: "",
        message: "",
        product: "",
        consent: false,
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-green-400 text-center font-semibold py-10 text-lg  rounded-t-3xl">
        Form Submitted. Thanks.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#623f99] to-[#9a3f91] rounded-t-3xl w-full max-w-3xl p-8 shadow-lg mx-auto">
      <p className="text-gray-300 mb-1">Have Questions? or Looking for Product & Sales Demo</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Send us a Message</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-white font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded px-3 py-2 bg-white text-gray-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-white font-semibold mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile number"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full rounded px-3 py-2 bg-white text-gray-900 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-white font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded px-3 py-2 bg-white text-gray-900 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-white font-semibold mb-1">Company</label>
            <input
              type="text"
              name="company"
              placeholder="Enter Company Name"
              value={form.company}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 bg-white text-gray-900 focus:outline-none"
            />
          </div>
        </div>
         <div ref={dropdownRef} className="relative">
          <label className="block text-white font-semibold mb-1">Product</label>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full rounded px-3 py-2 bg-white text-gray-900 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors border-2 border-transparent hover:border-purple-200"
          >
            <span className={form.product ? "text-gray-900" : "text-gray-500"}>
              {form.product 
                ? productOptions.find(opt => opt.value === form.product)?.label 
                : "Select product"}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded shadow-lg max-h-60 overflow-auto">
              {productOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleProductSelect(option.value)}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                    form.product === option.value 
                      ? 'bg-[#623f99] text-white' 
                      : 'bg-white text-gray-900 hover:bg-[#623f99] hover:text-white'
                  }`} 
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-white font-semibold mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Describe your project"
            value={form.message}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 bg-white text-gray-900 focus:outline-none"
            rows={4}
          />
        </div>
       
        <div className="flex items-start gap-2.5 pt-2">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#623f99] focus:ring-[#623f99] cursor-pointer accent-[#623f99] shrink-0"
          />
          <label htmlFor="consent" className="text-xs sm:text-sm text-gray-200 cursor-pointer select-none leading-relaxed">
            By Submitting this form, I agree to receive marketing calls, emails, RCS, SMS and WhatsApp messages from iFLOW and its affiliates.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`font-semibold px-8 py-2 rounded mt-2 transition ${
            loading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#623f99] text-white hover:bg-[#7a4fb3]"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
