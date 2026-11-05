import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogPost } from "@/services/blogService";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateSchemas } from "@/utils/schemaGenerator";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: BlogDetailPageProps
): Promise<Metadata> {
  const resolvedParams = (await params) as { slug: string };
  const blog = await fetchBlogPost(resolvedParams.slug);
  const canonicalUrl = `/blogs/${resolvedParams.slug}`;
  if (!blog) {
    return {
      title: "Blog not found",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }
  const rawTitle = blog.meta_fields?.meta_title || blog.meta_title || blog.title || "Blog";
  const title = rawTitle.trim();

  const rawDescription = blog.meta_fields?.meta_description 
    || blog.meta_description 
    || (blog.full_content || "").slice(0, 160);
  const description = rawDescription.trim();

  const strapiImgUrl = process.env.STRAPI_IMG_URL || process.env.NEXT_PUBLIC_STRAPI_IMG_URL || "";
  let images: string[] = [];
  if (blog.meta_fields?.og_image?.url) {
    const imgUrl = blog.meta_fields.og_image.url;
    images = [imgUrl.startsWith("http") ? imgUrl : `${strapiImgUrl}${imgUrl}`];
  } else if (blog.banner?.url) {
    const imgUrl = blog.banner.url;
    images = [imgUrl.startsWith("http") ? imgUrl : `${strapiImgUrl}${imgUrl}`];
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export const revalidate = 60;

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = (await params) as { slug: string };
  const blog = await fetchBlogPost(resolvedParams.slug);
  
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-white">
        {/* Icon */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75h4.5m-4.5 4.5h4.5m-9 6h13.5A2.25 2.25 0 0021 18V6A2.25 2.25 0 0018.75 3.75H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Blog Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, we couldn’t find the blog you’re looking for. It may have been
          removed or the link is incorrect.
        </p>

        {/* Back button */}
        <Link
          href="/blogs"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  const schemas = generateSchemas(blog);

  let contentToRender = blog.full_content || "";
  if (blog.slug === 'what-is-a-loan-origination-system-los') {
    const tableRegex = /Stage\s*Loan Origination System \(LOS\)\s*Loan Management System \(LMS\)[\s\S]*?Fair recovery practices, grievance redressal/i;
    const replacementTable = `
| Stage | Loan Origination System (LOS) | Loan Management System (LMS) |
| --- | --- | --- |
| When it's used | Before disbursal | After disbursal |
| Core job | Decide whether to lend and on what terms | Manage the loan once it's live |
| Typical tasks | Application intake, KYC, credit checks, underwriting, offer generation | EMI collection, repayment tracking, restructuring, collections |
| Who uses it | Credit and onboarding teams | Servicing, Credit Decision and Operation |
| RBI compliance focus | KFS delivery, consent capture, FLDG structuring | Fair recovery practices, grievance redressal |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());

    const table2Regex = /Feature\s*Why it matters\s*Rule-based decision engine[\s\S]*?One platform for personal, MSME, vehicle, and co-lending products avoids a fragmented stack/i;
    const replacementTable2 = `
| Feature | Why it matters |
| --- | --- |
| Rule-based decision engine | Lets credit policy change without a development cycle |
| API-first architecture | Determines how fast you can connect bureaus, KYC vendors, and payment rails |
| Configurable workflows | New loan products shouldn't require custom code |
| Document management with OCR | Centralised storage, tagging, and version control cut manual review time |
| Real-time dashboards | SLA and exception tracking without a manual MIS pull |
| Multi-product support | One platform for personal, MSME, vehicle, and co-lending products avoids a fragmented stack |
`;
    contentToRender = contentToRender.replace(table2Regex, replacementTable2.trim());
  } else if (blog.slug === 'benefits-of-loan-origination-system') {
    const tableRegex = /Factor\s*Manual Process\s*With LOS[\s\S]*?Scales without major headcount increase\.*/i;
    const replacementTable = `
| Factor | Manual Process | With LOS |
| --- | --- | --- |
| Loan turnaround time | 3-7 days | Few hours to 1 day |
| Error rate | Higher, due to manual entry | Lower, data pulled automatically |
| Cost per loan | Higher (more staff, more paper) | Lower (automated workflows) |
| Compliance tracking | Manual record-keeping | Automatic audit trail |
| Scalability | Needs more staff to grow | Scales without major headcount increase |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());
  } else if (blog.slug === 'what-is-co-lending-and-how-does-it-work') {
    const tableRegex = /Parameter\s*Traditional Lending\s*Co-Lending[\s\S]*?Generally faster/i;
    const replacementTable = `
| Parameter | Traditional Lending | Co-Lending |
| --- | --- | --- |
| Number of lenders | One | Two or more |
| Interest rate | Set by a single lender | Blended rate across lenders |
| Loan accessibility | Mostly urban, established credit profiles | Wider reach, including underserved borrowers |
| Risk exposure | Carried by one lender | Shared in an agreed ratio |
| Processing speed | Often slower | Generally faster |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());
  } else if (blog.slug === 'how-to-choose-co-lending-platform') {
    const tableRegex = /What to Check\s*Question Worth Asking\s*Real-time connection[\s\S]*?Is reconciliation performed daily and independently accessible\?/i;
    const replacementTable = `
| What to Check | Question Worth Asking |
| --- | --- |
| Real-time connection | Does data sync instantly, or in manual batch files? |
| Blended rate | Is it calculated automatically and updated when rates change? |
| Minimum retention | Does it track the 10% threshold for both lenders automatically? |
| Fund transfer | Can it provide timestamped proof that the 15-day window is met? |
| Shared system | Do both partners view and process on one unified system? |
| Disclosure | Is the Key Facts Statement generated automatically for the borrower? |
| Reporting | Is reconciliation performed daily and independently accessible? |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());
  } else if (blog.slug === 'co-lending-integration-checklist') {
    const tableRegex = /Stage\s*What to Confirm\s*Before integration[\s\S]*?audit trail confirmed/i;
    const replacementTable = `
| Stage | What to Confirm |
| --- | --- |
| Before integration | Systems can connect via API, split ratio agreed, contract finalised |
| During integration | Real-time sync tested, blended rate tested, fund transfer timed, disclosures automated, reconciliation shared |
| After going live | Small batch first, first reconciliation reviewed, audit trail confirmed |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());
  } else if (blog.slug === 'rbi-co-lending-arrangements-directions') {
    const tableRegex = /2020 Circular\s*2025 Directions[\s\S]*?Effective date\s*2020\s*1 January 2026/i;
    const replacementTable = `
| | 2020 Circular | 2025 Directions |
| --- | --- | --- |
| Who can participate | Banks and NBFCs, priority sector focus | Commercial banks, AIFIs, and all NBFCs, wider scope |
| Minimum retention | 20% for the NBFC | 10% for each lender |
| Interest rate | Flexible, agreement-based | Mandatory blended rate, weighted average |
| Fund transfer timeline | Not strictly defined | 15 calendar days |
| Selective loan purchase | Allowed | Not treated as co-lending |
| Effective date | 2020 | 1 January 2026 |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());
  } else if (blog.slug === 'blended-interest-rate-in-co-lending' || contentToRender.includes('What it is') && contentToRender.includes('Weighted average of each lender')) {
    const tableRegex = /Detail\s*What it is[\s\S]*?The Key Facts Statement, along with the APR/i;
    const replacementTable = `
| | Detail |
| --- | --- |
| What it is | One interest rate charged to the borrower in a co-lending loan |
| How it is calculated | Weighted average of each lender’s rate, by funding share |
| Formula | (Bank share × Bank rate) + (NBFC share × NBFC rate) |
| When it must be updated | Whenever either lender changes its rate |
| Required from | 1 January 2026, under RBI’s 2025 Directions |
| Must be disclosed in | The Key Facts Statement, along with the APR |
`;
    contentToRender = contentToRender.replace(tableRegex, replacementTable.trim());
  } else if (blog.slug === 'what-is-a-syndicated-loan' || contentToRender.includes('Advantages and Disadvantages of Loan Syndication')) {
    const borrowerTableRegex = /For Borrowers\s*Advantages\s*Disadvantages[\s\S]*?Less flexibility to renegotiate terms with just one lender later/i;
    const replacementBorrower = `### For Borrowers\n\n| Advantages | Disadvantages |\n| --- | --- |\n| Access to much larger capital than any single lender could offer | Takes longer to close than a bilateral loan, since every lender runs its own due diligence |\n| Often more competitive pricing, as lenders compete for attractive deals | Heavier documentation, with legal and administrative costs passed on to the borrower |\n| One set of terms and one point of contact, despite multiple lenders | Amendments or waivers need syndicate-wide agreement, which can slow decisions down |\n| Builds relationships with several banks through a single transaction | Less flexibility to renegotiate terms with just one lender later |`;
    contentToRender = contentToRender.replace(borrowerTableRegex, replacementBorrower.trim());

    const lenderTableRegex = /For Lenders\s*Advantages\s*Disadvantages[\s\S]*?Tracking allocations and repayments across lenders needs strong operational systems/i;
    const replacementLender = `### For Lenders\n\n| Advantages | Disadvantages |\n| --- | --- |\n| Risk diversification, with no single borrower dominating the balance sheet | Heavy reliance on the lead arranger’s credit assessment |\n| Access to large, fee-generating deals they could not fund alone | Limited control over deal terms, since the arranger negotiates them |\n| Steady servicing and arrangement fee income over the loan’s life | Amendments and waivers need group agreement, which can be slow |\n| Less origination effort, since the arranger leads structuring and documentation | Tracking allocations and repayments across lenders needs strong operational systems |`;
    contentToRender = contentToRender.replace(lenderTableRegex, replacementLender.trim());

    const vsTableRegex = /Loan Syndication\s*Co-Lending\s*Who’s involved[\s\S]*?RBI Co-Lending Arrangements Directions, 2025/i;
    const replacementVs = `| | Loan Syndication | Co-Lending |\n| --- | --- | --- |\n| Who’s involved | Multiple banks, led by one arranger | Typically a bank and an NBFC |\n| Underwriting | Lenders rely largely on the lead arranger’s assessment | Each lender underwrites independently |\n| When the second lender joins | Before disbursal, as part of a formed syndicate | Before disbursal, jointly from origination |\n| Common use case | Large corporate loans, project finance, acquisitions | Retail and MSME lending |\n| Borrower-facing rate | Can vary by each lender’s own pricing within the syndicate | One mandatory blended rate under RBI’s 2025 Directions |\n| Governed by | Multiple banking and consortium norms | RBI Co-Lending Arrangements Directions, 2025 |`;
    contentToRender = contentToRender.replace(vsTableRegex, replacementVs.trim());
  }

  if (blog.slug.includes('upi') || blog.slug.includes('mdr') || /Type of payment\s*MDR/i.test(contentToRender) || /Payment method\s*Typical merchant charge/i.test(contentToRender)) {
    const upiTableDataRegex = /Type of payment\s*MDR[\s\S]*?Follows separate credit product rules/gi;
    const upiTableReplacement = `
| Type of payment | MDR |
| --- | --- |
| P2P transfers (including self-transfers) | No MDR |
| Payments to merchants up to ₹2,000 | No MDR |
| Payments to merchants above ₹2,000 | 0.4% |
| Payments of ₹75,000 and above | Capped at ₹300 |
| Railways, telecom, insurance, fuel and similar sectors, above ₹2,000 | Flat ₹5 |
| Capital market payments (mutual funds, brokers) | 0.02%, max ₹300 |
| Small merchants under P2PM (up to ₹1 lakh a month via QR) | No MDR |
| UPI AutoPay mandates | No MDR |
| Credit-linked UPI (like RuPay credit card or credit line on UPI) | Follows separate credit product rules |
`;
    contentToRender = contentToRender.replace(upiTableDataRegex, upiTableReplacement.trim());

    const cardTableDataRegex = /Payment method\s*Typical merchant charge[\s\S]*?Around 1\.5% to 2\.5%/gi;
    const cardTableReplacement = `
| Payment method | Typical merchant charge |
| --- | --- |
| UPI (above ₹2,000) | 0.4%, capped at ₹300 |
| Debit cards | Up to 0.90% |
| Credit cards | Around 1.5% to 2.5% |
`;
    contentToRender = contentToRender.replace(cardTableDataRegex, cardTableReplacement.trim());
  }


  const isCoLendingTableStyle = blog.slug === 'what-is-co-lending-and-how-does-it-work' || blog.slug === 'how-to-choose-co-lending-platform' || blog.slug === 'co-lending-integration-checklist' || blog.slug === 'rbi-co-lending-arrangements-directions' || blog.slug === 'blended-interest-rate-in-co-lending' || blog.slug === 'what-is-a-syndicated-loan';
  const isUpiMdrTableStyle = blog.slug.includes('upi') || blog.slug.includes('mdr') || contentToRender.includes('Type of payment') || contentToRender.includes('Payment method');

  return (
    <div className="bg-gray-50">
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="flex justify-center mb-10 px-4 pt-10">
        <div className="relative w-full max-w-2xl h-[22rem] md:h-[26rem] bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden group">
          <Image
            src={`${process.env.STRAPI_IMG_URL}${blog.banner.url}`}
            alt={blog.title}
            fill
            className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      </div>
      <article className="max-w-3xl mx-auto px-4 py-12 bg-gray-50">
        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-4">
          {blog.title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
          <span className="font-medium">{blog.author}</span>
          <span>•</span>
          <time>{formatDate(blog.published_on)}</time>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg prose-gray max-w-none mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-slate-900" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold mb-2" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-xl font-semibold mb-3 mt-5 scroll-m-20" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <h5 className="text-lg font-medium mb-2 mt-4 scroll-m-20" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <h6 className="text-base font-medium mb-1 mt-3 scroll-m-20 uppercase tracking-wide text-gray-600" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-4" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-6 mb-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal ml-6 mb-4" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-blue-600 hover:underline" {...props} />
              ),
              table: ({ node, ...props }) => {
                return (
                  <div className={isUpiMdrTableStyle ? "my-8 border border-black overflow-hidden shadow-sm" : isCoLendingTableStyle ? "my-8 border border-black overflow-hidden" : "my-8 border border-gray-300 rounded-lg shadow-sm overflow-hidden"}>
                    <div className="overflow-x-auto">
                      <table className={isUpiMdrTableStyle || isCoLendingTableStyle ? "min-w-full text-left border-collapse" : "min-w-full divide-y divide-gray-200 text-left border-collapse"} {...props} />
                    </div>
                  </div>
                );
              },
              thead: ({ node, ...props }) => {
                let theadClass = "bg-[#0e2749] text-white";
                if (isUpiMdrTableStyle) {
                  theadClass = "bg-[#3574DE] text-white font-bold";
                } else if (isCoLendingTableStyle) {
                  theadClass = "bg-[#a4c2cb] text-black font-semibold";
                }
                return (
                  <thead className={theadClass} {...props} />
                );
              },
              th: ({ node, isHeader, ...props }: any) => {
                return (
                  <th className={isUpiMdrTableStyle ? "px-5 py-3.5 text-sm font-bold border border-black text-left text-white" : isCoLendingTableStyle ? "px-6 py-4 text-sm font-bold border border-black text-center" : "px-6 py-4 text-sm font-semibold border-b border-gray-300 border-r last:border-r-0"} {...props} />
                );
              },
              tbody: ({ node, ...props }) => (
                <tbody className="bg-white divide-y divide-gray-200" {...props} />
              ),
              tr: ({ node, isHeader, ...props }: any) => {
                return (
                  <tr className={isUpiMdrTableStyle || isCoLendingTableStyle ? "" : "even:bg-slate-50"} {...props} />
                );
              },
              td: ({ node, isHeader, ...props }: any) => {
                return (
                  <td className={isUpiMdrTableStyle ? "px-5 py-3 text-sm text-black border border-black text-left font-medium" : isCoLendingTableStyle ? "px-6 py-4 text-sm text-black border border-black" : "px-6 py-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"} {...props} />
                );
              },
            }}

          >
            {contentToRender}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
