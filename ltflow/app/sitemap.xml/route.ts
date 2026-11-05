import { fetchBlogPosts } from "@/services/blogService";
import { fetchSolutions } from "@/services/solutionsService";
import { fetchResources } from "@/services/resourcesService";
import { fetchCaseStudies } from "@/services/caseStudyService";

export async function GET() {
  const baseUrl = "https://iflow.co.in";
  const releaseDate = "2026-05-18";

  // Exact static routes with their specific changefreq and priority
  const baseRoutes = [
    { url: `${baseUrl}/`, lastModified: releaseDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/retail`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/msme`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/agriculture`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/wholesale`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/book-a-demo`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/solutions/co-lending`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/distribution`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/loan-origination-los`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/loan-management-lms`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/bicri`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/bnpl-product-suite`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/msme-and-agri-tech-on-boarding-journeys`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/collection`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/on-boarding-journey`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/ai-intelligent-suite`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/dsa-management-system`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/solutions/pool-buyout`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/case-studies/ai-credit`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: releaseDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/sitemap.html`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blogs/how-api-orchestrated-lending-works`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/what-is-co-lending-and-how-does-it-work`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/how-to-choose-the-right-loan-management-system`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/difference-between-los-and-lms-in-the-lending-lifecycle`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/the-future-of-indian-agribusiness-and-msme-finance-powered-by-digital-lending-infrastructure`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/bnpl-product-suite-what-it-is-and-why-lenders-should-care`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/10-types-of-loan-management-systems-powering-digital-lending-today`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/distribution-automating-dsa-operations-lead-flow-and-payouts`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/collections-from-missed-dues-to-measurable-efficiency`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/what-is-an-ai-based-business-rule-engine-bre-a-practical-guide-for-modern-lending`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/what-is-dsa-in-banking-a-complete-guide`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/what-is-the-difference-between-traditional-and-ai-credit-scoring`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/bicri-business-indicator-for-credit-rating-in-india`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/what-is-a-loan-origination-system-los`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/digital-onboarding-automating-the-kyc-journey`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/what-is-a-loan-management-system-lms`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blogs/co-lending-powering-financial-inclusion-through-collaboration-and-technology`, lastModified: releaseDate, changeFrequency: "monthly", priority: 0.6 },
  ];

  let dynamicRoutes: any[] = [];
  try {
    const [blogsData, solutionsData, resourcesData, caseStudiesData] = await Promise.all([
      fetchBlogPosts({ pageSize: 100 }).catch(() => ({ blogs: [] })),
      fetchSolutions({ pageSize: 100 }).catch(() => ({ solutions: [] })),
      fetchResources({ pageSize: 100 }).catch(() => ({ resources: [] })),
      fetchCaseStudies({ pageSize: 100 }).catch(() => ({ caseStudies: [] })),
    ]);

    const activeUrls = new Set(baseRoutes.map((r) => r.url));
    const currentDate = new Date().toISOString().split('T')[0];

    const dynamicBlogRoutes = (blogsData.blogs || [])
      .map((blog: any) => `${baseUrl}/blogs/${blog.slug}`)
      .filter((url: string) => !activeUrls.has(url))
      .map((url: string) => ({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.6,
      }));

    const dynamicSolutionRoutes = (solutionsData.solutions || [])
      .map((solution: any) => `${baseUrl}/solutions/${solution.slug}`)
      .filter((url: string) => !activeUrls.has(url))
      .map((url: string) => ({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      }));

    const dynamicResourceRoutes = (resourcesData.resources || [])
      .map((resource: any) => `${baseUrl}/resources/${resource.slug}`)
      .filter((url: string) => !activeUrls.has(url))
      .map((url: string) => ({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    const dynamicCaseStudyRoutes = (caseStudiesData.caseStudies || [])
      .map((cs: any) => `${baseUrl}/case-studies/${cs.slug}`)
      .filter((url: string) => !activeUrls.has(url))
      .map((url: string) => ({
        url,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    dynamicRoutes = [
      ...dynamicBlogRoutes,
      ...dynamicSolutionRoutes,
      ...dynamicResourceRoutes,
      ...dynamicCaseStudyRoutes,
    ];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  const allRoutes = [...baseRoutes, ...dynamicRoutes];

  // Generate standard, beautiful XML manually with precision
  const xmlItems = allRoutes
    .map(
      (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

  return new Response(xmlString, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
