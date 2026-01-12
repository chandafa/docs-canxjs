import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText,
  Construction
} from "lucide-react";

// Define available docs pages
const docsContent: Record<string, { title: string; category: string; description: string }> = {
  "structure": {
    title: "Project Structure",
    category: "Getting Started",
    description: "Understanding the file layout and organization of a CanxJS project.",
  },
  "routing": {
    title: "Routing",
    category: "Core Concepts",
    description: "Learn how to define and manage routes in CanxJS with the Radix Tree router.",
  },
  "controllers": {
    title: "Controllers",
    category: "Core Concepts",
    description: "Handle requests with controller decorators and organize your business logic.",
  },
  "middleware": {
    title: "Middleware",
    category: "Core Concepts",
    description: "Intercept and modify requests and responses with the middleware pipeline.",
  },
  "request-response": {
    title: "Request & Response",
    category: "Core Concepts",
    description: "Work with HTTP request and response objects in CanxJS.",
  },
  "orm": {
    title: "Models & ORM",
    category: "Database",
    description: "Query and manage data with the built-in zero-config ORM.",
  },
  "migrations": {
    title: "Migrations",
    category: "Database",
    description: "Version control your database schema with migrations.",
  },
  "seeders": {
    title: "Seeders",
    category: "Database",
    description: "Populate test data with database seeders.",
  },
  "hotwire": {
    title: "HotWire Protocol",
    category: "Advanced",
    description: "Build real-time streaming features without WebSocket setup.",
  },
  "cache": {
    title: "Auto-Cache",
    category: "Advanced",
    description: "Intelligent automatic caching with pattern analysis.",
  },
  "websockets": {
    title: "WebSockets",
    category: "Advanced",
    description: "Real-time bidirectional communication with WebSocket support.",
  },
  "events": {
    title: "Events",
    category: "Advanced",
    description: "Event-driven architecture for decoupled systems.",
  },
  "api": {
    title: "API Reference",
    category: "Reference",
    description: "Complete API documentation for all CanxJS modules.",
  },
  "cli": {
    title: "CLI Commands",
    category: "Reference",
    description: "All CLI commands explained with examples.",
  },
  "config": {
    title: "Configuration",
    category: "Reference",
    description: "Configure your CanxJS application.",
  },
  "deployment": {
    title: "Deployment",
    category: "Reference",
    description: "Deploy your CanxJS application to production.",
  },
};

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docsContent[slug];
  
  if (!doc) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center animate-fade-in">
          <div className="p-4 rounded-2xl bg-muted/50 w-fit mx-auto mb-6">
            <FileText className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The documentation page &quot;{slug}&quot; doesn&apos;t exist.
          </p>
          <Link href="/docs">
            <Button className="rounded-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Docs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Breadcrumb */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span>{doc.category}</span>
          <span>/</span>
          <span className="text-foreground">{doc.title}</span>
        </div>
        <Badge variant="secondary" className="mb-4">{doc.category}</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </div>

      {/* Coming Soon Content */}
      <section className="mb-12 animate-slide-up">
        <div className="glass-card p-8 text-center">
          <div className="p-4 rounded-2xl bg-primary/10 w-fit mx-auto mb-6">
            <Construction className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Documentation Coming Soon</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We&apos;re working on comprehensive documentation for this topic. 
            Check back soon or join our community for updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/chandafa/canx.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full">
                View on GitHub
              </Button>
            </a>
            <a
              href="https://discord.gg/canxjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full">
                Join Discord
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="animate-slide-up delay-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link href="/docs" className="glass-card p-4 hover-lift flex items-center gap-3 group flex-1">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <div className="text-xs text-muted-foreground">Previous</div>
              <div className="font-medium">Documentation</div>
            </div>
          </Link>
          <Link href="/installation" className="glass-card p-4 hover-lift flex items-center justify-end gap-3 group flex-1">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Next</div>
              <div className="font-medium">Installation</div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </section>
    </div>
  );
}
