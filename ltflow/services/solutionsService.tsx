// services/solutionsService.ts
import { Solution } from "@/utils/Solution";

// Define the custom order for solutions
// Row 1: Co-lending, AI Intelligent Suite
// Row 2: LOS, LMS, Collection
// Row 3 (Bento): Pool Buyout (left) | Distribution, MSME (right)
// Row 4: DSA, API Services, BICRI, BNPL
const SOLUTION_ORDER = [
  "co-lending",
  "ai-intelligent-suite",
  "ai-ml-score-models",
  "ai-based-bre",
  "loan-origination-los",
  "loan-management-lms",
  "collection",
  "pool-buyout",
  "distribution",
  "msme-and-agri-tech-on-boarding-journeys",
  "dsa",
  "dsa-management-system",
  "on-boarding-journey",
  "bicri",
  "bnpl-product-suite",
];

// Mandatory solutions ensuring Pool buyout and DSA Management System are never missing
// before they are published in local Strapi
const MANDATORY_SOLUTIONS: Solution[] = [
  {
    id: 561,
    title: "Pool buyout",
    slug: "pool-buyout",
    banner: {
      url: "/uploads/Pullbuyou_2964ea9fa9.jpeg",
      alt: "Pool buyout",
    },
    author: "iFLOW Team",
    published_on: "2026-06-28T16:02:13.445Z",
    date: "2026-06-28T16:02:13.445Z",
    image: "/uploads/Pullbuyou_2964ea9fa9.jpeg",
    link: "/solutions/pool-buyout",
    full_content: "",
  },
  {
    id: 480,
    title: "DSA Management System",
    slug: "dsa",
    banner: {
      url: "/uploads/DS_9c7b094c40.jpeg",
      alt: "DSA Management System",
    },
    author: "iFLOW Team",
    published_on: "2026-06-26T11:56:01.868Z",
    date: "2026-06-26T11:56:01.868Z",
    image: "/uploads/DS_9c7b094c40.jpeg",
    link: "/solutions/dsa",
    full_content: "",
  },
  {
    id: 605,
    title: "AI BASED BRE",
    slug: "ai-based-bre",
    banner: {
      url: "/uploads/header_56b26cf9d8.webp",
      alt: "AI BASED BRE",
    },
    author: "iFLOW Team",
    published_on: "2026-11-03T19:27:12.613Z",
    date: "2026-11-03T19:27:12.613Z",
    image: "/uploads/header_56b26cf9d8.webp",
    link: "/solutions/ai-based-bre",
    full_content: "",
  },
];

export const fetchSolutions = async ({ page = 1, pageSize = 100 } = {}) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://cms.ltflow.com/api"
      : "http://localhost:1337/api");

  const token =
    process.env.STRAPI_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const isDev = process.env.NODE_ENV !== "production";
  const draftParam = token ? "&status=draft" : (isDev ? "&status=draft" : "");
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  let strapiSolutions: Solution[] = [];

  try {
    const finalUrl = `${baseUrl}/solutions?pagination[pageSize]=100&populate=*${draftParam}`;
    const response = await fetch(finalUrl, {
      headers: authHeaders,
      cache: isDev ? "no-store" : "default",
      next: isDev ? undefined : { revalidate: 60 },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        strapiSolutions = data.data.map((solution: any) => {
          const isAiMl = solution.slug === "ai-ml-score-models" || solution.slug === "ai-intelligent-suite";
          const finalSlug = isAiMl ? "ai-intelligent-suite" : solution.slug;
          const finalTitle = isAiMl ? "AI Intelligent Suite" : solution.title;
          return {
            id: solution.id,
            title: finalTitle,
            slug: finalSlug,
            banner: {
              url: solution.banner?.url || "",
              alt: solution.banner?.alternativeText || finalTitle,
            },
            author: solution.author || "iFLOW Team",
            published_on: solution.publishedAt || solution.createdAt,
            date: solution.publishedAt || solution.createdAt,
            image: solution.banner?.url || "",
            link: `/solutions/${finalSlug}`,
            full_content: "",
          };
        });
      }
    }
  } catch (err) {
    console.warn("Primary Strapi fetch failed, attempting fallback:", err);
  }

  // Production CMS fallback if primary returned 0 solutions
  if (strapiSolutions.length === 0 && !baseUrl.includes("cms.ltflow.com")) {
    try {
      const prodUrl = `https://cms.ltflow.com/api/solutions?pagination[pageSize]=100&populate=*${draftParam}`;
      const prodRes = await fetch(prodUrl, {
        headers: authHeaders,
        cache: isDev ? "no-store" : "default",
        next: isDev ? undefined : { revalidate: 60 },
      });
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (Array.isArray(prodData.data)) {
          strapiSolutions = prodData.data.map((solution: any) => {
            const isAiMl = solution.slug === "ai-ml-score-models" || solution.slug === "ai-intelligent-suite";
            const finalSlug = isAiMl ? "ai-intelligent-suite" : solution.slug;
            const finalTitle = isAiMl ? "AI Intelligent Suite" : solution.title;
            return {
              id: solution.id,
              title: finalTitle,
              slug: finalSlug,
              banner: {
                url: solution.banner?.url || "",
                alt: solution.banner?.alternativeText || finalTitle,
              },
              author: solution.author || "iFLOW Team",
              published_on: solution.publishedAt || solution.createdAt,
              date: solution.publishedAt || solution.createdAt,
              image: solution.banner?.url || "",
              link: `/solutions/${finalSlug}`,
              full_content: "",
            };
          });
        }
      }
    } catch (e) {
      console.warn("Production fallback fetch failed:", e);
    }
  }

  // Combine Strapi solutions with mandatory solutions
  // When a solution is added in Strapi, Strapi's version takes precedence automatically
  const combinedSolutions = [...strapiSolutions];

  for (const mandatory of MANDATORY_SOLUTIONS) {
    const exists = combinedSolutions.some(
      (s) =>
        s.slug === mandatory.slug ||
        (mandatory.slug === "dsa" && s.slug === "dsa-management-system") ||
        (mandatory.slug === "dsa-management-system" && s.slug === "dsa")
    );
    if (!exists) {
      combinedSolutions.push(mandatory);
    }
  }

  // Sort solutions based on custom order; any newly added solutions in Strapi appear right after
  combinedSolutions.sort((a, b) => {
    const aIndex = SOLUTION_ORDER.indexOf(a.slug);
    const bIndex = SOLUTION_ORDER.indexOf(b.slug);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return 0;
  });

  // Apply pagination after sorting
  const startIndex = (page - 1) * pageSize;
  const paginatedSolutions = combinedSolutions.slice(
    startIndex,
    startIndex + pageSize,
  );

  return {
    solutions: paginatedSolutions,
    pagination: {
      page,
      pageSize,
      total: combinedSolutions.length,
      pageCount: Math.ceil(combinedSolutions.length / pageSize),
    },
  };
};

// Helper function to convert Rich Text Blocks to plain text/markdown
export const convertRichTextToMarkdown = (content: any): string => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block.type === "paragraph") {
          return (
            block.children?.map((child: any) => child.text || "").join("") || ""
          );
        }
        if (block.type === "heading") {
          const text =
            block.children?.map((child: any) => child.text || "").join("") ||
            "";
          const level = block.level || 1;
          return "#".repeat(level) + " " + text;
        }
        if (block.type === "list") {
          const items =
            block.children
              ?.map(
                (item: any) =>
                  "- " +
                  item.children?.map((child: any) => child.text || "").join(""),
              )
              .join("\n") || "";
          return items;
        }
        return "";
      })
      .join("\n\n");
  }

  return String(content || "");
};

export const fetchSolution = async (slug: string): Promise<Solution | null> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://cms.ltflow.com/api"
      : "http://localhost:1337/api");

  const token =
    process.env.STRAPI_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const isDev = process.env.NODE_ENV !== "production";
  const draftParam = token ? "&status=draft" : (isDev ? "&status=draft" : "");
  const authHeaders: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  // Handle slug aliases for DSA and AI Intelligent Suite
  const isAiMlRequest = slug === "ai-intelligent-suite" || slug === "ai-ml-score-models";
  const querySlugs =
    slug === "dsa" || slug === "dsa-management-system"
      ? ["dsa", "dsa-management-system"]
      : isAiMlRequest
      ? ["ai-intelligent-suite", "ai-ml-score-models"]
      : [slug];

  const queryPart =
    querySlugs.length > 1
      ? `filters[slug][$in][0]=${querySlugs[0]}&filters[slug][$in][1]=${querySlugs[1]}`
      : `filters[slug][$eq]=${querySlugs[0]}`;

  const populateParams =
    "populate[0]=banner&populate[1]=sections&populate[2]=sections.models&populate[3]=sections.models.diagram&populate[4]=sections.stats&populate[5]=sections.image&populate[6]=sections.cards&populate[7]=sections.cards.icon&populate[8]=sections.cards.image&populate[9]=sections.left_features&populate[10]=sections.right_features&populate[11]=sections.image&populate[12]=feature_cards&populate[13]=feature_cards.icon&populate[14]=faq_section&populate[15]=faq_section.faqs&populate[16]=sections.items&populate[17]=sections.items.icon&populate[18]=sections.steps&populate[19]=sections.steps.icon&populate[20]=sections.companyLogo&populate[21]=sections.left_items&populate[22]=sections.left_items.icon&populate[23]=sections.right_items&populate[24]=sections.right_items.icon&populate[25]=sections.center_icon&populate[26]=meta_fields";

  let rawSolution: any = null;
  let isRemoteFallback = false;
  let usedLocalStrapi = false;

  let remoteSol: any = null;
  let localSol: any = null;

  // 1. Fetch from remote Strapi CMS (with draft support to get latest Content Manager changes)
  try {
    const remoteBase =
      process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.ltflow.com/api";
    const remoteUrl = `${remoteBase}/solutions?${queryPart}&${populateParams}&status=draft`;
    const prodResponse = await fetch(remoteUrl, {
      headers: authHeaders,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (prodResponse.ok) {
      const prodData = await prodResponse.json();
      if (prodData.data && prodData.data.length > 0) {
        remoteSol = prodData.data[0];
      }
    }
  } catch (prodErr) {
    console.warn("Remote Strapi draft fetch failed, trying published/local:", prodErr);
  }

  // 1b. If remote draft returned 0 or failed, try remote published
  if (!remoteSol) {
    try {
      const remoteBase =
        process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.ltflow.com/api";
      const prodPubUrl = `${remoteBase}/solutions?${queryPart}&${populateParams}`;
      const prodResponse = await fetch(prodPubUrl, {
        headers: authHeaders,
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      if (prodResponse.ok) {
        const prodData = await prodResponse.json();
        if (prodData.data && prodData.data.length > 0) {
          remoteSol = prodData.data[0];
        }
      }
    } catch (e) {
      // remote published failed
    }
  }

  // 2. Fetch from local Strapi
  try {
    const localDraftUrl = `http://localhost:1337/api/solutions?${queryPart}&${populateParams}&status=draft`;
    const localRes = await fetch(localDraftUrl, {
      headers: authHeaders,
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    if (localRes.ok) {
      const localData = await localRes.json();
      if (localData.data && localData.data.length > 0) {
        localSol = localData.data[0];
      }
    }
  } catch (err) {
    // local strapi not running
  }

  // 3. Choose the richer solution (the one with more sections from Content Manager)
  const remoteSectionsCount = remoteSol?.sections?.length || 0;
  const localSectionsCount = localSol?.sections?.length || 0;

  if (remoteSectionsCount >= localSectionsCount && remoteSectionsCount > 0) {
    rawSolution = remoteSol;
    isRemoteFallback = true;
    usedLocalStrapi = false;
  } else if (localSectionsCount > 0) {
    rawSolution = localSol;
    isRemoteFallback = false;
    usedLocalStrapi = true;
  } else {
    rawSolution = remoteSol || localSol;
    isRemoteFallback = !!remoteSol;
  }

  if (!rawSolution) {
    const mandatory = MANDATORY_SOLUTIONS.find(
      (s) => s.slug === slug || (slug === "dsa-management-system" && s.slug === "dsa")
    );
    if (mandatory) {
      return mandatory;
    }
    return null;
  }

  // Helper to resolve URLs (uses localhost if local Strapi was used, otherwise remote CMS)
  const imgBase = usedLocalStrapi
    ? "http://localhost:1337"
    : (process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "https://cms.ltflow.com");

  const resolveUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (imgBase) return `${imgBase}${url.startsWith("/") ? "" : "/"}${url}`;
    return url;
  };

  const isBicri = slug === "bicri" || rawSolution.slug === "bicri";

  const sections = Array.isArray(rawSolution.sections)
    ? rawSolution.sections
        .map((section: any) => ({
        __component: section.__component,
        id: section.id,
        badge: section.badge || "",
        title: section.title || "",
        description: section.description || "",
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
              url: resolveUrl(section.companyLogo?.url || section.companyLogo?.data?.attributes?.url),
              alt: section.companyLogo?.alternativeText || section.companyLogo?.data?.attributes?.alternativeText || section.companyName,
            }
          : undefined,

        models: Array.isArray(section.models)
          ? section.models.map((model: any) => ({
              id: model.id,
              name: model.name || "",
              title: model.title || "",
              description: model.description || "",
              features: convertRichTextToMarkdown(model.features),
              diagram: model.diagram?.url
                ? {
                    url: resolveUrl(model.diagram.url),
                    alt: model.diagram.alternativeText || model.title,
                  }
                : undefined,
            }))
          : [],

        stats: Array.isArray(section.stats)
          ? section.stats.map((stat: any) => ({
              id: stat.id,
              value: stat.value || "",
              label: stat.label || "",
            }))
          : [],

        cards: Array.isArray(section.cards)
          ? section.cards.map((card: any) => ({
              id: card.id,
              title: card.title || "",
              description: card.description || "",

              icon:
                card.icon?.url || card.icon?.data?.attributes?.url
                  ? {
                      url: resolveUrl(card.icon?.url || card.icon?.data?.attributes?.url),
                      alt:
                        card.icon?.alternativeText ||
                        card.icon?.data?.attributes?.alternativeText ||
                        card.title,
                    }
                  : undefined,

              image:
                card.image?.url || card.image?.data?.attributes?.url
                  ? {
                      url: resolveUrl(card.image?.url || card.image?.data?.attributes?.url),
                      alt:
                        card.image?.alternativeText ||
                        card.image?.data?.attributes?.alternativeText ||
                        card.title,
                    }
                  : undefined,

              highlight: card.highlight || false,
              button_text: card.button_text || "",
              link: card.link || "",
            }))
          : [],

        features: section.features
          ? convertRichTextToMarkdown(section.features)
          : undefined,

        left_features: section.left_features || [],
        right_features: section.right_features || [],

        center_brand: section.center_brand || "iFLOW",
        center_title: section.center_title || "BICRI Intelligence Layer",
        center_subtitle: section.center_subtitle || "Processing • Validation • Assessment",
        center_icon: section.center_icon?.url
          ? {
              url: resolveUrl(section.center_icon.url),
              alt: section.center_icon.alternativeText || "Intelligence Layer",
            }
          : undefined,
        footer_note: section.footer_note || "",

        left_items: Array.isArray(section.left_items)
          ? section.left_items.map((item: any) => ({
              id: item.id,
              label: item.label || item.title || "",
              highlight: item.highlight || false,
              icon: item.icon?.url ? resolveUrl(item.icon.url) : undefined,
            }))
          : Array.isArray(section.left_features)
          ? section.left_features.map((item: any) => ({
              id: item.id,
              label: item.title || item.label || "",
              highlight: item.highlight || false,
            }))
          : [],

        right_items: Array.isArray(section.right_items)
          ? section.right_items.map((item: any) => ({
              id: item.id,
              label: item.label || item.title || "",
              highlight: item.highlight || false,
              icon: item.icon?.url ? resolveUrl(item.icon.url) : undefined,
            }))
          : Array.isArray(section.right_features)
          ? section.right_features.map((item: any) => ({
              id: item.id,
              label: item.title || item.label || "",
              highlight: item.highlight || false,
            }))
          : [],

        items: Array.isArray(section.items)
          ? section.items.map((item: any) => ({
              id: item.id,
              label: item.label || "",
              highlight: item.highlight || false,
              icon: item.icon?.url || item.icon?.data?.attributes?.url
                ? {
                    url: resolveUrl(item.icon?.url || item.icon?.data?.attributes?.url),
                    alt: item.icon?.alternativeText || item.icon?.data?.attributes?.alternativeText || item.label,
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
                    url: resolveUrl(step.icon?.url || step.icon?.data?.attributes?.url),
                    alt: step.icon?.alternativeText || step.icon?.data?.attributes?.alternativeText || step.title,
                  }
                : undefined,
            }))
          : [],

        image: section.image?.url
          ? {
              url: resolveUrl(section.image.url),
              alt: section.image.alternativeText || section.title,
            }
          : undefined,
      }))
    : [];

  if (isBicri) {
    const hasEcosystem = sections.some(
      (s: any) =>
        s.__component === "solution.data-ecosystem" ||
        s.__component === "solution.integrations-ecosystem" ||
        String(s.title || "").toLowerCase().includes("assessment workflow") ||
        String(s.title || "").toLowerCase().includes("business data") ||
        String(s.badge || "").toLowerCase().includes("integrations & data ecosystem")
    );

    if (!hasEcosystem) {
      sections.push({
        __component: "solution.data-ecosystem",
        id: "default-bicri-ecosystem",
        badge: "INTEGRATIONS & DATA ECOSYSTEM",
        title: "Connect Relevant Business Data to the Assessment Workflow",
        description:
          "A consent-led architecture designed around available, authorised sources and implementation scope.",
        center_brand: "iFLOW",
        center_title: "BICRI Intelligence Layer",
        center_subtitle: "Processing • Validation • Assessment",
        left_items: [
          { label: "Banking & cash flow" },
          { label: "Credit information" },
          { label: "Trade & commerce" },
          { label: "Business context" },
        ],
        right_items: [
          { label: "Risk segmentation" },
          { label: "Business insights" },
          { label: "Limit recommendations" },
          { label: "Structured reports" },
        ],
        footer_note:
          "Illustrative architecture. Actual sources and outputs depend on consent, availability and configuration.",
        display_location: "both",
      });
    }
  }

  const featureCards = Array.isArray(rawSolution.feature_cards)
    ? rawSolution.feature_cards.map((card: any) => ({
        id: card.id,
        title: card.title || "",
        description: card.description || "",
        icon: card.icon?.url
          ? { url: resolveUrl(card.icon.url), alt: card.icon.alternativeText || card.title }
          : undefined,
      }))
    : [];

  const faq_section = rawSolution.faq_section
    ? {
        title: rawSolution.faq_section.title || "",
        faqs: (rawSolution.faq_section.faqs || []).map((faq: any) => ({
          id: faq.id,
          question: faq.question || "",
          answer: faq.answer ? convertRichTextToMarkdown(faq.answer) : "",
        })),
      }
    : undefined;

  const isAiMl = isAiMlRequest || rawSolution.slug === "ai-ml-score-models" || rawSolution.slug === "ai-intelligent-suite";
  const finalSlug = isAiMl ? "ai-intelligent-suite" : rawSolution.slug;
  const finalTitle = isAiMl ? "AI Intelligent Suite" : rawSolution.title;

  const rawMetaTitle =
    rawSolution.meta_fields?.meta_title ||
    rawSolution.meta_title ||
    rawSolution.title ||
    "";
  const rawMetaDesc =
    rawSolution.meta_fields?.meta_description ||
    rawSolution.meta_description ||
    "";

  return {
    id: rawSolution.id,
    title: finalTitle,
    slug: finalSlug,
    meta_title: isAiMl ? "AI Intelligent Suite for Smarter Lending | Iflow" : rawMetaTitle,
    meta_description: isAiMl ? "Make faster, more accurate credit decisions with iflow's AI Intelligent Suite. Our platform uses alternative data and machine learning to build credit scoring models aligned with your lending portfolio." : rawMetaDesc,
    content: convertRichTextToMarkdown(rawSolution.content),
    banner: {
      url: resolveUrl(rawSolution.banner?.url || ""),
      alt: rawSolution.banner?.alternativeText || finalTitle,
    },
    author: rawSolution.author || "iFLOW Team",
    published_on: rawSolution.publishedAt || rawSolution.createdAt,
    date: rawSolution.publishedAt || rawSolution.createdAt,
    image: resolveUrl(rawSolution.banner?.url || ""),
    link: `/solutions/${finalSlug}`,
    full_content: convertRichTextToMarkdown(rawSolution.content),
    sections: isAiMl
      ? sections.filter((s: any) => !String(s.title || "").toLowerCase().includes("ai based bre"))
      : sections,
    feature_cards: featureCards,
    feature_cards_heading: rawSolution.feature_cards_heading || "",
    feature_cards_description: rawSolution.feature_cards_description || "",
    faq_section: faq_section,
  };
};
