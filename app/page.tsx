import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import TechStack from "@/components/sections/tech-stack";
import Projects from "@/components/sections/projects";
import OpenSource from "@/components/sections/open-source";
import Blog from "@/components/sections/blog";
import GitHubActivity from "@/components/sections/github-activity";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Blog />
        <GitHubActivity />
        <TechStack />
      </main>
    </>
  );
}
