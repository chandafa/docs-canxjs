import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://docs-canxjs.netlify.app'
  
  // Main pages
  const mainRoutes = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/docs', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/learn', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/blog', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/showcase', priority: 0.6, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.5, changeFreq: 'monthly' as const },
    { path: '/cli', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/api-reference', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/extension', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  ]

  // Getting Started docs
  const gettingStartedDocs = [
    '/docs/introduction',
    '/docs/installation',
    '/docs/config',
    '/docs/core-concepts',
  ]

  // Core Features docs
  const coreFeaturesDocs = [
    '/docs/routing',
    '/docs/controllers',
    '/docs/request-response',
    '/docs/middleware',
    '/docs/validation',
    '/docs/authentication',
    '/docs/session',
    '/docs/security',
  ]

  // Database docs
  const databaseDocs = [
    '/docs/orm',
    '/docs/migrations',
    '/docs/seeders',
  ]

  // Advanced Features docs
  const advancedDocs = [
    '/docs/api',
    '/docs/websockets',
    '/docs/hotwire',
    '/docs/caching',
    '/docs/queue',
    '/docs/scheduler',
    '/docs/storage',
    '/docs/events',
    '/docs/notifications',
    '/docs/i18n',
    '/docs/resources',
  ]

  // Architecture docs
  const architectureDocs = [
    '/docs/container',
    '/docs/providers',
    '/docs/aop',
  ]

  // Enterprise Features docs
  const enterpriseDocs = [
    '/docs/microservices',
    '/docs/graphql',
    '/docs/cqrs',
    '/docs/performance',
    '/docs/openapi',
    '/docs/views',
  ]

  // Monitoring & DevOps docs
  const devOpsDocs = [
    '/docs/health',
    '/docs/tracing',
    '/docs/http2',
    '/docs/search',
    '/docs/payment',
  ]

  // CLI & Tools docs
  const cliDocs = [
    '/docs/cli',
    '/docs/cli/dashboard',
  ]

  // Testing docs
  const testingDocs = [
    '/docs/testing',
    '/docs/testing/unit',
    '/docs/testing/installation',
    '/docs/testing/usage',
  ]

  // UI Components docs
  const uiDocs = [
    '/docs/ui',
    '/docs/ui/installation',
    '/docs/ui/button',
    '/docs/ui/input',
    '/docs/ui/card',
    '/docs/ui/badge',
    '/docs/ui/alert',
    '/docs/ui/modal',
    '/docs/ui/table',
    '/docs/ui/label',
  ]

  // Admin & Utilities
  const adminDocs = [
    '/docs/admin',
    '/docs/utilities',
  ]

  // Official Packages docs
  const packagesDocs = [
    '/docs/packages/citadel',
    '/docs/packages/dominion',
    '/docs/packages/blocks',
    '/docs/packages/echo',
  ]

  // Guides & Resources
  const guidesDocs = [
    '/docs/starters',
    '/docs/upgrade',
    '/docs/downgrade',
    '/docs/release-notes',
    '/docs/contribution',
    '/docs/deployment',
  ]

  // Combine all docs routes with appropriate priorities
  const allDocsRoutes = [
    ...gettingStartedDocs.map(path => ({ path, priority: 0.9 })),
    ...coreFeaturesDocs.map(path => ({ path, priority: 0.85 })),
    ...databaseDocs.map(path => ({ path, priority: 0.85 })),
    ...advancedDocs.map(path => ({ path, priority: 0.8 })),
    ...architectureDocs.map(path => ({ path, priority: 0.75 })),
    ...enterpriseDocs.map(path => ({ path, priority: 0.8 })),
    ...devOpsDocs.map(path => ({ path, priority: 0.7 })),
    ...cliDocs.map(path => ({ path, priority: 0.75 })),
    ...testingDocs.map(path => ({ path, priority: 0.75 })),
    ...uiDocs.map(path => ({ path, priority: 0.7 })),
    ...adminDocs.map(path => ({ path, priority: 0.7 })),
    ...packagesDocs.map(path => ({ path, priority: 0.8 })),
    ...guidesDocs.map(path => ({ path, priority: 0.7 })),
  ]

  const now = new Date()

  // Build sitemap entries
  const entries: MetadataRoute.Sitemap = [
    // Main routes
    ...mainRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFreq,
      priority: route.priority,
    })),
    // Documentation routes
    ...allDocsRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route.priority,
    })),
  ]

  return entries
}
