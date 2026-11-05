// utils/blog.ts
export interface Blog {
    id: number;
    image: string;
    author: string;
    date: string;
    title: string;
    link: string;
    published_on: string;
    excerpt?: string | null;
    full_content: string;
    slug: string;
    meta_title?: string;
    meta_description?: string;
    meta_fields?: {
      id?: number;
      meta_title?: string;
      meta_description?: string;
      og_image?: {
        url?: string;
      };
    };
    updatedAt?: string;
    tags?: string[];
    banner: {
      url: string;
      alt?: string;
    };
  }
  