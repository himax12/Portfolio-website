import type { Activity } from "react-activity-calendar";
import { siteConfig } from "@/config/site";

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

// GitHub search for merged PRs to other people's repositories: own repos, forks and
// excluded work organizations don't count as open source contributions
export const mergedPullRequestsQuery = (username: string) =>
  [
    `author:${username}`,
    "type:pr",
    "is:merged",
    `-user:${username}`,
    ...siteConfig.openSourceExcludedOwners.map((owner) => `-org:${owner}`),
  ].join(" ");

// Optional token raises the search API limit; the site works without it
const githubHeaders = (): HeadersInit =>
  process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

// Merged open source PRs (see mergedPullRequestsQuery). Returns null on failure.
export async function getMergedPullRequests(
  username: string,
  limit = 10,
): Promise<MergedPullRequest[] | null> {
  const query = encodeURIComponent(mergedPullRequestsQuery(username));
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

export type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  followers: number;
  publicRepos: number;
};

// Public profile for the GitHub hover card; returns null on failure
export async function getGitHubProfile(
  username: string,
): Promise<GitHubProfile | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const user = await res.json();
    return {
      login: user.login,
      name: user.name,
      bio: user.bio?.trim() || null,
      avatarUrl: user.avatar_url,
      followers: user.followers,
      publicRepos: user.public_repos,
    };
  } catch {
    return null;
  }
}
