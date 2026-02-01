import { DocsLayout } from '@/components/layout/DocsLayout';
import { DocsTypography } from '@/components/ui/DocsTypography';

const { H1, H2, H3, P, CodeBlock, Code } = DocsTypography;

export default function EchoDocs() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <H1>Echo</H1>
          <P>
            <Code>@canxjs/echo</Code> is a robust client-side library that makes it easy to subscribe to channels and listen for events broadcast by your server-side broadcasting driver. It serves as the bridge between your backend events and your frontend UI.
          </P>
        </div>

        <section>
          <H2>Installation</H2>
          <CodeBlock language="bash">
            {`npm install @canxjs/echo socket.io-client`}
          </CodeBlock>
        </section>

        <section>
          <H2>Setup</H2>
          <P>
            Initialize Echo in your client-side application (e.g., in your root component or a dedicated service).
          </P>
          <CodeBlock language="javascript">
            {`import Echo from '@canxjs/echo';
import io from 'socket.io-client';

// Pass the 'io' client since we use implicit global detection or explicit passing
const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:3000',
    client: io
});`}
          </CodeBlock>
        </section>

        <section>
          <H2>Listening for Events</H2>
          <P>
             Once instantiated, you can listen to public channels and events.
          </P>
          <CodeBlock language="javascript">
            {`echo.channel('orders')
    .listen('OrderShipped', (e) => {
        console.log(e.order.name);
    });`}
          </CodeBlock>
        </section>

        <section>
          <H2>Private Channels</H2>
          <P>
            For private channels, authentication is handled automatically if your auth endpoint is configured correctly.
          </P>
          <CodeBlock language="javascript">
            {`echo.private('user.1')
    .listen('NotificationReceived', (e) => {
        // ...
    });`}
          </CodeBlock>
        </section>

        <section>
          <H2>Leaving a Channel</H2>
          <CodeBlock language="javascript">
            {`echo.leave('orders');`}
          </CodeBlock>
        </section>
      </div>
    </DocsLayout>
  );
}
