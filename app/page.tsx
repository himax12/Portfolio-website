import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import CodingStats from "@/components/sections/coding-stats";
import GitHubActivity from "@/components/sections/github-activity";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBeams />
      <div className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <CodingStats />
        <GitHubActivity />
      </div>
    </main>
  );
}
