'use client'

import useScrollReveal from '../hooks/useScrollReveal'

const videos = [
  {
    src: '/videos/Social Media Marketing.mp4',
    label: 'Social Media Marketing',
  },
  {
    src: '/videos/video-presence-2.mp4',
    label: 'Brand & Web Presence',
  },
  {
    src: '/videos/video-presence-3.mp4',
    label: 'Growth Engineering',
  },
]

export default function WorkEthic() {
  const { ref, visible } = useScrollReveal()

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">OUR WORK ETHIC</p>
            <h2 className="section-title">
              The Hungry Agency Built to{' '}
              <span className="brand-text">Out-Work the Rest</span>
            </h2>
          </div>
          <p className="section-copy max-w-sm">
            Watch how our rapid digital engineering sprints turn concepts into cash.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`group rounded-2xl overflow-hidden border border-white/10 relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms`, background: 'rgba(255,255,255,0.04)', aspectRatio: '16/10' }}
    >
      <video
        muted
        playsInline
        preload="metadata"
        autoPlay
        loop
        // controls
        className="w-full h-full object-cover"
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Label */}
      <div
        className="absolute bottom-3 left-3 right-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <span
          className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-white"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
        >
          {video.label}
        </span>
      </div>
    </div>
  )
}
