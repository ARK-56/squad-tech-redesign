// ─────────────────────────────────────────────────────────────────────────────
// Theme Directory data
//
// ⚠️ BEFORE LAUNCH — two things in this file are PLACEHOLDERS:
//
// 1. `affiliateUrl` currently points at the theme's public marketplace page.
//    Replace each with your affiliate-tagged link (Envato/Impact for
//    ThemeForest, Shopify affiliate links, etc.). The component already
//    renders every one with rel="sponsored nofollow noopener".
//
// 2. `review`, `pros`, `cons` are editorial drafts based on each theme's
//    widely known characteristics. Google's review-system guidelines reward
//    evidence of HANDS-ON use — before indexing this page, have the dev team
//    install each theme, verify/rewrite the notes, and fill `measured` with
//    real numbers (Lighthouse mobile score, page weight on the demo home).
//    Themes nobody has actually used should be removed, not published.
//
// `measured` values of null are hidden in the UI.
// ─────────────────────────────────────────────────────────────────────────────

export const themeCategories = {
  'squadtech-originals': {
    own: true,
    name: 'Themes Built by Squad Tech',
    short: 'Our Originals',
    eyebrow: 'DESIGNED & CODED IN-HOUSE',
    headline: 'Original Themes Built by Our Team',
    subheadline: 'Hand-coded HTML/CSS/JS themes designed and built by our developers — no page builders, no plugin bloat, no licence fees. Every one has a live demo you can click through right now.',
    intro: 'These aren\'t marketplace themes we reviewed — they\'re sites our team designed and built from scratch. Each one can be rebranded, restructured, and launched for your business, and you see your customised version before you pay anything.',
  },
  'wordpress-ecommerce': {
    name: 'WordPress E-Commerce Themes',
    short: 'E-Commerce',
    eyebrow: 'CURATED BY OUR DEV TEAM',
    headline: 'The Best WordPress E-Commerce Themes',
    subheadline: 'Hand-reviewed WooCommerce themes from an agency that has built 200+ sites — what each one is genuinely good at, where it fights you, and who should buy it.',
    intro: 'Every theme below has been evaluated by our development team against the things that actually matter in production: real page speed (not the demo\'s cached numbers), code quality when you need to customise, checkout UX, and how it behaves once you load it with real products. Prices are the marketplace\'s at the time of review and may change.',
  },
  'portfolio-agency': {
    name: 'Portfolio & Agency Themes',
    short: 'Portfolio & Agency',
    eyebrow: 'CURATED BY OUR DEV TEAM',
    headline: 'The Best Portfolio & Agency WordPress Themes',
    subheadline: 'Themes for creatives, studios, and agencies — reviewed for design flexibility, animation performance, and how much of the demo polish survives contact with your real content.',
    intro: 'Portfolio themes live and die on two things: how good YOUR work looks in them (not the demo\'s stock photography), and whether the animations that sold you hold 60fps on a mid-range phone. Those are the lenses we review through. Prices are the marketplace\'s at the time of review and may change.',
  },
}

export const themes = [
  // ── Squad Tech Originals (built in-house) ─────────────────────────────────
  {
    slug: 'aaa-dme',
    category: 'squadtech-originals',
    own: true,
    name: 'AAA DME',
    platform: 'Hand-coded HTML / CSS / JS',
    marketplace: 'Squad Tech Solution',
    price: 'Free first build',
    builder: 'None — clean custom code',
    bestFor: 'Medical equipment suppliers and healthcare e-commerce with insurance workflows',
    demoUrl: 'https://aaa-dme.vercel.app',
    affiliateUrl: 'https://aaa-dme.vercel.app',
    review: [
      'AAA DME is a healthcare storefront we built for the durable medical equipment space — a niche where trust matters more than flash. The homepage is structured around removing purchase anxiety: insurance guidance, a step-by-step process section, nationwide coverage messaging, and category-led navigation into featured products.',
      'Because it\'s hand-coded with no theme framework underneath, there\'s nothing to slow it down and nothing to licence. For any supplier selling regulated or insurance-adjacent products, the trust-first page structure transfers directly.',
    ],
    pros: [
      'Trust-focused layout built for regulated/insurance-heavy products',
      'Category and featured-product architecture ready for a real catalogue',
      'No theme framework or plugin stack — nothing to update or licence',
    ],
    cons: [
      'Static build — content edits need a developer (we can wire up a CMS)',
      'Checkout/payments are integrated per client, not pre-bundled',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'atlas-automotive',
    category: 'squadtech-originals',
    own: true,
    name: 'Atlas Automotive',
    platform: 'Hand-coded HTML / CSS / JS',
    marketplace: 'Squad Tech Solution',
    price: 'Free first build',
    builder: 'None — clean custom code',
    bestFor: 'Auto parts retailers, importers, and dealership storefronts',
    demoUrl: 'https://atlas-automotive.vercel.app',
    affiliateUrl: 'https://atlas-automotive.vercel.app',
    review: [
      'Atlas Automotive is a parts-retail theme organised the way buyers actually shop for vehicles: browse by type, browse by country of origin, then drill into product detail. It includes the commercial pages a real importer needs — offers, shop, product detail, and payment/bank details — rather than just a pretty homepage.',
      'The design language is dark, industrial, and inventory-first. If you sell parts, accessories, or vehicles, the shop-by-type/shop-by-country architecture is the hard part — and it\'s already built.',
    ],
    pros: [
      'Shop-by-type and shop-by-country navigation built for automotive catalogues',
      'Full commercial page set: shop, product detail, offers, payment details',
      'Fast static delivery — no builder overhead',
    ],
    cons: [
      'Inventory management needs a backend or CMS integration per client',
      'Dark industrial style suits automotive; other niches need a restyle',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'evolve-nutrition',
    category: 'squadtech-originals',
    own: true,
    name: 'Evolve Nutrition',
    platform: 'Hand-coded HTML / CSS / JS',
    marketplace: 'Squad Tech Solution',
    price: 'Free first build',
    builder: 'None — clean custom code',
    bestFor: 'Supplement brands and fitness e-commerce with a DTC look',
    demoUrl: 'https://evolve-nutrition.vercel.app',
    affiliateUrl: 'https://evolve-nutrition.vercel.app',
    review: [
      'Evolve Nutrition is a direct-to-consumer supplement storefront with the full purchase path built out: shop, product detail, cart, and checkout pages — not just a landing page with a buy button. The homepage leads with lifestyle positioning ("Your Fitness Journey Starts Here") backed by animated stats and product-first sections.',
      'It\'s the right starting point for any consumable product brand where the site has to feel like the brand: energetic, modern, and conversion-led. We connect it to the payment and fulfilment stack of your choice during customisation.',
    ],
    pros: [
      'Complete e-commerce page flow: shop → product → cart → checkout',
      'Energetic DTC design language that suits fitness and wellness brands',
      'Animated stat counters and product sections without heavy libraries',
    ],
    cons: [
      'Payments and inventory wired per client rather than pre-integrated',
      'Bold aesthetic needs toning down for clinical/medical positioning',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'medora-marketing',
    category: 'squadtech-originals',
    own: true,
    name: 'Medora Marketing',
    platform: 'Hand-coded HTML / CSS / JS',
    marketplace: 'Squad Tech Solution',
    price: 'Free first build',
    builder: 'None — clean custom code',
    bestFor: 'Healthcare marketing agencies and medical practice growth consultants',
    demoUrl: 'https://medora-marketing.vercel.app',
    affiliateUrl: 'https://medora-marketing.vercel.app',
    review: [
      'Medora is an agency-style theme we built for the medical marketing niche — services, industries served, about, and contact pages structured around converting healthcare professionals into discovery calls. The copy architecture leads with outcomes ("Boost Your Medical Practice with Data-Driven Marketing") and pushes to a call CTA early and often.',
      'It\'s a strong base for any B2B service business, not just medical: swap the industry pages and the funnel logic stays intact.',
    ],
    pros: [
      'Conversion-led service-business architecture (services → industries → call CTA)',
      'Industry-page pattern ready for niche targeting and local SEO',
      'Light, professional aesthetic that adapts to any B2B service',
    ],
    cons: [
      'No blog built in by default (we add one on request)',
      'Copy is niche-specific — plan for a proper rewrite, not find-and-replace',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'saas-diplomacy',
    category: 'squadtech-originals',
    own: true,
    name: 'SaaS Diplomacy',
    platform: 'Hand-coded HTML / CSS / JS',
    marketplace: 'Squad Tech Solution',
    price: 'Free first build',
    builder: 'None — clean custom code',
    bestFor: 'Software agencies, SaaS companies, and product studios',
    demoUrl: 'https://saas-diplomacy.vercel.app',
    affiliateUrl: 'https://saas-diplomacy.vercel.app',
    review: [
      'SaaS Diplomacy is a creative agency/software studio theme with a portfolio backbone — engineered around showing shipped work and engineering milestones rather than abstract service claims. Home, about, portfolio, and contact pages with a working contact form flow.',
      'The tone is technical-premium: it presents a team as builders with proof, which is exactly the positioning battle software agencies fight. Portfolio entries, ROI-focused sections, and milestone displays are all in place to load your own case studies into.',
    ],
    pros: [
      'Portfolio-first structure built to showcase shipped product work',
      'ROI and milestone sections that speak to B2B software buyers',
      'Working contact flow included',
    ],
    cons: [
      'Needs strong case-study content to shine — thin portfolios look thin',
      'Technical-premium tone needs adjusting for consumer brands',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'sg-medical',
    category: 'squadtech-originals',
    own: true,
    name: 'SG Medical Supply',
    platform: 'Hand-coded HTML / CSS / JS',
    marketplace: 'Squad Tech Solution',
    price: 'Free first build',
    builder: 'None — clean custom code',
    bestFor: 'Medical supply stores that want e-commerce plus a content/SEO engine',
    demoUrl: 'https://sg-medical.vercel.app',
    affiliateUrl: 'https://sg-medical.vercel.app',
    review: [
      'SG Medical Supply is the most complete storefront in this set: shop, product detail, cart, and checkout pages plus a blog with article detail pages — the content engine most theme storefronts skip. That combination matters in medical supply, where organic search on condition and product-education keywords drives cheaper acquisition than ads.',
      'The design leads with a health-platform feel ("See Beyond. Unlock Your Health") over catalogue density, making it a fit for supply brands that want to look like a health company, not a warehouse.',
    ],
    pros: [
      'Full e-commerce flow AND a built-in blog for SEO content',
      'Health-platform aesthetic that elevates a supply catalogue',
      'Category, process, and featured-product sections ready for real inventory',
    ],
    cons: [
      'Blog publishing needs a CMS hookup for non-technical editors',
      'Larger page set means a longer customisation pass than a simple landing',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },

  // ── WordPress E-Commerce ──────────────────────────────────────────────────
  {
    slug: 'flatsome',
    category: 'wordpress-ecommerce',
    name: 'Flatsome',
    platform: 'WordPress / WooCommerce',
    marketplace: 'ThemeForest',
    price: '$59',
    builder: 'UX Builder (built-in)',
    bestFor: 'Store owners who want to self-manage layouts without a developer on call',
    affiliateUrl: 'https://themeforest.net/item/flatsome-multipurpose-responsive-woocommerce-theme/5484319',
    review: [
      'Flatsome has been the best-selling WooCommerce theme on ThemeForest for years, and the reason is its UX Builder — a front-end drag-and-drop editor that is genuinely faster to work in than Elementor for shop layouts. Category pages, product grids, and lookbooks that would take custom code elsewhere are configuration here.',
      'From a development standpoint it\'s cleaner than most multipurpose themes because it isn\'t one — it only tries to be a shop. The trade-off is design ceiling: Flatsome sites tend to look like Flatsome sites unless you push past the presets, and the built-in builder means you\'re committing to their ecosystem rather than a standard page builder.',
    ],
    pros: [
      'UX Builder is fast and shop-focused — clients can edit layouts themselves',
      'Excellent WooCommerce depth: quick view, wishlists, catalogue mode built in',
      'Large ecosystem and long update track record (lower abandonment risk)',
    ],
    cons: [
      'Distinctive "Flatsome look" takes real effort to escape',
      'Locked into its proprietary builder — migrating away later is a rebuild',
      'Demo import brings more than you need; requires cleanup for speed',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'woodmart',
    category: 'wordpress-ecommerce',
    name: 'WoodMart',
    platform: 'WordPress / WooCommerce',
    marketplace: 'ThemeForest',
    price: '$59',
    builder: 'Elementor / WPBakery (optional)',
    bestFor: 'Larger catalogues that need advanced filtering and a premium feel',
    affiliateUrl: 'https://themeforest.net/item/woodmart-woocommerce-wordpress-theme/20264492',
    review: [
      'WoodMart is what we reach for when a client\'s catalogue is big: its AJAX filtering, swatches, and layered navigation are the strongest in this list out of the box, and the header/footer builder means fewer plugins. Recent versions moved to their own performance-focused framework and it shows — base installs are noticeably lighter than the older WPBakery era.',
      'The flip side is option overload. WoodMart\'s theme settings panel is enormous, and an inexperienced builder can produce a slow, inconsistent site with the same tool an experienced one uses to produce a great one. Budget time to learn it or hire someone who has.',
    ],
    pros: [
      'Best-in-class product filtering and AJAX shop experience',
      'Built-in header builder, swatches, and wishlist reduce plugin count',
      'Performance-conscious recent rewrites; works with Elementor',
    ],
    cons: [
      'Settings panel is overwhelming — easy to configure yourself into a slow site',
      'Demos lean on large imagery; real-world speed needs image discipline',
      'Support quality varies with release cycles',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'shoptimizer',
    category: 'wordpress-ecommerce',
    name: 'Shoptimizer',
    platform: 'WordPress / WooCommerce',
    marketplace: 'CommerceGurus',
    price: '$99',
    builder: 'Gutenberg / Elementor compatible',
    bestFor: 'Stores where conversion rate and Core Web Vitals are the priority',
    affiliateUrl: 'https://www.commercegurus.com/product/shoptimizer/',
    review: [
      'Shoptimizer is built around one thesis: fast stores convert better. It ships with CRO patterns baked in — sticky add-to-cart, trust badges near the buy button, a distraction-free checkout — and its base install posts the best out-of-the-box speed numbers of anything in this list.',
      'It is deliberately not a design playground. If your brand needs a distinctive art-directed look, you\'ll be writing CSS on top of it. But for performance-first stores that want the checkout math to work, it\'s the strongest default we\'ve tested, and the codebase is clean enough that our developers don\'t fight it.',
    ],
    pros: [
      'Fastest out-of-the-box WooCommerce theme we\'ve worked with',
      'CRO features (sticky ATC, trust elements, slim checkout) built in, not bolted on',
      'Clean, readable codebase — easy to extend safely',
    ],
    cons: [
      'Visually conservative — distinctive branding requires custom work',
      'Smaller ecosystem than the ThemeForest giants',
      'Higher sticker price than typical marketplace themes',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'astra',
    category: 'wordpress-ecommerce',
    name: 'Astra (+ WooCommerce)',
    platform: 'WordPress / WooCommerce',
    marketplace: 'Brainstorm Force',
    price: 'Free / Pro from $47yr',
    builder: 'Any (Gutenberg, Elementor, Beaver)',
    bestFor: 'Budget-conscious stores and agencies standardising on one lightweight base',
    affiliateUrl: 'https://wpastra.com/',
    review: [
      'Astra isn\'t an e-commerce theme so much as a very light foundation that happens to have excellent WooCommerce modules in its Pro tier. That\'s its appeal: you start from almost nothing (the free core is tiny) and add only what the store needs, with any page builder you already know.',
      'The starter template library gets a working shop up in an afternoon, which is why so many agencies standardise on it. The honest caveat: "lightweight" ends where your page builder begins — an Astra site built heavy with Elementor sections is no longer light, and the Pro modules you\'ll actually want for a shop push you to the paid tier quickly.',
    ],
    pros: [
      'Tiny, well-engineered core; works with every major page builder',
      'Free tier is genuinely usable; huge starter template library',
      'Annual or lifetime pricing beats per-site marketplace licences at agency scale',
    ],
    cons: [
      'Real shop features (off-canvas cart, quick view) require Pro',
      'Final performance depends entirely on the builder you pair it with',
      'Default design is deliberately plain — everything distinctive is on you',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'porto',
    category: 'wordpress-ecommerce',
    name: 'Porto',
    platform: 'WordPress / WooCommerce',
    marketplace: 'ThemeForest',
    price: '$59',
    builder: 'Elementor / WPBakery',
    bestFor: 'Stores that want a huge demo library and dense, catalogue-style layouts',
    affiliateUrl: 'https://themeforest.net/item/porto-responsive-wordpress-ecommerce-theme/9207399',
    review: [
      'Porto\'s pitch is volume: 100+ demos, most of them shop-focused, with dense grid layouts that suit big catalogues and marketplace-style stores. Its performance reputation improved substantially after the team invested in speed optimisation features — selective asset loading per page is built into the theme panel, which most competitors still lack.',
      'The demo library is also its risk. Porto sites built straight off an imported demo carry weight they don\'t need, and the theme\'s enormous flexibility means quality depends heavily on the person configuring it. In experienced hands it\'s one of the best value shop themes on ThemeForest.',
    ],
    pros: [
      'Built-in selective asset loading — rare and genuinely useful for speed',
      '100+ demos covering almost every retail vertical',
      'Strong value: mature theme, long update history, active support',
    ],
    cons: [
      'Demo imports need aggressive cleanup before launch',
      'So many options that consistency requires discipline',
      'Documentation lags behind the feature set',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'botiga',
    category: 'wordpress-ecommerce',
    name: 'Botiga',
    platform: 'WordPress / WooCommerce',
    marketplace: 'aThemes',
    price: 'Free / Pro from $69yr',
    builder: 'Gutenberg-first',
    bestFor: 'Modern, minimal stores that want native-block editing and clean code',
    affiliateUrl: 'https://athemes.com/theme/botiga/',
    review: [
      'Botiga is the most modern-feeling theme in this list: Gutenberg-first, minimal by default, and designed like a contemporary DTC storefront rather than a 2016 mega-theme. The free version is unusually complete — single-product galleries, cart slide-out, and solid typography controls without paying.',
      'We rate it for smaller catalogues and brand-led stores where design restraint is a feature. It\'s not the pick for complex filtering needs or feature-heavy marketplaces, and its ecosystem is younger than Flatsome\'s or WoodMart\'s, which matters if you\'re betting a business on long-term updates.',
    ],
    pros: [
      'Clean Gutenberg-native approach — no proprietary builder lock-in',
      'Generous free tier; light and fast by default',
      'Contemporary DTC aesthetic out of the box',
    ],
    cons: [
      'Advanced shop features thinner than the established giants',
      'Younger product — shorter track record on updates',
      'Fewer demos and third-party tutorials',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },

  // ── Portfolio & Agency ────────────────────────────────────────────────────
  {
    slug: 'salient',
    category: 'portfolio-agency',
    name: 'Salient',
    platform: 'WordPress',
    marketplace: 'ThemeForest',
    price: '$60',
    builder: 'WPBakery (heavily customised)',
    bestFor: 'Design-led studios that want editorial, animation-rich layouts',
    affiliateUrl: 'https://themeforest.net/item/salient-responsive-multipurpose-theme/4363266',
    review: [
      'Salient has aged better than almost any ThemeForest multipurpose theme because its design taste was ahead of its time — the typography defaults, hover states, and portfolio layouts still look current. Its customised WPBakery build is far more pleasant than stock WPBakery, and the animation system is rich without requiring code.',
      'The cost is weight. Salient loads a lot of CSS and JS to power that polish, and getting a Salient site to strong mobile Core Web Vitals takes deliberate optimisation work. We\'d pick it for image-led studios where feel beats raw speed — and budget performance passes into the build.',
    ],
    pros: [
      'Genuinely beautiful defaults — portfolios look premium with little effort',
      'Deep animation and typography control without code',
      'Long, consistent update history',
    ],
    cons: [
      'Heavy asset payload; mobile speed needs real optimisation work',
      'WPBakery base, even customised, shows its age in the editing UX',
      'Easy to over-animate — restraint required',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'kalium',
    category: 'portfolio-agency',
    name: 'Kalium',
    platform: 'WordPress',
    marketplace: 'ThemeForest',
    price: '$60',
    builder: 'Elementor / WPBakery',
    bestFor: 'Individual creatives and photographers with strong visual work',
    affiliateUrl: 'https://themeforest.net/item/kalium-creative-theme-for-professionals/10860525',
    review: [
      'Kalium is a portfolio specialist: its project templates, image lazy-loading behaviour, and gallery types are built around showing creative work, and it does that with less configuration than the big multipurpose themes. The demos map closely to real use-cases (photographer, designer, architect) so the distance from import to launch is short.',
      'It\'s less convincing as a full agency site — blog and service-page patterns are serviceable rather than strong — and like most ThemeForest creative themes, the parallax-heavy demos need taming for mobile performance. For a work-first portfolio, it\'s an efficient, safe pick.',
    ],
    pros: [
      'Purpose-built portfolio layouts — fast path from import to live',
      'Supports both Elementor and WPBakery',
      'Clean, minimal design language that keeps focus on the work',
    ],
    cons: [
      'Weaker patterns for service/sales pages than dedicated agency themes',
      'Demo parallax and video effects cost mobile performance',
      'Less active feature development than category leaders',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'uncode',
    category: 'portfolio-agency',
    name: 'Uncode',
    platform: 'WordPress',
    marketplace: 'ThemeForest',
    price: '$59',
    builder: 'WPBakery (customised "Wireframes" system)',
    bestFor: 'Agencies and magazines needing sophisticated grid and gallery control',
    affiliateUrl: 'https://themeforest.net/item/uncode-creative-multiuse-wordpress-theme/13373220',
    review: [
      'Uncode\'s adaptive image system is its standout engineering: it serves images sized to the actual rendered column, which most themes still don\'t do, and its grid/gallery control is the most precise in this list. The "Wireframes" library — hundreds of importable section layouts — makes it feel closer to a design system than a demo collection.',
      'It has a real learning curve: Uncode\'s power lives in nested option panels, and new builders find it opaque for the first project. Once learned, it\'s an agency workhorse. If you\'ll only ever build one site with it, that curve may not pay back.',
    ],
    pros: [
      'Adaptive image delivery is genuinely ahead of most competitors',
      'Unmatched grid, gallery, and layout precision',
      '500+ section wireframes speed up quality builds',
    ],
    cons: [
      'Steep learning curve; option panels run deep',
      'WPBakery foundation, though heavily improved',
      'Overkill for simple portfolios',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'avada',
    category: 'portfolio-agency',
    name: 'Avada',
    platform: 'WordPress',
    marketplace: 'ThemeForest',
    price: '$69',
    builder: 'Avada Builder (built-in)',
    bestFor: 'Corporate sites where client self-management and longevity matter most',
    affiliateUrl: 'https://themeforest.net/item/avada-responsive-multipurpose-theme/2833226',
    review: [
      'Avada is the best-selling WordPress theme of all time, and its modern incarnation is a different product from its bloated 2015 reputation: the current builder has performance tooling (asset loading per feature, its own caching) and the ecosystem maturity means nearly every question has an answer already published.',
      'We recommend it for corporate and agency sites that will be maintained by the client for years — its longevity risk is the lowest on ThemeForest. Trade-offs remain: it\'s a proprietary all-in-one, so leaving Avada means rebuilding, and its design defaults are safe rather than striking.',
    ],
    pros: [
      'Lowest abandonment risk in the ecosystem — 15+ years of updates',
      'Modern performance panel with per-feature asset loading',
      'Huge documentation and community — clients can self-serve',
    ],
    cons: [
      'Proprietary builder lock-in; migration means a rebuild',
      'Safe, corporate design language out of the box',
      'Full feature set can tempt builders into heavy pages',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
  {
    slug: 'jupiter-x',
    category: 'portfolio-agency',
    name: 'Jupiter X',
    platform: 'WordPress',
    marketplace: 'ThemeForest',
    price: '$59',
    builder: 'Elementor-native',
    bestFor: 'Elementor-first teams that want full templating without extra plugins',
    affiliateUrl: 'https://themeforest.net/item/jupiter-multipurpose-responsive-theme/5177775',
    review: [
      'Jupiter X went all-in on Elementor: headers, footers, archives, and even WooCommerce templates are all Elementor-editable through its bundled tooling, which effectively gives you Elementor Pro-style theme building inside the theme licence. For teams already fluent in Elementor, that makes it one of the most productive options here.',
      'Its dependence is also its weakness — you inherit Elementor\'s performance profile and its update cadence, and the bundled plugin stack (Jet plugins etc.) needs curating to avoid bloat. Choose it deliberately as "the Elementor theme," not as a neutral base.',
    ],
    pros: [
      'Full Elementor theme-building without buying Elementor Pro',
      'Large template and demo library tuned for agencies',
      'Active development and design refreshes',
    ],
    cons: [
      'Married to Elementor\'s performance characteristics',
      'Bundled plugin stack needs pruning',
      'Demo variety hides inconsistent quality between demos',
    ],
    measured: { lighthouseMobile: null, pageWeight: null, notes: null },
  },
]

export function themesByCategory(categorySlug) {
  return themes.filter((t) => t.category === categorySlug)
}
