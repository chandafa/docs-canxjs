import { Badge } from "@/components/ui/badge";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Shield, Users, Key } from "lucide-react";

export default function DominionDocs() {
  const setupExample = `import { Model } from "canxjs";
import { HasRoles } from "@canxjs/dominion";

class User extends HasRoles(Model) {
    // Your user model...
}`;

  const assignRoleExample = `import { Role, Permission } from "@canxjs/dominion";

// Create roles and permissions
await Permission.create({ name: "create posts" });
const role = await Role.create({ name: "writer" });

// Assign role to user
const user = await User.find(1);
await user.assignRole("writer");

// Check role
if (await user.hasRole("writer")) {
    // User is a writer
}`;

  const permissionExample = `// Direct permissions
await user.givePermissionTo("delete posts");

// Check permission (both direct and role-based)
if (await user.hasPermissionTo("delete posts")) {
    // User can delete posts
}

// Sync roles (replace all current roles)
await user.syncRoles("admin", "manager");`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Shield className="w-3 h-3 mr-1.5" />
          Official Package
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Dominion</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code className="text-primary">@canxjs/dominion</code> provides advanced role-based access control (RBAC) for your application. Inspired by Spatie Laravel Permission.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Installation</h2>
        <CodePreview 
          code={`npm install @canxjs/dominion

node canx dominion:install
node canx migrate`}
          filename="terminal"
        />
      </section>

      {/* Setup */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Setup User Model
        </h2>
        <p className="text-muted-foreground mb-4">
          Add the <code className="text-primary">HasRoles</code> mixin to your User model.
        </p>
        <CodePreview 
          code={setupExample}
          filename="models/User.ts"
        />
      </section>

      {/* Roles */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-primary" /> Creating & Assigning Roles
        </h2>
        <CodePreview 
          code={assignRoleExample}
          filename="example.ts"
        />
      </section>

      {/* Permissions */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Direct Permissions</h2>
        <p className="text-muted-foreground mb-4">
          Give permissions directly to users, or sync all roles at once.
        </p>
        <CodePreview 
          code={permissionExample}
          filename="example.ts"
        />
      </section>
    </div>
  );
}
