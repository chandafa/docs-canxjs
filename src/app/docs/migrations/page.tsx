import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Layers, ChevronRight, ArrowRight, Code2, ArrowDown, ArrowUp, RefreshCw } from "lucide-react";

const schemaCreateExample = `import { Schema, defineMigration } from "canxjs";

defineMigration(
  "create_users_table",
  
  // UP: Create the table
  async () => {
    await Schema.create("users", (table) => {
      table.id();                              // BIGINT primary key
      table.string("name");                    // VARCHAR(255)
      table.string("email").unique();          // VARCHAR(255) UNIQUE
      table.string("password");
      table.string("role").default("user");
      table.text("bio").nullable();            // TEXT, can be NULL
      table.boolean("is_active").default(true);
      table.timestamps();                      // created_at, updated_at
    });
  },
  
  // DOWN: Drop the table
  async () => {
    await Schema.drop("users");
  }
);`;

const columnTypesExample = `await Schema.create("products", (table) => {
  table.id();                         // BIGINT AUTO_INCREMENT PRIMARY KEY
  table.string("name", 100);          // VARCHAR(100)
  table.text("description");          // TEXT
  table.integer("quantity");          // INT
  table.bigInteger("views");          // BIGINT
  table.float("weight");              // FLOAT
  table.decimal("price", 10, 2);      // DECIMAL(10,2)
  table.boolean("is_available");      // TINYINT(1)
  table.date("release_date");         // DATE
  table.datetime("published_at");     // DATETIME
  table.timestamp("verified_at");     // TIMESTAMP
  table.json("metadata");             // JSON
  table.binary("thumbnail");          // BLOB
  table.timestamps();                 // created_at, updated_at
  table.softDeletes();                // deleted_at
});`;

const columnModifiersExample = `await Schema.create("posts", (table) => {
  table.id();
  table.string("title");
  table.string("slug").unique();              // Unique constraint
  table.text("content").nullable();           // Allow NULL values
  table.string("status").default("draft");    // Default value
  table.integer("views").unsigned();          // Unsigned integer
  table.integer("category_id").index();       // Add index
  table.timestamps();
});`;

const foreignKeysExample = `await Schema.create("posts", (table) => {
  table.id();
  table.string("title");
  table.text("content");
  
  // Foreign key with cascade delete
  table.bigInteger("user_id").unsigned()
    .references("users", "id")
    .onDelete("CASCADE");
  
  table.bigInteger("category_id").unsigned()
    .references("categories", "id")
    .onDelete("SET NULL");
  
  table.timestamps();
});`;

const runMigrationsExample = `import { migrator } from "canxjs";

// Run all pending migrations
await migrator.run();

// Rollback last batch
await migrator.rollback();

// Reset all migrations (rollback all)
await migrator.reset();

// Fresh: reset and re-run all
await migrator.fresh();

// Check migration status
const status = await migrator.status();
console.log(status);
// [{ name: "create_users_table", ran: true }, ...]`;

const cliCommandsExample = `# Run pending migrations
bunx canx migrate

# Rollback last batch
bunx canx migrate:rollback

# Reset all migrations
bunx canx migrate:reset

# Fresh migration (reset + run)
bunx canx migrate:fresh

# Check migration status
bunx canx migrate:status`;

const schemaMethodsExample = `// Check if table exists
const exists = await Schema.hasTable("users");

// Check if column exists
const hasEmail = await Schema.hasColumn("users", "email");

// Rename table
await Schema.rename("posts", "articles");

// Drop table if exists
await Schema.dropIfExists("temp_data");`;

const features = [
  { icon: ArrowUp, title: "Up Migrations", desc: "Create tables and modify schema" },
  { icon: ArrowDown, title: "Down Migrations", desc: "Rollback changes safely" },
  { icon: RefreshCw, title: "Batch System", desc: "Track and rollback by batch" },
  { icon: Layers, title: "Schema Builder", desc: "Fluent API for table creation" },
];

export default function MigrationsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Layers className="w-3 h-3 mr-1.5" />Database
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Migrations</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Version control your database schema with migrations. Create, modify, and rollback changes safely.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-purple-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><Code2 className="w-5 h-5 text-purple-400" /></div>
          Creating a Migration
        </h2>
        <CodePreview code={schemaCreateExample} filename="migrations/create_users.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Column Types</h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-zinc-400 border-b border-white/[0.08]">
              <th className="pb-3">Method</th><th className="pb-3">SQL Type</th>
            </tr></thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-purple-400">id()</td><td>BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-purple-400">string(name, len?)</td><td>VARCHAR(255)</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-purple-400">text(name)</td><td>TEXT</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-purple-400">integer(name)</td><td>INT</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-purple-400">boolean(name)</td><td>TINYINT(1)</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-purple-400">datetime(name)</td><td>DATETIME</td></tr>
              <tr><td className="py-2 font-mono text-xs text-purple-400">json(name)</td><td>JSON</td></tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={columnTypesExample} filename="column-types.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Column Modifiers</h2>
        <CodePreview code={columnModifiersExample} filename="modifiers.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Foreign Keys</h2>
        <CodePreview code={foreignKeysExample} filename="foreign-keys.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Running Migrations</h2>
        <CodePreview code={runMigrationsExample} filename="run-migrations.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4">CLI Commands</h2>
        <CodePreview code={cliCommandsExample} filename="terminal" />
      </section>

      <section className="mb-16 animate-slide-up delay-700">
        <h2 className="text-2xl font-semibold text-white mb-4">Schema Utilities</h2>
        <CodePreview code={schemaMethodsExample} filename="schema-utils.ts" />
      </section>

      <section className="animate-slide-up delay-800">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn how to populate your database with test data using seeders.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/seeders">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Seeders<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/orm">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Models & ORM<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
