import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Shield, ChevronRight, ArrowRight, Lock, Key, ShieldCheck, Eye } from "lucide-react";

const securityMiddlewareExample = `import { createApp, security, createRateLimiter, createRedisStore, cors } from "canxjs";

const app = createApp({ port: 3000 });

// Security headers middleware
app.use(security({
  xssProtection: true,           // X-XSS-Protection
  contentTypeOptions: true,      // X-Content-Type-Options: nosniff
  frameOptions: "DENY",          // X-Frame-Options
  hsts: {                        // Strict-Transport-Security
    maxAge: 31536000,
    includeSubDomains: true
  },
  contentSecurityPolicy: "default-src 'self'",
  referrerPolicy: "strict-origin-when-cross-origin"
}));

// Rate limiting
// Rate limiting (Enterprise)
app.use(createRateLimiter({
  windowMs: 60000,
  max: 100,
  // Use Redis for distributed limiting
  store: createRedisStore(redisClient) // or createMemoryStore()
}));

// CORS configuration
app.use(cors({
  origin: ["https://example.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));`;

const authMiddlewareExample = `import { MiddlewareHandler } from "canxjs";

export const authMiddleware: MiddlewareHandler = async (req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ 
      error: "Authentication required",
      code: "MISSING_TOKEN"
    });
  }
  
  try {
    // Verify JWT token
    const payload = await verifyJWT(token, process.env.JWT_SECRET!);
    
    // Store user in request context
    req.context.set("user", payload);
    req.context.set("userId", payload.sub);
    
    return next();
  } catch (error) {
    return res.status(401).json({ 
      error: "Invalid or expired token",
      code: "INVALID_TOKEN"
    });
  }
};

// Protected routes
app.get("/api/profile", authMiddleware, profileHandler);
app.group("/api/admin", (router) => {
  router.middleware(authMiddleware, adminMiddleware);
  router.get("/users", listUsers);
});`;

const passwordHashingExample = `// Using Bun's built-in password hashing
const hash = async (password: string) => {
  return await Bun.password.hash(password, {
    algorithm: "argon2id",  // or "bcrypt"
    memoryCost: 65536,
    timeCost: 3
  });
};

const verify = async (password: string, hash: string) => {
  return await Bun.password.verify(password, hash);
};

// Usage
app.post("/register", async (req, res) => {
  const { email, password } = await req.body();
  
  const hashedPassword = await hash(password);
  const user = await User.create({ email, password: hashedPassword });
  
  return res.status(201).json({ user });
});

app.post("/login", async (req, res) => {
  const { email, password } = await req.body();
  const user = await User.query().where("email", "=", email).first();
  
  if (!user || !await verify(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  const token = await signJWT({ sub: user.id }, { expiresIn: "7d" });
  return res.json({ token });
});`;

const inputValidationExample = `import { validate } from "canxjs";

app.post("/users", async (req, res) => {
  const data = await req.body();
  
  const result = validate(data, {
    name: ["required", "string", "min:2", "max:100"],
    email: ["required", "email"],
    password: ["required", "string", "min:8"],
    age: ["number", "min:18"]
  });
  
  if (!result.valid) {
    return res.status(400).json({ 
      error: "Validation failed",
      details: Object.fromEntries(result.errors)
    });
  }
  
  const user = await User.create(result.data);
  return res.status(201).json(user);
});`;

const csrfProtectionExample = `import { csrf } from "canxjs";

// Apply CSRF protection
app.use(csrf({
  cookie: true,
  cookieName: "_csrf",
  headerName: "x-csrf-token"
}));

// CSRF token endpoint
app.get("/api/csrf-token", (req, res) => {
  return res.json({ token: req.context.get("csrfToken") });
});`;

const bestPracticesExample = `// Environment variables
const config = {
  jwtSecret: process.env.JWT_SECRET!,
  dbPassword: process.env.DB_PASSWORD!,
  apiKey: process.env.API_KEY!
};

// Never log sensitive data
app.use(async (req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  // DON'T: console.log(req.header("authorization"))
  return next();
});

// Secure cookies
res.cookie("session", token, {
  httpOnly: true,   // Not accessible via JavaScript
  secure: true,     // HTTPS only
  sameSite: "Strict",
  maxAge: 86400
});

// Sanitize user input before database
const sanitized = input.replace(/<[^>]*>/g, "");`;

const features = [
  { icon: Shield, title: "Security Headers", desc: "XSS, CSRF, Content-Type protection" },
  { icon: Lock, title: "Rate Limiting", desc: "Built-in request rate limiting" },
  { icon: Key, title: "Password Hashing", desc: "Argon2id/bcrypt via Bun" },
  { icon: ShieldCheck, title: "Input Validation", desc: "Schema-based validation" },
];

export default function SecurityPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Shield className="w-3 h-3 mr-1.5" />Advanced
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Security</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Secure your CanxJS applications with built-in security features and best practices.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-green-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Security Middleware</h2>
        <CodePreview code={securityMiddlewareExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Key className="w-5 h-5 text-blue-400" /></div>
          Authentication
        </h2>
        <CodePreview code={authMiddlewareExample} filename="auth.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Password Hashing</h2>
        <CodePreview code={passwordHashingExample} filename="passwords.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Input Validation</h2>
        <CodePreview code={inputValidationExample} filename="validation.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">CSRF Protection</h2>
        <CodePreview code={csrfProtectionExample} filename="csrf.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10"><Eye className="w-5 h-5 text-yellow-400" /></div>
          Best Practices
        </h2>
        <CodePreview code={bestPracticesExample} filename="best-practices.ts" />
      </section>

      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Ready to deploy? Learn how to run CanxJS in production.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/deployment">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Deployment<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/api">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                API Reference<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
