import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, Clock, Shield } from 'lucide-react';
import OfferModal from './OfferModal';
import type { OfferFormData } from './OfferModal';
import { useDomainData } from '@/hooks/useDomainData';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';
import type { DomainApiData } from '@/types';
import escrowLogo from '@/assets/escrow-logo.png';

export default function DomainPage() {
  const { name } = useParams<{ name: string }>();
  const { domainData, loading, error } = useDomainData(name || '');
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  // Handle missing domain name
  if (!name) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Domain not found</h1>
          <Link to="/bundles" className="text-primary hover:underline">
            Back to Bundles
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading domain information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error loading domain</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link to="/bundles" className="text-primary hover:underline">
            Back to Bundles
          </Link>
        </div>
      </div>
    );
  }

  // Domain not found in API
  if (!domainData) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">{name}</h1>
          <p className="text-muted-foreground mb-8">
            This domain is not currently in our system. Please contact us for more information.
          </p>
          <div className="space-x-4">
            <Link to="/contact">
              <Button>Contact Us</Button>
            </Link>
            <Link to="/bundles">
              <Button variant="outline">Browse All Domains</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Generate use cases based on domain data with persuasive mini-pitches
  const generateUseCases = (domainData: DomainApiData) => {
    const domain = domainData.domain;
    const primaryKeyword = domainData.primaryKeyword || domain.split('.')[0];
    
    // If useCases exist in the API data, use them
    if (domainData.useCases && domainData.useCases.length > 0) {
      return domainData.useCases;
    }
    
    // Otherwise, generate persuasive use cases
    const baseUseCases = [
      {
        title: "Agency / Services",
        valueProp: `Turn passive searches for "${primaryKeyword}" into booked consultations. A brandable, exact-match domain lifts credibility and close rates.`,
        example: `Premium ${primaryKeyword} consulting`
      },
      {
        title: "Keyword-Rich Landing Page",
        valueProp: `Match search intent in the URL, improve Quality Score/CTR, and make paid traffic convert without extra explaining.`,
        example: `High-converting ${primaryKeyword} campaigns`
      },
      {
        title: "SEO & SEM Hub", 
        valueProp: `Own the query. Publish comparison pages, guides, and pricing to rank for intent terms—and cut CAC in paid.`,
        example: `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} authority site`
      },
      {
        title: "AI Service Tool",
        valueProp: `Deliver instant ${primaryKeyword} outputs and capture emails. A memorable domain becomes the product people share.`,
        example: `AI-powered ${primaryKeyword} platform`
      },
      {
        title: "Blog / Content Library",
        valueProp: `Publish problem-solution content that compounds topical authority and drives steady inbound leads.`,
        example: `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} resource hub`
      }
    ];
    
    return baseUseCases.slice(0, 4); // Return top 4 use cases
  };

  const handleOfferSubmit = async (offerData: OfferFormData) => {
    try {
      // Track analytics
      analytics.track('domain_offer_submit', {
        domain: domainData.domain,
        price: domainData.binPrice,
        bundle: domainData.bundle,
        tags: domainData.tags
      });

      // Here you would submit to your backend
      console.log('Offer submitted:', { domain: domainData.domain, ...offerData });
      
      toast({
        title: "Offer Submitted",
        description: "We'll review your offer and respond within 1 business day.",
      });
      
      setOfferModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBuyNowClick = () => {
    analytics.track('domain_bin_click', {
      domain: domainData.domain,
      price: domainData.binPrice,
      bundle: domainData.bundle,
      tags: domainData.tags
    });
    
    // Create checkout URL with parameters
    const params = new URLSearchParams(window.location.search);
    const src = params.get('src') || '';
    const host = params.get('host') || '';
    
    const checkoutParams = new URLSearchParams({
      domain: domainData.domain,
      price: domainData.binPrice?.toString() || '',
      action: 'buy',
      ...(src && { src }),
      ...(host && { host })
    });
    
    // For now, just show a toast - replace with actual checkout flow
    toast({
      title: "Redirecting to checkout...",
      description: `Processing purchase for ${domainData.domain}`,
    });
  };

  const handleRentToOwnClick = () => {
    analytics.track('domain_rto_open', {
      domain: domainData.domain,
      price: domainData.binPrice,
      bundle: domainData.bundle,
      tags: domainData.tags
    });
    setOfferModalOpen(true);
  };

  const handleViewDomainClick = () => {
    analytics.track('view_domain_click', {
      domain: domainData.domain,
      price: domainData.binPrice,
      bundle: domainData.bundle,
      tags: domainData.tags
    });
  };

  const useCases = generateUseCases(domainData);

  // Generate urgency message (rotate between two options)
  const urgencyMessages = [
    "This is a one-of-a-kind domain. Don't let a competitor get it first.",
    "Secure this unique digital asset before it's gone."
  ];
  const urgencyMessage = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4 animate-page-fade">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <Card className="apple-card p-8">
          <CardContent className="p-0">
            {/* Row 1: Domain, Price, Badge, View Domain */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-2">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {domainData.domain}
                </h1>
                
                {domainData.domainIsLive && (
                  <a
                    href={`https://${domainData.domain}`}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    onClick={handleViewDomainClick}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    aria-label="Open live domain in a new tab"
                  >
                    View domain <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {domainData.binPrice && (
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                    BIN: {formatPrice(domainData.binPrice)}
                  </div>
                )}
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="secondary" className="w-fit">
                    Available now
                  </Badge>
                  <p className="text-xs text-muted-foreground max-w-xs text-right">
                    {urgencyMessage}
                  </p>
                </div>
              </div>
            </div>

            {/* RTO Pricing (if available) */}
            {domainData.availability?.rto && domainData.rtoMonthly && domainData.rtoMonths && (
              <div className="text-sm text-muted-foreground mb-2">
                Or from {formatPrice(domainData.rtoMonthly)}/mo for {domainData.rtoMonths} months (RTO)
              </div>
            )}

            {/* Row 2: Tags and CTAs */}
            <div className="space-y-3">
              {/* Tags */}
              {domainData.tags && domainData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {domainData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                {domainData.availability?.bin && (
                  <Button 
                    onClick={handleBuyNowClick}
                    size="lg"
                    className="flex-1 sm:flex-none px-8 py-3 h-auto"
                    aria-label={`Buy Now for ${domainData.domain}`}
                  >
                    Buy Now
                  </Button>
                )}
                
                {domainData.availability?.offer && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      analytics.track('domain_offer_open', {
                        domain: domainData.domain,
                        price: domainData.binPrice,
                        bundle: domainData.bundle,
                        tags: domainData.tags
                      });
                      setOfferModalOpen(true);
                    }}
                    size="lg"
                    className="flex-1 sm:flex-none px-8 py-3 h-auto"
                    aria-label={`Make an Offer for ${domainData.domain}`}
                  >
                    Make an Offer
                  </Button>
                )}
                
                {domainData.availability?.rto && (
                  <Button 
                    variant="outline"
                    onClick={handleRentToOwnClick}
                    size="lg"
                    className="flex-1 sm:flex-none px-8 py-3 h-auto"
                    aria-label={`Start Rent to Own for ${domainData.domain}`}
                  >
                    Start RTO
                  </Button>
                )}
              </div>

              {/* Trust Bar */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 mt-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={escrowLogo} 
                    alt="Escrow.com" 
                    className="h-5 w-auto object-contain"
                  />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Protected by Escrow.com.</span> When you buy through NeedSites, we pay 100% of the Escrow.com fees.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why this domain */}
        <Card className="apple-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              Why this domain?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div className="py-1">
                  <p className="font-semibold text-foreground mb-1">Keyword clarity</p>
                  <p className="text-sm text-muted-foreground">A clear, keyword-rich domain helps ads and SEO match intent, lifting CTR and driving qualified leads to your business.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="py-1">
                  <p className="font-semibold text-foreground mb-1">Memorable & credible</p>
                  <p className="text-sm text-muted-foreground">An intuitive, professional name builds instant trust—making you the go-to authority in your niche.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="py-1">
                  <p className="font-semibold text-foreground mb-1">Fast transfer</p>
                  <p className="text-sm text-muted-foreground">We make it simple. Get your domain in 1–5 business days, fully protected by Escrow.com (we pay the fees).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases & Value Propositions */}
        <Card className="apple-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Use Cases & Value Propositions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {useCases.map((useCase, index) => (
                <div key={index} className="space-y-2 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-base text-foreground">
                    {useCase.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {useCase.valueProp}
                  </p>
                  {useCase.example && (
                    <p className="text-xs text-muted-foreground/70 italic">
                      {useCase.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Domain details */}
        <Card className="apple-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Domain Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Length</span>
                <span className="font-medium text-foreground">
                  {domainData.length || domainData.domain.length} characters
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Extension</span>
                <span className="font-medium text-foreground">
                  .{domainData.tld || domainData.domain.split('.').pop()}
                </span>
              </div>
              {domainData.bundle && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Bundle</span>
                  <span className="font-medium text-foreground">{domainData.bundle}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Multiple ways to get this domain */}
        <Card className="apple-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Multiple ways to get this domain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              
              {domainData.availability?.bin && (
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Buy Now</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Immediate purchase at listed price.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      We pay 100% of Escrow.com fees.
                    </p>
                    <Button 
                      onClick={handleBuyNowClick} 
                      className="w-full h-10"
                      aria-label={`Buy Now for ${domainData.domain}`}
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              )}

              {domainData.availability?.offer && (
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Make an Offer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Propose your best number or bundle. Reply in 1 business day.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        analytics.track('domain_offer_open', {
                          domain: domainData.domain,
                          price: domainData.binPrice,
                          bundle: domainData.bundle,
                          tags: domainData.tags
                        });
                        setOfferModalOpen(true);
                      }} 
                      className="w-full h-10"
                      aria-label={`Make an Offer for ${domainData.domain}`}
                    >
                      Make an Offer
                    </Button>
                  </CardContent>
                </Card>
              )}

              {domainData.availability?.rto && (
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Rent to Own</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      {domainData.rtoMonthly && domainData.rtoMonths ? 
                        `From ${formatPrice(domainData.rtoMonthly)}/mo for ${domainData.rtoMonths} months. Escrow.com Domain Holding.` :
                        "Monthly via Escrow.com Domain Holding."
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      We pay 100% of Escrow.com fees.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleRentToOwnClick} 
                      className="w-full h-10"
                      aria-label={`Start Rent to Own for ${domainData.domain}`}
                    >
                      Start RTO
                    </Button>
                  </CardContent>
                </Card>
              )}

            </div>
          </CardContent>
        </Card>

        {/* Footer Support Strip */}
        <Card className="apple-card">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-6 text-sm">
                <a href="/faqs" className="text-primary hover:underline">
                  FAQs
                </a>
                <a href="/contact" className="text-primary hover:underline">
                  Contact
                </a>
              </div>
              <p className="text-sm text-muted-foreground text-center sm:text-right max-w-md">
                After purchase, we'll learn your goals and provide personalized founder consulting to help you start strong.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offer Modal */}
      <OfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        domainName={domainData.domain}
        binPrice={domainData.binPrice}
        onSubmit={handleOfferSubmit}
      />
    </div>
  );
}
