import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, SortAsc, X, Loader2, MoreHorizontal, ShoppingCart, MessageSquare, CreditCard, Sliders } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useSupabaseDomains } from '@/hooks/useSupabaseDomains';

// Tag categories for filtering
const TAG_CATEGORIES = {
  industry: ['Accounting', 'Legal', 'Marketing', 'HR', 'IT', 'Design', 'Analytics', 'E-commerce', 'Nonprofit', 'Healthcare', 'Real Estate'],
  useCase: ['Lead Gen', 'SaaS', 'Agency', 'Marketplace', 'Directory', 'Education', 'Tools', 'Content', 'Community'],
  valueAdd: ['Premium', 'Keywords', 'Short', 'Two-Word']
};

const ALL_TAGS = [...TAG_CATEGORIES.industry, ...TAG_CATEGORIES.useCase, ...TAG_CATEGORIES.valueAdd];

// Sort options
const SORT_OPTIONS = [
  { value: 'price-high', label: 'Price (High→Low)' },
  { value: 'price-low', label: 'Price (Low→High)' },
  { value: 'a-z', label: 'A→Z' },
  { value: 'z-a', label: 'Z→A' },
  { value: 'length', label: 'Length (Short→Long)' },
  { value: 'relevance', label: 'Search Relevance' }
];

// Common TLDs for filtering
const COMMON_TLDS = ['com', 'net', 'org', 'io', 'ai', 'co', 'app', 'tech', 'dev', 'agency'];

export default function DomainsExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { domains, loading, error, totalCount, hasMore, loadMore } = useSupabaseDomains();

  // State for debounced search
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '');
  const [lengthRange, setLengthRange] = useState([
    parseInt(searchParams.get('minLength') || '1'),
    parseInt(searchParams.get('maxLength') || '50')
  ]);

  // Get current filters from URL
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const sortBy = searchParams.get('sort') || 'price-high';
  const selectedTLD = searchParams.get('tld') || '';
  const selectedBundle = searchParams.get('bundle') || '';
  const availabilityBin = searchParams.get('availability_bin') === 'true';
  const availabilityOffer = searchParams.get('availability_offer') === 'true';
  const availabilityRTO = searchParams.get('availability_rto') === 'true';

  // Get unique bundles and TLDs from loaded domains
  const availableOptions = useMemo(() => {
    const bundles = new Set<string>();
    const tlds = new Set<string>();
    
    domains.forEach(domain => {
      if (domain.bundle) bundles.add(domain.bundle);
      if (domain.tld) tlds.add(domain.tld);
    });

    return {
      bundles: Array.from(bundles).sort(),
      tlds: Array.from(tlds).sort()
    };
  }, [domains]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (searchParams.get('q') || '')) {
        updateURLParams({ q: searchInput || undefined });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchInput, searchParams]);

  // Length range effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentMin = parseInt(searchParams.get('minLength') || '1');
      const currentMax = parseInt(searchParams.get('maxLength') || '50');
      
      if (lengthRange[0] !== currentMin || lengthRange[1] !== currentMax) {
        updateURLParams({ 
          minLength: lengthRange[0] !== 1 ? lengthRange[0].toString() : undefined,
          maxLength: lengthRange[1] !== 50 ? lengthRange[1].toString() : undefined
        });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [lengthRange, searchParams]);

  const updateURLParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams, { replace: true });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
      
    updateURLParams({ 
      tags: newTags.length > 0 ? newTags.join(',') : undefined 
    });
  };

  const toggleAvailability = (type: 'bin' | 'offer' | 'rto') => {
    const key = `availability_${type}`;
    const current = searchParams.get(key) === 'true';
    updateURLParams({ [key]: !current ? 'true' : undefined });
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setLengthRange([1, 50]);
    setSearchParams(new URLSearchParams({ sort: 'price-high' }), { replace: true });
  };

  const formatPrice = (price: number | undefined) => {
    if (!price) return 'Contact for price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getTagColor = (tag: string) => {
    if (TAG_CATEGORIES.industry.includes(tag)) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (TAG_CATEGORIES.useCase.includes(tag)) return 'bg-green-100 text-green-800 border-green-200';
    if (TAG_CATEGORIES.valueAdd.includes(tag)) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const hasActiveFilters = selectedTags.length > 0 || searchInput || selectedTLD || selectedBundle || 
                          availabilityBin || availabilityOffer || availabilityRTO || 
                          lengthRange[0] !== 1 || lengthRange[1] !== 50;

  if (error) {
    return (
      <div className="min-h-screen liquid-mesh-bg py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Unable to Load Domains</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Find your domain | Premium domains explorer</title>
        <meta name="description" content="Explore premium domains with advanced filters. Search by price, tags, availability, and more. We pay 100% of Escrow.com fees." />
        <link rel="canonical" href="/domains" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Premium Domains for Sale",
            "description": "Curated collection of premium domains with advanced filtering",
            "numberOfItems": totalCount,
            "itemListElement": domains.slice(0, 10).map((domain, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": domain.domain,
              "offers": {
                "@type": "Offer",
                "price": domain.bin_price || 0,
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen liquid-mesh-bg py-20 relative overflow-hidden animate-page-fade">
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-16 stagger-fade-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
              Find your domain
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your journey begins here
            </p>
          </div>

          {/* Controls - Sticky on mobile */}
          <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border border-border rounded-3xl p-6 mb-12 stagger-fade-2">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search domains or keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 py-4 text-lg border-border/50 focus:border-primary"
              />
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => updateURLParams({ sort: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bundle */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Bundle</label>
                <select
                  value={selectedBundle}
                  onChange={(e) => updateURLParams({ bundle: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All bundles</option>
                  {availableOptions.bundles.map(bundle => (
                    <option key={bundle} value={bundle}>
                      {bundle}
                    </option>
                  ))}
                </select>
              </div>

              {/* TLD */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">TLD</label>
                <select
                  value={selectedTLD}
                  onChange={(e) => updateURLParams({ tld: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All TLDs</option>
                  {COMMON_TLDS.concat(availableOptions.tlds.filter(tld => !COMMON_TLDS.includes(tld))).map(tld => (
                    <option key={tld} value={tld}>
                      .{tld}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length Range */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Length: {lengthRange[0]}-{lengthRange[1]} chars
                </label>
                <Slider
                  value={lengthRange}
                  onValueChange={setLengthRange}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Availability Toggles */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-3">Availability</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability-bin"
                    checked={availabilityBin}
                    onCheckedChange={() => toggleAvailability('bin')}
                  />
                  <label htmlFor="availability-bin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Buy It Now
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability-offer"
                    checked={availabilityOffer}
                    onCheckedChange={() => toggleAvailability('offer')}
                  />
                  <label htmlFor="availability-offer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Make Offer
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability-rto"
                    checked={availabilityRTO}
                    onCheckedChange={() => toggleAvailability('rto')}
                  />
                  <label htmlFor="availability-rto" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Rent to Own
                  </label>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-3">Tags</label>
              <div className="space-y-4">
                {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      {category === 'useCase' ? 'Use Case' : category === 'valueAdd' ? 'Value Add' : category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <p className="text-muted-foreground">
                {loading ? 'Loading...' : `${totalCount} domain${totalCount !== 1 ? 's' : ''} found`}
                {hasActiveFilters && !loading && (
                  <span className="ml-2 text-primary">with filters applied</span>
                )}
              </p>
              {hasActiveFilters && (
                <Button onClick={clearAllFilters} variant="outline" size="sm" className="gap-2">
                  <X className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          {loading && domains.length === 0 ? (
            /* Loading Skeleton */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="h-[300px]">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-6" />
                    <Skeleton className="h-8 w-1/3 mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : domains.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 stagger-fade-3">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">No domains match your criteria</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Try adjusting your search terms or filters to find more domains.
              </p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Domain Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {domains.map((domain, index) => (
                  <div
                    key={domain.domain}
                    className={`group stagger-fade-${Math.min((index % 4) + 3, 6)}`}
                  >
                    <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-border/50 hover:border-primary/20 relative">
                      <CardContent className="p-6">
                        {/* Kebab Menu */}
                        <div className="absolute top-4 right-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              {domain.availability_bin && (
                                <DropdownMenuItem asChild>
                                  <Link to={`/domain/${domain.domain}?flow=bin`} className="flex items-center gap-2">
                                    <ShoppingCart className="h-4 w-4" />
                                    Buy Now
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {domain.availability_offer && (
                                <DropdownMenuItem asChild>
                                  <Link to={`/domain/${domain.domain}?flow=offer`} className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Make an Offer
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {domain.availability_rto && (
                                <DropdownMenuItem asChild>
                                  <Link to={`/domain/${domain.domain}?flow=rto`} className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Start RTO
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Domain Name */}
                        <Link to={`/domain/${domain.domain}`} className="block">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors pr-8">
                            {domain.domain}
                          </h3>
                        </Link>
                        
                        {/* Bundle */}
                        {domain.bundle && (
                          <p className="text-sm text-muted-foreground mb-4">
                            Bundle: {domain.bundle}
                          </p>
                        )}

                        {/* Price */}
                        <div className="text-3xl font-bold text-needsites-orange mb-4">
                          {formatPrice(domain.bin_price)}
                        </div>

                        {/* Tags */}
                        {domain.tags && domain.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {domain.tags.slice(0, 3).map(tag => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className={`text-xs ${getTagColor(tag)}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                            {domain.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                                +{domain.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Escrow message */}
                        <p className="text-xs text-muted-foreground mb-4">
                          We pay 100% of the Escrow.com fees.
                        </p>

                        {/* Availability indicators */}
                        <div className="flex gap-2">
                          {domain.availability_bin && (
                            <Badge variant="secondary" className="text-xs">
                              Buy Now
                            </Badge>
                          )}
                          {domain.availability_offer && (
                            <Badge variant="outline" className="text-xs">
                              Offers
                            </Badge>
                          )}
                          {domain.availability_rto && (
                            <Badge variant="outline" className="text-xs">
                              RTO
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center stagger-fade-6">
                  <Button
                    onClick={loadMore}
                    disabled={loading}
                    size="lg"
                    className="px-8 py-4 text-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      `Load More (${totalCount - domains.length} remaining)`
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}