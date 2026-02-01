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
  TestTube,
  Key,
  ShieldCheck,
  History as HistoryIcon,
  Server,
  GitMerge,
  Activity,
  Heart,
  LayoutDashboard,
  Monitor,
  Wrench,
  Search,
  Scissors,
  CreditCard,
  Globe,
  FileJson
} from "lucide-react";

const sidebarItems = [
  {
    title: "Prologue",
    items: [
      { title: "Release Notes", href: "/docs/release-notes", icon: FileCode },
      { title: "Upgrade Guide", href: "/docs/upgrade", icon: Rocket },
      { title: "Downgrade Guide", href: "/docs/downgrade", icon: HistoryIcon },
      { title: "Contribution Guide", href: "/docs/contribution", icon: ShieldCheck },
    ],
  },
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
      { title: "API Resources", href: "/docs/resources", icon: FileJson },
      { title: "Dependency Injection", href: "/docs/container", icon: Box }, 
      { title: "Service Providers", href: "/docs/providers", icon: Box }, // Added
      { title: "Middleware", href: "/docs/middleware", icon: Box }, // Icon changed
      { title: "Request & Response", href: "/docs/request-response", icon: Code2 },
      { title: "Authentication", href: "/docs/authentication", icon: Key },
      { title: "Validation", href: "/docs/validation", icon: ShieldCheck },
      { title: "Session", href: "/docs/session", icon: Shield },
      { title: "Views (JSX)", href: "/docs/views", icon: Monitor },
      { title: "I18n", href: "/docs/i18n", icon: Globe },
      { title: "Utilities", href: "/docs/utilities", icon: Wrench },
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
      { title: "Task Scheduling", href: "/docs/scheduler", icon: Layers },
      { title: "Caching", href: "/docs/caching", icon: Database },
      { title: "Events", href: "/docs/events", icon: Zap }, 
      { title: "Notifications", href: "/docs/notifications", icon: Radio },
      { title: "File Storage", href: "/docs/storage", icon: Database }, 
      { title: "Payment", href: "/docs/payment", icon: CreditCard },
      { title: "Search", href: "/docs/search", icon: Search },
      { title: "Security", href: "/docs/security", icon: Shield },
      { title: "Performance", href: "/docs/performance", icon: Zap },
      { title: "HTTP/2 Support", href: "/docs/http2", icon: Globe },
      { title: "Deployment", href: "/docs/deployment", icon: Rocket },
    ],
  },
  {
    title: "Architecture",
    items: [
      { title: "Service Providers", href: "/docs/providers", icon: Box }, 
      { title: "Aspect-Oriented (AOP)", href: "/docs/aop", icon: Scissors }, // Added
      { title: "Middleware", href: "/docs/middleware", icon: Layers },
      { title: "Tracing", href: "/docs/tracing", icon: Activity },
      { title: "Health Checks", href: "/docs/health", icon: Heart },
    ],
  },
  {
    title: "Testing",
    items: [
      { title: "Installation", href: "/docs/testing/installation", icon: Terminal },
      { title: "Writing Tests", href: "/docs/testing/usage", icon: TestTube },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "CLI Commands", href: "/docs/cli", icon: Terminal },
      { title: "API Reference", href: "/docs/api", icon: Code2 },
      { title: "OpenAPI Spec", href: "/docs/openapi", icon: FileCode },
    ],
  },
  {
    title: "Ecosystem",
    items: [
      { title: "Starter Kits", href: "/docs/starters", icon: Rocket },
      { title: "Canx Studio", href: "/docs/cli/dashboard", icon: LayoutDashboard },
      { title: "Queue Dashboard", href: "/docs/queue", icon: Layers },
      { title: "Canx Admin", href: "/docs/admin", icon: Settings },
    ],
  },
  {
    title: "Official Packages",
    items: [
      { title: "Citadel (Admin)", href: "/docs/packages/citadel", icon: ShieldCheck },
      { title: "Dominion (RBAC)", href: "/docs/packages/dominion", icon: Key },
      { title: "Blocks (Modules)", href: "/docs/packages/blocks", icon: Box }, 
      { title: "Echo (Realtime)", href: "/docs/packages/echo", icon: Radio },
    ],
  },
  {
    title: "Enterprise",
    items: [
      { title: "Cluster Mode", href: "/docs/enterprise/cluster", icon: Server },
      { title: "Microservices", href: "/docs/enterprise/microservices", icon: Box },
      { title: "Observability", href: "/docs/enterprise/observability", icon: Activity },
      { title: "Security Layers", href: "/docs/enterprise/security", icon: ShieldCheck },
      { title: "Universal Signals", href: "/docs/enterprise/universal-signals", icon: Zap },
      { title: "Canx Flow", href: "/docs/enterprise/flow", icon: GitMerge },
    ],
  },
  {
    title: "Canx UI",
    items: [
      { title: "Installation", href: "/docs/ui/installation", icon: Terminal },
      { title: "Button", href: "/docs/ui/button", icon: Box },
      { title: "Input", href: "/docs/ui/input", icon: FileCode },
      { title: "Badge", href: "/docs/ui/badge", icon: Layers },
      { title: "Card", href: "/docs/ui/card", icon: Box },
      { title: "Alert", href: "/docs/ui/alert", icon: Zap },
      { title: "Label", href: "/docs/ui/label", icon: FileCode },
      { title: "Table", href: "/docs/ui/table", icon: Database },
      { title: "Modal", href: "/docs/ui/modal", icon: Layers },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pr-4 pb-10 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <nav className="space-y-8">
        {sidebarItems.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
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
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4",
                        isActive ? "text-primary" : "text-muted-foreground"
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
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
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
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <item.icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-primary" : "text-muted-foreground"
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
