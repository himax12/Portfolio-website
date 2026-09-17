import { siteConfig } from "@/config/site";
import { experienceLabel } from "@/lib/experience";
import type { ContributionData, MergedPullRequest } from "@/lib/github";

// Live GitHub data for the Open source section; each part is left out if its fetch failed
export type OpenSourceData = {
  pullRequests: MergedPullRequest[] | null;
  contributions: ContributionData | null;
};

// Stack group keys are lowercase identifiers; some need a proper label
const STACK_LABELS: Record<string, string> = { ai: "AI / ML" };

const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

// Plain-text/Markdown views of the portfolio for AI assistants (llmstxt.org),
// generated from siteConfig so they never drift from the site itself

const links = () =>
  [
    `- [GitHub](${siteConfig.links.github})`,
    `- [LinkedIn](${siteConfig.links.linkedin})`,
    `- [X / Twitter](${siteConfig.links.twitter})`,
    `- [Codolio coding profile](${siteConfig.codingProfiles.codolio})`,
    `- [Resume (PDF)](${siteConfig.url}${siteConfig.links.resume})`,
    `- [Book a call](${siteConfig.links.calendar})`,
    `- Email: ${siteConfig.links.email}`,
  ].join("\n");

const projectLine = (project: (typeof siteConfig.projects)[number]) =>
  `- [${project.title}](${project.liveUrl || project.githubUrl}): ${project.description} (${project.tags.join(", ")})`;

export function llmsTxt() {
  return `# ${siteConfig.name}

> ${siteConfig.shortDescription}

${siteConfig.name} is a ${siteConfig.title} based in ${siteConfig.location}.

Every page is also available as Markdown: request it with \`Accept: text/markdown\`, or use the .md URLs below.

## Profile

- [Portfolio](${siteConfig.url})
- [Full profile for LLMs](${siteConfig.url}/llms-full.txt)
- [Markdown version of the homepage](${siteConfig.url}/index.md)
${links()}

## Projects

${siteConfig.projects.map(projectLine).join("\n")}

## Optional

- [Blog](${siteConfig.url}/blogs) ([Markdown](${siteConfig.url}/blogs.md))
`;
}

function openSourceMarkdown({ pullRequests, contributions }: OpenSourceData) {
  const username = siteConfig.githubUsername;
  const allMerged = `https://github.com/pulls?q=${encodeURIComponent(`author:${username} is:merged -user:${username}`)}`;
  const recent = pullRequests
    ?.map((pr) => `- [${pr.title}](${pr.url}) (${pr.repo}, merged ${monthYear(pr.mergedAt)})`)
    .join("\n");

  return [
    contributions &&
      `${contributions.total} GitHub contributions in the last year: https://github.com/${username}`,
    recent && `Recent pull requests merged into other projects:\n\n${recent}`,
    `All merged pull requests to other projects: ${allMerged}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function profileMarkdown(
  openSource: OpenSourceData = { pullRequests: null, contributions: null },
) {
  const experience = experienceLabel(siteConfig.experience);
  const roles = siteConfig.experience
    .map(
      (role) =>
        // Summary and highlights are optional per role
        [
          `### ${role.role} at ${role.website ? `[${role.company}](${role.website})` : role.company} (${role.duration})`,
          role.summary,
          role.highlights?.map((item) => `- ${item}`).join("\n"),
          `Technologies: ${role.technologies.join(", ")}`,
        ]
          .filter(Boolean)
          .join("\n\n"),
    )
    .join("\n\n");
  const projects = siteConfig.projects
    .map(
      (project) => `### ${project.title}${project.context ? ` (${project.context})` : ""}

${project.description}

- Tech: ${project.tags.join(", ")}
- Source: ${project.githubUrl}${project.liveUrl && project.liveUrl !== project.githubUrl ? `\n- Live: ${project.liveUrl}` : ""}`,
    )
    .join("\n\n");
  const stack = Object.entries(siteConfig.stack)
    .map(
      ([group, items]) =>
        `- ${STACK_LABELS[group] ?? group[0].toUpperCase() + group.slice(1)}: ${items.join(", ")}`,
    )
    .join("\n");

  return `# ${siteConfig.name} - ${siteConfig.title}

> ${siteConfig.shortDescription}

- Location: ${siteConfig.location}
- Education: ${siteConfig.education}
- Experience: ${experience}
- Website: ${siteConfig.url}

## About

${siteConfig.description}

## Experience

${roles}

## Projects

${projects}

## Tech stack

${stack}

## Open source

${openSourceMarkdown(openSource)}

## Links

${links()}
`;
}

export function blogsMarkdown() {
  return `# Blogs - ${siteConfig.name}

No posts yet.

- [Portfolio](${siteConfig.url})
- [Full profile (Markdown)](${siteConfig.url}/index.md)
`;
}
