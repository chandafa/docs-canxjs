import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { ArrowUpDown, ChevronRight, ArrowRight, ArrowDown, ArrowUp, Cookie, FileText, Radio } from "lucide-react";

const requestPropertiesExample = `app.get("/users/:id", async (req, res) => {
  // Request properties
  const method = req.method;        // "GET"
  const path = req.path;            // "/users/123"
  const id = req.id;                // "canx_abc123" (unique request ID)
  const timestamp = req.timestamp;  // 1705312800000
  
  // Route parameters
  const userId = req.params.id;     // "123"
  
  // Query parameters (from ?key=value)
  const page = req.query.page;      // "1"
  const limit = req.query.limit;    // "10"
  
  // Headers
  const auth = req.header("authorization");
  const contentType = req.header("content-type");
  
  // Cookies
  const session = req.cookie("session_id");
  
  return res.json({ userId, page, limit });
});`;

const requestBodyExample = `app.post("/users", async (req, res) => {
  // Generic body parsing (auto-detects content type)
  const data = await req.body();
  
  // Typed body parsing
  interface CreateUser { name: string; email: string; }
  const user = await req.body<CreateUser>();
  
  return res.json({ created: user });
});

app.post("/form", async (req, res) => {
  // Form data (multipart/form-data)
  const formData = await req.formData();
  
  // Uploaded files
  const files = await req.files();
  const avatar = files.get("avatar");
  
  return res.json({ success: true });
});

app.post("/raw", async (req, res) => {
  // Raw text
  const text = await req.text();
  
  // ArrayBuffer
  const buffer = await req.arrayBuffer();
  
  return res.json({ length: text.length });
});`;

const requestContextExample = `// Store data in request context
const authMiddleware = async (req, res, next) => {
  const user = await verifyToken(req.header("authorization"));
  req.context.set("user", user);
  req.context.set("authenticated", true);
  return next();
};

// Access context data in handler
app.get("/profile", authMiddleware, (req, res) => {
  const user = req.context.get("user");
  const isAuth = req.context.get("authenticated");
  return res.json({ user, isAuth });
});`;

const responseJsonExample = `app.get("/api/users", (req, res) => {
  // Basic JSON response (200)
  return res.json({ users: [] });
});

app.post("/api/users", async (req, res) => {
  const user = await createUser(await req.body());
  
  // JSON with status code
  return res.status(201).json({
    message: "User created",
    data: user
  });
});

app.get("/api/error", (req, res) => {
  // Error response
  return res.status(404).json({
    error: "Not found",
    code: "RESOURCE_NOT_FOUND"
  });
});`;

const responseHtmlExample = `app.get("/page", (req, res) => {
  return res.html(\`
    <!DOCTYPE html>
    <html>
      <head><title>Hello</title></head>
      <body><h1>Hello CanxJS!</h1></body>
    </html>
  \`);
});

app.get("/text", (req, res) => {
  return res.text("Plain text response");
});

app.get("/empty", (req, res) => {
  return res.empty(204);  // No content
});`;

const responseHeadersExample = `app.get("/api/data", (req, res) => {
  return res
    .status(200)
    .header("X-Request-Id", req.id)
    .header("Cache-Control", "max-age=3600")
    .headers({
      "X-Custom-Header": "value",
      "X-Another": "value2"
    })
    .json({ data: "example" });
});`;

const responseCookiesExample = `app.post("/login", async (req, res) => {
  const { username, password } = await req.body();
  const token = await authenticate(username, password);
  
  // Set cookie with options
  return res
    .cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 86400,  // 1 day in seconds
      path: "/"
    })
    .json({ success: true });
});

app.post("/logout", (req, res) => {
  // Clear cookie
  return res.clearCookie("session").json({ loggedOut: true });
});`;

const responseFileExample = `app.get("/download/:filename", async (req, res) => {
  const path = \`./uploads/\${req.params.filename}\`;
  
  // Send file (inline)
  return res.file(path);
});

app.get("/export", async (req, res) => {
  // Download with custom filename
  return res.download("./data/report.pdf", "monthly-report.pdf");
});

app.get("/stream", (req, res) => {
  const stream = createReadableStream();
  return res.stream(stream);
});`;

const responseSseExample = `app.get("/events", (req, res) => {
  async function* generateEvents() {
    for (let i = 0; i < 10; i++) {
      yield JSON.stringify({ count: i, time: Date.now() });
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  return res.sse(generateEvents());
});`;

const responseRedirectExample = `app.get("/old-page", (req, res) => {
  return res.redirect("/new-page");      // 302 default
});

app.get("/moved", (req, res) => {
  return res.redirect("/new-url", 301);  // Permanent redirect
});`;

export default function RequestResponsePage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <ArrowUpDown className="w-3 h-3 mr-1.5" />Core Concepts
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Request & Response</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Understanding the CanxRequest and CanxResponse objects for handling HTTP communication.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><ArrowDown className="w-5 h-5 text-blue-400" /></div>
          Request Object
        </h2>
        <p className="text-zinc-400 mb-6">
          The <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">CanxRequest</code> object 
          wraps the native Bun Request with additional helpers.
        </p>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-zinc-400 border-b border-white/[0.08]">
              <th className="pb-3">Property</th><th className="pb-3">Type</th><th className="pb-3">Description</th>
            </tr></thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs">method</td><td className="py-2 text-zinc-500">string</td><td className="py-2 text-zinc-400">HTTP method</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs">path</td><td className="py-2 text-zinc-500">string</td><td className="py-2 text-zinc-400">URL path</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs">params</td><td className="py-2 text-zinc-500">object</td><td className="py-2 text-zinc-400">Route parameters</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs">query</td><td className="py-2 text-zinc-500">object</td><td className="py-2 text-zinc-400">Query parameters</td></tr>
              <tr className="border-b border-white/[0.05]"><td className="py-2 font-mono text-xs">id</td><td className="py-2 text-zinc-500">string</td><td className="py-2 text-zinc-400">Unique request ID</td></tr>
              <tr><td className="py-2 font-mono text-xs">timestamp</td><td className="py-2 text-zinc-500">number</td><td className="py-2 text-zinc-400">Request timestamp</td></tr>
            </tbody>
          </table>
        </div>
        <CodePreview code={requestPropertiesExample} filename="request-properties.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10"><FileText className="w-5 h-5 text-green-400" /></div>
          Reading Request Body
        </h2>
        <CodePreview code={requestBodyExample} filename="request-body.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Request Context</h2>
        <p className="text-zinc-400 mb-6">Store and retrieve data throughout the request lifecycle.</p>
        <CodePreview code={requestContextExample} filename="context.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><ArrowUp className="w-5 h-5 text-purple-400" /></div>
          Response Object
        </h2>
        <p className="text-zinc-400 mb-6">
          The <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">CanxResponse</code> provides 
          a fluent API for building responses.
        </p>
        <CodePreview code={responseJsonExample} filename="json-response.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-white mb-4">HTML & Text Responses</h2>
        <CodePreview code={responseHtmlExample} filename="html-response.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-500">
        <h2 className="text-2xl font-semibold text-white mb-4">Setting Headers</h2>
        <CodePreview code={responseHeadersExample} filename="headers.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-600">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10"><Cookie className="w-5 h-5 text-orange-400" /></div>
          Cookies
        </h2>
        <CodePreview code={responseCookiesExample} filename="cookies.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-700">
        <h2 className="text-2xl font-semibold text-white mb-4">File & Stream Responses</h2>
        <CodePreview code={responseFileExample} filename="files.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-800">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10"><Radio className="w-5 h-5 text-cyan-400" /></div>
          Server-Sent Events
        </h2>
        <CodePreview code={responseSseExample} filename="sse.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-900">
        <h2 className="text-2xl font-semibold text-white mb-4">Redirects</h2>
        <CodePreview code={responseRedirectExample} filename="redirect.ts" />
      </section>

      <section className="animate-slide-up delay-1000">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Explore the complete API reference or learn about database models.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/api">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                API Reference<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/core-concepts">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Core Concepts<ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
