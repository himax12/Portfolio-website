import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import CodingStats from "@/components/sections/coding-stats";
import GitHubActivity from "@/components/sections/github-activity";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blog />
        <GitHubActivity />
        <TechStack />
        <CodingStats />
      </main>
    </>
  );
}
