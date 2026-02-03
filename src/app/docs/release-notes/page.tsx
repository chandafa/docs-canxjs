import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Release Notes - CanxJS",
  description: "Stay up to date with the latest improvements and features in CanxJS.",
};

const supportData = [
  { 
    version: "1.6", 
    node: "18+", 
    release: "February 2026", 
    bugFixes: "August 2027", 
    securityFixes: "February 2028",
    status: "current" 
  },
  { 
    version: "1.3", 
    node: "18+", 
    release: "October 2025", 
    bugFixes: "April 2027", 
    securityFixes: "October 2027",
    status: "active" 
  },
  { 
    version: "1.2", 
    node: "16+", 
    release: "June 2025", 
    bugFixes: "December 2026", 
    securityFixes: "June 2027",
    status: "security" 
  },
  { 
    version: "1.0", 
    node: "16+", 
    release: "December 2024", 
    bugFixes: "June 2025", 
    securityFixes: "December 2025",
    status: "eol" 
  },
];

export default function ReleaseNotesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
          Release Notes
        </h1>
        <p className="text-xl text-muted-foreground">
          Stay up to date with the latest improvements and features in CanxJS.
        </p>
      </div>

      {/* Support Policy */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground" id="support-policy"># Support Policy</h2>
        <p className="text-muted-foreground">
          For all CanxJS releases, bug fixes are provided for 18 months and security fixes 
          are provided for 2 years. For all additional libraries, only the latest major 
          release receives bug fixes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="pb-3 pr-4 font-medium text-muted-foreground">Version</th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">Node (*)</th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">Release</th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">Bug Fixes Until</th>
                <th className="pb-3 font-medium text-muted-foreground">Security Fixes Until</th>
              </tr>
            </thead>
            <tbody>
              {supportData.map((row) => (
                <tr key={row.version} className="border-b border-border/50">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`w-3 h-3 rounded-sm ${
                          row.status === 'current' ? 'bg-green-500' :
                          row.status === 'active' ? 'bg-blue-500' :
                          row.status === 'security' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                      />
                      <span className="font-medium text-foreground">{row.version}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-muted-foreground">{row.node}</td>
                  <td className="py-4 pr-4 text-muted-foreground">{row.release}</td>
                  <td className="py-4 pr-4 text-muted-foreground">{row.bugFixes}</td>
                  <td className="py-4 text-muted-foreground">{row.securityFixes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-green-500" />
            <span className="text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-blue-500" />
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-orange-500" />
            <span className="text-muted-foreground">Security fixes only</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="text-muted-foreground">End of life</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">(*) Supported Node.js versions</p>
      </section>

      {/* Version History */}
      <div className="space-y-12 pt-8 border-t border-border">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground" id="canxjs-16"># CanxJS 1.6</h2>
          <div className="flex items-center gap-4">
             <h3 className="text-xl font-bold text-foreground">v1.6.2</h3>
             <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Current</Badge>
             <span className="text-muted-foreground">February 2026</span>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">New Features</h4>
            
            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card border border-border">
                    <h5 className="font-medium text-foreground mb-2">Task Scheduler</h5>
                    <p className="text-muted-foreground text-sm">
                        A robust cron-style task scheduler has been added, allowing you to schedule repeated tasks directly from your code without relying on the operating system&apos;s crontab.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border">
                    <h5 className="font-medium text-foreground mb-2">Events System</h5>
                    <p className="text-muted-foreground text-sm">
                        A fully-featured event observer implementation. You can now define Event classes and Listeners to decouple your application logic.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border">
                    <h5 className="font-medium text-foreground mb-2">Notification System</h5>
                    <p className="text-muted-foreground text-sm">
                         Added support for sending notifications via multiple channels (Email, Database, SMS). Includes a fluent API for constructing messages.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border">
                    <h5 className="font-medium text-foreground mb-2">Storage System</h5>
                    <p className="text-muted-foreground text-sm">
                        introduced a powerful file storage abstraction with support for Local and S3 drivers, making file handling seamless across environments.
                    </p>
                </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground" id="canxjs-10"># CanxJS 1.0</h2>
           <div className="flex items-center gap-4">
             <h3 className="text-xl font-bold text-muted-foreground">v1.0.0</h3>
             <span className="text-muted-foreground">December 2024</span>
          </div>
           <p className="text-muted-foreground">
             Initial release of CanxJS, featuring the core ultra-fast HTTP server, routing engine, and dependency injection container.
           </p>
        </section>
      </div>
    </div>
  );
}

