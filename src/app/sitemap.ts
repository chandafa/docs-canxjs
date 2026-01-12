import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://canxjs.dev'
  
  const routes = [
    '',
    '/docs',
    '/docs/installation',
    '/docs/introduction',
    '/docs/core-concepts',
    '/docs/config',
    '/docs/api',
    '/docs/cli',
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
