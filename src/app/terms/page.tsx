import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertCircle, HelpCircle, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4">Legal</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: January 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        <section className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Agreement to Terms</h2>
          </div>
          <p className="text-muted-foreground">
            By accessing our website and using CanxJS, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms,
            you are prohibited from using this site.
          </p>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Scale className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold">License</h2>
          </div>
          <p className="text-muted-foreground">
            CanxJS is open source software released under the MIT License. You are free to use,
            copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.
          </p>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-xl font-semibold">Disclaimer</h2>
          </div>
          <p className="text-muted-foreground">
            CanxJS is provided &quot;as is&quot; without warranty of any kind. In no event shall the authors
            or copyright holders be liable for any claim, damages, or other liability arising from
            the use of the software.
          </p>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <HelpCircle className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold">Changes to Terms</h2>
          </div>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. Changes will be effective immediately
            upon posting to this page. Your continued use of CanxJS constitutes acceptance of the
            modified terms.
          </p>
        </section>

        <section className="glass-card p-6 animate-slide-up delay-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Mail className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold">Contact</h2>
          </div>
          <p className="text-muted-foreground">
            Questions about the Terms of Service should be sent to{" "}
            <a href="mailto:legal@canxjs.dev" className="text-primary hover:underline">
              legal@canxjs.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
