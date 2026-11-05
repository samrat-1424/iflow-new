import {
  Handshake,
  Network,
  ClipboardCheck,
  CalendarClock,
  Gauge,
  ShoppingBag,
  Tractor,
  PhoneCall,
  Braces,
  BrainCircuit,
  Layers,
  Users,
  Cpu,
  LucideIcon,
} from "lucide-react";

export interface NavSolutionItem {
  slug: string;
  tag: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
}

export const NAV_SOLUTIONS: NavSolutionItem[] = [
  {
    slug: "co-lending",
    tag: "CO-LENDING",
    name: "Co-lending",
    blurb: "Connect partners, simplify collaboration, move capital with confidence.",
    icon: Handshake,
  },
  {
    slug: "distribution",
    tag: "DISTRIBUTION",
    name: "Distribution",
    blurb: "Optimize channel partner networks and smart loan distribution.",
    icon: Network,
  },
  {
    slug: "loan-origination-los",
    tag: "LOS",
    name: "Loan Origination System",
    blurb: "Onboarding, underwriting and disbursement, effortless.",
    icon: ClipboardCheck,
  },
  {
    slug: "loan-management-lms",
    tag: "LMS",
    name: "Loan Management System",
    blurb: "Manage the full loan lifecycle, servicing to settlement.",
    icon: CalendarClock,
  },
  {
    slug: "bicri",
    tag: "CREDIT RISK",
    name: "BICRI",
    blurb: "Deep analytics, credit intelligence and behavioral signals.",
    icon: Gauge,
  },
  {
    slug: "bnpl-product-suite",
    tag: "RETAIL CREDIT",
    name: "BNPL Product Suite",
    blurb: "Instant credit models and flexible BNPL checkouts at scale.",
    icon: ShoppingBag,
  },
  {
    slug: "msme-and-agri-tech-on-boarding-journeys",
    tag: "ONBOARDING",
    name: "MSME & Agri Onboarding",
    blurb: "Digitize rural, MSME and agri borrowing journeys.",
    icon: Tractor,
  },
  {
    slug: "collection",
    tag: "COLLECTIONS",
    name: "Collection",
    blurb: "Intelligence-driven recovery journeys and repayment routes.",
    icon: PhoneCall,
  },
  {
    slug: "on-boarding-journey",
    tag: "API SERVICES",
    name: "API Services",
    blurb: "KYC, bureau checks and verification via robust APIs.",
    icon: Braces,
  },
  {
    slug: "ai-intelligent-suite",
    tag: "AI INTELLIGENT SUITE",
    name: "AI Intelligent Suite",
    blurb: "Machine learning where it makes the biggest difference.",
    icon: BrainCircuit,
  },
  {
    slug: "ai-based-bre",
    tag: "RULES ENGINE",
    name: "AI Based BRE",
    blurb: "Intelligent decisioning, credit policy execution and dynamic rule automation.",
    icon: Cpu,
  },
  {
    slug: "pool-buyout",
    tag: "CAPITAL FLOW",
    name: "Pool Buyout",
    blurb: "Portfolio acquisition, risk assessment and capital transfer.",
    icon: Layers,
  },
  {
    slug: "dsa",
    tag: "DSA PLATFORM",
    name: "DSA Management",
    blurb: "Partner tracking and payout workflows for DSAs.",
    icon: Users,
  },
];

export interface SolutionGroup {
  label: string;
  slugs: string[];
}

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    label: "Origination",
    slugs: [
      "loan-origination-los",
      "msme-and-agri-tech-on-boarding-journeys",
      "on-boarding-journey",
    ],
  },
  {
    label: "Intelligence",
    slugs: ["bicri", "ai-intelligent-suite", "ai-based-bre", "pool-buyout"],
  },
  {
    label: "Servicing",
    slugs: ["loan-management-lms", "collection", "distribution"],
  },
  {
    label: "Growth",
    slugs: ["co-lending", "bnpl-product-suite", "dsa"],
  },
];

export function getSolutionBySlug(slug: string): NavSolutionItem | undefined {
  if (slug === "ai-ml-score-models") {
    return NAV_SOLUTIONS.find((s) => s.slug === "ai-intelligent-suite");
  }
  return NAV_SOLUTIONS.find((s) => s.slug === slug);
}

export const NAV_SOLUTIONS_COL1: NavSolutionItem[] = [
  NAV_SOLUTIONS.find((s) => s.slug === "co-lending")!,
  NAV_SOLUTIONS.find((s) => s.slug === "loan-origination-los")!,
  NAV_SOLUTIONS.find((s) => s.slug === "msme-and-agri-tech-on-boarding-journeys")!,
  NAV_SOLUTIONS.find((s) => s.slug === "on-boarding-journey")!,
  NAV_SOLUTIONS.find((s) => s.slug === "dsa")!,
].filter(Boolean);

export const NAV_SOLUTIONS_COL2: NavSolutionItem[] = [
  NAV_SOLUTIONS.find((s) => s.slug === "distribution")!,
  NAV_SOLUTIONS.find((s) => s.slug === "loan-management-lms")!,
  NAV_SOLUTIONS.find((s) => s.slug === "bnpl-product-suite")!,
  NAV_SOLUTIONS.find((s) => s.slug === "collection")!,
].filter(Boolean);

export const NAV_SOLUTIONS_COL3: NavSolutionItem[] = [
  NAV_SOLUTIONS.find((s) => s.slug === "ai-based-bre")!,
  NAV_SOLUTIONS.find((s) => s.slug === "ai-intelligent-suite")!,
  NAV_SOLUTIONS.find((s) => s.slug === "bicri")!,
  NAV_SOLUTIONS.find((s) => s.slug === "pool-buyout")!,
].filter(Boolean);


export interface NavCategory {
  title: string;
  items: NavSolutionItem[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    title: "Origination",
    items: [
      NAV_SOLUTIONS.find((s) => s.slug === "loan-origination-los"),
      NAV_SOLUTIONS.find((s) => s.slug === "msme-and-agri-tech-on-boarding-journeys"),
      NAV_SOLUTIONS.find((s) => s.slug === "on-boarding-journey"),
    ].filter((s): s is NavSolutionItem => Boolean(s)),
  },
  {
    title: "Intelligence",
    items: [
      NAV_SOLUTIONS.find((s) => s.slug === "ai-based-bre"),
      NAV_SOLUTIONS.find((s) => s.slug === "ai-intelligent-suite"),
      NAV_SOLUTIONS.find((s) => s.slug === "bicri"),
      NAV_SOLUTIONS.find((s) => s.slug === "pool-buyout"),
    ].filter((s): s is NavSolutionItem => Boolean(s)),
  },
  {
    title: "Servicing",
    items: [
      NAV_SOLUTIONS.find((s) => s.slug === "loan-management-lms"),
      NAV_SOLUTIONS.find((s) => s.slug === "collection"),
      NAV_SOLUTIONS.find((s) => s.slug === "distribution"),
    ].filter((s): s is NavSolutionItem => Boolean(s)),
  },
  {
    title: "Growth",
    items: [
      NAV_SOLUTIONS.find((s) => s.slug === "co-lending"),
      NAV_SOLUTIONS.find((s) => s.slug === "bnpl-product-suite"),
      NAV_SOLUTIONS.find((s) => s.slug === "dsa"),
    ].filter((s): s is NavSolutionItem => Boolean(s)),
  },
];
