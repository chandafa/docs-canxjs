import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { TestTube2, ArrowRight, Play, Eye, MousePointerClick } from "lucide-react";

const testExample = `// tests/browser/login.test.ts
import { browse } from "canxjs/testing";
import { describe, test } from "bun:test";

describe("Login Flow", () => {
  test("user can login", async () => {
    await browse(async (browser) => {
      await browser.visit("/login")
                   .type("email", "test@example.com")
                   .type("password", "password")
                   .press("Login")
                   .waitForText("Dashboard")
                   .assertPathIs("/dashboard")
                   .assertSee("Welcome, Test User");
    });
  });
});`;

const apiExample = `await browse(async (browser) => {
  // Navigation
  await browser.visit("/");
  await browser.back();
  await browser.refresh();

  // Interaction
  await browser.type("input[name=search]", "Laptop");
  await browser.click("#search-btn");
  await browser.press("Enter");
  await browser.check("terms");

  // Assertions
  await browser.assertSee("Results");
  await browser.assertDontSee("Error");
  await browser.assertPathIs("/search");
  await browser.assertTitle("Search Results - My App");
  
  // Waiting
  await browser.waitFor(".modal");
  await browser.waitForText("Success");
});`;

export default function BrowserTestingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <TestTube2 className="w-3 h-3 mr-1.5" />Testing
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Browser Testing</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Expressive, fluent end-to-end browser testing. User interaction, page assertions, and JavaScript testing, 
          powered by Puppeteer but with a developer-friendly API.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
            <div className="p-2 rounded-lg bg-green-500/10 w-fit mb-3">
              <Play className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Fluent API</h3>
            <p className="text-sm text-zinc-500">Chainable methods like <code>visit().type().press()</code>.</p>
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
            <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Visual Testing</h3>
            <p className="text-sm text-zinc-500">See what your user sees with headless or headed modes.</p>
          </div>
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Writing Tests</h2>
        <p className="text-zinc-400 mb-6">
          Use the <code>browse</code> helper to spin up a browser instance. It automatically handles launching and closing the browser.
        </p>
        <CodePreview code={testExample} filename="tests/browser/login.test.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Available Methods</h2>
        <CodePreview code={apiExample} filename="Browser API" />
      </section>

      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">More Testing</h3>
          <p className="text-zinc-400 mb-6">Check out other testing utilities including HTTP and database assertions.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/testing">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Testing Guide <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
