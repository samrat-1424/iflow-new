"use client";

import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import { Blog } from "@/utils/Blog";


// interface BlogCardProps {
//   blog: Blog;
//   showContinueButton?: boolean;
// }

import Reveal from "./Reveal";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const url_lms = process.env.NEXT_PUBLIC_STRAPI_URL;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const apiUrl =
          `${url_lms}/blogs?pagination[page]=1&pagination[pageSize]=3&sort=published_on:desc&populate=*`;

          const res = await fetch(apiUrl, {
            method: "GET",
            
          });
          
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);

        const data = await res.json();

        setBlogs(data.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Reveal>
      <section className="w-full py-12 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-14">
        <p className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#623f99] mb-3">
          LATEST INSIGHTS & TRENDS
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-tight">
          iFLOW{" "}
          <span className="text-[#9a3f91]">
            Insights
          </span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
          Stay ahead with our latest research, industry analysis, and technology updates on modern digital lending.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (  
            <div
              key={idx}
              className="animate-pulse bg-gray-200 h-64 rounded-xl"
            />
          ))
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              showContinueButton={true}
            />
          ))
        ) : (
          <p className="col-span-full h-40 text-center text-gray-500">
            New stories and updates will be here shortly.
          </p>
        )}
      </div>
    </section>
    </Reveal>
  );
}

