import { blogsMarkdown } from "@/lib/llms";

// Markdown version of /blogs for AI assistants; served as a static file
export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new Response(blogsMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
