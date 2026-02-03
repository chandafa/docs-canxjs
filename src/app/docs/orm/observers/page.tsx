import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Database, ArrowRight, Eye, Milestone } from "lucide-react";

const observerExample = `import { Observer } from 'canxjs';
import { User } from '../models/User';

export class UserObserver {
  /**
   * Handle the User "created" event.
   */
  async created(user: User) {
    // Send welcome email
    await Mail.to(user).send(new WelcomeEmail());
  }

  /**
   * Handle the User "updating" event.
   */
  async updating(user: User) {
    // Audit logic
    if (user.isDirty('email')) {
      console.log('Email changed by user ' + user.id);
    }
  }

  /**
   * Handle the User "deleted" event.
   */
  async deleted(user: User) {
    // Cleanup related data
  }
}`;

const registrationExample = `// src/providers/AppServiceProvider.ts
import { User } from '../models/User';
import { UserObserver } from '../observers/UserObserver';

export class AppServiceProvider extends ServiceProvider {
  async boot() {
    User.observe(UserObserver);
  }
}`;

const hooksExample = `// Inside your Model class
export class User extends Model {
  
  protected static async onCreating(model: User) {
    if (!model.uuid) {
      model.uuid = crypto.randomUUID();
    }
  }

  protected static async onSaved(model: User) {
    // ...
  }
}`;

export default function ObserversPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Database className="w-3 h-3 mr-1.5" />Database
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Model Observers</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Centralize your model event listeners. Observers allow you to group event handling logic 
          for a model into a single class.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4">Creating Observers</h2>
        <p className="text-zinc-400 mb-6">
            Observers are simple classes with methods corresponding to Eloquent events: 
            <code>creating</code>, <code>created</code>, <code>updating</code>, <code>updated</code>, 
            <code>saving</code>, <code>saved</code>, <code>deleting</code>, <code>deleted</code>.
        </p>
        <CodePreview code={observerExample} filename="observers/UserObserver.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Registering Observers</h2>
        <p className="text-zinc-400 mb-6">Register your observers in a Service Provider, typically in the <code>boot</code> method.</p>
        <CodePreview code={registrationExample} filename="providers/AppServiceProvider.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Inline Hooks</h2>
        <p className="text-zinc-400 mb-6">
          For simple logic, you can define static hook methods directly on the Model class.
        </p>
        <CodePreview code={hooksExample} filename="models/User.ts" />
      </section>

      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Back to ORM</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/orm">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                ORM Documentation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
