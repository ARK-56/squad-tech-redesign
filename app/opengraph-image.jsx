import { ImageResponse } from 'next/og'

// Generates a real 1200x630 PNG for social sharing. Social crawlers
// (Facebook, LinkedIn, X, WhatsApp, Slack) cannot render AVIF, so the
// brand logo.avif must never be used as an OG image.
export const alt = 'Squad Tech Solution — Full-Service Digital Marketing Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#060606',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#f58e1e',
            marginBottom: 28,
          }}
        >
          Full-Service Digital Marketing Agency
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: 30,
          }}
        >
          Squad Tech Solution
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.4,
          }}
        >
          Social Media · SEO &amp; PPC · Web Development · Brand Identity
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            height: 10,
            width: 260,
            borderRadius: 999,
            background: 'linear-gradient(90deg, #e73103, #f58e1e)',
          }}
        />
      </div>
    ),
    size
  )
}
