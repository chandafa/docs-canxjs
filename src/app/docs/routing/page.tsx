import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Route as RouteIcon, 
  ChevronRight,
  ArrowRight,
  Code2,
  Layers,
  Zap,
  Settings,
  FolderTree,
  Asterisk
} from "lucide-react";

const basicRoutesExample = `import { createApp } from "canxjs";

const app = createApp({ port: 3000 });

// GET request
app.get("/", (req, res) => {
  return res.json({ message: "Hello CanxJS!" });
});

// POST request
app.post("/users", async (req, res) => {
  const userData = await req.body();
  return res.status(201).json({ created: userData });
});

// PUT request
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const userData = await req.body();
  return res.json({ updated: { id, ...userData } });
});

// DELETE request
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ deleted: id });
});

app.listen();`;

const routeParamsExample = `// Single parameter
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ userId: id });
});

// Multiple parameters
app.get("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  return res.json({ postId, commentId });
});

// Optional query parameters
app.get("/search", (req, res) => {
  const { q, page, limit } = req.query;
  return res.json({ 
    query: q, 
    page: page || 1, 
    limit: limit || 10 
  });
});`;

const wildcardRoutesExample = `// Wildcard route - catches all paths after /files/
app.get("/files/*path", (req, res) => {
  const filePath = req.params.path;
  return res.json({ 
    message: "File requested",
    path: filePath 
  });
});

// Catch-all 404 handler
app.all("*", (req, res) => {
  return res.status(404).json({ 
    error: "Not Found",
    path: req.path 
  });
});`;

const routeGroupsExample = `// Group routes with a common prefix
app.group("/api/v1", (router) => {
  router.get("/users", getUsers);
  router.get("/users/:id", getUser);
  router.post("/users", createUser);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);
});

// Nested groups
app.group("/admin", (admin) => {
  admin.group("/users", (users) => {
    users.get("/", listAdminUsers);
    users.post("/", createAdminUser);
  });
  
  admin.group("/settings", (settings) => {
    settings.get("/", getSettings);
    settings.put("/", updateSettings);
  });
});`;

const routerOptionsExample = `import { createRouter, createApp } from "canxjs";

// Create router with options
const router = createRouter({
  caseSensitive: true,     // /Users ≠ /users
  trailingSlash: "remove", // /users/ → /users
  cache: true              // Enable route caching
});

// Use the router
router.get("/users", getUsers);
router.post("/users", createUser);

// Mount router
const app = createApp({ port: 3000 });
// Routes from router are registered with app`;

const routeMiddlewareExample = `import { createApp, cors, logger } from "canxjs";

const app = createApp({ port: 3000 });

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header("authorization");
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  req.context.set("user", { id: 1, name: "John" });
  return next();
};

// Apply middleware to specific route
app.get("/profile", authMiddleware, (req, res) => {
  const user = req.context.get("user");
  return res.json({ profile: user });
});

// Apply middleware to route group
app.group("/api", (router) => {
  router.middleware(authMiddleware);
  router.get("/dashboard", getDashboard);
  router.get("/settings", getSettings);
});`;

const controllerRoutingExample = `import { createApp, QueueController } from "canxjs";
import { HomeController } from "./controllers/HomeController";
import { AuthController } from "./controllers/AuthController";

// New in v1.2.4: Controller-based routing
app.routes((router) => {
  // Mount controllers with router.controller()
  router.controller('/', HomeController);
  router.controller('/auth', AuthController);
  
  // Built-in Queue Dashboard
  router.controller('/canx-queue', QueueController);
});`;

const features = [
  { 
    icon: Zap, 
    title: "Radix Tree Based", 
    desc: "Ultra-fast route matching with O(k) complexity where k is the path length" 
  },
  { 
    icon: Settings, 
    title: "Route Parameters", 
    desc: "Capture dynamic values from URLs with :paramName syntax" 
  },
  { 
    icon: Asterisk, 
    title: "Wildcard Routes", 
    desc: "Match multiple path segments with *wildcard syntax" 
  },
  { 
    icon: FolderTree, 
    title: "Route Groups", 
    desc: "Organize routes with prefixes and shared middleware" 
  },
];

export default function RoutingPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <RouteIcon className="w-3 h-3 mr-1.5" />
          Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Routing</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Define and manage application routes with CanxJS's powerful, intuitive API. 
          Built on a Radix Tree for ultra-fast route matching with support for parameters, 
          wildcards, and route groups.
        </p>
      </div>

      {/* Features Grid */}
      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Basic Routes */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Code2 className="w-5 h-5 text-blue-400" />
          </div>
          Basic Routes
        </h2>
        <p className="text-zinc-400 mb-6">
          Define routes using HTTP method helpers like <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">app.get()</code>, 
          <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded ml-1">app.post()</code>, 
          <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded ml-1">app.put()</code>, and 
          <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded ml-1">app.delete()</code>. 
          Each method takes a path and a handler function.
        </p>
        <CodePreview code={basicRoutesExample} filename="app.ts" />
      </section>

      {/* Route Parameters */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Settings className="w-5 h-5 text-green-400" />
          </div>
          Route Parameters
        </h2>
        <p className="text-zinc-400 mb-6">
          Capture dynamic values from URLs using colon syntax (<code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">:paramName</code>). 
          Parameters are available in <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">req.params</code>, while query strings 
          are in <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">req.query</code>.
        </p>
        <CodePreview code={routeParamsExample} filename="routes.ts" />
      </section>

      {/* Wildcard Routes */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Asterisk className="w-5 h-5 text-purple-400" />
          </div>
          Wildcard Routes
        </h2>
        <p className="text-zinc-400 mb-6">
          Use wildcards (<code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">*</code>) to match 
          any path segment. You can also name wildcards to capture the matched path. Use 
          <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded ml-1">app.all()</code> to match all HTTP methods.
        </p>
        <CodePreview code={wildcardRoutesExample} filename="wildcards.ts" />
      </section>

      {/* Route Groups */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <FolderTree className="w-5 h-5 text-orange-400" />
          </div>
          Route Groups
        </h2>
        <p className="text-zinc-400 mb-6">
          Organize routes with common prefixes using <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">app.group()</code>. 
          Groups can be nested to create hierarchical route structures.
        </p>
        <CodePreview code={routeGroupsExample} filename="groups.ts" />
      </section>

      {/* Route with Middleware */}
      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          Route Middleware
        </h2>
        <p className="text-zinc-400 mb-6">
          Apply middleware to specific routes or route groups. Middleware is executed in order 
          before the route handler.
        </p>
        <CodePreview code={routeMiddlewareExample} filename="middleware.ts" />
      </section>

      {/* Controller-based Routing */}
      <section className="mb-16 animate-slide-up delay-550">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10">
            <Code2 className="w-5 h-5 text-pink-400" />
          </div>
          Controller-based Routing
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">v1.2.4</Badge>
        </h2>
        <p className="text-zinc-400 mb-6">
          New in v1.2.4: Use <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">router.controller()</code> to 
          register entire controller classes with their decorated routes. This provides cleaner, 
          more organized routing similar to Laravel.
        </p>
        <CodePreview code={controllerRoutingExample} filename="routes.ts" />
      </section>

      {/* Router Options */}
      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4">Router Options</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-white/[0.08]">
                <th className="pb-3 font-medium">Option</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Default</th>
                <th className="pb-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">caseSensitive</td>
                <td className="py-3 text-zinc-500">boolean</td>
                <td className="py-3 text-zinc-500">false</td>
                <td className="py-3 text-zinc-400">Treat /Users and /users as different routes</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">trailingSlash</td>
                <td className="py-3 text-zinc-500">'ignore' | 'require' | 'remove'</td>
                <td className="py-3 text-zinc-500">'ignore'</td>
                <td className="py-3 text-zinc-400">How to handle trailing slashes</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">cache</td>
                <td className="py-3 text-zinc-500">boolean</td>
                <td className="py-3 text-zinc-500">true</td>
                <td className="py-3 text-zinc-400">Enable route matching cache</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={routerOptionsExample} filename="router-options.ts" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Now that you understand routing, learn how to organize your handlers with controllers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/controllers">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Controllers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/middleware">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Middleware
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
