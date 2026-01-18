
export const tutorialData = {
  // Beginner
  "getting-started": {
    title: "Getting Started with CanxJS",
    duration: "15 min",
    level: "Beginner",
    description: "Learn the basics of CanxJS and create your first application.",
    content: `
# Getting Started with CanxJS

Welcome to CanxJS! In this tutorial, we will walk through creating your first ultra-fast web application.

## Prerequisites

Before we begin, ensure you have the following installed:
- **Bun** (v1.0 or higher)
- **Node.js** (optional, for some tooling)

## 1. Creating a New Project

The easiest way to start is using the CLI generator. Open your terminal and run:

\`\`\`bash
bunx create-canx my-first-app
\`\`\`

Follow the interactive prompts:
- **Project Type**: Fullstack (MVC)
- **Language**: TypeScript (Recommended)
- **Database**: SQLite (Perfect for starting out)

## 2. Project Structure

Once created, let's look at the structure:

\`\`\`
my-first-app/
├── src/
│   ├── app.ts           # Entry point
│   ├── controllers/     # Route handlers
│   └── views/           # JSX templates
├── package.json
└── tsconfig.json
\`\`\`

## 3. Your First Route

CanxJS is designed to be simple. Open \`src/app.ts\` and add a basic route:

\`\`\`typescript
import { createApp } from "canxjs";

const app = createApp();

app.get("/", (req, res) => {
  return res.json({ message: "Hello from CanxJS!" });
});

app.listen();
\`\`\`

## 4. Running the Server

Start your development server:

\`\`\`bash
bun run dev
\`\`\`

Visit \`http://localhost:3000\` in your browser, and you should see your JSON response!
    `
  },
  "routing-basics": {
    title: "Understanding Routing",
    duration: "20 min",
    level: "Beginner",
    description: "Master the routing system and create dynamic routes.",
    content: `
# Understanding Routing in CanxJS

CanxJS uses a Radix Tree based router, making it incredibly fast. Let's dive into defining routes.

## Basic Routing

Routes are defined on the \`app\` instance:

\`\`\`typescript
app.get("/posts", getPosts);
app.post("/posts", createPost);
app.put("/posts/:id", updatePost);
app.delete("/posts/:id", deletePost);
\`\`\`

## Route Parameters

You can capture values from the URL using the colon syntax:

\`\`\`typescript
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  return res.send(\`User ID: \${userId}\`);
});
\`\`\`

## Route Groups

Organize your routes using groups. This is great for APIs:

\`\`\`typescript
app.group("/api/v1", (router) => {
    router.get("/users", listUsers);
    router.get("/products", listProducts);
});
\`\`\`

This creates \`/api/v1/users\` and \`/api/v1/products\`.
    `
  },
  "controllers": {
    title: "Working with Controllers",
    duration: "25 min",
    level: "Beginner",
    description: "Organize your code with controller decorators.",
    content: `
# Working with Controllers

While closures are great for simple apps, Controllers help organize larger applications.

## Creating a Controller

Use the CLI to generate a controller:

\`\`\`bash
bun run canx make:controller UserController
\`\`\`

## Controller Structure

Controllers in CanxJS use decorators to define routes:

\`\`\`typescript
import { Controller, Get, Post } from "canxjs";

@Controller("/users")
export class UserController {
  
  @Get("/")
  async index() {
    return { users: [] };
  }

  @Post("/")
  async create(req) {
    // Create user logic
    return { created: true };
  }
}
\`\`\`

## Registering Controllers

Register your controller in \`src/app.ts\`:

\`\`\`typescript
import { UserController } from "./controllers/UserController";

app.routes((router) => {
  router.controller("/", UserController);
});
\`\`\`
    `
  },

  // Intermediate
  "database": {
    title: "Database & ORM",
    duration: "30 min",
    level: "Intermediate",
    description: "Connect to databases and use the built-in ORM.",
    content: `
# Database & ORM

CanxJS comes with a lightweight yet powerful ORM that supports MySQL, PostgreSQL, and SQLite.

## Configuration

Database configuration lives in \`src/config/database.ts\`:

\`\`\`typescript
export default {
  default: "mysql",
  connections: {
    mysql: {
      driver: "mysql",
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      // ...
    }
  }
}
\`\`\`

## Creating Models

Generate a model:

\`\`\`bash
bun run canx make:model User
\`\`\`

## Using the Query Builder

\`\`\`typescript
import { DB } from "canxjs";

// Fetch all users
const users = await DB.table("users").get();

// Filtering
const activeUsers = await DB.table("users")
    .where("status", "active")
    .orderBy("created_at", "desc")
    .get();
\`\`\`

## Eloquent-style Models

\`\`\`typescript
import { User } from "./models/User";

const user = await User.find(1);
user.name = "Updated Name";
await user.save();
\`\`\`
    `
  },
  "authentication": {
    title: "Authentication & Security",
    duration: "35 min",
    level: "Intermediate",
    description: "Implement JWT authentication and protect routes.",
    content: `
# Authentication & Security

Security is a first-class citizen in CanxJS. Let's implement JWT authentication.

## Auth Middleware

First, ensure your auth middleware is set up to verify tokens:

\`\`\`typescript
import { Middleware } from "canxjs";

export const AuthMiddleware: Middleware = async (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!isValid(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
};
\`\`\`

## Protecting Routes

Apply the middleware to routes you want to protect:

\`\`\`typescript
app.group("/dashboard", (router) => {
  router.middleware(AuthMiddleware);
  
  router.get("/", (req, res) => res.json({ data: "Secret Data" }));
});
\`\`\`

## Hashing Passwords

Always hash passwords before storing them. CanxJS provides a \`Hash\` facade:

\`\`\`typescript
import { Hash } from "canxjs";

const hashedPassword = await Hash.make("my-secret-password");

if (await Hash.check("input-password", hashedPassword)) {
    // Passwords match!
}
\`\`\`
    `
  },
  "rest-api": {
    title: "Building REST APIs",
    duration: "40 min",
    level: "Intermediate",
    description: "Create complete RESTful APIs with best practices.",
    content: `
# Building REST APIs

CanxJS excels at building high-performance APIs. Here are best practices.

## Consistency with API Resources

Use API Resources to transform data before sending it to the client:

\`\`\`typescript
import { JsonResource } from "canxjs";

export class UserResource extends JsonResource {
  toArray() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      // Hide created_at, updated_at, etc.
    };
  }
}
\`\`\`

## Standard Response Format

Maintain a consistent response structure:

\`\`\`json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 50
  }
}
\`\`\`

## Versioning

Always version your APIs using Route Groups:

\`\`\`typescript
app.group("/api/v1", (v1) => { /* ... */ });
app.group("/api/v2", (v2) => { /* ... */ });
\`\`\`
    `
  },

  // Advanced
  "hotwire": {
    title: "Real-time with HotWire",
    duration: "30 min",
    level: "Advanced",
    description: "Build real-time features with HotWire protocol.",
    content: `
# Real-time with HotWire

HotWire allows you to push updates to the client without writing complex JavaScript.

## The HotWire Protocol

CanxJS implements a custom HotWire protocol over WebSockets.

## Broadcasting Events

To broadcast an event to the frontend:

\`\`\`typescript
import { broadcast } from "canxjs";

await broadcast("chat-room-1").emit("new-message", {
  text: "Hello World",
  user: "John Doe"
});
\`\`\`

## Client-Side Consumption

On the frontend (using the \`canx-client\` library):

\`\`\`javascript
import { echo } from "canx-client";

echo.channel("chat-room-1")
    .listen("new-message", (e) => {
        console.log(e.text);
    });
\`\`\`
    `
  },
  "websockets": {
    title: "WebSocket Integration",
    duration: "35 min",
    level: "Advanced",
    description: "Implement WebSocket servers for live updates.",
    content: `
# WebSocket Integration

For raw real-time power, CanxJS exposes the underlying WebSocket server (powered by Bun).

## Handling Connections

In your \`src/ws.ts\` (or similar):

\`\`\`typescript
import { WebSocketServer } from "canxjs";

const wss = new WebSocketServer({
  open(ws) {
    console.log("Client connected");
    ws.subscribe("global");
  },
  message(ws, message) {
    console.log("Received:", message);
    ws.publish("global", \`Echo: \${message}\`);
  }
});
\`\`\`

## Integration with HTTP

The WebSocket server shares the same port as your HTTP server, thanks to Bun's single-process model, ensuring zero latency overhead.
    `
  },
  "performance": {
    title: "Performance Optimization",
    duration: "40 min",
    level: "Advanced",
    description: "Optimize your app for 250,000+ req/sec.",
    content: `
# Performance Optimization

CanxJS is already fast, but these tips will push it to the limit.

## 1. Use the JIT Compiler

CanxJS includes an experimental JIT compiler for routes. Enable it in config:

\`\`\`typescript
// src/config/app.ts
export const config = {
  jit: true,
};
\`\`\`

## 2. Optimize Database Queries

Avoid N+1 queries by using eager loading:

\`\`\`typescript
// Bad
const posts = await Post.all();
for (const post of posts) {
  await post.load("author"); // N+1 query
}

// Good
const posts = await Post.with("author").get();
\`\`\`

## 3. Caching

Use the built-in Redis cache for expensive operations:

\`\`\`typescript
import { Cache } from "canxjs";

const stats = await Cache.remember("dashboard_stats", 60, async () => {
    return calculateHeavyStats();
});
\`\`\`
    `
  }
};
