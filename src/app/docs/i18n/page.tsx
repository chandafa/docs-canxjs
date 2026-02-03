import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Globe, ArrowRight, BookOpen, Languages, Settings } from "lucide-react";

const setupExample = `// src/app.ts
import { createApp } from "canxjs";

const app = createApp({ 
  port: 3000,
  locale: 'en',
  fallbackLocale: 'en'
});`;

const translationFileExample = `// lang/en/messages.json
{
  "welcome": "Welcome to our application",
  "auth": {
    "login": "Login",
    "failed": "Invalid credentials"
  },
  "items": {
    "one": "You have {count} item",
    "other": "You have {count} items"
  }
}`;

const usageExample = `import { __, trans, trans_choice } from "canxjs";

// Basic translation
__("messages.welcome"); // "Welcome to our application"

// Nested keys
__("messages.auth.login"); // "Login"

// With parameters
__("messages.greeting", { name: "Alice" }); 

// Choice / Pluralization
trans_choice("messages.items", 1, { count: 1 }); // "You have 1 item"
trans_choice("messages.items", 5, { count: 5 }); // "You have 5 items"

// Using Alias
trans("messages.welcome");`;

const middlewareExample = `// Auto-detect locale from query, cookie, or header
import { localizationMiddleware } from "canxjs";

app.use(localizationMiddleware({
    // detect: ['query', 'cookie', 'header'],
    // queryKey: 'lang',
    // cookieKey: 'locale'
}));

// GET /?lang=es -> sets locale to 'es'`;

const features = [
  { icon: Globe, title: "Auto-Detection", desc: "Detects language from Headers, Cookies, or Query params." },
  { icon: Languages, title: "Pluralization", desc: "Smart handling of plural forms (one/other)." },
  { icon: BookOpen, title: "Nested Keys", desc: "Organize translations with directory structure (lang/en/file.json)." },
];

export default function I18nPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Globe className="w-3 h-3 mr-1.5" />Utilities
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Internationalization (I18n)</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Reach a global audience with built-in multi-language support. Translate strings, handle pluralization, and auto-detect user preferences.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-3 gap-4">
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
        <p className="text-zinc-400 mb-6">Default configuration is handled in your application creation or config.</p>
        <CodePreview code={setupExample} filename="src/app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Translation Files</h2>
        <p className="text-zinc-400 mb-6">Create JSON files in your <code>lang</code> directory, organized by locale and filename.</p>
        <CodePreview code={translationFileExample} filename="lang/en/messages.json" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <p className="text-zinc-400 mb-6">Use the <code>__</code> helper function to translate strings.</p>
        <CodePreview code={usageExample} filename="controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Middleware</h2>
        <p className="text-zinc-400 mb-6">Use the middleware to automatically set the locale based on the request.</p>
        <CodePreview code={middlewareExample} filename="middleware.ts" />
      </section>
    </div>
  );
}
