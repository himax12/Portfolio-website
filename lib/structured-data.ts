import { siteConfig } from "@/config/site";

// schema.org graph for search engines and AI assistants: who the site is about,
// where they work and study, their profiles, and their projects
export function homepageStructuredData() {
  const { url, name } = siteConfig;
  const personId = `${url}/#person`;
  const stack = Object.values(siteConfig.stack).flat();
  // Only current roles (no endDate) count as the person's employer
  const currentEmployers = siteConfig.experience
    .filter((role) => !role.endDate)
    .map((role) => ({ "@type": "Organization", name: role.company }));

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
        // Handles people search for, tying this page to the same person on other sites
        alternateName: [siteConfig.githubUsername, siteConfig.profiles.x.handle],
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
          name: siteConfig.education.school,
          url: siteConfig.education.website,
        },
        ...(currentEmployers.length ? { worksFor: currentEmployers } : {}),
        knowsAbout: Array.from(new Set(stack)),
        // The resume PDF at /resume describes this person
        subjectOf: {
          "@type": "DigitalDocument",
          name: `${name} - Resume`,
          url: `${url}${siteConfig.links.resume}`,
          encodingFormat: "application/pdf",
        },
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
