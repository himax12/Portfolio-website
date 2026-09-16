import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import OpenSource from "@/components/sections/open-source";
import GitHubActivity from "@/components/sections/github-activity";
import Footer from "@/components/sections/footer";
import { siteConfig } from "@/config/site";
import { getContributions, getMergedPullRequests } from "@/lib/github";
import { homepageStructuredData } from "@/lib/structured-data";

// Rebuild hourly so GitHub data stays fresh without fetching on every request
export const revalidate = 3600;

export default async function Home() {
  const [pullRequests, contributions] = await Promise.all([
    getMergedPullRequests(siteConfig.githubUsername),
    getContributions(siteConfig.githubUsername),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData()),
        }}
      />
      <Navbar />
      <main className="min-h-screen relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <OpenSource pullRequests={pullRequests} />
        <GitHubActivity initialData={contributions} />
      </main>
      <Footer />
    </>
  );
}
