import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Shield, ChevronRight, ArrowRight, Code2, Database, Key, Zap } from "lucide-react";

const configExample = `// config/session.ts
export const sessionConfig = {
  // Supported drivers: "memory", "database", "file", "redis"
  driver: process.env.SESSION_DRIVER || "database",
  
  // Session lifetime in seconds (default: 2 hours)
  lifetime: 120 * 60,
  
  // Cookie name
  cookie: "canx_session",
  
  // Database table name (for database driver)
  table: "sessions",
};`;

const migrationExample = `import { Migration, Schema } from "canxjs";

export class CreateSessionsTable extends Migration {
  async up() {
    await Schema.create("sessions", (table) => {
      table.string("id").primary();
      table.foreignId("user_id").nullable().index();
      table.string("ip_address", 45).nullable();
      table.text("user_agent").nullable();
      table.text("payload");
      table.integer("last_activity").index();
    });
  }

  async down() {
    await Schema.drop("sessions");
  }
}`;

const usageExample = `// In a controller or route handler
export const login = async (req, res) => {
  // Store data in session
  req.session.put("user_id", user.id);
  req.session.put("role", "admin");
  
  // Flash messages (available only on next request)
  req.session.flash("success", "Welcome back!");
  
  return res.redirect("/dashboard");
};

export const dashboard = async (req, res) => {
  // Retrieve data
  const userId = req.session.get("user_id");
  const message = req.session.get("success"); // Flash message
  
  // Remove data
  req.session.forget("key");
  
  // Clear entire session
  req.session.flush();
};`;

const features = [
  { icon: Database, title: "Multiple Drivers", desc: "Support for Database, Redis, File, and Memory stores" },
  { icon: Shield, title: "Secure by Default", desc: "HttpOnly cookies, CSRF protection, and encryption" },
  { icon: Zap, title: "Flash Data", desc: "Store temporary data for the very next request" },
  { icon: Key, title: "Typed API", desc: "Type-safe session interface for better DX" },
];

export default function SessionPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Shield className="w-3 h-3 mr-1.5" />Security
        </Badge>
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Session Management</h1>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">v1.3.5</Badge>
        </div>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Manage user state across requests with a powerful, driver-based session system. 
          CanxJS v1.3.5 introduces robust Database and Redis drivers for production-ready session handling.
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
        <h2 className="text-2xl font-semibold text-white mb-4">Configuration</h2>
        <p className="text-zinc-400 mb-6">
          Configure your session driver in <code>config/session.ts</code>. By default, 
          <code>database</code> driver is recommended for production.
        </p>
        <CodePreview code={configExample} filename="config/session.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10"><Database className="w-5 h-5 text-orange-400" /></div>
          Database Driver Setup
        </h2>
        <p className="text-zinc-400 mb-6">
          To use the <code>database</code> driver, you must create a migration for the sessions table.
        </p>
        <CodePreview code={migrationExample} filename="database/migrations/create_sessions_table.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><Code2 className="w-5 h-5 text-purple-400" /></div>
          Usage
        </h2>
        <p className="text-zinc-400 mb-6">
          Access the session instance via the request object <code>req.session</code>.
        </p>
        <CodePreview code={usageExample} filename="controllers/AuthController.ts" />
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Secure your application with comprehensive authentication features.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/security">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Security Guide<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
