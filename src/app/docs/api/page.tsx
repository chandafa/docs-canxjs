import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Code2, 
  ArrowRight,
  ChevronRight,
  Server,
  Route,
  Layers,
  Database,
  Shield,
  Radio,
  FileCode,
  Zap
} from "lucide-react";

const apiCategories = [
  {
    title: "Core",
    icon: <Server className="w-4 h-4 text-blue-400" />,
    items: [
      {
        name: "createApp",
        signature: "createApp(options?: AppOptions): Application",
        description: "Creates a new CanxJS application instance",
        example: `import { createApp } from "canxjs";

const app = createApp({
  port: 3000,
  debug: true,
});`,
      },
      {
        name: "Application.listen",
        signature: "app.listen(callback?: () => void): void",
        description: "Starts the HTTP server on the configured port",
        example: `app.listen(() => {
  console.log("Server running on port 3000");
});`,
      },
    ],
  },
  {
    title: "Routing",
    icon: <Route className="w-4 h-4 text-green-400" />,
    items: [
      {
        name: "app.get",
        signature: "app.get(path: string, ...handlers: Handler[]): void",
        description: "Register a GET route handler",
        example: `app.get("/users", (req, res) => {
  res.json({ users: [] });
});`,
      },
      {
        name: "app.post",
        signature: "app.post(path: string, ...handlers: Handler[]): void",
        description: "Register a POST route handler",
        example: `app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});`,
      },
      {
        name: "app.put / app.patch",
        signature: "app.put(path: string, ...handlers: Handler[]): void",
        description: "Register PUT/PATCH route handlers for updates",
        example: `app.put("/users/:id", async (req, res) => {
  const user = await User.update(req.params.id, req.body);
  res.json(user);
});`,
      },
      {
        name: "app.delete",
        signature: "app.delete(path: string, ...handlers: Handler[]): void",
        description: "Register a DELETE route handler",
        example: `app.delete("/users/:id", async (req, res) => {
  await User.delete(req.params.id);
  res.status(204).send();
});`,
      },
    ],
  },
  {
    title: "Middleware",
    icon: <Layers className="w-4 h-4 text-purple-400" />,
    items: [
      {
        name: "app.use",
        signature: "app.use(...middleware: Middleware[]): void",
        description: "Register global middleware",
        example: `import { logger, cors, json } from "canxjs";

app.use(logger());
app.use(cors());
app.use(json());`,
      },
      {
        name: "logger",
        signature: "logger(options?: LoggerOptions): Middleware",
        description: "HTTP request logging middleware",
        example: `app.use(logger({
  format: "combined",
  colorize: true,
}));`,
      },
      {
        name: "cors",
        signature: "cors(options?: CorsOptions): Middleware",
        description: "Cross-Origin Resource Sharing middleware",
        example: `app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));`,
      },
      {
        name: "rateLimit",
        signature: "rateLimit(options?: RateLimitOptions): Middleware",
        description: "Rate limiting middleware",
        example: `app.use(rateLimit({
  max: 100,
  window: 60000, // 1 minute
}));`,
      },
    ],
  },
  {
    title: "Request & Response",
    icon: <FileCode className="w-4 h-4 text-orange-400" />,
    items: [
      {
        name: "req.params",
        signature: "req.params: Record<string, string>",
        description: "Route parameters extracted from the URL",
        example: `app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
});`,
      },
      {
        name: "req.query",
        signature: "req.query: Record<string, string>",
        description: "Query string parameters",
        example: `// GET /users?page=1&limit=10
app.get("/users", (req, res) => {
  const { page, limit } = req.query;
});`,
      },
      {
        name: "req.body",
        signature: "req.body: any",
        description: "Parsed request body (requires json/urlencoded middleware)",
        example: `app.post("/users", (req, res) => {
  const { name, email } = req.body;
});`,
      },
      {
        name: "res.json",
        signature: "res.json(data: any): void",
        description: "Send a JSON response",
        example: `res.json({ message: "Success", data: user });`,
      },
      {
        name: "res.status",
        signature: "res.status(code: number): Response",
        description: "Set the HTTP status code",
        example: `res.status(201).json({ created: true });
res.status(404).json({ error: "Not found" });`,
      },
    ],
  },
  {
    title: "Database",
    icon: <Database className="w-4 h-4 text-cyan-400" />,
    items: [
      {
        name: "Model.all",
        signature: "Model.all(): Promise<T[]>",
        description: "Get all records from the model",
        example: `const users = await User.all();`,
      },
      {
        name: "Model.find",
        signature: "Model.find(id: number | string): Promise<T | null>",
        description: "Find a record by primary key",
        example: `const user = await User.find(1);`,
      },
      {
        name: "Model.where",
        signature: "Model.where(conditions: object): QueryBuilder",
        description: "Filter records by conditions",
        example: `const activeUsers = await User
  .where({ status: "active" })
  .orderBy("created_at", "desc")
  .get();`,
      },
      {
        name: "Model.create",
        signature: "Model.create(data: object): Promise<T>",
        description: "Create a new record",
        example: `const user = await User.create({
  name: "John Doe",
  email: "john@example.com",
});`,
      },
    ],
  },
  {
    title: "WebSocket",
    icon: <Radio className="w-4 h-4 text-pink-400" />,
    items: [
      {
        name: "app.ws",
        signature: "app.ws(path: string, handler: WsHandler): void",
        description: "Register a WebSocket route",
        example: `app.ws("/chat", (ws, req) => {
  ws.on("message", (msg) => {
    ws.send(\`Echo: \${msg}\`);
  });
});`,
      },
      {
        name: "broadcast",
        signature: "broadcast(channel: string, data: any): void",
        description: "Broadcast message to all connected clients",
        example: `import { broadcast } from "canxjs";

broadcast("notifications", {
  type: "new_message",
  data: message,
});`,
      },
    ],
  },
];

export default function APIPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Code2 className="w-3 h-3 mr-1.5" />
          Reference
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">API Reference</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Complete reference for all CanxJS APIs, methods, and utilities.
        </p>
      </div>

      {/* Quick Navigation */}
      <section className="mb-12 animate-slide-up">
        <div className="flex flex-wrap gap-2">
          {apiCategories.map((category) => (
            <a 
              key={category.title}
              href={`#${category.title.toLowerCase()}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors"
            >
              {category.icon}
              {category.title}
            </a>
          ))}
        </div>
      </section>

      {/* API Categories */}
      <section className="space-y-16 animate-slide-up delay-100">
        {apiCategories.map((category) => (
          <div key={category.title} id={category.title.toLowerCase()}>
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3 sticky top-20 bg-black/80 backdrop-blur-sm py-2 -mx-2 px-2 z-10">
              <div className="p-2 rounded-lg bg-white/[0.05]">
                {category.icon}
              </div>
              {category.title}
            </h2>
            
            <div className="space-y-8">
              {category.items.map((item) => (
                <div 
                  key={item.name}
                  className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden"
                >
                  <div className="p-6 border-b border-white/[0.05]">
                    <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                      {item.name}
                    </h3>
                    <code className="block text-sm text-purple-400 font-mono mb-3">
                      {item.signature}
                    </code>
                    <p className="text-zinc-400 text-sm">{item.description}</p>
                  </div>
                  <div className="bg-zinc-950/50">
                    <CodePreview 
                      code={item.example}
                      filename="Example"
                      className="border-0 rounded-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Next Steps */}
      <section className="mt-16 animate-slide-up delay-200">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Need More Help?</h3>
          <p className="text-zinc-400 mb-6">
            Explore more guides or join our community for support.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/introduction">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Read Introduction
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a
              href="https://github.com/chandafa/canx.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                GitHub
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
