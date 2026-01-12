import { CodeBlock } from "@/components/ui/code-block";

export default function AdminPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Canx Admin
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Rapidly build admin panels with the <code>make:admin</code> generator.
        </p>
      </div>

      <div className="grid gap-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Overview</h2>
          <p className="text-zinc-400">
            Canx Admin provides a powerful generator to scaffold Admin Controllers and Views based on your models.
            It utilizes <strong>Canx UI</strong> components for a consistent and modern look.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Installation</h2>
          <p className="text-zinc-400">
            Install the <code>canx-admin</code> package:
          </p>
          <CodeBlock language="bash" code="bun add canx-admin" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Generating Resources</h2>
          <p className="text-zinc-400">
            To generate an admin CRUD interface for a model (e.g., <code>User</code>), run:
          </p>
          <CodeBlock language="bash" code="npx canx-admin make:admin User" />
          
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium text-white">What gets generated?</h3>
            <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-2">
              <li>
                <span className="text-white font-mono">src/app/controllers/Admin/UserController.ts</span>
                <br />
                <span className="text-sm text-zinc-500 ml-6">Handles CRUD logic (index, create, store, edit, update, destroy).</span>
              </li>
              <li>
                <span className="text-white font-mono">src/resources/views/admin/users/index.tsx</span>
                <br />
                <span className="text-sm text-zinc-500 ml-6">The list view using Canx UI Table and Buttons.</span>
              </li>
            </ul>
          </div>
        </section>

         <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Next Steps</h2>
          <p className="text-zinc-400">
            After generation, register your routes in <code>routes/web.ts</code>:
          </p>
          <CodeBlock language="typescript" code={`import { Route } from "canx/routing";
import { UserController } from "@/app/controllers/Admin/UserController";

Route.prefix("admin").group(() => {
    Route.resource("users", UserController);
});`} />
        </section>
      </div>
    </div>
  );
}
