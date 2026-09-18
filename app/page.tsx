import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Hackathons from "@/components/sections/hackathons";
import OpenSource from "@/components/sections/open-source";
import GitHubActivity from "@/components/sections/github-activity";
import Education from "@/components/sections/education";
import Footer from "@/components/sections/footer";
import { siteConfig } from "@/config/site";
import {
  getContributions,
  getMergedPullRequests,
  getProjectRepos,
} from "@/lib/github";
import { homepageStructuredData } from "@/lib/structured-data";

// Rebuild hourly so GitHub data stays fresh without fetching on every request
export const revalidate = 3600;

export default async function Home() {
  const [pullRequests, contributions, repos] = await Promise.all([
    getMergedPullRequests(siteConfig.githubUsername),
    getContributions(siteConfig.githubUsername),
    getProjectRepos(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData()),
        }}
      />
      <main className="min-h-screen relative z-10">
        <Hero mergedPullRequests={pullRequests?.length ?? null} />
        <Experience />
        <Projects repos={repos} />
        <Hackathons />
        <OpenSource pullRequests={pullRequests} />
        <Skills />
        <GitHubActivity initialData={contributions} />
        <Education />
      </main>
      <Footer />
    </>
  );
}
