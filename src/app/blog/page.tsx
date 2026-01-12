import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Mail, Newspaper, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building REST APIs with CanxJS",
    excerpt: "Learn how to build production-ready REST APIs with CanxJS. This guide covers routing, controllers, validation, and more.",
    category: "Tutorial",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    href: "/blog/building-rest-apis",
    featured: true,
  },
  {
    id: 2,
    title: "CanxJS v1.2.0 Release Notes",
    excerpt: "Announcing CanxJS v1.2.0 with WebSocket support, improved ORM, and better TypeScript integration.",
    category: "Release",
    date: "Jan 8, 2026",
    readTime: "4 min read",
    href: "/blog/v1-2-0-release",
    featured: true,
  },
  {
    id: 3,
    title: "Why Bun Makes CanxJS So Fast",
    excerpt: "A deep dive into how Bun's runtime enables CanxJS to achieve 250,000+ requests per second.",
    category: "Deep Dive",
    date: "Jan 5, 2026",
    readTime: "12 min read",
    href: "/blog/bun-performance",
    featured: false,
  },
  {
    id: 4,
    title: "Authentication Best Practices",
    excerpt: "Implement secure authentication in your CanxJS applications with JWT, sessions, and OAuth.",
    category: "Security",
    date: "Jan 2, 2026",
    readTime: "10 min read",
    href: "/blog/authentication-best-practices",
    featured: false,
  },
  {
    id: 5,
    title: "From Express to CanxJS Migration Guide",
    excerpt: "Step-by-step guide to migrate your existing Express.js application to CanxJS.",
    category: "Guide",
    date: "Dec 28, 2025",
    readTime: "15 min read",
    href: "/blog/express-migration",
    featured: false,
  },
  {
    id: 6,
    title: "Real-time Features with HotWire",
    excerpt: "Build real-time applications without WebSocket complexity using CanxJS HotWire protocol.",
    category: "Tutorial",
    date: "Dec 22, 2025",
    readTime: "9 min read",
    href: "/blog/hotwire-tutorial",
    featured: false,
  },
];

const categories = ["All", "Tutorial", "Release", "Deep Dive", "Security", "Guide"];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 text-center animate-fade-in">
        <Badge variant="secondary" className="mb-4">
          <Newspaper className="w-3 h-3 mr-1 inline" />
          Blog
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Guides, tutorials, and insights on building APIs with CanxJS.
          Learn best practices and stay updated with the latest features.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-12 justify-center animate-slide-up">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              category === "All"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Posts */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Featured
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.map((post, index) => (
            <Link
              key={post.id}
              href={post.href}
              className="glass-card overflow-hidden hover-lift group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <FileText className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="animate-slide-up delay-200">
        <h2 className="text-xl font-semibold mb-6">All Posts</h2>
        <div className="space-y-4">
          {regularPosts.map((post, index) => (
            <Link
              key={post.id}
              href={post.href}
              className="block glass-card p-6 hover-lift group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                    {post.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-16 animate-slide-up delay-300">
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
          <div className="relative text-center">
            <div className="p-3 rounded-xl bg-primary/10 w-fit mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Subscribe to our newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest tutorials and updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
