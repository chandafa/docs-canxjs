import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Database, ChevronRight, ArrowRight, Wand2, Users, Factory } from "lucide-react";

const defineSeederExample = `import { defineSeeder, fake } from "canxjs";
import { User } from "./models/User";

defineSeeder("users", async () => {
  // Create admin user
  await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: await Bun.password.hash("password"),
    role: "admin"
  });

  // Create regular users
  for (let i = 0; i < 10; i++) {
    await User.create({
      name: fake.name(),
      email: fake.email(),
      password: await Bun.password.hash("password"),
      role: "user"
    });
  }
});`;

const fakeHelperExample = `import { fake } from "canxjs";

// Generate fake data
const name = fake.name();         // "John Smith"
const email = fake.email();       // "abc123@gmail.com"
const uuid = fake.uuid();         // "550e8400-e29b-41d4-a716-446655440000"
const number = fake.number(1, 100);  // Random 1-100
const bool = fake.boolean();      // true or false
const date = fake.date();         // Random Date object
const phone = fake.phone();       // "+1234567890"
const address = fake.address();   // "123 Main St"
const text = fake.paragraph();    // Lorem ipsum...

// Pick from array
const role = fake.pick(["admin", "user", "guest"]);`;

const factoryExample = `import { factory, fake } from "canxjs";
import { User } from "./models/User";
import { Post } from "./models/Post";

// Define a factory
const userFactory = factory(() => ({
  name: fake.name(),
  email: fake.email(),
  role: fake.pick(["admin", "user"]),
  is_active: fake.boolean()
}));

// Create one record
const user = userFactory.create();

// Create many records
const users = userFactory.createMany(50);

// Use in seeder
defineSeeder("users", async () => {
  const userData = userFactory.createMany(100);
  
  for (const data of userData) {
    await User.create(data);
  }
});`;

const runSeederExample = `import { seeder } from "canxjs";

// Run all seeders
await seeder.run();

// Run specific seeder
await seeder.run("users");

// List registered seeders
const list = seeder.list();
console.log(list);  // ["users", "posts", "categories"]`;

const cliCommandsExample = `# Run all seeders
bunx canx db:seed

# Run specific seeder
bunx canx db:seed --class=users

# List available seeders
bunx canx db:seed --list`;

const completeSeederExample = `import { defineSeeder, fake, factory } from "canxjs";
import { User } from "./models/User";
import { Post } from "./models/Post";
import { Category } from "./models/Category";

// Categories seeder
defineSeeder("categories", async () => {
  const categories = ["Technology", "Health", "Travel", "Food", "Sports"];
  
  for (const name of categories) {
    await Category.create({ name, slug: name.toLowerCase() });
  }
});

// Users seeder
const userFactory = factory(() => ({
  name: fake.name(),
  email: fake.email(),
  role: "user"
}));

defineSeeder("users", async () => {
  // Admin
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    role: "admin"
  });
  
  // Regular users
  for (const data of userFactory.createMany(50)) {
    await User.create(data);
  }
});

// Posts seeder
defineSeeder("posts", async () => {
  const users = await User.all();
  const categories = await Category.all();
  
  for (let i = 0; i < 100; i++) {
    await Post.create({
      title: \`Post \${i + 1}\`,
      content: fake.paragraph(),
      user_id: fake.pick(users).id,
      category_id: fake.pick(categories).id
    });
  }
});`;

const features = [
  { icon: Database, title: "Test Data", desc: "Populate database with realistic test data" },
  { icon: Wand2, title: "Fake Helpers", desc: "Built-in generators for names, emails, etc." },
  { icon: Factory, title: "Factories", desc: "Define reusable data generation patterns" },
  { icon: Users, title: "Bulk Creation", desc: "Create hundreds of records efficiently" },
];

export default function SeedersPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Database className="w-3 h-3 mr-1.5" />Database
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Seeders</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Populate your database with test data using seeders. Built-in fake data generators and factory patterns.
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
        <h2 className="text-2xl font-semibold text-white mb-4">Defining a Seeder</h2>
        <CodePreview code={defineSeederExample} filename="seeders/UserSeeder.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10"><Wand2 className="w-5 h-5 text-yellow-400" /></div>
          Fake Data Helpers
        </h2>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-zinc-400 border-b border-white/[0.08]">
              <th className="pb-3">Method</th><th className="pb-3">Output</th>
            </tr></thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-green-400">fake.name()</td><td>"John Smith"</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-green-400">fake.email()</td><td>"user@gmail.com"</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-green-400">fake.uuid()</td><td>UUID v4 string</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-green-400">fake.number(min, max)</td><td>Random number in range</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-green-400">fake.boolean()</td><td>true or false</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs text-green-400">fake.date()</td><td>Random Date object</td></tr>
              <tr><td className="py-2 font-mono text-xs text-green-400">fake.pick(array)</td><td>Random element from array</td></tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={fakeHelperExample} filename="fake-data.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Factory className="w-5 h-5 text-blue-400" /></div>
          Factories
        </h2>
        <p className="text-zinc-400 mb-6">Define reusable data generation patterns with factories.</p>
        <CodePreview code={factoryExample} filename="factories.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">Running Seeders</h2>
        <CodePreview code={runSeederExample} filename="run-seeders.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">CLI Commands</h2>
        <CodePreview code={cliCommandsExample} filename="terminal" />
      </section>

      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4">Complete Example</h2>
        <CodePreview code={completeSeederExample} filename="seeders/DatabaseSeeder.ts" />
      </section>

      <section className="animate-slide-up delay-700">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Explore advanced features like real-time WebSockets.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/websockets">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                WebSockets<ArrowRight className="w-4 h-4 ml-2" />
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
