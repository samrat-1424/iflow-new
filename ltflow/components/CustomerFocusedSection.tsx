"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchResources } from "@/services/resourcesService";

interface Resource {
  id: number;
  title: string;
  banner: string;
  content: string;
  slug: string;
}

import Reveal from "./Reveal";

export default function CustomerFocusedSection() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await fetchResources({ pageSize: 100 });
        setResources(data.resources);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  return (
    <Reveal>
      <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-3xl  font-bold">iFLOW</p>
          <h2 className="text-2xl font-medium text-gray-500 text-[#1a2b49] mt-1">
            Curated Solutions For..
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
                <div className="w-full h-56 bg-gray-200"></div>
                <div className="p-6 flex flex-col">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : resources.length === 0 ? (
          <p className="text-center text-gray-500">No resources available at the moment.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {resources.map((item) => (
              <Link
                key={item.id}
                href={`/resources/${item.slug}`}
                className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                {item.banner && (
                  <div className="w-full h-56 relative">
                    <Image
                      src={item.banner}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 text-center line-clamp-2 hover:text-[#9a3f91] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
    </Reveal>
  );
}
