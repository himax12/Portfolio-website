import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
// Edge runtime avoids a @vercel/og file-path bug on Windows paths with spaces
export const runtime = "edge";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#00ff41",
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        HG
      </div>
    ),
    size,
  );
}
