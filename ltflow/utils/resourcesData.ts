import {
  ShoppingBag,
  ClipboardCheck,
  Gauge,
  PhoneCall,
  Tractor,
  BrainCircuit,
  CalendarClock,
  Handshake,
  Layers,
  Users,
  Network,
  LucideIcon,
} from "lucide-react";

export interface IndustrySolution {
  title: string;
  slug: string;
  blurb: string;
  icon: LucideIcon;
}

export interface ResourceIndustry {
  slug: string;
  navTitle: string;
  heroBreadcrumb: string;
  title: string;
  tagline: string;
  description: string;
  heroBgImage: string;
  challenges: string[];
  approachText: string;
  metrics: {
    value: string;
    label: string;
  }[];
  solutions: IndustrySolution[];
}

export const RESOURCE_INDUSTRIES: Record<string, ResourceIndustry> = {
  retail: {
    slug: "retail",
    navTitle: "Retail Credit & Personal Loans",
    heroBreadcrumb: "Retail",
    title: "Retail Credit & Personal Loans",
    tagline: "Instant, embedded and intelligent consumer credit.",
    description:
      "Retail lending is won at the speed of the customer journey. iFLOW powers instant credit models, BNPL checkouts and paperless personal loan journeys that approve in seconds and service at scale.",
    heroBgImage: "/hero/Retail.png",
    challenges: [
      "Customers expect instant decisions at checkout and in-app.",
      "Thin-file borrowers need scoring beyond bureau data.",
      "High volumes demand straight-through processing.",
      "Collections must stay intelligent and compliant at scale.",
    ],
    approachText:
      "iFLOW adapts one connected platform to the realities of retail credit & personal loans — the same data spine, the same compliance rigour, with journeys and products configured for how the segment actually borrows.",
    metrics: [
      { value: "4–8 weeks", label: "TYPICAL GO-LIVE" },
      { value: "150+", label: "PRE-BUILT CONNECTORS" },
      { value: "99.9%", label: "PLATFORM UPTIME" },
      { value: "30 days", label: "COMPLIANCE UPDATES" },
    ],
    solutions: [
      {
        title: "BNPL Product Suite",
        slug: "bnpl-product-suite",
        blurb:
          "Deploy instant credit models and flexible buy-now-pay-later checkouts at scale.",
        icon: ShoppingBag,
      },
      {
        title: "Loan Origination System",
        slug: "loan-origination-los",
        blurb:
          "Make onboarding, underwriting, and disbursement feel effortless.",
        icon: ClipboardCheck,
      },
      {
        title: "BICRI",
        slug: "bicri",
        blurb:
          "Unlock deep analytics, credit intelligence and behavioral signals.",
        icon: Gauge,
      },
      {
        title: "Collection",
        slug: "collection",
        blurb:
          "Intelligence-driven recovery journeys and automated customer repayment routes.",
        icon: PhoneCall,
      },
    ],
  },

  msme: {
    slug: "msme",
    navTitle: "MSME & Business Finance",
    heroBreadcrumb: "MSME",
    title: "MSME & Business Finance",
    tagline: "Working capital and business loans, underwritten with confidence.",
    description:
      "MSME lending combines high ticket sizes with complex documentation. iFLOW automates eligibility, cashflow assessment and monitoring for working capital and business loan products.",
    heroBgImage: "/hero/Msme.png",
    challenges: [
      "Complex documentation and cashflow-based underwriting.",
      "High-ticket loans demand rigorous credit assessment.",
      "Monitoring must track account health continuously.",
      "Products must launch fast as segments evolve.",
    ],
    approachText:
      "iFLOW adapts one connected platform to the realities of msme & business finance — the same data spine, the same compliance rigour, with journeys and products configured for how this segment actually borrows.",
    metrics: [
      { value: "4–8 weeks", label: "TYPICAL GO-LIVE" },
      { value: "150+", label: "PRE-BUILT CONNECTORS" },
      { value: "99.9%", label: "PLATFORM UPTIME" },
      { value: "30 days", label: "COMPLIANCE UPDATES" },
    ],
    solutions: [
      {
        title: "MSME & Agri Onboarding",
        slug: "msme-and-agri-tech-on-boarding-journeys",
        blurb:
          "Digitize rural, MSME and agri borrowing journeys with seamless workflows.",
        icon: Tractor,
      },
      {
        title: "Loan Origination System",
        slug: "loan-origination-los",
        blurb:
          "Make onboarding, underwriting, and disbursement feel effortless.",
        icon: ClipboardCheck,
      },
      {
        title: "AI Intelligent Suite",
        slug: "ai-intelligent-suite",
        blurb:
          "Put intelligent automation and machine learning to work where it makes the biggest difference.",
        icon: BrainCircuit,
      },
      {
        title: "Loan Management System",
        slug: "loan-management-lms",
        blurb:
          "Manage disbursements, repayments, and borrower records in one place.",
        icon: CalendarClock,
      },
    ],
  },

  agriculture: {
    slug: "agriculture",
    navTitle: "Agri-Tech & Rural Lending",
    heroBreadcrumb: "Agriculture",
    title: "Agri-Tech & Rural Lending",
    tagline: "Rural borrowing journeys, digitised from the field up.",
    description:
      "Rural and agri lending runs through field agents, irregular documentation and government-linked schemes. iFLOW digitises these journeys offline-first, with OCR document AI and vernacular-ready flows.",
    heroBgImage: "/hero/Agriculture.png",
    challenges: [
      "Paper-heavy documentation and sparse formal bureau footprints.",
      "Seasonal cashflows requiring flexible repayment structures.",
      "Field verification and remote geo-tagging bottlenecks.",
      "Government scheme alignment and priority sector lending compliance.",
    ],
    approachText:
      "iFLOW adapts one connected platform to the realities of rural & agriculture lending — the same data spine, the same compliance rigour, with journeys and products configured for how this segment actually borrows.",
    metrics: [
      { value: "4–8 weeks", label: "TYPICAL GO-LIVE" },
      { value: "150+", label: "PRE-BUILT CONNECTORS" },
      { value: "99.9%", label: "PLATFORM UPTIME" },
      { value: "30 days", label: "COMPLIANCE UPDATES" },
    ],
    solutions: [
      {
        title: "MSME & Agri Onboarding",
        slug: "msme-and-agri-tech-on-boarding-journeys",
        blurb:
          "Digitize rural, MSME and agri borrowing journeys with offline-first capabilities.",
        icon: Tractor,
      },
      {
        title: "Loan Origination System",
        slug: "loan-origination-los",
        blurb:
          "Make onboarding, underwriting, and disbursement feel effortless.",
        icon: ClipboardCheck,
      },
      {
        title: "BICRI",
        slug: "bicri",
        blurb:
          "Credit risk intelligence evaluating alternate data signals and rural behavior.",
        icon: Gauge,
      },
      {
        title: "Collection",
        slug: "collection",
        blurb:
          "Intelligence-driven recovery journeys and flexible repayment routes.",
        icon: PhoneCall,
      },
    ],
  },

  wholesale: {
    slug: "wholesale",
    navTitle: "Wholesale & Corporate Co-Lending",
    heroBreadcrumb: "Wholesale",
    title: "Wholesale & Corporate Co-Lending",
    tagline: "Partner capital, pool acquisitions and large-structure lending.",
    description:
      "Wholesale lending moves capital between institutions — co-lending programs, pool buyouts and DSA networks. iFLOW automates the partner side of lending with the same rigour as the borrower side.",
    heroBgImage: "/hero/Wholesale.png",
    challenges: [
      "Multi-party reconciliation and institutional fund flow tracking.",
      "Complex portfolio risk analysis during pool acquisitions.",
      "Fragmented DSA networks and manual payout management.",
      "Evolving co-lending regulatory norms and reporting mandates.",
    ],
    approachText:
      "iFLOW adapts one connected platform to the realities of wholesale & corporate co-lending — the same data spine, the same compliance rigour, with journeys and products configured for how this segment actually borrows.",
    metrics: [
      { value: "4–8 weeks", label: "TYPICAL GO-LIVE" },
      { value: "150+", label: "PRE-BUILT CONNECTORS" },
      { value: "99.9%", label: "PLATFORM UPTIME" },
      { value: "30 days", label: "COMPLIANCE UPDATES" },
    ],
    solutions: [
      {
        title: "Co-lending",
        slug: "co-lending",
        blurb:
          "Connect partners, simplify collaboration, and move capital with confidence.",
        icon: Handshake,
      },
      {
        title: "Pool Buyout",
        slug: "pool-buyout",
        blurb:
          "Streamline portfolio acquisition, risk assessment, and capital transfer with precision.",
        icon: Layers,
      },
      {
        title: "DSA Management",
        slug: "dsa",
        blurb:
          "Empower direct selling agents with end-to-end partner tracking and payout workflows.",
        icon: Users,
      },
      {
        title: "Distribution",
        slug: "distribution",
        blurb:
          "Optimize channel partner networks and smart loan distribution operations.",
        icon: Network,
      },
    ],
  },
};

export const RESOURCE_NAV_ITEMS = [
  {
    title: "Retail Credit & Personal Loans",
    href: "/resources/retail",
    slug: "retail",
  },
  {
    title: "MSME & Business Finance",
    href: "/resources/msme",
    slug: "msme",
  },
  {
    title: "Agri-Tech & Rural Lending",
    href: "/resources/agriculture",
    slug: "agriculture",
  },
  {
    title: "Wholesale & Corporate Co-Lending",
    href: "/resources/wholesale",
    slug: "wholesale",
  },
];
