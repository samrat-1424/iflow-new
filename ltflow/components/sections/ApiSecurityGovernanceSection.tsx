"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Activity,
  Check,
} from "lucide-react";

interface ApiSecurityGovernanceSectionProps {
  data?: any;
}

export default function ApiSecurityGovernanceSection({
  data,
}: ApiSecurityGovernanceSectionProps) {
  // Dynamic extraction from Strapi or high-fidelity defaults from design
  const badge = data?.badge || "SECURITY & GOVERNANCE";
  const title = data?.title || "Build integrations with security and control in mind.";
  const description =
    data?.description ||
    "Security controls are designed to suit the integration, provider and institutional requirements without making one-size-fits-all claims.";

  const centerTitle = data?.center_title || "Secure by design";
  const centerSubtitle = data?.center_subtitle || "CONTROLLED API ACCESS";

  // Checkmark controls: can come from data.controls (Strapi repeatable component) or default 8 items
  const defaultControls = [
    "API authentication",
    "Secure credential management",
    "Encrypted transmission",
    "Request validation",
    "Access control",
    "Audit logs",
    "Usage visibility",
    "Consent-aware access",
  ];

  // If Strapi provided controls, extract titles, otherwise split default into 2 balanced columns
  const controlsList: string[] =
    Array.isArray(data?.controls) && data.controls.length > 0
      ? data.controls.map((c: any) => (typeof c === "string" ? c : c.title || c.label || "")).filter(Boolean)
      : defaultControls;

  // Split into 2 columns (4 in col 1, 4 in col 2 like the design)
  const half = Math.ceil(controlsList.length / 2);
  const col1 = controlsList.slice(0, half);
  const col2 = controlsList.slice(half);

  return (
    <section
      id="security-governance"
      aria-label="Security and Governance"
      className="relative py-20 sm:py-24 px-6 sm:px-8 lg:px-16 bg-white overflow-hidden border-b border-purple-100/70"
    >
      {/* Background ambient lighting matching Co-Lending / LOS theme */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-purple-100/35 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-[#9a3f91]/10 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Concentric Orbital Radar Architecture Graphic */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square flex items-center justify-center select-none">
              {/* Outer Ring */}
              <div
                className="absolute inset-[4%] rounded-full border border-purple-200/50 pointer-events-none"
                aria-hidden="true"
              />

              {/* Middle Ring (Dashed Orbital Path) */}
              <div
                className="absolute inset-[18%] rounded-full border border-dashed border-purple-300/70 pointer-events-none"
                aria-hidden="true"
              />

              {/* Inner Ring */}
              <div
                className="absolute inset-[32%] rounded-full border border-purple-200/60 pointer-events-none"
                aria-hidden="true"
              />

              {/* Decorative Orbital Accent Dots */}
              <div
                className="absolute top-[23%] right-[27%] w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-[27%] right-[25%] w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]"
                aria-hidden="true"
              />
              <div
                className="absolute top-[49%] left-[17.5%] w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]"
                aria-hidden="true"
              />

              {/* Orbiting Satellite Node 1: Top-Left (Authentication) */}
              <div className="absolute top-[8%] left-[2%] sm:top-[11%] sm:left-[4%] z-30">
                <div className="bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 border border-purple-100 shadow-[0_10px_25px_rgba(27,16,50,0.08)] flex items-center gap-2.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#7c3aed] flex-shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                    Authentication
                  </span>
                </div>
              </div>

              {/* Orbiting Satellite Node 2: Bottom-Left (Role permissions) */}
              <div className="absolute bottom-[8%] left-[6%] sm:bottom-[11%] sm:left-[8%] z-30">
                <div className="bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 border border-purple-100 shadow-[0_10px_25px_rgba(27,16,50,0.08)] flex items-center gap-2.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#7c3aed] flex-shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                    Role permissions
                  </span>
                </div>
              </div>

              {/* Orbiting Satellite Node 3: Right (Audit visibility) */}
              <div className="absolute top-[48%] -translate-y-1/2 -right-6 sm:-right-10 lg:-right-14 z-30">
                <div className="bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 border border-purple-100 shadow-[0_10px_25px_rgba(27,16,50,0.08)] flex items-center gap-2.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[#7c3aed] flex-shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                    Audit visibility
                  </span>
                </div>
              </div>

              {/* Central Core Card: Secure by design */}
              <div className="relative z-20 w-44 sm:w-48 py-6 px-4 rounded-3xl bg-gradient-to-b from-[#1c0f33] via-[#140929] to-[#0c041a] border border-purple-500/20 shadow-[0_22px_50px_rgba(27,16,50,0.4),0_0_25px_rgba(124,58,237,0.18)] flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.03]">
                {/* Shield Check Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/15 shadow-inner">
                  <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.2} />
                </div>

                {/* Card Title */}
                <h4 className="text-white font-bold text-base sm:text-[17px] tracking-tight leading-tight">
                  {centerTitle}
                </h4>

                {/* Subtitle Badge */}
                <span className="text-[10px] sm:text-[11px] font-semibold text-purple-200/75 tracking-wider uppercase mt-1">
                  {centerSubtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Eyebrow Badge, Title, Description, Checkmark Grid & Metric Badge */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Standard Co-Lending / LOS Eyebrow Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9a3f91] text-xs font-bold tracking-widest uppercase mb-4 border border-purple-200/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9a3f91]" />
                {badge}
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
              {title}
            </h2>

            {/* Description Subtitle */}
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl mb-7">
              {description}
            </p>

            {/* 2-Column Checkmark Controls Grid matching LOS / Co-Lending check design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 max-w-xl mb-6">
              {/* Column 1 */}
              <div className="space-y-3">
                {col1.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 group">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-emerald-200">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-3">
                {col2.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 group">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-emerald-200">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Standard Metric Tag Box (LOS Pattern) */}
            <div className="pt-2 flex items-center gap-4">
              <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7c3aed] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    Security Standard
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    SOC-2 &amp; ISO 27001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
