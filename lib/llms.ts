import { siteConfig } from "@/config/site";
import { experienceLabel } from "@/lib/experience";

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

export function profileMarkdown() {
  const experience = experienceLabel(siteConfig.experience);
  const roles = siteConfig.experience
    .map(
      (role) =>
        // Summary and highlights are optional per role
        [
          `### ${role.role} at ${role.company} (${role.duration})`,
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
- Source: ${project.githubUrl}${project.liveUrl ? `\n- Live: ${project.liveUrl}` : ""}`,
    )
    .join("\n\n");
  const stack = Object.entries(siteConfig.stack)
    .map(([group, items]) => `- ${group[0].toUpperCase()}${group.slice(1)}: ${items.join(", ")}`)
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

Merged pull requests to other projects: https://github.com/pulls?q=${encodeURIComponent(`author:${siteConfig.githubUsername} is:merged -user:${siteConfig.githubUsername}`)}

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
