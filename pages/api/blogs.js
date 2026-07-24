import { staticPosts } from '../../src/data/blog'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')

  try {
    const cmsData = JSON.parse(
      readFileSync(join(process.cwd(), 'src/data/blog-cms.json'), 'utf8')
    )

    // CMS posts first (newest), then static posts
    const posts = [...(cmsData.posts || []), ...staticPosts]

    res.status(200).json({ posts })
  } catch (err) {
    res.status(500).json({ error: 'Failed to load blog posts', detail: err.message })
  }
}
