import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { FileJson, ArrowRight, Layers, Database } from "lucide-react";

const simpleResourceExample = `import { JsonResource } from "canxjs";

export class UserResource extends JsonResource {
  toArray(request) {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.created_at,
      // Computed or conditional attributes
      is_admin: this.role === 'admin'
    };
  }
}`;

const usageExample = `import { UserResource } from "./resources/UserResource";

app.get("/user/:id", async (req, res) => {
  const user = await User.find(req.params.id);
  
  // Return single resource
  return new UserResource(user);
});

app.get("/users", async (req, res) => {
  const users = await User.all();
  
  // Return collection
  return UserResource.collection(users);
});`;

const nestingExample = `// In PostResource.ts
export class PostResource extends JsonResource {
  toArray(request) {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      // Nesting user resource
      author: new UserResource(this.author),
      // Conditional Relationship
      comments: this.whenLoaded('comments', () => CommentResource.collection(this.comments)),
    };
  }
}`;

const features = [
  { icon: FileJson, title: "Transformation", desc: "Transform your models into JSON responses." },
  { icon: Layers, title: "Collections", desc: "Automatically handle arrays of resources." },
  { icon: Database, title: "Relationships", desc: "Embed nested resources easily." },
];

export default function ApiResourcesPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <FileJson className="w-3 h-3 mr-1.5" />Utilities
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">API Resources</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Transform your models and data objects into standardized JSON responses. Perfect for building consistent APIs.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-3 gap-4">
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
        <h2 className="text-2xl font-semibold text-white mb-4">Creating Resources</h2>
        <p className="text-zinc-400 mb-6">
          Extend `JsonResource` and define the `toArray` method to control the output format.
        </p>
        <CodePreview code={simpleResourceExample} filename="src/resources/UserResource.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <p className="text-zinc-400 mb-6">
          Return resources directly from your controllers or route handlers. CanxJS handles the serialization.
        </p>
        <CodePreview code={usageExample} filename="src/controllers/UserController.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Relationships & Conditional Attributes</h2>
        <p className="text-zinc-400 mb-6">
          Include related resources or hide data based on conditions using helper methods.
        </p>
        <CodePreview code={nestingExample} filename="src/resources/PostResource.ts" />
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Learn more about API versioning.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/utilities">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Utilities<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
