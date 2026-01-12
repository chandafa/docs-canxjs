import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  BookOpen, 
  Zap, 
  Rocket, 
  Shield, 
  Code2,
  ArrowRight,
  CheckCircle,
  Database,
  Radio,
  Layers,
  Cpu,
  ChevronRight
} from "lucide-react";

const highlights = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "250,000+ requests per second with Bun runtime",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Code2,
    title: "TypeScript Native",
    description: "First-class TypeScript support with full type safety",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Built-in CSRF, rate limiting, and input validation",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Rocket,
    title: "Developer Experience",
    description: "Elegant APIs inspired by React and Next.js",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

const features = [
  { icon: Zap, text: "Ultra-fast Radix Tree routing" },
  { icon: Rocket, text: "Async-first architecture" },
  { icon: Database, text: "Built-in ORM with query builder" },
  { icon: Layers, text: "Native JSX server-side rendering" },
  { icon: Radio, text: "HotWire protocol for real-time" },
  { icon: Cpu, text: "WebSocket support" },
];

const quickStartExample = `import { createApp, logger, cors } from "canxjs";

const app = createApp({ port: 3000 });

app.use(logger());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello CanxJS!" });
});

app.listen();`;

export default function IntroductionPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <BookOpen className="w-3 h-3 mr-1.5" />
          Getting Started
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Introduction</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Welcome to CanxJS, the ultra-fast async-first MVC backend framework built specifically for Bun.
        </p>
      </div>

      {/* What is CanxJS */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4">What is CanxJS?</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 space-y-4">
          <p className="text-zinc-400 leading-relaxed">
            CanxJS is a modern backend framework that combines the best ideas from React and Next.js 
            with the raw performance of Bun. It provides an elegant, type-safe API for building 
            production-ready applications at unprecedented speed.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Unlike traditional Node.js frameworks, CanxJS is built from the ground up for Bun, 
            leveraging its native performance to achieve <span className="text-white font-medium">250,000+ requests per second</span> while 
            maintaining an intuitive developer experience.
          </p>
        </div>
      </section>

      {/* Why CanxJS - Highlights */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-6">Why CanxJS?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <div 
              key={item.title} 
              className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className={`p-2 rounded-lg ${item.bgColor} w-fit mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Example */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-6">Quick Example</h2>
        <p className="text-zinc-400 mb-4">
          Here's what a basic CanxJS application looks like:
        </p>
        <CodePreview 
          code={quickStartExample}
          filename="app.ts"
        />
      </section>

      {/* Key Features */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={feature.text} 
                className="flex items-center gap-3"
              >
                <div className="p-1.5 rounded-lg bg-green-500/10">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-zinc-300 text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Get Started</h3>
          <p className="text-zinc-400 mb-6">
            Ready to start building? Follow our installation guide to create your first CanxJS application.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/installation">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Installation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/routing">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Learn Routing
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
