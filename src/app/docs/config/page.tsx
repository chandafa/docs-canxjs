import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Settings, 
  ArrowRight,
  ChevronRight,
  Database,
  Server,
  Lock,
  Globe,
  FileCode
} from "lucide-react";

const configSections = [
  {
    title: "App Configuration",
    description: "Core application settings",
    items: [
      { name: "port", type: "number", default: "3000", description: "Server port" },
      { name: "host", type: "string", default: "localhost", description: "Server hostname" },
      { name: "env", type: "string", default: "development", description: "Environment mode" },
      { name: "debug", type: "boolean", default: "false", description: "Enable debug mode" },
    ],
  },
  {
    title: "Database Configuration",
    description: "Database connection settings",
    items: [
      { name: "driver", type: "string", default: "mysql", description: "Database driver (mysql, postgres)" },
      { name: "host", type: "string", default: "localhost", description: "Database host" },
      { name: "port", type: "number", default: "3306", description: "Database port" },
      { name: "database", type: "string", default: "-", description: "Database name" },
      { name: "username", type: "string", default: "-", description: "Database username" },
      { name: "password", type: "string", default: "-", description: "Database password" },
    ],
  },
  {
    title: "Security Configuration",
    description: "Security and authentication settings",
    items: [
      { name: "cors.enabled", type: "boolean", default: "true", description: "Enable CORS" },
      { name: "cors.origin", type: "string | array", default: "*", description: "Allowed origins" },
      { name: "rateLimit.enabled", type: "boolean", default: "true", description: "Enable rate limiting" },
      { name: "rateLimit.max", type: "number", default: "100", description: "Max requests per window" },
      { name: "rateLimit.window", type: "number", default: "60000", description: "Window in ms" },
    ],
  },
];

const configExample = `// canx.config.ts
import { defineConfig } from "canxjs";

export default defineConfig({
  app: {
    port: 3000,
    host: "localhost",
    env: "development",
    debug: true,
  },
  
  database: {
    driver: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    database: process.env.DB_NAME || "canx_app",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
  },

  security: {
    cors: {
      enabled: true,
      origin: ["http://localhost:3000"],
      credentials: true,
    },
    rateLimit: {
      enabled: true,
      max: 100,
      window: 60000, // 1 minute
    },
  },

  cache: {
    driver: "memory", // or "redis"
    ttl: 3600,
  },
});`;

const envExample = `# .env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=canx_app
DB_USER=root
DB_PASS=secret

# Security
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret

# Cache
REDIS_URL=redis://localhost:6379`;

export default function ConfigPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Settings className="w-3 h-3 mr-1.5" />
          Getting Started
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Configuration</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Learn how to configure your CanxJS application using the configuration file and environment variables.
        </p>
      </div>

      {/* Config File Section */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <FileCode className="w-5 h-5 text-purple-400" />
          </div>
          Configuration File
        </h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          Create a <code className="px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 font-mono text-sm">canx.config.ts</code> file in your project root to customize your application settings.
        </p>
        <CodePreview 
          code={configExample}
          filename="canx.config.ts"
          language="typescript"
        />
      </section>

      {/* Environment Variables Section */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Globe className="w-5 h-5 text-green-400" />
          </div>
          Environment Variables
        </h2>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          Use environment variables to store sensitive configuration. Create a <code className="px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 font-mono text-sm">.env</code> file in your project root.
        </p>
        <CodePreview 
          code={envExample}
          filename=".env"
          language="bash"
        />
      </section>

      {/* Configuration Options */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-8">Configuration Options</h2>
        
        <div className="space-y-10">
          {configSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                {index === 0 && <Server className="w-4 h-4 text-blue-400" />}
                {index === 1 && <Database className="w-4 h-4 text-green-400" />}
                {index === 2 && <Lock className="w-4 h-4 text-orange-400" />}
                {section.title}
              </h3>
              <p className="text-sm text-zinc-500 mb-4">{section.description}</p>
              
              <div className="rounded-xl border border-white/[0.08] overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.03]">
                    <tr className="border-b border-white/[0.08]">
                      <th className="text-left px-4 py-3 font-medium text-zinc-400">Option</th>
                      <th className="text-left px-4 py-3 font-medium text-zinc-400">Type</th>
                      <th className="text-left px-4 py-3 font-medium text-zinc-400">Default</th>
                      <th className="text-left px-4 py-3 font-medium text-zinc-400">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, idx) => (
                      <tr key={item.name} className={idx !== section.items.length - 1 ? "border-b border-white/[0.05]" : ""}>
                        <td className="px-4 py-3 font-mono text-white">{item.name}</td>
                        <td className="px-4 py-3 text-purple-400">{item.type}</td>
                        <td className="px-4 py-3 text-zinc-500">{item.default}</td>
                        <td className="px-4 py-3 text-zinc-400">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Now that you understand configuration, learn about routing and controllers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/routing">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Learn Routing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/cli">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                CLI Commands
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
