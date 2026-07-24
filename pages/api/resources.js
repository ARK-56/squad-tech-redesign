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
  'core-web-vitals-optimization-guide': {
    title: 'Core Web Vitals Optimization Guide',
    subtitle: 'LCP, INP & CLS Playbook',
    category: 'Web Development',
    description: 'The exact process we follow to take a failing site to 95+ Lighthouse. Covers every Core Web Vital with the specific fix for each common failure, in priority order.',
    highlights: [
      'LCP diagnosis: which element is actually largest',
      'INP fixes for heavy JavaScript main threads',
      'CLS elimination via dimension reservation',
      'Image and font loading priority rules',
      'Field vs lab data — which to trust when',
    ],
    file: 'core-web-vitals-optimization-guide.pdf',
  },
  'website-migration-checklist': {
    title: 'Website Migration Checklist',
    subtitle: '62-Point Zero-Downtime Guide',
    category: 'Web Development',
    description: 'Migrations are where traffic goes to die. This is the checklist we run on every replatform to protect rankings, redirects, and revenue through the switch.',
    highlights: [
      'Full URL inventory and redirect mapping',
      'Metadata and structured data parity checks',
      'DNS, SSL, and TTL sequencing',
      'Analytics continuity and event parity',
      'Post-launch monitoring windows',
    ],
    file: 'website-migration-checklist.pdf',
  },
  'accessibility-wcag-audit-checklist': {
    title: 'Accessibility (WCAG) Audit Checklist',
    subtitle: 'WCAG 2.2 AA Essentials',
    category: 'Web Development',
    description: 'A practical WCAG 2.2 AA checklist written for teams shipping real websites — not a legal document. Covers the issues that cause 80% of real-world failures.',
    highlights: [
      'Colour contrast ratios and how to test them',
      'Keyboard navigation and focus order',
      'Form labelling and error messaging',
      'Alt text decision tree',
      'Screen reader landmarks and headings',
    ],
    file: 'accessibility-wcag-audit-checklist.pdf',
  },
  'ecommerce-product-page-checklist': {
    title: 'E-Commerce Product Page Checklist',
    subtitle: '38-Point Conversion Audit',
    category: 'Web Development',
    description: 'The product page is where e-commerce revenue is won or lost. This checklist covers every element that measurably moves add-to-cart rate.',
    highlights: [
      'Image count, angles, and zoom requirements',
      'Above-the-fold trust and urgency elements',
      'Shipping and returns clarity',
      'Review presentation and social proof',
      'Cross-sell and bundle placement',
    ],
    file: 'ecommerce-product-page-checklist.pdf',
  },
  'website-copy-framework': {
    title: 'Website Copy Framework',
    subtitle: 'Page-by-Page Templates',
    category: 'Web Development',
    description: 'Fill-in-the-blank copy structures for every core page: home, services, about, pricing, and contact — built on the messaging patterns that convert.',
    highlights: [
      'Hero formula: outcome, proof, action',
      'Service page structure that pre-sells',
      'About page that builds trust, not ego',
      'Pricing page objection handling',
      'CTA copy bank with 30 variants',
    ],
    file: 'website-copy-framework.pdf',
  },
  'wordpress-security-hardening-checklist': {
    title: 'WordPress Security Hardening Checklist',
    subtitle: '41-Point Lockdown',
    category: 'Web Development',
    description: 'WordPress powers 40% of the web and attracts a proportional share of attacks. This is the hardening checklist we apply to every site we inherit.',
    highlights: [
      'Plugin and theme audit methodology',
      'User role and credential policy',
      'File permission and config hardening',
      'Backup and recovery verification',
      'Monitoring and alerting setup',
    ],
    file: 'wordpress-security-hardening-checklist.pdf',
  },
  'tiktok-growth-playbook': {
    title: 'TikTok Growth Playbook',
    subtitle: '0 to 10K Framework',
    category: 'Social Media',
    description: 'The content system we use to grow brand TikTok accounts from zero. Hook formulas, posting cadence, and the metrics that actually predict reach.',
    highlights: [
      '12 hook formulas with examples',
      'Optimal posting cadence by account stage',
      'Watch-time and completion benchmarks',
      'Trend adaptation without losing brand voice',
      'Comment strategy that compounds reach',
    ],
    file: 'tiktok-growth-playbook.pdf',
  },
  'social-media-crisis-plan': {
    title: 'Social Media Crisis Response Plan',
    subtitle: 'Template & Escalation Tree',
    category: 'Social Media',
    description: 'A pre-written crisis plan you can adapt in an afternoon — severity tiers, holding statements, escalation paths, and post-incident review.',
    highlights: [
      'Three-tier severity classification',
      'Pre-approved holding statements',
      'Escalation contact tree',
      'Do-not-engage criteria',
      'Post-incident review format',
    ],
    file: 'social-media-crisis-plan.pdf',
  },
  'ugc-creator-brief-template': {
    title: 'UGC Creator Brief Template',
    subtitle: 'Brief, Rates & Usage Rights',
    category: 'Social Media',
    description: 'The brief we send creators to get usable content on the first attempt — including deliverable specs, usage rights language, and rate benchmarks.',
    highlights: [
      'Deliverable specs by platform',
      'Hook and talking-point direction',
      'Usage rights and whitelisting language',
      'Rate benchmark table',
      'Revision and approval process',
    ],
    file: 'ugc-creator-brief-template.pdf',
  },
  'community-management-playbook': {
    title: 'Community Management Playbook',
    subtitle: 'Response Framework & Macros',
    category: 'Social Media',
    description: 'How to turn comments and DMs into pipeline: response time targets, tone rules, escalation criteria, and 40 reusable reply macros.',
    highlights: [
      'Response time targets by channel',
      'Tone of voice decision rules',
      '40 reusable reply macros',
      'Lead qualification in the DMs',
      'Escalation criteria and handoffs',
    ],
    file: 'community-management-playbook.pdf',
  },
  'hashtag-keyword-research-workbook': {
    title: 'Social Keyword & Hashtag Workbook',
    subtitle: 'Search-First Social Framework',
    category: 'Social Media',
    description: 'Social platforms are search engines now. This workbook maps the keyword research process onto Instagram, TikTok, and LinkedIn discovery.',
    highlights: [
      'Platform-by-platform search behaviour',
      'Keyword placement priority order',
      'Hashtag tiering by volume',
      'Competitor discovery audit',
      'Tracking template for term performance',
    ],
    file: 'hashtag-keyword-research-workbook.pdf',
  },
  'instagram-story-sequence-templates': {
    title: 'Instagram Story Sequence Templates',
    subtitle: '15 Proven Sequences',
    category: 'Social Media',
    description: 'Fifteen story sequences engineered for completion and reply rate — launches, social proof, behind the scenes, polls, and direct offers.',
    highlights: [
      '15 frame-by-frame sequences',
      'Poll and question sticker placement',
      'Completion rate benchmarks',
      'Swipe-up / link sticker timing',
      'Highlight organisation strategy',
    ],
    file: 'instagram-story-sequence-templates.pdf',
  },
  'technical-seo-audit-checklist': {
    title: 'Technical SEO Audit Checklist',
    subtitle: '58-Point Crawl Audit',
    category: 'SEO & PPC',
    description: 'The full technical audit we run before touching content — indexation, crawl budget, structured data, and the errors that silently suppress rankings.',
    highlights: [
      'Indexation and coverage diagnosis',
      'Canonical and duplicate resolution',
      'Structured data validation',
      'Internal linking depth analysis',
      'Log file crawl budget review',
    ],
    file: 'technical-seo-audit-checklist.pdf',
  },
  'google-business-profile-optimization': {
    title: 'Google Business Profile Optimization Guide',
    subtitle: 'Local Map Pack Playbook',
    category: 'SEO & PPC',
    description: 'For any business with a location or service area, the profile often outranks the website. This is the full optimisation and review-velocity playbook.',
    highlights: [
      'Category selection strategy',
      'Review velocity and response templates',
      'Photo cadence and geotagging',
      'Q&A seeding methodology',
      'Local citation consistency audit',
    ],
    file: 'google-business-profile-optimization.pdf',
  },
  'link-building-outreach-templates': {
    title: 'Link Building Outreach Templates',
    subtitle: '18 Email Sequences',
    category: 'SEO & PPC',
    description: 'Eighteen outreach templates that get replies — broken link building, digital PR, resource pages, and expert commentary, plus follow-up cadence.',
    highlights: [
      '18 templates across 6 link types',
      'Subject lines with reply-rate data',
      'Follow-up cadence that is not annoying',
      'Prospect qualification criteria',
      'Red flags for toxic link sources',
    ],
    file: 'link-building-outreach-templates.pdf',
  },
  'ppc-negative-keyword-starter-list': {
    title: 'PPC Negative Keyword Starter List',
    subtitle: '600+ Terms by Industry',
    category: 'SEO & PPC',
    description: 'Over 600 negative keywords grouped by intent and industry — the fastest way to stop wasting spend on searches that will never convert.',
    highlights: [
      '600+ terms across 9 industries',
      'Universal job-seeker and DIY negatives',
      'Match type guidance for negatives',
      'Search term review cadence',
      'Account vs campaign level structure',
    ],
    file: 'ppc-negative-keyword-starter-list.pdf',
  },
  'seo-content-brief-template': {
    title: 'SEO Content Brief Template',
    subtitle: 'Writer-Ready Brief',
    category: 'SEO & PPC',
    description: 'The brief we hand writers so the first draft ranks — search intent, entity coverage, internal links, and the questions the page must answer.',
    highlights: [
      'Search intent classification',
      'Required entity and subtopic coverage',
      'SERP feature targeting',
      'Internal link requirements',
      'Word count guidance from live SERPs',
    ],
    file: 'seo-content-brief-template.pdf',
  },
  'seo-reporting-dashboard-template': {
    title: 'SEO Reporting Dashboard Template',
    subtitle: 'Client-Ready Monthly Report',
    category: 'SEO & PPC',
    description: 'The monthly reporting structure we send clients — metrics that map to revenue, commentary prompts, and the vanity numbers to leave out.',
    highlights: [
      'Metric hierarchy: revenue first',
      'Commentary prompts for each section',
      'Rank tracking that avoids cherry-picking',
      'Attribution caveats stated plainly',
      'Next-month priorities format',
    ],
    file: 'seo-reporting-dashboard-template.pdf',
  },
  'logo-design-brief-template': {
    title: 'Logo Design Brief Template',
    subtitle: 'Designer-Ready Brief',
    category: 'Branding',
    description: 'The brief we complete before any logo concept is drawn — positioning, audience, competitive landscape, and the practical constraints designers need.',
    highlights: [
      'Positioning and personality definition',
      'Competitive visual landscape audit',
      'Application and constraint inventory',
      'Approval process and stakeholder map',
      'Feedback rubric that avoids taste debates',
    ],
    file: 'logo-design-brief-template.pdf',
  },
  'brand-naming-workbook': {
    title: 'Brand Naming Workbook',
    subtitle: 'Generation to Trademark',
    category: 'Branding',
    description: 'A structured naming process — generation techniques, screening criteria, linguistic checks, and the availability searches to run before you fall in love.',
    highlights: [
      'Six name generation techniques',
      'Screening scorecard',
      'Linguistic and cultural checks',
      'Domain and trademark search order',
      'Shortlist testing method',
    ],
    file: 'brand-naming-workbook.pdf',
  },
  'color-accessibility-guide': {
    title: 'Brand Colour & Accessibility Guide',
    subtitle: 'Contrast-Safe Palettes',
    category: 'Branding',
    description: 'How to build a brand palette that survives contact with real interfaces — contrast ratios, semantic colour roles, and dark mode planning.',
    highlights: [
      'Contrast requirements by use case',
      'Semantic colour role definitions',
      'Dark mode palette derivation',
      'Colour blindness verification',
      'Tint and shade scale construction',
    ],
    file: 'color-accessibility-guide.pdf',
  },
  'rebrand-rollout-checklist': {
    title: 'Rebrand Rollout Checklist',
    subtitle: '74-Point Launch Plan',
    category: 'Branding',
    description: 'Every asset, channel, and system that needs updating when a brand changes — sequenced so nothing launches half-rebranded.',
    highlights: [
      'Complete asset inventory by department',
      'Sequencing to avoid mixed-brand exposure',
      'Internal comms and training plan',
      'SEO and redirect considerations',
      'Post-launch audit sweep',
    ],
    file: 'rebrand-rollout-checklist.pdf',
  },
  'brand-messaging-hierarchy': {
    title: 'Brand Messaging Hierarchy Template',
    subtitle: 'Positioning to Proof',
    category: 'Branding',
    description: 'A single page that aligns every team on what the brand says — positioning statement, pillars, proof points, and the language to avoid.',
    highlights: [
      'Positioning statement formula',
      'Three-pillar message architecture',
      'Proof point requirements',
      'Audience-specific variations',
      'Banned words and claims list',
    ],
    file: 'brand-messaging-hierarchy.pdf',
  },
  'video-shot-list-template': {
    title: 'Video Shot List & Call Sheet Template',
    subtitle: 'Pre-Production Pack',
    category: 'Media Production',
    description: 'The shot list, call sheet, and equipment checklist we use on every shoot — so nothing is discovered missing on location.',
    highlights: [
      'Shot list with coverage columns',
      'Call sheet with contacts and timings',
      'Equipment and backup checklist',
      'Location recce questions',
      'Continuity tracking sheet',
    ],
    file: 'video-shot-list-template.pdf',
  },
  'podcast-launch-checklist': {
    title: 'Podcast Launch Checklist',
    subtitle: '48-Point Launch Plan',
    category: 'Media Production',
    description: 'Everything required to launch a branded podcast properly — format definition, audio chain, distribution setup, and the launch-week sequence.',
    highlights: [
      'Format and episode structure decisions',
      'Recording chain and room treatment',
      'Distribution and RSS setup',
      'Launch-week episode strategy',
      'Repurposing workflow',
    ],
    file: 'podcast-launch-checklist.pdf',
  },
  'product-photography-shot-guide': {
    title: 'Product Photography Shot Guide',
    subtitle: 'E-Commerce Shot Framework',
    category: 'Media Production',
    description: 'The shot framework that fills a product page properly — angles, scale references, lifestyle context, and the technical specs marketplaces require.',
    highlights: [
      'Required angle checklist per product',
      'Scale and detail shot techniques',
      'Lifestyle context planning',
      'Marketplace technical specs',
      'Consistency rules across a catalogue',
    ],
    file: 'product-photography-shot-guide.pdf',
  },
  'testimonial-video-question-bank': {
    title: 'Testimonial Video Question Bank',
    subtitle: '45 Questions That Get Real Answers',
    category: 'Media Production',
    description: 'Forty-five interview questions engineered to produce usable, specific testimonial soundbites instead of vague praise.',
    highlights: [
      '45 questions across the customer journey',
      'Follow-up prompts for thin answers',
      'Questions that surface specific numbers',
      'Release and consent guidance',
      'Editing for authenticity',
    ],
    file: 'testimonial-video-question-bank.pdf',
  },
  'motion-graphics-style-guide': {
    title: 'Motion Graphics Style Guide Template',
    subtitle: 'Brand in Motion',
    category: 'Media Production',
    description: 'Extend a static brand into motion — timing curves, transition rules, lower-third specs, and logo animation constraints.',
    highlights: [
      'Easing and duration standards',
      'Lower-third and caption specs',
      'Logo animation do and do-not',
      'Transition vocabulary',
      'Export presets by platform',
    ],
    file: 'motion-graphics-style-guide.pdf',
  },
  'marketing-funnel-audit': {
    title: 'Marketing Funnel Audit Framework',
    subtitle: 'Find the Leak',
    category: 'Strategy',
    description: 'A stage-by-stage diagnostic to find where your funnel actually leaks — with benchmark ranges and the fix for each failure mode.',
    highlights: [
      'Stage-by-stage conversion benchmarks',
      'Leak diagnosis decision tree',
      'Fix priority by effort and impact',
      'Measurement gaps checklist',
      'Quick-win identification',
    ],
    file: 'marketing-funnel-audit.pdf',
  },
  'competitor-analysis-framework': {
    title: 'Competitor Analysis Framework',
    subtitle: 'Positioning & Gap Audit',
    category: 'Strategy',
    description: 'A structured competitive audit covering positioning, pricing, channels, content, and the gaps you can credibly own.',
    highlights: [
      'Direct vs indirect competitor mapping',
      'Positioning grid construction',
      'Channel and content gap analysis',
      'Pricing and packaging comparison',
      'Opportunity scoring matrix',
    ],
    file: 'competitor-analysis-framework.pdf',
  },
  'pricing-strategy-workbook': {
    title: 'Pricing & Packaging Workbook',
    subtitle: 'Value-Based Pricing',
    category: 'Strategy',
    description: 'Move from cost-plus guessing to value-based pricing — willingness-to-pay research, tier construction, and a price-increase playbook.',
    highlights: [
      'Willingness-to-pay research methods',
      'Three-tier packaging principles',
      'Value metric selection',
      'Discounting policy framework',
      'Price increase communication plan',
    ],
    file: 'pricing-strategy-workbook.pdf',
  },
  'customer-journey-map-template': {
    title: 'Customer Journey Map Template',
    subtitle: 'Touchpoint & Emotion Mapping',
    category: 'Strategy',
    description: 'Map what customers actually do, feel, and need at every stage — and find the moments where you are losing them.',
    highlights: [
      'Stage definition by customer behaviour',
      'Touchpoint and channel inventory',
      'Emotion and friction plotting',
      'Evidence requirements per stage',
      'Intervention prioritisation',
    ],
    file: 'customer-journey-map-template.pdf',
  },
  'marketing-okr-template': {
    title: 'Marketing OKR Template',
    subtitle: 'Quarterly Planning Pack',
    category: 'Strategy',
    description: 'Set marketing objectives that survive contact with reality — with key result formulas, scoring rubric, and a weekly check-in structure.',
    highlights: [
      'Objective vs key result distinction',
      'Key result formulas that avoid vanity',
      'Scoring rubric and grading',
      'Weekly check-in agenda',
      'End-of-quarter retrospective format',
    ],
    file: 'marketing-okr-template.pdf',
  },
  'churn-reduction-playbook': {
    title: 'Churn Reduction Playbook',
    subtitle: 'Retention Diagnostics',
    category: 'Strategy',
    description: 'Diagnose why customers leave and intervene before they do — churn segmentation, early warning signals, and win-back sequences.',
    highlights: [
      'Churn measurement done correctly',
      'Early warning signal identification',
      'Save-offer decision framework',
      'Exit interview question set',
      'Win-back sequence templates',
    ],
    file: 'churn-reduction-playbook.pdf',
  },
  'lead-scoring-framework': {
    title: 'Lead Scoring Framework',
    subtitle: 'Fit + Intent Model',
    category: 'Strategy',
    description: 'Build a lead scoring model sales will actually trust — fit and intent scored separately, with thresholds, decay rules, and a review cadence.',
    highlights: [
      'Fit vs intent scored independently',
      'Attribute weighting methodology',
      'Score decay and recency rules',
      'MQL threshold calibration',
      'Sales feedback loop design',
    ],
    file: 'lead-scoring-framework.pdf',
  },
  'seo-content-ai-prompts': {
    title: 'SEO Content AI Prompt Pack',
    subtitle: '40 Prompts',
    category: 'AI Prompts',
    description: 'Forty prompts for research, briefing, outlining, and optimising SEO content — written to produce usable output rather than generic filler.',
    highlights: [
      '40 prompts across the content workflow',
      'Role and constraint patterns that work',
      'Prompts for entity and gap analysis',
      'Editing prompts that remove AI tells',
      'Guidance on what not to delegate',
    ],
    file: 'seo-content-ai-prompts.pdf',
  },
  'landing-page-copy-ai-prompts': {
    title: 'Landing Page Copy AI Prompt Pack',
    subtitle: '32 Prompts',
    category: 'AI Prompts',
    description: 'Thirty-two prompts for headlines, value propositions, objection handling, and CTA variants — structured for A/B testable output.',
    highlights: [
      '32 prompts across page sections',
      'Headline variation generators',
      'Objection-handling prompts',
      'CTA microcopy variants',
      'Voice-matching technique',
    ],
    file: 'landing-page-copy-ai-prompts.pdf',
  },
  'customer-research-ai-prompts': {
    title: 'Customer Research AI Prompt Pack',
    subtitle: '28 Prompts',
    category: 'AI Prompts',
    description: 'Twenty-eight prompts for synthesising interviews, reviews, and support tickets into positioning insight — without inventing findings.',
    highlights: [
      '28 prompts for qualitative synthesis',
      'Review mining and theme extraction',
      'Jobs-to-be-done formulation',
      'Interview guide generation',
      'Anti-hallucination constraints',
    ],
    file: 'customer-research-ai-prompts.pdf',
  },
  'video-script-ai-prompts': {
    title: 'Video Script AI Prompt Pack',
    subtitle: '26 Prompts',
    category: 'AI Prompts',
    description: 'Twenty-six prompts for hooks, short-form scripts, VSLs, and repurposing long-form content into platform-native cuts.',
    highlights: [
      '26 prompts for script development',
      'Hook generation with pattern variety',
      'Shot-cue integrated formatting',
      'Long-form repurposing prompts',
      'Spoken-rhythm editing prompts',
    ],
    file: 'video-script-ai-prompts.pdf',
  },
  'analytics-reporting-ai-prompts': {
    title: 'Analytics & Reporting AI Prompt Pack',
    subtitle: '24 Prompts',
    category: 'AI Prompts',
    description: 'Twenty-four prompts for turning raw analytics exports into commentary, hypotheses, and client-ready narrative — with accuracy guardrails.',
    highlights: [
      '24 prompts for analysis and narrative',
      'Anomaly explanation frameworks',
      'Hypothesis generation from data',
      'Client-ready commentary prompts',
      'Guardrails against false causation',
    ],
    file: 'analytics-reporting-ai-prompts.pdf',
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
