import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Database, ChevronRight, ArrowRight, Code2, Search, Layers, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Models & ORM",
  description: "Query and manage your database with CanxJS's elegant ORM. Zero-config setup with MySQL and PostgreSQL support, fluent query builder, and type-safe models.",
  openGraph: {
    title: "ORM & Database in CanxJS",
    description: "Elegant database ORM with query builder, relationships, eager loading, and multi-driver support for MySQL and PostgreSQL.",
  },
};

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

const advancedRelationsExample = `import { Model } from "canxjs";

export class User extends Model {
  static tableName = "users";

  // One-to-many
  posts() { return this.hasMany(Post, "user_id"); }

  // Polymorphic one-to-one: the related row stores
  // imageable_id + imageable_type columns.
  image() { return this.morphOne(Image, "imageable"); }

  // Has-many-through: comments on all of this user's posts.
  // (Comment -> Post -> User)
  comments() {
    return this.hasManyThrough(Comment, Post, "user_id", "post_id");
  }
}

export class Post extends Model {
  static tableName = "posts";

  // Polymorphic one-to-many
  tags() { return this.morphMany(Tag, "taggable"); }
}

export class Image extends Model {
  static tableName = "images";
  // Inverse of a polymorphic relation
  imageable() { return this.morphTo(); }
}

// Eager-load exactly like normal relations
const user = await User.with("image", "comments")
  .where("id", "=", 1)
  .first();

console.log(user.relations.image);    // Image | null
console.log(user.relations.comments); // Comment[]`;

const pivotExample = `import { Model } from "canxjs";

export class User extends Model {
  static tableName = "users";

  // Many-to-many via the "role_user" pivot table
  roles() {
    return this.belongsToMany(Role, "role_user", "user_id", "role_id");
  }
}

const user = await User.find(1);

// Attach one or many related ids (skips duplicate pivot rows)
await user.roles().attach(5);
await user.roles().attach([2, 3], { assigned_by: "admin" }); // extra pivot columns

// Detach specific ids, or all when called without arguments
await user.roles().detach(5);
await user.roles().detach();          // remove every role

// Replace the entire set in one call
await user.roles().sync([1, 2, 3]);

// Read the related records
const roles = await user.roles().get();`;

const softDeleteExample = `import { Model } from "canxjs";

export class Post extends Model {
  static tableName = "posts";
  static softDeletes = true;          // enables the deleted_at column
}

const post = await Post.find(1);

// Soft delete: sets deleted_at instead of removing the row
await post.delete();

// Default queries automatically exclude soft-deleted rows
await Post.find(1);                    // => null

// Include trashed rows explicitly
const trashed = await Post.query()
  .withTrashedResults()
  .where("id", "=", 1)
  .first();

// Restore a soft-deleted model
await trashed.restore();

// Permanently remove (ignores soft-delete scope)
await Post.query().where("id", "=", 1).forceDelete();`;

const castingExample = `import { Model } from "canxjs";

export class User extends Model {
  static tableName = "users";

  // Values are cast on read and serialized on write
  protected casts = {
    is_admin: "boolean",   // 1/0  <-> true/false
    meta: "json",          // TEXT column <-> object/array
    settings: "array",
    last_login: "datetime" // string <-> Date
  } as any;
}

const user = await User.create({
  name: "Ada",
  is_admin: true,
  meta: { theme: "dark" }
});

typeof user.is_admin; // "boolean"
typeof user.meta;     // "object"`;

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
          Query and manage your database with CanxJS&apos;s elegant ORM. Zero-config setup with MySQL and PostgreSQL support.
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

      <section className="mb-16 animate-slide-up delay-250">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10"><Shield className="w-5 h-5 text-red-400" /></div>
          Mass Assignment Protection
        </h2>
        <p className="text-zinc-400 mb-6">
          To prevent unauthorized modifications, define <code>$fillable</code> (whitelist) or <code>$guarded</code> (blacklist) properties.
        </p>
        <CodePreview code={`export class User extends Model {
  // Allow only these fields to be mass-assigned
  protected static fillable = ["name", "email", "password"];
  
  // OR block these fields (everything else is allowed)
  protected static guarded = ["id", "is_admin", "balance"];
}`} filename="models/User.ts" />
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

      <section className="mb-16 animate-slide-up delay-350">
        <h2 className="text-2xl font-semibold text-white mb-4">Advanced Relationships</h2>
        <p className="text-zinc-400 mb-6">
          Beyond the basics, models support polymorphic relations (<code>morphOne</code>, <code>morphMany</code>,
          <code>morphTo</code>, <code>morphToMany</code>) and <code>hasManyThrough</code>. All of them work with
          eager loading via <code>with()</code>.
        </p>
        <CodePreview code={advancedRelationsExample} filename="models/relations.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-350">
        <h2 className="text-2xl font-semibold text-white mb-4">Many-to-Many &amp; Pivot Operations</h2>
        <p className="text-zinc-400 mb-6">
          <code>belongsToMany</code> (and <code>morphToMany</code>) relations expose pivot helpers
          <code>attach()</code>, <code>detach()</code>, and <code>sync()</code> to manage the join table.
          Duplicate pivot rows are skipped automatically, and extra pivot columns can be passed as a second argument.
        </p>
        <CodePreview code={pivotExample} filename="pivot.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-350">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10"><Shield className="w-5 h-5 text-red-400" /></div>
          Soft Deletes
        </h2>
        <p className="text-zinc-400 mb-6">
          Set <code>static softDeletes = true</code> to keep rows in the database and mark them with a
          <code>deleted_at</code> timestamp instead of removing them. Default queries hide trashed rows; use
          <code>withTrashedResults()</code>, <code>restore()</code>, and <code>forceDelete()</code> to manage them.
        </p>
        <CodePreview code={softDeleteExample} filename="soft-deletes.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-350">
        <h2 className="text-2xl font-semibold text-white mb-4">Attribute Casting</h2>
        <p className="text-zinc-400 mb-6">
          Declare a <code>casts</code> map to convert attributes to native types on read and serialize them on write —
          e.g. <code>boolean</code>, <code>json</code>, <code>array</code>, <code>integer</code>, <code>datetime</code>.
        </p>
        <CodePreview code={castingExample} filename="casting.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Search className="w-5 h-5 text-blue-400" /></div>
          Query Builder
        </h2>
        <CodePreview code={queryBuilderExample} filename="queries.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-450">
        <h2 className="text-2xl font-semibold text-white mb-4">Pagination</h2>
        <p className="text-zinc-400 mb-6">
          Paginate results automatically with the <code>paginate()</code> method.
        </p>
        <CodePreview code={`// Get paginated results (page 1, 15 items per page)
const result = await User.query()
  .where("status", "=", "active")
  .paginate(1, 15);

console.log(result);
/*
{
  data: [...],
  total: 45,
  perPage: 15,
  currentPage: 1,
  lastPage: 3
}
*/`} filename="pagination.ts" />
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
