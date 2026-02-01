import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { 
  TestTube2, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle,
  FileCode,
  Layers,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "Unit Testing",
  description: "Learn how to write unit tests for your CanxJS applications. Test controllers, services, models, and utilities with Bun's native test runner.",
  openGraph: {
    title: "Unit Testing in CanxJS",
    description: "Comprehensive guide to unit testing CanxJS controllers, services, and models.",
  },
};

const controllerTestExample = `import { describe, test, expect, beforeEach } from "bun:test";
import { UserController } from "../controllers/UserController";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(() => {
    controller = new UserController();
  });

  test("index returns list of users", async () => {
    const users = await controller.index();
    
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  test("show returns single user by ID", async () => {
    const user = await controller.show(1);
    
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });

  test("store creates new user", async () => {
    const userData = { name: "John", email: "john@example.com" };
    const user = await controller.store(userData);
    
    expect(user.name).toBe("John");
    expect(user.email).toBe("john@example.com");
  });
});`;

const serviceTestExample = `import { describe, test, expect, mock } from "bun:test";
import { AuthService } from "../services/AuthService";

describe("AuthService", () => {
  test("hash password correctly", async () => {
    const service = new AuthService();
    const password = "mySecurePassword";
    
    const hashed = await service.hashPassword(password);
    
    expect(hashed).not.toBe(password);
    expect(hashed.length).toBeGreaterThan(20);
  });

  test("verify password returns true for correct password", async () => {
    const service = new AuthService();
    const password = "mySecurePassword";
    const hashed = await service.hashPassword(password);
    
    const isValid = await service.verifyPassword(password, hashed);
    
    expect(isValid).toBe(true);
  });

  test("verify password returns false for wrong password", async () => {
    const service = new AuthService();
    const hashed = await service.hashPassword("correct");
    
    const isValid = await service.verifyPassword("wrong", hashed);
    
    expect(isValid).toBe(false);
  });
});`;

const mockingExample = `import { describe, test, expect, mock, spyOn } from "bun:test";
import { EmailService } from "../services/EmailService";
import { UserService } from "../services/UserService";

describe("UserService with mocks", () => {
  test("sends welcome email on registration", async () => {
    // Create mock
    const sendEmailMock = mock(() => Promise.resolve(true));
    
    const emailService = new EmailService();
    spyOn(emailService, "send").mockImplementation(sendEmailMock);
    
    const userService = new UserService(emailService);
    await userService.register({ 
      name: "John", 
      email: "john@example.com" 
    });
    
    expect(sendEmailMock).toHaveBeenCalled();
    expect(sendEmailMock).toHaveBeenCalledWith(
      "john@example.com",
      "Welcome to CanxJS!"
    );
  });
});`;

const bestPractices = [
  "Test one thing per test case",
  "Use descriptive test names",
  "Arrange-Act-Assert (AAA) pattern",
  "Mock external dependencies",
  "Keep tests independent",
  "Use beforeEach for common setup",
];

export default function UnitTestingPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <TestTube2 className="w-3 h-3 mr-1.5" />
          Testing
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Unit Testing</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Write focused, fast unit tests for your CanxJS application components. 
          Test controllers, services, models, and utilities in isolation.
        </p>
      </div>

      {/* Best Practices */}
      <section className="mb-16 animate-slide-up">
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            Best Practices
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {bestPractices.map((practice) => (
              <div key={practice} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-zinc-300 text-sm">{practice}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Controllers */}
      <section className="mb-16 animate-slide-up delay-100">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <FileCode className="w-5 h-5 text-green-400" />
          </div>
          Testing Controllers
        </h2>
        <p className="text-zinc-400 mb-6">
          Test your controller methods in isolation by instantiating them directly and calling their methods.
        </p>
        <CodePreview code={controllerTestExample} filename="tests/UserController.test.ts" />
      </section>

      {/* Testing Services */}
      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          Testing Services
        </h2>
        <p className="text-zinc-400 mb-6">
          Services contain your business logic. Test them thoroughly to ensure core functionality works correctly.
        </p>
        <CodePreview code={serviceTestExample} filename="tests/AuthService.test.ts" />
      </section>

      {/* Mocking */}
      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Mocking Dependencies</h2>
        <p className="text-zinc-400 mb-6">
          Use Bun&apos;s built-in <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">mock()</code> and{" "}
          <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">spyOn()</code> to mock external dependencies.
        </p>
        <CodePreview code={mockingExample} filename="tests/UserService.test.ts" />
      </section>

      {/* Next Steps */}
      <section className="animate-slide-up delay-400">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <p className="text-zinc-400 mb-6">
            Learn more about testing patterns and explore integration testing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/testing/usage">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                Usage Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs/testing/installation">
              <Button variant="outline" className="rounded-full border-white/[0.15] hover:bg-white/[0.05]">
                Installation
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
