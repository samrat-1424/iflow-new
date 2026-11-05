import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  const year = new Date().getFullYear();   //this line means i created a constant variable named year and assigned it the value of the current year using the JavaScript Date object. This allows me to dynamically display the current year in the footer, ensuring that it remains up-to-date without needing manual changes each year. By using this variable in the JSX code, I can easily show the current year in the copyright notice or any other relevant section of the footer.
  //const month = new Date().getMonth();   //this line means i created a constant variable named year and assigned it the value of the current year using the JavaScript Date object. This allows me to dynamically display the current year in the footer, ensuring that it remains up-to-date without needing manual changes each year. By using this variable in the JSX code, I can easily show the current year in the copyright notice or any other relevant section of the footer.

  return (
    <footer className="w-full bg-black text-white ">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Address */}
          <div>
            <h3 className="text-base font-semibold">Address</h3>
            <div className="mt-3 h-px w-40 bg-white/40" />

            <div className="mt-5 space-y-6 text-sm text-white/85">
              <div>
                <p className="font-semibold text-white">Registered Office:</p>
                <p className="mt-1">
                  306, Sangeeta Ramchand (Kartik) CHSL New Link Road 5 Kartik Complex, Opp Laxmi Ind Estate Andheri (W)
                  <br />
                  Mumbai, Maharashtra, India - 400053
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Corporate Office:</p>
                <p className="mt-1">
                  Office No. 103, 1st Floor, Hermes Waves,
                  <br />
                  Kalyani Nagar, Pune, Maharashtra, India, 411006
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">CIN:</p>
                <p className="mt-1">U62091MH2026PTC467672</p>

                <p className="mt-1"></p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold">Contact Us</h3>
            <div className="mt-3 h-px w-40 bg-white/40" />

            <div className="mt-5 space-y-3 text-sm text-white/85">
              <p className="font-semibold text-white">
                IFLOW FINANCIAL TECHNOLOGIES PRIVATE LIMITED
              </p>
              <a
                href="tel:+918793001310"
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <MdPhone className="text-base" />
                <span>+91 87930-01310</span>
              </a>
              <a
                href="mailto:info@iflow.co.in"
                className="flex items-center gap-2 hover:text-white"
              >
                <MdEmail className="text-base" />
                <span>info@iflow.co.in</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/iflow/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-white/35 flex items-center justify-center hover:border-white"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
              <a
                href="https://www.instagram.com/iflow.co.in?stkn=NmN2MzZoamFoZXFp"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-white/35 flex items-center justify-center hover:border-white"
              >
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold">Company</h3>
            <div className="mt-3 h-px w-40 bg-white/40" />

            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white">
                  Our Solutions
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/book-a-demo" className="hover:text-white">
                  Book a Demo
                </Link>
              </li>
              <li>
                <Link href="/sitemap.html" className="hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>

            {/* Legal */}
            <h3 className="text-base font-semibold mt-10">Legal</h3>
            <div className="mt-3 h-px w-40 bg-white/40" />

            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/grievance-redressal" className="hover:text-white">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-base font-semibold">Services</h3>
            <div className="mt-3 h-px w-40 bg-white/40" />

            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li>
                <Link href="/solutions/loan-origination-los" className="hover:text-white">
                  Loan Origination System (LOS)
                </Link>
              </li>
              <li>
                <Link href="/solutions/loan-management-lms" className="hover:text-white">
                  Loan Management System (LMS)
                </Link>
              </li>
              <li>
                <Link href="/solutions/co-lending" className="hover:text-white">
                  Co-Lending Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/ai-intelligent-suite" className="hover:text-white">
                  AI Intelligent Suite
                </Link>
              </li>
              <li>
                <Link href="/solutions/bicri" className="hover:text-white">
                  BiCri (Business Indicator for Credit Rating)
                </Link>
              </li>
            </ul>

            {/* Resources - Moved below Services */}
            <h3 className="text-base font-semibold mt-10">Resources</h3>
            <div className="mt-3 h-px w-40 bg-white/40" />

            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li>
                <Link href="/resources/Retail" className="hover:text-white">
                  Retail Resources
                </Link>
              </li>
              <li>
                <Link href="/resources/wholesale" className="hover:text-white">
                  Wholesale Resources
                </Link>
              </li>
              <li>
                <Link href="/resources/agriculture" className="hover:text-white">
                  Agriculture Resources
                </Link>
              </li>
              <li>
                <Link href="/resources/msme" className="hover:text-white">
                  MSME Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Certification Section */}
        <div className="mt-12 mb-8 flex justify-center lg:hidden">
          <div className="relative w-full max-w-[320px] h-20">
            <Image
              src="/hero/certification.png"
              alt="Certification"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 text-center text-sm text-white/70">
          {/* Desktop Certification */}
          <div className="hidden lg:flex justify-center mb-8">
            <div className="relative w-full max-w-[400px] h-24">
              <Image
                src="/hero/certification.png"
                alt="Certification"
                fill
                className="object-contain"
              />
            </div>
          </div>
          © {year}. All Rights Reserved by iFLOW
        </div>
      </div>
    </footer>
  );
}

