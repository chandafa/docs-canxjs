import { DocsLayout } from '@/components/layout/DocsLayout';
import { DocsTypography } from '@/components/ui/DocsTypography';

const { H1, H2, H3, P, CodeBlock, Code } = DocsTypography;

export default function DominionDocs() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <H1>Dominion</H1>
          <P>
            <Code>@canxjs/dominion</Code> allows you to manage user roles and permissions easily. It supports direct permissions, role-based permissions, and multiple guards. It is heavily inspired by Spatie's Laravel Permission package.
          </P>
        </div>

        <section>
          <H2>Installation</H2>
          <CodeBlock language="bash">
            {`npm install @canxjs/dominion`}
          </CodeBlock>
          <P>
            After installing, publish the migrations/configuration:
          </P>
          <CodeBlock language="bash">
            {`node canx dominion:install
node canx migrate`}
          </CodeBlock>
        </section>

        <section>
          <H2>Usage</H2>
          
          <H3>Setup User Model</H3>
          <P>
            Add the <Code>HasRoles</Code> mixin to your User model to enable role management capabilities.
          </P>
          <CodeBlock language="typescript">
            {`import { Model } from 'canxjs';
import { HasRoles } from '@canxjs/dominion';

class User extends HasRoles(Model) {
    // ...
}`}
          </CodeBlock>

          <H3>Creating Roles & Permissions</H3>
          <P>
            You can create roles and permissions using the provided models.
          </P>
          <CodeBlock language="typescript">
            {`import { Role, Permission } from '@canxjs/dominion';

// Create a Permission
await Permission.create({ name: 'create posts' });

// Create a Role
const role = await Role.create({ name: 'writer' });

// Assign permission to role
role.permissions().attach(permission);`}
          </CodeBlock>

          <H3>Assigning Roles to Users</H3>
          <CodeBlock language="typescript">
            {`const user = await User.find(1);

// Assign a role
await user.assignRole('writer');

// Check role
if (await user.hasRole('writer')) {
    // ...
}`}
          </CodeBlock>

          <H3>Direct Permissions</H3>
          <P>
             You can also give permissions directly to a user, bypassing roles.
          </P>
          <CodeBlock language="typescript">
            {`await user.givePermissionTo('delete posts');

// Check permission (checks both direct and role-based)
if (await user.hasPermissionTo('delete posts')) {
    // ...
}`}
          </CodeBlock>

          <H3>Syncing Roles</H3>
          <P>
            To replace all existing roles with a new set:
          </P>
          <CodeBlock language="typescript">
            {`await user.syncRoles('admin', 'manager');`}
          </CodeBlock>
        </section>
      </div>
    </DocsLayout>
  );
}
