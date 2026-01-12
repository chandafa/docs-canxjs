import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Terminal, 
  Settings, 
  Rocket, 
  ChevronRight,
  ArrowRight,
  FileCode,
  Route,
  Layers,
  Database,
  Zap,
  Radio,
  Code2
} from "lucide-react";

const docSections = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction", desc: "What is CanxJS and why use it", icon: BookOpen },
      { title: "Installation", href: "/docs/installation", desc: "Set up your first project", icon: Terminal },
      { title: "Configuration", href: "/docs/config", desc: "Configure your application", icon: Settings },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Overview", href: "/docs/core-concepts", desc: "All core concepts in one place", icon: Layers },
      { title: "Routing", href: "/docs/core-concepts#routing", desc: "Define and manage routes", icon: Route },
      { title: "Controllers", href: "/docs/core-concepts#controllers", desc: "Handle requests with controllers", icon: FileCode },
      { title: "Middleware", href: "/docs/core-concepts#middleware", desc: "Intercept and modify requests", icon: Layers },
    ],
  },
  {
    title: "Database",
    items: [
      { title: "Models & ORM", href: "/docs/orm", desc: "Query and manage data", icon: Database },
      { title: "Migrations", href: "/docs/migrations", desc: "Version control your schema", icon: Layers },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "HotWire Protocol", href: "/docs/hotwire", desc: "Real-time streaming", icon: Zap },
      { title: "WebSockets", href: "/docs/websockets", desc: "Real-time communication", icon: Radio },
    ],
  },
];

const quickLinks = [
  { icon: Code2, title: "API Reference", href: "/docs/api", desc: "Complete API documentation", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { icon: Terminal, title: "CLI Commands", href: "/docs/cli", desc: "All CLI commands explained", color: "text-green-400", bgColor: "bg-green-500/10" },
  { icon: Settings, title: "Configuration", href: "/docs/config", desc: "Configure your application", color: "text-purple-400", bgColor: "bg-purple-500/10" },
  { icon: Rocket, title: "Deployment", href: "/docs/deployment", desc: "Deploy to production", color: "text-orange-400", bgColor: "bg-orange-500/10" },
];

export default function DocsPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <BookOpen className="w-3 h-3 mr-1.5" />
          Documentation
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          CanxJS is a React-inspired backend framework for building full-stack web applications 
          with ultra-fast performance and elegant developer experience.
        </p>
      </div>

      {/* Quick Links */}
      <section className="mb-16 animate-slide-up">
        <div className="grid grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-3 rounded-xl ${link.bgColor} w-fit mb-4 transition-transform group-hover:scale-110`}>
                <link.icon className={`w-6 h-6 ${link.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {link.desc}
              </p>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="animate-slide-up delay-100">
        <div className="grid md:grid-cols-2 gap-8">
          {docSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-white/20 rounded-full" />
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors">
                          <item.icon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-medium text-zinc-300 group-hover:text-white transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-zinc-600 group-hover:text-zinc-500 transition-colors">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="mt-16 animate-slide-up delay-200">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Create your first CanxJS application in seconds with our CLI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/installation">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Installation Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/introduction">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Read Introduction
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
