import { NextResponse, type NextRequest } from "next/server";

// Pages that have a Markdown twin
const MARKDOWN_VERSIONS: Record<string, string> = {
  "/": "/index.md",
  "/blogs": "/blogs.md",
};

// Content negotiation: agents that send `Accept: text/markdown` get the Markdown
// version at the same URL, while browsers keep getting HTML
export function middleware(request: NextRequest) {
  const markdownPath = MARKDOWN_VERSIONS[request.nextUrl.pathname];
  const wantsMarkdown = (request.headers.get("accept") ?? "").includes(
    "text/markdown",
  );
  const response =
    markdownPath && wantsMarkdown
      ? NextResponse.rewrite(new URL(markdownPath, request.url))
      : NextResponse.next();
  // Both variants share a URL, so caches must key on the Accept header
  response.headers.set("Vary", "Accept");
  // Advertise the Markdown twin and llms.txt in headers too, so agents find them
  // with a HEAD request instead of parsing HTML
  if (markdownPath) {
    response.headers.set(
      "Link",
      `<${markdownPath}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain"`,
    );
  }
  return response;
}

export const config = { matcher: ["/", "/blogs"] };
