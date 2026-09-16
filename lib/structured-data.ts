import { siteConfig } from "@/config/site";

// schema.org graph for search engines and AI assistants: who the site is about,
// where they work and study, their profiles, and their projects
export function homepageStructuredData() {
  const { url, name } = siteConfig;
  const personId = `${url}/#person`;
  const stack = Object.values(siteConfig.stack).flat();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: `${name} - ${siteConfig.title}`,
        description: siteConfig.shortDescription,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profile`,
        url,
        name: `${name} - ${siteConfig.title}`,
        isPartOf: { "@id": `${url}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name,
        url,
        image: `${url}${siteConfig.profileImage}`,
        jobTitle: siteConfig.title,
        description: siteConfig.shortDescription,
        email: `mailto:${siteConfig.links.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Delhi",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Maharaja Agrasen Institute of Technology",
        },
        worksFor: siteConfig.experience.map((role) => ({
          "@type": "Organization",
          name: role.company,
        })),
        knowsAbout: Array.from(new Set(stack)),
        sameAs: [
          siteConfig.links.github,
          siteConfig.links.linkedin,
          siteConfig.links.twitter,
          siteConfig.codingProfiles.codolio,
        ],
      },
      ...siteConfig.projects.map((project) => ({
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        codeRepository: project.githubUrl,
        ...(project.liveUrl ? { url: project.liveUrl } : {}),
        keywords: project.tags.join(", "),
        author: { "@id": personId },
      })),
    ],
  };
}
