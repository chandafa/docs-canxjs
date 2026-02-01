
export default function ClusterDocs() {
  return (
    <div className="max-w-4xl">
      <h1>Cluster Mode & High Availability</h1>
      <p className="lead">
        Scale your application across multiple CPU cores with zero-downtime reloads.
      </p>

      <h2>Introduction</h2>
      <p>
        CanxJS comes with a built-in Cluster Manager that allows you to take full advantage of multi-core systems.
        It automatically distributes incoming load across worker processes and ensures your application stays alive even if a worker crashes.
      </p>

      <h2>Enabling Cluster Mode</h2>
      <p>
        To enable cluster mode, use the <code>initCluster</code> function in your entry file:
      </p>

      <pre><code className="language-typescript">
{`import { initCluster, CanxServer } from 'canxjs';

// Initialize Cluster
initCluster({
  enabled: true,
  workers: 'auto', // Auto-detect CPU cores
});

const app = new CanxServer();
app.start();`}
      </code></pre>

      <h2>Features</h2>
      <ul>
        <li><strong>Automatic Load Balancing:</strong> Traffic is distributed round-robin to workers.</li>
        <li><strong>Zero-Downtime Reload:</strong> Updates code without dropping connections.</li>
        <li><strong>Crash Recovery:</strong> Dead workers are instantly replaced.</li>
      </ul>

      <h2>Configuration</h2>
      <p>
        You can customize the cluster behavior:
      </p>
       <pre><code className="language-typescript">
{`initCluster({
  enabled: process.env.NODE_ENV === 'production',
  workers: 4, // Force 4 workers
  wrapper: (app) => {
    console.log('Worker started');
  }
});`}
      </code></pre>
    </div>
  );
}
