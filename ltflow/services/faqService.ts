import { convertRichTextToMarkdown } from "./solutionsService";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: number | string;
  title: string;
  faqs: FaqItem[];
}

export const fetchFaqs = async (): Promise<FaqCategory[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  
  // Try /faq endpoint with nested population for categories
  const finalUrl = `${baseUrl}/faq?populate[categories][populate]=faqs`;

  try {
    const response = await fetch(finalUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch FAQs: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Check if Single Type with 'categories' component
    const categoriesData = data?.data?.categories || data?.data?.attributes?.categories;
    
    if (categoriesData && Array.isArray(categoriesData) && categoriesData.length > 0) {
      return categoriesData.map((category: any, index: number) => {
        const faqs = category.faqs || [];
        const mappedItems = faqs.map((item: any) => {
          const attributes = item.attributes || item;
          return {
            id: item.id || Math.random(),
            question: attributes.question || "",
            answer: attributes.answer ? convertRichTextToMarkdown(attributes.answer) : "",
          };
        });

        return {
          id: category.id || index + 1,
          title: category.title || "General",
          faqs: mappedItems
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error fetching FAQs from Strapi:", error);
    return [];
  }
};
