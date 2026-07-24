import { Resend } from 'resend'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { resourceDeliveryEmail, resourceLeadNotification } from '../../server/templates/resourceEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const RESOURCES = {
  'website-audit-checklist': {
    title: 'Website Audit Checklist',
    subtitle: '47-Point Checklist',
    category: 'Web Development',
    description: 'The exact checklist we run on every new client website before we touch a line of code. Covers performance, SEO, UX, conversion rate, and mobile — with actionable fixes for every point.',
    highlights: [
      'Core Web Vitals benchmarks and targets',
      'On-page SEO quick-audit framework',
      'Mobile UX checklist with common failure points',
      'CTA placement and copy review rubric',
      'Analytics and tracking setup verification',
    ],
    file: 'website-audit-checklist.pdf',
  },
  'social-media-content-calendar': {
    title: 'Social Media Content Calendar',
    subtitle: '90-Day Template',
    category: 'Social Media',
    description: 'The content calendar template our social team uses for every new client engagement. Pre-built with content pillars, posting frequency recommendations, and caption frameworks.',
    highlights: [
      '90-day rolling calendar with content pillar tags',
      'Instagram, TikTok, and LinkedIn posting schedules',
      'Content type mix recommendations by platform',
      'Caption frameworks for education, proof, and culture posts',
      'KPI tracking tab (reach, engagement, follower growth)',
    ],
    file: 'social-media-content-calendar.pdf',
  },
  'brand-identity-questionnaire': {
    title: 'Brand Identity Questionnaire',
    subtitle: 'Discovery Brief Template',
    category: 'Branding',
    description: 'The exact questionnaire we send to every brand identity client before we open Figma. 28 questions that surface everything a designer needs to build a visual identity that fits the business.',
    highlights: [
      'Brand personality and archetype mapping',
      'Competitor visual audit framework',
      'Target audience persona questions',
      'Visual preference and anti-preference documentation',
      'Tone of voice and communication style guide',
    ],
    file: 'brand-identity-questionnaire.pdf',
  },
  'seo-keyword-research-guide': {
    title: 'SEO Keyword Research Guide',
    subtitle: 'Step-by-Step Playbook',
    category: 'SEO & PPC',
    description: 'A practical, jargon-free guide to finding the keywords that will actually drive revenue — not just traffic. Includes our three-stage research framework and a prioritisation scoring system.',
    highlights: [
      'Three-stage keyword research framework',
      'Commercial intent vs. informational intent explanation',
      'Free tool stack for keyword discovery (no paid tools required)',
      'Keyword prioritisation scoring matrix',
      'On-page optimisation checklist per target keyword',
    ],
    file: 'seo-keyword-research-guide.pdf',
  },
  'video-production-brief-template': {
    title: 'Video Production Brief Template',
    subtitle: 'Pre-Production Template',
    category: 'Media Production',
    description: 'The brief template our production team uses to align with clients before a single frame is shot. Covers every decision that needs to be made before production day.',
    highlights: [
      'Video objective and platform specifications',
      'Hook strategy and viewer journey mapping',
      'Shot list and location/talent checklist',
      'Tone, music, and visual reference section',
      'Revision and approval process definition',
    ],
    file: 'video-production-brief-template.pdf',
  },
  'digital-marketing-roi-calculator': {
    title: 'Digital Marketing ROI Calculator',
    subtitle: 'Interactive Worksheet',
    category: 'Strategy',
    description: 'Model the projected return from social media, SEO, PPC, and web investment before you spend a cent. Used by 700+ founders during agency evaluations.',
    highlights: [
      'Social media ROI modelling by platform',
      'SEO traffic and revenue projection calculator',
      'PPC break-even and ROAS calculator',
      'Website conversion rate impact estimator',
      'Blended channel ROI summary dashboard',
    ],
    file: 'digital-marketing-roi-calculator.pdf',
  },
  'website-design-brief-template': {
    title: 'Website Design Brief Template',
    subtitle: 'Client Discovery Template',
    category: 'Web Development',
    description: '32 questions that capture everything a developer and designer needs before a pixel is designed.',
    highlights: ['Project scope and goals', 'Audience and competitor reference', 'Functional requirements and tech stack', 'Design preference and brand asset inventory', 'Timeline, budget, and sign-off section'],
    file: 'website-design-brief-template.pdf',
  },
  'pre-launch-website-checklist': {
    title: 'Pre-Launch Website Checklist',
    subtitle: '55-Point Go-Live Guide',
    category: 'Web Development',
    description: '55 checks across performance, security, SEO, forms, redirects, and analytics — nothing gets missed.',
    highlights: ['DNS, SSL, and hosting checks', 'Forms, CTAs, and tracking verified', 'Redirect map and 404 resolution', 'Cross-browser and mobile testing', 'GA4, Search Console, and sitemap submission'],
    file: 'pre-launch-website-checklist.pdf',
  },
  'instagram-reels-script-templates': {
    title: 'Instagram Reels Script Templates',
    subtitle: '12 Plug-and-Play Scripts',
    category: 'Social Media',
    description: '12 proven Reels script templates — one for each content type that consistently performs.',
    highlights: ['12 complete script templates', 'Hook library with 40+ tested opening lines', 'Content type breakdown: educational, proof, culture, offer', 'Platform-specific timing guidance', 'Engagement trigger phrases'],
    file: 'instagram-reels-script-templates.pdf',
  },
  'linkedin-b2b-outreach-playbook': {
    title: 'LinkedIn B2B Outreach Playbook',
    subtitle: '5-Step Connection Framework',
    category: 'Social Media',
    description: 'The exact LinkedIn outreach process to book discovery calls without paid ads.',
    highlights: ['Profile optimisation checklist', '5-step connection-to-call framework', '10 connection request templates', '3-touch follow-up sequence', 'Objection handling scripts'],
    file: 'linkedin-b2b-outreach-playbook.pdf',
  },
  'brand-voice-tone-workbook': {
    title: 'Brand Voice & Tone Workbook',
    subtitle: 'Communication Style Guide',
    category: 'Branding',
    description: 'Define exactly how your brand speaks — across every platform, format, and audience.',
    highlights: ['Voice attribute definition with examples', 'Tone modulation by context', 'Vocabulary: approved and banned words', 'Platform-specific tone adaptations', 'Copy review rubric'],
    file: 'brand-voice-tone-workbook.pdf',
  },
  'competitor-visual-audit-template': {
    title: 'Competitor Visual Audit Template',
    subtitle: 'Brand Positioning Framework',
    category: 'Branding',
    description: 'Map every competitor\'s visual identity to find exactly where to differentiate.',
    highlights: ['Competitor brand audit grid (6 brands)', 'Colour palette and typography analysis', 'Tone of voice comparison matrix', 'Gap analysis for differentiation', 'Positioning statement builder'],
    file: 'competitor-visual-audit-template.pdf',
  },
  'google-ads-starter-checklist': {
    title: 'Google Ads Starter Checklist',
    subtitle: 'Campaign Setup Guide',
    category: 'SEO & PPC',
    description: 'Everything you need to launch a Google Ads campaign that doesn\'t haemorrhage budget.',
    highlights: ['Account and campaign structure best practices', 'Keyword match type decision guide', 'Negative keyword seed list (250+ terms)', 'Ad copy Quality Score optimisation tips', 'Conversion tracking setup checklist'],
    file: 'google-ads-starter-checklist.pdf',
  },
  'local-seo-domination-guide': {
    title: 'Local SEO Domination Guide',
    subtitle: 'Rank #1 in Your City',
    category: 'SEO & PPC',
    description: 'Step-by-step process for ranking at the top of Google Maps and local search results.',
    highlights: ['Google Business Profile optimisation walkthrough', 'Local citation audit and top-50 directory list', 'Review generation playbook', 'Local schema markup guide', 'Hyper-local content strategy'],
    file: 'local-seo-domination-guide.pdf',
  },
  'youtube-channel-growth-guide': {
    title: 'YouTube Channel Growth Guide',
    subtitle: '0 to 1,000 Subscribers Playbook',
    category: 'Media Production',
    description: 'Framework for growing a YouTube channel from scratch — without posting daily or paid ads.',
    highlights: ['Niche validation and content pillar selection', 'YouTube SEO: title, description, tag strategy', 'Thumbnail design principles', 'Audience retention hook structure', 'Community and Shorts growth strategy'],
    file: 'youtube-channel-growth-guide.pdf',
  },
  'photography-creative-brief': {
    title: 'Photography Creative Brief',
    subtitle: 'Brand Shoot Planning Template',
    category: 'Media Production',
    description: 'Plan every brand or product photo shoot before booking a photographer.',
    highlights: ['Shot list builder with priority tags', 'Mood board and visual reference guide', 'Wardrobe, props, and location checklist', 'Talent direction notes', 'Deliverable specs and licensing'],
    file: 'photography-creative-brief.pdf',
  },
  'customer-persona-workbook': {
    title: 'Customer Persona Workbook',
    subtitle: 'Ideal Client Profile Builder',
    category: 'Strategy',
    description: 'Build the most accurate picture of your ideal client using real data — not assumptions.',
    highlights: ['Primary and secondary persona framework', 'Demographic and psychographic profiling', 'Buying trigger and pain point excavation', 'Objection mapping', 'Messaging alignment by persona'],
    file: 'customer-persona-workbook.pdf',
  },
  'marketing-budget-planner': {
    title: 'Marketing Budget Planner',
    subtitle: 'Annual Spend Allocation Template',
    category: 'Strategy',
    description: 'Plan your entire marketing spend across channels, quarters, and campaigns.',
    highlights: ['Annual budget allocation with industry benchmarks', 'Quarter-by-quarter campaign planning', 'Cost-per-lead and ROAS targets by channel', 'Monthly budget vs. actual tracker', 'Scaling trigger guidelines'],
    file: 'marketing-budget-planner.pdf',
  },
  'email-marketing-playbook': {
    title: 'Email Marketing Playbook',
    subtitle: 'List Growth & Campaign Guide',
    category: 'Strategy',
    description: 'Build a list that converts — from opt-in strategy and welcome sequences to broadcast campaigns.',
    highlights: ['Lead magnet and opt-in page formula', '5-email welcome sequence frameworks', 'Subject line formula bank (60+ templates)', 'Broadcast campaign cadence', 'List hygiene and deliverability checklist'],
    file: 'email-marketing-playbook.pdf',
  },
  'social-media-caption-prompts': {
    title: 'Social Media Caption Prompt Pack',
    subtitle: '150+ Ready-to-Use Prompts',
    category: 'AI Prompts',
    highlights: ['150+ prompts across platforms', 'Hook, body, and CTA prompts', 'Niche variations included'],
    file: 'social-media-caption-prompts.pdf',
  },
  'seo-content-prompts': {
    title: 'SEO Blog Writing Prompt Pack',
    subtitle: 'End-to-End Content Creation',
    category: 'AI Prompts',
    highlights: ['Keyword and topic prompts', 'SEO outline prompts', 'Meta copy prompts'],
    file: 'seo-content-prompts.pdf',
  },
  'ad-copy-prompts': {
    title: 'Ad Copy Prompt Pack',
    subtitle: 'Facebook, Google & LinkedIn Ads',
    category: 'AI Prompts',
    highlights: ['Facebook, Google, LinkedIn prompts', 'A/B variation generator', 'Offer framing prompts'],
    file: 'ad-copy-prompts.pdf',
  },
  'email-campaign-prompts': {
    title: 'Email Campaign Prompt Pack',
    subtitle: 'Sequences, Campaigns & Subject Lines',
    category: 'AI Prompts',
    highlights: ['Welcome sequence prompts', '60+ subject line prompts', 'Cold outreach prompts'],
    file: 'email-campaign-prompts.pdf',
  },
  'brand-strategy-prompts': {
    title: 'Brand Strategy Prompt Pack',
    subtitle: 'Voice, Positioning & Messaging',
    category: 'AI Prompts',
    highlights: ['Brand archetype prompts', 'Positioning statement prompts', 'Messaging hierarchy prompts'],
    file: 'brand-strategy-prompts.pdf',
  },
  'content-repurposing-prompts': {
    title: 'Content Repurposing Prompt Pack',
    subtitle: 'One Piece → 10 Formats',
    category: 'AI Prompts',
    highlights: ['Blog to social formats', 'Video to written content', 'Case study repurposing'],
    file: 'content-repurposing-prompts.pdf',
  },
  'client-onboarding-checklist': {
    title: 'Client Onboarding Checklist',
    subtitle: 'First 30 Days Framework',
    category: 'Strategy',
    highlights: ['Day 1 access and asset checklist', 'Kick-off agenda', '30-day deliverable timeline'],
    file: 'client-onboarding-checklist.pdf',
  },
  'ab-testing-framework': {
    title: 'A/B Testing Framework',
    subtitle: 'Test, Measure & Scale',
    category: 'Strategy',
    highlights: ['Test hypothesis framework', 'Statistical significance guide', 'Scaling decision rules'],
    file: 'ab-testing-framework.pdf',
  },
  '90-day-marketing-plan-template': {
    title: '90-Day Marketing Plan Template',
    subtitle: 'Quarterly Growth Blueprint',
    category: 'Strategy',
    description: 'Map out a full quarter of marketing activity — goals, channels, KPIs, and weekly actions.',
    highlights: ['OKR goal-setting framework', 'Channel-by-channel 90-day plan', 'Weekly action checklist', 'KPI dashboard and reporting template', 'End-of-quarter review framework'],
    file: '90-day-marketing-plan-template.pdf',
  },
  'ga4-event-tracking-checklist': {
    title: 'GA4 Event Tracking Checklist',
    subtitle: 'Conversion Setup Guide',
    category: 'SEO & PPC',
    description: 'The GA4 setup checklist our analytics team runs on every client account — the 5 essential conversion events, DebugView verification, and GTM configurations most installs miss.',
    highlights: ['The 5 essential conversion events', 'Form, phone, and booking tracking setup', 'Scroll depth and outbound link events', 'DebugView verification walkthrough', 'Google Ads conversion import checklist'],
    file: 'ga4-event-tracking-checklist.pdf',
  },
  'agency-vetting-scorecard': {
    title: 'Agency Vetting Scorecard',
    subtitle: '25-Question Evaluation Tool',
    category: 'Strategy',
    description: 'A structured scorecard for evaluating any digital agency before you sign — weighted questions, red-flag triggers, and a side-by-side comparison sheet.',
    highlights: ['25 weighted evaluation questions', 'Red-flag triggers to walk away', 'Reference verification framework', 'Contract and exit clause checklist', 'Side-by-side agency comparison sheet'],
    file: 'agency-vetting-scorecard.pdf',
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TEAM_EMAIL = 'squadtech2022@gmail.com'
const FROM_EMAIL = 'Squad Tech Solution <noreply@squadtechsol.com>'

// On Vercel, only /tmp is writable at runtime
const LEADS_PATH = process.env.VERCEL
  ? '/tmp/resource-leads.json'
  : join(process.cwd(), 'data', 'resource-leads.json')

function saveLead(lead) {
  try {
    let leads = []
    if (existsSync(LEADS_PATH)) {
      leads = JSON.parse(readFileSync(LEADS_PATH, 'utf8'))
    }
    leads.unshift(lead)
    writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2))
  } catch {
    // non-fatal
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, slug } = req.body || {}

    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Valid email address required' })
    }

    const resource = RESOURCES[slug]
    if (!resource) {
      return res.status(400).json({ error: 'Unknown resource' })
    }

    const proto = req.headers['x-forwarded-proto'] || 'https'
    const baseUrl = `${proto}://${req.headers.host}`
    const downloadUrl = `${baseUrl}/downloads/${resource.file}`
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'

    // Send delivery email to user
    const deliveryResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Your free resource: ${resource.title}`,
      html: resourceDeliveryEmail({ email, resource, downloadUrl }),
    })

    if (deliveryResult.error) {
      console.error('Resend delivery error:', deliveryResult.error)
      return res.status(500).json({ error: 'Failed to send email. Please try again.' })
    }

    // Save lead (non-blocking)
    saveLead({ email, slug, title: resource.title, timestamp, emailId: deliveryResult.data?.id })

    // Team notification — fire-and-forget
    resend.emails.send({
      from: FROM_EMAIL,
      replyTo: email,
      to: [TEAM_EMAIL],
      subject: `New lead: ${resource.title} download`,
      html: resourceLeadNotification({ email, resourceTitle: resource.title, slug, timestamp }),
    }).catch(err => console.error('Team notification failed:', err))

    return res.status(200).json({ success: true, message: 'Resource sent to your inbox!' })

  } catch (err) {
    console.error('Resources handler error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
