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
