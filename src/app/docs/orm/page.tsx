import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Database, ChevronRight, ArrowRight, Code2, Search, Layers, Zap } from "lucide-react";

const defineModelExample = `import { Model } from "canxjs";

// Define a User model
export class User extends Model {
  protected static tableName = "users";
  protected static primaryKey = "id";
  protected static timestamps = true;  // auto: created_at, updated_at
  
  // Type definition for the model
  id!: number;
  name!: string;
  email!: string;
  role!: string;
  created_at!: Date;
  updated_at!: Date;
  updated_at!: Date;

  // Relations
  posts() {
    return this.hasMany(Post, "user_id");
  }

  profile() {
    return this.hasOne(Profile, "user_id");
  }
}

export class Post extends Model {
  // ...
  user() {
    return this.belongsTo(User, "user_id");
  }
  
  tags() {
    return this.belongsToMany(Tag, "post_tags", "post_id", "tag_id");
  }
}`;

const basicQueriesExample = `// Find by primary key
const user = await User.find(1);

// Get all records
const users = await User.all();

// Create a new record
const newUser = await User.create({
  name: "John Doe",
  email: "john@example.com",
  role: "user"
});

// Update by ID
await User.updateById(1, { name: "Jane Doe" });

// Delete by ID
await User.deleteById(1);`;

const queryBuilderExample = `// Using the query builder for complex queries
const activeAdmins = await User.query()
  .select("id", "name", "email")
  .where("role", "=", "admin")
  .where("status", "=", "active")
  .orderBy("created_at", "desc")
  .limit(10)
  .get();

// With pagination
const page = 1;
const perPage = 20;
const users = await User.query()
  .orderBy("id", "asc")
  .limit(perPage)
  .offset((page - 1) * perPage)
  .get();

// First record matching condition
const admin = await User.query()
  .where("role", "=", "admin")
  .first();`;

const whereConditionsExample = `// Basic where
const users = await User.query()
  .where("status", "=", "active")
  .get();

// Multiple conditions (AND)
const results = await User.query()
  .where("role", "=", "admin")
  .where("status", "=", "active")
  .get();

// OR condition
const results = await User.query()
  .where("role", "=", "admin")
  .orWhere("role", "=", "moderator")
  .get();

// WHERE IN
const users = await User.query()
  .whereIn("id", [1, 2, 3, 4, 5])
  .get();

// NULL checks
const unverified = await User.query()
  .whereNull("email_verified_at")
  .get();

const verified = await User.query()
  .whereNotNull("email_verified_at")
  .get();`;

const joinsExample = `// Inner join
const postsWithUsers = await Post.query()
  .select("posts.*", "users.name as author")
  .join("users", "posts.user_id", "=", "users.id")
  .get();

// Left join
const results = await User.query()
  .select("users.*")
  .leftJoin("posts", "users.id", "=", "posts.user_id")
  .get();`;

const aggregatesExample = `// Count records
const totalUsers = await User.query().count();

// Sum
const totalSales = await Order.query()
  .where("status", "=", "completed")
  .sum("amount");

// Average
const avgRating = await Review.query().avg("rating");

// Group by with aggregates
const salesByCategory = await Product.query()
  .select("category")
  .groupBy("category")
  .get();`;

const rawQueriesExample = `// Execute raw SQL
const results = await User.query().raw(
  "SELECT * FROM users WHERE created_at > ?",
  ["2024-01-01"]
);`;

const dbConfigExample = `import { initDatabase, closeDatabase } from "canxjs";

// Initialize database connection
await initDatabase({
  driver: "mysql",  // or "postgresql"
  host: "localhost",
  port: 3306,
  database: "myapp",
  username: "root",
  password: "password",
  pool: { min: 2, max: 10 },
  logging: true  // Log SQL queries
});

// Close connection on shutdown
process.on("SIGTERM", async () => {
  await closeDatabase();
});`;

const features = [
  { icon: Database, title: "Multi-Driver", desc: "MySQL primary, PostgreSQL secondary support" },
  { icon: Search, title: "Query Builder", desc: "Fluent API for building complex queries" },
  { icon: Layers, title: "Model Classes", desc: "Type-safe models with static methods" },
  { icon: Zap, title: "Connection Pool", desc: "Built-in connection pooling for performance" },
];

export default function ORMPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Database className="w-3 h-3 mr-1.5" />Database
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Models & ORM</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Query and manage your database with CanxJS's elegant ORM. Zero-config setup with MySQL and PostgreSQL support.
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
        <h2 className="text-2xl font-semibold text-white mb-4">Database Configuration</h2>
        <CodePreview code={dbConfigExample} filename="database.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10"><Code2 className="w-5 h-5 text-orange-400" /></div>
          Defining Models
        </h2>
        <CodePreview code={defineModelExample} filename="models/User.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Basic CRUD Operations</h2>
        <CodePreview code={basicQueriesExample} filename="crud.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-350">
        <h2 className="text-2xl font-semibold text-white mb-4">Defining Relationships</h2>
        <p className="text-zinc-400 mb-6">
          Define relationships as methods on your model class using <code>hasOne</code>, <code>hasMany</code>, <code>belongsTo</code>, and <code>belongsToMany</code>.
        </p>
        <CodePreview code={defineModelExample} filename="models/User.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Search className="w-5 h-5 text-blue-400" /></div>
          Query Builder
        </h2>
        <CodePreview code={queryBuilderExample} filename="queries.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Where Conditions</h2>
        <CodePreview code={whereConditionsExample} filename="conditions.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4">Joins</h2>
        <CodePreview code={joinsExample} filename="joins.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-700">
        <h2 className="text-2xl font-semibold text-white mb-4">Aggregates</h2>
        <CodePreview code={aggregatesExample} filename="aggregates.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-800">
        <h2 className="text-2xl font-semibold text-white mb-4">Raw Queries</h2>
        <CodePreview code={rawQueriesExample} filename="raw.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-850">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10"><Zap className="w-5 h-5 text-pink-400" /></div>
          Eager Loading (N+1 Solution)
        </h2>
        <p className="text-zinc-400 mb-6">
          CanxJS provides powerful eager loading capabilities to solve the N+1 query problem. 
          You can load relationships at query time using <code>with()</code> or on existing models using <code>load()</code>.
        </p>
        <CodePreview code={`// Eager load 'posts' relationship
const users = await User.query()
  .with("posts")
  .get();

// Eager load multiple relationships
const posts = await Post.query()
  .with("author", "comments")
  .get();
  
// Lazy Eager Loading (on existing instance)
const user = await User.find(1);
await user.load("posts");`} filename="eager-loading.ts" />
      </section>

      <section className="animate-slide-up delay-900">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn how to manage your database schema with migrations.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/migrations">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Migrations<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/seeders">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Seeders<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
