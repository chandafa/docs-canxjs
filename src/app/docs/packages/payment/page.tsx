
export default function PaymentDocs() {
  return (
    <div className="max-w-4xl">
      <h1>Payment Package (@canxjs/payment)</h1>
      <p className="lead">
        Seamlessly integrate Payment Gateways like Midtrans into your CanxJS application.
      </p>

      <h2>Installation</h2>
      <p>
        The payment module is an optional package to keep the core framework lightweight.
      </p>
      <pre><code className="language-bash">
npm install @canxjs/payment
      </code></pre>

      <h2>Configuration</h2>
      <p>
        Add your Midtrans keys to your <code>.env</code> file:
      </p>
      <pre><code className="language-env">
MIDTRANS_SERVER_KEY=SB-Mid-xxxx
MIDTRANS_CLIENT_KEY=SB-Mid-xxxx
MIDTRANS_ENV=sandbox # or production
      </code></pre>

      <h2>Usage</h2>
      <p>
        You can use the driver directly in your controllers.
      </p>

      <h3>Creating a Snap Token</h3>
      <pre><code className="language-typescript">
{`import { MidtransDriver } from '@canxjs/payment';

export class CheckoutController {
  
  async create(req: Request) {
    const driver = new MidtransDriver();
    
    const { url, id } = await driver.checkout({
      amount: 150000,
      currency: 'IDR',
      successUrl: 'https://myshop.com/thankyou',
      customer: req.user.email,
      metadata: { 
        items: [{ id: 1, name: 'Sepatu', price: 150000, quantity: 1 }] 
      }
    });
    
    return { redirect_url: url };
  }
}`}
      </code></pre>

      <h3>Verifying Webhooks</h3>
      <p>
        Securely verify that incoming webhooks are from Midtrans using SHA-512 signature check.
      </p>
      <pre><code className="language-typescript">
{`import { MidtransDriver } from '@canxjs/payment';

export class WebhookController {
  
  async handle(req: Request) {
    const driver = new MidtransDriver();
    
    // 1. Verify Signature (SHA-512)
    const isValid = await driver.verifySignature(req.body);
    if (!isValid) throw new Error("Invalid Signature");

    // 2. Process Order
    if (req.body.transaction_status === 'settlement') {
      await Order.markPaid(req.body.order_id);
    }
  }
}`}
      </code></pre>

    </div>
  );
}
