# CanxJS - Ultra-fast Backend Framework for Bun

[![CanxJS Version](https://img.shields.io/badge/CanxJS-v1.2.0-blueviolet?style=for-the-badge&logo=bun)](http://docs-canxjs.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

**CanxJS** is an ultra-fast, async-first MVC backend framework built specifically for [Bun](https://bun.sh). Designed for high performance and developer happiness, it allows you to build production-ready APIs with Type-Safety, elegance, and speed.

> **Documentation**: [http://docs-canxjs.netlify.app](http://docs-canxjs.netlify.app)

## 🚀 Why CanxJS?

CanxJS is built to be the modern alternative to Express and Laravel for the JavaScript ecosystem.

- **Ultra-High Performance**: Capable of handling **250,000+ requests per second**, making it up to 15x faster than Express.
- **Bun Native**: Leveraging the speed of the Bun runtime for incredibly fast startup times (<50ms).
- **Async-First MVC**: Modern architecture that treats asynchronous operations as a first-class citizen.
- **Type-Safe**: Built with TypeScript in mind, offering excellent autocomplete and build-time safety.
- **Batteries Included**: Comes with Routing, Controllers, Middleware, zero-config ORM, and more.

## 📦 Installation

Get started in seconds with our CLI tool:

```bash
# Initialize a new project
bunx create-canx my-app

# Navigate to project
cd my-app

# Start the development server
bun run dev
```

## 🛠 Features

- **Radix Tree Routing**: O(k) matching algorithm for blazing fast routes.
- **HotWire Protocol**: Real-time streaming and updates without complex WebSocket setup.
- **WebSocket Support**: Native integration for bidirectional communication.
- **Auto-Cache Layer**: Intelligent caching strategies to optimize response times.
- **Zero-Config ORM**: Seamless support for MySQL and PostgreSQL.
- **Native JSX Views**: Server-side rendering without external template engines.
- **Edge Runtime Ready**: Deploy to global edge networks for low latency.

## 📚 Documentation

For full documentation, tutorials, and API reference, visit our official documentation site:

[**Read the Documentation →**](http://docs-canxjs.netlify.app)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

CanxJS is open-source software licensed under the [MIT license](LICENSE).
