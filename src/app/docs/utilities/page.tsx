import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Wrench, Shield, Globe, Database, Filter, ChevronRight } from "lucide-react";

const hashingExample = `import { Hash } from "canxjs";

// Hash a password
const hashedPassword = await Hash.make("password123");

// Verify a password
if (await Hash.check("password123", hashedPassword)) {
  // Passwords match
}`;

const encryptionExample = `import { Encrypt } from "canxjs";

// Encrypt data
const encrypted = Encrypt.make("Sensitive Data");

// Decrypt data
const decrypted = Encrypt.audit(encrypted);`;

const collectionExample = `import { collect } from "canxjs";

const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
];

const admins = collect(users)
  .where("role", "admin")
  .map(user => user.name)
  .all(); // ["Alice"]`;

const pipelineExample = `import { Pipeline } from "canxjs";

const result = await Pipeline
  .send(request)
  .through([
    AuthMiddleware,
    ValidationMiddleware,
    LoggingMiddleware
  ])
  .thenReturn();`;

const versioningExample = `import { ApiVersioning } from "canxjs";

// In your app setup
ApiVersioning.enable({
  type: 'uri', // or 'header', 'media-type'
  defaultVersion: 'v1',
  prefix: 'v'
});`;

export default function UtilitiesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div>
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Wrench className="w-3 h-3 mr-1.5" />
          Core Utilities
        </Badge>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Utilities
        </h1>
        <p className="text-xl text-zinc-400">
          Essential helper classes for common tasks like hashing, encryption, collections, and more.
        </p>
      </div>

      <div className="space-y-12">
        {/* Hashing & Encryption */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white">Security Utilities</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Hashing</h3>
              <p className="text-zinc-400 text-sm">Use Bcrypt for secure password hashing.</p>
              <CodePreview code={hashingExample} filename="hash.ts" />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Encryption</h3>
              <p className="text-zinc-400 text-sm">Two-way encryption using AES-256-CBC.</p>
              <CodePreview code={encryptionExample} filename="encrypt.ts" />
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-semibold text-white">Collections</h2>
          </div>
          <p className="text-zinc-400">
            Fluent wrapper for working with arrays of data, inspired by Laravel Collections.
          </p>
          <CodePreview code={collectionExample} filename="collection.ts" />
        </section>

        {/* Pipelines */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Filter className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white">Pipelines</h2>
          </div>
          <p className="text-zinc-400">
            Send an object through a series of "pipes" (middleware/actions).
          </p>
          <CodePreview code={pipelineExample} filename="pipeline.ts" />
        </section>

        {/* API Versioning */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-semibold text-white">API Versioning</h2>
          </div>
          <p className="text-zinc-400">
            Manage multiple versions of your API with ease.
          </p>
          <CodePreview code={versioningExample} filename="app.ts" />
        </section>
      </div>
    </div>
  );
}
