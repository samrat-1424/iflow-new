import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadyToTransformSection from "@/components/ReadyToTransformSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iflow.co.in"),
  title: {
    default: "Digital Lending Platform for Banks & NBFCs | Iflow",
    template: "%s",
  },
  description:
    "Iflow is a digital lending platform built for Banks, NBFCs, and fintech companies. Automate your loan lifecycle, improve credit decisions, and scale faster with our end-to-end lending solutions.",
  keywords: ["digital lending", "SaaS lending", "fintech infrastructure", "NBFC software", "banking tech", "credit decisioning", "loan lifecycle management"],
  authors: [{ name: "iFLOW" }],
  creator: "iFLOW",
  publisher: "iFLOW",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "iFLOW | Seamless Digital Lending Infrastructure",
    description: "Empowering Banks & NBFCs with AI-powered digital lending tech.",
    url: "https://iflow.co.in",
    siteName: "iFLOW",
    images: [
      {
        url: "/og-image.png", // Make sure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "iFLOW - Digital Lending Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iFLOW | Seamless Digital Lending Infrastructure",
    description: "Empowering Banks & NBFCs with AI-powered digital lending tech.",
    images: ["/og-image.png"],
    creator: "@loantapin",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YY7GRht0SWZVi_bPv1itv94rfDsiMqqpuKPUqo5f5z0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://iflow.co.in/#organization",
                  "name": "iFLOW",
                  "url": "https://iflow.co.in",
                  "logo": "https://iflow.co.in/hero/logo.png",
                  "sameAs": [
                    "https://www.linkedin.com/company/iflow/",
                    "https://www.instagram.com/iflow.co.in?stkn=NmN2MzZoamFoZXFp"
                  ],
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+91-87930-01310",
                      "contactType": "customer service",
                      "email": "aakash.yajnik@loantap.in"
                    }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://iflow.co.in/#website",
                  "url": "https://iflow.co.in",
                  "name": "iFLOW",
                  "publisher": { "@id": "https://iflow.co.in/#organization" }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4ERNVL6W7W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4ERNVL6W7W');
          `}
        </Script>
        <Navbar />
        {children}
        <ReadyToTransformSection />
        <Footer />
      </body>
    </html>
  );
}
