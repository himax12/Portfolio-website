import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import OpenSourceOrg from "@/components/ui/open-source-org";
import { mergedPullRequestsQuery, type MergedPullRequest } from "@/lib/github";

// Server-rendered: PRs are fetched in app/page.tsx so they're in the page HTML.
// Shown as one tile per repository, most recently merged first.
export default function OpenSource({
  pullRequests,
}: {
  pullRequests: MergedPullRequest[] | null;
}) {
  const username = siteConfig.githubUsername;
  const allContributionsUrl = `https://github.com/pulls?q=${encodeURIComponent(mergedPullRequestsQuery(username))}`;

  // PRs arrive newest first, so insertion order keeps repos sorted by latest merge
  const byRepo = new Map<string, MergedPullRequest[]>();
  for (const pr of pullRequests ?? []) {
    byRepo.set(pr.repo, [...(byRepo.get(pr.repo) ?? []), pr]);
  }

  return (
    <section id="opensource" className="section">
      <SectionHeading
        title="Open Source"
        action={
          pullRequests?.length ? (
            <a
              href={allContributionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-[13px] text-muted hover:text-foreground transition-colors"
            >
              {pullRequests.length} merged PRs · {byRepo.size} projects
              <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : null
        }
      />

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
        // Thin separators between tiles, like a segmented row
        // Up to five tiles per row on larger screens, so a few repos still fill the width
        <ul
          style={{ "--cols": Math.min(byRepo.size, 5) } as React.CSSProperties}
          className="grid grid-cols-3 sm:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-y-2 [&>li+li]:before:absolute [&>li+li]:before:left-0 [&>li+li]:before:top-[18%] [&>li+li]:before:bottom-[18%] [&>li+li]:before:border-l [&>li+li]:before:border-overlay/10 [&>li+li]:before:content-['']"
        >
          {Array.from(byRepo, ([repo, prs]) => (
            <OpenSourceOrg key={repo} repo={repo} pullRequests={prs} />
          ))}
        </ul>
      )}
    </section>
  );
}
