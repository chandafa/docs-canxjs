import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Terminal, 
  ArrowRight,
  ChevronRight,
  Folder,
  Play,
  Database,
  Wrench,
  Package,
  RefreshCw
} from "lucide-react";

const cliCommands = [
  {
    category: "Project Creation",
    icon: <Folder className="w-4 h-4 text-blue-400" />,
    commands: [
      { 
        command: "bunx create-canx my-app", 
        description: "Create a new CanxJS project with the default MVC template" 
      },
      { 
        command: "bunx create-canx my-app --api", 
        description: "Create an API-only project without views" 
      },
      { 
        command: "bunx create-canx my-app --micro", 
        description: "Create a minimal microservice setup" 
      },
      { 
        command: "bunx create-canx my-app --ts", 
        description: "Create project with strict TypeScript configuration" 
      },
    ],
  },
  {
    category: "Development",
    icon: <Play className="w-4 h-4 text-green-400" />,
    commands: [
      { 
        command: "bun run dev", 
        description: "Start development server with hot reload" 
      },
      { 
        command: "bun run build", 
        description: "Build for production" 
      },
      { 
        command: "bun run start", 
        description: "Start production server" 
      },
      { 
        command: "bun run lint", 
        description: "Run ESLint on your codebase" 
      },
    ],
  },
  {
    category: "Database",
    icon: <Database className="w-4 h-4 text-purple-400" />,
    commands: [
      { 
        command: "bun run migrate", 
        description: "Run pending migrations" 
      },
      { 
        command: "bun run migrate:rollback", 
        description: "Rollback the last batch of migrations" 
      },
      { 
        command: "bun run migrate:fresh", 
        description: "Drop all tables and re-run all migrations" 
      },
      { 
        command: "bun run canx seed", 
        description: "Run database seeders" 
      },
      { 
        command: "bun run make:migration create_users", 
        description: "Create a new migration file" 
      },
      { 
        command: "bun run make:seeder UserSeeder", 
        description: "Create a new seeder file" 
      },
    ],
  },
  {
    category: "Generators",
    icon: <Wrench className="w-4 h-4 text-orange-400" />,
    commands: [
      { 
        command: "bun run make:controller UserController", 
        description: "Create a new controller" 
      },
      { 
        command: "bun run make:model User", 
        description: "Create a new model" 
      },
      { 
        command: "bun run make:middleware Auth", 
        description: "Create a new middleware" 
      },

    ],
  },
  {
    category: "Utilities",
    icon: <RefreshCw className="w-4 h-4 text-cyan-400" />,
    commands: [
      { 
        command: "bun run canx cache:clear", 
        description: "Clear application cache" 
      },
      { 
        command: "bun run canx optimize", 
        description: "Optimize framework for production (clear caches, etc)" 
      },
      { 
        command: "bun run canx schedule:run", 
        description: "Run scheduled tasks manually" 
      },
      { 
        command: "bun run canx routes", 
        description: "List all registered routes" 
      },
      { 
        command: "bun run canx env", 
        description: "Display current environment configuration" 
      },
    ],
  },
];

const createAppExample = `# Create a new project
bunx create-canx my-app

# Navigate to project
cd my-app

# Install dependencies
bun install

# Start development server
bun run dev`;

const makeControllerExample = `# Create a controller
bun run make:controller UserController

# Creates: src/controllers/UserController.ts
# With basic CRUD methods: index, show, store, update, destroy`;

export default function CLIPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Terminal className="w-3 h-3 mr-1.5" />
          Reference
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">CLI Commands</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          CanxJS provides a powerful CLI to help you scaffold, develop, and maintain your applications.
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          Quick Start
        </h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          Create and run your first CanxJS application in seconds.
        </p>
        <CodePreview 
          code={createAppExample}
          filename="Terminal"
          showLineNumbers={false}
        />
      </section>

      {/* Command Categories */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-8">All Commands</h2>
        
        <div className="space-y-10">
          {cliCommands.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                {category.icon}
                {category.category}
              </h3>
              
              <div className="space-y-3">
                {category.commands.map((cmd) => (
                  <div 
                    key={cmd.command}
                    className="rounded-xl bg-white/[0.02] border border-white/[0.08] p-4 hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors"
                  >
                    <code className="block font-mono text-sm text-white mb-2">
                      $ {cmd.command}
                    </code>
                    <p className="text-sm text-zinc-500">{cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Generator Example */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Wrench className="w-5 h-5 text-orange-400" />
          </div>
          Generator Example
        </h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          The CLI generators create boilerplate code for you, following CanxJS conventions.
        </p>
        <CodePreview 
          code={makeControllerExample}
          filename="Terminal"
          showLineNumbers={false}
        />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Learn more about the CanxJS API and how to use it in your applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/api">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                API Reference
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/routing">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Learn Routing
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
