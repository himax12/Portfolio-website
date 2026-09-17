"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

// Hover (or keyboard focus) reveals a preview of whatever the link points at; the
// link itself still navigates, so touch devices, which have no hover, just open it
export function LinkHoverCard({
  href,
  trigger,
  className,
  ariaLabel,
  align = "start",
  contentClassName,
  children,
}: {
  href: string;
  trigger: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  // Card alignment relative to the trigger ("center" suits icon buttons)
  align?: "start" | "center" | "end";
  // Card width and padding, when the default 18rem preview doesn't fit the content
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <HoverCard.Root openDelay={200} closeDelay={150}>
      <HoverCard.Trigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={className}
        >
          {trigger}
        </a>
      </HoverCard.Trigger>
      {/* Portal escapes the page frame so the card is never clipped */}
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align={align}
          sideOffset={10}
          collisionPadding={16}
          className={cn(
            "hover-card glass-card z-[60] w-72 rounded-md p-4 text-sm text-foreground",
            contentClassName,
          )}
        >
          {children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
