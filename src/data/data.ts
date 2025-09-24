import type { Domain, Category, DomainWithCategory } from '../types';

// Import liquid glass icons
import accountingFinanceIcon from '../assets/icons/accounting-finance.png';
import analyticsAiDataIcon from '../assets/icons/analytics-ai-data.png';
import designBrandingIcon from '../assets/icons/design-branding.png';
import ecommerceRetailIcon from '../assets/icons/ecommerce-retail.png';
import governmentNonprofitIcon from '../assets/icons/government-nonprofit.png';
import hrRecruitingIcon from '../assets/icons/hr-recruiting.png';
import itSoftwareTechIcon from '../assets/icons/it-software-tech.png';
import legalComplianceIcon from '../assets/icons/legal-compliance.png';
import marketingAdvertisingIcon from '../assets/icons/marketing-advertising.png';
import professionalServicesIcon from '../assets/icons/professional-services.png';

const CONTACT_EMAIL = 'email@needsites.com';

export const CATEGORIES: Category[] = [
  {
    slug: "all",
    title: "All Domains", 
    tagline: "Complete collection", 
    description: "Browse our entire collection of premium domains across all categories. Perfect for finding that perfect domain name for your project.", 
    count: 164,
    icon: null
  },
  {
    slug: "accounting-and-finance", 
    title: "Accounting & Finance", 
    tagline: "Financial & accounting domains", 
    description: "Premium domains for accounting firms, financial advisors, and finance professionals.", 
    count: 9,
    icon: accountingFinanceIcon
  },
  {
    slug: "analytics-and-ai-data", 
    title: "Analytics & AI/Data", 
    tagline: "Data & AI domains", 
    description: "Cutting-edge domains for analytics, artificial intelligence, and data science companies.", 
    count: 9,
    icon: analyticsAiDataIcon
  },
  {
    slug: "design-and-branding", 
    title: "Design & Branding", 
    tagline: "Creative & design domains", 
    description: "Creative domains for design agencies, branding experts, and creative professionals.", 
    count: 8,
    icon: designBrandingIcon
  },
  {
    slug: "ecommerce-and-retail", 
    title: "E-commerce & Retail", 
    tagline: "Online retail domains", 
    description: "Premium domains for e-commerce stores, retail businesses, and online marketplaces.", 
    count: 3,
    icon: ecommerceRetailIcon
  },
  {
    slug: "government-and-nonprofit", 
    title: "Government & Nonprofit", 
    tagline: "Public service domains", 
    description: "Specialized domains for government agencies, nonprofits, and public service organizations.", 
    count: 1,
    icon: governmentNonprofitIcon
  },
  {
    slug: "hr-and-recruiting", 
    title: "HR & Recruiting", 
    tagline: "Human resources domains", 
    description: "Professional domains for HR departments, recruiting agencies, and talent acquisition.", 
    count: 4,
    icon: hrRecruitingIcon
  },
  {
    slug: "it-and-software-tech", 
    title: "IT & Software/Tech", 
    tagline: "Technology domains", 
    description: "High-value domains for software companies, tech startups, and IT service providers.", 
    count: 20,
    icon: itSoftwareTechIcon
  },
  {
    slug: "legal-and-compliance", 
    title: "Legal & Compliance", 
    tagline: "Legal service domains", 
    description: "Professional domains for law firms, legal consultants, and compliance specialists.", 
    count: 7,
    icon: legalComplianceIcon
  },
  {
    slug: "marketing-and-advertising", 
    title: "Marketing & Advertising", 
    tagline: "Marketing domains", 
    description: "Premium domains for marketing agencies, advertising firms, and digital marketers.", 
    count: 51,
    icon: marketingAdvertisingIcon
  },
  {
    slug: "professional-services", 
    title: "Professional Services", 
    tagline: "Business service domains", 
    description: "Premium domains for consultants, professional services, and business solutions.", 
    count: 52,
    icon: professionalServicesIcon
  }
];

export const DOMAINS: Record<string, Domain[]> = {
  "accounting-and-finance": [
    {name: "cpa.gold", status: "available", price: 3087, binPrice: 3087, tags: ["Accounting", "Premium", "Short"], tld: "gold", length: 8, flags: { bin: true, offer: false, rto: false }},
    {name: "accounting.delivery", status: "available", price: 2663, binPrice: 2663, tags: ["Accounting", "Keywords", "Two-Word"], tld: "delivery", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "accounting.supply", status: "available", price: 2663, binPrice: 2663, tags: ["Accounting", "Keywords", "Two-Word"], tld: "supply", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "investors.consulting", status: "available", price: 1538, binPrice: 1538, tags: ["Accounting", "Keywords", "SaaS"], tld: "consulting", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "accountant.services", status: "available", price: 1352, binPrice: 1352, tags: ["Accounting", "Keywords", "Two-Word"], tld: "services", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "actuary.help", status: "available", price: 1062, binPrice: 1062, tags: ["Accounting", "Keywords", "Two-Word"], tld: "help", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "auditor.services", status: "available", price: 872, binPrice: 872, tags: ["Accounting", "Keywords", "Two-Word"], tld: "services", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "auditing.financial", status: "available", price: 399, binPrice: 399, tags: ["Accounting", "Keywords", "Two-Word"], tld: "financial", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "financialadviser.consulting", status: "available", price: 399, binPrice: 399, tags: ["Accounting", "Keywords"], tld: "consulting", length: 28, flags: { bin: true, offer: false, rto: false }}
  ],
  "analytics-and-ai-data": [
    {name: "gain.domains", status: "available", price: 3101, binPrice: 3101, tags: ["Analytics", "Premium", "Short"], tld: "domains", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "analyst.agency", status: "available", price: 2007, binPrice: 2007, tags: ["Analytics", "Keywords", "Agency"], tld: "agency", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "analyst.solutions", status: "available", price: 2007, binPrice: 2007, tags: ["Analytics", "Keywords", "SaaS"], tld: "solutions", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "gainname.com", status: "available", price: 1920, binPrice: 1920, tags: ["Analytics", "Premium", "Short"], tld: "com", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "html.solutions", status: "available", price: 1839, binPrice: 1839, tags: ["IT", "Keywords", "Two-Word"], tld: "solutions", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "gainlogo.com", status: "available", price: 1556, binPrice: 1556, tags: ["Analytics", "Premium", "Short"], tld: "com", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "attain.domains", status: "available", price: 718, binPrice: 718, tags: ["Analytics", "Keywords", "Two-Word"], tld: "domains", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "algorithms.solutions", status: "available", price: 580, binPrice: 580, tags: ["Analytics", "Keywords", "SaaS"], tld: "solutions", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "orientation.training", status: "available", price: 399, binPrice: 399, tags: ["Analytics", "Keywords", "Education"], tld: "training", length: 20, flags: { bin: true, offer: false, rto: false }}
  ],
  "design-and-branding": [
    {name: "design.delivery", status: "available", price: 3612, binPrice: 3612, tags: ["Design", "Premium", "Two-Word"], tld: "delivery", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "logo.bingo", status: "available", price: 3203, binPrice: 3203, tags: ["Design", "Premium", "Short"], tld: "bingo", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "design.supply", status: "available", price: 3612, binPrice: 3612, tags: ["Design", "Premium", "Two-Word"], tld: "supply", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "logo.supply", status: "available", price: 3203, binPrice: 3203, tags: ["Design", "Premium", "Short"], tld: "supply", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "design.express", status: "available", price: 3612, binPrice: 3612, tags: ["Design", "Premium", "Two-Word"], tld: "express", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "designer.services", status: "available", price: 2007, binPrice: 2007, tags: ["Design", "Keywords", "Two-Word"], tld: "services", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "creativestudio.agency", status: "available", price: 1542, binPrice: 1542, tags: ["Design", "Keywords", "Agency"], tld: "agency", length: 21, flags: { bin: true, offer: false, rto: false }},
    {name: "graphicdesign.services", status: "available", price: 399, binPrice: 399, tags: ["Design", "Keywords", "Two-Word"], tld: "services", length: 22, flags: { bin: true, offer: false, rto: false }}
  ],
  "ecommerce-and-retail": [
    {name: "retail.express", status: "available", price: 2316, binPrice: 2316, tags: ["E-commerce", "Premium", "Two-Word"], tld: "express", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "ecommerce.delivery", status: "available", price: 1647, binPrice: 1647, tags: ["E-commerce", "Keywords", "Two-Word"], tld: "delivery", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "onlinestore.services", status: "available", price: 399, binPrice: 399, tags: ["E-commerce", "Keywords", "Marketplace"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }}
  ],
  "government-and-nonprofit": [
    {name: "nonprofit.services", status: "available", price: 872, binPrice: 872, tags: ["Nonprofit", "Keywords", "Two-Word"], tld: "services", length: 18, flags: { bin: true, offer: false, rto: false }}
  ],
  "hr-and-recruiting": [
    {name: "hire.associates", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "associates", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.management", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "management", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "recruit.express", status: "available", price: 2007, binPrice: 2007, tags: ["HR", "Keywords", "Two-Word"], tld: "express", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "talent.agency", status: "available", price: 1542, binPrice: 1542, tags: ["HR", "Keywords", "Agency"], tld: "agency", length: 13, flags: { bin: true, offer: false, rto: false }}
  ],
  "it-and-software-tech": [
    {name: "needsites.com", status: "available", price: 500000, binPrice: 500000, tags: ["IT", "Premium", "Short"], tld: "com", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "startup.delivery", status: "available", price: 5631, binPrice: 5631, tags: ["IT", "Premium", "Two-Word"], tld: "delivery", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "software.express", status: "available", price: 4029, binPrice: 4029, tags: ["IT", "Premium", "Two-Word"], tld: "express", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "app.delivery", status: "available", price: 3655, binPrice: 3655, tags: ["IT", "Premium", "Short"], tld: "delivery", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "tech.supply", status: "available", price: 3376, binPrice: 3376, tags: ["IT", "Premium", "Short"], tld: "supply", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "code.agency", status: "available", price: 2686, binPrice: 2686, tags: ["IT", "Premium", "Short", "Agency"], tld: "agency", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "developer.business", status: "available", price: 2462, binPrice: 2462, tags: ["IT", "Keywords", "Two-Word"], tld: "business", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "api.team", status: "available", price: 2235, binPrice: 2235, tags: ["IT", "Premium", "Short"], tld: "team", length: 8, flags: { bin: true, offer: false, rto: false }},
    {name: "cloud.express", status: "available", price: 2015, binPrice: 2015, tags: ["IT", "Keywords", "Two-Word"], tld: "express", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "saas.agency", status: "available", price: 1953, binPrice: 1953, tags: ["IT", "Premium", "Short", "SaaS", "Agency"], tld: "agency", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "mobile.supply", status: "available", price: 1939, binPrice: 1939, tags: ["IT", "Keywords", "Two-Word"], tld: "supply", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "webapp.team", status: "available", price: 1799, binPrice: 1799, tags: ["IT", "Keywords", "Two-Word"], tld: "team", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "devops.consulting", status: "available", price: 1327, binPrice: 1327, tags: ["IT", "Keywords", "Two-Word"], tld: "consulting", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "framework.services", status: "available", price: 1320, binPrice: 1320, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "backend.services", status: "available", price: 1311, binPrice: 1311, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "frontend.team", status: "available", price: 1284, binPrice: 1284, tags: ["IT", "Keywords", "Two-Word"], tld: "team", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "database.consulting", status: "available", price: 1282, binPrice: 1282, tags: ["IT", "Keywords", "Two-Word"], tld: "consulting", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "javascript.services", status: "available", price: 747, binPrice: 747, tags: ["IT", "Keywords", "Two-Word"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "startupasite.com", status: "available", price: 435, binPrice: 435, tags: ["IT", "Keywords", "SaaS"], tld: "com", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "getwp.site", status: "available", price: 399, binPrice: 399, tags: ["IT", "Keywords", "Short"], tld: "site", length: 10, flags: { bin: true, offer: false, rto: false }}
  ],
  "legal-and-compliance": [
    {name: "attorney.express", status: "available", price: 3300, binPrice: 3300, tags: ["Legal", "Premium", "Two-Word"], tld: "express", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "content.contractors", status: "available", price: 2827, binPrice: 2827, tags: ["Legal", "Keywords", "Two-Word"], tld: "contractors", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "lawyers.plus", status: "available", price: 2316, binPrice: 2316, tags: ["Legal", "Keywords", "Two-Word"], tld: "plus", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "legaladvice.services", status: "available", price: 558, binPrice: 558, tags: ["Legal", "Keywords", "Two-Word"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "legaladviser.attorney", status: "available", price: 399, binPrice: 399, tags: ["Legal", "Keywords", "Two-Word"], tld: "attorney", length: 21, flags: { bin: true, offer: false, rto: false }},
    {name: "legaladvisor.lawyer", status: "available", price: 399, binPrice: 399, tags: ["Legal", "Keywords", "Two-Word"], tld: "lawyer", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "patenting.attorney", status: "available", price: 399, binPrice: 399, tags: ["Legal", "Keywords", "Two-Word"], tld: "attorney", length: 18, flags: { bin: true, offer: false, rto: false }}
  ],
  "marketing-and-advertising": [
    {name: "brand.solutions", status: "available", price: 4029, binPrice: 4029, tags: ["Marketing", "Premium", "Two-Word"], tld: "solutions", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "seo.delivery", status: "available", price: 3655, binPrice: 3655, tags: ["Marketing", "Premium", "Short"], tld: "delivery", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "seo.supply", status: "available", price: 3655, binPrice: 3655, tags: ["Marketing", "Premium", "Short"], tld: "supply", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.marketing", status: "available", price: 3601, binPrice: 3601, tags: ["Marketing", "Premium", "Two-Word"], tld: "marketing", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "ppc.express", status: "available", price: 2591, binPrice: 2591, tags: ["Marketing", "Premium", "Short"], tld: "express", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "marketing.bingo", status: "available", price: 1647, binPrice: 1647, tags: ["Marketing", "Keywords", "Two-Word"], tld: "bingo", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "marketing.how", status: "available", price: 1647, binPrice: 1647, tags: ["Marketing", "Keywords", "Two-Word"], tld: "how", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "marketing.ventures", status: "available", price: 1647, binPrice: 1647, tags: ["Marketing", "Keywords", "Two-Word"], tld: "ventures", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "marketing.voyage", status: "available", price: 1647, binPrice: 1647, tags: ["Marketing", "Keywords", "Two-Word"], tld: "voyage", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "brandingeasy.com", status: "available", price: 1637, binPrice: 1637, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "brandingboost.com", status: "available", price: 1620, binPrice: 1620, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "branding.express", status: "available", price: 1542, binPrice: 1542, tags: ["Marketing", "Keywords", "Two-Word"], tld: "express", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "branding.how", status: "available", price: 1542, binPrice: 1542, tags: ["Marketing", "Keywords", "Two-Word"], tld: "how", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "branding.supply", status: "available", price: 1542, binPrice: 1542, tags: ["Marketing", "Keywords", "Two-Word"], tld: "supply", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "branding.ventures", status: "available", price: 1542, binPrice: 1542, tags: ["Marketing", "Keywords", "Two-Word"], tld: "ventures", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "brandnamey.com", status: "available", price: 1454, binPrice: 1454, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "emailmarketing.marketing", status: "available", price: 1436, binPrice: 1436, tags: ["Marketing", "Keywords", "Lead Gen"], tld: "marketing", length: 24, flags: { bin: true, offer: false, rto: false }},
    {name: "brandwows.com", status: "available", price: 1378, binPrice: 1378, tags: ["Marketing", "Keywords", "Short"], tld: "com", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "luxuriousbranding.com", status: "available", price: 1360, binPrice: 1360, tags: ["Marketing", "Premium", "Keywords"], tld: "com", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "genymarketing.com", status: "available", price: 1327, binPrice: 1327, tags: ["Marketing", "Keywords", "Agency"], tld: "com", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "advertising.limited", status: "available", price: 1324, binPrice: 1324, tags: ["Marketing", "Keywords", "Two-Word"], tld: "limited", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "brandinghow.com", status: "available", price: 1294, binPrice: 1294, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "startupabrand.com", status: "available", price: 1209, binPrice: 1209, tags: ["Marketing", "Keywords", "SaaS"], tld: "com", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "copywriter.help", status: "available", price: 1167, binPrice: 1167, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "marketingaha.com", status: "available", price: 1080, binPrice: 1080, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "brandingaha.com", status: "available", price: 1057, binPrice: 1057, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "contentmarketing.help", status: "available", price: 927, binPrice: 927, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 22, flags: { bin: true, offer: false, rto: false }},
    {name: "contentmarketing.how", status: "available", price: 927, binPrice: 927, tags: ["Marketing", "Keywords", "Content"], tld: "how", length: 21, flags: { bin: true, offer: false, rto: false }},
    {name: "marketingagency.agency", status: "available", price: 672, binPrice: 672, tags: ["Marketing", "Keywords", "Agency"], tld: "agency", length: 22, flags: { bin: true, offer: false, rto: false }},
    {name: "startupbrandingteam.com", status: "available", price: 565, binPrice: 565, tags: ["Marketing", "Keywords", "SaaS"], tld: "com", length: 22, flags: { bin: true, offer: false, rto: false }},
    {name: "brandman.consulting", status: "available", price: 531, binPrice: 531, tags: ["Marketing", "Keywords", "Two-Word"], tld: "consulting", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "startupbrandnaming.com", status: "available", price: 439, binPrice: 439, tags: ["Marketing", "Keywords", "SaaS"], tld: "com", length: 21, flags: { bin: true, offer: false, rto: false }},
    {name: "advertisement.solutions", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "solutions", length: 22, flags: { bin: true, offer: false, rto: false }},
    {name: "brand.bingo", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Short"], tld: "bingo", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "brand.delivery", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Short"], tld: "delivery", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "brandagency.site", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Agency"], tld: "site", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "brandidentity.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 22, flags: { bin: true, offer: false, rto: false }},
    {name: "branding.delivery", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "delivery", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "branding.dog", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "dog", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "brandnaming.domains", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "domains", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "brandstrategy.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 22, flags: { bin: true, offer: false, rto: false }},
    {name: "emailed.marketing", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Lead Gen"], tld: "marketing", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "emailedmarketing.com", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Lead Gen"], tld: "com", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "growthhacking.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "SaaS"], tld: "help", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "luxurybrand.agency", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Premium", "Agency"], tld: "agency", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "marketingstrategy.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 27, flags: { bin: true, offer: false, rto: false }},
    {name: "proseo.solutions", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "SaaS"], tld: "solutions", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "rebranding.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "startupbranding.team", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "SaaS"], tld: "team", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "startupmarketing.marketing", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "SaaS"], tld: "marketing", length: 26, flags: { bin: true, offer: false, rto: false }},
    {name: "startupmarketing.team", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "SaaS"], tld: "team", length: 22, flags: { bin: true, offer: false, rto: false }}
  ],
  "professional-services": [
    {name: "pr.direct", status: "available", price: 5631, binPrice: 5631, tags: ["Marketing", "Premium", "Short"], tld: "direct", length: 9, flags: { bin: true, offer: false, rto: false }},
    {name: "pr.today", status: "available", price: 5631, binPrice: 5631, tags: ["Marketing", "Premium", "Short"], tld: "today", length: 8, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.associates", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "associates", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.management", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "management", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "hire.support", status: "available", price: 3601, binPrice: 3601, tags: ["HR", "Premium", "Two-Word"], tld: "support", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "php.services", status: "available", price: 3376, binPrice: 3376, tags: ["IT", "Premium", "Short"], tld: "services", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "niche.agency", status: "available", price: 3319, binPrice: 3319, tags: ["Marketing", "Premium", "Short", "Agency"], tld: "agency", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "css.team", status: "available", price: 2686, binPrice: 2686, tags: ["IT", "Premium", "Short"], tld: "team", length: 8, flags: { bin: true, offer: false, rto: false }},
    {name: "freelancer.business", status: "available", price: 2462, binPrice: 2462, tags: ["HR", "Keywords", "Two-Word"], tld: "business", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "sql.agency", status: "available", price: 2235, binPrice: 2235, tags: ["IT", "Premium", "Short", "Agency"], tld: "agency", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "temp.express", status: "available", price: 2015, binPrice: 2015, tags: ["HR", "Premium", "Short"], tld: "express", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "employee.agency", status: "available", price: 1953, binPrice: 1953, tags: ["HR", "Keywords", "Agency"], tld: "agency", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "sales.supply", status: "available", price: 1939, binPrice: 1939, tags: ["Marketing", "Premium", "Short"], tld: "supply", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "python.team", status: "available", price: 1799, binPrice: 1799, tags: ["IT", "Keywords", "Two-Word"], tld: "team", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "taglineexpert.com", status: "available", price: 1327, binPrice: 1327, tags: ["Marketing", "Keywords", "Content"], tld: "com", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "taglinehelp.com", status: "available", price: 1320, binPrice: 1320, tags: ["Marketing", "Keywords", "Content"], tld: "com", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "employ.services", status: "available", price: 1311, binPrice: 1311, tags: ["HR", "Keywords", "Two-Word"], tld: "services", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "ocomfly.com", status: "available", price: 1284, binPrice: 1284, tags: ["Marketing", "Keywords", "Short"], tld: "com", length: 11, flags: { bin: true, offer: false, rto: false }},
    {name: "naminggenius.com", status: "available", price: 1282, binPrice: 1282, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "prbrilliance.com", status: "available", price: 1232, binPrice: 1232, tags: ["Marketing", "Keywords", "Agency"], tld: "com", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "servicesforpros.com", status: "available", price: 1221, binPrice: 1221, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 19, flags: { bin: true, offer: false, rto: false }},
    {name: "namingvalue.com", status: "available", price: 1213, binPrice: 1213, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "cashmerehug.com", status: "available", price: 1164, binPrice: 1164, tags: ["Marketing", "Premium", "Short"], tld: "com", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "voiceover.help", status: "available", price: 1111, binPrice: 1111, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "economist.consulting", status: "available", price: 918, binPrice: 918, tags: ["Accounting", "Keywords", "Two-Word"], tld: "consulting", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "ady.agency", status: "available", price: 874, binPrice: 874, tags: ["Marketing", "Premium", "Short", "Agency"], tld: "agency", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "taglinewriter.com", status: "available", price: 873, binPrice: 873, tags: ["Marketing", "Keywords", "Content"], tld: "com", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "taglinelab.com", status: "available", price: 860, binPrice: 860, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "business.supply", status: "available", price: 856, binPrice: 856, tags: ["Marketing", "Keywords", "Two-Word"], tld: "supply", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "businessname.help", status: "available", price: 831, binPrice: 831, tags: ["Marketing", "Keywords", "Tools"], tld: "help", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "taglinepro.com", status: "available", price: 824, binPrice: 824, tags: ["Marketing", "Keywords", "Content"], tld: "com", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "namingexpert.services", status: "available", price: 768, binPrice: 768, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 21, flags: { bin: true, offer: false, rto: false }},
    {name: "businessnaming.help", status: "available", price: 764, binPrice: 764, tags: ["Marketing", "Keywords", "Tools"], tld: "help", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "consultant.business", status: "available", price: 748, binPrice: 748, tags: ["Marketing", "Keywords", "Two-Word"], tld: "business", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "naming.supply", status: "available", price: 700, binPrice: 700, tags: ["Marketing", "Keywords", "Two-Word"], tld: "supply", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "companyname.help", status: "available", price: 697, binPrice: 697, tags: ["Marketing", "Keywords", "Tools"], tld: "help", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "companyname.services", status: "available", price: 697, binPrice: 697, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 20, flags: { bin: true, offer: false, rto: false }},
    {name: "workconsultant.com", status: "available", price: 648, binPrice: 648, tags: ["HR", "Keywords", "Two-Word"], tld: "com", length: 18, flags: { bin: true, offer: false, rto: false }},
    {name: "consulting.supply", status: "available", price: 617, binPrice: 617, tags: ["Marketing", "Keywords", "Two-Word"], tld: "supply", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "businessnaming.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 24, flags: { bin: true, offer: false, rto: false }},
    {name: "companynames.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Tools"], tld: "help", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "consulting.how", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "how", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "consultinghow.com", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Tools"], tld: "com", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "copywriting.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "naming.how", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "how", length: 10, flags: { bin: true, offer: false, rto: false }},
    {name: "naming.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 15, flags: { bin: true, offer: false, rto: false }},
    {name: "namingconsultant.services", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Two-Word"], tld: "services", length: 25, flags: { bin: true, offer: false, rto: false }},
    {name: "presenter.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 14, flags: { bin: true, offer: false, rto: false }},
    {name: "productname.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Tools"], tld: "help", length: 16, flags: { bin: true, offer: false, rto: false }},
    {name: "speechwriter.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 17, flags: { bin: true, offer: false, rto: false }},
    {name: "tagline.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 12, flags: { bin: true, offer: false, rto: false }},
    {name: "taglines.help", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Content"], tld: "help", length: 13, flags: { bin: true, offer: false, rto: false }},
    {name: "writer.supply", status: "available", price: 399, binPrice: 399, tags: ["Marketing", "Keywords", "Content"], tld: "supply", length: 13, flags: { bin: true, offer: false, rto: false }}
  ]
};

export { CONTACT_EMAIL };