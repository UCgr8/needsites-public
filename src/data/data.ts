import type { Domain, Category, DomainWithCategory } from '../types';

const CONTACT_EMAIL = 'email@needsites.com';

export const CATEGORIES: Category[] = [
  {
    slug: "all",
    title: "All Domains", 
    tagline: "Complete collection", 
    description: "Browse our entire collection of premium domains across all categories. Perfect for finding that perfect domain name for your project.", 
    count: 7
  },
  {
    slug: "other", 
    title: "Other", 
    tagline: "General business domains", 
    description: "Diverse collection of professional domains across industries. Perfect for established businesses or ambitious startups.", 
    count: 3
  }, 
  {
    slug: "recruiting", 
    title: "Recruiting", 
    tagline: "HR & talent acquisition", 
    description: "Specialized domains for recruitment agencies, HR consultants, and talent acquisition professionals.", 
    count: 2
  }, 
  {
    slug: "design-content", 
    title: "Design & Content", 
    tagline: "Creative & marketing", 
    description: "Premium domains for design agencies, content creators, and marketing professionals.", 
    count: 2
  }
];

export const DOMAINS: Record<string, Domain[]> = {
  other: [
    {name: "needsites.com", status: "available", price: 1000000.0},
    {name: "accounting.delivery", status: "available", price: 2663.0}, 
    {name: "actuary.help", status: "available", price: 1062.0}
  ],
  recruiting: [
    {name: "hire.associates", status: "available", price: 3601.0}, 
    {name: "hire.management", status: "available", price: 3601.0}
  ],
  "design-content": [
    {name: "content.contractors", status: "available", price: 2827.0}, 
    {name: "contentmarketing.help", status: "available", price: 927.0}
  ]
};

export { CONTACT_EMAIL };