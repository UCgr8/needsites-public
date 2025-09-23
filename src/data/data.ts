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
    {name: "cpa.gold", status: "available", price: 3087},
    {name: "accounting.delivery", status: "available", price: 2663},
    {name: "accounting.supply", status: "available", price: 2663},
    {name: "investors.consulting", status: "available", price: 1538},
    {name: "accountant.services", status: "available", price: 1352},
    {name: "actuary.help", status: "available", price: 1062},
    {name: "auditor.services", status: "available", price: 872},
    {name: "auditing.financial", status: "available", price: 399},
    {name: "financialadviser.consulting", status: "available", price: 399}
  ],
  "analytics-and-ai-data": [
    {name: "gain.domains", status: "available", price: 3101},
    {name: "analyst.agency", status: "available", price: 2007},
    {name: "analyst.solutions", status: "available", price: 2007},
    {name: "gainname.com", status: "available", price: 1920},
    {name: "html.solutions", status: "available", price: 1839},
    {name: "gainlogo.com", status: "available", price: 1556},
    {name: "attain.domains", status: "available", price: 718},
    {name: "algorithms.solutions", status: "available", price: 580},
    {name: "orientation.training", status: "available", price: 399}
  ],
  "design-and-branding": [
    {name: "design.delivery", status: "available", price: 3612},
    {name: "logo.bingo", status: "available", price: 3203},
    {name: "design.supply", status: "available", price: 3612},
    {name: "logo.supply", status: "available", price: 3203},
    {name: "design.express", status: "available", price: 3612},
    {name: "designer.services", status: "available", price: 2007},
    {name: "creativestudio.agency", status: "available", price: 1542},
    {name: "graphicdesign.services", status: "available", price: 399}
  ],
  "ecommerce-and-retail": [
    {name: "retail.express", status: "available", price: 2316},
    {name: "ecommerce.delivery", status: "available", price: 1647},
    {name: "onlinestore.services", status: "available", price: 399}
  ],
  "government-and-nonprofit": [
    {name: "nonprofit.services", status: "available", price: 872}
  ],
  "hr-and-recruiting": [
    {name: "hire.associates", status: "available", price: 3601},
    {name: "hire.management", status: "available", price: 3601},
    {name: "recruit.express", status: "available", price: 2007},
    {name: "talent.agency", status: "available", price: 1542}
  ],
  "it-and-software-tech": [
    {name: "needsites.com", status: "available", price: 500000},
    {name: "startup.delivery", status: "available", price: 5631},
    {name: "software.express", status: "available", price: 4029},
    {name: "app.delivery", status: "available", price: 3655},
    {name: "tech.supply", status: "available", price: 3376},
    {name: "code.agency", status: "available", price: 2686},
    {name: "developer.business", status: "available", price: 2462},
    {name: "api.team", status: "available", price: 2235},
    {name: "cloud.express", status: "available", price: 2015},
    {name: "saas.agency", status: "available", price: 1953},
    {name: "mobile.supply", status: "available", price: 1939},
    {name: "webapp.team", status: "available", price: 1799},
    {name: "devops.consulting", status: "available", price: 1327},
    {name: "framework.services", status: "available", price: 1320},
    {name: "backend.services", status: "available", price: 1311},
    {name: "frontend.team", status: "available", price: 1284},
    {name: "database.consulting", status: "available", price: 1282},
    {name: "javascript.services", status: "available", price: 747},
    {name: "startupasite.com", status: "available", price: 435},
    {name: "getwp.site", status: "available", price: 399}
  ],
  "legal-and-compliance": [
    {name: "attorney.express", status: "available", price: 3300},
    {name: "content.contractors", status: "available", price: 2827},
    {name: "lawyers.plus", status: "available", price: 2316},
    {name: "legaladvice.services", status: "available", price: 558},
    {name: "legaladviser.attorney", status: "available", price: 399},
    {name: "legaladvisor.lawyer", status: "available", price: 399},
    {name: "patenting.attorney", status: "available", price: 399}
  ],
  "marketing-and-advertising": [
    {name: "brand.solutions", status: "available", price: 4029},
    {name: "seo.delivery", status: "available", price: 3655},
    {name: "seo.supply", status: "available", price: 3655},
    {name: "hire.marketing", status: "available", price: 3601},
    {name: "ppc.express", status: "available", price: 2591},
    {name: "marketing.bingo", status: "available", price: 1647},
    {name: "marketing.how", status: "available", price: 1647},
    {name: "marketing.ventures", status: "available", price: 1647},
    {name: "marketing.voyage", status: "available", price: 1647},
    {name: "brandingeasy.com", status: "available", price: 1637},
    {name: "brandingboost.com", status: "available", price: 1620},
    {name: "branding.express", status: "available", price: 1542},
    {name: "branding.how", status: "available", price: 1542},
    {name: "branding.supply", status: "available", price: 1542},
    {name: "branding.ventures", status: "available", price: 1542},
    {name: "brandnamey.com", status: "available", price: 1454},
    {name: "emailmarketing.marketing", status: "available", price: 1436},
    {name: "brandwows.com", status: "available", price: 1378},
    {name: "luxuriousbranding.com", status: "available", price: 1360},
    {name: "genymarketing.com", status: "available", price: 1327},
    {name: "advertising.limited", status: "available", price: 1324},
    {name: "brandinghow.com", status: "available", price: 1294},
    {name: "startupabrand.com", status: "available", price: 1209},
    {name: "copywriter.help", status: "available", price: 1167},
    {name: "marketingaha.com", status: "available", price: 1080},
    {name: "brandingaha.com", status: "available", price: 1057},
    {name: "contentmarketing.help", status: "available", price: 927},
    {name: "contentmarketing.how", status: "available", price: 927},
    {name: "marketingagency.agency", status: "available", price: 672},
    {name: "startupbrandingteam.com", status: "available", price: 565},
    {name: "brandman.consulting", status: "available", price: 531},
    {name: "startupbrandnaming.com", status: "available", price: 439},
    {name: "advertisement.solutions", status: "available", price: 399},
    {name: "brand.bingo", status: "available", price: 399},
    {name: "brand.delivery", status: "available", price: 399},
    {name: "brandagency.site", status: "available", price: 399},
    {name: "brandidentity.services", status: "available", price: 399},
    {name: "branding.delivery", status: "available", price: 399},
    {name: "branding.dog", status: "available", price: 399},
    {name: "brandnaming.domains", status: "available", price: 399},
    {name: "brandstrategy.services", status: "available", price: 399},
    {name: "emailed.marketing", status: "available", price: 399},
    {name: "emailedmarketing.com", status: "available", price: 399},
    {name: "growthhacking.help", status: "available", price: 399},
    {name: "luxurybrand.agency", status: "available", price: 399},
    {name: "marketingstrategy.services", status: "available", price: 399},
    {name: "proseo.solutions", status: "available", price: 399},
    {name: "rebranding.services", status: "available", price: 399},
    {name: "startupbranding.team", status: "available", price: 399},
    {name: "startupmarketing.marketing", status: "available", price: 399},
    {name: "startupmarketing.team", status: "available", price: 399}
  ],
  "professional-services": [
    {name: "pr.direct", status: "available", price: 5631},
    {name: "pr.today", status: "available", price: 5631},
    {name: "hire.associates", status: "available", price: 3601},
    {name: "hire.management", status: "available", price: 3601},
    {name: "hire.support", status: "available", price: 3601},
    {name: "php.services", status: "available", price: 3376},
    {name: "niche.agency", status: "available", price: 3319},
    {name: "css.team", status: "available", price: 2686},
    {name: "freelancer.business", status: "available", price: 2462},
    {name: "sql.agency", status: "available", price: 2235},
    {name: "temp.express", status: "available", price: 2015},
    {name: "employee.agency", status: "available", price: 1953},
    {name: "sales.supply", status: "available", price: 1939},
    {name: "python.team", status: "available", price: 1799},
    {name: "taglineexpert.com", status: "available", price: 1327},
    {name: "taglinehelp.com", status: "available", price: 1320},
    {name: "employ.services", status: "available", price: 1311},
    {name: "ocomfly.com", status: "available", price: 1284},
    {name: "naminggenius.com", status: "available", price: 1282},
    {name: "prbrilliance.com", status: "available", price: 1232},
    {name: "servicesforpros.com", status: "available", price: 1221},
    {name: "namingvalue.com", status: "available", price: 1213},
    {name: "cashmerehug.com", status: "available", price: 1164},
    {name: "voiceover.help", status: "available", price: 1111},
    {name: "economist.consulting", status: "available", price: 918},
    {name: "ady.agency", status: "available", price: 874},
    {name: "taglinewriter.com", status: "available", price: 873},
    {name: "taglinelab.com", status: "available", price: 860},
    {name: "business.supply", status: "available", price: 856},
    {name: "businessname.help", status: "available", price: 831},
    {name: "taglinepro.com", status: "available", price: 824},
    {name: "namingexpert.services", status: "available", price: 768},
    {name: "businessnaming.help", status: "available", price: 764},
    {name: "consultant.business", status: "available", price: 748},
    {name: "naming.supply", status: "available", price: 700},
    {name: "companyname.help", status: "available", price: 697},
    {name: "companyname.services", status: "available", price: 697},
    {name: "workconsultant.com", status: "available", price: 648},
    {name: "consulting.supply", status: "available", price: 617},
    {name: "businessnaming.services", status: "available", price: 399},
    {name: "companynames.help", status: "available", price: 399},
    {name: "consulting.how", status: "available", price: 399},
    {name: "consultinghow.com", status: "available", price: 399},
    {name: "copywriting.help", status: "available", price: 399},
    {name: "naming.how", status: "available", price: 399},
    {name: "naming.services", status: "available", price: 399},
    {name: "namingconsultant.services", status: "available", price: 399},
    {name: "presenter.help", status: "available", price: 399},
    {name: "productname.help", status: "available", price: 399},
    {name: "speechwriter.help", status: "available", price: 399},
    {name: "tagline.help", status: "available", price: 399},
    {name: "taglines.help", status: "available", price: 399},
    {name: "writer.supply", status: "available", price: 399}
  ]
};

export { CONTACT_EMAIL };