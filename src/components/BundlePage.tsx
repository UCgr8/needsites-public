import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, DollarSign } from 'lucide-react';
import { CATEGORIES, DOMAINS } from '../data/data';

export default function BundlePage() {
  const { slug } = useParams<{ slug: string }>();
  
  const category = CATEGORIES.find(cat => cat.slug === slug);
  
  // Handle "all" category by combining all domains
  const domains = slug === 'all' 
    ? Object.entries(DOMAINS).flatMap(([categorySlug, categoryDomains]) => 
        categoryDomains.map(domain => ({ ...domain, category: categorySlug }))
      )
    : (slug ? DOMAINS[slug as keyof typeof DOMAINS] || [] : []);

  if (!category) {
    return <Navigate to="/bundles" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/bundles" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bundles
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-needsites-orange/10 rounded-3xl p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {category.title}
            </h1>
            <p className="text-xl font-medium text-needsites-orange mb-4">
              {category.tagline}
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {category.description}
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{category.count}</span>
                <span className="text-muted-foreground">domains available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Domains Grid */}
        {domains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain) => (
              <Link
                key={domain.name}
                to={`/domain/${domain.name}`}
                className="group block bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-200 hover:border-primary/20 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {domain.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        domain.status === 'available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {domain.status === 'available' ? 'Available' : 'Reserved'}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-needsites-orange" />
                    <span className="text-2xl font-bold text-needsites-orange">
                      {formatPrice(domain.price)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border text-center">
                  <span className="text-primary font-medium group-hover:text-primary-foreground group-hover:bg-primary px-4 py-2 rounded-lg transition-all duration-200 inline-block">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ExternalLink className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No domains available yet
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We're constantly adding new domains to this category. Check back soon or contact us for custom recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact for Custom Search
              </Link>
              <Link
                to="/bundle/all"
                className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Browse All Domains
              </Link>
            </div>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Explore Other Bundles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.filter(cat => cat.slug !== slug).slice(0, 2).map((relatedCategory) => (
              <Link
                key={relatedCategory.slug}
                to={`/bundle/${relatedCategory.slug}`}
                aria-label={`View ${relatedCategory.title} bundle`}
                className="group block liquid-glass-card liquid-interactive relative overflow-hidden p-8 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {relatedCategory.title}
                </h3>
                <p className="text-muted-foreground mb-4">{relatedCategory.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {relatedCategory.count} domains available
                  </span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}