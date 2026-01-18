"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { ShieldCheck, ArrowRight, ChevronRight, FileText, AlertCircle, Code2, CheckCircle2 } from "lucide-react";

const basicValidationExample = `import { validate } from "canxjs";

app.post("/users", async (req, res) => {
  const data = await req.body();

  const rules = {
    name: ["required", "string", "min:3"],
    email: ["required", "email"],
    age: ["number", "min:18"],
    role: ["in:admin,user,editor"]
  };

  const validation = validate(data, rules);

  if (!validation.valid) {
    return res.status(422).json({
      error: "Validation Failed",
      details: Object.fromEntries(validation.errors)
    });
  }

  // Use validated data
  const user = await User.create(validation.data);
  return res.json(user);
});`;

const formRequestExample = `// src/requests/CreateUserRequest.ts
import { FormRequest } from "canxjs";

export class CreateUserRequest extends FormRequest {
  /**
   * Determine if the user is authorized to make this request.
   */
  authorize(): boolean {
    // Check permissions, roles, etc.
    return true; 
  }

  /**
   * Get the validation rules that apply to the request.
   */
  rules() {
    return {
      name: ["required", "string", "min:3"],
      email: ["required", "email", "unique:users,email"],
      password: ["required", "string", "min:8", "confirmed"],
    };
  }

  /**
   * Custom error messages (optional)
   */
  messages() {
    return {
      "email.unique": "This email is already registered.",
      "password.confirmed": "Passwords do not match."
    };
  }
}`;

const controllerExample = `// src/controllers/UserController.ts
import { Controller } from "canxjs/controller";
import { ValidateWith } from "canxjs";
import { CreateUserRequest } from "../requests/CreateUserRequest";

export class UserController extends Controller {
  
  @ValidateWith(CreateUserRequest)
  async store(req: CanxRequest, res: CanxResponse) {
    // Code execution only reaches here if validation passes.
    
    // Get validated data safely
    const data = req.context.get("validated");
    
    const user = await User.create(data);
    return res.status(201).json(user);
  }
}`;

const manualFormRequestExample = `// Using FormRequest manually inside a handler
app.post("/users", async (req, res) => {
  const request = new CreateUserRequest();
  
  // Set context and run checks
  request.setContext(req, res);
  
  if (!await request.checkAuthorization()) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  
  const validation = await request.validate(await req.body());
  
  if (!validation.valid) {
    return res.status(422).json({ errors: validation.errors });
  }
  
  // Success
  return res.json({ created: true });
});`;

const availableRules = [
  { rule: "required", desc: "Field must be present and not empty" },
  { rule: "string", desc: "Must be a string" },
  { rule: "number", desc: "Must be a number" },
  { rule: "boolean", desc: "Must be true or false" },
  { rule: "email", desc: "Must be a valid email format" },
  { rule: "min:value", desc: "Minimum length (string) or value (number)" },
  { rule: "max:value", desc: "Maximum length (string) or value (number)" },
  { rule: "in:foo,bar", desc: "Must be one of the given values" },
  { rule: "url", desc: "Must be a valid URL" },
  { rule: "alpha", desc: "Only alphabetic characters" },
  { rule: "alphanum", desc: "Only alphanumeric characters" },
  { rule: "confirmed", desc: "Field must match {field}_confirmation" },
];

export default function ValidationPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <ShieldCheck className="w-3 h-3 mr-1.5" />Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Validation</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Ensure data integrity with CanxJS's powerful validation system. Use simple inline validation or dedicate FormRequest classes for complex logic.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><CheckCircle2 className="w-5 h-5 text-blue-400" /></div>
          Basic Validation
        </h2>
        <p className="text-zinc-400 mb-6">
          The <code>validate</code> helper provides a quick way to validate arbitrary data against a set of rules.
        </p>
        <CodePreview code={basicValidationExample} filename="basic-validation.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><FileText className="w-5 h-5 text-purple-400" /></div>
          Form Requests
        </h2>
        <p className="text-zinc-400 mb-6">
          For more complex scenarios, <strong>Form Requests</strong> encapsulate validation and authorization logic in a single class, keeping your controllers clean.
        </p>
        <CodePreview code={formRequestExample} filename="src/requests/CreateUserRequest.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Using in Controllers</h2>
        <p className="text-zinc-400 mb-6">
          Use the <code>@ValidateWith</code> decorator to automatically validate requests before they hit your controller method.
        </p>
        <CodePreview code={controllerExample} filename="src/controllers/UserController.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
         <h2 className="text-2xl font-semibold text-white mb-6">Available Rules</h2>
         <div className="grid sm:grid-cols-2 gap-4">
            {availableRules.map((r) => (
              <div key={r.rule} className="rounded-xl bg-white/[0.02] border border-white/[0.08] p-4 flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
                <code className="text-sm font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{r.rule}</code>
                <span className="text-sm text-zinc-500">{r.desc}</span>
              </div>
            ))}
         </div>
      </section>

      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Now that your data is safe, learn how to store it in the database.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/orm">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Models & ORM <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/request-response">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Request & Response <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
