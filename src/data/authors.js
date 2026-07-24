// Writer / author registry for the blog + writer portfolio program.
// Each contributor gets a portfolio page at /writers/:slug — the page every
// writer links from their resume and LinkedIn.
//
// `template` picks one of the pre-built portfolio layouts ('spotlight' | 'editorial')
// so design effort per writer stays near zero.
//
// NOTE: 'ayesha-khan' and 'daniel-reeves' are placeholder profiles — replace
// with real contributors as writers join the program.

export const authors = {
  'squadtech-editorial': {
    slug: 'squadtech-editorial',
    name: 'Squadtech Editorial',
    role: 'In-House Team',
    initials: 'S',
    gradient: 'linear-gradient(135deg, #e73103, #f58e1e)',
    bio: 'Insights from the team at Squad Tech Solution — 30+ specialists across growth, engineering, design & media.',
    expertise: ['Growth Strategy', 'Media Production', 'Agency Operations'],
    location: 'New York, US',
    joined: 'February 2025',
    isTeam: true,
    template: 'spotlight',
    links: {
      linkedin: 'https://www.linkedin.com/company/squadtechsolution',
    },
  },
  'ayesha-khan': {
    slug: 'ayesha-khan',
    name: 'Ayesha Khan',
    role: 'Contributing Writer — Social & Brand',
    initials: 'AK',
    gradient: 'linear-gradient(135deg, #e73103, #b0250a)',
    bio: 'Freelance content strategist covering social media growth, brand storytelling, and creator economy trends. Writes actionable playbooks backed by campaign data.',
    expertise: ['Social Media Marketing', 'Brand Strategy', 'Content Strategy'],
    location: 'London, UK',
    joined: 'April 2025',
    isTeam: false,
    template: 'spotlight',
    links: {
      linkedin: '#',
    },
  },
  'daniel-reeves': {
    slug: 'daniel-reeves',
    name: 'Daniel Reeves',
    role: 'Contributing Writer — Web & SEO',
    initials: 'DR',
    gradient: 'linear-gradient(135deg, #f58e1e, #c96a05)',
    bio: 'Technical writer and SEO consultant. Covers conversion-focused web development, analytics, and search — with a bias for numbers over opinions.',
    expertise: ['SEO & PPC', 'Web Development', 'Analytics & CRO'],
    location: 'Austin, US',
    joined: 'May 2025',
    isTeam: false,
    template: 'editorial',
    links: {
      linkedin: '#',
    },
  },
}

export const defaultAuthor = authors['squadtech-editorial']

// Category → author assignment for existing posts. Individual posts can
// override by carrying their own `authorSlug` field.
export const categoryAuthors = {
  'Social Media': 'ayesha-khan',
  'Branding': 'ayesha-khan',
  'Web Development': 'daniel-reeves',
  'Web Design': 'daniel-reeves',
  'SEO & PPC': 'daniel-reeves',
}

export function resolveAuthor(post) {
  if (post.authorSlug && authors[post.authorSlug]) return authors[post.authorSlug]
  const byCategory = categoryAuthors[post.category]
  return (byCategory && authors[byCategory]) || defaultAuthor
}

export const writersList = Object.values(authors)
