import { NextRequest, NextResponse } from "next/server";

// Track unique visitors by IP (resets on server restart)
// For production, use Vercel KV, Upstash Redis, or a database
const uniqueVisitors = new Set<string>();

export async function GET(request: NextRequest) {
  // Get visitor IP from headers
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Add to unique visitors set
  uniqueVisitors.add(ip);

  return NextResponse.json({
    count: uniqueVisitors.size,
    disclaimer:
      "Using in-memory storage. For persistent counts, integrate a database or Vercel KV.",
  });
}

export const dynamic = "force-dynamic";
