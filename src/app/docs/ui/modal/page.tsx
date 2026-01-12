import { CodeBlock } from "@/components/ui/code-block";

export default function ModalPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Modal
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          A modal using the native HTML <code>&lt;dialog&gt;</code> element for maximum performance and accessibility.
        </p>
      </div>

      <div className="grid gap-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Installation</h2>
          <CodeBlock language="bash" code="npx canx-ui add modal" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Usage</h2>
          <p className="text-zinc-400">
            You can trigger the modal using the built-in <code>triggerLabel</code> or by controlling the dialog element directly via ID.
          </p>
          <CodeBlock language="tsx" code={`import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function Demo() {
  return (
    <div className="flex gap-4">
      {/* Method 1: Built-in Trigger */}
      <Modal 
        id="modal-1" 
        triggerLabel="Open Project Modal" 
        title="Edit Project"
      >
        <div className="space-y-4 py-4">
          <p className="text-zinc-600">Make changes to your project here.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => document.getElementById('modal-1').close()}>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}`} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Headless Usage</h2>
          <p className="text-zinc-400">
            You can also control the modal programmatically using the native API.
          </p>
          <CodeBlock language="tsx" code={`// Open
document.getElementById('my-modal').showModal();

// Close
document.getElementById('my-modal').close();`} />
        </section>
      </div>
    </div>
  );
}
