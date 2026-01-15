import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Key, ChevronRight, ArrowRight, Shield, User } from "lucide-react";

const authSetupExample = `import { auth } from "canxjs";

// Hashing Passwords
const hashedPassword = await auth.hash("password123");
const isValid = await auth.verify("password123", hashedPassword);

// JWT Creation
const token = await auth.sign({ sub: user.id }, { secret: process.env.JWT_SECRET });

// Verify Token
const payload = await auth.verifyToken(token, { secret: process.env.JWT_SECRET });`;

const middlewareExample = `import { createApp, protect, roles } from "canxjs";

const app = createApp();

const config = { secret: process.env.JWT_SECRET };

// Protect all routes in this group
app.group("/api/private", (router) => {
    router.use(protect(config)); // Validates Bearer token
    
    router.get("/dashboard", (req) => {
        const user = req.context.get("user");
        return { message: \`Hello \${user.sub}\` };
    });
    
    // Role-based access control
    router.get("/admin", roles("admin"), (req) => {
        return { message: "Admin area" };
    });
});`;

export default function AuthenticationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Key className="w-3 h-3 mr-1.5" />Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Authentication</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          CanxJS provides a built-in, comprehensive authentication system supporting JWT, Session, and Role-based access control.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Shield className="w-5 h-5 text-blue-400" /></div>
          Auth Helpers
        </h2>
        <p className="text-zinc-400 mb-6">
          Use the <code>auth</code> utility for common tasks like hashing passwords or managing tokens.
        </p>
        <CodePreview code={authSetupExample} filename="src/auth.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10"><User className="w-5 h-5 text-green-400" /></div>
          Middleware
        </h2>
        <p className="text-zinc-400 mb-6">
          Protect your routes using the built-in middlewares.
        </p>
        <CodePreview code={middlewareExample} filename="src/routes.ts" />
      </section>

       <section className="animate-slide-up delay-200">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn about Session management.</p>
          <div className="flex flex-wrap gap-4">
             <Link href="/docs/session">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Session<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
