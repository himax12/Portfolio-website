import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  // Rendered as "Blogs | Himanshu Gupta" via the title template in app/layout.tsx
  title: "Blogs",
  description: `Blog posts by ${siteConfig.name}.`,
  // Kept out of search results until there are posts; links on it are still followed
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/blogs",
    types: { "text/markdown": "/blogs.md" },
  },
};

export default function BlogsPage() {
  return (
    <>
      {/* Bottom padding keeps the fixed social bar from covering content */}
      <main className="min-h-screen relative z-10 pb-24">
        <section className="px-6 sm:px-10 pt-14 pb-10">
          <SectionHeading title="Blogs" />
          <div className="glass rounded-md p-8 text-center">
            <p className="text-base text-muted">Nothing to display</p>
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </section>
      </main>
    </>
  );
}
