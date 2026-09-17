import { siteConfig } from "@/config/site";
import { getContributions, getMergedPullRequests } from "@/lib/github";
import { profileMarkdown } from "@/lib/llms";

// Regenerated hourly like the homepage, so the open source list stays current
export const revalidate = 3600;

export async function GET() {
  const [pullRequests, contributions] = await Promise.all([
    getMergedPullRequests(siteConfig.githubUsername),
    getContributions(siteConfig.githubUsername),
  ]);
  return new Response(profileMarkdown({ pullRequests, contributions }), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
