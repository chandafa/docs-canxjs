
export default function MicroservicesDocs() {
  return (
    <div className="max-w-4xl">
      <h1>Microservices & Event Bus</h1>
      <p className="lead">
        Build scalable distributed systems with built-in Service Discovery and Event Bus.
      </p>

      <h2>Event Bus (Pub/Sub)</h2>
      <p>
        The Event Bus allows your services to communicate asynchronously without tight coupling.
        It supports <strong>Redis</strong> for production and In-Memory for development.
      </p>

      <h3>Publishing Events</h3>
      <pre><code className="language-typescript">
{`import { eventBus } from 'canxjs';

await eventBus().publish('order.created', {
  orderId: '123',
  amount: 99.00
});`}
      </code></pre>

      <h3>Subscribing to Events</h3>
      <pre><code className="language-typescript">
{`import { Subscribe } from 'canxjs';

class EmailService {
  @Subscribe('order.created')
  async onOrderCreated(payload: any) {
    await sendEmail(payload.orderId);
  }
}`}
      </code></pre>

      <h2>Service Registry</h2>
      <p>
        Automatic service discovery and load balancing. Services register themselves upon startup.
      </p>

      <pre><code className="language-typescript">
{`import { createServiceRegistry } from 'canxjs';

const registry = createServiceRegistry();

// Register this instance
await registry.register('payment-service', '10.0.0.5', 3000);

// Discover other services
const userService = await registry.discover('user-service');
// Result: { host: '10.0.0.2', port: 4000 }`}
      </code></pre>

    </div>
  );
}
