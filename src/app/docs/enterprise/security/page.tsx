import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  Shield, 
  ChevronRight,
  ArrowRight,
  Lock,
  Key,
  FileText,
  Eye
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Security",
  description: "Bank-grade security features including Audit Logging, Secrets Management, and OAuth2 Provider for CanxJS.",
  openGraph: {
    title: "Enterprise Security - CanxJS",
    description: "Bank-grade security with SOC2/HIPAA compliance, secrets management, and OAuth2 support.",
  },
};

const auditLoggingCode = `import { Audit, auditLogger } from 'canxjs';

class PaymentController {
  
  // Method Decorator - automatically logs action
  @Audit('payment.process') 
  async process(req: Request) {
    // Your payment logic here
  }

  // Manual Logging - more control
  async refund(req: Request) {
    await auditLogger().log('payment.refund', {
      actor: { id: req.user.id, type: 'user' },
      resource: { type: 'payment', id: '123' },
      status: 'success',
      metadata: { reason: 'customer_request' }
    });
  }
}`;

const secretsManagerCode = `import { secrets } from 'canxjs';

// Get or Throw (if missing)
const apiKey = await secrets.getOrThrow('STRIPE_API_KEY');

// Get with default
const dbHost = await secrets.get('DB_HOST') || 'localhost';

// Batch get
const { DB_USER, DB_PASS } = await secrets.getMany([
  'DB_USER', 
  'DB_PASS'
]);

// Configure driver
secrets.configure({
  driver: 'vault',
  url: process.env.VAULT_URL,
  token: process.env.VAULT_TOKEN
});`;

const oauth2ProviderCode = `import { OAuth2Server, createAuthorizationServer } from 'canxjs';

const authServer = createAuthorizationServer({
  issuer: 'https://auth.myapp.com',
  clients: [
    { 
      id: 'mobile-app',
      secret: 'super-secret',
      redirectUris: ['myapp://callback']
    }
  ]
});

// Authorization endpoint
app.get('/oauth/authorize', authServer.authorize());

// Token endpoint
app.post('/oauth/token', authServer.token());

// Protected resource
app.get('/api/userinfo', authServer.authenticate(), (req) => {
  return { user: req.user };
});`;

const rateLimitCode = `import { rateLimit, createRateLimiter } from 'canxjs';

// Simple rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
}));

// Per-route rate limiting
app.post('/api/login', 
  rateLimit({ max: 5, windowMs: 60000 }),
  loginHandler
);

// Custom key generator
const userLimiter = createRateLimiter({
  max: 1000,
  keyGenerator: (req) => req.user?.id || req.ip
});`;

const features = [
  { 
    icon: FileText, 
    title: "Audit Logging", 
    desc: "Immutable audit trails for SOC2, HIPAA, and GDPR compliance.",
    color: "blue"
  },
  { 
    icon: Key, 
    title: "Secrets Manager", 
    desc: "Unified interface for Vault, AWS Secrets Manager, or environment variables.",
    color: "green"
  },
  { 
    icon: Lock, 
    title: "OAuth2 Provider", 
    desc: "Turn your app into an Identity Provider with built-in OAuth2 server.",
    color: "purple"
  },
  { 
    icon: Eye, 
    title: "Rate Limiting", 
    desc: "Protect against brute force and DDoS with configurable rate limits.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function SecurityDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Shield className="w-3 h-3 mr-1.5" />
          Enterprise
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Enterprise Security</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Bank-grade security features including Audit Logging, Secrets Management, and OAuth2 Provider. 
          Build compliant applications with SOC2, HIPAA, and GDPR support.
        </p>
      </div>

      {/* Features Grid */}
      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="rounded-2xl bg-card border border-border p-5 hover:bg-accent/50 transition-all duration-300"
            >
              <div className={`p-2 rounded-lg w-fit mb-3 ${colorClasses[item.color]}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audit Logging */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          Audit Logging
        </h2>
        <p className="text-muted-foreground mb-6">
          Create immutable audit trails for compliance. Use the <code className="text-primary bg-muted px-1.5 py-0.5 rounded">@Audit</code> decorator 
          or <code className="text-primary bg-muted px-1.5 py-0.5 rounded">auditLogger()</code> for manual logging.
        </p>
        <CodePreview code={auditLoggingCode} filename="controllers/PaymentController.ts" />
      </section>

      {/* Secrets Manager */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Key className="w-5 h-5 text-green-400" />
          </div>
          Secrets Manager
        </h2>
        <p className="text-muted-foreground mb-6">
          Unified interface to access secrets from Environment, HashiCorp Vault, or AWS Secrets Manager.
        </p>
        <CodePreview code={secretsManagerCode} filename="config/secrets.ts" />
      </section>

      {/* OAuth2 Provider */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Lock className="w-5 h-5 text-purple-400" />
          </div>
          OAuth2 Provider
        </h2>
        <p className="text-muted-foreground mb-6">
          Turn your CanxJS application into an Identity Provider (IdP) with built-in OAuth2 Server support.
        </p>
        <CodePreview code={oauth2ProviderCode} filename="auth/oauth-server.ts" />
      </section>

      {/* Rate Limiting */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Eye className="w-5 h-5 text-orange-400" />
          </div>
          Rate Limiting
        </h2>
        <p className="text-muted-foreground mb-6">
          Protect your API from abuse with configurable rate limiting at global or route level.
        </p>
        <CodePreview code={rateLimitCode} filename="app.ts" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
          <p className="text-muted-foreground mb-6">
            Explore other enterprise features for building production-ready applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/enterprise/microservices">
              <Button className="rounded-full">
                Microservices
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/authentication">
              <Button variant="outline" className="rounded-full">
                Authentication
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
