import { CodeBlock } from "@/components/ui/code-block";

export default function UIInstallationPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Installation
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Start building beautiful interfaces with Canx UI components.
        </p>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
           <p className="text-blue-400 font-medium">✨ Recommendation</p>
           <p className="text-zinc-300 text-sm mt-1">
             If you used <code>create-canx</code> v1.0.6+, Canx UI and Tailwind CSS are already installed and configured! You can skip this page.
           </p>
        </div>
      </div>

      <div className="grid gap-12">
        {/* Requirements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">Requirements</h2>
          <p className="text-zinc-400">
            Canx UI is built on top of React and Tailwind CSS. Make sure your project meets these requirements:
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-2">
            <li>React 18 or later</li>
            <li>Tailwind CSS 3 or later</li>
            <li>Node.js 18 or later</li>
          </ul>
        </section>

        {/* Installation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">1. Install Package</h2>
          <p className="text-zinc-400">
            Install the <code>canx-ui</code> package using your preferred package manager:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">Bun (Recommended)</span>
              <CodeBlock language="bash" code="bun add canx-ui" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">NPM</span>
              <CodeBlock language="bash" code="npm install canx-ui" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">PNPM</span>
              <CodeBlock language="bash" code="pnpm add canx-ui" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-zinc-500">Yarn</span>
              <CodeBlock language="bash" code="yarn add canx-ui" />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">2. Configure Tailwind CSS</h2>
          <p className="text-zinc-400">
            Canx UI is designed to be compatible with both Tailwind CSS v3 and v4. 
          </p>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">For Tailwind CSS v4</h3>
             <p className="text-zinc-400">
               Ensure your CSS variables are defined in your global CSS. When you run <code>init</code>, we provide the compatible CSS variables.
            </p>
            <p className="text-zinc-400">
                You also need to ensure that your project is configured to scan the `src` directory for class names.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium text-white">For Tailwind CSS v3</h3>
            <p className="text-zinc-400">Update your <code>tailwind.config.js</code> file to scan the component files if you are not using the modular CLI (copy-paste method):</p>
            <CodeBlock language="javascript" code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    // If you installed the full package via npm:
    "./node_modules/canx-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`} />
          </div>
        </section>

        {/* Utilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">3. Component Setup (Recommended)</h2>
          <p className="text-zinc-400">
             We recommend using the CLI to initialize your project. This will set up the necessary utilities (<code>cn</code> helper) and prepare your project for adding components.
          </p>
          <CodeBlock language="bash" code="npx canx-ui init" />
          <p className="text-zinc-400 text-sm">
            This command creates <code>src/lib/utils.ts</code>.
          </p>
        </section>

        {/* Adding Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white border-b border-zinc-800 pb-2">4. Add Components</h2>
          <p className="text-zinc-400">
            You can now add individual components to your project. This will copy the component source code to your <code>src/components/ui</code> directory, allowing you to fully customize them.
          </p>
          <CodeBlock language="bash" code="npx canx-ui add button" />
          <p className="text-zinc-400">
            This method is favored over installing the full library as it gives you complete ownership of the code and reduces bundle size.
          </p>
        </section>
      </div>
    </div>
  );
}
