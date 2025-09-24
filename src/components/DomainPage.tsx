import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, ExternalLink, Target, Users, Zap, ChevronRight, HelpCircle, MessageSquare } from 'lucide-react';
import { useDomainData, DomainApiData } from '../hooks/useDomainData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import OfferModal, { OfferFormData } from './OfferModal';
import { analytics } from '../utils/analytics';
import { useToast } from '@/hooks/use-toast';
export default function DomainPage() {
  const { name } = useParams<{ name: string }>();
  const { domainData, loading, error } = useDomainData(name || '');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const { toast } = useToast();

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

  const generateUseCases = (domain: DomainApiData): Array<{title: string; valueProp: string; example: string}> => {
    if (domain.useCases && domain.useCases.length > 0) {
      return domain.useCases;
    }

    // Generate use cases based on primaryKeyword and tags
    const keyword = domain.primaryKeyword || domain.domain.split('.')[0];
    const useCases = [];

    // Always include at least these 3
    useCases.push({
      title: "Keyword-Rich Landing Page",
      valueProp: `Exact-match clarity for ${keyword} campaigns.`,
      example: `"Get ${keyword} Solutions Today"`
    });

    useCases.push({
      title: "SEO & SEM Hub", 
      valueProp: "Own the query. Rank for intent terms and lower CAC.",
      example: `"#1 ${keyword} Resource"`
    });

    useCases.push({
      title: "Agency / Services",
      valueProp: `Turn ${keyword} searches into booked consults.`,
      example: `"Expert ${keyword} Consulting"`
    });

    // Add additional based on tags
    if (domain.tags?.includes('SaaS') || domain.tags?.includes('AI')) {
      useCases.push({
        title: "AI Service Tool",
        valueProp: `Deliver instant ${keyword} outputs with AI.`,
        example: `"AI-Powered ${keyword} Generator"`
      });
    }

    if (domain.tags?.includes('Marketing') || domain.tags?.includes('Content')) {
      useCases.push({
        title: "Blog / Content Library",
        valueProp: "Publish problem–solution content that compounds authority.",
        example: `"Ultimate ${keyword} Guide"`
      });
    }

    // Add marketplace if appropriate
    if (useCases.length < 5) {
      useCases.push({
        title: "Marketplace or Platform",
        valueProp: `Aggregate demand & supply around ${keyword}.`,
        example: `"Connect ${keyword} Buyers & Sellers"`
      });
    }

    return useCases.slice(0, 5); // Max 5 use cases
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
    
    // Redirect to purchase flow - customize this URL
    window.open(`https://www.escrow.com/domain/${domainData.domain}`, '_blank');
  };

  const handleRentToOwnClick = () => {
    analytics.track('domain_rto_open', {
      domain: domainData.domain,
      price: domainData.binPrice,
      bundle: domainData.bundle,
      tags: domainData.tags
    });
    
    // For now, open offer modal - you can customize this
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
  return (
    <>
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Hero Block */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-needsites-orange/10 rounded-3xl p-8 md:p-12">
              
              {/* Domain name and price */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                  {domainData.domain}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {domainData.binPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-muted-foreground">BIN:</span>
                      <span className="text-3xl font-bold text-needsites-orange">
                        {formatPrice(domainData.binPrice)}
                      </span>
                    </div>
                  )}
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Available now
                  </Badge>
                </div>

                {/* Tags */}
                {domainData.tags && domainData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domainData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Secondary link if domain is live */}
                {domainData.domainIsLive && (
                  <div className="mb-6">
                    <a
                      href={`https://${domainData.domain}`}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      onClick={handleViewDomainClick}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      aria-label="Open live domain in a new tab"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View domain
                    </a>
                  </div>
                )}

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {domainData.availability?.bin && (
                    <Button 
                      onClick={handleBuyNowClick}
                      className="px-8 py-4 text-lg font-semibold"
                      size="lg"
                    >
                      Buy It Now
                    </Button>
                  )}
                  
                  {domainData.availability?.offer && (
                    <Button 
                      variant="outline"
                      onClick={() => setOfferModalOpen(true)}
                      className="px-8 py-4 text-lg font-semibold"
                      size="lg"
                    >
                      Make an Offer
                    </Button>
                  )}
                  
                  {domainData.availability?.rto && (
                    <Button 
                      variant="secondary"
                      onClick={handleRentToOwnClick}
                      className="px-8 py-4 text-lg font-semibold"
                      size="lg"
                    >
                      Rent to Own
                    </Button>
                  )}
                </div>

                {/* Trust note */}
                <p className="text-sm text-muted-foreground">
                  When you buy through NeedSites, we pay 100% of the Escrow.com fees. 
                  Protected by Escrow.com. Typical transfer: 1–5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Why this domain? */}
          <div className="mb-12">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-8">Why this domain?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Keyword clarity</p>
                    <p className="text-sm text-muted-foreground">easier CTR in ads & search</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Memorable & credible</p>
                    <p className="text-sm text-muted-foreground">better referrals and response</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Fast transfer</p>
                    <p className="text-sm text-muted-foreground">guided via Escrow.com (we pay the fees)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases & Value Propositions */}
          <div className="mb-12">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-8">Use Cases & Value Propositions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="p-6 border border-border rounded-xl hover:border-primary/20 transition-colors">
                    <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                    <p className="text-sm text-foreground mb-3">{useCase.valueProp}</p>
                    <p className="text-xs text-muted-foreground italic">{useCase.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Domain details */}
          <div className="mb-12">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Domain Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Length</span>
                  <span className="font-medium text-card-foreground">
                    {domainData.length || domainData.domain.length} characters
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Extension</span>
                  <span className="font-medium text-card-foreground">
                    .{domainData.tld || domainData.domain.split('.').pop()}
                  </span>
                </div>
                {domainData.bundle && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Bundle</span>
                    <span className="font-medium text-card-foreground">{domainData.bundle}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ways to buy */}
          <div className="mb-12">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-8">Multiple ways to get this domain</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Buy It Now */}
                <div className="p-6 border border-border rounded-xl text-center">
                  <h3 className="font-semibold text-foreground mb-2">Buy It Now</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Immediate purchase at the listed price.
                  </p>
                  <p className="text-xs text-muted-foreground">We pay 100% of Escrow.com fees.</p>
                </div>

                {/* Make an Offer */}
                <div className="p-6 border border-border rounded-xl text-center">
                  <h3 className="font-semibold text-foreground mb-2">Make an Offer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Propose your best number or bundle; reply in 1 business day.
                  </p>
                  <p className="text-xs text-muted-foreground">We pay 100% of Escrow.com fees.</p>
                </div>

                {/* Rent to Own */}
                <div className="p-6 border border-border rounded-xl text-center">
                  <h3 className="font-semibold text-foreground mb-2">Rent to Own</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monthly via Escrow.com Domain Holding.
                  </p>
                  <p className="text-xs text-muted-foreground">We pay 100% of Escrow.com fees.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support strip */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-6">
                <Link to="/faqs" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  FAQs
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Contact
                </Link>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                After purchase, we'll learn your goals and provide personalized founder consulting to help you start strong.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Offer Modal */}
      <OfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        domainName={domainData.domain}
        binPrice={domainData.binPrice}
        onSubmit={handleOfferSubmit}
      />
    </>
  );
}