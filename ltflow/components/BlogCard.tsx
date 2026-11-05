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

interface BlogCardProps {
  blog: Blog;
  showContinueButton?: boolean;
}

export default function BlogCard({
  blog,
  showContinueButton = true,
}: BlogCardProps) {
  const category = getBlogCategory(blog);
  const formattedDate = formatBlogDisplayDate(blog.published_on);
  const excerpt = getBlogExcerpt(blog);
  const imageUrl = getBlogImageUrl(blog);

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full">
      <article className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/10 hover:border-purple-300 transition-all duration-300 flex flex-col h-full">
        {/* Banner Image */}
        <div className="relative aspect-[1678/937] w-full overflow-hidden rounded-t-2xl bg-slate-50">
          <Image
            src={imageUrl}
            alt={blog.banner?.alt || blog.title}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category & Date */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase mb-3">
            <span className="text-[#623f99]">{category}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-400 font-semibold">{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#623f99] transition-colors leading-snug line-clamp-2 mb-3">
            {blog.title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6 flex-1">
              {excerpt}
            </p>
          )}

          {/* Read More Link */}
          {showContinueButton && (
            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#623f99] group-hover:text-[#623f99] group-hover:translate-x-1.5 transition-all mt-auto pt-2">
              <span>Continue Reading</span>
              <span className="text-base font-normal">→</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
