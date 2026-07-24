export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/thank-you', '/lp/'],
    },
    sitemap: 'https://squadtechsol.com/sitemap.xml',
  }
}
