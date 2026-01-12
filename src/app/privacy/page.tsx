import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Database, Lock, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4">Legal</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: January 2026
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
        <section className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold m-0">Our Commitment</h2>
          </div>
          <p className="text-muted-foreground m-0">
            At CanxJS, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold m-0">Information We Collect</h2>
          </div>
          <ul className="text-muted-foreground space-y-2 m-0 list-none p-0">
            <li>• Usage data and analytics to improve our documentation</li>
            <li>• Technical information such as browser type and device</li>
            <li>• Email addresses when you subscribe to our newsletter</li>
          </ul>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Database className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold m-0">How We Use Your Information</h2>
          </div>
          <ul className="text-muted-foreground space-y-2 m-0 list-none p-0">
            <li>• To provide and maintain our services</li>
            <li>• To improve user experience and documentation</li>
            <li>• To send updates about CanxJS (with your consent)</li>
          </ul>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Lock className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold m-0">Data Security</h2>
          </div>
          <p className="text-muted-foreground m-0">
            We implement industry-standard security measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold m-0">Contact Us</h2>
          </div>
          <p className="text-muted-foreground m-0">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@canxjs.dev" className="text-primary hover:underline">
              privacy@canxjs.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
