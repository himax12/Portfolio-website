"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import type { CompactContributions } from "@/lib/contributions";

// The calendar sits a long way below the fold and its markup is a year of dated
// cells, so it stays out of the server payload and only loads once it is scrolled near.
const GitHubActivity = dynamic(() => import("./github-activity"), { ssr: false });

// Start loading a little before the section is reached, so it is ready on arrival
const ROOT_MARGIN = "300px";

export default function GitHubActivityLazy({
  initialData,
}: {
  initialData: CompactContributions | null;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Without IntersectionObserver, just render it
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (show) return <GitHubActivity initialData={initialData} />;

  return (
    <section id="github" className="section">
      <div ref={ref}>
        <SectionHeading title="GitHub Activity" />
        {/* Same height as the loaded panel, so nothing below it shifts */}
        <div className="glass h-[180px] rounded-md p-4 sm:p-[18px]" />
      </div>
    </section>
  );
}
