"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Fetch visitor count from local API
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visitors");
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-md border border-border text-xs text-muted">
      <Eye className="h-3 w-3" />
      <span>{count.toLocaleString()} visits</span>
    </div>
  );
}
