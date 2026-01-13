import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid, ShowcaseCard } from "@/components/ui/BentoGrid";
import { TerminalPreview, CodePreview } from "@/components/ui/TerminalPreview";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { 
  Zap, 
  Rocket, 
  Flame, 
  Brain, 
  Database, 
  Palette,
  ArrowRight,
  Globe,
  Shield,
  Cpu,
  Layers,
  Code2,
  Radio,
  FileCode,
  Box,
  Gauge,
  Lock,
  Server,
  ChevronRight,
  ExternalLink
} from "lucide-react";

// What is CanxJS features
const whatIsCanxJS = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Ultra-Fast Routing",
    description: "Radix Tree algorithm with O(k) route matching. Handle 250,000+ requests per second with JIT caching.",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Async-First Design",
    description: "Everything async by default. Clean, modern code without callback hell.",
  },
  {
    icon: <Flame className="w-5 h-5" />,
    title: "HotWire Protocol",
    description: "Real-time streaming without WebSocket setup. Broadcast updates instantly to all clients.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "Auto-Cache Layer",
    description: "Intelligent automatic caching with pattern analysis for optimal performance.",
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "Zero-Config ORM",
    description: "MySQL and PostgreSQL support with elegant query builder syntax.",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Native JSX Views",
    description: "Server-rendered views with JSX. No external templating needed.",
  },
  {
    icon: <Radio className="w-5 h-5" />,
    title: "WebSocket Support",
    description: "Native WebSocket integration for real-time bidirectional communication.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Built-in Security",
    description: "CSRF protection, rate limiting, input validation out of the box.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Edge Runtime",
    description: "Deploy to edge locations worldwide for ultra-low latency.",
  },
];

// Production tooling logos
const productionTools = [
  { name: "Bun", icon: "🥟" },
  { name: "TypeScript", icon: <FileCode className="w-6 h-6" /> },
  { name: "MySQL", icon: <Database className="w-6 h-6" /> },
  { name: "PostgreSQL", icon: <Database className="w-6 h-6" /> },
  { name: "Redis", icon: <Box className="w-6 h-6" /> },
];

// Showcase projects
const showcaseProjects = [
  { title: "REST API", description: "Full-featured REST API boilerplate", tags: ["API", "Auth", "CRUD"] },
  { title: "Real-time Chat", description: "WebSocket-powered chat application", tags: ["WebSocket", "HotWire"] },
  { title: "E-commerce Backend", description: "Complete e-commerce API", tags: ["Payments", "Orders"] },
  { title: "SaaS Starter", description: "Multi-tenant SaaS backend", tags: ["Auth", "Billing"] },
];

const codeExample = `import { createApp, logger, cors } from "canxjs";

const app = createApp({ port: 3000 });

// Middleware
app.use(logger());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello CanxJS!" });
});

app.listen();`;

export default function Home() {
  return (
    <div className="relative bg-background dark:bg-black min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-500/10 rounded-full blur-[64px] sm:blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-500/10 rounded-full blur-[50px] sm:blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-20 sm:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center animate-fade-in">
            {/* Version Badge */}
            <Badge variant="secondary" className="mb-8 px-4 py-2 bg-secondary/50 border-border text-muted-foreground hover:bg-secondary transition-colors">
              <Zap className="w-3.5 h-3.5 mr-2 text-yellow-500" />
              <span className="text-muted-foreground">Version 1.2.0</span>
              <span className="mx-2 text-muted-foreground/50">—</span>
              <span>WebSocket Support</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 text-muted-foreground/70" />
            </Badge>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
              <span className="text-foreground dark:text-white">Backend Framework</span>
              <br />
              <span className="text-gradient">for the Web</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-100">
              Ultra-fast async MVC for Bun. <span className="text-foreground font-medium">250,000+ req/sec</span> performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up delay-200">
              <Link href="/docs/introduction">
                <Button size="lg" className="rounded-full px-8 h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-border bg-card/50 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
                  <Code2 className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </Link>
            </div>

            {/* Terminal Preview */}
            <div className="max-w-2xl mx-auto animate-slide-up delay-300">
              <TerminalPreview 
                commands={["bunx create-canx my-app", "cd my-app", "bun run dev"]}
                title="Terminal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is CanxJS Section */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">What is CanxJS?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything you need to build
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Production-ready features out of the box. Built for performance, designed for developer happiness.
            </p>
          </div>

          {/* Bento Grid */}
          <BentoGrid className="animate-slide-up delay-100">
            {whatIsCanxJS.map((feature, index) => (
              <BentoCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className={index === 0 ? "sm:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Production Tooling Section */}
      <section className="relative py-24 sm:py-32 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Built on Foundation of</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Fast, Production-Grade Tooling
            </h2>
          </div>

          {/* Technology Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-16 animate-slide-up">
            {productionTools.map((tool) => (
              <div 
                key={tool.name}
                className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all text-2xl">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium">{tool.name}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-slide-up delay-100">
            <div className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">250,000+</div>
              <div className="text-muted-foreground">Requests per second</div>
              <div className="text-sm text-muted-foreground mt-1">15x faster than Express</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">&lt;30MB</div>
              <div className="text-muted-foreground">Memory usage</div>
              <div className="text-sm text-muted-foreground mt-1">75% less than Laravel</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-card border border-border">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">&lt;50ms</div>
              <div className="text-muted-foreground">Startup time</div>
              <div className="text-sm text-muted-foreground mt-1">40x faster than Laravel</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-24 sm:py-32 border-t border-border bg-accent/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Why CanxJS?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Benchmarks that speak for themselves
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We did the math. CanxJS outperforms the competition in speed, efficiency, and developer experience.
            </p>
          </div>
          
          <div className="animate-slide-up">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Get Started in Seconds Section */}
      <section className="relative py-24 sm:py-32 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Get Started in Seconds</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Ship faster with less code
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                CanxJS lets you build production-ready APIs in minutes. 
                With zero configuration, automatic type safety, and batteries-included features.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gauge className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Zero Configuration</div>
                    <div className="text-sm text-muted-foreground">Works out of the box with sensible defaults</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lock className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Type-Safe by Default</div>
                    <div className="text-sm text-muted-foreground">Full TypeScript support with inference</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Server className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Production Ready</div>
                    <div className="text-sm text-muted-foreground">Deploy anywhere with confidence</div>
                  </div>
                </div>
              </div>

              <Link href="/docs/installation">
                <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Read the Installation Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Right: Code Preview */}
            <div className="animate-slide-up delay-100">
              <CodePreview 
                code={codeExample}
                filename="app.ts"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Framework of Choice Section */}
      <section className="relative py-24 sm:py-32 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              The framework of choice when it matters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startups to enterprises, developers choose CanxJS for mission-critical applications.
            </p>
          </div>

          {/* Showcase Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
            {showcaseProjects.map((project) => (
              <ShowcaseCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
              />
            ))}
          </div>

          {/* View More Link */}
          <div className="text-center mt-12 animate-fade-in delay-200">
            <Link href="/showcase" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              View all showcases
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Create your first CanxJS app in seconds with our CLI. Start building your next great project today.
            </p>

            {/* Terminal */}
            <div className="max-w-md mx-auto mb-12 animate-slide-up delay-100">
              <TerminalPreview 
                commands={["bunx create-canx my-app"]}
                animated={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
              <Link href="/docs/introduction">
                <Button size="lg" className="rounded-full px-8 h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a 
                href="https://github.com/chandafa/canx.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-border bg-card hover:bg-accent hover:text-accent-foreground">
                  <Globe className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
