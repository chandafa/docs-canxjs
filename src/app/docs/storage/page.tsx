import { CodeBlock } from "@/components/ui/code-block";

export default function StoragePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          File Storage
        </h1>
        <p className="text-xl text-zinc-400">
          CanxJS provides a powerful file system abstraction thanks to its flexible drivers. Easily swap between local storage and Amazon S3 without changing your application code.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 id="configuration" className="text-2xl font-semibold text-white scroll-mt-24">Configuration</h2>
          <p className="text-zinc-400">
            Storage configuration is located in <code>src/config/app.ts</code>. You can define multiple "disks" using different drivers.
          </p>
          <CodeBlock language="typescript" code={`export const config = {
  storage: {
    default: 'local',
    disks: {
      local: {
        driver: 'local',
        root: './storage/app'
      },
      s3: {
        driver: 's3',
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION,
        bucket: process.env.AWS_BUCKET,
      }
    }
  }
}`} />
        </section>

        <section className="space-y-4">
          <h2 id="basic-usage" className="text-2xl font-semibold text-white scroll-mt-24">Basic Usage</h2>
          <p className="text-zinc-400">
            The <code>storage</code> facade allows you to interact with your configured disks.
          </p>
          <CodeBlock language="typescript" code={`import { storage } from 'canxjs';

// Write to default disk
await storage.put('avatars/1.jpg', fileContent);

// Write to specific disk
await storage.disk('s3').put('avatars/1.jpg', fileContent);

// Check existence
if (await storage.exists('file.jpg')) {
    // ...
}

// Get URL
const url = storage.url('avatars/1.jpg');`} />
        </section>

        <section className="space-y-4">
          <h2 id="file-uploads" className="text-2xl font-semibold text-white scroll-mt-24">File Uploads</h2>
          <p className="text-zinc-400">
             CanxJS simplifies file uploads with the <code>handleUpload</code> helper, which handles validation, naming, and storage automatically.
          </p>
          <CodeBlock language="typescript" code={`import { handleUpload } from 'canxjs';

class UserController extends Controller {
  @Post('/avatar')
  async uploadAvatar(req: CanxRequest) {
    const file = await handleUpload(req, 'avatar', {
        directory: 'avatars',
        allowedTypes: ['image/jpeg', 'image/png'],
        maxSize: 1024 * 1024 * 5 // 5MB
    });

    if (!file) throw new Error('No file uploaded');

    return { url: file.url };
  }
}`} />
        </section>

        <section className="space-y-4">
           <h2 id="api-reference" className="text-2xl font-semibold text-white scroll-mt-24">API Reference</h2>
           
           <h3 id="methods" className="text-xl font-semibold text-white mt-4 scroll-mt-24">Methods</h3>
           <ul className="list-disc list-inside text-zinc-400 space-y-2 mt-2">
             <li><code>put(path, content)</code></li>
             <li><code>get(path)</code></li>
             <li><code>exists(path)</code></li>
             <li><code>delete(path)</code></li>
             <li><code>copy(from, to)</code></li>
             <li><code>move(from, to)</code></li>
             <li><code>url(path)</code></li>
             <li><code>size(path)</code></li>
             <li><code>mimeType(path)</code></li>
           </ul>
        </section>
      </div>
    </div>
  );
}
