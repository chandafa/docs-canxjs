import { DocsLayout } from '@/components/layout/DocsLayout';
import { DocsTypography } from '@/components/ui/DocsTypography';

const { H1, H2, H3, P, CodeBlock, Code } = DocsTypography;

export default function CitadelDocs() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <H1>Citadel</H1>
          <P>
            <Code>@canxjs/citadel</Code> provides a featherweight authentication system for SPAs, mobile applications, and simple token-based APIs. It is inspired by Laravel Sanctum and allows each of your application's users to generate multiple API tokens for their account.
          </P>
        </div>

        <section>
          <H2>Installation</H2>
          <P>
            Install the package via your package manager:
          </P>
          <CodeBlock language="bash">
            {`npm install @canxjs/citadel
# or
bun add @canxjs/citadel`}
          </CodeBlock>
        </section>

        <section>
          <H2>Configuration</H2>
          <H3>1. Register Provider</H3>
          <P>
            Add the <Code>CitadelServiceProvider</Code> to your application's kernel or providers list.
          </P>
          <CodeBlock language="typescript">
            {`// src/app/providers.ts
import { CitadelServiceProvider } from '@canxjs/citadel';

export const providers = [
  // ...
  CitadelServiceProvider,
];`}
          </CodeBlock>

          <H3>2. Run Installer</H3>
          <P>
            Publish the migrations required for Citadel.
          </P>
          <CodeBlock language="bash">
            {`node canx citadel:install`}
          </CodeBlock>
          <P>
            Then run your migrations to create the <Code>personal_access_tokens</Code> table.
          </P>
          <CodeBlock language="bash">
            {`node canx migrate`}
          </CodeBlock>
        </section>

        <section>
          <H2>Usage</H2>
          
          <H3>The HasApiTokens Mixin</H3>
          <P>
            To issue tokens for a user, add the <Code>HasApiTokens</Code> mixin to your User model.
          </P>
          <CodeBlock language="typescript">
            {`import { Model } from 'canxjs';
import { HasApiTokens } from '@canxjs/citadel';

class User extends HasApiTokens(Model) {
    // ...
}`}
          </CodeBlock>

          <H3>Issuing Tokens</H3>
          <P>
            You can generate a token using the <Code>createToken</Code> method. This method returns an object containing the <Code>accessToken</Code> instance and the <Code>plainTextToken</Code>. The plain text token should be displayed to the user immediately, as it cannot be retrieved again.
          </P>
          <CodeBlock language="typescript">
            {`const user = await User.find(1);

const token = await user.createToken('my-phone', ['*']);

return response.json({
    token: token.plainTextToken
});`}
          </CodeBlock>

          <H3>Token Abilities</H3>
          <P>
            Citadel allows you to specify abilities (scopes) for a token. You can check these abilities using the <Code>tokenCan</Code> method on the user instance.
          </P>
          <CodeBlock language="typescript">
            {`// Create a token with specific abilities
const token = await user.createToken('editor', ['server:create', 'server:update']);

// Check ability
if (user.tokenCan('server:create')) {
    // ...
}`}
          </CodeBlock>

          <H3>Protecting Routes</H3>
          <P>
            To protect routes, use the <Code>auth:sanctum</Code> guard (or whichever guard you configure Citadel to use).
          </P>
          <CodeBlock language="typescript">
            {`import { router } from 'canxjs';

router.get('/user', (req) => {
    return req.user;
}).middleware('auth');`}
          </CodeBlock>
        </section>
      </div>
    </DocsLayout>
  );
}
