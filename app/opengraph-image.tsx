import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} - ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Edge runtime avoids a @vercel/og file-path bug on Windows paths with spaces
export const runtime = "edge";

// Link preview card for LinkedIn, X, WhatsApp, Slack, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          // Satori needs the solid color separate from gradient layers
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,255,65,0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(0,255,65,0.10), transparent 45%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", color: "#00ff41", fontSize: 34, fontWeight: 800 }}>
          HG
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 42, color: "#a3a3a3" }}>{siteConfig.title}</div>
          <div style={{ fontSize: 28, color: "#d4d4d4", marginTop: 16, maxWidth: 1000 }}>
            Agent workflows · OCR pipelines · Multi-agent RAG
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#737373" }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
