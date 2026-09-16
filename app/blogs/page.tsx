import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import SectionHeading from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  // Rendered as "Blogs | Himanshu Gupta" via the title template in app/layout.tsx
  title: "Blogs",
  description: `Blog posts by ${siteConfig.name}.`,
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      {/* Bottom padding keeps the fixed social bar from covering content */}
      <main className="min-h-screen relative z-10 pb-24">
        <section className="px-6 sm:px-8 lg:px-12 pt-32 pb-24">
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
