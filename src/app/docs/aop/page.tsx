import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Scissors, ChevronRight, ArrowRight, Shield, Filter, Eye } from "lucide-react";

const interceptorExample = `import { createInterceptor, UseInterceptors } from "canxjs";

// Define an Interceptor
const LoggingInterceptor = createInterceptor(async (context, next) => {
  console.log('Before...');
  const now = Date.now();
  
  const result = await next();
  
  console.log(\`After... \${Date.now() - now}ms\`);
  return result;
});

// Apply to Controller or Method
@UseInterceptors(LoggingInterceptor)
class CatsController {
  // ...
}`;

const guardExample = `import { createGuard, UseGuards } from "canxjs";

const AuthGuard = createGuard((context) => {
  const req = context.getRequest();
  return validateRequest(req);
});

@UseGuards(AuthGuard)
class protectedController {}`;

const pipeExample = `import { ParseIntPipe, UsePipes } from "canxjs";

@Post()
@UsePipes(ParseIntPipe) // Transforms params automatically
create(@Body() createCatDto: CreateCatDto) {
  // ...
}`;

const features = [
  { icon: Eye, title: "Interceptors", desc: "Intercept/transform requests and responses." },
  { icon: Shield, title: "Guards", desc: "Determine if a request should be handled." },
  { icon: Filter, title: "Pipes", desc: "Validate and transform input data." },
];

export default function AopPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Scissors className="w-3 h-3 mr-1.5" />Architecture
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Aspect-Oriented Programming</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Cross-cutting concerns made easy. Use Interceptors, Guards, and Pipes to decouple logic from your business code.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-indigo-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Interceptors</h2>
        <p className="text-zinc-400 mb-6">
          Inspired by NestJS, interceptors allow you to wrap the execution stream. Perfect for logging, transformation, or caching.
        </p>
        <CodePreview code={interceptorExample} filename="logging.interceptor.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Guards</h2>
        <CodePreview code={guardExample} filename="auth.guard.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Pipes</h2>
        <CodePreview code={pipeExample} filename="validation.pipe.ts" />
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Explore the validation system.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/validation">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Validation<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
