import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";
import { DemoVideoLink, LiveSiteLink, RepoLink } from "@/components/ui/project-links";
import { repoFromUrl, type RepoPreview } from "@/lib/github";
import { cn } from "@/lib/utils";

// Projects sit two to a row; with an odd count the first one spans the full width
// so no row is left half empty. Repo previews come from the server, keyed by
// "owner/repo"; missing ones leave the links plain.
export default function Projects({ repos }: { repos: Record<string, RepoPreview> }) {
  const featureFirst = siteConfig.projects.length % 2 === 1;
  return (
    <section id="projects" className="section">
      <SectionHeading title="Projects" />

      <div className="grid gap-3 sm:grid-cols-2">
        {siteConfig.projects.map((project, index) => {
          // A live link that's just the repo would duplicate the GitHub icon
          const liveUrl = project.liveUrl !== project.githubUrl ? project.liveUrl : "";
          const repoName = repoFromUrl(project.githubUrl);
          return (
            <article
              key={project.title}
              className={cn(
                "reveal glass flex flex-col rounded-md p-[18px]",
                featureFirst && index === 0 && "sm:col-span-2",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{project.title}</h3>
                  {project.context && <p className="mt-0.5 text-xs text-muted">{project.context}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2.5 pt-0.5 text-[13px]">
                  {project.isLive && liveUrl && (
                    <span className="flex items-center gap-1.5 text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </span>
                  )}
                  {liveUrl && (
                    <LiveSiteLink
                      href={liveUrl}
                      preview={project.preview || undefined}
                      title={project.title}
                      className="group/link flex items-center gap-0.5 text-foreground/80 hover:text-foreground transition-colors"
                    />
                  )}
                  {project.demoUrl && (
                    <DemoVideoLink
                      href={project.demoUrl}
                      startSeconds={project.demoStart}
                      poster={project.preview || undefined}
                      title={project.title}
                      className="group/link flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
                    />
                  )}
                  <RepoLink
                    href={project.githubUrl}
                    repo={repoName ? repos[repoName] : undefined}
                    title={project.title}
                    className="text-muted hover:text-foreground transition-colors"
                  />
                </div>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
