import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Globe, ArrowRight, BookOpen, Languages } from "lucide-react";

const setupExample = `import { createApp, initI18n } from "canxjs";

const app = createApp({ port: 3000 });

// Initialize I18n
initI18n({
  defaultLocale: "en",
  locales: ["en", "es", "fr", "id"],
  directory: "./locales" // Path to translation files
});`;

const translationFileExample = `// locales/en.json
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

const usageExample = `import { t, plural, useI18n } from "canxjs";

// Basic translation
t("welcome"); // "Welcome to our application"

// Nested keys
t("auth.login"); // "Login"

// With parameters
t("greeting", { name: "Alice" }); 

// Pluralization
plural("items", 1); // "You have 1 item"
plural("items", 5); // "You have 5 items"

// Get current locale
const i18n = useI18n();
console.log(i18n.getLocale()); // "en"`;

const middlewareExample = `// Auto-detect locale from query, cookie, or header
import { i18nMiddleware, useI18n } from "canxjs";

app.use(i18nMiddleware(useI18n()));

// GET /?lang=es -> sets locale to 'es'
// Cookie 'locale=fr' -> sets locale to 'fr'
// Accept-Language: id -> sets locale to 'id'`;

const features = [
  { icon: Globe, title: "Auto-Detection", desc: "Detects language from Headers, Cookies, or Query params." },
  { icon: Languages, title: "Pluralization", desc: "Smart handling of plural forms (one/other)." },
  { icon: BookOpen, title: "Nested Keys", desc: "Organize translations with JSON structure." },
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
        <h2 className="text-2xl font-semibold text-white mb-4">Setup</h2>
        <p className="text-zinc-400 mb-6">Initialize the I18n module in your application bootstrap.</p>
        <CodePreview code={setupExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Translation Files</h2>
        <p className="text-zinc-400 mb-6">Create JSON files in your locales directory.</p>
        <CodePreview code={translationFileExample} filename="locales/en.json" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <CodePreview code={usageExample} filename="controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Middleware</h2>
        <p className="text-zinc-400 mb-6">Use the middleware to automatically set the locale based on the request.</p>
        <CodePreview code={middlewareExample} filename="middleware.ts" />
      </section>

      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Ensure your API responses are standardized.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/request-response">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Request & Response<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
