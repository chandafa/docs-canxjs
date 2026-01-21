import { CodeBlock } from "@/components/ui/code-block";

export default function EventsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Events
        </h1>
        <p className="text-xl text-zinc-400">
          CanxJS provides a simple observer pattern implementation, allowing you to subscribe and listen for various events that occur in your application.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 id="introduction" className="text-2xl font-semibold text-white scroll-mt-24">Introduction</h2>
          <p className="text-zinc-400">
            Events in CanxJS serve as a great way to decouple various aspects of your application, since a single event can have multiple listeners that do not depend on each other.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="defining-events" className="text-2xl font-semibold text-white scroll-mt-24">Defining Events</h2>
          <p className="text-zinc-400">
            An event class is a simple container for the information related to the event. For example, let's generate an <code>OrderShipped</code> event:
          </p>
          <CodeBlock language="bash" code={`bun run canx make:event OrderShipped`} />
          <p className="text-zinc-400">
            This will create a new class in <code>src/events/OrderShipped.ts</code>:
          </p>
          <CodeBlock language="typescript" code={`import { events } from 'canxjs';

export class OrderShipped {
  constructor(
    public readonly orderId: number
  ) {}

  /**
   * Dispatch this event
   */
  static dispatch(orderId: number): void {
    events.emit('order:shipped', new OrderShipped(orderId));
  }
}`} />
        </section>

        <section className="space-y-4">
          <h2 id="listening-events" className="text-2xl font-semibold text-white scroll-mt-24">Listening for Events</h2>
          <p className="text-zinc-400">
            You can register event listeners in your application bootstrap or service providers. The <code>events</code> helper provides a fluent API for this.
          </p>
          <CodeBlock language="typescript" code={`import { events } from 'canxjs';
import { OrderShipped } from './events/OrderShipped';

// Listen for a specific event
events.on('order:shipped', (event: OrderShipped) => {
    console.log(\`Order \${event.orderId} was shipped!\`);
});

// Listen once
events.once('app:ready', () => {
    console.log('Application is ready!');
});`} />
        </section>

        <section className="space-y-4">
          <h2 id="async-events" className="text-2xl font-semibold text-white scroll-mt-24">Async Events</h2>
          <p className="text-zinc-400">
             You can emit events asynchronously using <code>emitAsync</code>. This will await all registered handlers before proceeding.
          </p>
          <CodeBlock language="typescript" code={`await events.emitAsync('user:registered', user);`} />
        </section>

        <section className="space-y-4">
           <h2 id="decorators" className="text-2xl font-semibold text-white scroll-mt-24">Using Decorators</h2>
           <p className="text-zinc-400">
             If you prefer a class-based approach for listeners, you can use the <code>@Listen</code> decorator within your service classes.
           </p>
           <CodeBlock language="typescript" code={`import { Listen, Injectable } from 'canxjs';

@Injectable()
export class UserSubscriber {

  @Listen('user:registered')
  async onUserRegistered(event: UserRegistered) {
     // Send welcome email...
  }
}`} />
        </section>

        <section className="space-y-4">
           <h2 id="async-api" className="text-2xl font-semibold text-white scroll-mt-24">Documentation (AsyncAPI)</h2>
           <p className="text-zinc-400">
             CanxJS automatically generates AsyncAPI 2.6+ specifications for your event-driven services using decorators. This provides a Swagger-like experience for events.
           </p>
           <CodeBlock language="typescript" code={`import { AsyncApiChannel, AsyncApiMessage, Controller } from 'canxjs';

class OrderPayload {
  @AsyncApiMessage({ summary: "Order ID" })
  id: string;
}

@Controller('orders')
export class OrderController {
  
  @AsyncApiChannel({ 
    name: 'order/created', 
    publish: true, 
    summary: 'Emitted when a new order is placed' 
  })
  @AsyncApiMessage({ payload: OrderPayload })
  createOrder() {
     // Your logic...
  }
}`} />
           <p className="text-zinc-400">
             To generate the spec file, use the <code>AsyncApiGenerator</code> in your bootstrap file:
           </p>
           <CodeBlock language="typescript" code={`const document = AsyncApiGenerator.create(app, {
  info: { title: 'Event API', version: '1.0.0' },
  servers: {
    dev: { url: 'ws://localhost:3000', protocol: 'ws' }
  }
});
await AsyncApiGenerator.save(document, './asyncapi.json');`} />
        </section>
      </div>
    </div>
  );
}
