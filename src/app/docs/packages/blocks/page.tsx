import { DocsLayout } from '@/components/layout/DocsLayout';
import { DocsTypography } from '@/components/ui/DocsTypography';

const { H1, H2, H3, P, CodeBlock, Code } = DocsTypography;

export default function BlocksDocs() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <H1>Blocks</H1>
          <P>
            <Code>@canxjs/blocks</Code> enables a modular architecture for your CanxJS applications. It allows you to organize your application code into separate "Modules" (Blocks), each with its own routes, controllers, and providers. This is often referred to as HMVC (Hierarchical Model-View-Controller).
          </P>
        </div>

        <section>
          <H2>Installation</H2>
          <CodeBlock language="bash">
            {`npm install @canxjs/blocks`}
          </CodeBlock>
        </section>

        <section>
          <H2>Folder Structure</H2>
          <P>
            Blocks looks for a <Code>modules</Code> directory in your project root.
          </P>
          <CodeBlock language="text">
            {`/modules
  /Blog
    module.json
    /src
      BlogServiceProvider.ts
      /controllers
    /routes
      api.ts`}
          </CodeBlock>
        </section>

        <section>
          <H2>Module Configuration</H2>
          <P>
            Each module requires a <Code>module.json</Code> file.
          </P>
          <CodeBlock language="json">
            {`{
    "name": "Blog",
    "description": "Blog module",
    "enabled": true,
    "order": 1
}`}
          </CodeBlock>
        </section>

        <section>
          <H2>Generating Modules</H2>
          <P>
            You can generate a new module using the CLI command:
          </P>
          <CodeBlock language="bash">
            {`node canx make:module Blog`}
          </CodeBlock>
        </section>

        <section>
          <H2>Benefits</H2>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Separation of Concerns</strong>: Keep related features together.</li>
            <li><strong>Reusability</strong>: Modules can be easily shared between projects.</li>
            <li><strong>Organization</strong>: Prevents <Code>src/</Code> from becoming cluttered in large applications.</li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
}
