'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function MaintenanceModePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            v1.6.2
          </Badge>
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            Enterprise
          </Badge>
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
          Maintenance Mode
        </h1>
        <p className="text-lg text-muted-foreground">
          Put your application into maintenance mode during deployments.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4"># Overview</h2>
        <p className="text-muted-foreground mb-4">
          CanxJS provides a simple way to put your application into maintenance mode. 
          When in maintenance mode, all requests will receive a 503 (Service Unavailable) 
          response with a customizable maintenance page.
        </p>
      </section>

      {/* CLI Commands */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4"># CLI Commands</h2>
        
        <h3 className="text-xl font-medium text-foreground mb-3">Enable Maintenance Mode</h3>
        <div className="bg-[#0d1117] rounded-lg p-4 mb-4 font-mono text-sm">
          <div className="text-gray-400 mb-2"># Basic usage</div>
          <div className="text-green-400">canx down</div>
          <div className="text-gray-400 mt-4 mb-2"># With custom message</div>
          <div className="text-green-400">canx down --message=&quot;Upgrading to v2.0&quot;</div>
          <div className="text-gray-400 mt-4 mb-2"># With secret bypass</div>
          <div className="text-green-400">canx down --secret=&quot;my-secret-key&quot;</div>
          <div className="text-gray-400 mt-4 mb-2"># With retry header</div>
          <div className="text-green-400">canx down --retry=60</div>
        </div>

        <h3 className="text-xl font-medium text-foreground mb-3 mt-6">Disable Maintenance Mode</h3>
        <div className="bg-[#0d1117] rounded-lg p-4 mb-4 font-mono text-sm">
          <div className="text-green-400">canx up</div>
        </div>
      </section>

      {/* Options */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4"># Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-foreground">Option</th>
                <th className="text-left py-3 px-4 text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-blue-400">--message</td>
                <td className="py-3 px-4 text-muted-foreground">Custom maintenance message</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-blue-400">--secret</td>
                <td className="py-3 px-4 text-muted-foreground">Secret key to bypass maintenance mode</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-blue-400">--retry</td>
                <td className="py-3 px-4 text-muted-foreground">Retry-After header value in seconds</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-blue-400">--refresh</td>
                <td className="py-3 px-4 text-muted-foreground">Auto-refresh interval in seconds</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-blue-400">--redirect</td>
                <td className="py-3 px-4 text-muted-foreground">Redirect to a custom URL</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-mono text-blue-400">--except</td>
                <td className="py-3 px-4 text-muted-foreground">URIs to bypass (comma-separated)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Middleware */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4"># Middleware</h2>
        <p className="text-muted-foreground mb-4">
          Add the maintenance middleware to check for maintenance mode in your application:
        </p>
        <div className="bg-[#0d1117] rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">{`import { maintenanceMiddleware } from 'canxjs';

const app = createApp({
  middlewares: [
    maintenanceMiddleware({
      // Optional: Custom render function
      render: (req, data) => {
        return new Response('Custom maintenance page', { status: 503 });
      },
      // Optional: URIs to bypass
      except: ['/api/health', '/api/status'],
    }),
  ],
});`}</pre>
        </div>
      </section>

      {/* Programmatic Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4"># Programmatic Usage</h2>
        <div className="bg-[#0d1117] rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">{`import { 
  maintenance, 
  isDownForMaintenance,
  preCheckMaintenance 
} from 'canxjs';

// Check if in maintenance mode
if (isDownForMaintenance()) {
  console.log('App is in maintenance mode');
}

// Get maintenance data
const data = maintenance().getData();
console.log(data?.message);

// Programmatically enable/disable
maintenance().activate({ message: 'Upgrading...' });
maintenance().deactivate();

// Pre-check (before app boots)
if (preCheckMaintenance()) {
  console.log('Skipping full app boot');
}`}</pre>
        </div>
      </section>

      {/* Bypass */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4"># Bypassing Maintenance Mode</h2>
        <p className="text-muted-foreground mb-4">
          When you set a secret key, you can bypass maintenance mode by adding a query parameter:
        </p>
        <div className="bg-[#0d1117] rounded-lg p-4 mb-4 font-mono text-sm">
          <div className="text-green-400">https://yoursite.com?_maintenance_secret=your-secret</div>
        </div>
        <p className="text-muted-foreground">
          After bypassing, a cookie will be set so you don&apos;t need to add the query parameter again.
        </p>
      </section>
    </div>
  );
}
