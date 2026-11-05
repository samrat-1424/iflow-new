import BlogCard from "@/components/BlogCard";
import FeaturedBlogCard from "@/components/FeaturedBlogCard";
import { fetchBlogPosts } from "@/services/blogService";
import { Blog } from "@/utils/Blog";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Lending Blogs, Insights & Industry Trends | Iflow",
  description:
    "Read the latest blogs on digital lending, fintech, loan origination, co-lending, BNPL, onboarding, collections, and lending technology trends from the iflow team.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Digital Lending Blogs, Insights & Industry Trends | Iflow",
    description:
      "Read the latest blogs on digital lending, fintech, loan origination, co-lending, BNPL, onboarding, collections, and lending technology trends from the iflow team.",
    url: "https://iflow.co.in/blogs",
    siteName: "Iflow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "iFLOW Insights - iFLOW Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Lending Blogs, Insights & Industry Trends | Iflow",
    description:
      "Read the latest blogs on digital lending, fintech, loan origination, co-lending, BNPL, onboarding, collections, and lending technology trends from the iflow team.",
    images: ["/og-image.png"],
  },
};

const blogsPerPage = 12;

export const revalidate = 600;

export async function generateStaticParams() {
  try {
    const { pagination } = await fetchBlogPosts({
      page: 1,
      pageSize: blogsPerPage,
    });

    const totalPages = pagination.pageCount || 1;

    return Array.from({ length: totalPages }, (_, i) => ({
      page: String(i + 1),
    }));
  } catch (err) {
    console.error("Error generating static params:", err);
    return [];
  }
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  let blogs: Blog[] = [];
  let totalPages = 1;

  try {
    const { blogs: fetchedBlogs, pagination } = await fetchBlogPosts({
      page: currentPage,
      pageSize: blogsPerPage,
    });

    blogs = fetchedBlogs || [];
    totalPages = pagination.pageCount || 1;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  // Ensure latest blog is strictly first by published_on descending
  blogs.sort((a, b) => {
    const timeA = new Date(a.published_on).getTime();
    const timeB = new Date(b.published_on).getTime();
    return timeB - timeA;
  });

  const isFirstPage = currentPage === 1;
  const featuredBlog = isFirstPage && blogs.length > 0 ? blogs[0] : null;
  const gridBlogs = isFirstPage && blogs.length > 0 ? blogs.slice(1) : blogs;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "iFLOW Blogs - iFLOW Insights",
            description:
              "Explore iFLOW Insights for the latest news, trends, and expert analysis on digital lending infrastructure, AI in fintech, and the future of financial services.",
            url: "https://iflow.co.in/blogs",
          }),
        }}
      />

      {/* ── Blog Hero Header – matches preview site design ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#ffffff",
        }}
        className="w-full"
      >
        {/* Soft lavender radial blob – top right, exactly like preview */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            background:
              "radial-gradient(ellipse at top right, rgba(216,180,254,0.38) 0%, rgba(196,181,253,0.18) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-14"
          style={{ paddingTop: "56px", paddingBottom: "52px" }}
        >
          {/* Eyebrow label */}
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7c3aed",
              marginBottom: "14px",
            }}
          >
            iFLOW Insights
          </p>

          {/* Main heading */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 1.12,
              color: "#0f172a",
              marginBottom: "20px",
              maxWidth: "640px",
            }}
          >
            Our blog
            <br />
            <span className="text-[#9a3f91]">insights &amp; trends</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1rem",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Read the latest on digital lending, loan origination, co-lending,
            BNPL, onboarding, collections and lending technology from the iFLOW
            team.
          </p>
        </div>
      </section>

      {/* ── Blog Grid & Pagination ── */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          {/* Latest / Featured blog on top */}
          {featuredBlog && <FeaturedBlogCard blog={featuredBlog} />}

          {/* Followed by others in 3-column grid */}
          {gridBlogs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} showContinueButton={true} />
              ))}
            </div>
          ) : !featuredBlog ? (
            <p className="text-center text-gray-500 py-12">
              No blogs found.
            </p>
          ) : null}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-14">
              <Link
                href={`?page=${currentPage - 1}`}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "opacity-40 pointer-events-none border-slate-200 text-slate-400"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Prev
              </Link>

              {Array.from({ length: totalPages }, (_, index) => (
                <Link
                  key={index}
                  href={`?page=${index + 1}`}
                  className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === index + 1
                      ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {index + 1}
                </Link>
              ))}

              <Link
                href={`?page=${currentPage + 1}`}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "opacity-40 pointer-events-none border-slate-200 text-slate-400"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
