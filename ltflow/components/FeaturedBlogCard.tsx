"use client";

import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/utils/Blog";
import {
  formatBlogDisplayDate,
  getBlogCategory,
  getBlogExcerpt,
  getBlogImageUrl,
} from "@/utils/blogHelpers";

interface FeaturedBlogCardProps {
  blog: Blog;
}

export default function FeaturedBlogCard({ blog }: FeaturedBlogCardProps) {
  const category = getBlogCategory(blog);
  const formattedDate = formatBlogDisplayDate(blog.published_on);
  const excerpt = getBlogExcerpt(blog);
  const imageUrl = getBlogImageUrl(blog);

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block w-full mb-12">
      <article className="w-full bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 lg:p-8 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Featured Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[1678/937] w-full overflow-hidden rounded-2xl bg-slate-50 shadow-inner">
              <Image
                src={imageUrl}
                alt={blog.banner?.alt || blog.title}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold tracking-wider text-[#623f99] uppercase mb-4 w-fit">
              <span>FEATURED</span>
              <span className="text-[#a855f7]">·</span>
              <span>{category}</span>
            </div>

            {/* Title in signature purple */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#581c87] group-hover:text-[#623f99] transition-colors leading-[1.25] tracking-tight mb-4">
              {blog.title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                {excerpt}
              </p>
            )}

            {/* Date */}
            {formattedDate && (
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-6">
                {formattedDate}
              </p>
            )}

            {/* Continue Reading */}
            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#623f99] group-hover:text-[#623f99] group-hover:translate-x-1.5 transition-all">
              <span>Continue Reading</span>
              <span className="text-base font-normal">→</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
