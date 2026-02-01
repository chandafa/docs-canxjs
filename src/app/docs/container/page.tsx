import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Box, ArrowRight, GitMerge, RefreshCw } from "lucide-react";

const basicExample = `import { Injectable, Inject, container } from "canxjs";

@Injectable()
class ConfigService {
  constructor() {
    console.log("ConfigService initialized");
  }
  
  get(key: string) {
    return process.env[key];
  }
}

@Injectable()
class UserService {
  constructor(
    private config: ConfigService // Auto-wired
  ) {}

  getUser() {
    const dbName = this.config.get("DB_NAME");
    // ...
  }
}

// Resolve instance (ConfigService is auto-injected)
const userService = await container.resolve(UserService);`;

const interfaceExample = `// Define a token for the interface
const MAIL_PROVIDER = Symbol("MAIL_PROVIDER");

interface MailProvider {
  send(to: string, body: string): void;
}

@Injectable()
class SmtpMailer implements MailProvider {
  send(to, body) { console.log('Sending via SMTP'); }
}

@Injectable()
class MockMailer implements MailProvider {
  send(to, body) { console.log('Mock email sent'); }
}

// Bind implementation to token
container.bind(MAIL_PROVIDER, SmtpMailer);

@Injectable()
class NotificationService {
  constructor(
    @Inject(MAIL_PROVIDER) private mailer: MailProvider
  ) {}

  notify() {
    this.mailer.send('user@example.com', 'Hello');
  }
}`;

const scopeExample = `import { Injectable, Scope } from "canxjs";

// Singleton (Default) - One instance per application
@Injectable({ scope: Scope.DEFAULT })
class SingletonService {}

// Transient - New instance every time it's resolved
@Injectable({ scope: Scope.TRANSIENT })
class TransientService {}

// Request - One instance per HTTP request
@Injectable({ scope: Scope.REQUEST })
class RequestContextService {
  constructor(@Inject("request") private req: any) {}
}`;

const features = [
  { icon: GitMerge, title: "Auto-Wiring", desc: "Automatically resolves constructor dependencies." },
  { icon: RefreshCw, title: "Scopes", desc: "Singleton, Transient, and Request-scoped bindings." },
  { icon: Box, title: "Interface Binding", desc: "Bind concrete classes to abstract tokens/symbols." },
];

export default function ContainerPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Box className="w-3 h-3 mr-1.5" />Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Dependency Injection</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Manage your application&apos;s dependencies with a powerful IoC Container. Support for Singletons, Transients, and Request-scoped services.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-pink-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic Usage</h2>
        <p className="text-zinc-400 mb-6">
          Use <code>@Injectable()</code> to mark classes as dependencies. The container automatically resolves constructor parameters.
        </p>
        <CodePreview code={basicExample} filename="services.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Interface Binding</h2>
        <p className="text-zinc-400 mb-6">
          Decouple your code by injecting interfaces (via tokens) instead of concrete classes.
        </p>
        <CodePreview code={interfaceExample} filename="mail.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Scopes</h2>
        <p className="text-zinc-400 mb-6">Control the lifecycle of your dependencies.</p>
        <CodePreview code={scopeExample} filename="scopes.ts" />
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn how modules organize your application.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/providers">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Service Providers<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
