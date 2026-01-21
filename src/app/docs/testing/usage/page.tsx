import { CodeBlock } from "@/components/ui/code-block";

export default function TestingUsagePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
          Writing Tests
        </h1>
        <p className="text-xl text-zinc-400">
          Learn how to use the TestCase class to write expressive integration tests.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Basic Usage</h2>
          <p className="text-zinc-400">
            Extend your test files with <code>TestCase</code> to access helper methods.
          </p>
          <CodeBlock language="typescript" code={`import { TestClient } from "canxjs";
import { describe, test } from "bun:test";

describe("User API", () => {
  test("guest cannot access profile", async () => {
    const api = new TestClient();
    
    // Fluent assertion API
    const response = await api.get("/api/user");
    
    response.assertStatus(401);
  });
});`} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Authentication</h2>
          <p className="text-zinc-400">
            Use the <code>actingAs</code> helper to mock authentication headers easily.
          </p>
          <CodeBlock language="typescript" code={`test("authenticated user can access profile", async () => {
  const api = new TestClient();
  
  // Simulate logged in user with a token
  const response = await api.withToken("fake-jwt-token").get("/api/user");
  
  response.assertStatus(200);
  
  // Verify response body
  const data = await response.json();
  expect(data.email).toBe("user@example.com");
});`} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Making Requests</h2>
          <p className="text-zinc-400">
            Supported HTTP methods:
          </p>
          <ul className="list-disc list-inside text-zinc-400 space-y-2">
            <li><code>api.get(url)</code></li>
            <li><code>api.post(url, body)</code></li>
            <li><code>api.put(url, body)</code></li>
            <li><code>api.delete(url)</code></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Component Testing (Mocks)</h2>
          <p className="text-zinc-400">
             For unit testing controllers and services with mocked dependencies, use the <code>Test</code> utility.
          </p>
          <CodeBlock language="typescript" code={`import { Test, TestingModule } from 'canxjs';
import { UserController } from './UserController';
import { UserService } from './UserService';

test("it returns users", async () => {
    // Create a testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
    .overrideProvider(UserService)
    .useValue({
      findAll: () => ['test-user'],
    })
    .compile();

    const controller = module.get(UserController);
    const result = await controller.findAll();
    
    expect(result).toEqual(['test-user']);
});`} />
        </section>
      </div>
    </div>
  );
}
