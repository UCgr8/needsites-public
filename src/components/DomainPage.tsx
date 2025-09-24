import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, Clock, Shield } from 'lucide-react';
import OfferModal from './OfferModal';
import BuyNowModal from './BuyNowModal';
import RTOModal from './RTOModal';
import { useDomainData } from '@/hooks/useDomainData';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';
import { getParam, setParams, removeParam } from '@/lib/urlState';
import type { DomainApiData } from '@/types';
import escrowLogo from '@/assets/escrow-logo.png';

export default function DomainPage() {
  const { name } = useParams<{ name: string }>();
  const { domainData, loading, error } = useDomainData(name || '');
  
  // Modal states
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [isRTOModalOpen, setIsRTOModalOpen] = useState(false);
  
  // URL params for attribution
  const [urlParams, setUrlParams] = useState<{ src?: string; host?: string }>({});

  // Handle URL params on mount
  useEffect(() => {
    const src = getParam('src');
    const host = getParam('host');
    const flow = getParam('flow');
    
    setUrlParams({ 
      src: src || undefined, 
      host: host || undefined 
    });
    
    // Auto-open modal based on flow param
    if (flow === 'offer') {
      setIsOfferModalOpen(true);
      analytics.track('offer_open', {
        domain: domainData?.domain,
        price: domainData?.bin_price,
        bundle: domainData?.bundle,
        tags: domainData?.tags,
        src,
        host
      });
    } else if (flow === 'bin') {
      setIsBuyNowModalOpen(true);
      analytics.track('bin_open', {
        domain: domainData?.domain,
        price: domainData?.bin_price,
        bundle: domainData?.bundle,
        tags: domainData?.tags,
        src,
        host
      });
    } else if (flow === 'rto') {
      setIsRTOModalOpen(true);
      analytics.track('rto_open', {
        domain: domainData?.domain,
        price: domainData?.bin_price,
        bundle: domainData?.bundle,
        tags: domainData?.tags,
        src,
        host
      });
    }
  }, [domainData]);

  // Handle modal close with URL cleanup
  const handleModalClose = (modalType: 'offer' | 'bin' | 'rto') => {
    removeParam('flow');
    
    switch (modalType) {
      case 'offer':
        setIsOfferModalOpen(false);
        break;
      case 'bin':
        setIsBuyNowModalOpen(false);
        break;
      case 'rto':
        setIsRTOModalOpen(false);
        break;
    }
  };

  // Handle modal open with URL params
  const handleModalOpen = (modalType: 'offer' | 'bin' | 'rto') => {
    setParams({ flow: modalType });
    
    const eventPayload = {
      domain: domainData?.domain,
      price: domainData?.bin_price,
      bundle: domainData?.bundle,
      tags: domainData?.tags,
      src: urlParams.src,
      host: urlParams.host
    };
    
    switch (modalType) {
      case 'offer':
        setIsOfferModalOpen(true);
        analytics.track('offer_open', eventPayload);
        break;
      case 'bin':
        setIsBuyNowModalOpen(true);
        analytics.track('bin_open', eventPayload);
        break;
      case 'rto':
        setIsRTOModalOpen(true);
        analytics.track('rto_open', eventPayload);
        break;
    }
  };

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
    const primaryKeyword = domainData.primary_keyword || domain.split('.')[0];
    
    // If useCases exist in the API data, use them
    if (domainData.useCases && domainData.useCases.length > 0) {
      return domainData.useCases;
    }
    
    // Otherwise, generate persuasive use cases
    const baseUseCases = [
      {
        title: "Agency / Services",
        valueProp: `Turn searches for "${primaryKeyword}" into booked consultations. A brandable, exact-match domain boosts credibility and close rates.`,
        example: `Premium ${primaryKeyword} consulting`
      },
      {
        title: "Keyword-Rich Landing Page", 
        valueProp: `Match intent in the URL, improve Quality Score/CTR, and make paid traffic convert without extra explaining.`,
        example: `High-converting ${primaryKeyword} campaigns`
      },
      {
        title: "SEO & SEM Hub",
        valueProp: `Own the query. Publish comparisons, guides, and pricing to rank for intent terms—and cut CAC in paid.`,
        example: `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} authority site`
      },
      {
        title: "AI Service Tool",
        valueProp: `Deliver instant ${primaryKeyword} outputs and capture emails; a memorable domain becomes the product people share.`,
        example: `AI-powered ${primaryKeyword} platform`
      },
      {
        title: "Blog / Content Library", 
        valueProp: `Publish problem–solution content that compounds topical authority and drives steady inbound leads.`,
        example: `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} resource hub`
      },
      {
        title: "Marketplace or Platform",
        valueProp: `Aggregate demand & supply around ${primaryKeyword} and build a fee-based platform over time.`,
        example: `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} marketplace`
      }
    ];
    
    return baseUseCases.slice(0, 4); // Return top 4 use cases
  };

  const handleBuyNowClick = () => {
    handleModalOpen('bin');
  };

  const handleRentToOwnClick = () => {
    handleModalOpen('rto');
  };

  const handleViewDomainClick = () => {
    analytics.track('view_domain_click', {
      domain: domainData.domain,
      price: domainData.bin_price,
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

  // Calculate RTO monthly payment
  const calculateRTOMonthly = (binPrice: number, months: number = 36, downPayment: number = 0) => {
    return Math.ceil((binPrice - downPayment) / months);
  };

  const handleRTOTeaserClick = () => {
    // Scroll to the "Multiple ways" section
    const waysSection = document.getElementById('ways-to-get-domain');
    if (waysSection) {
      waysSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Then open RTO modal
    setTimeout(() => handleModalOpen('rto'), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4 animate-page-fade">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <Card className="apple-card p-8">
          <CardContent className="p-0 space-y-4">
            {/* Domain name and view link */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                {domainData.domain}
              </h1>
              
              {domainData.domain_is_live && (
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

            {/* Price, badge, and urgency */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {domainData.bin_price && (
                  <div className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-lg">
                    BIN: {formatPrice(domainData.bin_price)}
                  </div>
                )}
                <Badge variant="secondary" className="px-3 py-1.5 font-medium">
                  Available now
                </Badge>
              </div>
            </div>

            {/* Urgency message */}
            <p className="text-sm text-muted-foreground max-w-2xl">
              {urgencyMessage}
            </p>

            {/* Tags */}
            {domainData.tags && domainData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2" style={{ rowGap: '8px' }}>
                {domainData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              {domainData.availability_bin && (
                <Button 
                  onClick={handleBuyNowClick}
                  size="lg"
                  className="flex-1 sm:flex-none px-8 py-3 h-auto rounded-lg"
                  aria-label={`Buy Now for ${domainData.domain}`}
                >
                  Buy Now
                </Button>
              )}
              
              {domainData.availability_offer && (
                <Button 
                  variant="outline"
                  onClick={() => handleModalOpen('offer')}
                  size="lg"
                  className="flex-1 sm:flex-none px-8 py-3 h-auto rounded-lg"
                  aria-label={`Make an Offer for ${domainData.domain}`}
                >
                  Make an Offer
                </Button>
              )}
              
              {domainData.availability_rto && (
                <Button 
                  variant="ghost"
                  onClick={() => handleModalOpen('rto')}
                  size="lg"
                  className="flex-1 sm:flex-none px-8 py-3 h-auto rounded-lg border border-border hover:bg-muted"
                  aria-label={`Start Rent to Own for ${domainData.domain}`}
                >
                  Start RTO
                </Button>
              )}
            </div>

            {/* RTO Teaser */}
            {domainData.availability_rto && domainData.bin_price && (
              <button
                onClick={handleRTOTeaserClick}
                className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer text-left"
              >
                Or from ${calculateRTOMonthly(domainData.bin_price)}/mo for 36 months (RTO)
              </button>
            )}

            {/* Trust Bar */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 mt-3">
              <div className="flex items-center gap-3">
                <img 
                  src={escrowLogo} 
                  alt="Escrow.com" 
                  className="h-5 w-auto object-contain"
                />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Protected by Escrow.com.</span> We pay 100% of the Escrow.com fees.
                </p>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {useCases.map((useCase, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-2">
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
        <Card className="apple-card" id="ways-to-get-domain">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">Multiple ways to get this domain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              
              {domainData.availability_bin && (
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Buy Now</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Immediate purchase at the listed price.
                    </p>
                    <p className="text-xs text-muted-foreground italic">
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

              {domainData.availability_offer && (
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Make an Offer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      Propose your best number or bundle. Reply within 1 business day.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleModalOpen('offer')} 
                      className="w-full h-10"
                      aria-label={`Make an Offer for ${domainData.domain}`}
                    >
                      Make an Offer
                    </Button>
                  </CardContent>
                </Card>
              )}

              {domainData.availability_rto && (
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Rent to Own</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      From ${calculateRTOMonthly(domainData.bin_price || 0)}/mo for 36 months via Escrow.com Domain Holding.
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      We pay 100% of Escrow.com fees.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleModalOpen('rto')} 
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

      {/* Modals */}
      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => handleModalClose('offer')}
        domain={domainData.domain}
        binPrice={domainData.bin_price || 0}
        bundle={domainData.bundle}
        tags={domainData.tags}
        src={urlParams.src}
        host={urlParams.host}
      />
      
      <BuyNowModal
        isOpen={isBuyNowModalOpen}
        onClose={() => handleModalClose('bin')}
        domain={domainData.domain}
        binPrice={domainData.bin_price || 0}
        bundle={domainData.bundle}
        tags={domainData.tags}
        src={urlParams.src}
        host={urlParams.host}
      />
      
      <RTOModal
        isOpen={isRTOModalOpen}
        onClose={() => handleModalClose('rto')}
        domain={domainData.domain}
        binPrice={domainData.bin_price || 0}
        bundle={domainData.bundle}
        tags={domainData.tags}
        src={urlParams.src}
        host={urlParams.host}
      />
    </div>
  );
}
