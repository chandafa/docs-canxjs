import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { GitMerge, ChevronRight, ArrowRight, Zap, Database, MessageSquare } from "lucide-react";

const commandExample = `import { ICommand, CommandHandler, ICommandHandler, CommandBus } from "canxjs";

export class CreateUserCommand implements ICommand {
  type = 'CreateUser';
  constructor(public readonly name: string) {}
}

@CommandHandler('CreateUser')
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async execute(command: CreateUserCommand): Promise<void> {
    console.log("Creating user:", command.name);
  }
}

// In your controller:
await commandBus.execute(new CreateUserCommand("Alice"));`;

const queryExample = `import { IQuery, QueryHandler, IQueryHandler } from "canxjs";

export class GetUserQuery implements IQuery {
  type = 'GetUser';
  constructor(public readonly id: string) {}
}

@QueryHandler('GetUser')
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  async execute(query: GetUserQuery) {
    return { id: query.id, name: "Alice" };
  }
}`;

const sagaExample = `import { EventHandler, IEvent, ISaga, ICommand } from "canxjs";

@EventHandler('UserCreated')
export class UserSagas implements ISaga {
  
  // React to events and dispatch commands
  async *handle(event: IEvent): AsyncGenerator<ICommand> {
    if (event.type === 'UserCreated') {
      yield new SendWelcomeEmailCommand(event.userId);
    }
  }
}`;

const features = [
  { icon: Zap, title: "Command Bus", desc: "Decouple write operations." },
  { icon: Database, title: "Query Bus", desc: "Segregate read operations." },
  { icon: MessageSquare, title: "Event Bus", desc: "Async event processing." },
  { icon: GitMerge, title: "Sagas", desc: "Manage long-running processes." },
];

export default function CqrsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <GitMerge className="w-3 h-3 mr-1.5" />Architecture
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">CQRS</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Command Query Responsibility Segregation (CQRS) separates read and write operations for better scalability and performance.
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
        <h2 className="text-2xl font-semibold text-white mb-4">Commands</h2>
        <CodePreview code={commandExample} filename="commands.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Queries</h2>
        <CodePreview code={queryExample} filename="queries.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Sagas</h2>
        <p className="text-zinc-400 mb-6">Sagas orchestrate complex workflows by listening to events and dispatching commands.</p>
        <CodePreview code={sagaExample} filename="sagas.ts" />
      </section>
    </div>
  );
}
