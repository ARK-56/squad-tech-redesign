import { services } from '../src/data/services'
import { projects } from '../src/data/portfolio'
import { posts } from '../src/data/blog'
import { authors } from '../src/data/authors'
import { themeCategories } from '../src/data/themes'
import { industries } from '../src/data/industries'

const SITE_URL = 'https://squadtechsol.com'

const staticRoutes = [
  ['', 1.0],
  ['/services', 0.9],
  ['/portfolio', 0.8],
  ['/pricing', 0.9],
  ['/guarantee', 0.7],
  ['/about', 0.7],
  ['/blogs', 0.8],
  ['/resources', 0.7],
  ['/themes', 0.7],
  ['/writers', 0.5],
  ['/partners', 0.5],
  ['/write-for-us', 0.5],
  ['/faq', 0.6],
  ['/reviews', 0.6],
  ['/careers', 0.5],
  ['/contact', 0.8],
  ['/start', 0.7],
  ['/privacy-policy', 0.3],
  ['/terms', 0.3],
]

export default function sitemap() {
  const now = new Date()
  // Blog posts carry their real publish date so Google sees genuine freshness
  // signals instead of every URL claiming it changed today.
  const postDate = (p) => {
    const d = new Date(p.date)
    return isNaN(d) ? now : d
  }

  const entries = [
    ...staticRoutes.map(([route, priority]) => ({
      url: `${SITE_URL}${route}`,
      priority,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      lastModified: now,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: now,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/portfolio/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: now,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blogs/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'yearly',
      lastModified: postDate(p),
    })),
    ...Object.keys(authors).map((slug) => ({
      url: `${SITE_URL}/writers/${slug}`,
      priority: 0.4,
      changeFrequency: 'monthly',
      lastModified: now,
    })),
    ...Object.keys(themeCategories).map((slug) => ({
      url: `${SITE_URL}/themes/${slug}`,
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: now,
    })),
    ...Object.keys(industries).map((slug) => ({
      url: `${SITE_URL}/for/${slug}`,
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: now,
    })),
    // /lp/* ad landing pages are noindex on purpose — not listed
  ]
  const seen = new Set()
  return entries.filter((e) => !seen.has(e.url) && seen.add(e.url))
}
