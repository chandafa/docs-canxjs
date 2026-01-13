import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://docs-canxjs.netlify.app'
  
  const routes = [
    '',
    '/docs',
    '/docs/introduction',
    '/docs/installation',
    '/docs/core-concepts',
    '/docs/routing',
    '/docs/controllers',
    '/docs/request-response',
    '/docs/middleware',
    '/docs/orm',
    '/docs/migrations',
    '/docs/seeders',
    '/docs/config',
    '/docs/api',
    '/docs/cli',
    '/docs/security',
    '/docs/testing',
    '/docs/deployment',
    '/docs/websockets',
    '/docs/hotwire',
    '/docs/admin',
    '/docs/ui',
    '/learn',
    '/blog',
    '/showcase',
    '/about',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/docs') ? 0.8 : 0.6,
  }))
}
