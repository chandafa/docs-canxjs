import { CodeBlock } from "@/components/ui/code-block";
import { Heart, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const contributors = [
  { username: "chandafa", name: "Chandra Faza" },
  { username: "github", name: "Contributor" },
  { username: "octocat", name: "Octocat" },
];

export default function ContributionGuidePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
          Contribution Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Thank you for considering contributing to CanxJS! The contribution guide can be found in the <a href="https://github.com/chandafa/canxjs" className="text-blue-400 hover:underline">CanxJS documentation</a>.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 id="code-of-conduct" className="text-2xl font-semibold text-foreground">Code of Conduct</h2>
          <p className="text-muted-foreground">
            In order to ensure that the CanxJS community is welcoming to all, please review and abide by the <a href="#" className="text-blue-400 hover:underline">Code of Conduct</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="pull-requests" className="text-2xl font-semibold text-foreground">Pull Requests</h2>
          <p className="text-muted-foreground">
             CanxJS follows a standard GitHub pull request workflow.
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
             <li>Fork the repository.</li>
             <li>Create a new branch for your feature or fix.</li>
             <li>Write your code and add tests.</li>
             <li>Submit a Pull Request targeting the <code>main</code> branch.</li>
          </ol>
        </section>

        <section className="space-y-4">
           <h2 id="coding-style" className="text-2xl font-semibold text-foreground">Coding Style</h2>
           <p className="text-muted-foreground">
             CanxJS follows PSR-2 coding standards (adapted for TypeScript) and uses ESLint + Prettier. Please ensure your code passes linting before submitting.
           </p>
           <CodeBlock language="bash" code={`bun run lint`} />
        </section>
        
        <section className="space-y-4">
           <h2 id="running-tests" className="text-2xl font-semibold text-foreground">Running Tests</h2>
           <p className="text-muted-foreground">
             Before submitting your PR, please run the full test suite to ensure no regressions.
           </p>
           <CodeBlock language="bash" code={`bun test`} />
        </section>

        {/* Contributors Section */}
        <section className="space-y-6 pt-8 border-t border-border">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            <h2 id="contributors" className="text-2xl font-semibold text-foreground">Contributors</h2>
          </div>
          <p className="text-muted-foreground">
            Thank you to all the amazing people who have contributed to CanxJS!
          </p>
          
          <div className="flex flex-wrap gap-3">
            {contributors.map((contributor) => (
              <Link
                key={contributor.username}
                href={`https://github.com/${contributor.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all">
                  <Image
                    src={`https://github.com/${contributor.username}.png`}
                    alt={contributor.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-md px-2 py-1 text-xs text-muted-foreground whitespace-nowrap z-10">
                  @{contributor.username}
                </div>
              </Link>
            ))}
            
            {/* Become a contributor CTA */}
            <Link
              href="https://github.com/chandafa/canxjs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border-2 border-dashed border-border hover:border-blue-500 flex items-center justify-center transition-colors group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Want to see your avatar here? <a href="https://github.com/chandafa/canxjs" className="text-blue-400 hover:underline">Start contributing!</a>
          </p>
        </section>
      </div>
    </div>
  );
}

