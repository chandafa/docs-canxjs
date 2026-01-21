import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Shuffle, ChevronRight, ArrowRight, Code2, Database, Globe } from "lucide-react";

const typeExample = `import { ObjectType, Field, ID } from "canxjs";

@ObjectType()
export class User {
  @Field({ type: ID })
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  email?: string;
}`;

const resolverExample = `import { Resolver, Query, Mutation, Args, ID } from "canxjs";

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query({ type: User })
  async user(@Args({ name: 'id', type: ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation({ type: User })
  async createUser(@Args({ name: 'name' }) name: string) {
    return this.userService.create({ name });
  }
}`;

const setupExample = `import { createApp, GraphQLModule } from "canxjs";

const app = createApp({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql', // Code-first
      sortSchema: true,
      playground: true
    })
  ]
});`;

const features = [
  { icon: Code2, title: "Code First", desc: "Generate schema from TypeScript classes." },
  { icon: Database, title: "Type Safe", desc: "Types are shared between code and schema." },
  { icon: Globe, title: "Federation", desc: "Build a data graph across services." },
  { icon: Shuffle, title: "Resolvers", desc: "Class-based resolvers with DI." },
];

export default function GraphQLPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Database className="w-3 h-3 mr-1.5" />Data Graph
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">GraphQL</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Build type-safe GraphQL APIs using the code-first approach. Define your schema using decorators.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-pink-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Setup</h2>
        <CodePreview code={setupExample} filename="app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Object Types</h2>
        <CodePreview code={typeExample} filename="user.type.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Resolvers</h2>
        <CodePreview code={resolverExample} filename="user.resolver.ts" />
      </section>
    </div>
  );
}
