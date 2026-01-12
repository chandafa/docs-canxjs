"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Terminal, Copy, Check } from "lucide-react";

interface TerminalPreviewProps {
  commands?: string[];
  title?: string;
  className?: string;
  animated?: boolean;
}

export function TerminalPreview({
  commands = ["bunx create-canx my-app", "cd my-app", "bun run dev"],
  title = "Terminal",
  className,
  animated = true,
}: TerminalPreviewProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(animated);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!animated) {
      setDisplayedText(commands.join("\n"));
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let text = "";

    const typeInterval = setInterval(() => {
      if (lineIndex >= commands.length) {
        setIsTyping(false);
        clearInterval(typeInterval);
        return;
      }

      const currentCommand = commands[lineIndex];
      if (charIndex < currentCommand.length) {
        text += currentCommand[charIndex];
        setDisplayedText(text);
        charIndex++;
      } else {
        text += "\n";
        setDisplayedText(text);
        lineIndex++;
        setCurrentLine(lineIndex);
        charIndex = 0;
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [commands, animated]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(commands.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-950 border border-white/[0.08]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-zinc-500 flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-zinc-300 whitespace-pre-wrap">
          {displayedText.split("\n").map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-zinc-600 select-none">$</span>
              <span className={cn(
                i === currentLine && isTyping && "border-r-2 border-white animate-pulse"
              )}>
                {line}
              </span>
            </div>
          ))}
          {isTyping && currentLine >= commands.length - 1 && (
            <span className="inline-block w-2 h-4 bg-white animate-pulse" />
          )}
        </pre>
      </div>
    </div>
  );
}

// Static code preview component
interface CodePreviewProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodePreview({
  code,
  language = "typescript",
  filename = "app.ts",
  className,
  showLineNumbers = true,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-950 border border-white/[0.08]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-zinc-500">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="w-8 text-right pr-4 text-zinc-600 select-none flex-shrink-0">
                  {i + 1}
                </span>
              )}
              <code className="text-zinc-300">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
