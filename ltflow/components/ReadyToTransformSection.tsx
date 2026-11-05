"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReadyToTransformSection() {
  const pathname = usePathname();
  if (pathname === "/book-a-demo" || pathname?.startsWith("/book-a-demo/")) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#623f99] to-[#9a3f91]">
      <div className="absolute inset-0">
        <div className="absolute -left-56 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-white/10" />
        <div className="absolute -left-28 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-white/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div> 
      
      
        
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-14 py-14">
        <div className="max-w-3xl">
          <p className="text-small font-semibold tracking-widest text-[#F26522] ">
            READY TO TRANSFORM?
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Let&apos;s build the future of lending together.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Join 95+ financial institutions that trust iFLOW for their digital lending
            infrastructure. Schedule a demo to see how we can accelerate your lending
            operations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-7 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Schedule a Demo
              <span className="ml-3 text-lg leading-none">→</span>
            </Link>
            {/* <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white hover:bg-white/15"
            >
              Contact Us
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
