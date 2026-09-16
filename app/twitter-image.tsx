import OpengraphImage from "./opengraph-image";
import { siteConfig } from "@/config/site";

// Next reads these exports statically, so they're declared here rather than re-exported
export const alt = `${siteConfig.name} - ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default OpengraphImage;
