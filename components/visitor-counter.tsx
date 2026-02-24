"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Use Counter.dev for persistent visitor counting
    const fetchCount = async () => {
      try {
        // Create a unique namespace for your portfolio
        const namespace = "himax12-portfolio";

        // Increment and get count in one call
        const response = await fetch(
          `https://counter.dev/api/count/up?namespace=${namespace}&name=visits`,
          {
            method: "POST",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setCount(data.value || 0);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-md border border-border text-xs text-muted">
      <Eye className="h-3 w-3" />
      <span>{count.toLocaleString()} unique visitors</span>
    </div>
  );
}
