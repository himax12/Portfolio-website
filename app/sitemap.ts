import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}${siteConfig.links.resume}`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/blogs`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/llms.txt`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
