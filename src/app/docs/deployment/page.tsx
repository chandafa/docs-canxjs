import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Rocket, ChevronRight, ArrowRight, Server, Cloud, Container, Zap } from "lucide-react";

const productionBuildExample = `# Run directly with Bun (Recommended)
bun run src/main.ts

# Or build for production (Optional)
bun build ./src/main.ts --outdir ./dist --target bun --minify
bun run ./dist/main.js`;

const envConfigExample = `// canx.config.ts
export default {
  port: parseInt(process.env.PORT || "3000"),
  hostname: process.env.HOST || "0.0.0.0",
  development: process.env.NODE_ENV !== "production",
  
  database: {
    driver: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || false,
  }
};`;

const envFileExample = `# .env.production
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=myapp
DB_USER=myapp
DB_PASSWORD=secret

# Security
JWT_SECRET=your-super-secret-key
CORS_ORIGIN=https://example.com

# Optional
LOG_LEVEL=info`;

const dockerfileExample = `# Dockerfile
FROM oven/bun:1.0 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN bun install --production

# Copy source
COPY src ./src
COPY public ./public
COPY tsconfig.json ./

# Environment authentication
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["bun", "run", "src/main.ts"]`;

const dockerComposeExample = `# docker-compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=3306
      - DB_NAME=myapp
      - DB_USER=myapp
      - DB_PASSWORD=secret
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      - MYSQL_DATABASE=myapp
      - MYSQL_USER=myapp
      - MYSQL_PASSWORD=secret
      - MYSQL_ROOT_PASSWORD=rootsecret
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:`;

const systemdExample = `# /etc/systemd/system/canxjs.service
[Unit]
Description=CanxJS Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/myapp
ExecStart=/root/.bun/bin/bun run src/main.ts
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target

# Enable and start
# sudo systemctl enable canxjs
# sudo systemctl start canxjs`;

const nginxExample = `# /etc/nginx/sites-available/myapp
upstream canxjs {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://canxjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

const healthCheckExample = `import { createApp, healthCheck } from "canxjs";

const app = createApp({ port: 3000 });

// Health check endpoint
app.get("/health", healthCheck({
  checks: [
    { name: "database", check: async () => await db.ping() },
    { name: "redis", check: async () => await redis.ping() }
  ]
}));

// Returns: { status: "healthy", checks: [...], uptime: 12345 }`;

const features = [
  { icon: Server, title: "VPS/Bare Metal", desc: "Deploy with systemd and nginx" },
  { icon: Container, title: "Docker", desc: "Containerized deployment" },
  { icon: Cloud, title: "Cloud Platforms", desc: "Railway, Fly.io, Render" },
  { icon: Zap, title: "Edge Ready", desc: "Deploy to edge networks" },
];

export default function DeploymentPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Rocket className="w-3 h-3 mr-1.5" />Advanced
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Deployment</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Deploy your CanxJS application to production with Docker, VPS, or cloud platforms.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-orange-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Production Build</h2>
        <CodePreview code={productionBuildExample} filename="terminal" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Environment Configuration</h2>
        <CodePreview code={envConfigExample} filename="canx.config.ts" />
        <div className="mt-4" />
        <CodePreview code={envFileExample} filename=".env.production" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Container className="w-5 h-5 text-blue-400" /></div>
          Docker Deployment
        </h2>
        <CodePreview code={dockerfileExample} filename="Dockerfile" />
        <div className="mt-4" />
        <CodePreview code={dockerComposeExample} filename="docker-compose.yml" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10"><Server className="w-5 h-5 text-green-400" /></div>
          VPS Deployment
        </h2>
        <CodePreview code={systemdExample} filename="canxjs.service" />
        <div className="mt-4" />
        <CodePreview code={nginxExample} filename="nginx.conf" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Health Checks</h2>
        <CodePreview code={healthCheckExample} filename="health.ts" />
      </section>

      <section className="animate-slide-up delay-600">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Need Help?</h3>
          <p className="text-zinc-400 mb-6">Check the API reference or join our community.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/api">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                API Reference<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Documentation<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
