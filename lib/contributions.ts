import type { Activity } from "react-activity-calendar";
import type { ContributionData } from "@/lib/github";
// GitHub's dark-mode contribution colors, from empty to busiest; shared by every heatmap
export const CONTRIBUTION_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

// Tooltip text for a single contribution day, shared by every heatmap
export function formatContribution(date: string, count: number) {
  // Parse as a local date; `new Date("yyyy-mm-dd")` is UTC and can shift the day
  const [year, month, day] = date.split("-").map(Number);
  const label = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (count === 0) return `No contributions on ${label}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

// A year of days costs ~16 KB as objects in the server payload, and Next.js serialises
// it more than once. Sending a start date, the counts and one digit of level per day
// carries the same information in a fraction of the bytes.
export type CompactContributions = {
  start: string;
  counts: number[];
  levels: string;
  total: number;
};

export function packContributions({ contributions, total }: ContributionData): CompactContributions {
  return {
    start: contributions[0]?.date ?? "",
    counts: contributions.map((day) => day.count),
    levels: contributions.map((day) => day.level).join(""),
    total,
  };
}

export function unpackContributions({
  start,
  counts,
  levels,
  total,
}: CompactContributions): ContributionData {
  const first = new Date(`${start}T00:00:00Z`);
  return {
    total,
    contributions: counts.map((count, index) => {
      const day = new Date(first);
      day.setUTCDate(first.getUTCDate() + index);
      return {
        date: day.toISOString().slice(0, 10),
        count,
        level: Number(levels[index] ?? 0) as Activity["level"],
      };
    }),
  };
}
