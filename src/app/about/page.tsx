import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Monitor,
  Plug,
  Settings,
  FileCode,
  Flame,
  Package,
  Star,
  Users,
  MessageCircle,
  Check,
  X
} from "lucide-react";

const features = [
  {
    title: "Server-Side Rendering",
    desc: "Render views on the server with native JSX support",
    icon: Monitor,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "API Routes",
    desc: "Build RESTful APIs with intuitive routing",
    icon: Plug,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Middleware Pipeline",
    desc: "Flexible request/response processing",
    icon: Settings,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "TypeScript Native",
    desc: "First-class TypeScript support throughout",
    icon: FileCode,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    title: "Hot Module Replacement",
    desc: "Fast development with instant updates",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Optimized Bundling",
    desc: "Optimized builds powered by Bun",
    icon: Package,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const comparison = [
  { feature: "Server-side Rendering", canxjs: true, express: false, nextjs: true },
  { feature: "Built-in ORM", canxjs: true, express: false, nextjs: false },
  { feature: "Native TypeScript", canxjs: true, express: false, nextjs: true },
  { feature: "Real-time (HotWire)", canxjs: true, express: false, nextjs: false },
  { feature: "Auto-Caching", canxjs: true, express: false, nextjs: false },
  { feature: "250K+ req/sec", canxjs: true, express: false, nextjs: false },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-16 text-center animate-fade-in">
        <Badge variant="secondary" className="mb-4">About</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About CanxJS</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          CanxJS is a flexible React-inspired framework that gives you the 
          building blocks to create fast, production-ready backend applications.
        </p>
      </div>

      {/* Philosophy */}
      <section className="mb-20 animate-slide-up">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-muted-foreground mb-4">
              CanxJS was born from a simple idea: backend development should be as 
              enjoyable as modern frontend development. We took inspiration from 
              React&apos;s component model and Next.js&apos;s developer experience, then 
              applied it to backend development.
            </p>
            <p className="text-muted-foreground mb-4">
              Built specifically for Bun, CanxJS leverages the fastest JavaScript 
              runtime to deliver unprecedented performance without compromising on 
              developer experience.
            </p>
            <p className="text-muted-foreground">
              Whether you&apos;re building a simple API or a complex distributed system, 
              CanxJS provides the tools you need to ship fast and scale effortlessly.
            </p>
          </div>
          <div className="glass-card p-8">
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`p-2 rounded-lg ${feature.bgColor} w-fit mb-2`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mb-20 animate-slide-up delay-100">
        <h2 className="text-3xl font-bold mb-8 text-center">How CanxJS Compares</h2>
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold text-primary">CanxJS</th>
                  <th className="text-center p-4 font-semibold">Express</th>
                  <th className="text-center p-4 font-semibold">Next.js</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="p-4 text-sm">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.canxjs ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.express ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.nextjs ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-20 animate-slide-up delay-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open Source</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CanxJS is open source and community-driven. We believe in building 
            software together and welcome contributions from developers worldwide.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center hover-lift">
            <div className="p-3 rounded-xl bg-yellow-500/10 w-fit mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="font-semibold mb-2">Star on GitHub</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Show your support by starring our repository
            </p>
            <a
              href="https://github.com/chandafa/canx.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm hover:underline"
            >
              github.com/canxjs
            </a>
          </div>
          
          <div className="glass-card p-6 text-center hover-lift">
            <div className="p-3 rounded-xl bg-green-500/10 w-fit mx-auto mb-4">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold mb-2">Contribute</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Help improve CanxJS with bug fixes and features
            </p>
            <a
              href="https://github.com/chandafa/canx.js/contribute"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm hover:underline"
            >
              Contribution Guide
            </a>
          </div>
          
          <div className="glass-card p-6 text-center hover-lift">
            <div className="p-3 rounded-xl bg-blue-500/10 w-fit mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Join Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with other developers on Discord
            </p>
            <a
              href="https://discord.gg/canxjs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm hover:underline"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="animate-slide-up delay-300">
        <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start building your next project with CanxJS today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/installation">
                <Button size="lg" className="rounded-full px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Read Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
