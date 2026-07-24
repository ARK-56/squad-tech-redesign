import { Analytics } from '@vercel/analytics/react'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import '../src/index.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const SITE_URL = 'https://squadtechsol.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Squad Tech Solution | Creative Digital Agency',
    template: '%s | Squad Tech Solution',
  },
  description:
    'Squadtech Solution delivers social media marketing, SEO and PPC, brand identity, media production, web development, and dedicated remote staff.',
  applicationName: 'Squad Tech Solution',
  keywords: [
    'digital marketing agency',
    'social media marketing',
    'SEO agency',
    'Google Ads management',
    'web development agency',
    'brand identity design',
    'media production',
    'dedicated remote staff',
  ],
  authors: [{ name: 'Squad Tech Solution', url: SITE_URL }],
  creator: 'Squad Tech Solution',
  publisher: 'Squad Tech Solution',
  // OG/Twitter images are generated as real PNGs by app/opengraph-image.jsx —
  // never point these at .avif, social crawlers can't render it.
  openGraph: {
    siteName: 'Squad Tech Solution',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@squadtechsol',
    creator: '@squadtechsol',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: { icon: '/favicon.ico' },
  other: {
    'p:domain_verify': 'd8ddec08aec37ad75d9ff36608286077',
  },
}

export const viewport = {
  themeColor: '#060606',
}

const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/squadtechsolution',
  'https://www.instagram.com/squadtechsolution',
  'https://www.facebook.com/squadtechsolution',
  'https://www.youtube.com/@SquadTechSolution',
  'https://www.tiktok.com/@squadtechsolution',
  'https://x.com/squadtechsol',
  'https://www.pinterest.com/SquadTechSolution',
  'https://www.behance.net/squadtechsolution',
]

// ProfessionalService is a LocalBusiness subtype — better for local/agency SEO
// than a bare Organization, and it supports address, hours, and area served.
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Squad Tech Solution',
  alternateName: 'Squadtech Solution',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.avif`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    'Full-service digital marketing agency delivering social media marketing, SEO and PPC, brand identity, media production, web development, and dedicated remote staff.',
  email: 'inquiry@squadtechsol.com',
  telephone: '+1-201-820-6889',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '276 Holten Ave',
    addressLocality: 'Staten Island',
    addressRegion: 'NY',
    postalCode: '10309',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Germany' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-201-820-6889',
    email: 'inquiry@squadtechsol.com',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
  sameAs: SOCIAL_PROFILES,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Squad Tech Solution',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-US',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />

        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1CR8BPPT0B" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1CR8BPPT0B');`}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '999808529451496');
            fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=999808529451496&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* TrustBox */}
        <Script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" strategy="lazyOnload" />

        {/* Tawk.to Chatbot */}
        <Script id="tawk-chat" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='/tawk_to.js';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
