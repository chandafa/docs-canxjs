"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SearchDialog } from "@/components/ui/SearchDialog";
import { Sun, Moon, Menu, Github, Search, Box, TestTube, LayoutTemplate, Puzzle } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const docsMenu = [
  {
    title: "Framework Next.js",
    href: "/docs/introduction",
    description: "Build robust backend applications with CanxJS.",
    icon: Box,
    color: "text-blue-500",
  },
  {
    title: "Docs Testing",
    href: "/docs/testing/installation",
    description: "Integration testing suite for CanxJS applications.",
    icon: TestTube,
    color: "text-green-500",
  },
  {
    title: "Docs Canx UI",
    href: "/docs/ui/installation",
    description: "Beautiful and accessible UI components.",
    icon: LayoutTemplate,
    color: "text-purple-500",
  },
  {
    title: "Docs Extension",
    href: "/extension",
    description: "VS Code extension for enhanced productivity.",
    icon: Puzzle,
    color: "text-orange-500",
  },
];

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/blog", label: "Blog" },
  { href: "/showcase", label: "Showcase" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark) || savedTheme === null;
    setIsDark(shouldBeDark);
    import("clsx").then(() => { if (shouldBeDark) document.documentElement.classList.add("dark"); });
    // Use direct DOM manipulation for immediate effect during hydration if needed, 
    // but the above is safer with standard React patterns.
    if (shouldBeDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 dark:bg-black/80 backdrop-blur-xl border-b border-border dark:border-white/[0.08]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Version */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-foreground to-muted-foreground dark:from-white dark:to-zinc-400 flex items-center justify-center text-background dark:text-black font-bold text-sm transition-transform group-hover:scale-105">
              C
            </div>
            <span className="font-semibold text-lg text-foreground dark:text-white">CanxJS</span>
          </Link>
          
          <Link 
            href="/docs"
            className="hidden sm:flex items-center px-2.5 py-1 rounded-full bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1] text-xs text-muted-foreground dark:text-zinc-400 hover:bg-accent dark:hover:bg-white/[0.1] hover:text-foreground dark:hover:text-zinc-300 transition-colors"
          >
            v1.2.0
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent dark:hover:bg-white/[0.05]">Docs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[600px] bg-background dark:bg-zinc-950">
                    {docsMenu.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              <item.icon className={cn("h-4 w-4", item.color)} />
                              <span className="text-foreground dark:text-zinc-100">{item.title}</span>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-zinc-400 mt-1 pl-6">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link 
                      href={link.href}
                      className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent dark:hover:bg-white/[0.05]")}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1] text-sm text-muted-foreground dark:text-zinc-500 hover:bg-accent dark:hover:bg-white/[0.08] hover:border-border dark:hover:border-white/[0.15] transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="hidden lg:inline ml-4 px-1.5 py-0.5 rounded bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.1] text-xs text-muted-foreground dark:text-zinc-600">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/chandafa/canx.js"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg hover:bg-accent dark:hover:bg-white/[0.05] transition-colors text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-white"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg hover:bg-accent dark:hover:bg-white/[0.05] transition-colors text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 transition-transform hover:rotate-12" />
            ) : (
              <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Get Started Button */}
          <Link href="/docs/introduction" className="hidden sm:block ml-2">
            <Button
              size="sm"
              className="rounded-full px-5 bg-foreground dark:bg-white text-background dark:text-black hover:bg-foreground/90 dark:hover:bg-zinc-200 transition-all hover:scale-105 font-medium"
            >
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2.5 rounded-lg hover:bg-accent dark:hover:bg-white/[0.05] transition-colors text-muted-foreground dark:text-zinc-400 ml-1">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background dark:bg-zinc-950 border-border dark:border-white/[0.08] p-6 text-foreground overflow-y-auto">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Docs Menu */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">Documentation</h4>
                  <div className="grid gap-2">
                    {docsMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent dark:hover:bg-white/[0.05] transition-colors"
                      >
                        <item.icon className={cn("w-5 h-5", item.color)} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <hr className="border-border dark:border-white/[0.08]" />

                {/* Other Links */}
                <div className="flex flex-col gap-2">
                   {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 text-lg font-medium text-muted-foreground dark:text-zinc-300 hover:text-foreground dark:hover:text-white hover:bg-accent dark:hover:bg-white/[0.05] rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <hr className="border-border dark:border-white/[0.08]" />

                <div className="space-y-4">
                  <a
                    href="https://github.com/chandafa/canx.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-lg font-medium text-muted-foreground dark:text-zinc-300 hover:text-foreground dark:hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                  <Link href="/docs/introduction">
                    <Button className="w-full rounded-xl bg-foreground dark:bg-white text-background dark:text-black hover:bg-foreground/90 dark:hover:bg-zinc-200" size="lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
