// import Image from "next/image";

// export default function BNPLWorkflow({ data }: any) {

//   console.log("BNPLWorkflow data:", JSON.stringify(data, null, 2));

//   // Handle multiple Strapi image response formats
//   let imageUrl = null;
//   if (data?.image) {
//     if (typeof data.image === 'string') {
//       imageUrl = data.image;
//     } else if (data.image.url) {
//       imageUrl = data.image.url;
//     } else if (data.image.data) {
//       if (Array.isArray(data.image.data)) {
//         imageUrl = data.image.data[0]?.attributes?.url;
//       } else {
//         imageUrl = data.image.data.attributes?.url;
//       }
//     }
//   }

//   console.log("Extracted imageUrl:", imageUrl);

//   return (
//     <section className="py-20 bg-[purple] text-white">
//       <div className="max-w-7xl mx-auto px-6 lg:px-16">

//         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
//           {data.title}
//         </h2>

//         <div className="grid lg:grid-cols-3 gap-12 items-center">

//           {/* LEFT FEATURES */}
//           <div className="space-y-10">
//             {data.left_features?.map((item: any, i: number) => (
//               <div key={i} className="border-l-4 border-white pl-6">
//                 <h4 className="text-xl font-bold mb-2">{item.title}</h4>
//                 <p className="text-white/90 leading-relaxed">{item.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* CENTER IMAGE */}
//          {/* CENTER IMAGE */}
// <div className="flex justify-center items-center relative" style={{ minHeight: "600px" }}>

//   {/* Rotating Ring */}
//   <div className="gradient-ring"></div>

//   {/* Glow */}
//   <div className="absolute w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse-glow"></div>

//   {/* Floating particles */}
//   <div className="absolute top-20 left-20 w-3 h-3 bg-white rounded-full animate-float-random"></div>
//   <div className="absolute bottom-20 right-20 w-4 h-4 bg-pink-300 rounded-full animate-float-random"></div>
//   <div className="absolute top-1/2 right-10 w-2 h-2 bg-purple-300 rounded-full animate-float-random"></div>

//   {/* Main Image */}
//   {imageUrl && (
//     <div className="center-image animate-float-smooth">
//       <Image
//         src={`${process.env.NEXT_PUBLIC_STRAPI_IMG_URL}${imageUrl}`}
//         alt="BNPL"
//         width={500}
//         height={500}
//         className="object-contain drop-shadow-2xl"
//       />
//     </div>
//   )}

// </div>

//           {/* RIGHT FEATURES */}
//           <div className="space-y-10">
//             {data.right_features?.map((item: any, i: number) => (
//               <div key={i} className="border-l-4 border-white pl-6">
//                 <h4 className="text-xl font-bold mb-2">{item.title}</h4>
//                 <p className="text-white/90 leading-relaxed">{item.description}</p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }