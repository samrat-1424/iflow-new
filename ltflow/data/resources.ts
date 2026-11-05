export type ResourceCard = {
  id: number;
  name: string;
  image: string;
  title: string;
  description: string;
};

export const resources: ResourceCard[] = [
  {
    id: 1,
    name: "MSME",
    image: "/hero/Msme.png",
    title: "Modernize lending workflows and integrations.",
    description:
      "Helps banks streamline onboarding, credit decisioning, underwriting, and post-disbursal servicing with API-first integrations and configurable journeys.",
  },
  {
    id: 2,
    name: "Agriculture",
    image: "/hero/Agriculture.png",
    title: "Scale faster with modular, configurable platforms.",
    description:
      "Enables NBFCs to launch new products quickly, automate operations, improve risk controls, and integrate partners across the full loan lifecycle.",
  },
  {
    id: 3,
    name: "Wholesale",
    image: "/hero/Wholesale.png",
    title: "Ship partner-led digital lending experiences.",
    description:
      "Supports rapid experimentation, partner onboarding, real-time validations, and flexible deployment to help fintechs grow responsibly.",
  },
  {
    id: 4,
    name: "Retail",
    image: "/hero/Retail.png",
    title: "Embedded credit journeys for merchants and customers.",
    description:
      "Power BNPL, co-lending, and distribution channels with seamless onboarding, decisioning, and collections—optimized for embedded finance use-cases.",
  },
];

export function normalizeSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function getResourceBySlug(slug: string): ResourceCard | undefined {
  const decoded = decodeURIComponent(slug).replace(/\+/g, " ");
  return resources.find(
    (r) => normalizeSlug(r.name) === normalizeSlug(slug) || normalizeSlug(r.name) === normalizeSlug(decoded)
  );
}
