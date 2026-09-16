"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import { useTheme } from "@/lib/use-theme";
import ActivityCalendar from "react-activity-calendar";
import type { ContributionData } from "@/lib/github";
import { cloneElement, useEffect, useRef, useState } from "react";

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";
// GitHub's own contribution colors per theme, from empty to busiest
const GITHUB_LIGHT_THEME = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];
const GITHUB_DARK_THEME = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];
const WEEKS_IN_YEAR = 53;
const BLOCK_MARGIN = 3;
// Below the minimum the grid scrolls horizontally instead of shrinking further
const MIN_BLOCK_SIZE = 10;
const MAX_BLOCK_SIZE = 16;
// Keeps the tooltip (roughly 220px wide) from spilling past the panel edges
const TOOLTIP_EDGE_PADDING = 110;
const EDGE_FADE = "32px";

type Tooltip = { text: string; x: number; y: number };

function formatContribution(date: string, count: number) {
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

// initialData comes from the server (ISR); the browser only fetches if that failed
export default function GitHubActivity({
  initialData,
}: {
  initialData: ContributionData | null;
}) {
  const { theme } = useTheme();
  const legendColors = theme === "dark" ? GITHUB_DARK_THEME : GITHUB_LIGHT_THEME;
  const [data, setData] = useState<ContributionData | null>(initialData);
  const [failed, setFailed] = useState(false);
  const [blockSize, setBlockSize] = useState(12);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [edgeFades, setEdgeFades] = useState({ left: false, right: false });
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) return;
    fetch(`${CONTRIBUTIONS_API}/${siteConfig.githubUsername}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) =>
        setData({ contributions: json.contributions, total: json.total.lastYear }),
      )
      .catch(() => setFailed(true));
  }, [initialData]);

  // With the scrollbar hidden, fade whichever edge has more weeks to scroll to
  const updateEdgeFades = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setEdgeFades({
      left: scroller.scrollLeft > 1,
      right: scroller.scrollLeft < maxScroll - 1,
    });
  };

  // Size blocks so a full year fills the panel width
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new ResizeObserver(() => {
      const fitted =
        Math.floor((scroller.clientWidth + BLOCK_MARGIN) / WEEKS_IN_YEAR) -
        BLOCK_MARGIN;
      setBlockSize(Math.min(MAX_BLOCK_SIZE, Math.max(MIN_BLOCK_SIZE, fitted)));
      // On narrow screens start scrolled to the most recent weeks
      requestAnimationFrame(() => {
        scroller.scrollLeft = scroller.scrollWidth;
        updateEdgeFades();
      });
    });
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  const showTooltip = (target: Element, text: string) => {
    const panel = panelRef.current;
    if (!panel) return;
    const block = target.getBoundingClientRect();
    const bounds = panel.getBoundingClientRect();
    const x = block.left + block.width / 2 - bounds.left;
    setTooltip({
      text,
      x: Math.min(
        Math.max(x, TOOLTIP_EDGE_PADDING),
        bounds.width - TOOLTIP_EDGE_PADDING,
      ),
      y: block.top - bounds.top,
    });
  };

  const edgeFadeMask =
    edgeFades.left || edgeFades.right
      ? `linear-gradient(to right, ${edgeFades.left ? `transparent, black ${EDGE_FADE}` : "black"}, ${edgeFades.right ? `black calc(100% - ${EDGE_FADE}), transparent` : "black"})`
      : undefined;

  return (
    <section
      id="github"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-overlay/5"
    >
      <div>
        <SectionHeading
          title="GitHub Activity"
          className="mb-6"
          action={
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-sm border-b border-foreground hover:border-muted transition-colors"
            >
              View Profile
              <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          }
        />

        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onMouseLeave={() => setTooltip(null)}
          className="glass relative rounded-md p-4 sm:p-6"
        >
          {failed ? (
            <p className="text-sm text-muted">
              Couldn&apos;t load contributions right now.
            </p>
          ) : (
            <>
              {/* Only the grid scrolls; the summary row below stays in place */}
              <div
                ref={scrollerRef}
                onScroll={() => {
                  setTooltip(null);
                  updateEdgeFades();
                }}
                style={{ maskImage: edgeFadeMask, WebkitMaskImage: edgeFadeMask }}
                className="overflow-x-auto scrollbar-none"
              >
                <div className="w-max mx-auto">
                  <ActivityCalendar
                    data={data?.contributions ?? []}
                    loading={!data}
                    colorScheme={theme}
                    theme={{ light: GITHUB_LIGHT_THEME, dark: GITHUB_DARK_THEME }}
                    fontSize={14}
                    blockSize={blockSize}
                    blockMargin={BLOCK_MARGIN}
                    hideTotalCount
                    hideColorLegend
                    renderBlock={(block, activity) =>
                      cloneElement(block, {
                        onMouseEnter: (e: React.MouseEvent<SVGRectElement>) =>
                          showTooltip(
                            e.currentTarget,
                            formatContribution(activity.date, activity.count),
                          ),
                        // Tap support on touch devices, where hover doesn't exist
                        onClick: (e: React.MouseEvent<SVGRectElement>) =>
                          showTooltip(
                            e.currentTarget,
                            formatContribution(activity.date, activity.count),
                          ),
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
                <span>
                  {data
                    ? `${data.total} contributions in the last year`
                    : "Loading contributions..."}
                </span>
                <span className="flex items-center gap-[3px] text-muted">
                  <span className="mr-1">Less</span>
                  {legendColors.map((color) => (
                    <span
                      key={color}
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span className="ml-1">More</span>
                </span>
              </div>
            </>
          )}

          {tooltip && (
            <div
              role="tooltip"
              style={{ left: tooltip.x, top: tooltip.y }}
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full -mt-2 whitespace-nowrap glass-strong rounded-md px-2.5 py-1.5 text-xs text-foreground"
            >
              {tooltip.text}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
