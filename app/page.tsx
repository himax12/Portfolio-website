import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import OpenSource from "@/components/sections/open-source";
import CodingStats from "@/components/sections/coding-stats";
import GitHubActivity from "@/components/sections/github-activity";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Bottom padding keeps the fixed social bar from covering the last section */}
      <main className="min-h-screen relative z-10 pb-24">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <GitHubActivity />
        <TechStack />
        <CodingStats />
      </main>
    </>
  );
}
