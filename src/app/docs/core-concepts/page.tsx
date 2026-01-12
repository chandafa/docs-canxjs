import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Route, 
  FileCode, 
  Layers, 
  Database, 
  Palette, 
  ChevronRight,
  ArrowRight,
  Zap,
  Code2
} from "lucide-react";

const concepts = [
  {
    id: "routing",
    icon: Route,
    title: "Routing",
    description: "Define and manage application routes with a powerful, intuitive API.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    content: [
      {
        subtitle: "Basic Routes",
        text: "Define routes using HTTP method helpers like app.get(), app.post(), app.put(), and app.delete().",
        code: `app.get("/users", (req, res) => {
  res.json({ users: [] });
});

app.post("/users", (req, res) => {
  const user = req.body;
  res.json({ created: user });
});`
      },
      {
        subtitle: "Route Parameters",
        text: "Capture dynamic values from URLs using colon syntax.",
        code: `app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});`
      },
      {
        subtitle: "Route Groups",
        text: "Organize routes with prefixes and shared middleware.",
        code: `app.group("/api/v1", (router) => {
  router.get("/users", getUsers);
  router.get("/posts", getPosts);
});`
      }
    ]
  },
  {
    id: "controllers",
    icon: FileCode,
    title: "Controllers",
    description: "Organize request handling logic into reusable controller classes.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    content: [
      {
        subtitle: "Controller Classes",
        text: "Create controller classes to group related route handlers.",
        code: `export class UserController {
  async index(req: Request, res: Response) {
    const users = await User.all();
    res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await User.find(req.params.id);
    res.json(user);
  }
}`
      },
      {
        subtitle: "Resource Controllers",
        text: "Generate CRUD operations automatically with resource controllers.",
        code: `// Registers: index, show, store, update, destroy
app.resource("/posts", PostController);`
      }
    ]
  },
  {
    id: "middleware",
    icon: Layers,
    title: "Middleware",
    description: "Intercept and modify requests before they reach your route handlers.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    content: [
      {
        subtitle: "Creating Middleware",
        text: "Middleware functions receive request, response, and a next function.",
        code: `const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  req.user = await verifyToken(token);
  next();
};`
      },
      {
        subtitle: "Applying Middleware",
        text: "Apply middleware globally, to route groups, or individual routes.",
        code: `// Global middleware
app.use(logger());
app.use(cors());

// Route-specific
app.get("/admin", authMiddleware, adminHandler);

// Group middleware
app.group("/api", { middleware: [authMiddleware] }, (router) => {
  router.get("/profile", profileHandler);
});`
      }
    ]
  },
  {
    id: "models",
    icon: Database,
    title: "Models & ORM",
    description: "Query and manage your database with an elegant ORM.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    content: [
      {
        subtitle: "Defining Models",
        text: "Create model classes that map to database tables.",
        code: `import { Model } from "canxjs/orm";

export class User extends Model {
  static table = "users";
  
  id!: number;
  name!: string;
  email!: string;
  createdAt!: Date;
}`
      },
      {
        subtitle: "Querying Data",
        text: "Use the fluent query builder for database operations.",
        code: `// Find all users
const users = await User.all();

// Find by ID
const user = await User.find(1);

// Query with conditions
const admins = await User.where("role", "admin")
  .orderBy("createdAt", "desc")
  .limit(10)
  .get();`
      }
    ]
  },
  {
    id: "views",
    icon: Palette,
    title: "Views & JSX",
    description: "Build server-rendered views using familiar JSX syntax.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    content: [
      {
        subtitle: "JSX Templates",
        text: "Create views using JSX for type-safe, component-based templates.",
        code: `// views/Home.tsx
export function Home({ title, users }) {
  return (
    <Layout title={title}>
      <h1>Welcome to {title}</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Layout>
  );
}`
      },
      {
        subtitle: "Rendering Views",
        text: "Render views from your controllers with data.",
        code: `app.get("/", async (req, res) => {
  const users = await User.all();
  res.render(Home, { title: "My App", users });
});`
      }
    ]
  }
];

export default function CoreConceptsPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] dark:bg-white/[0.05] border-white/[0.1] text-muted-foreground dark:text-zinc-400">
          <Zap className="w-3 h-3 mr-1.5" />
          Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4">Core Concepts</h1>
        <p className="text-lg text-muted-foreground dark:text-zinc-400 leading-relaxed">
          Learn the fundamental building blocks of CanxJS applications. Master these concepts to build powerful, scalable APIs.
        </p>
      </div>

      {/* Quick Navigation */}
      <nav className="mb-12 p-4 rounded-2xl bg-muted/50 dark:bg-white/[0.02] border border-border dark:border-white/[0.08] animate-slide-up">
        <div className="text-sm text-muted-foreground dark:text-zinc-500 mb-3">On this page</div>
        <div className="flex flex-wrap gap-2">
          {concepts.map((concept) => (
            <a
              key={concept.id}
              href={`#${concept.id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background dark:bg-white/[0.03] hover:bg-accent dark:hover:bg-white/[0.06] border border-border dark:border-white/[0.08] text-sm transition-colors"
            >
              <concept.icon className={`w-4 h-4 ${concept.color}`} />
              {concept.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Concepts */}
      <div className="space-y-16">
        {concepts.map((concept, index) => (
          <section 
            key={concept.id} 
            id={concept.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl ${concept.bgColor}`}>
                <concept.icon className={`w-6 h-6 ${concept.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground dark:text-white">{concept.title}</h2>
                <p className="text-muted-foreground dark:text-zinc-500">{concept.description}</p>
              </div>
            </div>

            <div className="space-y-8 pl-4 border-l-2 border-border dark:border-white/[0.08]">
              {concept.content.map((item, itemIndex) => (
                <div key={itemIndex} className="ml-4">
                  <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">{item.subtitle}</h3>
                  <p className="text-muted-foreground dark:text-zinc-400 mb-4">{item.text}</p>
                  <div className="rounded-xl bg-zinc-950 dark:bg-zinc-950 border border-border dark:border-white/[0.08] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border dark:border-white/[0.08] bg-zinc-900/50">
                      <Code2 className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs text-zinc-500">TypeScript</span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm text-zinc-300 font-mono">{item.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Next Steps */}
      <section className="mt-16 animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-muted/50 dark:from-white/[0.03] to-muted/20 dark:to-white/[0.01] border border-border dark:border-white/[0.08] p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-3">Ready to dive deeper?</h2>
          <p className="text-muted-foreground dark:text-zinc-400 mb-6 max-w-md mx-auto">
            Explore the full API reference or follow our step-by-step tutorials.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/api">
              <Button className="rounded-full bg-foreground dark:bg-white text-background dark:text-black hover:bg-foreground/90 dark:hover:bg-zinc-200">
                API Reference
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="outline" className="rounded-full border-border dark:border-white/[0.15] hover:bg-accent dark:hover:bg-white/[0.05]">
                Tutorials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
