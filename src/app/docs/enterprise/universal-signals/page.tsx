
import { DocsLayout } from "@/components/layout/DocsLayout";

export default function SignalsDocs() {
  return (
    <DocsLayout>
      <h1>Universal Signals (Zero-API)</h1>
      <p className="lead">
        Revolutionary "Zero-API" architecture for real-time state synchronization.
      </p>

      <h2>Concept</h2>
      <p>
        Universal Signals allow you to define a reactive variable on the server that is automatically synchronized
        across your entire server cluster (via Redis) and all connected frontend clients (via WebSockets).
      </p>
      <p>
        <strong>No REST API needed. No manual fetch.</strong> Just change the value on the server, and the UI updates.
      </p>

      <h2>Usage</h2>
      
      <h3>1. Creating a Signal (Backend)</h3>
      <pre><code className="language-typescript">
{`import { useSignal } from 'canxjs';

// Define a signal
const onlineUsers = useSignal('stats:online', 0, {
  syncToClient: true, // Broadcast to frontend
  persistence: true   // Save to DB
});

// Update value anywhere in your code
setInterval(async () => {
  await onlineUsers.set(onlineUsers.value + 1);
}, 1000);`}
      </code></pre>

      <h3>2. Consuming in Frontend (React/Next.js)</h3>
      <pre><code className="language-typescript">
{`// Client-side code
import { useSignal } from 'canxjs/client';

export function StatsWidget() {
  const users = useSignal('stats:online'); // Auto-subscribes via WebSocket

  return <div>Online Users: {users}</div>;
}`}
      </code></pre>

    </DocsLayout>
  );
}
