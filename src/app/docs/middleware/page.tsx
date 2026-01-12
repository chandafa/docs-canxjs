import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Layers, ChevronRight, ArrowRight, Code2, Shield, Clock, Zap, Globe } from "lucide-react";

const basicMiddlewareExample = `import { CanxRequest, CanxResponse, NextFunction } from "canxjs";

const myMiddleware = async (
  req: CanxRequest, 
  res: CanxResponse, 
  next: NextFunction
) => {
  console.log("Request started:", req.method, req.path);
  const result = await next();
  console.log("Request completed");
  return result;
};`;

const applyingMiddlewareExample = `import { createApp, logger, cors } from "canxjs";

const app = createApp({ port: 3000 });

// Global middleware
app.use(logger());
app.use(cors());

// Route-specific middleware
app.get("/admin", authMiddleware, adminHandler);

// Group middleware
app.group("/api", (router) => {
  router.middleware(authMiddleware);
  router.get("/profile", profileHandler);
});`;

const authMiddlewareExample = `export const authMiddleware = async (req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  try {
    const user = await verifyToken(token);
    req.context.set("user", user);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};`;

const builtInMiddlewareExample = `import { createApp, logger, cors, rateLimit, compress } from "canxjs";

const app = createApp({ port: 3000 });

app.use(logger());  // Logs: [2024-01-15] GET /api/users - 12ms

app.use(cors({
  origin: ["https://example.com"],
  credentials: true
}));

app.use(rateLimit({ windowMs: 60000, max: 100 }));

app.use(compress());`;

const errorMiddlewareExample = `const errorHandler = async (req, res, next) => {
  try {
    return await next();
  } catch (error) {
    console.error("[Error]", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

app.use(errorHandler);`;

const features = [
  { icon: Shield, title: "Authentication", desc: "Protect routes with auth middleware" },
  { icon: Clock, title: "Rate Limiting", desc: "Built-in rate limiting protection" },
  { icon: Zap, title: "Logging", desc: "Request logging with timing" },
  { icon: Globe, title: "CORS", desc: "Cross-origin configuration" },
];

export default function MiddlewarePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Layers className="w-3 h-3 mr-1.5" />Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Middleware</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Intercept and modify requests before they reach your route handlers with an async-first pipeline.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-purple-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><Code2 className="w-5 h-5 text-purple-400" /></div>
          Creating Middleware
        </h2>
        <p className="text-zinc-400 mb-6">
          Middleware functions receive request, response, and <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">next</code>.
        </p>
        <CodePreview code={basicMiddlewareExample} filename="middleware.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Applying Middleware</h2>
        <p className="text-zinc-400 mb-6">Apply globally, to specific routes, or route groups.</p>
        <CodePreview code={applyingMiddlewareExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10"><Shield className="w-5 h-5 text-green-400" /></div>
          Authentication Middleware
        </h2>
        <CodePreview code={authMiddlewareExample} filename="auth.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Built-in Middleware</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-zinc-400 border-b border-white/[0.08]">
              <th className="pb-3">Middleware</th><th className="pb-3">Description</th>
            </tr></thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]"><td className="py-3 font-mono text-xs text-purple-400">logger()</td><td className="py-3 text-zinc-400">Logs request details</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-3 font-mono text-xs text-purple-400">cors(opts)</td><td className="py-3 text-zinc-400">CORS configuration</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-3 font-mono text-xs text-purple-400">rateLimit(opts)</td><td className="py-3 text-zinc-400">Rate limit by IP</td></tr>
              <tr><td className="py-3 font-mono text-xs text-purple-400">compress()</td><td className="py-3 text-zinc-400">Gzip compression</td></tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={builtInMiddlewareExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Error Handling</h2>
        <CodePreview code={errorMiddlewareExample} filename="errorHandler.ts" />
      </section>

      <section className="animate-slide-up delay-600">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn about Request and Response objects.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/request-response">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Request & Response<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/core-concepts">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Core Concepts<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
