"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitPullRequest, GitMerge } from "lucide-react";
import { useEffect, useState } from "react";

interface PullRequest {
  title: string;
  html_url: string;
  repository_url: string;
  merged_at: string;
  repo_name: string;
}

export default function OpenSource() {
  const [mergedPRs, setMergedPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const githubUsername = "himax12"; // Update with your GitHub username

  useEffect(() => {
    const fetchMergedPRs = async () => {
      try {
        // Fetch user's pull requests
        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${githubUsername}+type:pr+is:merged&sort=created&order=desc&per_page=10`
        );
        const data = await response.json();

        const prs = data.items?.map((pr: any) => ({
          title: pr.title,
          html_url: pr.html_url,
          repository_url: pr.repository_url,
          merged_at: pr.closed_at,
          repo_name: pr.repository_url.split("/").slice(-2).join("/"),
        })) || [];

        setMergedPRs(prs);
      } catch (error) {
        console.error("Error fetching merged PRs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMergedPRs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section
      id="opensource"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-medium uppercase tracking-wider text-muted"
        >
          Open Source Contributions
        </motion.h2>

        {loading ? (
          <div className="text-sm text-muted">Loading contributions...</div>
        ) : mergedPRs.length === 0 ? (
          <div className="text-sm text-muted">
            No merged pull requests found yet.
          </div>
        ) : (
          <div className="space-y-6">
            {mergedPRs.map((pr, index) => (
              <motion.article
                key={pr.html_url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-2 hover:opacity-70 transition-opacity"
                >
                  {/* Repository Name */}
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <GitMerge className="h-3.5 w-3.5 text-green-500" />
                    <span className="font-medium">{pr.repo_name}</span>
                    <span>•</span>
                    <span>{formatDate(pr.merged_at)}</span>
                  </div>

                  {/* PR Title */}
                  <div className="flex items-start gap-2">
                    <GitPullRequest className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <h3 className="text-base leading-relaxed flex-1">
                      {pr.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        )}

        {/* View More Link */}
        {mergedPRs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <a
              href={`https://github.com/pulls?q=author:${githubUsername}+is:merged`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm border-b border-foreground hover:border-muted transition-colors"
            >
              View all contributions
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
