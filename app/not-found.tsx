import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative z-10 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-32">
        <div className="glass rounded-md p-10 text-center max-w-md w-full">
          <p className="text-6xl font-bold tracking-tight">404</p>
          <p className="mt-3 text-muted">This page doesn&apos;t exist.</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background font-semibold hover:bg-foreground/85 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
