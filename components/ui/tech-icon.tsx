import {
  siC,
  siCplusplus,
  siDocker,
  siElectron,
  siExpress,
  siFastapi,
  siFfmpeg,
  siGit,
  siGithub,
  siGooglecloud,
  siGooglegemini,
  siJavascript,
  siLanggraph,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOllama,
  siOpencv,
  siPandas,
  siPostgresql,
  siPrisma,
  siPython,
  siPytorch,
  siReact,
  siSqlite,
  siStreamlit,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Named imports keep the bundle to these icons only. Keys match the names in siteConfig;
// names without a brand logo (e.g. SQL, NLP) simply render without an icon.
const ICONS: Record<string, SimpleIcon> = {
  "React.js": siReact,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  Express: siExpress,
  Python: siPython,
  FastAPI: siFastapi,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  SQLite: siSqlite,
  Supabase: siSupabase,
  "C++": siCplusplus,
  C: siC,
  Electron: siElectron,
  Docker: siDocker,
  Ollama: siOllama,
  Git: siGit,
  GitHub: siGithub,
  FFmpeg: siFfmpeg,
  Streamlit: siStreamlit,
  Pandas: siPandas,
  NumPy: siNumpy,
  TensorFlow: siTensorflow,
  PyTorch: siPytorch,
  OpenCV: siOpencv,
  LangGraph: siLanggraph,
  "Gemini API": siGooglegemini,
  Gemini: siGooglegemini,
  "Google Cloud": siGooglecloud,
};

// Near-black brand colors (Next.js, GitHub, Express…) vanish on the dark UI, so they use the text color
function readableColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.12 ? "currentColor" : `#${hex}`;
}

export const hasTechIcon = (name: string) => name in ICONS;

export default function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-[15px] w-[15px] shrink-0", className)}
      fill={readableColor(icon.hex)}
    >
      <path d={icon.path} />
    </svg>
  );
}
