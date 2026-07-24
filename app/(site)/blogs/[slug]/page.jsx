import { posts } from '../../../../src/data/blog'
import BlogPost from '../../../../src/pages/BlogPost'

const SITE_URL = 'https://squadtechsol.com'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

// Posts added via the admin CMS after the last deploy aren't in `posts`;
// the client component fetches /api/blogs and handles those, so unknown
// slugs still render (no server redirect here).
export const dynamicParams = true

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Blog' }
  const published = isNaN(new Date(post.date)) ? undefined : new Date(post.date).toISOString()
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blogs/${slug}`,
      publishedTime: published,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)

  const publishedDate = post && (isNaN(new Date(post.date)) ? post.date : new Date(post.date).toISOString().slice(0, 10))

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blogs/${slug}` },
        headline: post.title,
        description: post.excerpt,
        image: post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        datePublished: publishedDate,
        dateModified: publishedDate,
        wordCount: (post.body || [])
          .map((b) => (typeof b?.content === 'string' ? b.content.split(/\s+/).length : 0))
          .reduce((a, b) => a + b, 0) || undefined,
        articleSection: post.category,
        inLanguage: 'en-US',
        author: {
          '@type': post.author?.isTeam ? 'Organization' : 'Person',
          name: post.author?.name || 'Squadtech Editorial',
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }
    : null

  const breadcrumbSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blogs/${slug}` },
        ],
      }
    : null

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      <BlogPost />
    </>
  )
}
