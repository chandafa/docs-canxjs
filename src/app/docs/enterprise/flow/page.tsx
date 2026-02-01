
export default function FlowDocs() {
  return (
    <div className="max-w-4xl">
      <h1>Canx Flow (Durable Execution)</h1>
      <p className="lead">
        Fault-tolerant workflow engine that survives server restarts and crashes.
      </p>

      <h2>Why Canx Flow?</h2>
      <p>
        Standard code fails if the server restarts in the middle of execution. 
        Canx Flow persists the execution state to the database after every step.
        If the server crashes, it resumes automatically from the last successful step.
      </p>

      <h2>Defining a Workflow</h2>
      <pre><code className="language-typescript">
{`import { workflow } from 'canxjs';

const subscriptionFlow = workflow('subscription', async (ctx, userId) => {
  
  // Step 1: Charge
  await ctx.step('charge', () => payment.charge(userId));

  // Step 2: Sleep (Durable)
  // Server can be offline during this time
  await ctx.sleep('trial', 30 * 24 * 3600 * 1000); // 30 days

  // Step 3: Renew
  await ctx.step('renew', () => payment.renew(userId));

});`}
      </code></pre>

      <h2>Starting a Workflow</h2>
      <pre><code className="language-typescript">
{`// Start async (returns workflow ID)
const id = await subscriptionFlow.start('user-123');`}
      </code></pre>

    </div>
  );
}
