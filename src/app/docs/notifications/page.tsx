import { CodeBlock } from "@/components/ui/code-block";

export default function NotificationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Notifications
        </h1>
        <p className="text-xl text-zinc-400">
          CanxJS provides a unified API for sending notifications across a variety of delivery channels, including email, database, SMS, and Slack.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 id="creating-notifications" className="text-2xl font-semibold text-white scroll-mt-24">Creating Notifications</h2>
          <p className="text-zinc-400">
            To create a notification, use the <code>make:notification</code> command:
          </p>
          <CodeBlock language="bash" code={`bun run canx make:notification InvoicePaid`} />
          <p className="text-zinc-400">
            This class contains a <code>via</code> method defining the delivery channels and methods to format the message for each channel.
          </p>
          <CodeBlock language="typescript" code={`import { Notification, type Notifiable, type NotificationChannel } from 'canxjs';

export class InvoicePaid extends Notification {
  constructor(public invoiceId: string) {
    super();
  }

  via(notifiable: Notifiable): NotificationChannel[] {
    return ['mail', 'database'];
  }

  toMail(notifiable: Notifiable) {
    return {
      subject: 'Invoice Paid',
      html: \`<p>Your invoice \${this.invoiceId} has been paid.</p>\`
    };
  }

  toDatabase(notifiable: Notifiable) {
    return {
      invoice_id: this.invoiceId,
      amount: 100
    };
  }
}`} />
        </section>

        <section className="space-y-4">
          <h2 id="sending-notifications" className="text-2xl font-semibold text-white scroll-mt-24">Sending Notifications</h2>
          <p className="text-zinc-400">
            You can send notifications using the <code>notify</code> helper or by using the <code>Notifiable</code> trait on your User model.
          </p>
          <CodeBlock language="typescript" code={`import { notify } from 'canxjs';
import { InvoicePaid } from './notifications/InvoicePaid';

// Using the helper
await notify(user, new InvoicePaid('INV-1001'));

// Using the User model (if using Notifiable mixin)
await user.notify(new InvoicePaid('INV-1001'));`} />
        </section>

        <section className="space-y-4">
          <h2 id="database-notifications" className="text-2xl font-semibold text-white scroll-mt-24">Database Notifications</h2>
          <p className="text-zinc-400">
            The <code>database</code> channel stores notification information in a database table. You can access these notifications to display them in your UI.
          </p>
          <CodeBlock language="typescript" code={`const notifications = await Notification.where('notifiable_id', user.id).get();`} />
        </section>

        <section className="space-y-4">
          <h2 id="mail-notifications" className="text-2xl font-semibold text-white scroll-mt-24">Mail Notifications</h2>
          <p className="text-zinc-400">
            When using the <code>mail</code> channel, CanxJS attempts to send an email to the address defined in the <code>email</code> property of your notifiable entity.
          </p>
        </section>
      </div>
    </div>
  );
}
