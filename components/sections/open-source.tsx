import { ArrowUpRight, GitPullRequest, GitMerge } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import type { MergedPullRequest } from "@/lib/github";

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

// Server-rendered: PRs are fetched in app/page.tsx so they're in the page HTML
export default function OpenSource({
  pullRequests,
}: {
  pullRequests: MergedPullRequest[] | null;
}) {
  const githubUsername = siteConfig.githubUsername;
  const allContributionsUrl = `https://github.com/pulls?q=${encodeURIComponent(
    `author:${githubUsername} is:merged -user:${githubUsername}`,
  )}`;

  return (
    <section
      id="opensource"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-overlay/5"
    >
      <div>
        <SectionHeading title="Open Source Contributions" />

        {pullRequests === null ? (
          <p className="text-sm text-muted">
            Couldn&apos;t load contributions right now.{" "}
            <a
              href={allContributionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-foreground text-foreground hover:border-muted transition-colors"
            >
              View them on GitHub
            </a>
          </p>
        ) : pullRequests.length === 0 ? (
          <p className="text-sm text-muted">No merged pull requests yet.</p>
        ) : (
          <div className="glass rounded-md p-2 space-y-1">
            {pullRequests.map((pr) => (
              <article key={pr.url} className="group">
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-2 px-4 py-3 rounded-md hover:bg-overlay/5 transition-colors"
                >
                  {/* Repository Name */}
                  <div className="flex items-center gap-2 text-xs text-muted">
                    {/* GitHub colors per theme: purple for merged, green for the pull request */}
                    <GitMerge className="h-3.5 w-3.5 text-[#8250df] dark:text-[#a371f7]" />
                    <span className="font-medium">{pr.repo}</span>
                    <span>•</span>
                    <time dateTime={pr.mergedAt}>{formatDate(pr.mergedAt)}</time>
                  </div>

                  {/* PR Title */}
                  <div className="flex items-start gap-2">
                    <GitPullRequest className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#1a7f37] dark:text-[#3fb950]" />
                    <h3 className="text-base leading-relaxed flex-1">
                      {pr.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}

        {pullRequests && pullRequests.length > 0 && (
          <div className="mt-12">
            <a
              href={allContributionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm border-b border-foreground hover:border-muted transition-colors"
            >
              View all contributions
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
