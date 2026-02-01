import { Badge } from "@/components/ui/badge";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Radio, Wifi, WifiOff } from "lucide-react";

export default function EchoDocs() {
  const setupExample = `import Echo from "@canxjs/echo";
import io from "socket.io-client";

const echo = new Echo({
    broadcaster: "socket.io",
    host: "http://localhost:3000",
    client: io
});`;

  const listenExample = `// Listen to a public channel
echo.channel("orders")
    .listen("OrderShipped", (e) => {
        console.log(e.order.name);
    });`;

  const privateExample = `// Private channels (auth handled automatically)
echo.private("user.1")
    .listen("NotificationReceived", (e) => {
        // ...
    });`;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <Radio className="w-3 h-3 mr-1.5" />
          Official Package
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Echo</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          <code className="text-primary">@canxjs/echo</code> is a client-side library for subscribing to channels and listening to events broadcast by your CanxJS server.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Installation</h2>
        <CodePreview 
          code={`npm install @canxjs/echo socket.io-client`}
          filename="terminal"
        />
      </section>

      {/* Setup */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-primary" /> Setup
        </h2>
        <p className="text-muted-foreground mb-4">
          Initialize Echo in your client-side application (e.g., React, Vue, or vanilla JS).
        </p>
        <CodePreview 
          code={setupExample}
          filename="echo.js"
        />
      </section>

      {/* Listening */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Listening for Events</h2>
        <CodePreview 
          code={listenExample}
          filename="app.js"
        />
      </section>

      {/* Private Channels */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Private Channels</h2>
        <p className="text-muted-foreground mb-4">
          For private channels, authentication is handled automatically.
        </p>
        <CodePreview 
          code={privateExample}
          filename="app.js"
        />
      </section>

      {/* Leaving */}
      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <WifiOff className="w-5 h-5 text-muted-foreground" /> Leaving a Channel
        </h2>
        <CodePreview 
          code={`echo.leave("orders");`}
          filename="app.js"
        />
      </section>
    </div>
  );
}
