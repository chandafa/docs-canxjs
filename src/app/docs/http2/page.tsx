import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Zap, ArrowRight, Shield, Globe } from "lucide-react";

const http2Example = `import { createHttp2Server } from "canxjs";
import fs from "fs";

// HTTP/2 requires SSL/TLS
const server = createHttp2Server({
  port: 3000,
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
  allowHTTP1: true // Fallback to HTTP/1.1
});

server.get("/", (req, res) => {
  return res.send("Hello form HTTP/2!");
});

server.listen();`;

const pushExample = `// Server Push Example
server.get("/", (req, res) => {
  // Push style.css automatically when index is requested
  if (res.stream.pushAllowed) {
    res.push("/style.css", {}, (err, stream) => {
      stream.on('error', console.error);
      stream.respond({ ':status': 200, 'content-type': 'text/css' });
      stream.end('body { background: #000; }');
    });
  }
  
  return res.html('<html><head><link rel="stylesheet" href="/style.css"></head><body><h1>HTTP/2</h1></body></html>');
});`;

const features = [
  { icon: Zap, title: "Multiplexing", desc: "Multiple requests over a single TCP connection." },
  { icon: Globe, title: "Server Push", desc: "Proactively send assets to the client." },
  { icon: Shield, title: "Secure by Default", desc: "Native support for SSL/TLS." },
];

export default function Http2Page() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Zap className="w-3 h-3 mr-1.5" />Networking
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">HTTP/2 Support</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Unlock the full potential of modern networking with native HTTP/2 support, including multiplexing and server push.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-blue-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Setup</h2>
        <p className="text-zinc-400 mb-6">Create an HTTP/2 server using the helper function. Note that SSL certificates are required.</p>
        <CodePreview code={http2Example} filename="http2-server.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Server Push</h2>
        <p className="text-zinc-400 mb-6">
          Push assets to the client before they are requested, reducing load times.
        </p>
        <CodePreview code={pushExample} filename="server-push.ts" />
      </section>

      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">Explore more core concepts.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/core-concepts">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Core Concepts<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
