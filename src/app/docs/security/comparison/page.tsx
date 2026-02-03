'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Check, X, AlertTriangle } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';

export default function SecurityComparisonPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            Security Audit
          </Badge>
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
          Security Comparison
        </h1>
        <p className="text-lg text-muted-foreground">
          How CanxJS stacks up against other popular frameworks in terms of built-in security.
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-2">Secure by Design</h2>
              <p className="text-muted-foreground leading-relaxed">
                CanxJS takes a "battery-included" approach to security. Unlike micro-frameworks that require you to manually install and configure security middleware, CanxJS ships with industry-standard protection enabled by default or easily configurable via the <code className='text-primary'>Helmet</code> and <code className='text-primary'>Security</code> middleware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Feature Comparison Matrix</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px]">Feature</TableHead>
                <TableHead className="text-center font-bold text-primary">CanxJS</TableHead>
                <TableHead className="text-center">NestJS</TableHead>
                <TableHead className="text-center">Express</TableHead>
                <TableHead className="text-center">Laravel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">CSRF Protection</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Plugin)</TableCell>
                <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /> (Manual)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">XSS Protection</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Plugin)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Helmet)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SQL Injection</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (ORM)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (TypeORM)</TableCell>
                <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /> (Manual)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Security Headers (Helmet)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Built-in)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Plugin)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Manual)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rate Limiting</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /> (Plugin)</TableCell>
                <TableCell className="text-center"><X className="w-5 h-5 text-red-500 mx-auto" /> (Manual)</TableCell>
                <TableCell className="text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          * "Manual" means you must install and configure separate 3rd-party packages yourself.
          <br />
          * "Plugin" means it's available via an official or semi-official package but not installed by default.
        </p>
      </section>

      {/* Built-in Features Detail */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">CanxJS Security Features</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Integrated Helmet Middleware
            </h3>
            <p className="text-muted-foreground text-sm">
              CanxJS includes a custom implementation of Helmet to automatically set secure HTTP headers (HSTS, X-Frame-Options, CSP, etc.) without needing external dependencies.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Auto-CSRF Protection
            </h3>
            <p className="text-muted-foreground text-sm">
              Cross-Site Request Forgery tokens are automatically generated and verified for all unsafe HTTP methods (POST, PUT, DELETE), protecting your forms out of the box.
            </p>
          </div>
          
           {/* Feature 3 */}
           <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              XSS Sanitization
            </h3>
            <p className="text-muted-foreground text-sm">
              The JSX rendering engine in CanxJS automatically escapes all content by default, preventing Cross-Site Scripting (XSS) attacks when rendering views.
            </p>
          </div>

           {/* Feature 4 */}
           <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Input Validation
            </h3>
            <p className="text-muted-foreground text-sm">
              Detailed request validation middleware ensures that only valid, safe data reaches your controllers, filtering out malicious inputs early in the request lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="p-6 rounded-xl bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-primary">
          <Check className="w-5 h-5" />
          Verdict
        </h3>
        <p className="text-foreground/80">
          CanxJS offers a security profile comparable to Laravel (the gold standard in secure PHP frameworks) and exceeds the default security posture of "bare-bones" frameworks like Express. It provides a safer starting point for beginners by enabling protections by default.
        </p>
      </section>
    </div>
  );
}
