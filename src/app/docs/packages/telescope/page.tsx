'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Microscope, Activity, Database, Clock, Terminal } from 'lucide-react';
import { CodePreview } from '@/components/ui/TerminalPreview';

export default function TelescopePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
            Package
          </Badge>
          <Badge variant="outline">@canxjs/telescope</Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4">Telescope</h1>
        <p className="text-lg text-muted-foreground">
          A beautiful debug assistant for your CanxJS application. Insight into requests, exceptions, database queries, and more.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-xl border border-border bg-card">
            <Activity className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Request Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Monitor incoming HTTP requests, response statuses, and duration.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <Database className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Query Watcher</h3>
            <p className="text-sm text-muted-foreground">
              inspect executed database queries and their execution time.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <Clock className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="font-semibold mb-2">Schedule & Jobs</h3>
            <p className="text-sm text-muted-foreground">
              Track background jobs and scheduled tasks execution.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <Terminal className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-semibold mb-2">Log Inspector</h3>
            <p className="text-sm text-muted-foreground">
              View application logs and exceptions in real-time.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <CodePreview 
          code={`bun add @canxjs/telescope
# or
npm install @canxjs/telescope`}
          filename="terminal"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Telescope can be configured in your `config/telescope.ts` or passed directly when initializing.
        </p>
        <CodePreview 
          code={`import { telescope } from '@canxjs/telescope';

// Initialize with custom config
telescope.init({
  enabled: process.env.NODE_ENV === 'development',
  limit: 100,
  watchers: {
    request: true,
    query: true,
    exception: true,
    log: true,
    job: false
  }
});`}
          filename="src/bootstrap.ts"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <p className="text-muted-foreground mb-4">
          Access the dashboard at <code className="text-primary">/telescope</code> in your browser.
        </p>
        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
          <strong>Note:</strong> Ensure you protect this route in production environments!
        </div>
      </section>
    </div>
  );
}
