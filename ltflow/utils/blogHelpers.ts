import { Blog } from "./Blog";

export function formatBlogDisplayDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getBlogCategory(blog: Blog): string {
  if (blog.tags && blog.tags.length > 0 && typeof blog.tags[0] === "string" && blog.tags[0].trim()) {
    return blog.tags[0].trim().toUpperCase();
  }
  const text = `${blog.title || ""} ${blog.slug || ""} ${blog.meta_fields?.meta_description || ""}`.toLowerCase();

  if (text.includes("co-lending") || text.includes("colending")) return "CO-LENDING";
  if (text.includes("upi") || text.includes("mdr") || text.includes("payment")) return "PAYMENTS";
  if (text.includes("syndicated") || text.includes("syndication")) return "CO-LENDING";
  if (text.includes("los") || text.includes("origination")) return "LOAN ORIGINATION";
  if (text.includes("lms") || text.includes("loan management")) return "LOAN MANAGEMENT";
  if (text.includes("ai") || text.includes("scoring") || text.includes("credit")) return "AI & FINTECH";
  if (text.includes("api") || text.includes("orchestrated")) return "API BANKING";
  if (text.includes("bnpl")) return "BNPL";
  if (text.includes("collection")) return "COLLECTIONS";
  return "CO-LENDING";
}

export function getBlogExcerpt(blog: Blog): string {
  if (blog.excerpt && blog.excerpt.trim()) {
    return blog.excerpt.trim();
  }
  if (blog.meta_fields?.meta_description && blog.meta_fields.meta_description.trim()) {
    return blog.meta_fields.meta_description.trim();
  }
  if (blog.full_content) {
    const clean = blog.full_content
      .replace(/<[^>]*>/g, " ")
      .replace(/[#*`_~\[\]()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return clean.slice(0, 160) + (clean.length > 160 ? "..." : "");
  }
  return "";
}

export function getBlogImageUrl(blog: Blog): string {
  const strapiBase = process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "https://cms.ltflow.com";
  const rawUrl = blog.banner?.url;
  if (!rawUrl) return "/og-image.png";
  if (rawUrl.startsWith("http")) return rawUrl;
  return `${strapiBase}${rawUrl}`;
}
