import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  FileCode, 
  ChevronRight,
  ArrowRight,
  Code2,
  Box,
  Sparkles,
  Layers,
  Database
} from "lucide-react";

const basicControllerExample = `import { BaseController, Get, Post, Put, Delete, Controller } from "canxjs";

@Controller("/users")
export class UserController extends BaseController {
  
  @Get("/")
  async index() {
    const users = await User.all();
    return this.json(users);
  }

  @Get("/:id")
  async show() {
    const user = await User.find(this.param("id"));
    
    if (!user) {
      return this.json({ error: "User not found" }, 404);
    }
    
    return this.json(user);
  }

  @Post("/")
  async store() {
    const data = await this.body<CreateUserDto>();
    const user = await User.create(data);
    return this.json(user, 201);
  }

  @Put("/:id")
  async update() {
    const id = this.param("id");
    const data = await this.body<UpdateUserDto>();
    const user = await User.update(id, data);
    return this.json(user);
  }

  @Delete("/:id")
  async destroy() {
    const id = this.param("id");
    await User.delete(id);
    return this.json({ deleted: true });
  }
}`;

const controllerDecoratorsExample = `import { Controller, Get, Post, Middleware } from "canxjs";
import { authMiddleware, adminMiddleware } from "./middlewares";

// Apply middleware to entire controller
@Controller("/admin")
@Middleware(authMiddleware, adminMiddleware)
export class AdminController extends BaseController {
  
  @Get("/dashboard")
  async dashboard() {
    const stats = await this.getDashboardStats();
    return this.json(stats);
  }
  
  // Apply additional middleware to specific method
  @Get("/secrets")
  @Middleware(superAdminMiddleware)
  async secrets() {
    return this.json({ secret: "classified" });
  }
}`;

const baseControllerMethodsExample = `export class ArticleController extends BaseController {
  
  @Get("/:id")
  async show() {
    // Access route parameters
    const id = this.param("id");
    
    // Access query parameters
    const includeComments = this.query("include") === "comments";
    
    // Access request headers
    const userAgent = this.header("user-agent");
    
    // Access cookies
    const sessionId = this.cookie("session_id");

    const article = await Article.find(id);
    
    // Send JSON response
    return this.json(article);
  }

  @Post("/")
  async store() {
    // Get request body with type
    const data = await this.body<CreateArticleDto>();
    
    const article = await Article.create(data);
    
    // Set cookie
    this.setCookie("last_article", article.id, {
      httpOnly: true,
      maxAge: 86400
    });
    
    return this.json(article, 201);
  }

  @Get("/:id/edit")
  async edit() {
    const id = this.param("id");
    const article = await Article.find(id);
    
    if (!article) {
      // Redirect to another page
      return this.redirect("/articles");
    }
    
    // Render HTML
    return this.html(\`<h1>Edit: \${article.title}</h1>\`);
  }
}`;

const registerControllerExample = `import { createApp } from "canxjs";
import { UserController } from "./controllers/UserController";
import { ArticleController } from "./controllers/ArticleController";

const app = createApp({ port: 3000 });

// Register controllers
app.controller(UserController);
app.controller(ArticleController);

app.listen();`;

const resourceControllerExample = `import { BaseController } from "canxjs";

// Resource controller with CRUD operations
export class PostController extends BaseController {
  // GET /posts
  async index() {
    return this.json(await Post.all());
  }

  // GET /posts/:id
  async show() {
    return this.json(await Post.find(this.param("id")));
  }

  // POST /posts
  async store() {
    const data = await this.body();
    return this.json(await Post.create(data), 201);
  }

  // PUT /posts/:id
  async update() {
    const id = this.param("id");
    const data = await this.body();
    return this.json(await Post.update(id, data));
  }

  // DELETE /posts/:id
  async destroy() {
    await Post.delete(this.param("id"));
    return this.json({ success: true });
  }
}

// Register as resource route
app.resource("/posts", PostController);`;

const features = [
  { 
    icon: Box, 
    title: "Class-Based", 
    desc: "Organize related routes into clean, reusable controller classes" 
  },
  { 
    icon: Sparkles, 
    title: "Decorators", 
    desc: "Use @Get, @Post, @Put, @Delete decorators for clean routing" 
  },
  { 
    icon: Layers, 
    title: "Middleware", 
    desc: "Apply middleware at controller or method level with @Middleware" 
  },
  { 
    icon: Database, 
    title: "Base Controller", 
    desc: "Built-in helper methods for common tasks like JSON, redirect, body" 
  },
];

export default function ControllersPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <FileCode className="w-3 h-3 mr-1.5" />
          Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Controllers</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Organize your request handling logic into reusable controller classes. 
          CanxJS controllers use TypeScript decorators for clean, expressive route definitions.
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
              <div className="p-2 rounded-lg bg-green-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Basic Controller */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Code2 className="w-5 h-5 text-green-400" />
          </div>
          Creating a Controller
        </h2>
        <p className="text-zinc-400 mb-6">
          Create a controller class that extends <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">BaseController</code> 
          and use decorators to define routes. The <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">@Controller</code> decorator 
          sets the base path prefix for all routes in the controller.
        </p>
        <CodePreview code={basicControllerExample} filename="controllers/UserController.ts" />
      </section>

      {/* Route Decorators */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Route Decorators</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-white/[0.08]">
                <th className="pb-3 font-medium">Decorator</th>
                <th className="pb-3 font-medium">HTTP Method</th>
                <th className="pb-3 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs text-green-400">@Get(path)</td>
                <td className="py-3 text-zinc-500">GET</td>
                <td className="py-3 text-zinc-400">Retrieve resources</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs text-blue-400">@Post(path)</td>
                <td className="py-3 text-zinc-500">POST</td>
                <td className="py-3 text-zinc-400">Create new resources</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs text-yellow-400">@Put(path)</td>
                <td className="py-3 text-zinc-500">PUT</td>
                <td className="py-3 text-zinc-400">Update entire resources</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs text-orange-400">@Patch(path)</td>
                <td className="py-3 text-zinc-500">PATCH</td>
                <td className="py-3 text-zinc-400">Partial updates</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs text-red-400">@Delete(path)</td>
                <td className="py-3 text-zinc-500">DELETE</td>
                <td className="py-3 text-zinc-400">Remove resources</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Controller Middleware */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          Controller Middleware
        </h2>
        <p className="text-zinc-400 mb-6">
          Apply middleware to the entire controller or specific methods using 
          the <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">@Middleware</code> decorator.
        </p>
        <CodePreview code={controllerDecoratorsExample} filename="controllers/AdminController.ts" />
      </section>

      {/* BaseController Methods */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Box className="w-5 h-5 text-blue-400" />
          </div>
          BaseController Methods
        </h2>
        <p className="text-zinc-400 mb-4">
          The <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">BaseController</code> class 
          provides helpful methods for common operations:
        </p>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-white/[0.08]">
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.json(data, status?)</td>
                <td className="py-3 text-zinc-400">Send JSON response</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.html(content, status?)</td>
                <td className="py-3 text-zinc-400">Send HTML response</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.redirect(url, status?)</td>
                <td className="py-3 text-zinc-400">Redirect to URL</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.param(key)</td>
                <td className="py-3 text-zinc-400">Get route parameter</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.query(key)</td>
                <td className="py-3 text-zinc-400">Get query parameter</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.body&lt;T&gt;()</td>
                <td className="py-3 text-zinc-400">Get typed request body</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.header(name)</td>
                <td className="py-3 text-zinc-400">Get request header</td>
              </tr>
              <tr className="border-b border-white/[0.05]">
                <td className="py-3 font-mono text-xs">this.cookie(name)</td>
                <td className="py-3 text-zinc-400">Get cookie value</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-xs">this.setCookie(name, value, options?)</td>
                <td className="py-3 text-zinc-400">Set cookie</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={baseControllerMethodsExample} filename="controllers/ArticleController.ts" />
      </section>

      {/* Registering Controllers */}
      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Registering Controllers</h2>
        <p className="text-zinc-400 mb-6">
          Register controllers with your application using the <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">app.controller()</code> method.
        </p>
        <CodePreview code={registerControllerExample} filename="app.ts" />
      </section>

      {/* Resource Controllers */}
      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Database className="w-5 h-5 text-orange-400" />
          </div>
          Resource Controllers
        </h2>
        <p className="text-zinc-400 mb-6">
          Generate CRUD operations automatically with resource controllers. 
          Use <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">app.resource()</code> to 
          register standard REST routes.
        </p>
        <CodePreview code={resourceControllerExample} filename="controllers/PostController.ts" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Learn how to intercept and modify requests with middleware.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/middleware">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Middleware
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/request-response">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Request & Response
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
