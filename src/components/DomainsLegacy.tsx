import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, SortAsc, X, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DOMAINS, CATEGORIES } from '../data/data';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';
import type { Domain } from '../types';

// Tag definitions
export const TAG_CATEGORIES = {
  industry: ['Accounting', 'Legal', 'Marketing', 'HR', 'IT', 'Design', 'Analytics', 'E-commerce', 'Nonprofit', 'Healthcare', 'Real Estate'],
  useCase: ['Lead Gen', 'SaaS', 'Agency', 'Marketplace', 'Directory', 'Education', 'Tools', 'Content', 'Community'],
  valueAdd: ['Premium', 'Keywords', 'Short', 'Two-Word']
};

const ALL_TAGS = [...TAG_CATEGORIES.industry, ...TAG_CATEGORIES.useCase, ...TAG_CATEGORIES.valueAdd];

// Sort options
const SORT_OPTIONS = [
  { value: 'price-high', label: 'Price (High→Low)' },
  { value: 'relevance', label: 'Search Relevance' },
  { value: 'price-low', label: 'Price (Low→High)' },
  { value: 'a-z', label: 'A→Z' },
  { value: 'z-a', label: 'Z→A' },
  { value: 'length', label: 'Length (Short→Long)' }
];

const DOMAINS_PER_PAGE = 24;

// Collect all domains with their categories
const getAllDomains = (): (Domain & { categorySlug: string; categoryTitle: string })[] => {
  const allDomains: (Domain & { categorySlug: string; categoryTitle: string })[] = [];
  
  Object.entries(DOMAINS).forEach(([categorySlug, domains]) => {
    if (Array.isArray(domains)) {
      const category = CATEGORIES.find(cat => cat.slug === categorySlug);
      domains.forEach(domain => {
        allDomains.push({
          ...domain,
          categorySlug,
          categoryTitle: category?.title || categorySlug
        });
      });
    }
  });
  
  return allDomains;
};

export default function Domains() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleDomains, setVisibleDomains] = useState(DOMAINS_PER_PAGE);
  
  // Get URL params
  const query = searchParams.get('q') || '';
  const selectedTags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const sortBy = searchParams.get('sort') || 'price-high';
  
  // State for search input (for debouncing)
  const [searchInput, setSearchInput] = useState(query);
  
  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== query) {
        updateURLParams({ q: searchInput || undefined });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchInput, query]);
  
  // Reset visible domains when filters change
  useEffect(() => {
    setVisibleDomains(DOMAINS_PER_PAGE);
  }, [query, selectedTags, sortBy]);

  const updateURLParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
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

  const clearAllFilters = () => {
    setSearchInput('');
    updateURLParams({ q: undefined, tags: undefined, sort: 'price-high' });
  };

  // Filter and sort domains
  const { filteredDomains, totalCount } = useMemo(() => {
    let domains = getAllDomains();
    
    // Search filter
    if (query) {
      const searchLower = query.toLowerCase();
      domains = domains.filter(domain => 
        domain.name.toLowerCase().includes(searchLower) ||
        domain.categoryTitle.toLowerCase().includes(searchLower) ||
        domain.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Tag filter
    if (selectedTags.length > 0) {
      domains = domains.filter(domain =>
        selectedTags.some(tag => domain.tags.includes(tag))
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        domains.sort((a, b) => a.binPrice - b.binPrice);
        break;
      case 'price-high':
        domains.sort((a, b) => b.binPrice - a.binPrice);
        break;
      case 'a-z':
        domains.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'z-a':
        domains.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'length':
        domains.sort((a, b) => a.length - b.length);
        break;
      case 'relevance':
      default:
        // Keep original order for relevance when there's a search query
        if (!query) {
          domains.sort((a, b) => b.binPrice - a.binPrice); // Default to price high-low
        }
        break;
    }
    
    return {
      filteredDomains: domains,
      totalCount: domains.length
    };
  }, [query, selectedTags, sortBy]);

  const displayedDomains = filteredDomains.slice(0, visibleDomains);
  const hasMore = visibleDomains < totalCount;

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleDomains(prev => prev + DOMAINS_PER_PAGE);
      setIsLoading(false);
    }, 300);
  };

  const formatPrice = (price: number) => {
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

  return (
    <>
      <Helmet>
        <title>All Domains for Sale | NeedSites</title>
        <meta name="description" content="Search, filter, and sort NeedSites domains. Same price as marketplaces — we pay 100% of Escrow.com fees." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Premium Domains for Sale",
            "description": "Curated collection of premium domains across industries",
            "numberOfItems": totalCount,
            "itemListElement": displayedDomains.map((domain, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": domain.name,
              "offers": {
                "@type": "Offer",
                "price": domain.binPrice,
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

          {/* Search and Filters */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 mb-12 stagger-fade-2">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search domains, categories, or tags..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 py-4 text-lg border-border/50 focus:border-primary"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => updateURLParams({ sort: e.target.value })}
                  className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tags:</span>
              </div>

              {/* Clear Filters */}
              {(selectedTags.length > 0 || query) && (
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Tag Filters */}
            <div className="space-y-4">
              {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">
                    {category === 'useCase' ? 'Use Case' : category === 'valueAdd' ? 'Value Add' : category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-all hover:scale-105 ${
                          selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : ''
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                {totalCount === 0 ? 'No domains found' : `${totalCount} domain${totalCount !== 1 ? 's' : ''} found`}
                {selectedTags.length > 0 && (
                  <span className="ml-2">
                    with {selectedTags.length} filter{selectedTags.length !== 1 ? 's' : ''}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Results */}
          {totalCount === 0 ? (
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
                {displayedDomains.map((domain, index) => (
                  <Link
                    key={domain.name}
                    to={`/domain/${domain.name}`}
                    className={`block group stagger-fade-${Math.min((index % 4) + 3, 6)}`}
                  >
                    <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-border/50 hover:border-primary/20">
                      <CardContent className="p-6">
                        {/* Domain Name */}
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {domain.name}
                        </h3>
                        
                        {/* Category */}
                        <p className="text-sm text-muted-foreground mb-4">
                          {domain.categoryTitle}
                        </p>

                        {/* Price */}
                        <div className="text-3xl font-bold text-needsites-orange mb-4">
                          {formatPrice(domain.binPrice)}
                        </div>

                        {/* Tags */}
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

                        {/* Status */}
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          domain.status === 'available' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {domain.status === 'available' ? 'Available' : 'Reserved'}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center stagger-fade-6">
                  <Button
                    onClick={loadMore}
                    disabled={isLoading}
                    size="lg"
                    className="px-8 py-4 text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      `Load More (${totalCount - visibleDomains} remaining)`
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
