import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, MessageCircle, Mail, ArrowUp, Shield, Clock, Users, HeartHandshake, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  badge?: string;
  featured?: boolean;
}

const faqData: FAQ[] = [
  // Featured FAQs
  {
    id: 'featured-1',
    category: 'Getting Started',
    question: 'What makes NeedSites different?',
    answer: 'NeedSites is curated keyword domains + hands-on help after purchase. Buy direct and you get the same BIN as marketplaces, we pay all Escrow.com fees, and you\'ll receive personalized founder consulting—we first learn about your company, vision, and model, then give tailored guidance.',
    featured: true
  },
  {
    id: 'featured-2',
    category: 'Escrow & Transfer',
    question: 'Do you really pay all Escrow.com fees?',
    answer: 'Yes. When you buy on NeedSites, we pay 100% of Escrow.com fees. You pay the same domain price you see on Afternic/Sedo/DaaZ, but your total out-the-door cost is lower here because we cover escrow.',
    badge: 'We pay all Escrow.com fees',
    featured: true
  },
  {
    id: 'featured-3',
    category: 'Direct vs. Marketplaces',
    question: 'Is the price the same here as on marketplaces?',
    answer: 'Yes. We keep price parity on the domain itself. The difference is what you get here: personalized founder consulting and guided transfer—plus we pay the escrow fee.',
    featured: true
  },
  {
    id: 'featured-4',
    category: 'Personalized Consulting',
    question: 'What exactly happens after I buy?',
    answer: 'We open Escrow.com and guide the transfer. Then we send you a short intake to learn your goals, audience, offer, and constraints. From there we do a 60-minute consulting session with tailored advice and a simple sequence of next steps.',
    featured: true
  },
  {
    id: 'featured-5',
    category: 'Escrow & Transfer',
    question: 'How fast can I get the domain?',
    answer: 'Most transfers complete within 1–5 business days after funds clear in Escrow.com (registrar/TLD dependent). We\'ll guide timing and steps so it\'s smooth.',
    featured: true
  },

  // Getting Started
  {
    id: 'gs-1',
    category: 'Getting Started',
    question: 'Who is NeedSites for?',
    answer: 'Founders, agencies, and operators who want to launch faster with keyword-focused domains that clarify the offer and convert better.'
  },
  {
    id: 'gs-2',
    category: 'Getting Started',
    question: 'Where can I ask questions before I buy?',
    answer: 'Use /contact—tell us your use case and timeline; we\'ll reply quickly during business hours (ET).'
  },

  // Buying & Pricing
  {
    id: 'bp-1',
    category: 'Buying & Pricing',
    question: 'Is the price negotiable?',
    answer: 'If a name is marked BIN, that\'s the buy-now price. You can still click Make an Offer with context; we consider reasonable offers and package/bundle pricing.'
  },
  {
    id: 'bp-2',
    category: 'Buying & Pricing',
    question: 'Do you offer payment plans?',
    answer: 'Yes—Rent-to-Own (RTO) via Escrow.com Domain Holding. See the RTO category below.'
  },
  {
    id: 'bp-3',
    category: 'Buying & Pricing',
    question: 'Why keep the same price as marketplaces?',
    answer: 'Parity avoids confusion and keeps the ecosystem clean. We differentiate with personalized consulting and we cover Escrow.com fees.'
  },

  // Direct vs. Marketplaces
  {
    id: 'dm-1',
    category: 'Direct vs. Marketplaces',
    question: 'Why buy direct instead of Afternic/Sedo/DaaZ?',
    answer: 'Same BIN price, but direct includes personalized founder consulting, guided transfer, and we pay the escrow fee.'
  },
  {
    id: 'dm-2',
    category: 'Direct vs. Marketplaces',
    question: 'I discovered the domain on a marketplace—can I still buy here?',
    answer: 'Yes. You\'ll pay the same price but receive more help and we\'ll cover escrow. If you prefer, we can complete the sale on the marketplace you found it on.'
  },

  // Escrow & Transfer
  {
    id: 'et-1',
    category: 'Escrow & Transfer',
    question: 'Which escrow do you use?',
    answer: 'We use Escrow.com for direct purchases. We create the transaction and we pay all Escrow.com fees.',
    badge: 'We pay all Escrow.com fees'
  },
  {
    id: 'et-2',
    category: 'Escrow & Transfer',
    question: 'Who initiates the transfer?',
    answer: 'We do. We\'ll guide you on unlocking, auth codes, or push—depending on the registrar/TLD.'
  },
  {
    id: 'et-3',
    category: 'Escrow & Transfer',
    question: 'How long does escrow take?',
    answer: 'Usually 1–5 business days from funding to transfer completion; some ccTLDs may take longer due to registry rules.'
  },

  // Rent-to-Own (RTO)
  {
    id: 'rto-1',
    category: 'Rent-to-Own (RTO)',
    question: 'How does RTO work here?',
    answer: 'We use Escrow.com Domain Holding. You pay monthly; the domain sits in holding until final payment. We\'ll configure a clean schedule on day one.'
  },
  {
    id: 'rto-2',
    category: 'Rent-to-Own (RTO)',
    question: 'When do I get the personalized consulting on RTO?',
    answer: 'Right after your first payment clears in Escrow.com (following your brief intake).'
  },
  {
    id: 'rto-3',
    category: 'Rent-to-Own (RTO)',
    question: 'Can I point DNS during RTO?',
    answer: 'Yes—lightweight DNS changes are possible through holding. We\'ll help request them through Escrow.com where permitted.'
  },
  {
    id: 'rto-4',
    category: 'Rent-to-Own (RTO)',
    question: 'What happens if I miss a payment?',
    answer: 'Escrow.com follows the agreed schedule and grace terms. Missed payments can pause or cancel the agreement—tell us early if you need adjustments.'
  },

  // Bundles
  {
    id: 'b-1',
    category: 'Bundles',
    question: 'What\'s the benefit of a bundle?',
    answer: 'Category coverage: more surfaces for demand, interlinking for topical strength, shared ops, and future resale options.'
  },
  {
    id: 'b-2',
    category: 'Bundles',
    question: 'Can I customize a bundle?',
    answer: 'Yes. Tell us your niche and we can propose a custom bundle and price.'
  },
  {
    id: 'b-3',
    category: 'Bundles',
    question: 'Do bundles sell out?',
    answer: 'Yes—bundles are limited and sometimes reserved on inquiry. If one fits, move early.'
  },

  // Offers & Negotiation
  {
    id: 'on-1',
    category: 'Offers & Negotiation',
    question: 'How do I make an offer?',
    answer: 'Click Make an Offer on the domain page. Enter your offer amount and contact info. You\'ll get an email confirmation and we\'ll reply within one business day with an accept, decline, or counter.\n\nTip: Include context (use case, timing, budget constraints)—it helps us respond faster and more precisely.'
  },
  {
    id: 'on-2',
    category: 'Offers & Negotiation',
    question: 'Is there a minimum offer?',
    answer: 'Yes. Each domain has a visible minimum offer threshold in the offer modal. Offers below that won\'t submit. If you\'re close, add context and we\'ll review.'
  },
  {
    id: 'on-3',
    category: 'Offers & Negotiation',
    question: 'Does Buy It Now override offers?',
    answer: 'Yes. Buy It Now (BIN) completes purchase immediately and may remove the name from availability. If a domain is critical, use BIN to avoid losing it during negotiations.'
  },
  {
    id: 'on-4',
    category: 'Offers & Negotiation',
    question: 'Can I request Rent-to-Own after making an offer?',
    answer: 'Yes. You can propose RTO terms in your offer (months and down payment), or we can switch an accepted cash offer to RTO before we open escrow. (Your personalized 60-minute consulting session happens after the first payment clears.)'
  },
  {
    id: 'on-5',
    category: 'Offers & Negotiation',
    question: 'Do you pay Escrow.com fees on negotiated deals too?',
    answer: 'Yes. Whether you use BIN, RTO, or a negotiated price, we pay 100% of Escrow.com fees on direct NeedSites purchases.',
    badge: 'We pay all Escrow.com fees'
  },
  {
    id: 'on-6',
    category: 'Offers & Negotiation',
    question: 'How long is an offer valid?',
    answer: 'Your offer remains valid for 72 hours unless you revoke it sooner. Our counteroffers are valid for 48 hours. During that window, the domain remains available to others until funds are committed.'
  },
  {
    id: 'on-7',
    category: 'Offers & Negotiation',
    question: 'Will you place a hold while we negotiate?',
    answer: 'We can hold a domain for 48 hours with a small non-refundable deposit applied to your purchase. Ask via the offer modal or /contact.'
  },
  {
    id: 'on-8',
    category: 'Offers & Negotiation',
    question: 'Can I make an offer on a bundle?',
    answer: 'Yes. Propose a bundle offer (list the domains) or ask for a custom bundle in your message. Bundle pricing is more flexible than single-name pricing.'
  },
  {
    id: 'on-9',
    category: 'Offers & Negotiation',
    question: 'Can I negotiate privately by email?',
    answer: 'Yes—use /contact if you prefer email. For speed and clarity, we\'ll still send the final terms via a secure link and complete the deal through Escrow.com.'
  },
  {
    id: 'on-10',
    category: 'Offers & Negotiation',
    question: 'Are offers confidential?',
    answer: 'Yes. We don\'t publish or share your offer details. If multiple buyers are active, we\'ll tell you the domain is in play, but not disclose amounts.'
  },
  {
    id: 'on-11',
    category: 'Offers & Negotiation',
    question: 'What happens after we agree on price/terms?',
    answer: 'We create the Escrow.com transaction (we pay all fees). Once funds clear, we guide the transfer (push or auth-code) and schedule your personalized 60-minute consulting session (after intake).'
  },
  {
    id: 'on-12',
    category: 'Offers & Negotiation',
    question: 'What if I need an invoice, PO, or NDA?',
    answer: 'We can provide a pro-forma invoice, paid invoice/receipt, and a simple mutual NDA upon request. Mention this in your offer notes.'
  },
  {
    id: 'on-13',
    category: 'Offers & Negotiation',
    question: 'Can I trade assets or equity instead of cash?',
    answer: 'Generally no; we keep deals straightforward (cash or RTO via Escrow.com). If you have a compelling case, include it in your message and we\'ll review.'
  },

  // Personalized Consulting
  {
    id: 'pc-1',
    category: 'Personalized Consulting',
    question: 'Why do you do an intake first?',
    answer: 'Because advice should fit your context. We review your industry, audience, goals, offer, budget, and timeline so the consulting is precise and actionable.'
  },
  {
    id: 'pc-2',
    category: 'Personalized Consulting',
    question: 'What should I prepare for the consulting session?',
    answer: 'A short paragraph on your vision, who you serve, the problem you solve, your first offer, and how you plan to reach customers. If you have examples or comps, bring them.'
  },
  {
    id: 'pc-3',
    category: 'Personalized Consulting',
    question: 'What\'s the outcome of the consulting session?',
    answer: 'A focused decision path and your next 3 moves—tailored to your constraints (time, skills, budget).'
  },
  {
    id: 'pc-4',
    category: 'Personalized Consulting',
    question: 'Do you record the call or send notes?',
    answer: 'We send concise call notes with the key decisions and next steps. Recording is optional on request.'
  },

  // Legal & Trademarks
  {
    id: 'lt-1',
    category: 'Legal & Trademarks',
    question: 'Are these domains trademark-safe?',
    answer: 'We focus on generic, descriptive names intended for legitimate business use. We do not provide legal advice—please consult your attorney about trademarks and brand use.'
  },
  {
    id: 'lt-2',
    category: 'Legal & Trademarks',
    question: 'Do you guarantee rankings or legal outcomes?',
    answer: 'No guarantees. We share best practices and help you start well.'
  },

  // Technical (DNS, Email, Hosting)
  {
    id: 'tech-1',
    category: 'Technical (DNS, Email, Hosting)',
    question: 'Where should I host?',
    answer: 'Anywhere you like. After transfer, you have full control. We can recommend options suited to your stack and skills.'
  },
  {
    id: 'tech-2',
    category: 'Technical (DNS, Email, Hosting)',
    question: 'Can you help point DNS or set email?',
    answer: 'Yes, we\'ll provide step-by-step guidance, and during RTO we\'ll coordinate permitted DNS changes through Escrow.com holding.'
  },
  {
    id: 'tech-3',
    category: 'Technical (DNS, Email, Hosting)',
    question: 'Will my existing brand live on this domain?',
    answer: 'Absolutely. Many buyers use keyword domains as campaign/category sites and route to their core brand.'
  },

  // Payments & Taxes
  {
    id: 'pt-1',
    category: 'Payments & Taxes',
    question: 'What payment methods are supported?',
    answer: 'Escrow.com supports wire and other options by region. We\'ll set up the transaction and guide you through funding.'
  },
  {
    id: 'pt-2',
    category: 'Payments & Taxes',
    question: 'Who pays bank fees?',
    answer: 'We cover Escrow.com fees entirely. Your bank\'s incoming wire fees (if any) are your responsibility.',
    badge: 'We pay all Escrow.com fees'
  },
  {
    id: 'pt-3',
    category: 'Payments & Taxes',
    question: 'Do you charge sales tax or VAT?',
    answer: 'Handled per Escrow.com and jurisdiction. We\'ll provide invoices/receipts as needed.'
  },

  // Policies (Refunds & Terms)
  {
    id: 'pol-1',
    category: 'Policies (Refunds & Terms)',
    question: 'Refunds?',
    answer: 'Domain sales are typically final once transfer is initiated. If there\'s an issue, contact us immediately and we\'ll work it out in good faith.'
  },
  {
    id: 'pol-2',
    category: 'Policies (Refunds & Terms)',
    question: 'Hold/Reserve?',
    answer: 'We can hold a domain briefly with a non-refundable deposit applied to purchase. Ask us on /contact.'
  },
  {
    id: 'pol-3',
    category: 'Policies (Refunds & Terms)',
    question: 'Privacy',
    answer: 'See our Privacy Policy for how we handle data during escrow and transfer.'
  },

  // Support
  {
    id: 'sup-1',
    category: 'Support',
    question: 'How do I reach you fastest?',
    answer: 'Use the "Still need help?" card on this page or /contact. We reply quickly during business hours (ET).'
  },
  {
    id: 'sup-2',
    category: 'Support',
    question: 'Can we talk before I buy?',
    answer: 'Yes—send context and a few times that work; we\'ll do a quick fit check.'
  }
];

const categories = [
  'All',
  'Featured',
  'Getting Started',
  'Buying & Pricing',
  'Direct vs. Marketplaces',
  'Escrow & Transfer',
  'Rent-to-Own (RTO)',
  'Bundles',
  'Offers & Negotiation',
  'Personalized Consulting',
  'Legal & Trademarks',
  'Technical (DNS, Email, Hosting)',
  'Payments & Taxes',
  'Policies (Refunds & Terms)',
  'Support'
];

const categoryIcons = {
  'Featured': BadgeCheck,
  'Getting Started': Users,
  'Buying & Pricing': Clock,
  'Direct vs. Marketplaces': HeartHandshake,
  'Escrow & Transfer': Shield,
  'Rent-to-Own (RTO)': Clock,
  'Bundles': Users,
  'Offers & Negotiation': HeartHandshake,
  'Personalized Consulting': Users,
  'Legal & Trademarks': Shield,
  'Technical (DNS, Email, Hosting)': Users,
  'Payments & Taxes': Clock,
  'Policies (Refunds & Terms)': Shield,
  'Support': MessageCircle
};

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track search queries for analytics
  useEffect(() => {
    if (searchQuery.trim()) {
      // Analytics tracking would go here
      console.log('FAQ search:', searchQuery);
    }
  }, [searchQuery]);

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredFaqs = useMemo(() => {
    let faqs = faqData;
    
    // Filter by category
    if (selectedCategory === 'Featured') {
      faqs = faqs.filter(faq => faq.featured);
    } else if (selectedCategory !== 'All') {
      faqs = faqs.filter(faq => faq.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      faqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      );
    }
    
    return faqs;
  }, [searchQuery, selectedCategory]);

  const featuredFaqs = faqData.filter(faq => faq.featured);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate JSON-LD structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | NeedSites</title>
        <meta name="description" content="Clear answers about buying direct on NeedSites and how our personalized consulting works. Find answers to common questions about domains, pricing, and transfers." />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background py-12 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 stagger-fade-1">
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1" />
              <div className="text-sm text-muted-foreground">
                Updated: September 23, 2025
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Clear answers about buying direct on NeedSites and how our personalized consulting works.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map(category => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <Button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      if (category !== 'All') {
                        scrollToCategory(category);
                      }
                    }}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="gap-2"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Featured FAQs */}
          {(selectedCategory === 'All' || selectedCategory === 'Featured') && !searchQuery && (
            <div className="mb-16">
              <div id="category-featured" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-8">
                  <BadgeCheck className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">Featured Questions</h2>
                </div>
                <div className="grid gap-4">
                  <Accordion type="single" collapsible className="space-y-4">
                    {featuredFaqs.map(faq => (
                      <AccordionItem key={faq.id} value={faq.id} className="border rounded-xl bg-card shadow-sm">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-xl [&[data-state=open]]:rounded-b-none">
                          <div className="flex items-start gap-4 w-full">
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                  {faq.category}
                                </span>
                                {faq.badge && (
                                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    {faq.badge}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-semibold text-card-foreground">
                                {faq.question}
                              </h3>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="pt-4 border-t border-border">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          )}

          {/* All FAQs by Category */}
          {selectedCategory === 'All' && !searchQuery ? (
            <div className="space-y-16">
              {categories.slice(2).map(category => {
                const categoryFaqs = faqData.filter(faq => faq.category === category && !faq.featured);
                if (categoryFaqs.length === 0) return null;
                
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
                
                return (
                  <div key={category} id={`category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-8">
                      {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                      <h2 className="text-3xl font-bold">{category}</h2>
                    </div>
                    <Accordion type="single" collapsible className="space-y-4">
                      {categoryFaqs.map(faq => (
                        <AccordionItem key={faq.id} value={faq.id} className="border rounded-xl bg-card shadow-sm">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-xl [&[data-state=open]]:rounded-b-none">
                            <div className="flex items-start gap-4 w-full">
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2 mb-2">
                                  {faq.badge && (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                                      <Shield className="w-3 h-3" />
                                      {faq.badge}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-semibold text-card-foreground">
                                  {faq.question}
                                </h3>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <div className="pt-4 border-t border-border">
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>
          ) : (
            // Filtered FAQs
            <div className="mb-16">
              {searchQuery && (
                <div className="mb-8">
                  <p className="text-muted-foreground">
                    {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>
                </div>
              )}
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map(faq => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-xl bg-card shadow-sm">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-xl [&[data-state=open]]:rounded-b-none">
                      <div className="flex items-start gap-4 w-full">
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {faq.category}
                            </span>
                            {faq.badge && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                {faq.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-card-foreground">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pt-4 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No FAQs found matching your search.</p>
                  <Button 
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Bottom Note */}
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Same domain price as marketplaces. When you buy here, we pay all Escrow.com fees, provide a personalized 60-minute consulting session after a short intake, and guide a smooth transfer—so you start strong and waste less time.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="gap-2">
              <Link to="/categories">
                Browse Domains
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/info">
                Start Here (what you get)
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/contact">
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </Button>
          </div>
        </div>


        {/* Back to Top Button */}
        {showBackToTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-50 rounded-full w-12 h-12 p-0"
            size="icon"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
      </div>
    </>
  );
}