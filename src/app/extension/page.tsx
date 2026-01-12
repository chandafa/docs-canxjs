"use client";

import { Download, Terminal, Command, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v0.0.1 Available Now
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            CanxJS for VS Code
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Supercharge your development workflow with official snippets, commands, and potential intellisense for CanxJS.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white gap-2" asChild>
              <a href="https://marketplace.visualstudio.com/items?itemName=chandafa.vscode-canx">
                <Download className="w-5 h-5" />
                Download Extension (.vsix)
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-zinc-800 hover:bg-zinc-900 text-zinc-300" asChild>
              <Link href="/docs/installation">
                View Documentation
              </Link>
            </Button>
          </div>
          <p className="text-xs text-zinc-500">
            *Requires VS Code 1.80.0 or newer
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Snippets</h3>
            <p className="text-zinc-400">
              Type <code>canx-controller</code> to instantly scaffold new controllers with CRUD methods.
            </p>
          </Card>
          
          <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Terminal className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Rapid Routing</h3>
            <p className="text-zinc-400">
              Define routes faster than ever with <code>canx-route</code> snippets supporting all HTTP methods.
            </p>
          </Card>

          <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <Command className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Command Palette</h3>
            <p className="text-zinc-400">
              Access framework specific commands directly from the VS Code command palette.
            </p>
          </Card>
        </div>

        {/* Installation Guide */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">How to Install</h2>
            <p className="text-zinc-400">Since we are self-hosting this extension, installation is slightly different (but easy!).</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold shrink-0">1</div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-white">Download the VSIX file</h3>
                <p className="text-zinc-400">Click the download button above to save the <code>.vsix</code> file to your computer.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold shrink-0">2</div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-white">Open VS Code Extensions</h3>
                <p className="text-zinc-400">
                  Open VS Code, go to the Extensions view (Ctrl+Shift+X), click the "..." menu at the top right, and select <strong>"Install from VSIX..."</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold shrink-0">3</div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-white">Select and Install</h3>
                <p className="text-zinc-400">Browse to where you downloaded the file and select it. VS Code will install it instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
