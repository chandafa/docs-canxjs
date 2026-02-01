import { Badge } from "@/components/ui/badge";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Layers, FolderTree, Rocket } from "lucide-react";

export default function BlocksDocs() {
  const moduleJsonExample = `{
    "name": "Blog",
    "description": "Blog module",
    "enabled": true,
    "order": 1
}`;

  const folderStructureExample = `/modules
  /Blog
    module.json
    /src
      BlogServiceProvider.ts
      /controllers
    /routes
      api.ts`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Layers className="w-3 h-3 mr-1.5" />
          Official Package
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Blocks</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code className="text-primary">@canxjs/blocks</code> enables modular architecture (HMVC) for large-scale CanxJS applications.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Installation</h2>
        <CodePreview 
          code={`npm install @canxjs/blocks`}
          filename="terminal"
        />
      </section>

      {/* Folder Structure */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-primary" /> Folder Structure
        </h2>
        <p className="text-muted-foreground mb-4">
          Blocks looks for a <code className="text-primary">modules</code> directory in your project root.
        </p>
        <CodePreview 
          code={folderStructureExample}
          filename="structure"
        />
      </section>

      {/* Module Configuration */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Module Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Each module requires a <code className="text-primary">module.json</code> file.
        </p>
        <CodePreview 
          code={moduleJsonExample}
          filename="module.json"
        />
      </section>

      {/* Generating Modules */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" /> Generating Modules
        </h2>
        <CodePreview 
          code={`node canx make:module Blog`}
          filename="terminal"
        />
      </section>

      {/* Benefits */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Benefits</h2>
        <div className="rounded-2xl bg-card border border-border p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Separation of Concerns:</strong> Keep related features together.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Reusability:</strong> Modules can be shared between projects.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Organization:</strong> Prevents src/ clutter in large applications.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
