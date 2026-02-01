
import { DocsLayout } from "@/components/layout/DocsLayout";

export default function SecurityDocs() {
  return (
    <DocsLayout>
      <h1>Enterprise Security</h1>
      <p className="lead">
        Bank-grade security features including Audit Logging, Secrets Management, and OAuth2.
      </p>

      <h2>Audit Logging</h2>
      <p>
        Create immutable audit trails for compliance (SOC2, HIPAA). Powered by <code>AuditLogger</code>.
      </p>

      <pre><code className="language-typescript">
{`import { Audit, auditLogger } from 'canxjs';

class PaymentController {
  
  // Method Decorator
  @Audit('payment.process') 
  async process(req: Request) {
    // ...
  }

  // Manual Logging
  async refund(req: Request) {
    await auditLogger().log('payment.refund', {
      actor: { id: req.user.id, type: 'user' },
      resource: { type: 'payment', id: '123' },
      status: 'success'
    });
  }
}`}
      </code></pre>

      <h2>Secrets Manager</h2>
      <p>
        Unified interface to access secrets from Environment, HashiCorp Vault, or AWS Secrets Manager.
      </p>
      
      <pre><code className="language-typescript">
{`import { secrets } from 'canxjs';

// Get or Throw (if missing)
const apiKey = await secrets.getOrThrow('STRIPE_API_KEY');

// Get with default
const dbHost = await secrets.get('DB_HOST') || 'localhost';`}
      </code></pre>

      <h2>OAuth2 Provider</h2>
      <p>
        Turn your CanxJS application into an Identity Provider (IdP) with built-in OAuth2 Server support.
      </p>

    </DocsLayout>
  );
}
