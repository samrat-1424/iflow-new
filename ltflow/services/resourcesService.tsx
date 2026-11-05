// services/resourcesService.ts

import { convertRichTextToMarkdown } from "./solutionsService";

export const fetchResources = async ({
  page = 1,
  pageSize = 10,
} = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const finalUrl = `${baseUrl}/customer-we-focuseds?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc&populate=*`;  //



  try {
    const response = await fetch(finalUrl, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
      console.error("Make sure you've enabled public permissions in Strapi:");
      console.error("Settings -> Roles -> Public -> Customer-we-focused -> Enable 'find' and 'findOne'");
      
      // Return empty array instead of throwing error
      return {
        resources: [],
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      };
    }

    const data = await response.json();

    // Transform each resource to match the expected interface
    const transformedResources = data.data.map((resource: any) => {
      // Handle Strapi v4 structure - access attributes
      const attrs = resource.attributes || resource;
      
      let bannerUrl = '';
      // Handle Strapi v4 media field structure
      if (attrs.banner) {
        if (typeof attrs.banner === 'string') {
          bannerUrl = attrs.banner;
        } else if (attrs.banner.data?.attributes?.url) {
          bannerUrl = attrs.banner.data.attributes.url;
        } else if (attrs.banner.url) {
          bannerUrl = attrs.banner.url;
        }
      }
      
      // If URL is relative, prepend the Strapi base URL
      if (bannerUrl && bannerUrl.startsWith('/')) {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337';
        bannerUrl = strapiUrl + bannerUrl;
      }
      
      return {
        id: resource.id,
        title: attrs.title || '',
        banner: bannerUrl,
        content: attrs.content || "",
        slug: attrs.slug || '',
      };
    });

    return {
      resources: transformedResources,
      pagination: data.meta.pagination,
    };
  } catch (error) {
    console.error("Error fetching resources:", error);
    return {
      resources: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
    };
  }
};

export const fetchResourceBySlug = async (slug: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const finalUrl = `${baseUrl}/customer-we-focuseds?filters[slug][$eq]=${slug}&populate[0]=banner&populate[1]=focus_items&populate[2]=focus_items.icon&populate[3]=faq_section&populate[4]=faq_section.faqs`;

  try {
    const response = await fetch(finalUrl, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch resource:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const rawResource = data.data?.[0];
    
    if (!rawResource) return null;

    // Handle Strapi v4 structure - access attributes
    const attrs = rawResource.attributes || rawResource;

    // Transform Strapi response to match Resource interface
    let bannerUrl = '';
    
    // Handle Strapi v4 media field structure
    if (attrs.banner) {
      if (typeof attrs.banner === 'string') {
        bannerUrl = attrs.banner;
      } else if (attrs.banner.data?.attributes?.url) {
        bannerUrl = attrs.banner.data.attributes.url;
      } else if (attrs.banner.url) {
        bannerUrl = attrs.banner.url;
      }
    }
    
    // If URL is relative, prepend the Strapi base URL
    if (bannerUrl && bannerUrl.startsWith('/')) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337';
      bannerUrl = strapiUrl + bannerUrl;
    }
    
    // Transform focus_items
    const focusItems = attrs.focus_items?.map((item: any) => {
      let iconUrl = '';
      if (item.icon) {
        if (typeof item.icon === 'string') {
          iconUrl = item.icon;
        } else if (item.icon.data?.attributes?.url) {
          iconUrl = item.icon.data.attributes.url;
        } else if (item.icon.url) {
          iconUrl = item.icon.url;
        }
      }
      
      if (iconUrl && iconUrl.startsWith('/')) {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || 'http://localhost:1337';
        iconUrl = strapiUrl + iconUrl;
      }
      
      return {
        id: item.id,
        title: item.title || '',
        icon: iconUrl,
        order: item.order || 0,
        description: item.description || '',
      };
    }) || [];
    
    const faq_section = attrs.faq_section ? {
      title: attrs.faq_section.title || "",
      faqs: (attrs.faq_section.faqs || []).map((faq: any) => ({
        id: faq.id,
        question: faq.question || "",
        answer: faq.answer ? convertRichTextToMarkdown(faq.answer) : "",
      })),
    } : undefined;

    return {
      id: rawResource.id,
      title: attrs.title || '',
      banner: bannerUrl,
      content: attrs.content || "",
      slug: attrs.slug,
      focus_items: focusItems,
      faq_section: faq_section,
    };
  } catch (error) {
    console.error("Error fetching resource by slug:", error);
    return null;
  }
};

export function normalizeSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}
