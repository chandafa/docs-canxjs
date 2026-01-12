import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg animate-fade-in">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[150px] sm:text-[200px] font-bold text-gradient leading-none select-none animate-pulse-soft">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-16 h-16 sm:w-24 sm:h-24 text-primary/20 animate-float" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          The page might have been moved, deleted, or never existed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/">
            <Button size="lg" className="rounded-full px-6 gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" size="lg" className="rounded-full px-6 gap-2">
              <Search className="w-4 h-4" />
              Browse Docs
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="glass-card p-6 text-left">
          <h2 className="font-semibold mb-4">Popular Pages</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { href: "/installation", label: "Installation Guide" },
              { href: "/docs", label: "Documentation" },
              { href: "/learn", label: "Tutorials" },
              { href: "/showcase", label: "Showcase" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm group"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors rotate-180" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
