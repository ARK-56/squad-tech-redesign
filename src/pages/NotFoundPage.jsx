'use client'

import Link from 'next/link'
import { FiArrowRight, FiHome } from 'react-icons/fi'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p
          className="text-8xl font-bold mb-4 brand-text"
          style={{ letterSpacing: '-0.04em' }}
        >
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page not found
        </h1>
        <p className="text-white/50 leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary px-6 py-3">
            <FiHome className="w-4 h-4" /> Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary px-6 py-3">
            Contact Us <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
