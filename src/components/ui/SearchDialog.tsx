"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Book, Terminal, Settings, X, ArrowRight, Layers, Rocket, TestTube, LayoutTemplate, Shield, Radio, Zap, Database, Users, CreditCard, Box, Puzzle } from "lucide-react";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
}

const searchItems: SearchItem[] = [
  // Getting Started
  { title: "Introduction", description: "What is CanxJS and why use it", href: "/docs/introduction", icon: <Book className="w-4 h-4" />, category: "Getting Started" },
  { title: "Installation", description: "Set up your first project", href: "/docs/installation", icon: <Terminal className="w-4 h-4" />, category: "Getting Started" },
  { title: "Configuration", description: "Configure your application", href: "/docs/config", icon: <Settings className="w-4 h-4" />, category: "Getting Started" },
  
  // Core Concepts
  { title: "Routing", description: "Define routes and parameters", href: "/docs/routing", icon: <FileText className="w-4 h-4" />, category: "Core Concepts" },
  { title: "Controllers", description: "Handle requests with controllers", href: "/docs/controllers", icon: <FileText className="w-4 h-4" />, category: "Core Concepts" },
  { title: "Middleware", description: "Request/response middleware", href: "/docs/middleware", icon: <Layers className="w-4 h-4" />, category: "Core Concepts" },
  { title: "Request & Response", description: "Work with HTTP requests", href: "/docs/request-response", icon: <FileText className="w-4 h-4" />, category: "Core Concepts" },
  
  // Database
  { title: "Models & ORM", description: "Database models and queries", href: "/docs/orm", icon: <Database className="w-4 h-4" />, category: "Database" },
  { title: "Migrations", description: "Database migrations", href: "/docs/migrations", icon: <Database className="w-4 h-4" />, category: "Database" },
  { title: "Seeders", description: "Database seeders", href: "/docs/seeders", icon: <Database className="w-4 h-4" />, category: "Database" },
  
  // Advanced
  { title: "HotWire Protocol", description: "Real-time UI updates", href: "/docs/hotwire", icon: <Zap className="w-4 h-4" />, category: "Advanced" },
  { title: "WebSockets", description: "Real-time communication", href: "/docs/websockets", icon: <Radio className="w-4 h-4" />, category: "Advanced" },
  { title: "Security", description: "Authentication and security", href: "/docs/security", icon: <Shield className="w-4 h-4" />, category: "Advanced" },
  { title: "Deployment", description: "Deploy your application", href: "/docs/deployment", icon: <Rocket className="w-4 h-4" />, category: "Advanced" },
  
  // Testing
  { title: "Testing Installation", description: "Set up testing framework", href: "/docs/testing/installation", icon: <TestTube className="w-4 h-4" />, category: "Testing" },
  { title: "Writing Tests", description: "Write unit and integration tests", href: "/docs/testing/usage", icon: <TestTube className="w-4 h-4" />, category: "Testing" },
  
  // Ecosystem
  { title: "Starter Kits", description: "Pre-built templates: Basic, API, Admin, SaaS", href: "/docs/starters", icon: <Rocket className="w-4 h-4" />, category: "Ecosystem" },
  { title: "Queue Dashboard", description: "Monitor background jobs", href: "/docs/queue", icon: <Layers className="w-4 h-4" />, category: "Ecosystem" },
  { title: "Canx Admin", description: "Admin panel generator", href: "/docs/admin", icon: <Settings className="w-4 h-4" />, category: "Ecosystem" },
  
  // Canx UI
  { title: "Canx UI Installation", description: "Install UI components", href: "/docs/ui/installation", icon: <LayoutTemplate className="w-4 h-4" />, category: "Canx UI" },
  { title: "Button Component", description: "Button UI component", href: "/docs/ui/button", icon: <Box className="w-4 h-4" />, category: "Canx UI" },
  { title: "Input Component", description: "Input UI component", href: "/docs/ui/input", icon: <Box className="w-4 h-4" />, category: "Canx UI" },
  { title: "Modal Component", description: "Modal UI component", href: "/docs/ui/modal", icon: <Layers className="w-4 h-4" />, category: "Canx UI" },
  
  // Reference
  { title: "CLI Commands", description: "All CLI commands explained", href: "/docs/cli", icon: <Terminal className="w-4 h-4" />, category: "Reference" },
  { title: "API Reference", description: "Complete API documentation", href: "/docs/api", icon: <FileText className="w-4 h-4" />, category: "Reference" },
  
  // Extension
  { title: "VS Code Extension", description: "Enhanced productivity tools", href: "/extension", icon: <Puzzle className="w-4 h-4" />, category: "Extension" },
];

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            router.push(filteredItems[selectedIndex].href);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, filteredItems, selectedIndex, router, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative max-w-2xl mx-auto mt-20 sm:mt-32 px-4">
        <div className="bg-background dark:bg-zinc-900 rounded-2xl border border-border dark:border-white/[0.1] shadow-2xl overflow-hidden animate-scale-in">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border dark:border-white/[0.08]">
            <Search className="w-5 h-5 text-muted-foreground dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-zinc-500 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-accent dark:hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground dark:text-zinc-500" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredItems.length > 0 ? (
              <div className="space-y-1">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      index === selectedIndex
                        ? "bg-accent dark:bg-white/[0.08] text-foreground dark:text-white"
                        : "text-muted-foreground dark:text-zinc-400 hover:bg-accent/50 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${index === selectedIndex ? "bg-primary/20 text-primary" : "bg-muted dark:bg-white/[0.05]"}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-sm text-muted-foreground dark:text-zinc-500 truncate">
                        {item.description}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${index === selectedIndex ? "opacity-100" : "opacity-0"}`} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground dark:text-zinc-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No results found for &quot;{query}&quot;</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border dark:border-white/[0.08] text-xs text-muted-foreground dark:text-zinc-600">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1]">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1]">↵</kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1]">esc</kbd>
              to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
