const clients = [
  { name: 'AAA DME', logo: '/images/clients/aaa-dme.png' },
  { name: 'Atlantic Medical Supply', logo: '/images/clients/atlantic-medical.png' },
  { name: 'B8 Equipment', logo: '/images/clients/b8-equipment.png' },
  { name: 'Baybridge Health Care', logo: '/images/clients/baybridge.png' },
  { name: 'Dexsora', logo: '/images/clients/dexsora.png' },
  { name: 'GW', logo: '/images/clients/Gw.png' },
  { name: 'MM', logo: '/images/clients/MM.png' },
  { name: 'Nexcare', logo: '/images/clients/Nexcare.png' },
  { name: 'Premiere', logo: '/images/clients/Premiere.png' },
  { name: 'Reshape', logo: '/images/clients/Reshape.png' },
  { name: 'S8', logo: '/images/clients/S8.png' },
  { name: 'Shinkyowa', logo: '/images/clients/Shinkyowa.png' },
  { name: 'Smartbilling', logo: '/images/clients/Smartbilling.png' },
  { name: 'Squad International', logo: '/images/clients/Squad International.png' },
  { name: 'Squad Medical', logo: '/images/clients/Squad Medical.png' },
]

// Duplicate so -50% translate = exactly one set width, guaranteed seamless loop
const track = [...clients, ...clients]

function ClientLogo({ client }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-8 cursor-default">
      <img
        src={client.logo}
        alt={client.name}
        className="h-14 w-auto object-contain max-w-[180px] transition-all duration-300"
        loading="lazy"
        decoding="async"
        style={{ filter: 'brightness(0) invert(1) opacity(0.5)' }}
        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1) invert(0) opacity(1)'}
        onMouseLeave={e => e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(0.5)'}
      />
    </div>
  )
}

export default function Clients() {
  return (
    <section className="py-14 border-y border-white/5 overflow-hidden">
      <div className="w-full max-w-[78rem] mx-auto px-4 mb-8 text-center">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
          Trusted by <span style={{ color: '#f58e1e' }}>67+ companies</span> worldwide
        </p>
      </div>

      <div className="relative">
        {/* Scrolling track — pause on hover */}
        <div
          className="flex items-center animate-marquee hover:[animation-play-state:paused]"
          style={{ willChange: 'transform', width: 'max-content' }}
        >
          {track.map((client, i) => (
            <ClientLogo key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}
