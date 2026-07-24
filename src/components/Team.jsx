'use client'

import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi'
import useScrollReveal from '../hooks/useScrollReveal'

const team = [
  {
    name: 'Lauren Janet',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 15+ years building digital products for Fortune 500 companies.',
    gradient: 'from-primary-500 to-primary-700',
    initials: 'LJ',
  },
  {
    name: 'Ramon Joshua',
    role: 'Sr. UI/UX Designer',
    bio: 'Award-winning designer who blends aesthetics with user psychology to create memorable experiences.',
    gradient: 'from-accent-400 to-orange-600',
    initials: 'RJ',
  },
  {
    name: 'Antonio Julian',
    role: 'UX Researcher',
    bio: 'Deep expertise in user research and behavioral analysis that informs every design decision.',
    gradient: 'from-purple-500 to-pink-600',
    initials: 'AJ',
  },
  {
    name: 'Sabrina Melody',
    role: 'Lead Developer',
    bio: 'Full-stack engineer passionate about performance, accessibility, and clean, maintainable code.',
    gradient: 'from-teal-400 to-cyan-600',
    initials: 'SM',
  },
  {
    name: 'Ricardo Marlin',
    role: 'Jr. Designer',
    bio: 'Creative talent specializing in visual identity, illustration, and motion graphics.',
    gradient: 'from-green-400 to-emerald-600',
    initials: 'RM',
  },
  {
    name: 'Adrian Gerald',
    role: 'Project Manager',
    bio: 'Keeps every project on track, on budget, and exceeding client expectations with agile precision.',
    gradient: 'from-rose-400 to-pink-600',
    initials: 'AG',
  },
]

export default function Team() {
  const { ref, visible } = useScrollReveal()

  return (
    <section id="team" className="py-24 bg-dark-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-tag mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Our Team
          </div>
          <h2 className="section-title mb-4">
            Meet The{' '}
            <span className="gradient-text">Creative Minds</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A talented, passionate team of designers, developers, and strategists — united by a shared love of great digital craft.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`group card text-center relative overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Avatar */}
      <div className="relative inline-block mb-5">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glow-lg group-hover:scale-105 transition-all duration-300`}>
          <span className="text-white text-xl font-bold">{member.initials}</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-800" />
      </div>

      <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
      <div className="text-primary-400 text-sm font-semibold mb-3">{member.role}</div>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{member.bio}</p>

      {/* Social links */}
      <div className="flex justify-center gap-3">
        {[FiLinkedin, FiTwitter, FiGithub].map((Icon, i) => (
          <button
            key={i}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all duration-200"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  )
}
