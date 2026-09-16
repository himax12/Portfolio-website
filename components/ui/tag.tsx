export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-subtle rounded-md px-2 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}
