"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

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

        if (!response.ok) {
          setError(`HTTP error: ${response.status}`);
          return;
        }
        const data = await response.json();
        if (typeof data.value !== "number") {
          setError("Invalid response: " + JSON.stringify(data));
          return;
        }
        setCount(data.value || 0);
        setError(null);
      } catch (error: any) {
        setError(error?.message || "Unknown error");
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-md border border-border text-xs text-muted">
      <Eye className="h-3 w-3" />
      <span>{count.toLocaleString()} unique visitors</span>
      {error && <span className="text-red-500 ml-2">Error: {error}</span>}
    </div>
  );
}
