"use client";

import React, { useState } from "react";
import { FaqCategory } from "@/services/faqService";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqProps {
  categories: FaqCategory[];
}

export default function Faq({ categories }: FaqProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | number | null>(
    categories.length > 0 ? categories[0].id : null
  );
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const activeCategory = categories.find((cat) => cat.id === activeCategoryId) || categories[0];

  const toggleFaq = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-gray-500">No FAQs available at this time.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      {/* Header Section */}
      <div className="pt-20 pb-10 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8f5ff] border border-[#eaddff] text-[#623f99] text-[11px] font-semibold uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#623f99]"></span>
          HELP CENTER
        </div>
        <h1 className="text-4xl md:text-[3.5rem] leading-tight font-bold text-[#0F172A] mb-6 tracking-tight">
          Frequently Asked <span className="text-[#9a3f91]">Questions</span>
        </h1>
        <p className="text-[#64748B] text-lg max-w-[800px] mx-auto leading-relaxed">
          Everything you need to know about iFLOW, our Enterprise FinTech Technology Platform built for Banks, NBFCs, FinTechs, and Financial Institutions.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-4 md:pb-20 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar - Browse Categories */}
        <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-[24px] shadow-sm p-4 md:p-6 sticky top-24">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              BROWSE CATEGORIES
            </h3>
            <ul className="space-y-1">
              {categories.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <li key={category.id}>
                    <button
                      onClick={() => {
                        setActiveCategoryId(category.id);
                        setOpenQuestionId(null);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-200 ${
                        isActive
                          ? "bg-[#F3E8FF] text-[#623f99] font-medium"
                          : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span>{category.title}</span>
                      <span
                        className={`text-xs w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                          isActive
                            ? "bg-[#623f99] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {category.faqs?.length || 0}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Content Area - FAQs */}
        <div className="flex-1">
          {activeCategory && (
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-[#0F172A]">
                  {activeCategory.title}
                </h2>
                <span className="bg-[#F3E8FF] text-[#623f99] text-sm font-medium px-3 py-1 rounded-full">
                  {activeCategory.faqs?.length || 0} questions
                </span>
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-4">
                {activeCategory.faqs?.length > 0 ? (
                  activeCategory.faqs.map((faq, index) => {
                    const isOpen = openQuestionId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-5 flex items-center justify-between focus:outline-none text-left"
                        >
                          <div className="flex items-center gap-4 pr-8">
                            {/* Number Circle */}
                            <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center text-sm font-medium flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-[17px] font-medium text-[#1E293B]">
                              {faq.question}
                            </span>
                          </div>
                          
                          <div className="flex-shrink-0 text-gray-400">
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </button>
                        
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "max-h-[1000px] opacity-100 pb-6 px-6"
                              : "max-h-0 opacity-0 px-6"
                          } overflow-hidden`}
                        >
                          <div className="pl-12">
                            <div
                              className="prose prose-sm md:prose-base prose-slate max-w-none text-gray-600"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-[20px] shadow-sm p-12 text-center border border-gray-100">
                    <p className="text-gray-500">No questions found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
