import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/ui/TerminalPreview";
import { FileCode, ChevronRight, ArrowRight, BookOpen, Settings, Shield } from "lucide-react";

const setupExample = `import { createApp, SwaggerModule } from "canxjs";

const app = createApp();

const config = {
  title: 'Canx API',
  version: '1.0',
  description: 'The API description'
};

const document = SwaggerModule.createDocument(config, [UserController]);
SwaggerModule.setup('/api/docs', document);`;

const decoratorExample = `import { Controller, Get } from "canxjs";
import { ApiOperation, ApiResponse, ApiTags } from "canxjs/swagger";

@ApiTags('users')
@Controller('users')
export class UserController {

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return [];
  }
}`;

const dtoExample = `import { ApiProperty } from "canxjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  name: string;

  @ApiProperty({ required: false })
  age: number;
}`;

const features = [
  { icon: BookOpen, title: "Auto-Generated", desc: "Always up-to-date documentation." },
  { icon: Settings, title: "Swagger UI", desc: "Built-in interactive documentation UI." },
  { icon: Shield, title: "Auth Support", desc: "JWT, API Key, and OAuth2 support." },
  { icon: FileCode, title: "Decorators", desc: "Describe your API with metadata decorators." },
];

export default function OpenApiPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-12 animate-fade-in">
        <Badge variant="secondary" className="mb-4 bg-white/[0.05] border-white/[0.1] text-zinc-400">
          <FileCode className="w-3 h-3 mr-1.5" />Specification
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">OpenAPI (Swagger)</h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Generate professional API documentation automatically using TypeScript decorators and OpenAPI 3.0.
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
        <h2 className="text-2xl font-semibold text-white mb-4">Setup</h2>
        <CodePreview code={setupExample} filename="main.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-200">
        <h2 className="text-2xl font-semibold text-white mb-4">Decorators</h2>
        <CodePreview code={decoratorExample} filename="user.controller.ts" />
      </section>

      <section className="mb-16 animate-slide-up delay-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Models (DTOs)</h2>
        <CodePreview code={dtoExample} filename="create-user.dto.ts" />
      </section>
    </div>
  );
}
