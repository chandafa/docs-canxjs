import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ApiReferencePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <BookOpen className="w-3 h-3 mr-1.5" />
          API Reference
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">API Reference</h1>
        <p className="text-lg text-zinc-400 leading-relaxed mb-8">
          Detailed documentation for all CanxJS modules, classes, and functions.
        </p>

        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search API reference..." 
            className="pl-9 bg-white/[0.03] border-white/[0.1] text-white"
          />
        </div>
      </div>

      <div className="grid gap-8">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h2 className="text-2xl font-bold text-white mb-4">Core</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ApiLink href="/api/create-app" name="createApp" description="Initialize a new application" />
            <ApiLink href="/api/router" name="Router" description="Handle HTTP routes" />
            <ApiLink href="/api/server" name="Server" description="Core server instance" />
            <ApiLink href="/api/middleware" name="Middleware" description="Middleware pipeline" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h2 className="text-2xl font-bold text-white mb-4">MVC</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ApiLink href="/api/controller" name="Controller" description="Base controller class" />
            <ApiLink href="/api/model" name="Model" description="Base model class" />
            <ApiLink href="/api/view" name="View" description="JSX view renderer" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ApiLink href="/api/websockets" name="WebSocket" description="Real-time communication" />
            <ApiLink href="/api/hotwire" name="HotWire" description="HTML over the wire" />
            <ApiLink href="/api/queue" name="Queue" description="Job queues" />
            <ApiLink href="/api/storage" name="Storage" description="File storage" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiLink({ href, name, description }: { href: string; name: string; description: string }) {
  return (
    <a href={href} className="group block p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-white/[0.05]">
      <div className="font-mono text-purple-400 mb-1 group-hover:text-purple-300">{name}</div>
      <div className="text-sm text-zinc-500">{description}</div>
    </a>
  );
}
