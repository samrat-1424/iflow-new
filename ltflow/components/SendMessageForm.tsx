"use client";
import React, { useState } from "react";

interface Props {
  compact?: boolean;
}

export default function SendMessageForm({ compact }: Props) {
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);

      setFormData({
        full_name: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `p-${
    compact ? "2" : "3"
  } rounded bg-white text-black w-full`;

  return (
    <>
      <div className="w-[70%] mx-auto">
        <div className="relative w-full">
          {showPopup && (
            <div className="absolute top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity animate-fadeIn">
              ✅ Message sent successfully!
            </div>
          )}
        </div>

        <p className="text-[#9ba3c1] text-sm">
          Have Questions? or Looking for Product & Sales Demo
        </p>

        <h2 className="text-xl font-semibold text-white mt-1 mb-4">
          Send us a Message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="full_name"
                className="block mb-1 font-medium text-white text-sm"
              >
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                placeholder="Full name"
                value={formData.full_name}
                onChange={handleChange}
                className={`${inputClasses} text-sm`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block mb-1 font-medium text-white text-sm"
              >
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only digits and limit to 10
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
                className={`${inputClasses} text-sm`}
                inputMode="numeric"
                pattern="\d{10}"
                maxLength={10}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-white text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} text-sm`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-1 font-medium text-white text-sm"
              >
                Company
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="Enter Company Name"
                value={formData.subject}
                onChange={handleChange}
                className={`${inputClasses} text-sm`}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-1 font-medium text-white text-sm"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Describe your project"
              value={formData.message}
              onChange={handleChange}
              rows={compact ? 3 : 4}
              className={`${inputClasses} text-sm`}
              required
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="send_message_consent"
              name="consent"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500 cursor-pointer accent-sky-500 shrink-0"
            />
            <label htmlFor="send_message_consent" className="text-xs text-gray-200 cursor-pointer select-none leading-relaxed">
              By Submitting this form, I agree to receive marketing calls, emails, RCS, SMS and WhatsApp messages from iFLOW and its affiliates.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer px-5 py-1.5 rounded text-white font-medium text-sm ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
