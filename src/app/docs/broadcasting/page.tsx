import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { Radio, ArrowRight, Zap, Users } from "lucide-react";

const configExample = `// src/config/app.ts
export const config = {
  // ...
  broadcasting: {
    default: 'pusher',
    connections: {
      pusher: {
        driver: 'pusher',
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        appId: process.env.PUSHER_APP_ID,
        options: {
          host: 'api.pusherapp.com',
          encrypted: true,
        }
      },
      ably: {
        driver: 'ably',
        key: process.env.ABLY_KEY,
      },
      log: {
        driver: 'log', // Useful for debugging
      }
    }
  }
};`;

const serverEventExample = `import { Dispatchable, Broadcasts } from 'canxjs';

export class OrderUnpdated implements Dispatchable, Broadcasts {
  constructor(public order: Order) {}

  // The channel to broadcast on
  broadcastOn() {
    return ['orders.' + this.order.id];
  }

  // The event name (optional, defaults to class name)
  broadcastAs() {
    return 'order.updated';
  }
  
  // Data to send
  broadcastWith() {
    return {
      status: this.order.status,
      updated_at: new Date()
    };
  }
}

// Dispatch
await new OrderUpdated(order).dispatch();`;

const clientExample = `import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'your-pusher-key',
    cluster: 'mt1',
    forceTLS: true
});

echo.channel('orders.1')
    .listen('order.updated', (e) => {
        console.log('Order Updated:', e.status);
    });`;

export default function BroadcastingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <Radio className="w-3 h-3 mr-1.5" />Real-Time
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Broadcasting</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Broadcast your server-side events to your frontend via WebSockets. 
          Supported drivers include Pusher, Ably, and a local log driver for debugging.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4">Configuration</h2>
        <p className="text-zinc-400 mb-6">Setup your broadcaster credentials in <code>config/app.ts</code>.</p>
        <CodePreview code={configExample} filename="src/config/app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Server-Side Events</h2>
        <p className="text-zinc-400 mb-6">
          Implement the <code>Broadcasts</code> interface on your event classes to make them broadcastable.
        </p>
        <CodePreview code={serverEventExample} filename="events/OrderUpdated.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Client-Side Consumption</h2>
        <p className="text-zinc-400 mb-6">
          CanxJS events are compatible with <strong>Laravel Echo</strong>. You can use the standard Echo client to listen for events.
        </p>
        <CodePreview code={clientExample} filename="frontend/app.js" />
      </section>

       <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Need Two-Way Communication?</h3>
          <p className="text-zinc-400 mb-6">For interactive features like chat, check out WebSockets (Gateways).</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/websockets">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                WebSockets <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
