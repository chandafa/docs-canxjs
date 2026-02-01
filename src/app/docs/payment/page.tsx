import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { CreditCard, ChevronRight, ArrowRight, DollarSign, Settings, Lock } from "lucide-react";

const usageExample = `import { payment } from "canxjs/payment";

// 1. Use the default driver (mock by default)
await payment.driver().charge(1000, "usd", { source: "tok_visa" });

// 2. Use a specific driver
await payment.driver("stripe").charge(5000, "usd", { customer: "cus_123" });

// 3. Register a custom driver
import { StripeDriver } from "./StripeDriver";
payment.register("stripe", new StripeDriver(process.env.STRIPE_SECRET));`;

const driverExample = `import { PaymentGateway } from "canxjs/payment";

export class MyCustomGateway implements PaymentGateway {
  async charge(amount: number, currency: string, options?: any) {
    // Call 3rd party API
    return { id: "ch_123", status: "succeeded" };
  }
  
  async refund(id: string, amount?: number) {
    // ...
  }
}`;

const features = [
  { icon: CreditCard, title: "Multi-Gateway", desc: "Switch between Stripe, PayPal, or Mock effortlessly." },
  { icon: Lock, title: "Secure", desc: "Standardized interface for handling sensitive data." },
  { icon: Settings, title: "Extensible", desc: "Easily register your own payment drivers." },
  { icon: DollarSign, title: "Unified API", desc: "One API for all payment providers." },
];

export default function PaymentPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <CreditCard className="w-3 h-3 mr-1.5" />Monetization
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Payment</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          A unified API for handling payments across multiple gateways. Comes with a Mock driver for testing.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5">
              <div className="p-2 rounded-lg bg-green-500/10 w-fit mb-3">
                <item.icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Usage</h2>
        <CodePreview code={usageExample} filename="payment.service.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Custom Driver</h2>
        <CodePreview code={driverExample} filename="MyCustomGateway.ts" />
      </section>
    </div>
  );
}
