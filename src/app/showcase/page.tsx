import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Trophy,
  Rocket,
  Zap,
  Building2,
  CreditCard,
  Cloud,
  Gamepad2,
  Users,
  Globe,
  Activity,
  Quote
} from "lucide-react";

const categoryIcons: Record<string, typeof Rocket> = {
  "API Gateway": Rocket,
  "Real-time": Zap,
  "Enterprise": Building2,
  "Fintech": CreditCard,
  "Cloud": Cloud,
  "Gaming": Gamepad2,
};

const showcaseProjects = [
  {
    id: 1,
    name: "TurboAPI",
    description: "High-performance API gateway serving 1M+ requests per minute",
    category: "API Gateway",
    stats: { requests: "1M+/min", uptime: "99.99%", latency: "<5ms" },
    testimonial: "CanxJS allowed us to achieve unprecedented performance without sacrificing developer experience.",
    author: "Sarah Chen, CTO",
  },
  {
    id: 2,
    name: "StreamFlow",
    description: "Real-time collaboration platform for creative teams",
    category: "Real-time",
    stats: { users: "50K+", connections: "10K concurrent", latency: "<10ms" },
    testimonial: "The HotWire protocol made implementing real-time features incredibly simple.",
    author: "Marcus Johnson, Lead Engineer",
  },
  {
    id: 3,
    name: "DataVault",
    description: "Enterprise data management and analytics platform",
    category: "Enterprise",
    stats: { data: "500TB+", queries: "100K/sec", uptime: "99.999%" },
    testimonial: "We migrated from Express and saw a 10x improvement in request handling.",
    author: "Alex Rivera, Architect",
  },
  {
    id: 4,
    name: "PayFlow",
    description: "Payment processing infrastructure for fintech startups",
    category: "Fintech",
    stats: { transactions: "$2B+", tps: "5000+", compliance: "PCI-DSS" },
    testimonial: "The built-in security features saved us months of development time.",
    author: "Jennifer Wu, Security Lead",
  },
  {
    id: 5,
    name: "CloudSync",
    description: "Multi-cloud synchronization service for enterprises",
    category: "Cloud",
    stats: { files: "1B+", sync: "Real-time", clouds: "AWS/GCP/Azure" },
    testimonial: "CanxJS's async-first design was perfect for our I/O-heavy workloads.",
    author: "David Kim, Platform Lead",
  },
  {
    id: 6,
    name: "GameServer",
    description: "Multiplayer game backend handling millions of players",
    category: "Gaming",
    stats: { players: "5M+", servers: "1000+", ping: "<20ms" },
    testimonial: "The WebSocket support and low latency were exactly what we needed.",
    author: "Mike Torres, Game Engineer",
  },
];

const stats = [
  { value: "250K+", label: "Developers", icon: Users },
  { value: "50K+", label: "Projects", icon: Rocket },
  { value: "1B+", label: "Requests/day", icon: Globe },
  { value: "99.9%", label: "Satisfaction", icon: Activity },
];

export default function ShowcasePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 text-center animate-fade-in">
        <Badge variant="secondary" className="mb-4">
          <Trophy className="w-3 h-3 mr-1 inline" />
          Showcase
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Showcase</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The web framework for when it matters. Peerless performance meets 
          elegant developer experience.
        </p>
      </div>

      {/* Stats */}
      <section className="mb-16 animate-slide-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="glass-card p-6 text-center hover-lift"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-2 rounded-lg bg-primary/10 w-fit mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-bold mb-8 text-center">Built with CanxJS</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseProjects.map((project, index) => {
            const Icon = categoryIcons[project.category] || Rocket;
            return (
              <div 
                key={project.id} 
                className="glass-card p-6 hover-lift group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="secondary" className="text-xs mb-2">{project.category}</Badge>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                  </div>
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-2 rounded-lg bg-muted/50">
                      <div className="text-sm font-semibold">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                {/* Testimonial */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm italic text-muted-foreground mb-2">
                        {project.testimonial}
                      </p>
                      <p className="text-xs font-medium">{project.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="animate-slide-up delay-200">
        <div className="glass-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Built something amazing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We&apos;d love to feature your project. Share what you&apos;ve built with CanxJS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 gap-2">
                <Rocket className="w-4 h-4" />
                Submit Your Project
              </Button>
              <Link href="/installation">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Start Building
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
