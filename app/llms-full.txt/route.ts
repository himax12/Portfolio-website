import { siteConfig } from "@/config/site";
import { getContributions, getMergedPullRequests } from "@/lib/github";
import { profileMarkdown } from "@/lib/llms";

// Same content as /index.md, as plain text per the llms.txt convention; regenerated hourly
export const revalidate = 3600;

export async function GET() {
  const [pullRequests, contributions] = await Promise.all([
    getMergedPullRequests(siteConfig.githubUsername),
    getContributions(siteConfig.githubUsername),
  ]);
  return new Response(profileMarkdown({ pullRequests, contributions }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
