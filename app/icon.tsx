import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
// Edge runtime avoids a @vercel/og file-path bug on Windows paths with spaces
export const runtime = "edge";

// "HG" monogram favicon in the site's Matrix green
export default function Icon() {
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
          fontSize: 17,
          fontWeight: 800,
          borderRadius: 6,
          letterSpacing: -1,
        }}
      >
        HG
      </div>
    ),
    size,
  );
}
