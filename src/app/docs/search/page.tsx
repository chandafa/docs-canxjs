import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Search, ChevronRight, ArrowRight, Database, Globe, Layers } from "lucide-react";

const usageExample = `import { searchManager } from "canxjs/search";

// 1. Search using default driver (database)
const results = await searchManager.driver().search("products", "Laptop");

// 2. Specific driver (e.g., Algolia or Elasticsearch if configured)
const results = await searchManager.driver("algolia").search("users", "John");

// 3. Register custom driver
searchManager.register("algolia", new AlgoliaDriver());`;

const driverExample = `import { SearchDriver } from "canxjs/search";

export class CustomSearchDriver implements SearchDriver {
  async search(index: string, query: string, options?: any) {
    // Perform search
    return [{ id: 1, title: "Result" }];
  }
  
  async index(item: any) {
    // Index item
  }
  
  async delete(id: string) {
    // Remove from index
  }
}`;

const features = [
  { icon: Search, title: "Unified Search", desc: "Standard interface for Database, Algolia, or Elasticsearch." },
  { icon: Database, title: "Database Driver", desc: "Built-in SQL support via LIKE queries." },
  { icon: Globe, title: "Driver Agnostic", desc: "Swap search engines without changing application code." },
  { icon: Layers, title: "Extensible", desc: "Easily add support for vector DBs or other engines." },
];

export default function SearchPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Search className="w-3 h-3 mr-1.5" />Discovery
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Search</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          A powerful abstraction for search engines. Start with simple Database search and scale to Algolia or Elasticsearch later.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <CodePreview code={usageExample} filename="search.service.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Custom Driver</h2>
        <CodePreview code={driverExample} filename="CustomSearchDriver.ts" />
      </section>
    </div>
  );
}
