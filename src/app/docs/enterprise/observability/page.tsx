
export default function ObservabilityDocs() {
  return (
    <div className="max-w-4xl">
      <h1>Observability: Metrics & Tracing</h1>
      <p className="lead">
        Gain deep insights into your application performance with Prometheus and OpenTelemetry.
      </p>

      <h2>Metrics (Prometheus)</h2>
      <p>
        CanxJS automatically exposes default metrics (CPU, Memory, HTTP latency) at <code>/metrics</code>.
      </p>

      <h3>Custom Metrics</h3>
      <pre><code className="language-typescript">
{`import { metrics } from 'canxjs';

// Counter
metrics.increment('users_registered_total');

// Histogram (Duration)
metrics.recordDuration('db_query_duration', 150); // ms`}
      </code></pre>

      <h2>Distributed Tracing</h2>
      <p>
        Trace requests as they flow through your microservices. Compatible with Jaeger, Zipkin, and Datadog.
      </p>

      <h3>Using Decorators</h3>
      <pre><code className="language-typescript">
{`import { Trace } from 'canxjs';

class OrderController {
  
  @Trace('process_order')
  async create(req: Request) {
    await this.validate(req);
    await this.charge(req);
  }
}`}
      </code></pre>
      
      <p>
        The <code>@Trace</code> decorator automatically creates a Span for the method execution and tracks any errors.
      </p>

    </div>
  );
}
