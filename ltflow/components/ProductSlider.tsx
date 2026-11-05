// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Solution } from "@/utils/Solution";
// import { fetchSolutions } from "@/services/solutionsService";

// const ProductSlider: React.FC = () => {
//   const [solutions, setSolutions] = useState<Solution[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSolutions({ page: 1, pageSize: 9 })
//       .then(({ solutions }) => setSolutions(solutions || []))
//       .catch((error) => console.error("Error fetching solutions:", error))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <section className="pt-4 pb-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-[30px] font-bold text-[#1d2c4d] text-center mb-10">
//           Our Solutions
//         </h2>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {loading
//             ? Array.from({ length: 9 }).map((_, idx) => (
//                 <div key={idx} className="animate-pulse bg-white rounded-lg shadow-md h-80" />
//               ))
//             : solutions.length > 0
//             ? solutions.map((solution) => (
//                 <div key={solution.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
//                   <div className="relative h-60 overflow-hidden bg-gradient-to-br from-[#8B5FBF] to-[#A855F7] flex items-center justify-center p-4">
//                     <div className="relative w-48 h-48">
//                       <Image
//                         src={`${process.env.NEXT_PUBLIC_STRAPI_IMG_URL || 'http://localhost:1337'}${solution.banner.url}`}
//                         alt={solution.banner.alt || solution.title}
//                         fill
//                         className="object-contain"
//                       />
//                     </div>
//                   </div>
//                   <div className="px-6 py-6 flex flex-col flex-1 justify-between">
//                     <h3 className="text-lg text-center font-semibold break-words line-clamp-2 hover:line-clamp-none">
//                       <Link href={`/solutions/${solution.slug}`} className="hover:underline">
//                         {solution.title}
//                       </Link>
//                     </h3>
//                   </div>
//                 </div>
//               ))
//             : <p className="col-span-full text-center text-gray-500">No solutions available.</p>
//           }
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSlider;
