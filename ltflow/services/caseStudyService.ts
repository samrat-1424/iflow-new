// services/caseStudyService.ts
import { Solution } from "@/utils/Solution";
import { convertRichTextToMarkdown } from "./solutionsService";

export interface CaseStudy extends Solution {
  category?: string;
  category_badge?: string;
  subtitle?: string;
  tag?: string;
  metrics?: string;
  coming_soon?: boolean;
  display_location?: "both" | "only_detail" | "only_main";
}

const DEEP_POPULATE_PARAMS = [
  "populate[0]=banner",
  "populate[1]=sections",
  "populate[2]=sections.models",
  "populate[3]=sections.models.diagram",
  "populate[4]=sections.stats",
  "populate[5]=sections.image",
  "populate[6]=sections.cards",
  "populate[7]=sections.cards.icon",
  "populate[8]=sections.cards.image",
  "populate[9]=sections.left_features",
  "populate[10]=sections.right_features",
  "populate[11]=sections.items",
  "populate[12]=sections.items.icon",
  "populate[13]=sections.steps",
  "populate[14]=sections.steps.icon",
  "populate[15]=sections.companyLogo",
].join("&");

const mapSection = (section: any) => ({
  id: section.id,
  __component: section.__component,
  display_location: section.display_location || "both",
  badge: section.badge || "",
  title: section.title || "",
  subtitle: section.subtitle || "",
  description: section.description || "",
  layout: section.layout || "",
  companyName: section.companyName || "",
  companySubtitle: section.companySubtitle || "",
  businessChallenge: section.businessChallenge || "",
  iflowSolution: section.iflowSolution || "",
  businessImpact: section.businessImpact || "",
  quoteText: section.quoteText || "",
  quoteAuthor: section.quoteAuthor || "",
  stars: section.stars,
  companyLogo: section.companyLogo?.url || section.companyLogo?.data?.attributes?.url
    ? {
        url: section.companyLogo?.url || section.companyLogo?.data?.attributes?.url,
        alt: section.companyLogo?.alternativeText || section.companyLogo?.data?.attributes?.alternativeText || section.companyName,
      }
    : undefined,
  cards: Array.isArray(section.cards)
    ? section.cards.map((card: any) => ({
        id: card.id,
        title: card.title || "",
        subtitle: card.subtitle || "",
        description: card.description || "",
        metric: card.metric || "",
        button_text: card.button_text || "",
        link: card.link || "",
        highlight: card.highlight || false,
        icon: card.icon?.url || card.icon?.data?.attributes?.url
          ? {
              url: card.icon?.url || card.icon?.data?.attributes?.url,
              alt: card.icon?.alternativeText || card.icon?.data?.attributes?.alternativeText || card.title,
            }
          : undefined,
        image: card.image?.url || card.image?.data?.attributes?.url
          ? {
              url: card.image?.url || card.image?.data?.attributes?.url,
              alt: card.image?.alternativeText || card.image?.data?.attributes?.alternativeText || card.title,
            }
          : undefined,
      }))
    : [],
  stats: Array.isArray(section.stats)
    ? section.stats.map((stat: any) => ({
        id: stat.id,
        value: stat.value || "",
        label: stat.label || "",
        description: stat.description || "",
      }))
    : [],
  models: Array.isArray(section.models)
    ? section.models.map((model: any) => ({
        id: model.id,
        name: model.name || "",
        title: model.title || "",
        share: model.share || "",
        highlights: model.highlights || "",
        badge: model.badge || "",
        description: model.description || "",
        features: model.features ? convertRichTextToMarkdown(model.features) : "",
        leftFeatures: model.leftFeatures || "",
        rightFeatures: model.rightFeatures || "",
        diagram: model.diagram?.url || model.diagram?.data?.attributes?.url
          ? {
              url: model.diagram?.url || model.diagram?.data?.attributes?.url,
              alt: model.diagram?.alternativeText || model.diagram?.data?.attributes?.alternativeText || model.title,
            }
          : undefined,
      }))
    : [],
  features: section.features ? convertRichTextToMarkdown(section.features) : undefined,
  left_features: section.left_features || [],
  right_features: section.right_features || [],
  items: Array.isArray(section.items)
    ? section.items.map((item: any) => ({
        id: item.id,
        title: item.title || "",
        label: item.label || "",
        description: item.description || "",
        tag: item.tag || "",
        highlight: item.highlight || false,
        icon: item.icon?.url || item.icon?.data?.attributes?.url
          ? {
              url: item.icon?.url || item.icon?.data?.attributes?.url,
              alt: item.icon?.alternativeText || item.icon?.data?.attributes?.alternativeText || item.title || item.label,
            }
          : undefined,
      }))
    : [],
  steps: Array.isArray(section.steps)
    ? section.steps.map((step: any) => ({
        id: step.id,
        title: step.title || "",
        description: step.description || "",
        icon: step.icon?.url || step.icon?.data?.attributes?.url
          ? {
              url: step.icon?.url || step.icon?.data?.attributes?.url,
              alt: step.icon?.alternativeText || step.icon?.data?.attributes?.alternativeText || step.title,
            }
          : undefined,
      }))
    : [],
  image: section.image?.url || section.image?.data?.attributes?.url
    ? {
        url: section.image?.url || section.image?.data?.attributes?.url,
        alt: section.image?.alternativeText || section.image?.data?.attributes?.alternativeText || section.title,
      }
    : undefined,
});

export const DEFAULT_CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "How an NBFC scaled its lending without compromising credit quality",
    slug: "ai-credit",
    category: "AI & CREDIT",
    category_badge: "AI & CREDIT INTELLIGENCE",
    subtitle: "How iFLOW AI Scores brought multiple borrower data points together to enable faster, more consistent credit assessment.",
    tag: "iFLOW AI Scores",
    metrics: "• 78% Faster TAT • 75% Credit quality",
    coming_soon: false,
    author: "iFLOW Team",
    banner: { url: "", alt: "AI Credit Intelligence" },
    published_on: "2026-01-01T00:00:00.000Z",
    date: "2026-01-01T00:00:00.000Z",
    image: "",
    link: "/case-studies/ai-credit",
    full_content: "How iFLOW AI Scores brought multiple borrower data points together to enable faster, more consistent credit assessment.",
    sections: [
      {
        id: 101,
        __component: "solution.customer-success",
        badge: "AI & CREDIT INTELLIGENCE",
        title: "How an NBFC scaled its lending without compromising credit quality",
        description: "How iFLOW AI Scores brought multiple borrower data points together to enable faster, more consistent credit assessment.",
        companyName: "Leading NBFC Partner",
        companySubtitle: "Scaling Credit Intelligence",
        businessChallenge: "Legacy credit evaluation processes relied on manual data aggregation across multiple bureaus and banking statements, creating long turnaround times and inconsistent risk decisions.",
        iflowSolution: "Integrated iFLOW AI Intelligent Suite to pull real-time bureau data, GST, and banking insights into a single automated underwriting engine.",
        businessImpact: "Achieved 78% faster TAT while maintaining 75% higher credit consistency and zero compromise on risk controls.",
        quoteText: "iFLOW transformed our credit risk engine into an automated, high-velocity decisioning system.",
        quoteAuthor: "Head of Credit Risk, NBFC Partner",
        stars: 5,
        stats: [
          { id: 1, value: "78%", label: "Faster TAT", description: "Turnaround time reduced from days to minutes" },
          { id: 2, value: "75%", label: "Credit Quality", description: "Improved risk prediction accuracy" }
        ],
        cards: [],
        models: [],
        items: [],
        steps: []
      }
    ]
  },
  {
    id: 2,
    title: "Scaling Multi-Partner Co-Lending Through Digital Infrastructure",
    slug: "co-lending",
    category: "CO-LENDING",
    category_badge: "CO-LENDING",
    subtitle: "Managing multiple lending partners through a unified digital co-lending platform.",
    tag: "iFLOW Co-Lending Platform",
    coming_soon: true,
    author: "iFLOW Team",
    banner: { url: "", alt: "Co-Lending" },
    published_on: "2026-01-01T00:00:00.000Z",
    date: "2026-01-01T00:00:00.000Z",
    image: "",
    link: "/case-studies/co-lending",
    full_content: "Managing multiple lending partners through a unified digital co-lending platform.",
    sections: []
  },
  {
    id: 3,
    title: "Streamlining Loan Origination & Management Workflows",
    slug: "lending-operations",
    category: "LENDING OPERATIONS",
    category_badge: "LENDING OPERATIONS",
    subtitle: "Automating loan processing from application to disbursal with end-to-end operational efficiency.",
    tag: "iFLOW LOS & LMS",
    coming_soon: true,
    author: "iFLOW Team",
    banner: { url: "", alt: "Lending Operations" },
    published_on: "2026-01-01T00:00:00.000Z",
    date: "2026-01-01T00:00:00.000Z",
    image: "",
    link: "/case-studies/lending-operations",
    full_content: "Automating loan processing from application to disbursal with end-to-end operational efficiency.",
    sections: []
  },
  {
    id: 4,
    title: "Intelligent Debt Collection & Recovery Journeys",
    slug: "collections",
    category: "COLLECTIONS",
    category_badge: "COLLECTIONS",
    subtitle: "Empowering collection teams with automated borrower outreach and smart resolution tracking.",
    tag: "iFLOW Collection Engine",
    coming_soon: true,
    author: "iFLOW Team",
    banner: { url: "", alt: "Collections" },
    published_on: "2026-01-01T00:00:00.000Z",
    date: "2026-01-01T00:00:00.000Z",
    image: "",
    link: "/case-studies/collections",
    full_content: "Empowering collection teams with automated borrower outreach and smart resolution tracking.",
    sections: []
  },
  {
    id: 5,
    title: "Managing Multi-Channel DSA Operations & Payouts",
    slug: "dsa-distribution",
    category: "DSA & DISTRIBUTION",
    category_badge: "DSA & DISTRIBUTION",
    subtitle: "Enabling seamless direct selling agent onboarding, commission calculation and payout automation.",
    tag: "iFLOW DSA Suite",
    coming_soon: true,
    author: "iFLOW Team",
    banner: { url: "", alt: "DSA & Distribution" },
    published_on: "2026-01-01T00:00:00.000Z",
    date: "2026-01-01T00:00:00.000Z",
    image: "",
    link: "/case-studies/dsa-distribution",
    full_content: "Enabling seamless direct selling agent onboarding, commission calculation and payout automation.",
    sections: []
  },
  {
    id: 6,
    title: "Instant End-to-End Digital Disbursal Journeys",
    slug: "digital-lending",
    category: "DIGITAL LENDING",
    category_badge: "DIGITAL LENDING",
    subtitle: "Delivering frictionless digital lending experiences across retail and MSME borrower segments.",
    tag: "iFLOW Digital Lending",
    coming_soon: true,
    author: "iFLOW Team",
    banner: { url: "", alt: "Digital Lending" },
    published_on: "2026-01-01T00:00:00.000Z",
    date: "2026-01-01T00:00:00.000Z",
    image: "",
    link: "/case-studies/digital-lending",
    full_content: "Delivering frictionless digital lending experiences across retail and MSME borrower segments.",
    sections: []
  }
];

export const slugify = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const fetchCaseStudies = async ({ page = 1, pageSize = 10 } = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

  try {
    const finalUrl = `${baseUrl}/case-studies?pagination[pageSize]=100&${DEEP_POPULATE_PARAMS}`;

    const response = await fetch(finalUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch case studies: ${response.status} ${response.statusText}`);
      return {
        caseStudies: DEFAULT_CASE_STUDIES,
        pagination: { page: 1, pageSize: 10, total: DEFAULT_CASE_STUDIES.length, pageCount: 1 },
      };
    }

    const data = await response.json();

    const transformedCaseStudies: CaseStudy[] = (data.data || []).map((caseStudy: any) => {
      const attrs = caseStudy.attributes || caseStudy;
      const title = attrs.title || "";
      const generatedSlug = slugify(title);
      const slug = attrs.slug && attrs.slug.trim() !== "" ? attrs.slug : (generatedSlug || `case-study-${caseStudy.id}`);
      const bannerUrl = attrs.banner?.url || attrs.banner?.data?.attributes?.url || "";

      const sections = Array.isArray(attrs.sections)
        ? attrs.sections.map(mapSection)
        : [];

      return {
        id: caseStudy.id,
        title,
        subtitle: attrs.subtitle || attrs.description || "",
        category: attrs.category || "AI & CREDIT",
        category_badge: attrs.category_badge || attrs.category || "",
        tag: attrs.tag || "",
        metrics: attrs.metrics || "",
        coming_soon: typeof attrs.coming_soon === "boolean" ? attrs.coming_soon : false,
        display_location: attrs.display_location || "both",
        slug,
        banner: {
          url: bannerUrl,
          alt: attrs.banner?.alternativeText || attrs.banner?.data?.attributes?.alternativeText || title,
        },
        author: attrs.author || "iFLOW Team",
        published_on: attrs.publishedAt || attrs.createdAt,
        date: attrs.publishedAt || attrs.createdAt,
        image: bannerUrl,
        link: `/case-studies/${slug}`,
        full_content: convertRichTextToMarkdown(attrs.content),
        sections,
      };
    });

    const listToReturn = transformedCaseStudies.length > 0 ? transformedCaseStudies : DEFAULT_CASE_STUDIES;

    const startIndex = (page - 1) * pageSize;
    const paginatedCaseStudies = listToReturn.slice(
      startIndex,
      startIndex + pageSize
    );

    return {
      caseStudies: paginatedCaseStudies,
      pagination: {
        page,
        pageSize,
        total: listToReturn.length,
        pageCount: Math.ceil(listToReturn.length / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return {
      caseStudies: DEFAULT_CASE_STUDIES,
      pagination: { page: 1, pageSize: 10, total: DEFAULT_CASE_STUDIES.length, pageCount: 1 },
    };
  }
};

export const fetchCaseStudy = async (slug: string): Promise<CaseStudy | null> => {
  const normalizedSlug = slug === "how-an-nbfc-scaled-its-lending-without-compromising-credit-quality" ? "ai-credit" : slug;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

  try {
    let finalUrl = `${baseUrl}/case-studies?filters[slug][$eq]=${normalizedSlug}&${DEEP_POPULATE_PARAMS}`;

    let response = await fetch(finalUrl, {
      next: { revalidate: 60 },
    });

    let rawCaseStudy = null;

    if (response.ok) {
      const data = await response.json();
      rawCaseStudy = data.data?.[0];
    }

    if (!rawCaseStudy) {
      const allUrl = `${baseUrl}/case-studies?pagination[pageSize]=100&${DEEP_POPULATE_PARAMS}`;
      const allRes = await fetch(allUrl, { next: { revalidate: 60 } });
      if (allRes.ok) {
        const allData = await allRes.json();
        rawCaseStudy = (allData.data || []).find((cs: any) => {
          const attrs = cs.attributes || cs;
          const computed = attrs.slug && attrs.slug.trim() !== "" ? attrs.slug : slugify(attrs.title || "");
          return computed === slug || `case-study-${cs.id}` === slug;
        });
      }
    }

    if (!rawCaseStudy) {
      return DEFAULT_CASE_STUDIES.find((cs) => cs.slug === normalizedSlug || cs.slug === slug || slugify(cs.title) === slug) || null;
    }

    const attrs = rawCaseStudy.attributes || rawCaseStudy;
    const computedSlug = attrs.slug && attrs.slug.trim() !== "" ? attrs.slug : (slugify(attrs.title || "") || `case-study-${rawCaseStudy.id}`);

    const sections = Array.isArray(attrs.sections)
      ? attrs.sections.map(mapSection)
      : [];

    const bannerUrl = attrs.banner?.url || attrs.banner?.data?.attributes?.url || "";
    const bannerAlt = attrs.banner?.alternativeText || attrs.banner?.data?.attributes?.alternativeText || attrs.title;

    return {
      id: rawCaseStudy.id,
      title: attrs.title || "",
      subtitle: attrs.subtitle || attrs.description || "",
      category: attrs.category || "AI & CREDIT",
      category_badge: attrs.category_badge || attrs.category || "",
      tag: attrs.tag || "",
      metrics: attrs.metrics || "",
      coming_soon: typeof attrs.coming_soon === "boolean" ? attrs.coming_soon : false,
      display_location: attrs.display_location || "both",
      slug: computedSlug,
      meta_title: attrs.meta_title || "",
      meta_description: attrs.meta_description || "",
      content: convertRichTextToMarkdown(attrs.content),
      banner: {
        url: bannerUrl,
        alt: bannerAlt,
      },
      author: attrs.author || "iFLOW Team",
      published_on: attrs.publishedAt || attrs.createdAt,
      date: attrs.publishedAt || attrs.createdAt,
      image: bannerUrl,
      link: `/case-studies/${computedSlug}`,
      full_content: convertRichTextToMarkdown(attrs.content),
      sections: sections,
    };
  } catch (error) {
    console.error("Error fetching case study:", error);
    return DEFAULT_CASE_STUDIES.find((cs) => cs.slug === slug || slugify(cs.title) === slug) || null;
  }
};
