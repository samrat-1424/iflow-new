// utils/Solution.ts
export interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon?: {
    url: string;
    alt?: string;
  };
}
export interface SolutionModel {
  id: number;
  name: string;
  title: string;
  description: string;
  features: any;
  diagram?: {
    url: string;
    alt?: string;
  };
}

export interface SolutionStat {
  id: number;
  value: string;
  label: string;
  description?: string;
}

export interface SolutionSection {
  __component?: string;
  id: number;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  display_location?: "both" | "only_detail" | "only_main";
  companyName?: string;
  companySubtitle?: string;
  businessChallenge?: string;
  iflowSolution?: string;
  businessImpact?: string;
  quoteText?: string;
  quoteAuthor?: string;
  stars?: number;
  companyLogo?: {
    url: string;
    alt?: string;
  };
  models?: SolutionModel[];
  stats?: SolutionStat[];
  features?: string;
  cards?: Array<{
    id: number;
    title: string;
    description: string;
    icon?: any;
    highlight?: boolean;
  }>;
  left_features?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  right_features?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  image?: {
    url: string;
    alt?: string;
  };
  items?: Array<{
    id: number;
    label: string;
    highlight: boolean;
    icon?: {
      url: string;
      alt?: string;
    };
  }>;
  steps?: Array<{
    id: number;
    title: string;
    description: string;
    icon?: {
      url: string;
      alt?: string;
    };
  }>;
}

export interface Solution {
    id: number;
    image: string;
    author: string;
    date: string;
    title: string;
    link: string;
    published_on: string;
    full_content: string; 
    slug: string;
    banner: {
      url: string;
      alt?: string;
    };
    content?: string;
    meta_title?: string;
    meta_description?: string;
    display_location?: "both" | "only_detail" | "only_main";
    sections?: SolutionSection[];
    feature_cards?: FeatureCard[];
    feature_cards_heading?: string;
    feature_cards_description?: string;
    faq_section?: {
      title: string;
      faqs: Array<{
        id: number;
        question: string;
        answer: string;
      }>;
    };
  }
  
