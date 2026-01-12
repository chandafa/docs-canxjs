"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Terminal, 
  Settings, 
  Code2,
  Route,
  Layers,
  Database,
  Zap,
  Radio,
  Shield,
  ChevronRight,
  FileCode,
  Rocket,
  Box,
  TestTube
} from "lucide-react";

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction", icon: BookOpen },
      { title: "Installation", href: "/docs/installation", icon: Terminal },
      { title: "Configuration", href: "/docs/config", icon: Settings },
      { title: "VS Code Extension", href: "/extension", icon: Box },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Routing", href: "/docs/routing", icon: Route },
      { title: "Controllers", href: "/docs/controllers", icon: FileCode },
      { title: "Middleware", href: "/docs/middleware", icon: Layers },
      { title: "Request & Response", href: "/docs/request-response", icon: Code2 },
    ],
  },
  {
    title: "Database",
    items: [
      { title: "Models & ORM", href: "/docs/orm", icon: Database },
      { title: "Migrations", href: "/docs/migrations", icon: Layers },
      { title: "Seeders", href: "/docs/seeders", icon: Database },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "HotWire Protocol", href: "/docs/hotwire", icon: Zap },
      { title: "WebSockets", href: "/docs/websockets", icon: Radio },
      { title: "Security", href: "/docs/security", icon: Shield },
      { title: "Deployment", href: "/docs/deployment", icon: Rocket },
    ],
  },
  {
    "title": "Testing",
    "items": [
      { title: "Installation", href: "/docs/testing/installation", icon: Terminal },
      { title: "Writing Tests", href: "/docs/testing/usage", icon: TestTube },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "CLI Commands", href: "/docs/cli", icon: Terminal },
      { title: "API Reference", href: "/docs/api", icon: Code2 },
    ],
  },
  {
    "title": "Canx UI",
    "items": [
      { title: "Installation", href: "/docs/ui/installation", icon: Terminal },
      { title: "Button", href: "/docs/ui/button", icon: Box },
      { title: "Input", href: "/docs/ui/input", icon: FileCode },
      { title: "Modal", href: "/docs/ui/modal", icon: Layers },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-10">
      <nav className="space-y-8">
        {sidebarItems.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-zinc-400 mb-3 px-3">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-white/[0.08] text-white font-medium"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4",
                        isActive ? "text-white" : "text-zinc-600"
                      )} />
                      {item.title}
                      {isActive && (
                        <ChevronRight className="w-3 h-3 ml-auto text-zinc-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

// Mobile sidebar (can be used with Sheet)
export function MobileDocsSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 p-4">
      {sidebarItems.map((section) => (
        <div key={section.title}>
          <h4 className="text-sm font-semibold text-zinc-400 mb-3 px-3">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors",
                      isActive
                        ? "bg-white/[0.08] text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    <item.icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-white" : "text-zinc-500"
                    )} />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
