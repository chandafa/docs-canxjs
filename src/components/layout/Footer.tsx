import Link from "next/link";
import { Github, Twitter } from "lucide-react";

const footerLinks = {
  resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/learn", label: "Learn" },
    { href: "/blog", label: "Blog" },
    { href: "/showcase", label: "Showcase" },
  ],
  documentation: [
    { href: "/docs/introduction", label: "Introduction" },
    { href: "/docs/installation", label: "Installation" },
    { href: "/docs/core-concepts", label: "Core Concepts" },
    { href: "/docs/cli", label: "CLI Commands" },
    { href: "/docs/api", label: "API Reference" },
  ],
  community: [
    { href: "https://github.com/chandafa/canx.js", label: "GitHub", external: true },
    { href: "https://discord.gg/canxjs", label: "Discord", external: true },
    { href: "https://twitter.com/canxjs", label: "Twitter", external: true },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border dark:border-white/[0.05] bg-background dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-foreground to-muted-foreground dark:from-white dark:to-zinc-400 flex items-center justify-center text-background dark:text-black font-bold text-sm transition-transform group-hover:scale-105">
                C
              </div>
              <span className="font-semibold text-lg text-foreground dark:text-white">CanxJS</span>
            </Link>
            <p className="text-sm text-muted-foreground dark:text-zinc-500 leading-relaxed max-w-xs">
              Ultra-fast async MVC backend framework for Bun. Build production-ready APIs with elegance and speed.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/chandafa/canx.js"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted dark:bg-white/[0.03] border border-border dark:border-white/[0.08] text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-white hover:bg-accent dark:hover:bg-white/[0.06] hover:border-border dark:hover:border-white/[0.12] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/canxjs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted dark:bg-white/[0.03] border border-border dark:border-white/[0.08] text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-white hover:bg-accent dark:hover:bg-white/[0.06] hover:border-border dark:hover:border-white/[0.12] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground dark:text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground dark:text-white mb-4">Documentation</h4>
            <ul className="space-y-3">
              {footerLinks.documentation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground dark:text-zinc-500 hover:text-foreground dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground dark:text-zinc-600">
            © {new Date().getFullYear()} CanxJS. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground dark:text-zinc-600">
            Built with ❤️ for Candra Kirana
          </p>
        </div>
      </div>
    </footer>
  );
}
