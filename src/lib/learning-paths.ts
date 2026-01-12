export interface LearningStep {
  title: string;
  description: string;
  link: string;
  duration?: string;
}

export interface LearningPath {
  title: string;
  slug: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  steps: LearningStep[];
}

export const learningPaths: LearningPath[] = [
  {
    title: "CanxJS Basics",
    slug: "basics",
    description: "Learn the fundamentals of CanxJS, from installation to your first API route.",
    difficulty: "Beginner",
    estimatedTime: "30 mins",
    steps: [
      {
        title: "Installation",
        description: "Set up your environment and create a new project.",
        link: "/docs/installation",
        duration: "5 mins",
      },
      {
        title: "Project Structure",
        description: "Understand the folder structure and configuration.",
        link: "/docs/structure",
        duration: "5 mins",
      },
      {
        title: "Routing Basics",
        description: "Learn how to define routes and handle requests.",
        link: "/docs/routing/basics",
        duration: "10 mins",
      },
      {
        title: "Controllers",
        description: "Organize your logic with controllers.",
        link: "/docs/controllers",
        duration: "10 mins",
      },
    ],
  },
  {
    title: "Building an API",
    slug: "api-development",
    description: "Master the art of building robust REST APIs with authentication and database integration.",
    difficulty: "Intermediate",
    estimatedTime: "1 hour",
    steps: [
      {
        title: "Database Setup",
        description: "Connect to MySQL or PostgreSQL using the ORM.",
        link: "/docs/orm/setup",
        duration: "15 mins",
      },
      {
        title: "Models & Migrations",
        description: "Define your data schema and run migrations.",
        link: "/docs/orm/models",
        duration: "15 mins",
      },
      {
        title: "CRUD Operations",
        description: "Implement Create, Read, Update, Delete operations.",
        link: "/docs/orm/crud",
        duration: "20 mins",
      },
      {
        title: "Validation",
        description: "Validate incoming request data.",
        link: "/docs/validation",
        duration: "10 mins",
      },
    ],
  },
  {
    title: "Real-Time Apps",
    slug: "real-time",
    description: "Build real-time features using WebSockets and the HotWire protocol.",
    difficulty: "Advanced",
    estimatedTime: "2 hours",
    steps: [
      {
        title: "WebSocket Basics",
        description: "Understand how WebSockets work in CanxJS.",
        link: "/docs/websockets",
        duration: "30 mins",
      },
      {
        title: "HotWire Protocol",
        description: "Learn about the proprietary HotWire protocol for efficient streaming.",
        link: "/docs/hotwire",
        duration: "45 mins",
      },
      {
        title: "Broadcasting",
        description: "Broadcast events to multiple clients.",
        link: "/docs/websockets/broadcasting",
        duration: "45 mins",
      },
    ],
  },
];
