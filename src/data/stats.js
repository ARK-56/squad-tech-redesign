// Single source of truth for company-wide stats.
// Any page that shows a headline number should pull it from here so the
// figures never drift between Hero, About, Services, industry pages, etc.
// Service-specific metrics (per-service ROAS, hook rates, etc.) live with
// their own service in data/services.js — this file is company-level only.

export const companyStats = {
  projects: { value: '200+', label: 'Projects Delivered' },
  clients: { value: '67+', label: 'Global Clients' },
  satisfaction: { value: '98%', label: 'Client Satisfaction' },
  impressions: { value: '10M+', label: 'Impressions Generated' },
  experience: { value: '7', label: 'Years of Experience' },
  services: { value: '6', label: 'Core Services' },
  upfront: { value: '$0', label: 'Required Upfront' },
}

// Ordered lists for each surface. Change the order/keys here, not in the components.
export const heroStats = [
  companyStats.projects,
  companyStats.experience,
  companyStats.satisfaction,
  companyStats.impressions,
  companyStats.clients,
]

export const aboutStats = [
  companyStats.projects,
  companyStats.clients,
  companyStats.satisfaction,
  companyStats.impressions,
  companyStats.services,
  companyStats.upfront,
]
