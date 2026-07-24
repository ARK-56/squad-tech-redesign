import PDFDocument from 'pdfkit'
import { createWriteStream } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '../public/downloads')

const BRAND_RED    = '#e73103'
const BRAND_ORANGE = '#f58e1e'
const DARK         = '#0a0a0a'
const GRAY         = '#666666'
const LIGHT_GRAY   = '#f4f4f4'

function header(doc, title, subtitle, category) {
  // Background bar
  doc.rect(0, 0, doc.page.width, 120).fill(BRAND_RED)
  doc.rect(0, 0, doc.page.width, 4).fill(BRAND_ORANGE)

  // Category pill
  doc.fontSize(9).fillColor('rgba(255,255,255,0.7)').font('Helvetica-Bold')
    .text(category.toUpperCase(), 40, 28, { characterSpacing: 2 })

  // Title
  doc.fontSize(22).fillColor('#ffffff').font('Helvetica-Bold')
    .text(title, 40, 48, { width: doc.page.width - 80 })

  // Subtitle
  doc.fontSize(11).fillColor('rgba(255,255,255,0.75)').font('Helvetica')
    .text(subtitle, 40, 82, { width: doc.page.width - 80 })

  doc.y = 140
}

function sectionTitle(doc, text) {
  doc.moveDown(0.8)
  doc.fontSize(13).fillColor(BRAND_RED).font('Helvetica-Bold').text(text)
  doc.moveDown(0.2)
  doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - 40, doc.y).strokeColor('#e8e8e8').lineWidth(1).stroke()
  doc.moveDown(0.4)
}

function bodyText(doc, text) {
  doc.fontSize(10).fillColor('#333333').font('Helvetica').text(text, { lineGap: 3 })
  doc.moveDown(0.3)
}

function checkItem(doc, text, sub = null) {
  const x = doc.x
  doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text('☐', x, doc.y, { continued: true, width: 18 })
  doc.fillColor('#1a1a1a').font('Helvetica').text(' ' + text, { width: doc.page.width - x - 60 })
  if (sub) {
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('   ' + sub, { lineGap: 2 })
  }
  doc.moveDown(0.2)
}

function numberedItem(doc, n, title, desc) {
  doc.moveDown(0.3)
  doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(`${n}.  `, { continued: true, width: 20 })
  doc.fillColor('#1a1a1a').font('Helvetica-Bold').text(title)
  if (desc) {
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('     ' + desc, { lineGap: 3 })
  }
}

function bulletItem(doc, text) {
  const x = doc.x
  doc.fontSize(10).fillColor(BRAND_ORANGE).font('Helvetica-Bold').text('→', x, doc.y, { continued: true, width: 16 })
  doc.fillColor('#1a1a1a').font('Helvetica').text(' ' + text, { width: doc.page.width - x - 60, lineGap: 3 })
  doc.moveDown(0.2)
}

function questionItem(doc, n, question, hint = null) {
  doc.moveDown(0.4)
  doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(`Q${n}.  `, { continued: true })
  doc.fillColor('#1a1a1a').font('Helvetica-Bold').text(question)
  if (hint) {
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('      ' + hint, { lineGap: 2 })
  }
  // Answer line
  doc.moveDown(0.5)
  doc.moveTo(60, doc.y).lineTo(doc.page.width - 40, doc.y).strokeColor('#e0e0e0').lineWidth(0.5).stroke()
  doc.moveDown(0.1)
  doc.moveTo(60, doc.y).lineTo(doc.page.width - 40, doc.y).stroke()
}

function footer(doc, pageNum) {
  const y = doc.page.height - 40
  doc.fontSize(8).fillColor('#aaaaaa').font('Helvetica')
    .text('© Squad Tech Solution  ·  squadtechsol.com  ·  inquiry@squadtechsol.com', 40, y, { align: 'left', width: doc.page.width - 120 })
    .text(`${pageNum}`, doc.page.width - 80, y, { align: 'right', width: 40 })
}

function newPage(doc, pageNum) {
  doc.addPage()
  footer(doc, pageNum)
}

function promptItem(doc, label, promptText) {
  doc.moveDown(0.5)
  doc.fontSize(9).fillColor(BRAND_ORANGE).font('Helvetica-Bold').text('▸ ' + label)
  doc.moveDown(0.15)
  doc.fontSize(9).fillColor('#444444').font('Helvetica-Oblique')
    .text('"' + promptText + '"', { lineGap: 3, indent: 10 })
  doc.moveDown(0.3)
}

function infoBox(doc, label, value) {
  doc.rect(doc.x - 2, doc.y - 2, doc.page.width - 76, 30).fill('#fef9f6').stroke('#f0d0c0')
  doc.fontSize(9).fillColor(GRAY).font('Helvetica-Bold').text(label + ': ', doc.x + 6, doc.y + 8, { continued: true })
  doc.fillColor(DARK).font('Helvetica').text(value)
  doc.moveDown(0.6)
}

// ─── 1. WEBSITE AUDIT CHECKLIST ───────────────────────────────────────────────
async function generateWebsiteAudit() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'website-audit-checklist.pdf')))
  header(doc, 'Website Audit Checklist', '47-Point Audit — Performance · SEO · UX · Conversion · Analytics', 'Web Development')
  footer(doc, 1)

  bodyText(doc, 'Run this checklist on any website before making improvements. Each item is binary — pass or fail. Tally your score at the end of each section. Anything below 70% in a section needs immediate attention.')

  sectionTitle(doc, 'SECTION 1 — Performance & Core Web Vitals (10 points)')
  checkItem(doc, 'Largest Contentful Paint (LCP) under 2.5 seconds', 'Test at web.dev/measure')
  checkItem(doc, 'First Input Delay (FID) / Interaction to Next Paint under 100ms')
  checkItem(doc, 'Cumulative Layout Shift (CLS) below 0.1')
  checkItem(doc, 'Time to First Byte (TTFB) under 600ms')
  checkItem(doc, 'Mobile PageSpeed score above 70 (Google PageSpeed Insights)')
  checkItem(doc, 'Desktop PageSpeed score above 85')
  checkItem(doc, 'All images compressed and served in WebP or AVIF format')
  checkItem(doc, 'Images have explicit width and height attributes to prevent layout shift')
  checkItem(doc, 'Render-blocking CSS and JavaScript eliminated or deferred')
  checkItem(doc, 'CDN in place for static asset delivery')

  sectionTitle(doc, 'SECTION 2 — On-Page SEO (10 points)')
  checkItem(doc, 'Every page has a unique, descriptive <title> tag (50–60 characters)')
  checkItem(doc, 'Every page has a unique meta description (140–160 characters)')
  checkItem(doc, 'Each page has exactly one H1 containing the primary keyword')
  checkItem(doc, 'Header hierarchy is logical (H1 → H2 → H3, no skipped levels)')
  checkItem(doc, 'All images have descriptive alt text')
  checkItem(doc, 'Internal linking structure connects key pages logically')
  checkItem(doc, 'XML sitemap is present and submitted to Google Search Console')
  checkItem(doc, 'robots.txt is properly configured')
  checkItem(doc, 'Canonical tags are in place on all pages')
  checkItem(doc, 'Schema markup (LocalBusiness, Organization, or Product) implemented')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'SECTION 3 — Mobile UX (9 points)')
  checkItem(doc, 'Viewport meta tag is present and correctly configured')
  checkItem(doc, 'All tap targets are at least 44x44px with adequate spacing')
  checkItem(doc, 'Text is readable without zooming (minimum 16px body font)')
  checkItem(doc, 'No horizontal scroll on any mobile screen size')
  checkItem(doc, 'Forms are mobile-optimised (correct input types, no zoom-on-focus)')
  checkItem(doc, 'Phone number is a clickable tel: link on mobile')
  checkItem(doc, 'Navigation is usable on small screens (hamburger or equivalent)')
  checkItem(doc, 'No interstitials or pop-ups that block mobile content on load')
  checkItem(doc, 'Footer contact information is visible and tappable on mobile')

  sectionTitle(doc, 'SECTION 4 — Conversion & CTA (10 points)')
  checkItem(doc, 'The homepage answers: What do you do? Who for? Why trust you? — within 5 seconds')
  checkItem(doc, 'Primary CTA is specific ("Book a free call") not generic ("Learn more")')
  checkItem(doc, 'Primary CTA is visible above the fold on desktop and mobile')
  checkItem(doc, 'Social proof (testimonials, logos, results) appears above the fold or immediately below')
  checkItem(doc, 'Every page has exactly one primary CTA — no decision paralysis')
  checkItem(doc, 'Contact form has 5 fields or fewer (or uses multi-step with progress indicator)')
  checkItem(doc, 'Trust signals are present near the CTA (reviews, guarantees, certifications)')
  checkItem(doc, 'There is a clear value proposition differentiating you from competitors')
  checkItem(doc, 'Pricing or pricing range is accessible without requiring a call')
  checkItem(doc, 'The "next step" is obvious for visitors at every stage: aware, considering, ready to buy')

  sectionTitle(doc, 'SECTION 5 — Analytics & Tracking (8 points)')
  checkItem(doc, 'Google Analytics 4 is installed and collecting data')
  checkItem(doc, 'GA4 is tracking at least one conversion event (form submit, phone click, booking)')
  checkItem(doc, 'Google Search Console is connected and verified')
  checkItem(doc, 'Google Tag Manager is in place (or equivalent tag management)')
  checkItem(doc, 'A/B testing tool is installed or a plan for CRO testing exists')
  checkItem(doc, 'Heatmap or session recording tool is active (Hotjar, Microsoft Clarity)')
  checkItem(doc, 'UTM parameters are consistently applied to all campaign links')
  checkItem(doc, 'GA4 data-driven attribution model is enabled (not last-click)')

  sectionTitle(doc, 'SCORING GUIDE')
  bulletItem(doc, '43–47 correct: Excellent. Minor improvements only.')
  bulletItem(doc, '35–42 correct: Good. Address failing items by priority.')
  bulletItem(doc, '25–34 correct: Needs work. Significant revenue is being left on the table.')
  bulletItem(doc, 'Below 25: Urgent. A full rebuild or major overhaul is recommended.')

  doc.end()
  console.log('✓ website-audit-checklist.pdf')
}

// ─── 2. SOCIAL MEDIA CONTENT CALENDAR ─────────────────────────────────────────
async function generateSocialCalendar() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'social-media-content-calendar.pdf')))
  header(doc, 'Social Media Content Calendar', '90-Day Planning Template — Instagram · TikTok · LinkedIn', 'Social Media')
  footer(doc, 1)

  bodyText(doc, 'This template covers 90 days of social media content across three platforms. Fill in the content pillars first, then plan weekly themes, and batch-produce content 2 weeks at a time.')

  sectionTitle(doc, 'STEP 1 — DEFINE YOUR CONTENT PILLARS')
  bodyText(doc, 'Every post should belong to one of four content pillars. Define yours before filling the calendar:')
  doc.moveDown(0.3)
  numberedItem(doc, 1, 'Education / Value', 'Teach your audience something useful. Builds authority.')
  numberedItem(doc, 2, 'Social Proof / Results', 'Case studies, testimonials, before-and-after. Builds trust.')
  numberedItem(doc, 3, 'Culture / Behind the Scenes', 'Your team, process, and story. Builds connection.')
  numberedItem(doc, 4, 'Direct Offer / CTA', 'Clear call to action. Drives enquiries.')
  doc.moveDown(0.5)
  bodyText(doc, 'Recommended mix: 40% Education / 30% Social Proof / 20% Culture / 10% Direct Offer')

  sectionTitle(doc, 'STEP 2 — PLATFORM POSTING FREQUENCY')
  const platforms = [
    ['Instagram Reels', '4–5x per week', 'Hook in first 2 seconds. Captions matter.'],
    ['Instagram Feed/Carousel', '3x per week', 'Save-worthy content. Infographics, tips, before/after.'],
    ['Instagram Stories', 'Daily', 'Polls, Q&A, behind scenes. Drives DM conversations.'],
    ['TikTok', '5–7x per week', 'Novelty and hooks. Repurpose winning Reels.'],
    ['LinkedIn', '3–4x per week', 'Personal founder posts outperform company page 10x.'],
  ]
  platforms.forEach(([p, freq, tip]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(p, { continued: true })
    doc.fillColor(BRAND_RED).text(`  ${freq}`)
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text(tip, { lineGap: 2 })
  })

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'STEP 3 — 90-DAY WEEKLY THEME STRUCTURE')
  const themes = [
    ['Weeks 1–2', 'Brand Introduction', 'Who you are, who you serve, your USP'],
    ['Weeks 3–4', 'Education Sprint', '4 deep-value educational posts per platform'],
    ['Weeks 5–6', 'Social Proof Block', 'Case studies, client results, testimonials'],
    ['Weeks 7–8', 'Problem/Solution', 'Address top 3 pain points your audience has'],
    ['Weeks 9–10', 'Culture & Team', 'Behind the scenes, process, team moments'],
    ['Weeks 11–12', 'Conversion Push', 'Offer, CTA, urgency, lead magnet promotion'],
    ['Week 13', 'Review & Plan', 'Analyse top posts. Double down on what worked.'],
  ]
  themes.forEach(([w, title, desc]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(w + ': ', { continued: true })
    doc.fillColor(DARK).font('Helvetica-Bold').text(title)
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text(desc, { lineGap: 2 })
  })

  sectionTitle(doc, 'STEP 4 — CAPTION FRAMEWORK (USE FOR EVERY POST)')
  numberedItem(doc, 1, 'Hook (line 1)', 'Stop the scroll. Bold claim, question, or surprising fact.')
  numberedItem(doc, 2, 'Context (lines 2–3)', 'Why this matters to the reader right now.')
  numberedItem(doc, 3, 'Value (lines 4–8)', 'The actual content — tips, story, insight.')
  numberedItem(doc, 4, 'Call to Action (last line)', 'One specific action: save, comment, DM, or click link.')
  doc.moveDown(0.5)
  bodyText(doc, 'Caption length: Instagram 150–300 words. LinkedIn 200–400 words. TikTok 1–2 lines only.')

  sectionTitle(doc, 'STEP 5 — MONTHLY KPI TRACKER')
  const kpis = ['Follower growth (net new per month)', 'Reach (unique accounts reached)', 'Engagement rate (interactions ÷ reach)', 'Profile visits', 'Link in bio clicks', 'DMs received', 'Leads attributed to social']
  kpis.forEach(k => checkItem(doc, k))

  doc.end()
  console.log('✓ social-media-content-calendar.pdf')
}

// ─── 3. BRAND IDENTITY QUESTIONNAIRE ─────────────────────────────────────────
async function generateBrandQuestionnaire() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'brand-identity-questionnaire.pdf')))
  header(doc, 'Brand Identity Questionnaire', '28-Question Discovery Brief — Complete Before Any Design Work Begins', 'Branding')
  footer(doc, 1)

  bodyText(doc, 'Complete this questionnaire before engaging any designer or agency. The more specific your answers, the better the design output will be. There are no right or wrong answers — only honest and vague ones.')

  sectionTitle(doc, 'PART 1 — YOUR BUSINESS (Questions 1–7)')
  questionItem(doc, 1, 'What does your business do, and who is it for? (One sentence.)')
  questionItem(doc, 2, 'What problem do you solve, and how do you solve it differently from competitors?')
  questionItem(doc, 3, 'How long have you been operating, and what stage is the business at?', 'Pre-revenue / Early / Growth / Scale')
  questionItem(doc, 4, 'What is your primary revenue model?', 'Retainer / Project / Product / Subscription / Other')
  questionItem(doc, 5, 'What is the single most important thing you want a new customer to believe about your brand?')
  questionItem(doc, 6, 'What do your best clients say about working with you?')
  questionItem(doc, 7, 'What is the one thing you never want someone to say about your brand?')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'PART 2 — YOUR AUDIENCE (Questions 8–13)')
  questionItem(doc, 8, 'Describe your ideal client in detail.', 'Industry, company size, role/title, geography, annual revenue')
  questionItem(doc, 9, 'What does your ideal client care about most when choosing a provider like you?')
  questionItem(doc, 10, 'What is the biggest fear or hesitation your client has before buying?')
  questionItem(doc, 11, 'Where does your ideal client discover brands like yours?', 'Instagram / LinkedIn / Google / Referral / Events / Other')
  questionItem(doc, 12, 'What brands does your ideal client admire (inside or outside your industry)?')
  questionItem(doc, 13, 'Describe the tone your ideal client responds to.', 'e.g. professional, bold, warm, irreverent, expert, approachable')

  newPage(doc, 3)
  doc.y = 50

  sectionTitle(doc, 'PART 3 — VISUAL PREFERENCES (Questions 14–21)')
  questionItem(doc, 14, 'List 3–5 brands whose visual identity you admire and explain WHY for each.')
  questionItem(doc, 15, 'List 3 visual styles you actively do NOT want. Be specific.')
  questionItem(doc, 16, 'What colours feel right for your brand? What colours feel wrong?', 'If none, describe moods or emotions the palette should evoke')
  questionItem(doc, 17, 'Does your brand feel more: Classic or Modern? Bold or Subtle? Playful or Serious?')
  questionItem(doc, 18, 'Should the logo use a symbol, a wordmark (text only), or both?')
  questionItem(doc, 19, 'What photography style fits the brand?', 'Candid / Studio / Lifestyle / Abstract / Dark / Bright / None')
  questionItem(doc, 20, 'What should the brand feel like in 5 adjectives?')
  questionItem(doc, 21, 'What should the brand never feel like? (5 adjectives to avoid)')

  newPage(doc, 4)
  doc.y = 50

  sectionTitle(doc, 'PART 4 — COMPETITORS & POSITIONING (Questions 22–28)')
  questionItem(doc, 22, 'Who are your 3 closest competitors? Provide their website URLs.')
  questionItem(doc, 23, 'How do you want to be visually differentiated from each competitor?')
  questionItem(doc, 24, 'Where do you currently sit on price relative to the market?', 'Budget / Mid-market / Premium / Luxury')
  questionItem(doc, 25, 'Where do you WANT to be perceived on price, and does that match reality?')
  questionItem(doc, 26, 'What is your brand\'s origin story in 3 sentences?', 'Why it was started, by whom, and why it matters')
  questionItem(doc, 27, 'If your brand were a person, describe their personality, job, and lifestyle.')
  questionItem(doc, 28, 'Is there anything else a designer should know before starting work on your brand?')

  doc.end()
  console.log('✓ brand-identity-questionnaire.pdf')
}

// ─── 4. SEO KEYWORD RESEARCH GUIDE ───────────────────────────────────────────
async function generateSEOGuide() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'seo-keyword-research-guide.pdf')))
  header(doc, 'SEO Keyword Research Guide', 'Three-Stage Framework for Finding Keywords That Drive Revenue, Not Just Traffic', 'SEO & PPC')
  footer(doc, 1)

  bodyText(doc, 'Most keyword research goes wrong at stage one: people chase volume instead of commercial intent. This guide walks you through a three-stage process to find the keywords that actually convert — using free tools only.')

  sectionTitle(doc, 'BEFORE YOU START — KEY CONCEPTS')
  numberedItem(doc, 1, 'Commercial Intent', 'The keyword signals the searcher wants to BUY, not just learn. "Best social media agency Dubai" is commercial. "What is social media" is not.')
  doc.moveDown(0.3)
  numberedItem(doc, 2, 'Search Volume', 'How many times the keyword is searched per month. High volume is useless without intent. A 100-search/month keyword with high intent beats a 10,000/month keyword with none.')
  doc.moveDown(0.3)
  numberedItem(doc, 3, 'Keyword Difficulty (KD)', 'How hard it is to rank. New sites should target KD below 30. Established sites can target up to 60.')

  sectionTitle(doc, 'STAGE 1 — SEED KEYWORD DISCOVERY')
  bodyText(doc, 'Goal: Build a raw list of 30–50 seed keywords. These are broad terms describing what you do, where you do it, and for whom.')
  doc.moveDown(0.3)
  bulletItem(doc, 'Start with your service names: "social media marketing agency", "brand identity designer", "web developer Dubai"')
  bulletItem(doc, 'Add location modifiers: "[service] + [city]", "[service] + [country]", "[service] near me"')
  bulletItem(doc, 'Add qualifier modifiers: "best", "top", "affordable", "professional", "for [industry]"')
  bulletItem(doc, 'Check "People also ask" on Google for each seed keyword — these are gold')
  bulletItem(doc, 'Check autocomplete suggestions in Google Search (what Google suggests as you type)')
  doc.moveDown(0.3)
  bodyText(doc, 'Free tools for this stage: Google Search (autocomplete + PAA), Google Trends, Answer the Public (free tier), Keyword Planner (Google Ads, free)')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'STAGE 2 — EXPANSION & CLUSTERING')
  bodyText(doc, 'Goal: Take your seed list into a tool, expand to 200–300 keywords, then cluster into topic groups.')
  doc.moveDown(0.3)
  bulletItem(doc, 'Enter each seed keyword into Google Keyword Planner and export suggestions')
  bulletItem(doc, 'Filter out keywords with fewer than 50 monthly searches')
  bulletItem(doc, 'Filter out keywords with KD above 40 (for a new or mid-authority site)')
  bulletItem(doc, 'Group related keywords into clusters (each cluster = one page on your site)')
  bulletItem(doc, 'Identify the primary keyword per cluster (highest volume + highest intent)')
  bulletItem(doc, 'Secondary keywords in the cluster go in subheadings and body copy')
  doc.moveDown(0.4)
  bodyText(doc, 'Example cluster: "social media agency Dubai" (primary) + "social media management Dubai", "Instagram marketing agency Dubai", "Dubai social media company" (secondary)')

  sectionTitle(doc, 'STAGE 3 — PRIORITISATION SCORING MATRIX')
  bodyText(doc, 'Score each keyword cluster on four dimensions (1–5 each). Total = priority score. Build pages in order of highest score first.')
  doc.moveDown(0.3)
  const matrix = [
    ['Commercial Intent', '1 = purely informational, 5 = high buyer intent ("hire", "pricing", "best")'],
    ['Search Volume', '1 = under 50/mo, 3 = 100–500/mo, 5 = 500+/mo'],
    ['Keyword Difficulty', '5 = very easy (KD 0–15), 3 = moderate (KD 16–30), 1 = hard (KD 31+)'],
    ['Business Relevance', '1 = tangential, 5 = core to your service offering and target client'],
  ]
  matrix.forEach(([dim, guide]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(dim + ': ', { continued: true })
    doc.fillColor(GRAY).font('Helvetica').text(guide)
  })
  doc.moveDown(0.5)
  bodyText(doc, 'Maximum score: 20 points. Target keywords with 14+. Deprioritise anything below 10.')

  sectionTitle(doc, 'ON-PAGE OPTIMISATION CHECKLIST (per target page)')
  checkItem(doc, 'Primary keyword in <title> tag (within first 60 characters)')
  checkItem(doc, 'Primary keyword in meta description (within first 160 characters)')
  checkItem(doc, 'Primary keyword in the H1 (once, naturally)')
  checkItem(doc, 'Secondary keywords in at least 2–3 H2s')
  checkItem(doc, 'Primary keyword in the first 100 words of body copy')
  checkItem(doc, 'Primary keyword in the URL slug (short, hyphens only)')
  checkItem(doc, 'At least 600 words of unique, useful content on the page')
  checkItem(doc, 'Internal links from this page to related pages (and back)')
  checkItem(doc, 'Page is indexed and submitted via Google Search Console')

  doc.end()
  console.log('✓ seo-keyword-research-guide.pdf')
}

// ─── 5. VIDEO PRODUCTION BRIEF ────────────────────────────────────────────────
async function generateVideoBrief() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'video-production-brief-template.pdf')))
  header(doc, 'Video Production Brief Template', 'Complete This Before Any Production Begins — Prevents Costly Reshoots', 'Media Production')
  footer(doc, 1)

  bodyText(doc, 'An unclear brief is the most expensive mistake in video production. This template should be completed by the client and reviewed by the production team before any logistics are finalised. Incomplete briefs result in delayed timelines and reshoots — both avoidable.')

  sectionTitle(doc, 'SECTION 1 — PROJECT OVERVIEW')
  infoBox(doc, 'Project Name', '________________________________________________________________')
  infoBox(doc, 'Brand / Client', '________________________________________________________________')
  infoBox(doc, 'Production Date', '________________________________________________________________')
  infoBox(doc, 'Delivery Deadline', '________________________________________________________________')

  doc.moveDown(0.3)
  questionItem(doc, 1, 'What is the ONE primary objective of this video?', 'Choose only one: Brand Awareness / Lead Generation / Product Demo / Testimonial / Training / Event Coverage')
  questionItem(doc, 2, 'What should the viewer DO after watching?', 'e.g. book a call, visit a landing page, DM us, share with a friend')
  questionItem(doc, 3, 'Who is this video for? Describe the target viewer in one sentence.')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'SECTION 2 — PLATFORM & FORMAT SPECIFICATIONS')
  const formats = [
    ['Primary Platform', 'Instagram Reels / TikTok / YouTube / LinkedIn / Website / Paid Ads'],
    ['Aspect Ratio', '9:16 (vertical) / 16:9 (landscape) / 1:1 (square) / 4:5 (portrait feed)'],
    ['Target Length', '15s / 30s / 60s / 90s / 3 min / 5+ min'],
    ['Sound', 'Sound-on essential / Must work silent (captions required) / Both'],
    ['Caption Style', 'None / Auto / Custom animated captions'],
  ]
  formats.forEach(([label, opts]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(label + ':  ', { continued: true })
    doc.fillColor(GRAY).font('Helvetica').text(opts)
    doc.moveDown(0.3)
    doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - 40, doc.y).strokeColor('#e8e8e8').lineWidth(0.5).stroke()
  })

  sectionTitle(doc, 'SECTION 3 — CREATIVE DIRECTION')
  questionItem(doc, 4, 'Provide 3–5 reference videos that represent the desired style.', 'Include a note on WHAT you like about each one (pacing, colour grade, music, etc.)')
  questionItem(doc, 5, 'What tone should this video have?', 'e.g. high-energy, calm and premium, educational, raw and authentic, cinematic, conversational')
  questionItem(doc, 6, 'What is the opening hook? (First 3 seconds)', 'What visual or line of dialogue opens the video?')
  questionItem(doc, 7, 'Are there any styles, looks, or approaches you do NOT want?')

  newPage(doc, 3)
  doc.y = 50

  sectionTitle(doc, 'SECTION 4 — PRODUCTION LOGISTICS')
  questionItem(doc, 8, 'Location(s) for filming', 'Address or description. Note any access restrictions or permit requirements.')
  questionItem(doc, 9, 'Talent required', 'Founder on camera / Paid talent / Voice only / No on-camera talent')
  questionItem(doc, 10, 'Props, products, or equipment that must appear on screen')
  questionItem(doc, 11, 'Key shots or scenes that must be captured', 'List any non-negotiable shots')
  questionItem(doc, 12, 'Music preference', 'Fast / Slow / No music / Specific artist or genre / Client to supply')
  questionItem(doc, 13, 'Brand assets to include', 'Logo, colour palette, fonts, jingle — provide files or Google Drive link')

  sectionTitle(doc, 'SECTION 5 — REVIEW & APPROVAL PROCESS')
  checkItem(doc, 'Who has final sign-off authority? ____________________________________________')
  checkItem(doc, 'How many rounds of revisions are included? ___________________________________')
  checkItem(doc, 'What constitutes a "revision" vs a "new version"? ___________________________')
  checkItem(doc, 'Turnaround time for client feedback on each round: __________________________')
  checkItem(doc, 'Preferred file delivery format: ____________________________________________')
  checkItem(doc, 'Will subtitles/captions be delivered as a separate file (SRT)?  Yes / No')

  doc.end()
  console.log('✓ video-production-brief-template.pdf')
}

// ─── 6. DIGITAL MARKETING ROI CALCULATOR ──────────────────────────────────────
async function generateROICalculator() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'digital-marketing-roi-calculator.pdf')))
  header(doc, 'Digital Marketing ROI Calculator', 'Model Projected Returns Before You Commit a Single Dollar', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'Use this worksheet to model the expected return from each marketing channel before investing. Fill in the grey fields with your own numbers. The formulas show you exactly how to calculate projected ROI for each channel.')

  sectionTitle(doc, 'YOUR BASELINE NUMBERS (Fill these in first — used across all calculators)')
  infoBox(doc, 'Average Sale Value (£/$/AED)', '___________________________')
  infoBox(doc, 'Lead-to-Client Conversion Rate (%)', '___________________________')
  infoBox(doc, 'Current Monthly Website Visitors', '___________________________')
  infoBox(doc, 'Current Website Conversion Rate (%)', '___________________________')

  sectionTitle(doc, 'CALCULATOR 1 — SOCIAL MEDIA ADVERTISING ROI')
  bodyText(doc, 'Variables to fill in:')
  infoBox(doc, 'Monthly Ad Spend (£)', '___________________________')
  infoBox(doc, 'Estimated CPM (cost per 1,000 impressions)', 'Avg: £8–£15 for Meta')
  infoBox(doc, 'Expected Click-Through Rate (%)', 'Avg: 0.9%–2.5% for Meta')
  infoBox(doc, 'Landing Page Conversion Rate (%)', '___________________________')
  doc.moveDown(0.3)
  bodyText(doc, 'Formulas:')
  bulletItem(doc, 'Impressions = (Monthly Spend ÷ CPM) × 1,000')
  bulletItem(doc, 'Clicks = Impressions × CTR')
  bulletItem(doc, 'Leads = Clicks × Landing Page Conversion Rate')
  bulletItem(doc, 'New Clients = Leads × Lead-to-Client Conversion Rate')
  bulletItem(doc, 'Revenue = New Clients × Average Sale Value')
  bulletItem(doc, 'ROI = (Revenue − Spend) ÷ Spend × 100  →  Result: _____ %')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'CALCULATOR 2 — SEO REVENUE PROJECTION (12-Month View)')
  bodyText(doc, 'SEO is a compounding investment. Model it over 12 months, not month-to-month.')
  infoBox(doc, 'Target keywords (combined monthly search volume)', '___________________________')
  infoBox(doc, 'Realistic ranking position to achieve', 'Position 1–3 gets ~30% CTR. Position 4–10 gets ~10%')
  infoBox(doc, 'Expected CTR at target position (%)', '___________________________')
  doc.moveDown(0.3)
  bodyText(doc, 'Formulas:')
  bulletItem(doc, 'Monthly Visits from SEO = Search Volume × CTR')
  bulletItem(doc, 'Monthly Leads = SEO Visits × Website Conversion Rate')
  bulletItem(doc, 'Monthly New Clients = Leads × Lead-to-Client Conversion Rate')
  bulletItem(doc, 'Monthly Revenue = New Clients × Average Sale Value')
  bulletItem(doc, '12-Month Revenue = Monthly Revenue × 9  (assumes 3-month ramp-up period)')
  bulletItem(doc, 'ROI = (12-Month Revenue − SEO Investment) ÷ SEO Investment × 100  →  _____ %')

  sectionTitle(doc, 'CALCULATOR 3 — PPC BREAK-EVEN & ROAS')
  infoBox(doc, 'Monthly PPC Budget (£)', '___________________________')
  infoBox(doc, 'Average Cost Per Click (CPC)', 'Check Google Keyword Planner')
  infoBox(doc, 'Landing Page Conversion Rate (%)', '___________________________')
  doc.moveDown(0.3)
  bodyText(doc, 'Formulas:')
  bulletItem(doc, 'Monthly Clicks = Budget ÷ CPC')
  bulletItem(doc, 'Monthly Leads = Clicks × Conversion Rate')
  bulletItem(doc, 'Cost Per Lead = Budget ÷ Monthly Leads')
  bulletItem(doc, 'Break-Even CPL = Average Sale Value × Lead-to-Client Rate')
  bulletItem(doc, 'If Cost Per Lead < Break-Even CPL → Campaign is profitable')
  bulletItem(doc, 'ROAS = Revenue ÷ Ad Spend  (target: 3x+ for most industries)')

  sectionTitle(doc, 'CALCULATOR 4 — WEBSITE CRO IMPACT')
  bodyText(doc, 'Even a 1% increase in conversion rate can be transformative. Model it here:')
  infoBox(doc, 'Current Monthly Visitors', '___________________________')
  infoBox(doc, 'Current Conversion Rate (%)', '___________________________')
  infoBox(doc, 'Target Conversion Rate After CRO (%)', 'Typical uplift: 0.5%–2%')
  doc.moveDown(0.3)
  bulletItem(doc, 'Current Monthly Leads = Visitors × Current Conversion Rate')
  bulletItem(doc, 'New Monthly Leads = Visitors × New Conversion Rate')
  bulletItem(doc, 'Additional Leads per Month = New − Current')
  bulletItem(doc, 'Additional Revenue per Month = Extra Leads × Lead-to-Client Rate × Sale Value')
  bulletItem(doc, 'Annual Uplift from CRO = Additional Revenue × 12  →  £ _______________')

  doc.end()
  console.log('✓ digital-marketing-roi-calculator.pdf')
}

// ─── 7. WEBSITE DESIGN BRIEF TEMPLATE ────────────────────────────────────────
async function generateWebsiteDesignBrief() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'website-design-brief-template.pdf')))
  header(doc, 'Website Design Brief Template', '32 Questions to Capture Before a Pixel Is Designed', 'Web Development')
  footer(doc, 1)

  bodyText(doc, 'Complete this brief before engaging any web designer or developer. Incomplete briefs are the single biggest cause of redesigns, scope creep, and missed deadlines. The more specific your answers, the better the output.')

  sectionTitle(doc, 'SECTION 1 — PROJECT OVERVIEW (Questions 1–6)')
  questionItem(doc, 1, 'What is the primary purpose of this website?', 'Lead generation / E-commerce / Brand awareness / Portfolio / SaaS / Other')
  questionItem(doc, 2, 'What is the single most important action you want visitors to take?', 'e.g. Book a call, buy a product, submit a form, download a resource')
  questionItem(doc, 3, 'What pages does the site need?', 'List every page: Home, About, Services, Blog, Contact, etc.')
  questionItem(doc, 4, 'What is your launch deadline and why?', 'Note any hard constraints: events, campaigns, investor meetings')
  questionItem(doc, 5, 'What is your approximate budget range for this project?')
  questionItem(doc, 6, 'Who is the primary decision-maker and who else has approval authority?')

  newPage(doc, 2)
  doc.y = 50
  sectionTitle(doc, 'SECTION 2 — AUDIENCE & COMPETITORS (Questions 7–13)')
  questionItem(doc, 7, 'Describe your ideal website visitor in one detailed paragraph.', 'Role, company, location, challenges, what they\'re searching for')
  questionItem(doc, 8, 'What does your ideal visitor need to see within 5 seconds to stay on the page?')
  questionItem(doc, 9, 'List 3–5 competitor websites and what you like/dislike about each.')
  questionItem(doc, 10, 'List 3–5 websites (any industry) you admire and explain WHY for each.')
  questionItem(doc, 11, 'What should visitors think, feel, and do after leaving your site?')
  questionItem(doc, 12, 'What objections or hesitations does your audience have before contacting you?')
  questionItem(doc, 13, 'What proof or credentials do you have that would overcome these objections?')

  newPage(doc, 3)
  doc.y = 50
  sectionTitle(doc, 'SECTION 3 — CONTENT & BRAND (Questions 14–22)')
  questionItem(doc, 14, 'Do you have an existing brand? Provide logo files, brand guidelines, and colour hex codes.')
  questionItem(doc, 15, 'Who is writing the website copy — you, us, or a copywriter?')
  questionItem(doc, 16, 'Do you have existing photography or video to use? If not, what is the plan?')
  questionItem(doc, 17, 'List the key messages you want communicated on each main page.')
  questionItem(doc, 18, 'Are there any legal, compliance, or accessibility requirements for this site?')
  questionItem(doc, 19, 'What tone should the copy take?', 'Professional / Friendly / Bold / Conversational / Technical / Luxury')
  questionItem(doc, 20, 'Do you want a blog or content section? If so, who will manage it?')
  questionItem(doc, 21, 'What testimonials, case studies, or social proof do you have to include?')
  questionItem(doc, 22, 'Are there any brand restrictions — colours, fonts, styles, or imagery to avoid?')

  newPage(doc, 4)
  doc.y = 50
  sectionTitle(doc, 'SECTION 4 — TECHNICAL REQUIREMENTS (Questions 23–32)')
  questionItem(doc, 23, 'What CMS do you want?', 'WordPress / Webflow / Shopify / Framer / Custom / No preference')
  questionItem(doc, 24, 'What third-party tools must be integrated?', 'CRM, booking system, email platform, payment gateway, analytics, etc.')
  questionItem(doc, 25, 'Do you have an existing domain and hosting? Provide login credentials separately.')
  questionItem(doc, 26, 'Do you need e-commerce functionality? If so, how many products?')
  questionItem(doc, 27, 'Is multilingual support required? Which languages?')
  questionItem(doc, 28, 'What analytics and tracking must be in place at launch?')
  questionItem(doc, 29, 'Will you need ongoing maintenance and content updates post-launch?')
  questionItem(doc, 30, 'How many rounds of revisions are included in the agreed scope?')
  questionItem(doc, 31, 'What format should final files be delivered in?')
  questionItem(doc, 32, 'Is there anything else we need to know before starting?')

  doc.end()
  console.log('✓ website-design-brief-template.pdf')
}

// ─── 8. PRE-LAUNCH WEBSITE CHECKLIST ─────────────────────────────────────────
async function generatePreLaunchChecklist() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'pre-launch-website-checklist.pdf')))
  header(doc, 'Pre-Launch Website Checklist', '55-Point Go-Live Verification — Run This Before Every Launch', 'Web Development')
  footer(doc, 1)

  bodyText(doc, 'This checklist must be completed and signed off before any website goes live. Each item is pass/fail. Do not launch with any critical item unchecked. Items marked [BLOCK] are launch blockers.')

  sectionTitle(doc, 'SECTION 1 — DOMAIN, HOSTING & SSL (8 points)')
  checkItem(doc, '[BLOCK] DNS is fully propagated and pointing to the correct host')
  checkItem(doc, '[BLOCK] SSL certificate is installed and all pages load over HTTPS')
  checkItem(doc, 'HTTP automatically redirects to HTTPS (no mixed content warnings)')
  checkItem(doc, 'www and non-www both resolve to the same URL (one redirects to the other)')
  checkItem(doc, 'Hosting environment matches traffic expectations (not oversold shared hosting)')
  checkItem(doc, 'Backups are configured (daily, offsite)')
  checkItem(doc, 'Server-level caching or CDN is enabled')
  checkItem(doc, 'Admin credentials have been changed from defaults and stored securely')

  sectionTitle(doc, 'SECTION 2 — PERFORMANCE (8 points)')
  checkItem(doc, 'Mobile PageSpeed score above 70 (Google PageSpeed Insights)')
  checkItem(doc, 'Desktop PageSpeed score above 85')
  checkItem(doc, 'All images compressed and served in WebP/AVIF format')
  checkItem(doc, 'Images have explicit width and height attributes set (prevents CLS)')
  checkItem(doc, 'Render-blocking JavaScript is deferred or removed')
  checkItem(doc, 'Unused CSS is purged (if using a framework like Tailwind or Bootstrap)')
  checkItem(doc, 'Web fonts are loaded with font-display: swap')
  checkItem(doc, 'Total page weight under 2MB for main pages')

  sectionTitle(doc, 'SECTION 3 — SEO (10 points)')
  checkItem(doc, '[BLOCK] robots.txt is present and is NOT blocking search engines')
  checkItem(doc, '[BLOCK] XML sitemap is present at /sitemap.xml and submitted to Search Console')
  checkItem(doc, 'Every page has a unique, descriptive title tag (50–60 characters)')
  checkItem(doc, 'Every page has a unique meta description (140–160 characters)')
  checkItem(doc, 'Every page has exactly one H1 containing the primary keyword')
  checkItem(doc, 'All images have descriptive alt text')
  checkItem(doc, 'Canonical tags are in place on all pages')
  checkItem(doc, 'No duplicate content issues (paginated pages, print versions, etc.)')
  checkItem(doc, 'Internal linking is logical and connects key pages')
  checkItem(doc, 'Schema markup is implemented (LocalBusiness, Organization, or Product)')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'SECTION 4 — FORMS, CTAs & TRACKING (12 points)')
  checkItem(doc, '[BLOCK] All contact forms submit successfully and send to the correct inbox')
  checkItem(doc, '[BLOCK] Form submissions trigger a confirmation email to the user')
  checkItem(doc, '[BLOCK] Google Analytics 4 is installed and collecting pageview data')
  checkItem(doc, '[BLOCK] At least one conversion event is firing on form submission')
  checkItem(doc, 'Google Tag Manager is in place (all tags firing correctly)')
  checkItem(doc, 'Google Search Console is connected and verified')
  checkItem(doc, 'Facebook Pixel / Meta CAPI is firing (if running Meta ads)')
  checkItem(doc, 'All phone numbers are click-to-call links on mobile')
  checkItem(doc, 'All email addresses link to mailto: correctly')
  checkItem(doc, 'Every CTA button links to the correct destination')
  checkItem(doc, 'Thank-you / confirmation pages exist and load correctly post-submission')
  checkItem(doc, 'Spam protection (honeypot or reCAPTCHA) is active on all forms')

  sectionTitle(doc, 'SECTION 5 — CONTENT & LEGAL (9 points)')
  checkItem(doc, '[BLOCK] No placeholder text (Lorem ipsum) exists anywhere on the site')
  checkItem(doc, '[BLOCK] All images are either licensed, owned, or royalty-free')
  checkItem(doc, 'Privacy Policy is present, linked in the footer, and up to date')
  checkItem(doc, 'Cookie consent banner is present (if required for GDPR/CCPA compliance)')
  checkItem(doc, 'Terms of Service or Terms & Conditions page is present (if applicable)')
  checkItem(doc, 'All social media links are correct and open in a new tab')
  checkItem(doc, 'All external links open in a new tab with rel="noopener noreferrer"')
  checkItem(doc, 'FAQs, testimonials, and case study content has been proofread')
  checkItem(doc, 'Copyright year in the footer is correct')

  sectionTitle(doc, 'SECTION 6 — MOBILE & CROSS-BROWSER (8 points)')
  checkItem(doc, 'Site tested on Chrome, Firefox, Safari, and Edge (desktop)')
  checkItem(doc, 'Site tested on iOS Safari and Android Chrome (mobile)')
  checkItem(doc, 'No horizontal scroll exists on any screen size')
  checkItem(doc, 'All tap targets are at least 44x44px')
  checkItem(doc, 'Font sizes are readable without zooming (min 16px body)')
  checkItem(doc, 'Navigation is usable on mobile (hamburger menu functions correctly)')
  checkItem(doc, 'All modals and pop-ups function correctly on mobile')
  checkItem(doc, 'Sticky header / footer elements do not obscure content on scroll')

  doc.end()
  console.log('✓ pre-launch-website-checklist.pdf')
}

// ─── 9. INSTAGRAM REELS SCRIPT TEMPLATES ─────────────────────────────────────
async function generateReelsScripts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'instagram-reels-script-templates.pdf')))
  header(doc, 'Instagram Reels Script Templates', '12 Plug-and-Play Scripts for Every Content Type That Converts', 'Social Media')
  footer(doc, 1)

  bodyText(doc, 'Every script follows the same architecture: Hook → Context → Value → CTA. The hook is your only job in the first 2 seconds — stop the scroll or the rest doesn\'t matter. Brackets indicate fill-in sections.')

  sectionTitle(doc, 'THE UNIVERSAL STRUCTURE (memorise this)')
  numberedItem(doc, 1, 'Hook (0–3 sec)', 'Bold claim, surprising fact, or open loop. Must make the viewer curious or disagree.')
  numberedItem(doc, 2, 'Context (3–8 sec)', 'Why this matters to THEM, right now.')
  numberedItem(doc, 3, 'Value (8–45 sec)', 'The actual content. Tips, steps, story, or reveal.')
  numberedItem(doc, 4, 'CTA (last 3 sec)', 'One clear action: save, comment, follow, or click.')
  doc.moveDown(0.5)

  sectionTitle(doc, 'SCRIPT 1 — The Contrarian Hook (Education)')
  bodyText(doc, 'Hook: "Stop doing [common thing everyone does]. It\'s killing your [result]."')
  bodyText(doc, 'Context: "I see [audience] making this mistake every single week — and it costs them [consequence]."')
  bodyText(doc, 'Value: "Here\'s what to do instead: [3 specific steps or tips]."')
  bodyText(doc, 'CTA: "Save this before you make the same mistake. Follow for more [niche] tips."')

  sectionTitle(doc, 'SCRIPT 2 — The Number List (Education)')
  bodyText(doc, 'Hook: "[Number] things [audience] wishes they knew before [doing the thing]."')
  bodyText(doc, 'Context: "Nobody told me these when I started. Now I\'m sharing them so you don\'t waste [time/money/effort]."')
  bodyText(doc, 'Value: "[1. Point.] [2. Point.] [3. Point.] — the last one is the one most people miss."')
  bodyText(doc, 'CTA: "Drop a [emoji] if number [X] surprised you."')

  sectionTitle(doc, 'SCRIPT 3 — The Before/After (Social Proof)')
  bodyText(doc, 'Hook: "[Client/you] went from [bad starting point] to [impressive result] in [timeframe]."')
  bodyText(doc, 'Context: "Here\'s exactly what changed — and it wasn\'t what you\'d expect."')
  bodyText(doc, 'Value: "The thing that made the difference was [specific change/strategy]. Before, they were doing [X]. After switching to [Y], [result happened]."')
  bodyText(doc, 'CTA: "Comment \'HOW\' and I\'ll send you the breakdown."')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'SCRIPT 4 — The Myth Buster (Authority)')
  bodyText(doc, 'Hook: "Everyone says [popular advice]. They\'re wrong."')
  bodyText(doc, 'Context: "I spent [time] testing this and the data says something completely different."')
  bodyText(doc, 'Value: "The truth is [contrarian insight with specifics and evidence]."')
  bodyText(doc, 'CTA: "Follow if you want [niche] advice that\'s actually based on evidence."')

  sectionTitle(doc, 'SCRIPT 5 — The Day In My Life (Culture / BTS)')
  bodyText(doc, 'Hook: "This is what a [role] at [company type] actually looks like."')
  bodyText(doc, 'Context: "Not the highlight reel — the real, unfiltered version."')
  bodyText(doc, 'Value: "[Time]: [honest description]. [Time]: [honest description]. [Time]: [surprise moment or insight]."')
  bodyText(doc, 'CTA: "Follow for more behind-the-scenes of [what you do]."')

  sectionTitle(doc, 'SCRIPT 6 — The Tutorial (Education)')
  bodyText(doc, 'Hook: "How to [achieve result] in [timeframe] — step by step."')
  bodyText(doc, 'Context: "This is the exact process I use for [clients/myself] every [time period]."')
  bodyText(doc, 'Value: "Step 1: [action]. Step 2: [action]. Step 3: [action]. The key thing most people miss at step [X] is [insight]."')
  bodyText(doc, 'CTA: "Save this — you\'ll want it when you actually go to do it."')

  sectionTitle(doc, 'SCRIPT 7 — The Offer Hook (Direct CTA)')
  bodyText(doc, 'Hook: "We\'re offering [specific thing] for free until [date/until X spots fill]."')
  bodyText(doc, 'Context: "We\'ve done this for [number] clients and the average result is [outcome]."')
  bodyText(doc, 'Value: "What you get: [deliverable 1], [deliverable 2], [deliverable 3]. No catch — here\'s why we do this: [honest reason]."')
  bodyText(doc, 'CTA: "DM me [keyword] right now to claim your spot."')

  sectionTitle(doc, 'HOOK LIBRARY — 40+ Tested Opening Lines')
  const hooks = [
    '"Nobody talks about [hidden truth in your niche]."',
    '"The [industry] secret they don\'t want you to know:"',
    '"I made [embarrassing mistake] so you don\'t have to."',
    '"Why [audience] are [failing at thing] (it\'s not what you think)"',
    '"This one change made us [result] in [timeframe]."',
    '"[Audience], if you\'re doing [common thing], stop watching this. You don\'t need it."',
    '"Hot take: [controversial but defensible opinion]."',
    '"The [thing] that took me from [bad] to [good]."',
    '"Tell me you\'re [type of person] without telling me — I\'ll start."',
    '"Things I wish someone told me when I was [earlier stage]:"',
  ]
  hooks.forEach(h => bulletItem(doc, h))

  doc.end()
  console.log('✓ instagram-reels-script-templates.pdf')
}

// ─── 10. LINKEDIN B2B OUTREACH PLAYBOOK ──────────────────────────────────────
async function generateLinkedInPlaybook() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'linkedin-b2b-outreach-playbook.pdf')))
  header(doc, 'LinkedIn B2B Outreach Playbook', 'Connection to Discovery Call in 5 Steps — No Paid Ads Required', 'Social Media')
  footer(doc, 1)

  bodyText(doc, 'This playbook works for any B2B service business. The goal is not to sell on LinkedIn — it\'s to move qualified conversations off LinkedIn and into a call or DM. Follow the steps in order.')

  sectionTitle(doc, 'STEP 1 — PROFILE OPTIMISATION (Do this first)')
  bodyText(doc, 'Your profile is a landing page, not a CV. Before sending a single connection request, make sure every element works for your ideal client.')
  checkItem(doc, 'Profile photo: professional, clear face, plain background, smiling')
  checkItem(doc, 'Banner image: communicates your value proposition visually')
  checkItem(doc, 'Headline: "[What you do] for [who] to achieve [outcome]" — not your job title')
  checkItem(doc, 'About section: written in first person, starts with a bold hook, includes social proof and clear CTA')
  checkItem(doc, 'Featured section: pinned post, lead magnet, or case study')
  checkItem(doc, 'Experience: outcome-focused descriptions, not task lists')
  checkItem(doc, 'At least 3 recommendations from real clients or collaborators')

  sectionTitle(doc, 'STEP 2 — TARGET LIST BUILDING')
  bodyText(doc, 'Use LinkedIn Sales Navigator (free trial available) or the basic search filters to build a targeted prospect list before outreach begins.')
  numberedItem(doc, 1, 'Define your ICP', 'Industry, company size (employees), job title, seniority level, geography')
  numberedItem(doc, 2, 'Use boolean search', 'e.g. "Marketing Director" AND "SaaS" NOT "Freelance" in people search')
  numberedItem(doc, 3, 'Qualify before connecting', 'Check their activity — have they posted in the last 30 days? Active users respond 3x more.')
  numberedItem(doc, 4, 'Build a list of 50 targets per week', 'Quality over quantity. Know something specific about each before reaching out.')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'STEP 3 — CONNECTION REQUEST TEMPLATES (10 templates)')
  bodyText(doc, 'Always personalise. Reference their content, company, role, or a mutual connection. The character limit is 300.')
  doc.moveDown(0.3)
  const connTemplates = [
    { label: 'Content-based', text: 'Hi [Name] — your post on [topic] last week was spot on. I\'ve been thinking about this a lot in relation to [industry]. Would love to connect and follow your work.' },
    { label: 'Mutual connection', text: 'Hi [Name] — [Mutual] suggested I reach out. We both work in [space] and I thought connecting made sense. Happy to be a resource if ever useful.' },
    { label: 'Company-based', text: 'Hi [Name] — I noticed [Company] just [achievement/news]. Impressive work. I\'d love to connect — we work with a few teams doing similar things.' },
    { label: 'Problem-aware', text: 'Hi [Name] — I work specifically with [role] at [company type] on [challenge]. Thought connecting made sense in case it\'s ever relevant.' },
    { label: 'Direct and honest', text: 'Hi [Name] — I\'ll be upfront: I think what we do could genuinely help [Company]. Would love to connect and share something — zero pressure.' },
  ]
  connTemplates.forEach(({ label, text }) => {
    doc.moveDown(0.4)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(`${label}: `)
    doc.fontSize(10).fillColor('#333333').font('Helvetica').text(`"${text}"`, { lineGap: 3 })
  })

  sectionTitle(doc, 'STEP 4 — FOLLOW-UP SEQUENCE (3-touch framework)')
  numberedItem(doc, 1, 'Message 1 (Day 1 after connection): The Value Drop', 'Share something genuinely useful — a resource, insight, or observation relevant to them. No ask.')
  doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('     "Hi [Name] — thanks for connecting. I\'ve been writing about [topic] — thought this might be useful: [link or insight]. No agenda, just thought of you when I saw it."', { lineGap: 2 })
  doc.moveDown(0.3)
  numberedItem(doc, 2, 'Message 2 (Day 5): The Relevant Question', 'Ask a single, easy-to-answer question about their situation.')
  doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('     "Curious — how are you currently handling [problem you solve] at [Company]? Asking because most [roles] I talk to are dealing with [common challenge] right now."', { lineGap: 2 })
  doc.moveDown(0.3)
  numberedItem(doc, 3, 'Message 3 (Day 10): The Low-Pressure Ask', 'Only if they\'ve engaged. Offer a no-commitment next step.')
  doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('     "Based on what you\'ve shared — would a 20-minute call make sense? No slides, no pitch. Just want to understand if there\'s a fit worth exploring."', { lineGap: 2 })

  sectionTitle(doc, 'STEP 5 — OBJECTION HANDLING')
  const objections = [
    { obj: '"Not interested"', response: '"Completely understood — appreciate the honesty. Mind if I ask what the biggest challenge is with [topic] right now? Genuinely curious, no agenda."' },
    { obj: '"We already have someone for this"', response: '"Good to know — sounds like you\'ve got it covered. Happy to be a second opinion if you ever want to benchmark."' },
    { obj: '"Send me more information"', response: '"Happy to — what specifically would be most useful? A case study, pricing overview, or process walkthrough?"' },
    { obj: '"Not the right time"', response: '"Makes sense. When would be a better time to revisit? Happy to reach out then instead."' },
  ]
  objections.forEach(({ obj, response }) => {
    doc.moveDown(0.4)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(obj)
    doc.fontSize(10).fillColor('#333333').font('Helvetica').text(response, { lineGap: 3 })
  })

  doc.end()
  console.log('✓ linkedin-b2b-outreach-playbook.pdf')
}

// ─── 11. BRAND VOICE & TONE WORKBOOK ─────────────────────────────────────────
async function generateBrandVoice() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'brand-voice-tone-workbook.pdf')))
  header(doc, 'Brand Voice & Tone Workbook', 'Define Exactly How Your Brand Speaks — Across Every Platform and Format', 'Branding')
  footer(doc, 1)

  bodyText(doc, 'Voice is consistent — it\'s who your brand IS. Tone shifts — it\'s how your brand FEELS in different contexts. A brand can always be warm, but more playful in a social caption and more precise in a proposal. This workbook captures both.')

  sectionTitle(doc, 'PART 1 — VOICE ATTRIBUTES')
  bodyText(doc, 'Choose 3–5 words that define your brand\'s core personality. For each, write a "we are / we are not" statement to add precision.')
  doc.moveDown(0.3)
  const attrs = ['Attribute 1:', 'Attribute 2:', 'Attribute 3:', 'Attribute 4:', 'Attribute 5:']
  attrs.forEach(a => {
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(a)
    doc.fontSize(10).fillColor('#555').font('Helvetica').text('We ARE: ______________________________  We are NOT: ______________________________', { lineGap: 6 })
    doc.moveDown(0.3)
  })

  sectionTitle(doc, 'PART 2 — TONE MODULATION GUIDE')
  bodyText(doc, 'Tone shifts depending on context. Define how your voice adapts without losing its core character.')
  const contexts = [
    ['Social Media Captions', 'Tone here: ___________________  Example words to use: ___________________'],
    ['Email Subject Lines', 'Tone here: ___________________  Example words to use: ___________________'],
    ['Website Headlines', 'Tone here: ___________________  Example words to use: ___________________'],
    ['Client Proposals', 'Tone here: ___________________  Example words to use: ___________________'],
    ['Error Messages / Apologies', 'Tone here: ___________________  Example words to use: ___________________'],
    ['Success Messages / Celebrations', 'Tone here: ___________________  Example words to use: ___________________'],
  ]
  contexts.forEach(([ctx, fill]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(ctx)
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text(fill, { lineGap: 4 })
  })

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'PART 3 — VOCABULARY: DO / DON\'T')
  bodyText(doc, 'List words and phrases your brand actively uses and avoids. Specificity here prevents inconsistency across writers and platforms.')
  doc.moveDown(0.3)
  doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text('Words & phrases we USE:')
  for (let i = 0; i < 8; i++) {
    doc.fontSize(10).fillColor('#555').font('Helvetica').text(`${i + 1}. ____________________________________________`, { lineGap: 5 })
  }
  doc.moveDown(0.5)
  doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text('Words & phrases we AVOID (and why):')
  for (let i = 0; i < 8; i++) {
    doc.fontSize(10).fillColor('#555').font('Helvetica').text(`${i + 1}. ________________________  Reason: ______________________`, { lineGap: 5 })
  }

  sectionTitle(doc, 'PART 4 — BEFORE & AFTER COPY EXAMPLES')
  bodyText(doc, 'Write 3 real examples of copy rewritten in your brand voice. These become training examples for any new writer or AI tool.')
  for (let i = 1; i <= 3; i++) {
    doc.moveDown(0.4)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(`Example ${i}:`)
    doc.fontSize(10).fillColor(GRAY).font('Helvetica').text('BEFORE (generic): ____________________________________________________________', { lineGap: 5 })
    doc.fontSize(10).fillColor(DARK).font('Helvetica').text('AFTER (on-brand): ____________________________________________________________', { lineGap: 5 })
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('What changed and why: ________________________________________________________', { lineGap: 5 })
  }

  sectionTitle(doc, 'PART 5 — COPY REVIEW RUBRIC')
  bodyText(doc, 'Use this checklist whenever reviewing any piece of content before it goes public.')
  checkItem(doc, 'Does it sound like our brand — not generic, not a competitor?')
  checkItem(doc, 'Is the tone appropriate for the context (platform, audience, moment)?')
  checkItem(doc, 'Does it avoid all words on our banned list?')
  checkItem(doc, 'Would our ideal client recognise this as "us" without seeing the logo?')
  checkItem(doc, 'Does it start with the reader, not with us?')
  checkItem(doc, 'Is it free of jargon our audience wouldn\'t use themselves?')

  doc.end()
  console.log('✓ brand-voice-tone-workbook.pdf')
}

// ─── 12. COMPETITOR VISUAL AUDIT TEMPLATE ────────────────────────────────────
async function generateCompetitorAudit() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'competitor-visual-audit-template.pdf')))
  header(doc, 'Competitor Visual Audit Template', 'Map Every Competitor\'s Brand So You Know Exactly Where to Differentiate', 'Branding')
  footer(doc, 1)

  bodyText(doc, 'Run this audit on your top 5 competitors before any brand identity or redesign project. The goal is not to copy — it\'s to see the entire landscape so you can own a differentiated position. Complete one grid per competitor.')

  sectionTitle(doc, 'HOW TO USE THIS TEMPLATE')
  numberedItem(doc, 1, 'Choose your 5 closest competitors', 'Direct competitors first, then aspirational brands in adjacent spaces.')
  numberedItem(doc, 2, 'Complete one audit grid per brand', 'Screenshot their website, social profiles, and any ads you find.')
  numberedItem(doc, 3, 'Fill in the gap analysis on the last page', 'Where is the white space? What position is unclaimed?')
  numberedItem(doc, 4, 'Use findings to brief your designer', 'Show them the audit — it\'s worth more than a mood board.')
  doc.moveDown(0.5)

  const auditFields = [
    ['Company / Brand Name', ''],
    ['Website URL', ''],
    ['Primary Colour(s)', 'Hex codes if possible'],
    ['Secondary Colour(s)', ''],
    ['Logo Style', 'Wordmark / Symbol / Combination / Emblem / Abstract'],
    ['Typography Feel', 'Serif / Sans-serif / Slab / Script / Mixed'],
    ['Photography Style', 'Studio / Candid / Illustration / Abstract / None'],
    ['Overall Visual Tone', 'Premium / Approachable / Technical / Bold / Minimal / Loud'],
    ['Tagline / Strapline', ''],
    ['Primary Message', 'What claim do they lead with?'],
    ['Target Audience', 'Who does their visual identity speak to?'],
    ['CTA on Homepage', 'Exact text of main button'],
    ['Social Media Visual Style', 'Describe Instagram or LinkedIn grid aesthetic'],
    ['What I Like', 'Be specific — reference specific elements'],
    ['What I Dislike', 'Be specific'],
    ['What They Own', 'The position / feeling / colour they\'ve claimed in the market'],
  ]

  for (let i = 1; i <= 2; i++) {
    if (i === 2) { newPage(doc, i); doc.y = 50 }
    doc.moveDown(0.5)
    doc.fontSize(13).fillColor(BRAND_RED).font('Helvetica-Bold').text(`COMPETITOR ${i} AUDIT GRID`)
    doc.moveDown(0.3)
    auditFields.forEach(([label, hint]) => {
      doc.fontSize(9).fillColor(BRAND_RED).font('Helvetica-Bold').text(label.toUpperCase(), { characterSpacing: 0.5 })
      if (hint) doc.fontSize(8).fillColor(GRAY).font('Helvetica').text(hint)
      doc.moveTo(doc.x, doc.y + 2).lineTo(doc.page.width - 40, doc.y + 2).strokeColor('#e0e0e0').lineWidth(0.5).stroke()
      doc.moveDown(0.7)
    })
  }

  newPage(doc, 3)
  doc.y = 50
  sectionTitle(doc, 'GAP ANALYSIS — Where Is the White Space?')
  bodyText(doc, 'After completing all competitor grids, answer these questions to identify your differentiation opportunity.')
  questionItem(doc, 1, 'What colour(s) does no competitor own?', 'Avoid saturated territories — a new colour means instant visual differentiation')
  questionItem(doc, 2, 'What tone or personality is absent from the market?', 'e.g. all competitors are corporate — is there room for a warm, human brand?')
  questionItem(doc, 3, 'What message is no one making?', 'The unclaimed claim is often the most powerful positioning opportunity')
  questionItem(doc, 4, 'Who is no competitor speaking to?', 'Is there an underserved segment the visual identity could target?')
  questionItem(doc, 5, 'What visual style is completely absent?', 'Could a radically different aesthetic own immediate recognition in this market?')

  sectionTitle(doc, 'POSITIONING STATEMENT BUILDER')
  bodyText(doc, 'Based on your audit findings, draft your differentiated positioning statement:')
  doc.moveDown(0.3)
  doc.fontSize(10).fillColor('#333').font('Helvetica').text('For [target audience] who [have this problem/need], [Brand Name] is the [category] that [unique benefit/approach] — unlike [competitors] who [how they do it instead].', { lineGap: 6 })
  doc.moveDown(1)
  doc.fontSize(10).fillColor(GRAY).font('Helvetica').text('Your draft: ______________________________________________________________________', { lineGap: 6 })
  doc.fontSize(10).fillColor(GRAY).font('Helvetica').text('________________________________________________________________________________', { lineGap: 6 })
  doc.fontSize(10).fillColor(GRAY).font('Helvetica').text('________________________________________________________________________________')

  doc.end()
  console.log('✓ competitor-visual-audit-template.pdf')
}

// ─── 13. GOOGLE ADS STARTER CHECKLIST ────────────────────────────────────────
async function generateGoogleAdsChecklist() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'google-ads-starter-checklist.pdf')))
  header(doc, 'Google Ads Starter Checklist', 'Campaign Setup Guide — Launch Without Wasting Budget', 'SEO & PPC')
  footer(doc, 1)

  bodyText(doc, 'Most Google Ads campaigns fail in the first 30 days because of setup errors, not budget. This checklist walks through every setting, from account structure to conversion tracking, before your first ad goes live.')

  sectionTitle(doc, 'SECTION 1 — ACCOUNT & BILLING SETUP')
  checkItem(doc, 'Google Ads account created under correct Google account (not personal Gmail)')
  checkItem(doc, 'Billing information entered and payment method verified')
  checkItem(doc, 'Account currency and time zone set correctly (cannot be changed later)')
  checkItem(doc, 'Google Analytics 4 linked to Google Ads account')
  checkItem(doc, 'Google Search Console linked to Google Ads account')
  checkItem(doc, 'Conversion actions imported from GA4 or set up natively in Google Ads')
  checkItem(doc, 'Auto-tagging is enabled (for GA4 attribution)')

  sectionTitle(doc, 'SECTION 2 — CAMPAIGN STRUCTURE')
  bodyText(doc, 'Recommended structure: 1 campaign per service/product line → 2–4 ad groups per campaign → 3 ads per ad group')
  checkItem(doc, 'Campaign type set to "Search" (not Performance Max for first campaigns)')
  checkItem(doc, 'Campaign goal set to "Website traffic" or "Leads" — NOT "Maximise conversions" until you have 30+ conversions/month')
  checkItem(doc, 'Bidding strategy: Start on "Manual CPC" or "Maximise clicks" with a CPC cap')
  checkItem(doc, 'Network settings: Search only (uncheck Display and Search Partners to start)')
  checkItem(doc, 'Location targeting: specific cities/regions only — NOT "All countries"')
  checkItem(doc, 'Language targeting set to match your audience')
  checkItem(doc, 'Ad schedule set to hours when your team can respond to leads')
  checkItem(doc, 'Daily budget set conservatively — can be scaled up after proving ROAS')

  sectionTitle(doc, 'SECTION 3 — KEYWORD STRATEGY')
  checkItem(doc, 'Keyword research completed (Google Keyword Planner + Search Console queries)')
  checkItem(doc, 'Match types understood: Broad Match (avoid), Phrase Match [keyword], Exact Match [keyword]')
  checkItem(doc, 'Each ad group has a tightly themed keyword cluster (5–15 keywords max per group)')
  checkItem(doc, 'Negative keyword list added at campaign level (start with 50+ terms)')
  checkItem(doc, 'Negative keywords include: free, cheap, DIY, jobs, careers, salary, how to, tutorial')
  checkItem(doc, 'Brand keywords in a separate campaign (with separate budget)')
  checkItem(doc, 'Competitor keywords in a separate campaign (if bidding on them)')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'SECTION 4 — AD COPY (Responsive Search Ads)')
  checkItem(doc, 'Each RSA has 15 headlines and 4 descriptions entered')
  checkItem(doc, 'Primary keyword appears in at least 3 headlines')
  checkItem(doc, 'At least one headline is pinned to position 1 (your best hook)')
  checkItem(doc, 'Headlines include: benefit statement, social proof, urgency, and keyword')
  checkItem(doc, 'Descriptions include a clear CTA: "Get a Free Quote", "Book Today", "Call Now"')
  checkItem(doc, 'No trademark or competitor brand names in ad copy (can get disapproved)')
  checkItem(doc, 'Ad copy matches landing page headline exactly (reduces bounce rate)')
  checkItem(doc, 'Ad strength is at least "Good" — aim for "Excellent"')

  sectionTitle(doc, 'SECTION 5 — EXTENSIONS (now called Assets)')
  checkItem(doc, 'Sitelink extensions: 4+ links to key pages (Services, About, Case Studies, Contact)')
  checkItem(doc, 'Callout extensions: 4+ short value props ("No setup fees", "30-day results")')
  checkItem(doc, 'Call extension: phone number added with call tracking enabled')
  checkItem(doc, 'Location extension: linked to Google Business Profile (if local business)')
  checkItem(doc, 'Lead form extension: added if landing page form conversion is primary goal')

  sectionTitle(doc, 'SECTION 6 — LANDING PAGE')
  checkItem(doc, 'Landing page matches the ad message exactly — no mismatch between promise and page')
  checkItem(doc, 'Single CTA on the page — no nav menu distractions')
  checkItem(doc, 'Page loads in under 3 seconds on mobile')
  checkItem(doc, 'Form has 5 fields or fewer (Name, Email, Phone, Message, Submit)')
  checkItem(doc, 'Conversion tracking fires correctly on form submission (test it live)')
  checkItem(doc, 'Thank-you page exists and confirmation email is triggered')

  sectionTitle(doc, 'SECTION 7 — NEGATIVE KEYWORD SEED LIST (250+ terms)')
  bodyText(doc, 'Add these to your campaign-level negative list before going live. This alone can save 20–40% of wasted spend.')
  const negatives = ['free', 'cheap', 'affordable', 'DIY', 'how to', 'tutorial', 'course', 'learn', 'training', 'certification', 'jobs', 'career', 'salary', 'hire me', 'freelance', 'internship', 'template', 'sample', 'example', 'reddit', 'forum', 'review', 'scam', 'complaint', 'what is', 'definition', 'meaning', 'wiki']
  doc.fontSize(9).fillColor('#555').font('Helvetica').text(negatives.map(n => `"${n}"`).join('  ·  '), { lineGap: 4 })
  bodyText(doc, '+ Add industry-specific negatives from your search term reports after week 1.')

  doc.end()
  console.log('✓ google-ads-starter-checklist.pdf')
}

// ─── 14. LOCAL SEO DOMINATION GUIDE ──────────────────────────────────────────
async function generateLocalSEO() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'local-seo-domination-guide.pdf')))
  header(doc, 'Local SEO Domination Guide', 'Rank #1 in Google Maps & Local Search for Your City', 'SEO & PPC')
  footer(doc, 1)

  bodyText(doc, 'Local SEO is the highest-ROI marketing channel for most service businesses — and it\'s mostly free. A business at position 1 in Google Maps receives 3–5x more calls than position 3. This guide gives you the exact process.')

  sectionTitle(doc, 'PHASE 1 — GOOGLE BUSINESS PROFILE OPTIMISATION')
  bodyText(doc, 'Your GBP is the most important local SEO asset you have. Most businesses fill in 40% of it. Here\'s how to complete it properly.')
  checkItem(doc, 'Business name exactly matches your real-world signage (no keyword stuffing)')
  checkItem(doc, 'Primary category is the most specific match to your core service')
  checkItem(doc, 'Secondary categories added for all secondary services')
  checkItem(doc, 'Business description: 750 characters, includes primary keyword naturally, written for the reader')
  checkItem(doc, 'Phone number is local (not 0800 or premium rate) — local numbers rank better')
  checkItem(doc, 'Website URL links to a city-specific landing page, not just the homepage')
  checkItem(doc, 'Hours are accurate and include special holiday hours')
  checkItem(doc, 'All services are listed with descriptions and prices (where possible)')
  checkItem(doc, 'Q&A section: add and answer your own frequently asked questions')
  checkItem(doc, 'At least 10 high-quality photos: interior, exterior, team, work examples')
  checkItem(doc, 'Google Posts: publish one update per week (offer, event, or news)')

  sectionTitle(doc, 'PHASE 2 — CITATION BUILDING')
  bodyText(doc, 'Citations are mentions of your business Name, Address, and Phone (NAP) on other websites. Consistency across citations is critical — even a missing comma in the address matters to Google.')
  checkItem(doc, 'NAP data is 100% consistent across: GBP, website footer, and all directories')
  checkItem(doc, 'Listed on: Yelp, Apple Maps, Bing Places, Facebook, Yellow Pages, Foursquare')
  checkItem(doc, 'Listed on industry-specific directories relevant to your niche')
  checkItem(doc, 'Listed on local chamber of commerce and business association directories')
  checkItem(doc, 'Run a citation audit using BrightLocal or Moz Local — fix any inconsistencies')
  checkItem(doc, 'Duplicate GBP listings identified and merged or removed')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'PHASE 3 — REVIEW GENERATION STRATEGY')
  bodyText(doc, 'Reviews are the #1 local ranking factor after GBP completeness. Target: 50+ reviews, 4.5+ stars, with responses to all.')
  numberedItem(doc, 1, 'Ask at the right moment', 'Immediately after delivering a result, completing a project, or a positive conversation. Not in the invoice.')
  numberedItem(doc, 2, 'Make it frictionless', 'Send a direct link to your GBP review page — every click to find it reduces completion rate by 40%.')
  numberedItem(doc, 3, 'SMS outperforms email for reviews', 'A simple text: "Hi [Name] — really glad the [project] worked out. Would a 30-second Google review be possible? Here\'s the direct link: [link]"')
  numberedItem(doc, 4, 'Respond to every review within 48 hours', 'Include: thank you + business name + keyword + local reference. Never copy-paste the same response.')
  numberedItem(doc, 5, 'Never incentivise or buy reviews', 'Google will detect it and can suspend your listing permanently.')

  sectionTitle(doc, 'PHASE 4 — LOCAL CONTENT STRATEGY')
  bodyText(doc, 'Content that targets city + service keywords drives both map pack rankings and organic rankings.')
  bulletItem(doc, 'Create a dedicated landing page for each city/suburb you serve (not just one generic "Areas We Cover" page)')
  bulletItem(doc, 'Page title format: "[Service] in [City] | [Brand Name]"')
  bulletItem(doc, 'Include: local landmarks, client names from that area (with permission), area-specific case studies')
  bulletItem(doc, 'Target "near me" intent: "best [service] near [suburb]" in H2s and body')
  bulletItem(doc, 'Embed Google Maps on each location page (signals local relevance)')
  bulletItem(doc, 'Write at least one blog post per month targeting a local question: "[Service] in [City]: What to Expect and How to Choose"')

  sectionTitle(doc, 'PHASE 5 — LOCAL LINK BUILDING')
  bodyText(doc, 'Links from other local websites are powerful ranking signals. These are easier to get than national links.')
  checkItem(doc, 'Sponsor a local event, sports team, or charity — get a link from their website')
  checkItem(doc, 'Write a guest post for a local business blog or publication')
  checkItem(doc, 'Partner with complementary businesses for reciprocal mentions (not direct link exchanges)')
  checkItem(doc, 'Get listed on local news sites — issue a press release for any noteworthy milestone')
  checkItem(doc, 'Join and get listed on your local Chamber of Commerce website')

  sectionTitle(doc, 'KEY METRICS TO TRACK MONTHLY')
  checkItem(doc, 'GBP profile views (impressions in Maps vs Search)')
  checkItem(doc, 'GBP calls, direction requests, and website clicks')
  checkItem(doc, 'Ranking position for primary "service + city" keyword (use BrightLocal or Whitespark)')
  checkItem(doc, 'New reviews count and average star rating')
  checkItem(doc, 'Organic search traffic to local landing pages')

  doc.end()
  console.log('✓ local-seo-domination-guide.pdf')
}

// ─── 15. YOUTUBE CHANNEL GROWTH GUIDE ────────────────────────────────────────
async function generateYouTubeGuide() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'youtube-channel-growth-guide.pdf')))
  header(doc, 'YouTube Channel Growth Guide', '0 to 1,000 Subscribers — Without Posting Daily or Running Ads', 'Media Production')
  footer(doc, 1)

  bodyText(doc, 'YouTube rewards consistency and quality over quantity. One video per week beats seven mediocre ones. This guide gives you the exact framework for growing a channel from zero — used across 30+ client channels.')

  sectionTitle(doc, 'PHASE 1 — NICHE & CHANNEL POSITIONING')
  bodyText(doc, 'The fastest-growing channels own a specific niche, not a broad topic. "Marketing" is too broad. "LinkedIn growth for B2B founders" is ownable.')
  questionItem(doc, 1, 'What is your channel\'s specific niche?', 'Complete this: "I make videos for [specific audience] about [specific topic] so they can [specific outcome]"')
  questionItem(doc, 2, 'What are your 3 content pillars?', 'Every video should fit into one of three recurring themes')
  questionItem(doc, 3, 'What does your audience search for on YouTube right now?', 'Use YouTube autocomplete and VidIQ / TubeBuddy to find real search queries')
  doc.moveDown(0.3)
  bulletItem(doc, 'Test your niche: search your topic on YouTube. If results are 1M+ views on top videos, there\'s an audience. If they\'re all under 10K, the niche may be too small.')
  bulletItem(doc, 'Channel name: searchable and memorable. Include a keyword if possible.')
  bulletItem(doc, 'Channel description: written for your ideal subscriber, includes 2–3 keywords naturally.')

  sectionTitle(doc, 'PHASE 2 — VIDEO SEO')
  bodyText(doc, 'YouTube is the world\'s second-largest search engine. Every video needs to be optimised before it\'s published.')
  checkItem(doc, 'Title: includes the primary search keyword in the first 5 words, under 60 characters, creates curiosity or promises a clear outcome')
  checkItem(doc, 'Description: first 2 lines visible before "Show more" — include keyword here. Full description is 200+ words.')
  checkItem(doc, 'Tags: include primary keyword, secondary keywords, and channel name')
  checkItem(doc, 'Custom thumbnail: high contrast, readable text (under 4 words), clear subject, no clickbait')
  checkItem(doc, 'Chapters: add timestamps for videos over 5 minutes (boosts watch time and search visibility)')
  checkItem(doc, 'End screen: added to last 20 seconds with recommended video and subscribe button')
  checkItem(doc, 'Cards: add at least 2 cards linking to related videos or playlists')

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'PHASE 3 — VIDEO STRUCTURE FOR RETENTION')
  bodyText(doc, 'Average view duration is the most important signal YouTube uses to rank and recommend videos. Target 50%+ average view duration.')
  numberedItem(doc, 1, 'Hook (0–30 sec)', 'State what the video will teach, show the outcome, or tease the most interesting moment. Never start with "Hey guys, welcome back."')
  numberedItem(doc, 2, 'Promise (30 sec – 1 min)', 'Explain WHY this matters to the viewer and what they\'ll have by the end.')
  numberedItem(doc, 3, 'Content (bulk of video)', 'Deliver value in a clear structure. Use chapter titles, B-roll, and on-screen text to break up talking head footage.')
  numberedItem(doc, 4, 'Re-engagement bumpers', 'Every 2–3 minutes, remind viewers why they should keep watching: "And coming up at 8 minutes, the [most valuable part]."')
  numberedItem(doc, 5, 'CTA (last 60 sec)', 'One clear action: subscribe, watch next video, download resource, or book a call.')

  sectionTitle(doc, 'PHASE 4 — PUBLISHING SCHEDULE & GROWTH TACTICS')
  checkItem(doc, 'Publish at minimum 1 video per week for the first 12 weeks without exception')
  checkItem(doc, 'Publish on the same day and time each week (builds subscriber expectation)')
  checkItem(doc, 'Best posting times: Tuesday–Thursday, 12pm–3pm local time (when audience is active)')
  checkItem(doc, 'Reply to every comment in the first 48 hours (boosts comment velocity signal)')
  checkItem(doc, 'Create a playlist for each content pillar — auto-play keeps viewers watching')
  checkItem(doc, 'Post 1–3 YouTube Shorts per week repurposing key moments from long-form videos')
  checkItem(doc, 'Community tab: post weekly polls, questions, or behind-the-scenes updates (unlocked at 500 subs)')
  checkItem(doc, 'Collaborate with one channel of similar size per month (cross-promotion)')

  sectionTitle(doc, 'MILESTONE TARGETS')
  const milestones = [
    ['Week 4', '8 videos published, 50+ subscribers, 1 video reaching 500+ views'],
    ['Week 8', '16 videos published, 200+ subscribers, 1 video reaching 1,000+ views'],
    ['Week 12', '24+ videos, 500+ subscribers, first "viral" video (5,000+ views)'],
    ['Month 6', '1,000+ subscribers (YouTube monetisation threshold)'],
    ['Month 12', '5,000+ subscribers, consistent 10,000+ views per video'],
  ]
  milestones.forEach(([t, g]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(t + ': ', { continued: true })
    doc.fillColor('#333').font('Helvetica').text(g)
  })

  doc.end()
  console.log('✓ youtube-channel-growth-guide.pdf')
}

// ─── 16. PHOTOGRAPHY CREATIVE BRIEF ──────────────────────────────────────────
async function generatePhotoBrief() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'photography-creative-brief.pdf')))
  header(doc, 'Photography Creative Brief', 'Plan Every Brand Shoot Before Booking a Photographer', 'Media Production')
  footer(doc, 1)

  bodyText(doc, 'An unbriefed shoot is an expensive shoot. Great photographs happen before the shutter clicks — in the planning. This brief covers every decision so the photographer arrives knowing exactly what to create.')

  sectionTitle(doc, 'SECTION 1 — PROJECT OVERVIEW')
  infoBox(doc, 'Brand / Client', '____________________________________________')
  infoBox(doc, 'Shoot Date & Location', '____________________________________________')
  infoBox(doc, 'Photographer', '____________________________________________')
  infoBox(doc, 'Budget', '____________________________________________')
  questionItem(doc, 1, 'What is the primary purpose of these photographs?', 'Website hero / Social media / Product catalogue / Press / Advertising / Internal')
  questionItem(doc, 2, 'Where will the images be used? List every intended placement.')
  questionItem(doc, 3, 'What should someone FEEL when they see these images?', 'e.g. inspired, confident, safe, aspirational, energised')

  sectionTitle(doc, 'SECTION 2 — SHOT LIST')
  bodyText(doc, 'List every required shot in priority order. Mark MUST HAVE vs NICE TO HAVE.')
  for (let i = 1; i <= 12; i++) {
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(`${i}.`, { continued: true, width: 20 })
    doc.fillColor('#555').font('Helvetica').text(` Shot description: _________________________  Priority: ☐ Must  ☐ Nice`, { lineGap: 6 })
  }

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'SECTION 3 — VISUAL STYLE & MOOD')
  questionItem(doc, 4, 'Provide 5–10 reference images that represent the desired aesthetic.', 'Include a note on WHAT you like about each (light quality, colour, composition, mood)')
  questionItem(doc, 5, 'Lighting style', 'Natural light / Studio / Dramatic / Soft and diffused / Mixed / Specific time of day')
  questionItem(doc, 6, 'Colour treatment / grade', 'Warm tones / Cool / High contrast / Muted / Brand colours prominent / B&W')
  questionItem(doc, 7, 'Composition style', 'Editorial / Lifestyle / Clean and minimal / Busy and detailed / Specific framing preference')
  questionItem(doc, 8, 'What visual styles or looks do you explicitly NOT want?')

  sectionTitle(doc, 'SECTION 4 — TALENT & STYLING')
  checkItem(doc, 'Talent required: ☐ Founder  ☐ Team members  ☐ Hired models  ☐ No on-camera people')
  checkItem(doc, 'Wardrobe instructions provided to each person appearing on camera')
  checkItem(doc, 'Brand colours incorporated in wardrobe where appropriate')
  checkItem(doc, 'Hair and make-up: ☐ Self-managed  ☐ Stylist required  ☐ Natural preferred')
  questionItem(doc, 9, 'What props or products must appear in the shoot?')
  questionItem(doc, 10, 'What should talent avoid: gestures, expressions, or styling?')

  sectionTitle(doc, 'SECTION 5 — DELIVERABLES & USAGE RIGHTS')
  infoBox(doc, 'Number of final edited images expected', '____________')
  infoBox(doc, 'Turnaround time for delivery', '____________')
  infoBox(doc, 'File format required', 'RAW / JPEG / TIFF / PNG / All')
  infoBox(doc, 'Minimum resolution', 'Web (72dpi) / Print (300dpi) / Both')
  infoBox(doc, 'Usage rights', 'Web only / Print / Commercial / Exclusive / Time-limited')
  infoBox(doc, 'Retouching level', 'Minimal / Standard / Full retouching')
  questionItem(doc, 11, 'How will images be delivered?', 'WeTransfer / Google Drive / Dropbox / USB / Delivery platform')
  questionItem(doc, 12, 'Are there any images that must NOT be used publicly?', 'e.g. internal only, specific people to exclude from public images')

  doc.end()
  console.log('✓ photography-creative-brief.pdf')
}

// ─── 17. CUSTOMER PERSONA WORKBOOK ───────────────────────────────────────────
async function generatePersonaWorkbook() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'customer-persona-workbook.pdf')))
  header(doc, 'Customer Persona Workbook', 'Build the Most Accurate Picture of Your Ideal Client — Using Real Data', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'A persona built from assumptions is a marketing liability. This workbook helps you build a persona from real data: client interviews, sales call notes, reviews, and social listening. Every field has instructions for how to source the answer, not just what to fill in.')

  sectionTitle(doc, 'HOW TO SOURCE REAL DATA FOR THIS WORKBOOK')
  bulletItem(doc, 'Interview your 5 best clients: 30 minutes each. Ask about their life before finding you, what pushed them to buy, and what they would have paid twice as much for.')
  bulletItem(doc, 'Read your Google and Trustpilot reviews — word for word. Customers describe their situation in exact language you can use in your marketing.')
  bulletItem(doc, 'Analyse your sales call recordings (if you have them). What questions do prospects ask? What objections come up most?')
  bulletItem(doc, 'Check Reddit threads and Facebook groups where your audience talks. Search "[your service] + advice/help/recommend".')
  bulletItem(doc, 'Review your CRM data — what do your highest-value clients have in common?')

  sectionTitle(doc, 'PERSONA 1 — PRIMARY IDEAL CLIENT')
  questionItem(doc, 1, 'Give this persona a name and a one-line description.', 'e.g. "Sarah — Founder of a 10-person e-commerce brand, overwhelmed by marketing"')
  questionItem(doc, 2, 'Demographics', 'Age range, gender (if relevant), location, education, relationship status, income bracket')
  questionItem(doc, 3, 'Role & business context', 'Job title, company size, industry, years in role, decision-making authority')
  questionItem(doc, 4, 'What does a typical Tuesday look like for this person?', 'Where are they? What are they doing? What are they stressed about?')
  questionItem(doc, 5, 'What are their TOP 3 professional goals right now?')
  questionItem(doc, 6, 'What are their TOP 3 personal goals or desires?')

  newPage(doc, 2)
  doc.y = 50
  sectionTitle(doc, 'PAIN POINTS & BUYING TRIGGERS')
  questionItem(doc, 7, 'What is the #1 problem that keeps this person up at night?')
  questionItem(doc, 8, 'What have they already tried to solve this problem, and why did it fail?')
  questionItem(doc, 9, 'What event or moment triggered them to start looking for a solution?', 'e.g. A failed campaign, a competitor\'s growth, a board meeting, a revenue milestone')
  questionItem(doc, 10, 'What words do THEY use to describe their problem?', 'Copy exact phrases from interviews, reviews, and social posts — do NOT paraphrase')
  questionItem(doc, 11, 'What is their #1 fear about making this purchase/decision wrong?')
  questionItem(doc, 12, 'What does success look like to them 90 days after solving this problem?')

  newPage(doc, 3)
  doc.y = 50
  sectionTitle(doc, 'OBJECTIONS & DECISION MAKING')
  questionItem(doc, 13, 'What are the TOP 3 objections they raise before buying?', 'e.g. Price too high, not sure it works for my industry, timing isn\'t right')
  questionItem(doc, 14, 'What evidence or proof removes each objection?', 'Case studies, guarantees, testimonials, trial period, certifications')
  questionItem(doc, 15, 'Who else is involved in the buying decision?', 'Do they need to convince a partner, CFO, or board?')
  questionItem(doc, 16, 'How long does their typical buying process take from first touch to decision?')
  questionItem(doc, 17, 'What would make them choose a competitor over you?', 'Be honest — knowing this helps you close the gap or reframe your positioning')

  sectionTitle(doc, 'MESSAGING ALIGNMENT')
  questionItem(doc, 18, 'What ONE headline would make this person stop scrolling and read?')
  questionItem(doc, 19, 'What channels does this person use most actively?', 'Instagram / LinkedIn / Email / YouTube / TikTok / Google / Referral')
  questionItem(doc, 20, 'What brands, publications, or influencers does this person trust?', 'This tells you where to advertise, who to partner with, and what language to mirror')

  doc.end()
  console.log('✓ customer-persona-workbook.pdf')
}

// ─── 18. MARKETING BUDGET PLANNER ────────────────────────────────────────────
async function generateBudgetPlanner() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'marketing-budget-planner.pdf')))
  header(doc, 'Marketing Budget Planner', 'Annual Spend Allocation Template with Industry Benchmarks', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'The most common marketing mistake isn\'t overspending — it\'s underspending on channels that work and overspending on channels that feel good. This planner helps you allocate budget based on goals and ROI, not instinct.')

  sectionTitle(doc, 'STEP 1 — SET YOUR MARKETING BUDGET')
  bodyText(doc, 'Industry benchmarks for marketing spend as a % of total revenue:')
  const benchmarks = [
    ['B2B Services (established)', '5–10% of revenue'],
    ['B2B Services (growth phase)', '10–20% of revenue'],
    ['B2C E-commerce', '8–15% of revenue'],
    ['SaaS (early stage)', '15–25% of revenue'],
    ['Local Service Business', '5–12% of revenue'],
    ['Professional Services (law, accounting, etc.)', '3–7% of revenue'],
  ]
  benchmarks.forEach(([cat, pct]) => {
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(cat + ': ', { continued: true })
    doc.fillColor(BRAND_RED).font('Helvetica-Bold').text(pct)
  })
  doc.moveDown(0.5)
  infoBox(doc, 'Your Annual Revenue', '£/$/AED ___________________________')
  infoBox(doc, 'Your Marketing Budget (% of revenue)', '________% = £/$/AED _______________')
  infoBox(doc, 'Monthly Marketing Budget', '£/$/AED ___________________________')

  sectionTitle(doc, 'STEP 2 — CHANNEL ALLOCATION')
  bodyText(doc, 'Recommended allocation percentages by primary goal. Adjust based on what\'s working in your business.')
  const channels = [
    ['SEO / Content Marketing', '20–30%', 'Long-term compounding ROI'],
    ['Paid Social (Meta, TikTok)', '20–25%', 'Audience building and lead gen'],
    ['Google Ads / PPC', '15–25%', 'High-intent search capture'],
    ['Email Marketing', '5–10%', 'Highest ROI channel (avg 42:1)'],
    ['Social Media Management', '10–15%', 'Brand and community building'],
    ['Website / CRO', '5–10%', 'One-time investment, ongoing gains'],
    ['Events / Sponsorships', '5–10%', 'Brand awareness and networking'],
    ['Testing / Experimentation', '5–10%', 'Reserve for new channels and A/B tests'],
  ]
  channels.forEach(([ch, pct, note]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(ch)
    doc.fontSize(9).fillColor(BRAND_RED).font('Helvetica-Bold').text(pct + '  ', { continued: true })
    doc.fillColor(GRAY).font('Helvetica').text(note)
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text('Your allocation: ______%  =  £/$/AED __________________ per month', { lineGap: 4 })
  })

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'STEP 3 — QUARTERLY CAMPAIGN PLANNING')
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
  quarters.forEach(q => {
    doc.moveDown(0.4)
    doc.fontSize(11).fillColor(BRAND_RED).font('Helvetica-Bold').text(q + ' CAMPAIGN PLAN')
    doc.fontSize(10).fillColor(GRAY).font('Helvetica')
      .text('Primary goal: ___________________________  Budget: £/$/AED _____________')
    doc.text('Key campaigns: ________________________________________________________________', { lineGap: 4 })
    doc.text('KPIs to measure: ______________________________________________________________', { lineGap: 8 })
  })

  sectionTitle(doc, 'STEP 4 — MONTHLY PERFORMANCE TRACKER')
  bodyText(doc, 'Review these numbers at the same time every month. What you measure is what you manage.')
  const metrics = ['Total marketing spend', 'Leads generated', 'Cost per lead', 'Leads converted to clients', 'Cost per client acquired', 'Revenue attributed to marketing', 'Return on marketing investment (ROMI)']
  metrics.forEach(m => {
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(m + ': ', { continued: true })
    doc.fillColor(GRAY).font('Helvetica').text('Target: ____________  Actual: ____________  Variance: ____________', { lineGap: 6 })
  })

  sectionTitle(doc, 'SCALING RULES')
  bulletItem(doc, 'If a channel delivers ROAS > 3x for 3 consecutive months → increase budget by 25–50%')
  bulletItem(doc, 'If a channel delivers ROAS < 1x for 2 consecutive months → pause and audit before any more spend')
  bulletItem(doc, 'Never increase budget on a channel without first improving the landing page or offer')
  bulletItem(doc, 'Keep 10% of budget in reserve for opportunistic testing — trends move fast')

  doc.end()
  console.log('✓ marketing-budget-planner.pdf')
}

// ─── 19. EMAIL MARKETING PLAYBOOK ────────────────────────────────────────────
async function generateEmailPlaybook() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'email-marketing-playbook.pdf')))
  header(doc, 'Email Marketing Playbook', 'List Growth, Welcome Sequences & Campaign Strategy', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'Email delivers an average $42 return for every $1 spent — the highest ROI of any marketing channel. The reason most businesses fail with email is poor list quality, no welcome sequence, and inconsistent sending. This playbook fixes all three.')

  sectionTitle(doc, 'PART 1 — LIST BUILDING STRATEGY')
  numberedItem(doc, 1, 'Choose a lead magnet with exchange value', 'A checklist, template, guide, calculator, or quiz. The opt-in offer must be MORE valuable than the email address you\'re asking for.')
  numberedItem(doc, 2, 'Build a dedicated opt-in landing page', 'Single CTA, no navigation. Headline = the outcome of the lead magnet. 3–5 bullet points. Form with first name + email only.')
  numberedItem(doc, 3, 'Add an opt-in form to every high-traffic page', 'Bottom of blog posts, exit intent popup (10% delay), embedded in the sidebar or footer.')
  numberedItem(doc, 4, 'Use social media to drive list growth', 'Promote the lead magnet in Reels/posts weekly. "DM me [word] for the free [resource]" converts 3–5x better than a link in bio.')
  numberedItem(doc, 5, 'Set up double opt-in for list quality', 'Lower raw numbers, dramatically higher engagement rates and deliverability.')

  sectionTitle(doc, 'PART 2 — WELCOME SEQUENCE (5 emails)')
  bodyText(doc, 'This sequence fires automatically after someone opts in. It turns a stranger into a warm prospect. Space emails: Day 0, Day 1, Day 3, Day 7, Day 14.')
  doc.moveDown(0.3)
  const welcomeEmails = [
    ['Email 1 (Day 0)', 'Deliver the lead magnet + introduce yourself in one sentence. Set expectations: "Over the next two weeks, I\'ll share [X]."'],
    ['Email 2 (Day 1)', 'Your story — specifically the moment that led you to doing this work. Make it specific and honest, not polished.'],
    ['Email 3 (Day 3)', 'Your best piece of free content — a blog post, video, or tip that solves a real problem. Pure value, no pitch.'],
    ['Email 4 (Day 7)', 'Social proof — a specific client story with a before, the change, and an after. One real result > ten testimonials.'],
    ['Email 5 (Day 14)', 'The soft offer — introduce your service or product. Frame it around solving the problem you\'ve been addressing all week.'],
  ]
  welcomeEmails.forEach(([label, desc]) => {
    doc.moveDown(0.4)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(label + ': ')
    doc.fontSize(10).fillColor('#333').font('Helvetica').text(desc, { lineGap: 3 })
  })

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'PART 3 — SUBJECT LINE FORMULA BANK (60+ templates)')
  bodyText(doc, 'The subject line is 80% of your open rate. Test 2 variations for every broadcast. The best-performing subject lines are curiosity gaps, numbers, and personalisation.')
  doc.moveDown(0.3)
  const formulas = [
    'The [topic] mistake everyone makes',
    '[Number] ways to [achieve outcome] this week',
    'I was wrong about [common belief]',
    'What [successful person] knows that you don\'t',
    'The [adjective] truth about [topic]',
    'How [client] got [result] in [timeframe]',
    'Stop doing [bad habit] — do this instead',
    'Why [thing everyone does] doesn\'t work anymore',
    '[First name], have you tried this?',
    'The [number]-minute fix for [common problem]',
    'I almost didn\'t share this',
    'What happens when you [do the thing]',
    '[Topic]: the version nobody talks about',
    'Quick question about [topic]',
    'This changed how I [do the thing]',
  ]
  formulas.forEach(f => bulletItem(doc, f))

  sectionTitle(doc, 'PART 4 — BROADCAST CAMPAIGN CADENCE')
  bodyText(doc, 'Recommended sending frequency: 1–2x per week. Consistency beats volume. Here\'s a repeatable monthly structure:')
  const cadence = [
    ['Week 1', 'Value email — teach something useful. No pitch.'],
    ['Week 2', 'Story email — a client case study or your own experience.'],
    ['Week 3', 'Offer or CTA email — promote a service, event, or resource.'],
    ['Week 4', 'Community / engagement email — ask a question, run a poll, share something personal.'],
  ]
  cadence.forEach(([w, desc]) => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(BRAND_RED).font('Helvetica-Bold').text(w + ': ', { continued: true })
    doc.fillColor('#333').font('Helvetica').text(desc)
  })

  sectionTitle(doc, 'PART 5 — DELIVERABILITY & LIST HYGIENE')
  checkItem(doc, 'Send from a custom domain email (not @gmail.com or @outlook.com)')
  checkItem(doc, 'SPF, DKIM, and DMARC records configured on your sending domain')
  checkItem(doc, 'Warm up new sending domains: start with 50/day, increase 50/day each week')
  checkItem(doc, 'Suppress unengaged subscribers every 90 days (no opens in 90 days = risk to deliverability)')
  checkItem(doc, 'Run a re-engagement sequence before purging: "Are you still interested in [topic]?"')
  checkItem(doc, 'Never buy email lists — it destroys domain reputation permanently')
  checkItem(doc, 'Maintain spam complaint rate below 0.1% (check in Google Postmaster Tools)')

  doc.end()
  console.log('✓ email-marketing-playbook.pdf')
}

// ─── 20. 90-DAY MARKETING PLAN TEMPLATE ──────────────────────────────────────
async function generate90DayPlan() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, '90-day-marketing-plan-template.pdf')))
  header(doc, '90-Day Marketing Plan Template', 'Quarterly Growth Blueprint — Goals, Channels, KPIs, and Weekly Actions', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'A 90-day marketing plan is long enough to see real results and short enough to stay focused. Fill in this template at the start of every quarter. Review weekly. Adapt monthly. Replace annually.')

  sectionTitle(doc, 'PART 1 — QUARTERLY GOALS (OKR FRAMEWORK)')
  bodyText(doc, 'Set 1–3 Objectives. Each Objective has 2–3 measurable Key Results. Objectives are qualitative and inspiring. Key Results are quantitative and binary — either hit or missed.')
  doc.moveDown(0.3)
  for (let i = 1; i <= 2; i++) {
    doc.fontSize(11).fillColor(BRAND_RED).font('Helvetica-Bold').text(`OBJECTIVE ${i}:`)
    doc.fontSize(10).fillColor(GRAY).font('Helvetica').text('______________________________________________________________________________', { lineGap: 6 })
    for (let j = 1; j <= 3; j++) {
      doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(`  KR${j}: `, { continued: true })
      doc.fillColor(GRAY).font('Helvetica').text('______________________________________________  Target: __________', { lineGap: 5 })
    }
    doc.moveDown(0.5)
  }

  sectionTitle(doc, 'PART 2 — CHANNEL STRATEGY')
  bodyText(doc, 'For each active channel this quarter, define the goal, frequency, responsible person, and primary metric.')
  const channels = ['SEO / Blog', 'Instagram', 'LinkedIn', 'TikTok', 'Email', 'Google Ads', 'Meta Ads', 'YouTube']
  channels.forEach(ch => {
    doc.moveDown(0.3)
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(ch)
    doc.fontSize(9).fillColor(GRAY).font('Helvetica')
      .text('Active this quarter: ☐ Yes  ☐ No   |   Goal: ______________________', { lineGap: 4 })
      .text('Frequency: _____________  Owner: ________________  KPI: _____________', { lineGap: 6 })
  })

  newPage(doc, 2)
  doc.y = 50

  sectionTitle(doc, 'PART 3 — MONTHLY FOCUS AREAS')
  const months = [
    ['Month 1 — BUILD', 'Set up foundations: campaigns, content, landing pages. Focus on launch quality over volume.'],
    ['Month 2 — GROW', 'Increase frequency and reach. Start optimising based on Month 1 data.'],
    ['Month 3 — SCALE', 'Double down on what\'s working. Cut or pause what isn\'t. Push toward quarterly targets.'],
  ]
  months.forEach(([m, guide]) => {
    doc.moveDown(0.4)
    doc.fontSize(11).fillColor(BRAND_RED).font('Helvetica-Bold').text(m)
    doc.fontSize(9).fillColor(GRAY).font('Helvetica').text(guide, { lineGap: 3 })
    doc.fontSize(10).fillColor(GRAY).font('Helvetica').text('Key priorities this month:', { lineGap: 3 })
    for (let i = 1; i <= 3; i++) {
      doc.text(`  ${i}. __________________________________________________________________________`, { lineGap: 5 })
    }
    doc.moveDown(0.3)
  })

  sectionTitle(doc, 'PART 4 — WEEKLY ACTION CHECKLIST')
  bodyText(doc, 'These actions happen every week without exception. Block time for them at the start of each week.')
  const weekly = [
    'Publish scheduled content (blog post, social posts, email if applicable)',
    'Review last week\'s analytics — note any anomalies or standout performers',
    'Engage with comments, DMs, and replies within 24 hours',
    'Check ad spend and performance against daily targets',
    'Prospecting or outreach actions (LinkedIn, email, referrals)',
    'Update weekly KPI tracker with actuals vs. targets',
    'Plan and brief next week\'s content',
  ]
  weekly.forEach(w => checkItem(doc, w))

  sectionTitle(doc, 'PART 5 — KPI DASHBOARD')
  bodyText(doc, 'Track these weekly. Review against targets monthly. Update targets each quarter.')
  const kpis = [
    ['Website Sessions', 'Target: _______  Actual: _______'],
    ['Leads Generated', 'Target: _______  Actual: _______'],
    ['Cost Per Lead', 'Target: _______  Actual: _______'],
    ['Email Subscribers', 'Target: _______  Actual: _______'],
    ['Email Open Rate', 'Target: _______  Actual: _______'],
    ['Social Reach / Impressions', 'Target: _______  Actual: _______'],
    ['New Clients', 'Target: _______  Actual: _______'],
    ['Revenue from Marketing', 'Target: _______  Actual: _______'],
    ['Marketing ROMI', 'Target: _______  Actual: _______'],
  ]
  kpis.forEach(([kpi, line]) => {
    doc.fontSize(10).fillColor(DARK).font('Helvetica-Bold').text(kpi + '  ', { continued: true })
    doc.fillColor(GRAY).font('Helvetica').text(line, { lineGap: 6 })
  })

  sectionTitle(doc, 'PART 6 — END-OF-QUARTER REVIEW')
  questionItem(doc, 1, 'Which OKRs did we hit? Which did we miss — and why?')
  questionItem(doc, 2, 'Which channels delivered the best ROI this quarter?')
  questionItem(doc, 3, 'What campaign or content performed best — and what made it work?')
  questionItem(doc, 4, 'What should we stop doing next quarter?')
  questionItem(doc, 5, 'What should we start or test next quarter?')

  doc.end()
  console.log('✓ 90-day-marketing-plan-template.pdf')
}

// ─── 21. SOCIAL MEDIA CAPTION PROMPT PACK ─────────────────────────────────────
async function generateSocialCaptionPrompts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'social-media-caption-prompts.pdf')))
  header(doc, 'Social Media Caption Prompt Pack', '150+ ChatGPT & Claude Prompts — Instagram · LinkedIn · TikTok', 'AI Prompts')
  footer(doc, 1)

  bodyText(doc, 'Copy any prompt below, paste into ChatGPT or Claude, replace the [BRACKETS] with your details, and generate on-brand captions in seconds. Each prompt is engineered for maximum engagement.')

  sectionTitle(doc, 'HOW TO USE THESE PROMPTS')
  bulletItem(doc, 'Replace every [BRACKETED] placeholder with your specific information before sending.')
  bulletItem(doc, 'Add a "write in a [tone] tone" modifier to match your brand voice.')
  bulletItem(doc, 'Ask the AI for 5 variations and pick the strongest one.')
  bulletItem(doc, 'Test captions with and without emojis — results vary by audience.')

  sectionTitle(doc, 'INSTAGRAM — EDUCATIONAL POSTS')
  promptItem(doc, 'How-To Caption', 'Write an Instagram caption teaching [TARGET AUDIENCE] how to [ACHIEVE RESULT] in [NUMBER] steps. Start with a bold hook, use line breaks between steps, and end with a save-worthy CTA. Tone: [BRAND TONE]. Max 2,200 characters.')
  promptItem(doc, 'Myth-Busting Caption', 'Write an Instagram caption debunking the myth that [COMMON MISCONCEPTION] is true for [TARGET AUDIENCE]. Open with the myth, reveal the truth with evidence, and close with a discussion-starting question. Tone: [BRAND TONE].')
  promptItem(doc, 'Stat-Led Caption', 'Write an Instagram caption starting with the surprising statistic "[INSERT STAT]". Explain what it means for [TARGET AUDIENCE], give one actionable takeaway, and end with a CTA to save or share.')

  sectionTitle(doc, 'INSTAGRAM — PROMOTIONAL POSTS')
  promptItem(doc, 'Service Launch Caption', 'Write an Instagram caption announcing [SERVICE/PRODUCT NAME] for [TARGET AUDIENCE]. Lead with the biggest pain point it solves, highlight three key benefits as one-liners, add social proof ("[NUMBER] clients / [RESULT]"), and close with a clear CTA. No hashtags.')
  promptItem(doc, 'Offer/Deal Caption', 'Write an urgent Instagram caption promoting [OFFER DETAILS] available until [DATE]. Use scarcity without sounding desperate. Include the value, what they get, the deadline, and a single CTA. Tone: excited but professional.')
  promptItem(doc, 'Case Study Caption', 'Write an Instagram caption sharing how [CLIENT TYPE] achieved [SPECIFIC RESULT] using [YOUR SERVICE]. Tell the before/after story in 5 sentences. End with "Want the same result?" and a CTA. Include a results-focused hook.')

  newPage(doc, 2)

  sectionTitle(doc, 'INSTAGRAM — STORYTELLING & CULTURE')
  promptItem(doc, 'Founder Story Caption', 'Write an authentic Instagram caption sharing why I started [BUSINESS NAME]. The story should cover the problem I personally experienced, the moment I decided to act, and what drives me today. Make it human, not salesy. Tone: [BRAND TONE]. 150–200 words.')
  promptItem(doc, 'Behind-the-Scenes Caption', 'Write an Instagram caption for a behind-the-scenes photo/video of [DESCRIBE SCENE]. Make it conversational, give a glimpse into our process/culture, and invite the audience to ask questions in the comments.')
  promptItem(doc, 'Lesson Learned Caption', 'Write an Instagram caption sharing the biggest lesson I learned from [EXPERIENCE/MISTAKE]. Be honest and specific. Show growth. End with a question asking followers what their experience has been.')

  sectionTitle(doc, 'LINKEDIN — B2B CONTENT')
  promptItem(doc, 'Thought Leadership Post', 'Write a LinkedIn post sharing my perspective on [INDUSTRY TREND/TOPIC]. Open with a bold or counterintuitive statement. Back it up with 3 supporting points from my experience. End with a question to spark discussion. Tone: authoritative but approachable. No em-dashes. Use line breaks liberally.')
  promptItem(doc, 'Client Result Post', 'Write a LinkedIn post about the results we achieved for a [CLIENT TYPE] in [INDUSTRY]. Include: the challenge they faced, our approach in one sentence, the measurable result, and what other [CLIENT TYPE]s can learn from it. No client names needed.')
  promptItem(doc, 'Hiring/Team Post', 'Write a LinkedIn post announcing we are looking for a [ROLE] to join our team. Lead with the exciting opportunity, describe the ideal person in 3 bullet points, mention one culture point that makes us different, and include application instructions.')

  sectionTitle(doc, 'TIKTOK / REELS — HOOK-FIRST SCRIPTS')
  promptItem(doc, 'Problem-Solution Hook', 'Write a TikTok/Reels caption for a video about [TOPIC]. The first line must stop the scroll — use "Stop doing X", "I can\'t believe nobody talks about this", or a bold claim. Keep it under 150 characters. Add 5 relevant hashtags.')
  promptItem(doc, 'POV Caption', 'Write a TikTok caption using the POV format for a video showing [SCENARIO]. Start with "POV: You [SITUATION]". Keep it punchy, relatable, and under 100 characters. Add trending hashtags.')

  newPage(doc, 3)

  sectionTitle(doc, 'ENGAGEMENT & COMMUNITY PROMPTS')
  promptItem(doc, 'This or That Poll Caption', 'Write an Instagram caption for a "this or that" engagement post. Topic: [TOPIC RELEVANT TO NICHE]. Make the two options fun and debatable. Ask followers to vote in the comments. Keep it under 80 words.')
  promptItem(doc, 'Question-Box Caption', 'Write an Instagram Stories question-box caption inviting followers to ask me anything about [TOPIC]. Make it warm and inviting, explain what kinds of questions I love answering, and create FOMO around the answers I will post.')
  promptItem(doc, 'Giveaway Caption', 'Write an Instagram giveaway caption for [PRIZE]. Include: what they win, why it\'s valuable, exactly how to enter (follow, like, tag a friend), the deadline, and legal disclaimer placeholder. Tone: excited and inclusive.')

  sectionTitle(doc, 'CTA & LINK-IN-BIO PROMPTS')
  promptItem(doc, 'Link-in-Bio Drive Caption', 'Write an Instagram caption directing followers to the link in bio for [WHAT THEY WILL FIND THERE]. Sell the click with a clear benefit statement. Create curiosity. Use "link in bio" naturally at the end, not as an afterthought.')
  promptItem(doc, 'DM Invitation Caption', 'Write an Instagram caption inviting followers to DM me the word "[KEYWORD]" to receive [FREEBIE/INFO]. Explain what they get, why it\'s valuable, and make the action feel effortless. Keep it under 100 words.')

  sectionTitle(doc, 'NICHE PROMPT MODIFIERS')
  bodyText(doc, 'Add any of these modifiers to any prompt above to tailor output to your business type:')
  bulletItem(doc, 'For a local service business: "Our audience is homeowners in [CITY] aged 30–55 who value quality over price."')
  bulletItem(doc, 'For a B2B agency: "Speak to marketing managers and founders of SMEs turning over $1M–$10M."')
  bulletItem(doc, 'For an e-commerce brand: "Buyers are women aged 25–40 who follow lifestyle and wellness content."')
  bulletItem(doc, 'For a personal brand/coach: "My audience are aspiring [PROFESSION] who want to [TRANSFORMATION]."')
  bulletItem(doc, 'For a SaaS/tech product: "Speak to operations managers and CTOs who hate manual processes."')

  doc.end()
  console.log('✓ social-media-caption-prompts.pdf')
}

// ─── 22. SEO BLOG WRITING PROMPT PACK ─────────────────────────────────────────
async function generateSEOContentPrompts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'seo-content-prompts.pdf')))
  header(doc, 'SEO Blog Writing Prompt Pack', 'End-to-End AI Workflow for SEO-Optimised Blog Content', 'AI Prompts')
  footer(doc, 1)

  bodyText(doc, 'Use these prompts in sequence to produce a fully optimised blog post from scratch. Each stage builds on the previous one. Works with ChatGPT (GPT-4o) and Claude (Sonnet or Opus).')

  sectionTitle(doc, 'STAGE 1 — TOPIC & KEYWORD RESEARCH')
  promptItem(doc, 'Keyword Cluster Generator', 'I run a [TYPE OF BUSINESS] serving [TARGET AUDIENCE] in [LOCATION/NICHE]. Generate a keyword cluster around the topic "[SEED TOPIC]". Group keywords into: (1) Primary keyword (highest volume, core intent), (2) Supporting keywords (related subtopics), (3) Long-tail keywords (question-based, low competition). For each, estimate search intent: informational, commercial, or transactional.')
  promptItem(doc, 'Blog Topic Ideation', 'Based on the keyword "[TARGET KEYWORD]", generate 10 blog post title ideas. Mix formats: how-to guides, listicles, comparison posts, thought leadership, and case studies. Each title should include the target keyword naturally and have high click-through potential. Audience: [TARGET AUDIENCE].')
  promptItem(doc, 'Competitor Gap Finder', 'I want to write about "[TOPIC]". My competitors are [LIST COMPETITOR URLS OR NAMES]. What angles, subtopics, or questions do they likely miss that I could cover to differentiate my content and rank for underserved queries?')

  sectionTitle(doc, 'STAGE 2 — OUTLINE CREATION')
  promptItem(doc, 'SEO Outline Prompt', 'Create a detailed SEO blog post outline for the title: "[BLOG TITLE]". Target keyword: [KEYWORD]. Include: one H1, four to six H2 sections each with two to three H3 subsections, a FAQ section with five questions, and a conclusion with a CTA. Each heading should naturally include a relevant keyword variation. Word count target: [1,500 / 2,000 / 2,500] words.')
  promptItem(doc, 'FAQ Section Generator', 'Based on the topic "[TOPIC]", generate 8 questions that people commonly search on Google. For each question, write a concise 60-word answer that is accurate, helpful, and optimised for Featured Snippets. Format each as Question: / Answer:.')

  newPage(doc, 2)

  sectionTitle(doc, 'STAGE 3 — WRITING THE DRAFT')
  promptItem(doc, 'Introduction Prompt', 'Write an introduction for a blog post titled "[TITLE]". The intro must: (1) Open with a relatable problem or surprising fact, (2) Agitate the problem briefly, (3) Promise the solution the post delivers, (4) Include the primary keyword "[KEYWORD]" naturally in the first 100 words. Length: 120–150 words. Tone: [BRAND TONE].')
  promptItem(doc, 'Section Expansion Prompt', 'Expand the following H2 section of my blog post into 300–400 words: "[PASTE H2 HEADING AND BULLET NOTES]". Write in a [TONE] voice. Include: a clear explanation, a real-world example, and one actionable tip. Naturally include the keyword "[KEYWORD]" once or twice without forcing it.')
  promptItem(doc, 'E-E-A-T Signal Prompt', 'Rewrite this paragraph to add Experience, Expertise, Authoritativeness, and Trustworthiness signals without sounding boastful: "[PASTE PARAGRAPH]". Add a first-person insight, a reference to industry data or best practice, and a concrete example.')

  sectionTitle(doc, 'STAGE 4 — ON-PAGE SEO OPTIMISATION')
  promptItem(doc, 'Meta Title Generator', 'Write 5 meta title options for a blog post about "[TOPIC]" targeting the keyword "[KEYWORD]". Each must be under 60 characters, include the keyword near the start, and have a high click-through hook (number, power word, or question). Label each with its character count.')
  promptItem(doc, 'Meta Description Generator', 'Write 3 meta description options for a blog post titled "[TITLE]". Each must be 140–155 characters, include the keyword "[KEYWORD]", summarise the value the reader gets, and include a soft CTA. Label each with character count.')
  promptItem(doc, 'Internal Link Suggester', 'My blog post is about "[TOPIC]". I also have content on the following topics: [LIST YOUR OTHER POSTS/PAGES]. Suggest 4–6 places within my post where I could add natural internal links, with suggested anchor text for each. Explain why each link makes sense for the reader.')

  sectionTitle(doc, 'STAGE 5 — EDITING & REFINEMENT')
  promptItem(doc, 'Readability Improver', 'Rewrite the following section to improve readability for a [GRADE LEVEL / GENERAL AUDIENCE]. Break up long sentences, use active voice, add transition words, and replace jargon with plain language. Preserve all information and keyword usage: "[PASTE SECTION]".')
  promptItem(doc, 'CTA Closer Prompt', 'Write a blog post conclusion for an article about "[TOPIC]". Summarise the three main takeaways in 2 sentences each, then write a compelling CTA directing the reader to [NEXT ACTION — e.g. download a guide, book a call, read another post]. Tone: [BRAND TONE].')

  doc.end()
  console.log('✓ seo-content-prompts.pdf')
}

// ─── 23. AD COPY PROMPT PACK ──────────────────────────────────────────────────
async function generateAdCopyPrompts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'ad-copy-prompts.pdf')))
  header(doc, 'Ad Copy Prompt Pack', 'Facebook · Google · LinkedIn — 50+ Prompts for High-Converting Ads', 'AI Prompts')
  footer(doc, 1)

  bodyText(doc, 'These prompts produce ad copy frameworks, not finished ads. Review every output for accuracy, brand fit, and platform policy compliance before publishing. Tested across 400+ campaigns.')

  sectionTitle(doc, 'FACEBOOK & INSTAGRAM ADS')
  promptItem(doc, 'Awareness Ad — Problem Hook', 'Write a Facebook ad for [PRODUCT/SERVICE] targeting [AUDIENCE DESCRIPTION]. The ad should: open with a relatable problem statement in one line, agitate it briefly, introduce our solution, list 3 key benefits as bullet points, and close with a [CTA BUTTON TEXT] CTA. Tone: [BRAND TONE]. Primary text: under 125 words.')
  promptItem(doc, 'Retargeting Ad — Objection Handling', 'Write a Facebook retargeting ad for people who visited [WEBSITE/PAGE] but didn\'t convert. Address the most likely objection for [PRODUCT/SERVICE] which is [OBJECTION]. Reassure with social proof and reduce risk with [GUARANTEE/OFFER]. CTA: [CTA]. Keep primary text under 80 words.')
  promptItem(doc, 'Conversion Ad — Urgency', 'Write a Facebook conversion ad for [OFFER] ending on [DATE]. Lead with the offer value, use genuine urgency (not fake countdown language), highlight what they lose by waiting, and close with a strong CTA. Headline: under 40 characters. Primary text: under 100 words.')
  promptItem(doc, 'Video Ad Script (15 sec)', 'Write a 15-second Facebook video ad script for [PRODUCT/SERVICE]. Structure: 0–3s hook (bold claim or question), 3–12s value delivery (problem + solution + proof), 12–15s CTA. Write it as spoken words, not narration. Total word count: 40–50 words. Include on-screen text suggestions in brackets.')

  newPage(doc, 2)

  sectionTitle(doc, 'GOOGLE SEARCH ADS')
  promptItem(doc, 'Search Ad — 3 Headlines + 2 Descriptions', 'Write a Google Search ad for [PRODUCT/SERVICE] targeting the keyword "[TARGET KEYWORD]". Provide: 3 headline options (max 30 characters each, keyword in at least one), 2 description options (max 90 characters each), and one callout extension. Include character counts for each.')
  promptItem(doc, 'Competitor Conquest Ad', 'Write a Google Search ad targeting people searching for "[COMPETITOR NAME]". Highlight our key differentiators over [COMPETITOR] without naming them directly (Google policy). Focus on: [DIFFERENTIATOR 1], [DIFFERENTIATOR 2], [DIFFERENTIATOR 3]. Headlines: 3 options under 30 characters. Descriptions: 2 options under 90 characters.')
  promptItem(doc, 'Quality Score Optimiser', 'Rewrite this Google ad to improve Quality Score for the keyword "[TARGET KEYWORD]": [PASTE EXISTING AD]. Ensure: keyword appears in at least one headline, ad relevance matches search intent, description includes a benefit and CTA. Output: revised headlines and descriptions with character counts.')

  sectionTitle(doc, 'LINKEDIN ADS')
  promptItem(doc, 'Sponsored Content Ad', 'Write a LinkedIn Sponsored Content post ad for [PRODUCT/SERVICE] targeting [JOB TITLE / INDUSTRY]. Lead with a stat or insight relevant to their role, introduce how [PRODUCT/SERVICE] addresses it, use a professional but direct tone, and close with a clear CTA. Introductory text: under 150 characters. Headline: under 70 characters.')
  promptItem(doc, 'Lead Gen Form Ad', 'Write copy for a LinkedIn Lead Gen Form ad offering [LEAD MAGNET] to [TARGET AUDIENCE]. Headline (under 60 chars): communicate the value of the download. Description (under 160 chars): expand on what they get and why it matters now. CTA button: [DOWNLOAD / LEARN MORE / GET OFFER].')

  sectionTitle(doc, 'A/B VARIATION GENERATOR')
  promptItem(doc, 'Generate 5 Headline Variants', 'My current best-performing ad headline is: "[CURRENT HEADLINE]". Generate 5 alternative headlines that test different angles: (1) benefit-led, (2) curiosity/question, (3) number/specificity, (4) social proof, (5) urgency/scarcity. Keep each under [30 / 40] characters. Product: [PRODUCT]. Audience: [AUDIENCE].')
  promptItem(doc, 'Hook Angle Variations', 'My ad currently opens with: "[CURRENT HOOK]". Rewrite it from 4 different angles: (1) fear of missing out, (2) aspiration, (3) social proof, (4) contrarian/surprising. Keep each under 15 words. Product: [PRODUCT].')

  doc.end()
  console.log('✓ ad-copy-prompts.pdf')
}

// ─── 24. EMAIL CAMPAIGN PROMPT PACK ───────────────────────────────────────────
async function generateEmailCampaignPrompts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'email-campaign-prompts.pdf')))
  header(doc, 'Email Campaign Prompt Pack', 'Welcome Sequences · Broadcasts · Subject Lines · Outreach', 'AI Prompts')
  footer(doc, 1)

  bodyText(doc, 'Use these prompts to write every email your business needs. Replace all [BRACKETS] before sending. Always review for accuracy and personalise where possible before deploying to your list.')

  sectionTitle(doc, 'WELCOME SEQUENCE — 5 EMAILS')
  promptItem(doc, 'Email 1 — Welcome & Deliver', 'Write Email 1 of a 5-part welcome sequence for new subscribers of [BRAND NAME]. They signed up for [LEAD MAGNET/REASON]. Deliver the promised resource, introduce who we are in 2 sentences, set expectations for future emails, and close warmly. Subject line: 3 options. Preview text: 1 option. Body: under 200 words.')
  promptItem(doc, 'Email 2 — Our Story', 'Write Email 2 of a welcome sequence (sent Day 2). Share the origin story of [BRAND NAME] in a compelling, human way. Cover: the problem we saw in the market, how we started, and what we stand for today. End with a soft CTA to [READ A BLOG POST / FOLLOW ON SOCIAL / BOOK A CALL]. Under 250 words.')
  promptItem(doc, 'Email 3 — Value/Education', 'Write Email 3 of a welcome sequence (sent Day 4). Deliver pure value on the topic of [TOPIC RELEVANT TO AUDIENCE]. Give one actionable tip or framework. No selling. End with "Reply to this email if you have questions." Under 300 words. Tone: [BRAND TONE].')
  promptItem(doc, 'Email 4 — Social Proof', 'Write Email 4 of a welcome sequence (sent Day 6). Share a client success story or case study: [DESCRIBE CLIENT RESULT]. Use a before/after structure. Mention the specific result achieved. Close with a CTA to [BOOK A CALL / VIEW PORTFOLIO / START A PROJECT]. Under 250 words.')
  promptItem(doc, 'Email 5 — Soft Offer', 'Write Email 5 of a welcome sequence (sent Day 8). Make a soft offer for [PRODUCT/SERVICE]. Reference the journey so far ("Over the past week, you\'ve seen..."), present the offer with its main benefit, handle the top objection briefly, and include a clear CTA. No hard sell. Under 300 words.')

  newPage(doc, 2)

  sectionTitle(doc, 'BROADCAST & NEWSLETTER PROMPTS')
  promptItem(doc, 'Weekly Newsletter Prompt', 'Write a weekly email newsletter for [BRAND NAME] subscribers interested in [TOPIC]. Include: one insight or lesson from this week, one recommended resource (tool, article, or podcast), one short tip they can apply today, and a brief update on what we\'re working on. Conversational tone. Under 350 words.')
  promptItem(doc, 'Promotional Campaign Email', 'Write a promotional email announcing [OFFER] for [AUDIENCE]. Lead with the most compelling benefit, not the price. Use a story or context to set it up, present the offer clearly (what it is, what they get, the price, the deadline), handle the top objection, and close with a CTA. Under 400 words.')

  sectionTitle(doc, 'SUBJECT LINE PROMPT BANK')
  bodyText(doc, 'Use these prompts to generate subject lines for any campaign. Always A/B test at least 2 subject lines before full send.')
  promptItem(doc, 'Generate 10 Subject Lines', 'Write 10 email subject lines for an email about [EMAIL TOPIC] going to [AUDIENCE DESCRIPTION]. Include a mix of: curiosity gaps (2), specific numbers or results (2), personal/conversational (2), urgency or scarcity (2), and benefit-led (2). Each under 50 characters. Label each type.')
  promptItem(doc, 'Preview Text Generator', 'For each of the following subject lines, write a complementary preview text (max 90 characters) that adds context, builds curiosity, or continues the thought: [PASTE SUBJECT LINES]. The preview text should make the subject line irresistible to open.')

  sectionTitle(doc, 'COLD OUTREACH & FOLLOW-UP PROMPTS')
  promptItem(doc, 'Cold Email — First Touch', 'Write a cold outreach email to [JOB TITLE] at [COMPANY TYPE] introducing [YOUR SERVICE]. Keep it under 100 words. Lead with a specific observation about their business (placeholder: [PERSONALISATION]), connect it to a problem we solve, offer one specific value (not a generic pitch), and end with a low-friction CTA (reply, not a meeting link). No attachments reference.')
  promptItem(doc, '3-Touch Follow-Up Sequence', 'Write a 3-email cold follow-up sequence for someone who hasn\'t replied to my first email about [SERVICE/OFFER]. Email 2 (Day 3): add value, don\'t just bump. Email 3 (Day 7): take a different angle. Email 4 (Day 14): breakup email with a soft close. Each email under 80 words.')
  promptItem(doc, 'Re-engagement Campaign', 'Write a 2-email re-engagement campaign for subscribers who haven\'t opened in [90 / 180] days. Email 1: acknowledge the silence, deliver a high-value piece of content, ask if they still want to hear from us. Email 2 (3 days later): last chance email — if no engagement, offer to unsubscribe gracefully. Each under 150 words.')

  doc.end()
  console.log('✓ email-campaign-prompts.pdf')
}

// ─── 25. BRAND STRATEGY PROMPT PACK ───────────────────────────────────────────
async function generateBrandStrategyPrompts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'brand-strategy-prompts.pdf')))
  header(doc, 'Brand Strategy Prompt Pack', 'Voice · Positioning · Messaging Hierarchy — AI-Accelerated Branding', 'AI Prompts')
  footer(doc, 1)

  bodyText(doc, 'Use these prompts to define, document, and articulate your brand strategy using AI. Work through them in order for a complete brand foundation. Results improve significantly when you provide detailed, specific context.')

  sectionTitle(doc, 'BRAND DISCOVERY & POSITIONING')
  promptItem(doc, 'Brand Archetype Finder', 'Based on this business description: "[DESCRIBE YOUR BUSINESS, AUDIENCE, AND VALUES]", identify the most fitting brand archetype from the 12-archetype framework (Hero, Outlaw, Explorer, Creator, Ruler, Caregiver, Everyman, Lover, Jester, Sage, Innocent, Magician). Explain why this archetype fits, what it means for visual and verbal identity, and how to avoid the archetype\'s shadow traits.')
  promptItem(doc, 'Positioning Statement Generator', 'Help me write a brand positioning statement for [BRAND NAME]. Context: we serve [TARGET AUDIENCE] who struggle with [PAIN POINT]. Unlike [ALTERNATIVES/COMPETITORS], we [UNIQUE DIFFERENTIATOR] because [REASON TO BELIEVE]. Generate 3 positioning statement options using the classic format: "For [audience] who [need/want], [brand] is the [category] that [benefit] because [RTB]."')
  promptItem(doc, 'Value Proposition Builder', 'Generate 3 value propositions for [BRAND NAME] targeting [CUSTOMER TYPE]. Each should answer: What do we offer? Who is it for? What problem does it solve? What makes us different? Format as: one headline (under 10 words), one subheadline (under 20 words), and three supporting bullet points. Avoid jargon.')

  sectionTitle(doc, 'BRAND VOICE & TONE')
  promptItem(doc, 'Voice Attribute Generator', 'Define the brand voice for [BRAND NAME] using 4 personality attributes. For each attribute: name it, describe what it means for our communication style, give a "we are this, not that" contrast example, and provide one sample sentence showing the attribute in action. Context: [DESCRIBE BRAND AND AUDIENCE].')
  promptItem(doc, 'Tone Modulation Guide', 'Our brand voice attributes are [LIST ATTRIBUTES]. Write examples of how our tone should shift across these contexts while keeping the same core voice: (1) Social media caption, (2) Homepage headline, (3) Customer complaint response, (4) Email newsletter, (5) LinkedIn post. Show the contrast clearly.')

  newPage(doc, 2)

  sectionTitle(doc, 'IDEAL CUSTOMER & MESSAGING')
  promptItem(doc, 'Customer Persona Excavation', 'Help me build a detailed ideal customer profile for [BRAND NAME]. Ask me the 10 most important questions to uncover their demographics, psychographics, buying triggers, objections, and language patterns. After I answer, synthesise them into a one-page persona profile.')
  promptItem(doc, 'Messaging Hierarchy Builder', 'Create a messaging hierarchy for [BRAND NAME] with these core brand attributes: [LIST 3–5 ATTRIBUTES]. Structure it as: (1) Brand promise (one sentence), (2) Tagline (under 7 words), (3) Elevator pitch (30 seconds / 75 words), (4) Three key messages with supporting proof points, (5) Vocabulary: 10 words we use, 10 words we avoid.')

  sectionTitle(doc, 'NAMING & TAGLINES')
  promptItem(doc, 'Brand Name Brainstorm', 'I am naming a [TYPE OF BUSINESS] that [WHAT IT DOES] for [TARGET AUDIENCE]. Brand personality: [ATTRIBUTES]. Generate 20 potential brand name options across these styles: (1) Descriptive (5 names), (2) Invented/coined (5 names), (3) Metaphor/evocative (5 names), (4) Founder/personal (5 names). For each, briefly note the emotional impression and any domain/trademark risks.')
  promptItem(doc, 'Tagline Generator', 'Generate 10 tagline options for [BRAND NAME], a [BUSINESS TYPE] for [TARGET AUDIENCE]. Brand personality: [ATTRIBUTES]. Mix styles: benefit-focused (3), personality-driven (3), aspiration/transformation (2), intriguing/question-based (2). Each tagline under 7 words. Mark your top 3 with a reason.')

  sectionTitle(doc, 'BRAND STORY & ABOUT PAGE')
  promptItem(doc, 'Brand Origin Story', 'Write a 200-word brand origin story for [BRAND NAME]. Context: [DESCRIBE FOUNDING STORY — PROBLEM SEEN, DECISION MADE, MISSION TODAY]. Make it human, specific, and emotionally resonant. Avoid corporate language. The story should make the reader feel the founder\'s conviction and give them a reason to trust the brand.')
  promptItem(doc, 'About Page Copy', 'Write the copy for the About page of [BRAND NAME]. Sections: (1) Opening hook — one bold statement about our mission (under 20 words), (2) Our story (150 words), (3) What we believe (3 belief statements), (4) How we work (3 bullet points), (5) The team intro (2 sentences), (6) CTA. Tone: [BRAND TONE].')

  doc.end()
  console.log('✓ brand-strategy-prompts.pdf')
}

// ─── 26. CONTENT REPURPOSING PROMPT PACK ─────────────────────────────────────
async function generateRepurposingPrompts() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'content-repurposing-prompts.pdf')))
  header(doc, 'Content Repurposing Prompt Pack', 'One Piece of Content → 10 Formats — Maximum Reach, Minimum Effort', 'AI Prompts')
  footer(doc, 1)

  bodyText(doc, 'Every piece of content you create can become 8–12 additional assets across different channels and formats. Use these prompts with your existing content — paste in your original, then follow the repurposing chain.')

  sectionTitle(doc, 'BLOG POST REPURPOSING')
  promptItem(doc, 'Blog → LinkedIn Carousel', 'Turn this blog post into a LinkedIn carousel (10 slides). Slide 1: hook/title card, Slides 2–9: one key point per slide (headline + 2-sentence explanation + supporting stat or example), Slide 10: summary and CTA. Keep slide text under 50 words each. Here is the blog post: [PASTE BLOG POST].')
  promptItem(doc, 'Blog → Twitter/X Thread', 'Turn this blog post into a Twitter/X thread of 8–12 tweets. Tweet 1: bold hook that teases the value. Tweets 2–10: one key insight each, under 280 characters. Final tweet: summary + CTA + link placeholder. Each tweet must stand alone but flow in sequence. Blog post: [PASTE].')
  promptItem(doc, 'Blog → Instagram Caption', 'Extract the single most valuable insight from this blog post and write an Instagram caption around it. Hook in line 1, expand with 3–4 lines of value, close with a question CTA. Under 200 words. Blog post: [PASTE].')
  promptItem(doc, 'Blog → Email Newsletter', 'Turn this blog post into a conversational email newsletter. Open with a 2-sentence personal hook (why this topic matters to you), summarise the 3 key takeaways in a casual voice, add one original thought not in the post, and close with a CTA to read the full article. Under 300 words. Blog post: [PASTE].')

  newPage(doc, 2)

  sectionTitle(doc, 'VIDEO / PODCAST REPURPOSING')
  promptItem(doc, 'Transcript → Blog Post', 'Turn this video/podcast transcript into a structured blog post. Add an SEO-optimised H1 title, introduction paragraph, logical H2 sections based on the content flow, a conclusion with CTA, and a FAQ section with 3 questions. Clean up spoken language. Target keyword: [KEYWORD]. Transcript: [PASTE].')
  promptItem(doc, 'Long Video → Short Clip Script', 'From this video transcript, identify the 3 most quotable or standalone moments (under 60 seconds each). For each, write a hook caption for TikTok/Reels introducing the clip, and suggest an on-screen caption for the opening 3 seconds. Transcript: [PASTE].')
  promptItem(doc, 'Podcast → Show Notes', 'Write show notes for this podcast episode transcript. Include: episode summary (100 words), 5 key takeaways as bullet points, 3 timestamps with labels, links/resources mentioned (placeholders), and a quote pull for social sharing. Transcript: [PASTE].')

  sectionTitle(doc, 'CASE STUDY REPURPOSING')
  promptItem(doc, 'Case Study → Ad Copy', 'Turn this client case study into 3 ad copy variations for Facebook/Instagram. Each should: open with the client\'s result as the hook, briefly describe how, and end with a CTA. Variations: (1) result-led, (2) problem-led, (3) transformation story. Under 100 words each. Case study: [PASTE].')
  promptItem(doc, 'Case Study → LinkedIn Post', 'Turn this case study into a LinkedIn post. Open with the result in one punchy line, tell the story using problem → approach → result structure, add one generalised lesson for the reader, and close with a question or CTA. Under 250 words. Case study: [PASTE].')
  promptItem(doc, 'Case Study → Email Story', 'Turn this client case study into a storytelling email. Open with a scene-setting moment (place the reader in the client\'s shoes), build the tension of the problem, introduce the turning point (our engagement), reveal the result, and connect it to the reader\'s situation. Under 350 words. CTA at end. Case study: [PASTE].')

  sectionTitle(doc, 'DATA & STATISTICS REPURPOSING')
  promptItem(doc, 'Stat → Social Post Series', 'I have this data point or statistic: "[STAT]". Create 4 social posts around it for 4 different platforms: (1) LinkedIn (analytical, professional angle), (2) Instagram caption (visual, relatable), (3) Twitter/X (punchy, opinionated), (4) Facebook (community/discussion angle). Each under platform character limits.')
  promptItem(doc, 'Report → Lead Magnet Outline', 'I have a [REPORT / SURVEY RESULTS / DATA SET] about [TOPIC]. Turn the key findings into a lead magnet outline: title, subtitle, 5-section structure with one key insight per section, a conclusion with implications, and a CTA page. Make it feel like a premium guide, not a data dump. Key data: [PASTE].')

  doc.end()
  console.log('✓ content-repurposing-prompts.pdf')
}

// ─── 27. CLIENT ONBOARDING CHECKLIST ──────────────────────────────────────────
async function generateClientOnboarding() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'client-onboarding-checklist.pdf')))
  header(doc, 'Client Onboarding Checklist', 'First 30 Days Framework — 42 Steps from Contract to First Results', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'Run this checklist for every new client engagement. Assign each item an owner and a due date. A smooth onboarding sets the tone for the entire relationship — first impressions compound.')

  sectionTitle(doc, 'DAY 1 — CONTRACT & ACCESS COLLECTION')
  checkItem(doc, 'Signed contract received and filed securely')
  checkItem(doc, 'Invoice raised and payment confirmed (or payment schedule agreed)')
  checkItem(doc, 'Welcome email sent within 2 hours of contract signing')
  checkItem(doc, 'Client onboarding portal/folder created and shared')
  checkItem(doc, 'Access request form sent (social accounts, Google Analytics, ad accounts, CMS)')
  checkItem(doc, 'NDA signed if required by client or project type')
  checkItem(doc, 'Primary contact and decision-maker confirmed')
  checkItem(doc, 'Emergency/urgent contact details collected')

  sectionTitle(doc, 'DAYS 1–3 — BRAND ASSET COLLECTION')
  checkItem(doc, 'Logo files received (SVG, PNG — all versions)')
  checkItem(doc, 'Brand colours (HEX/RGB/CMYK) confirmed')
  checkItem(doc, 'Brand fonts received or identified')
  checkItem(doc, 'Brand guidelines document received (if exists)')
  checkItem(doc, 'Photography library shared or photo shoot scheduled')
  checkItem(doc, 'Existing content library and previous campaigns transferred')
  checkItem(doc, 'Competitor list collected (names and websites)')

  sectionTitle(doc, 'DAYS 1–5 — PLATFORM ACCESS')
  checkItem(doc, 'Social media account access granted (Instagram, LinkedIn, TikTok, Facebook)')
  checkItem(doc, 'Google Analytics 4 access confirmed (Editor level minimum)')
  checkItem(doc, 'Google Search Console access granted')
  checkItem(doc, 'Google Ads account access granted (if applicable)')
  checkItem(doc, 'Facebook Business Manager and Ad Account access granted')
  checkItem(doc, 'Website CMS access granted (admin level)')
  checkItem(doc, 'Hosting/DNS access details received (if web project)')
  checkItem(doc, 'Email marketing platform access granted')

  newPage(doc, 2)

  sectionTitle(doc, 'DAYS 3–7 — KICK-OFF CALL')
  checkItem(doc, 'Kick-off call scheduled within first week', 'Aim for Day 3–5. Record with permission.')
  checkItem(doc, 'Kick-off agenda sent 24 hours in advance')
  checkItem(doc, 'Business goals and SMART KPIs agreed and documented')
  checkItem(doc, 'Target audience confirmed and validated against our assumptions')
  checkItem(doc, 'Key messaging and value proposition aligned')
  checkItem(doc, 'Existing pain points and previous agency experience discussed')
  checkItem(doc, 'Communication preferences agreed (Slack / email / weekly call)')
  checkItem(doc, 'Reporting format and frequency confirmed')
  checkItem(doc, 'Approval process and turnaround times agreed')
  checkItem(doc, 'First 30-day deliverable plan presented and approved')

  sectionTitle(doc, 'DAYS 7–14 — STRATEGY & BASELINE')
  checkItem(doc, 'Baseline analytics report completed (current performance snapshot)')
  checkItem(doc, 'Competitor analysis completed')
  checkItem(doc, 'Audience research completed (demographics, interests, behaviour)')
  checkItem(doc, 'Strategy document drafted and sent for review')
  checkItem(doc, 'Strategy document approved by client')
  checkItem(doc, 'Content calendar or campaign plan drafted for Month 1')
  checkItem(doc, 'All creative briefs issued to relevant team members')

  sectionTitle(doc, 'DAYS 14–30 — FIRST DELIVERABLES & REPORTING')
  checkItem(doc, 'First piece of deliverable work submitted for approval')
  checkItem(doc, 'Client feedback collected and revisions actioned within agreed SLA')
  checkItem(doc, 'First report scheduled (end of Month 1)')
  checkItem(doc, 'Month 1 performance report sent and walkthrough call booked')
  checkItem(doc, 'Month 2 plan drafted based on early data')
  checkItem(doc, 'Net Promoter Score (NPS) or satisfaction survey sent at Day 30')

  sectionTitle(doc, 'ONGOING — RELATIONSHIP MANAGEMENT')
  checkItem(doc, 'Weekly or fortnightly update email/message sent')
  checkItem(doc, 'Monthly strategy call in diary for the full engagement')
  checkItem(doc, 'Quarterly business review (QBR) scheduled at contract start')
  checkItem(doc, 'Contract renewal reminder set 60 days before end date')

  doc.end()
  console.log('✓ client-onboarding-checklist.pdf')
}

// ─── 28. A/B TESTING FRAMEWORK ────────────────────────────────────────────────
async function generateABTestingFramework() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'ab-testing-framework.pdf')))
  header(doc, 'A/B Testing Framework', 'Test, Measure & Scale — Ads · Landing Pages · Email Campaigns', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'A/B testing removes guesswork from marketing decisions. Use this framework to design valid tests, reach statistical confidence before declaring a winner, and scale what works. One variable per test — always.')

  sectionTitle(doc, 'THE GOLDEN RULES OF A/B TESTING')
  bulletItem(doc, 'Test one variable at a time. Changing two things means you cannot know which caused the result.')
  bulletItem(doc, 'Set your success metric before you run the test, not after.')
  bulletItem(doc, 'Run tests to statistical significance (95% minimum) — not just until one version is ahead.')
  bulletItem(doc, 'Give tests enough time to account for day-of-week variation (minimum 7 days for most tests).')
  bulletItem(doc, 'Document every test and result, even the ones where nothing won — the data compounds.')

  sectionTitle(doc, 'TEST PLANNING TEMPLATE')
  questionItem(doc, 1, 'What are we testing?', 'Describe the specific element: headline copy, CTA button colour, subject line, hero image, etc.')
  questionItem(doc, 2, 'What is our hypothesis?', 'Format: "We believe that changing [X] to [Y] will result in [Z] because [REASON]."')
  questionItem(doc, 3, 'What is the primary success metric?', 'CTR, conversion rate, open rate, revenue per visitor — pick one.')
  questionItem(doc, 4, 'What sample size do we need?', 'Use a significance calculator. Minimum: 1,000 impressions or 100 conversions per variant.')
  questionItem(doc, 5, 'What is our test duration?', 'Minimum 7 days to capture weekly patterns. Maximum 30 days before external factors corrupt data.')
  questionItem(doc, 6, 'Who is in charge of running and reading this test?')

  newPage(doc, 2)

  sectionTitle(doc, 'AD CREATIVE A/B TEST MATRIX')
  bodyText(doc, 'Test elements in this priority order — highest potential impact first:')
  numberedItem(doc, 1, 'Hook / Opening Line', 'The first 3 seconds of a video or the opening line of a static ad. Highest impact element.')
  numberedItem(doc, 2, 'Headline', 'The large text in feed ads. Benefit-led vs. curiosity vs. social proof vs. urgency.')
  numberedItem(doc, 3, 'Visual Format', 'Static image vs. video vs. carousel. Test format before creative within a format.')
  numberedItem(doc, 4, 'Offer Framing', 'Same offer, different presentation: "Save $200" vs. "Get it for $800" vs. "Free for 30 days".')
  numberedItem(doc, 5, 'CTA Copy', '"Book a Call" vs. "Get My Free Quote" vs. "See How It Works".')
  numberedItem(doc, 6, 'Audience Targeting', 'Only test one audience variable at a time — interest vs. lookalike, broad vs. narrow.')

  sectionTitle(doc, 'LANDING PAGE TEST PRIORITY GUIDE')
  numberedItem(doc, 1, 'Headline', 'The most-read element on any page. Tests here yield the fastest results.')
  numberedItem(doc, 2, 'Hero Image or Video', 'Product/service imagery vs. lifestyle vs. results-focused.')
  numberedItem(doc, 3, 'CTA Button — Copy & Position', '"Get Started" vs. "Book Free Call". Above fold vs. below first section.')
  numberedItem(doc, 4, 'Social Proof Placement', 'Reviews/logos above fold vs. after the offer vs. near the CTA.')
  numberedItem(doc, 5, 'Form Length', 'Fewer fields almost always increases submission rate — test aggressively.')
  numberedItem(doc, 6, 'Pricing Presentation', 'Monthly vs. annual vs. per-day pricing framing.')

  sectionTitle(doc, 'EMAIL A/B TEST PRIORITIES')
  numberedItem(doc, 1, 'Subject Line', 'Test before every major campaign. 5–10% open rate difference is common.')
  numberedItem(doc, 2, 'Send Time', 'Tuesday–Thursday 8–10am vs. other windows. Test on your specific list.')
  numberedItem(doc, 3, 'From Name', '"Company Name" vs. "FirstName at Company" vs. first name only.')
  numberedItem(doc, 4, 'Email Length', 'Short (150 words) vs. long (400+ words) for the same offer.')
  numberedItem(doc, 5, 'CTA Style', 'Text link vs. button. One CTA vs. multiple CTAs.')

  sectionTitle(doc, 'RESULTS DOCUMENTATION')
  infoBox(doc, 'Test Name', '')
  infoBox(doc, 'Start Date', '')
  infoBox(doc, 'End Date', '')
  infoBox(doc, 'Variant A Result', '')
  infoBox(doc, 'Variant B Result', '')
  infoBox(doc, 'Winner', '')
  infoBox(doc, 'Statistical Confidence', '')
  infoBox(doc, 'Next Test Hypothesis', '')

  doc.end()
  console.log('✓ ab-testing-framework.pdf')
}

async function generateGA4Checklist() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'ga4-event-tracking-checklist.pdf')))
  header(doc, 'GA4 Event Tracking Checklist', 'Conversion Setup Guide — The Events Every Business Website Needs', 'SEO & PPC')
  footer(doc, 1)

  bodyText(doc, 'Most GA4 installs track pageviews and nothing else. Without conversion events you cannot attribute revenue, optimise paid campaigns on real outcomes, or know which channels generate leads. Run this checklist on any GA4 property to bring it up to standard.')

  sectionTitle(doc, 'FOUNDATION CHECKS')
  checkItem(doc, 'GA4 property created and linked to the correct website data stream')
  checkItem(doc, 'Google Tag Manager container installed on every page (verify with Tag Assistant)')
  checkItem(doc, 'Internal traffic filter configured (office + team IP addresses excluded)')
  checkItem(doc, 'Google Signals and data retention set to 14 months (maximum)')
  checkItem(doc, 'Search Console linked to the GA4 property')
  checkItem(doc, 'Google Ads account linked (if running paid search)')

  sectionTitle(doc, 'EVENT 1 — FORM SUBMISSIONS')
  checkItem(doc, 'Every contact, lead, booking, and newsletter form fires an event on successful submission', 'Use the Google-recommended event name "generate_lead" for automatic Google Ads integration.')
  checkItem(doc, 'Event captures form type and page URL as parameters')
  checkItem(doc, 'Event marked as a key event (conversion) in GA4 admin')
  checkItem(doc, 'Thank-you page views tracked as a backup conversion signal')

  sectionTitle(doc, 'EVENT 2 — PHONE NUMBER CLICKS')
  checkItem(doc, 'All phone numbers rendered as clickable tel: links on mobile')
  checkItem(doc, 'Click event fires on every tel: link (GTM click trigger on "tel:" links)')
  checkItem(doc, 'Marked as a key event for businesses where calls are a primary conversion path')

  newPage(doc, 2)

  sectionTitle(doc, 'EVENT 3 — BOOKING WIDGET INTERACTIONS')
  checkItem(doc, 'Calendly / booking widget postMessage events captured via GTM custom listener', 'Without this, bookings made in embedded widgets are invisible to GA4.')
  checkItem(doc, 'Booking-completed event marked as a key event')
  checkItem(doc, 'Outbound clicks to external booking pages tracked as conversions')

  sectionTitle(doc, 'EVENT 4 — SCROLL DEPTH')
  checkItem(doc, 'Custom scroll events at 25%, 50%, and 75% on key pages', 'GA4\'s automatic 90% threshold fires too late to be useful for drop-off analysis.')
  checkItem(doc, 'Scroll data reviewed monthly to prioritise CRO work')

  sectionTitle(doc, 'EVENT 5 — OUTBOUND LINK CLICKS')
  checkItem(doc, 'Clicks to WhatsApp, Calendly, payment platforms, and social profiles tracked')
  checkItem(doc, 'High-intent outbound clicks (booking, payment) marked as key events')

  sectionTitle(doc, 'VERIFICATION — NEVER SKIP')
  numberedItem(doc, 1, 'Enable DebugView', 'Install Google Tag Assistant, enable debug mode, and open GA4 DebugView.')
  numberedItem(doc, 2, 'Fire every event manually', 'Submit each form, click each phone number, complete a test booking.')
  numberedItem(doc, 3, 'Confirm parameters', 'Check each event arrives with the expected parameters attached.')
  numberedItem(doc, 4, 'Wait 24–48 hours', 'Verify events appear in standard reports. If they show in DebugView but not reports, the GTM trigger has a configuration issue.')
  numberedItem(doc, 5, 'Import conversions to Google Ads', 'Map key events to Google Ads conversions so campaigns optimise on real outcomes.')

  doc.end()
  console.log('✓ ga4-event-tracking-checklist.pdf')
}

async function generateAgencyScorecard() {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 140, bottom: 50, left: 40, right: 40 } })
  doc.pipe(createWriteStream(join(OUT, 'agency-vetting-scorecard.pdf')))
  header(doc, 'Agency Vetting Scorecard', '25-Question Evaluation Tool — Score Any Agency Before You Sign', 'Strategy')
  footer(doc, 1)

  bodyText(doc, 'The wrong agency costs you budget, momentum, and six months you cannot get back. Score each agency you are evaluating on the questions below (0 = red flag, 1 = weak, 2 = acceptable, 3 = strong), then compare totals. Any single red-flag trigger should end the conversation regardless of total score.')

  sectionTitle(doc, 'SECTION A — THE TEAM (score each 0–3)')
  questionItem(doc, 1, 'Who specifically will work on our account, and what is their experience?', 'Red flag: they cannot or will not name the actual team members.')
  questionItem(doc, 2, 'How many accounts does each strategist manage at once?', 'Red flag: more than 10–12 accounts per strategist.')
  questionItem(doc, 3, 'Will we speak to the people doing the work, or only an account manager?')
  questionItem(doc, 4, 'What happens if our main contact leaves the agency?')
  questionItem(doc, 5, 'Are specialists in-house or subcontracted?')

  newPage(doc, 2)

  sectionTitle(doc, 'SECTION B — PROOF (score each 0–3)')
  questionItem(doc, 6, 'Can you show case studies from clients in or near our industry?', 'Red flag: no case studies with real performance numbers.')
  questionItem(doc, 7, 'Can we speak to two current clients as references?')
  questionItem(doc, 8, 'What results did your last three clients in our budget range achieve?')
  questionItem(doc, 9, 'Can you show work you consider a failure, and what you learned?', 'Strong agencies answer this honestly. Evasion is a signal.')
  questionItem(doc, 10, 'How long does your average client stay with you?', 'Red flag: average retention under 12 months.')

  sectionTitle(doc, 'SECTION C — PROCESS (score each 0–3)')
  questionItem(doc, 11, 'What does your discovery process look like before strategy is set?', 'Red flag: guaranteed results promised before any discovery.')
  questionItem(doc, 12, 'What happens in the first 30 days of the engagement?')
  questionItem(doc, 13, 'How do you decide what to prioritise each month?')
  questionItem(doc, 14, 'Who owns the ad accounts, analytics, and creative assets?', 'Red flag: the agency owns accounts you would lose on exit.')
  questionItem(doc, 15, 'How do you handle a strategy that is not working?')

  newPage(doc, 3)

  sectionTitle(doc, 'SECTION D — REPORTING (score each 0–3)')
  questionItem(doc, 16, 'What metrics do you report on, and how often?', 'Red flag: reports built on impressions and reach with no revenue or lead metrics.')
  questionItem(doc, 17, 'Can we see a sample monthly report?')
  questionItem(doc, 18, 'Do we get live dashboard access or only monthly PDFs?')
  questionItem(doc, 19, 'How do you attribute leads and sales to your work?')
  questionItem(doc, 20, 'What does "success" look like at 90 days? At 12 months?')

  sectionTitle(doc, 'SECTION E — CONTRACT TERMS (score each 0–3)')
  questionItem(doc, 21, 'What is the minimum contract length?', 'Red flag: 12-month lock-in with no performance clause.')
  questionItem(doc, 22, 'What is the notice period to exit, and what do we keep?')
  questionItem(doc, 23, 'Are there performance clauses or guarantees, and what triggers them?')
  questionItem(doc, 24, 'What is NOT included in the quoted retainer?', 'Red flag: vague scope that invites surprise invoices.')
  questionItem(doc, 25, 'What do you need from us to succeed?', 'Strong agencies have clear client-side requirements. "Nothing, we handle everything" is a sales line.')

  sectionTitle(doc, 'SCORING GUIDE')
  numberedItem(doc, 1, '60–75 points', 'Strong candidate. Check references, then negotiate terms.')
  numberedItem(doc, 2, '45–59 points', 'Possible fit with reservations. Revisit the weak sections before deciding.')
  numberedItem(doc, 3, 'Below 45 points', 'Walk away. The gaps will surface as problems within the first quarter.')
  numberedItem(doc, 4, 'Any red flag', 'End the conversation regardless of total score.')

  sectionTitle(doc, 'COMPARISON SHEET')
  infoBox(doc, 'Agency 1 — Name / Total Score', '')
  infoBox(doc, 'Agency 2 — Name / Total Score', '')
  infoBox(doc, 'Agency 3 — Name / Total Score', '')
  infoBox(doc, 'Red Flags Noted', '')
  infoBox(doc, 'Decision & Date', '')

  doc.end()
  console.log('✓ agency-vetting-scorecard.pdf')
}

// Run all
await generateWebsiteAudit()
await generateSocialCalendar()
await generateBrandQuestionnaire()
await generateSEOGuide()
await generateVideoBrief()
await generateROICalculator()
await generateWebsiteDesignBrief()
await generatePreLaunchChecklist()
await generateReelsScripts()
await generateLinkedInPlaybook()
await generateBrandVoice()
await generateCompetitorAudit()
await generateGoogleAdsChecklist()
await generateLocalSEO()
await generateYouTubeGuide()
await generatePhotoBrief()
await generatePersonaWorkbook()
await generateBudgetPlanner()
await generateEmailPlaybook()
await generate90DayPlan()
await generateSocialCaptionPrompts()
await generateSEOContentPrompts()
await generateAdCopyPrompts()
await generateEmailCampaignPrompts()
await generateBrandStrategyPrompts()
await generateRepurposingPrompts()
await generateClientOnboarding()
await generateABTestingFramework()
await generateGA4Checklist()
await generateAgencyScorecard()
console.log('\nAll 30 PDFs generated in public/downloads/')
