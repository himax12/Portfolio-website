import { llmsTxt } from "@/lib/llms";

// Regenerated with the site; served as a static file
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
