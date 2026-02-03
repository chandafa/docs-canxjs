import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { MessageSquare, ArrowRight, Settings, Smartphone } from "lucide-react";

const configExample = `// src/config/app.ts
export const config = {
  // ...
  sms: {
    default: 'twilio',
    drivers: {
      twilio: {
        sid: process.env.TWILIO_SID,
        token: process.env.TWILIO_TOKEN,
        from: process.env.TWILIO_FROM,
      },
      vonage: {
        key: process.env.VONAGE_KEY,
        secret: process.env.VONAGE_SECRET,
        from: process.env.VONAGE_FROM,
      }
    }
  }
};`;

const notificationExample = `import { Notification, type Notifiable } from 'canxjs';

export class OrderShipped extends Notification {
  constructor(public orderId: string) {}

  via(notifiable: Notifiable) {
    return ['sms'];
  }

  toSms(notifiable: Notifiable) {
    return {
      content: \`Your order \${this.orderId} has been shipped!\`,
      // Optional: override recipient
      // to: '+1234567890' 
    };
  }
}`;

const directUsageExample = `import { sms } from 'canxjs';

// Send using default driver
await sms().send({
  to: '+15550001234',
  content: 'Hello form CanxJS!'
});

// Switch driver
await sms().driver('vonage').send({
  to: '+15550001234',
  content: 'Hello from Vonage!'
});`;

export default function SMSPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <MessageSquare className="w-3 h-3 mr-1.5" />Notifications
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">SMS Channels</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Send SMS notifications easily using Twilio, Vonage, or custom drivers.
          Integrated seamlessly with CanxJS&apos;s notification system.
        </p>
      </div>

      <section className="mb-16 animate-slide-up">
        <h2 className="text-2xl font-semibold text-white mb-4">Configuration</h2>
        <p className="text-zinc-400 mb-6">Configure your SMS drivers in the app config.</p>
        <CodePreview code={configExample} filename="src/config/app.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4">Sending via Notification</h2>
        <p className="text-zinc-400 mb-6">
          The recommended way to send SMS is through Notification classes. 
          Simply add <code>sms</code> to the <code>via</code> array and implement <code>toSms</code>.
        </p>
        <CodePreview code={notificationExample} filename="notifications/OrderShipped.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Direct Usage</h2>
        <p className="text-zinc-400 mb-6">
          You can also use the <code>sms</code> facade for quick, direct messaging.
        </p>
        <CodePreview code={directUsageExample} filename="controller.ts" />
      </section>

      <section className="animate-slide-up delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">More Notifications</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/notifications">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Notification System <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
