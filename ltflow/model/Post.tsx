
export type Post = {
  title: string;
  id: number;
  documentId: string;
  excerpt: string;
  content: string;
  slug: string;
  published_on: string;
  author_name: string;
  featured_image: { url: string; };
  author?: { name: string; };
}
