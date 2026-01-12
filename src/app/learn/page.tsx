import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  GraduationCap,
  Rocket,
  Zap
} from "lucide-react";

const learningPaths = [
  {
    level: "Beginner",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    items: [
      {
        title: "Getting Started with CanxJS",
        duration: "15 min",
        desc: "Learn the basics of CanxJS and create your first application",
        href: "/learn/getting-started",
      },
      {
        title: "Understanding Routing",
        duration: "20 min",
        desc: "Master the routing system and create dynamic routes",
        href: "/learn/routing-basics",
      },
      {
        title: "Working with Controllers",
        duration: "25 min",
        desc: "Organize your code with controller decorators",
        href: "/learn/controllers",
      },
    ],
  },
  {
    level: "Intermediate",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    items: [
      {
        title: "Database & ORM",
        duration: "30 min",
        desc: "Connect to databases and use the built-in ORM",
        href: "/learn/database",
      },
      {
        title: "Authentication & Security",
        duration: "35 min",
        desc: "Implement JWT authentication and protect routes",
        href: "/learn/authentication",
      },
      {
        title: "Building REST APIs",
        duration: "40 min",
        desc: "Create complete RESTful APIs with best practices",
        href: "/learn/rest-api",
      },
    ],
  },
  {
    level: "Advanced",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    items: [
      {
        title: "Real-time with HotWire",
        duration: "30 min",
        desc: "Build real-time features with HotWire protocol",
        href: "/learn/hotwire",
      },
      {
        title: "WebSocket Integration",
        duration: "35 min",
        desc: "Implement WebSocket servers for live updates",
        href: "/learn/websockets",
      },
      {
        title: "Performance Optimization",
        duration: "40 min",
        desc: "Optimize your app for 250,000+ req/sec",
        href: "/learn/performance",
      },
    ],
  },
];

const featuredTutorial = {
  title: "Build a Complete API in 30 Minutes",
  desc: "Learn how to build a production-ready REST API with authentication, database integration, and real-time features.",
  duration: "30 min read",
  href: "/learn/complete-api",
};

export default function LearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 text-center animate-fade-in">
        <Badge variant="secondary" className="mb-4">
          <GraduationCap className="w-3 h-3 mr-1 inline" />
          Learning Path
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Learn</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Go from beginner to expert by learning the foundations of CanxJS.
          Follow our structured learning path or jump to specific topics.
        </p>
      </div>

      {/* Featured Tutorial */}
      <section className="mb-16 animate-slide-up">
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
          <div className="relative">
            <Badge className="mb-4">
              <Rocket className="w-3 h-3 mr-1 inline" />
              Featured Tutorial
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{featuredTutorial.title}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">{featuredTutorial.desc}</p>
            <div className="flex items-center gap-4">
              <Link href={featuredTutorial.href}>
                <Button size="lg" className="rounded-full gap-2">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {featuredTutorial.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="animate-slide-up delay-100">
        <h2 className="text-2xl font-bold mb-8 text-center">Learning Paths</h2>
        <div className="space-y-12">
          {learningPaths.map((path, pathIndex) => (
            <div key={path.level} style={{ animationDelay: `${pathIndex * 100}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${path.bgColor} ${path.color}`}>
                  {path.level}
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {path.items.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`glass-card p-6 hover-lift group border-l-2 ${path.borderColor}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Start learning
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Tracker (Visual Only) */}
      <section className="mt-16 animate-slide-up delay-200">
        <div className="glass-card p-8 text-center">
          <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Track Your Progress</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to track your learning progress and earn badges as you complete tutorials.
          </p>
          <Button variant="outline" className="rounded-full">
            <Zap className="w-4 h-4 mr-2" />
            Coming Soon
          </Button>
        </div>
      </section>
    </div>
  );
}
