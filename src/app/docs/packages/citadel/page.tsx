import { Badge } from "@/components/ui/badge";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Shield, Key, Lock } from "lucide-react";

export default function CitadelDocs() {
  const createTokenExample = `import { User } from "./models/User";

// User model must use HasApiTokens mixin
const user = await User.find(1);

const { plainTextToken } = await user.createToken("my-app", ["*"]);

return response.json({ token: plainTextToken });`;

  const checkAbilityExample = `// Create a token with specific abilities
const token = await user.createToken("editor", ["server:create", "server:update"]);

// Check ability
if (user.tokenCan("server:create")) {
    // User can create servers
}`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Shield className="w-3 h-3 mr-1.5" />
          Official Package
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Citadel</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code className="text-primary">@canxjs/citadel</code> provides a featherweight authentication system for SPAs, mobile applications, and simple token-based APIs. Inspired by Laravel Sanctum.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Installation</h2>
        <CodePreview 
          code={`npm install @canxjs/citadel
# or
bun add @canxjs/citadel`}
          filename="terminal"
        />
      </section>

      {/* Configuration */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Configuration</h2>
        <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" /> Register Provider
          </h3>
          <CodePreview 
            code={`// src/app/providers.ts
import { CitadelServiceProvider } from "@canxjs/citadel";

export const providers = [
  CitadelServiceProvider,
];`}
            filename="providers.ts"
          />
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2 mt-6">
            <Lock className="w-4 h-4 text-primary" /> Run Migrations
          </h3>
          <CodePreview 
            code={`node canx citadel:install
node canx migrate`}
            filename="terminal"
          />
        </div>
      </section>

      {/* Usage */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Issuing Tokens</h2>
        <p className="text-muted-foreground mb-4">
          Add the <code className="text-primary">HasApiTokens</code> mixin to your User model, then use <code className="text-primary">createToken()</code> to generate tokens.
        </p>
        <CodePreview 
          code={createTokenExample}
          filename="AuthController.ts"
        />
      </section>

      {/* Token Abilities */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Token Abilities</h2>
        <p className="text-muted-foreground mb-4">
          Tokens can be scoped with specific abilities (permissions). Use <code className="text-primary">tokenCan()</code> to check.
        </p>
        <CodePreview 
          code={checkAbilityExample}
          filename="example.ts"
        />
      </section>
    </div>
  );
}
