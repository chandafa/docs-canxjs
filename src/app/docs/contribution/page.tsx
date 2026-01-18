import { CodeBlock } from "@/components/ui/code-block";

export default function ContributionGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Contribution Guide
        </h1>
        <p className="text-xl text-zinc-400">
          Thank you for considering contributing to CanxJS! The contribution guide can be found in the <a href="https://github.com/canxjs/canxjs" className="text-blue-400 hover:underline">CanxJS documentation</a>.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 id="code-of-conduct" className="text-2xl font-semibold text-white">Code of Conduct</h2>
          <p className="text-zinc-400">
            In order to ensure that the CanxJS community is welcoming to all, please review and abide by the <a href="#" className="text-blue-400 hover:underline">Code of Conduct</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="pull-requests" className="text-2xl font-semibold text-white">Pull Requests</h2>
          <p className="text-zinc-400">
             CanxJS follows a standard GitHub pull request workflow.
          </p>
          <ol className="list-decimal list-inside text-zinc-400 space-y-2 ml-4">
             <li>Fork the repository.</li>
             <li>Create a new branch for your feature or fix.</li>
             <li>Write your code and add tests.</li>
             <li>Submit a Pull Request targeting the <code>main</code> branch.</li>
          </ol>
        </section>

        <section className="space-y-4">
           <h2 id="coding-style" className="text-2xl font-semibold text-white">Coding Style</h2>
           <p className="text-zinc-400">
             CanxJS follows PSR-2 coding standards (adapted for TypeScript) and uses ESLint + Prettier. Please ensure your code passes linting before submitting.
           </p>
           <CodeBlock language="bash" code={`bun run lint`} />
        </section>
        
        <section className="space-y-4">
           <h2 id="running-tests" className="text-2xl font-semibold text-white">Running Tests</h2>
           <p className="text-zinc-400">
             Before submitting your PR, please run the full test suite to ensure no regressions.
           </p>
           <CodeBlock language="bash" code={`bun test`} />
        </section>
      </div>
    </div>
  );
}
