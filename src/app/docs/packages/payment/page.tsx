import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  CreditCard, 
  ChevronRight,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Package (@canxjs/payment)",
  description: "Secure payment gateway integration with Midtrans for CanxJS applications. SHA-512 signature verification included.",
  openGraph: {
    title: "Payment Package - CanxJS",
    description: "Secure Midtrans integration with SHA-512 signature verification.",
  },
};

const checkoutCode = `import { MidtransDriver } from '@canxjs/payment';

export class CheckoutController {
  
  async create(req: Request) {
    const driver = new MidtransDriver();
    
    const { url, id } = await driver.checkout({
      amount: 150000,
      currency: 'IDR',
      successUrl: 'https://myshop.com/thankyou',
      customer: req.user.email,
      orderId: 'ORDER-001',
      metadata: { 
        items: [
          { id: 'SKU-001', name: 'Product Name', price: 150000, quantity: 1 }
        ] 
      }
    });
    
    // Redirect user to Midtrans payment page
    return { redirect_url: url };
  }
}`;

const webhookCode = `import { MidtransDriver } from '@canxjs/payment';

export class WebhookController {
  
  async handle(req: Request) {
    const driver = new MidtransDriver();
    const payload = await req.json();
    
    // 1. Verify Signature (SHA-512 with timing-safe comparison)
    const isValid = await driver.verifySignature(payload);
    if (!isValid) {
      throw new Error("Invalid Signature");
    }

    // 2. Process based on status
    const { order_id, transaction_status } = payload;
    
    switch (transaction_status) {
      case 'capture':
      case 'settlement':
        await Order.markPaid(order_id);
        break;
      case 'pending':
        // Waiting for payment
        break;
      case 'deny':
      case 'cancel':
      case 'expire':
        await Order.markFailed(order_id);
        break;
    }
    
    return new Response('OK');
  }
}`;

const configCode = `# .env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
MIDTRANS_ENV=sandbox  # or 'production'`;

const features = [
  { 
    icon: CreditCard, 
    title: "Midtrans Snap", 
    desc: "Full Snap API support for seamless checkout experience.",
    color: "blue"
  },
  { 
    icon: Shield, 
    title: "Secure Verification", 
    desc: "SHA-512 signature with timing-safe comparison prevents attacks.",
    color: "green"
  },
  { 
    icon: Zap, 
    title: "Zero Dependencies", 
    desc: "Standalone driver with no core framework dependency required.",
    color: "purple"
  },
  { 
    icon: Globe, 
    title: "Environment Aware", 
    desc: "Auto-switches between sandbox and production endpoints.",
    color: "orange"
  },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-green-500/10 text-green-400",
  purple: "bg-purple-500/10 text-purple-400",
  orange: "bg-orange-500/10 text-orange-400",
};

export default function PaymentDocs() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-secondary border-border text-muted-foreground">
          <CreditCard className="w-3 h-3 mr-1.5" />
          Official Package
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Payment</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          CanxJS&apos;s payment package provides a unified API for payment processing. It offers secure payment gateway integration 
          with Midtrans (Indonesia's leading payment gateway). Built with security best practices.
        </p>
      </div>

      {/* Features Grid */}
      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="rounded-2xl bg-card border border-border p-5 hover:bg-accent/50 transition-all duration-300"
            >
              <div className={`p-2 rounded-lg w-fit mb-3 ${colorClasses[item.color]}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          The payment module is an optional package to keep the core framework lightweight.
        </p>
        <CodePreview 
          code={`npm install @canxjs/payment
# or
bun add @canxjs/payment`}
          filename="terminal"
        />
      </section>

      {/* Configuration */}
      <section className="mb-16 animate-slide-up delay-150">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Configuration</h2>
        <p className="text-muted-foreground mb-4">
          Add your Midtrans credentials to your environment variables.
        </p>
        <CodePreview code={configCode} filename=".env" />
      </section>

      {/* Creating Checkout */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" />
          Creating a Checkout
        </h2>
        <p className="text-muted-foreground mb-4">
          Use the <code className="text-primary">MidtransDriver</code> to create a Snap checkout session.
        </p>
        <CodePreview code={checkoutCode} filename="controllers/CheckoutController.ts" />
      </section>

      {/* Webhook Verification */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Webhook Verification
        </h2>
        <p className="text-muted-foreground mb-4">
          Securely verify incoming webhooks using SHA-512 signature verification with timing-safe comparison.
        </p>
        <CodePreview code={webhookCode} filename="controllers/WebhookController.ts" />
      </section>

      {/* Security Best Practices */}
      <section className="mb-16 animate-slide-up delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Security Best Practices</h2>
        <div className="rounded-2xl bg-card border border-border p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Always verify webhooks</strong> — Never trust unverified payment notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Use HTTPS</strong> — Ensure your webhook endpoint uses HTTPS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Validate amounts</strong> — Cross-check amounts with your database</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong className="text-foreground">Handle idempotency</strong> — Webhooks may be sent multiple times</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-500">
        <div className="rounded-2xl bg-gradient-to-br from-card to-background border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
          <p className="text-muted-foreground mb-6">
            Explore other official packages to extend your CanxJS application.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/packages/citadel">
              <Button className="rounded-full">
                Citadel (Auth)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/packages/dominion">
              <Button variant="outline" className="rounded-full">
                Dominion (RBAC)
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
