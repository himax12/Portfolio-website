import type { Activity } from "react-activity-calendar";

// Server-side GitHub data, cached with ISR so the page ships real content in its HTML
// and visitors never hit GitHub's unauthenticated rate limits from their browser
const REVALIDATE_SECONDS = 60 * 60;

export type MergedPullRequest = {
  title: string;
  url: string;
  repo: string;
  mergedAt: string;
};

export type ContributionData = { contributions: Activity[]; total: number };

// Optional token raises the search API limit; the site works without it
const githubHeaders = (): HeadersInit =>
  process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

// Merged PRs to other people's repositories (own repos and forks are excluded,
// since those aren't open source contributions). Returns null on failure.
export async function getMergedPullRequests(
  username: string,
  limit = 10,
): Promise<MergedPullRequest[] | null> {
  const query = encodeURIComponent(
    `author:${username} type:pr is:merged -user:${username}`,
  );
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=${query}&sort=created&order=desc&per_page=${limit}`,
      { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.items ?? []).map(
      (item: {
        title: string;
        html_url: string;
        repository_url: string;
        closed_at: string;
        pull_request?: { merged_at?: string | null };
      }) => ({
        title: item.title,
        url: item.html_url,
        repo: item.repository_url.split("/").slice(-2).join("/"),
        mergedAt: item.pull_request?.merged_at ?? item.closed_at,
      }),
    );
  } catch {
    return null;
  }
}

export async function getContributions(
  username: string,
): Promise<ContributionData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return { contributions: json.contributions, total: json.total.lastYear };
  } catch {
    return null;
  }
}
