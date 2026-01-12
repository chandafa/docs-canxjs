import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", className }: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
        <span className="text-xs font-mono text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">
          {language}
        </span>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
