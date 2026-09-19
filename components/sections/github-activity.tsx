"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import ActivityCalendar from "react-activity-calendar";
import type { ContributionData } from "@/lib/github";
import {
  CONTRIBUTION_COLORS,
  formatContribution,
  unpackContributions,
  type CompactContributions,
} from "@/lib/contributions";
import { cloneElement, useEffect, useRef, useState } from "react";

const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";
const WEEKS_IN_YEAR = 53;
// Narrow panels show the last six months at a readable size instead of a scrolled sliver of the year
const WEEKS_COMPACT = 26;
const COMPACT_BELOW_WIDTH = 520;
const BLOCK_MARGIN = 3;
// Below the minimum the grid scrolls horizontally instead of shrinking further
const MIN_BLOCK_SIZE = 10;
// Six months have room for slightly smaller squares, so the compact view fits without scrolling
const MIN_BLOCK_SIZE_COMPACT = 8;
const MAX_BLOCK_SIZE = 16;
// Keeps the tooltip (roughly 220px wide) from spilling past the panel edges
const TOOLTIP_EDGE_PADDING = 110;
const EDGE_FADE = "32px";

type Tooltip = { text: string; x: number; y: number };

// initialData comes from the server (ISR) in its compact form; the browser only
// fetches if that failed
export default function GitHubActivity({
  initialData,
}: {
  initialData: CompactContributions | null;
}) {
  const [data, setData] = useState<ContributionData | null>(() =>
    initialData ? unpackContributions(initialData) : null,
  );
  const [failed, setFailed] = useState(false);
  const [blockSize, setBlockSize] = useState(12);
  const [compact, setCompact] = useState(false);
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

  // Size blocks so the visible weeks (a year, or six months when compact) fill the panel width
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new ResizeObserver(() => {
      const isCompact = scroller.clientWidth < COMPACT_BELOW_WIDTH;
      setCompact(isCompact);
      const weeks = isCompact ? WEEKS_COMPACT : WEEKS_IN_YEAR;
      const fitted =
        Math.floor((scroller.clientWidth + BLOCK_MARGIN) / weeks) - BLOCK_MARGIN;
      const minSize = isCompact ? MIN_BLOCK_SIZE_COMPACT : MIN_BLOCK_SIZE;
      setBlockSize(Math.min(MAX_BLOCK_SIZE, Math.max(minSize, fitted)));
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

  // Compact view: the current partial week plus the 25 full weeks before it, so the
  // first column starts on a Sunday
  const allDays = data?.contributions ?? [];
  const lastWeekday = allDays.length
    ? new Date(`${allDays[allDays.length - 1].date}T00:00`).getDay()
    : 0;
  const visibleDays = compact
    ? allDays.slice(Math.max(0, allDays.length - ((WEEKS_COMPACT - 1) * 7 + lastWeekday + 1)))
    : allDays;

  const edgeFadeMask =
    edgeFades.left || edgeFades.right
      ? `linear-gradient(to right, ${edgeFades.left ? `transparent, black ${EDGE_FADE}` : "black"}, ${edgeFades.right ? `black calc(100% - ${EDGE_FADE}), transparent` : "black"})`
      : undefined;

  return (
    <section id="github" className="section">
      <div>
        <SectionHeading
          title="GitHub Activity"
          action={
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-[13px] text-muted hover:text-foreground transition-colors"
            >
              View Profile
              <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          }
        />

        <div
          ref={panelRef}
          onMouseLeave={() => setTooltip(null)}
          className="reveal glass relative rounded-md p-4 sm:p-[18px]"
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
                    data={visibleDays}
                    loading={!data}
                    colorScheme="dark"
                    theme={{ dark: CONTRIBUTION_COLORS }}
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
                  {!data
                    ? "Loading contributions..."
                    : compact
                      ? `${visibleDays.reduce((sum, day) => sum + day.count, 0)} contributions in the last 6 months`
                      : `${data.total} contributions in the last year`}
                </span>
                <span className="flex items-center gap-[3px] text-muted">
                  <span className="mr-1">Less</span>
                  {CONTRIBUTION_COLORS.map((color) => (
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
        </div>
      </div>
    </section>
  );
}
