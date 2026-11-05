"use client";
import { useEffect } from 'react';

export default function ScrollSpy({ sectionIds }: { sectionIds: string[] }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const links = document.querySelectorAll('.toc-link');
            links.forEach(link => {
              link.classList.remove('bg-[#623f99]/10', 'border-[#623f99]', 'text-[#623f99]', 'font-medium');
              link.classList.add('border-transparent', 'text-gray-600');
            });
            const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
            if (active) {
              active.classList.add('bg-[#623f99]/10', 'border-[#623f99]', 'text-[#623f99]', 'font-medium');
              active.classList.remove('border-transparent', 'text-gray-600');
            }
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return null;
}
