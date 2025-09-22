import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Globe, DollarSign, Shield, Clock, CheckCircle, Mail, Phone } from 'lucide-react';
import { CATEGORIES, DOMAINS } from '../data/data';

export default function DomainPage() {
  const { name } = useParams<{ name: string }>();
  
  // Find the domain across all categories
  let foundDomain = null;
  let foundCategory = null;
  
  for (const [categorySlug, domains] of Object.entries(DOMAINS)) {
    if (Array.isArray(domains)) {
      const domain = domains.find(d => d.name === name);
      if (domain) {
        foundDomain = domain;
        foundCategory = CATEGORIES.find(cat => cat.slug === categorySlug);
        break;
      }
    }
  }

  if (!foundDomain || !foundCategory) {
    return <Navigate to="/category/all" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const features = [
    { icon: Shield, title: 'Secure Transfer', description: 'Safe and encrypted domain transfer process' },
    { icon: Clock, title: 'Fast Setup', description: '5-7 day transfer completion' },
    { icon: CheckCircle, title: 'Premium Quality', description: 'Hand-picked professional domain' },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-muted-foreground">
            <Link to="/category/all" className="hover:text-primary transition-colors">All Domains</Link>
            <span>→</span>
            <Link 
              to={`/category/${foundCategory.slug}`} 
              className="hover:text-primary transition-colors"
            >
              {foundCategory.title}
            </Link>
            <span>→</span>
            <span className="text-foreground font-medium">{foundDomain.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Domain Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-needsites-orange/10 rounded-3xl p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <Link
                    to={`/category/${foundCategory.slug}`}
                    className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors mb-2"
                  >
                    {foundCategory.title}
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    {foundDomain.name}
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                    foundDomain.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {foundDomain.status === 'available' ? 'Available Now' : 'Reserved'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-needsites-orange" />
                  <span className="text-4xl font-bold text-needsites-orange">
                    {formatPrice(foundDomain.price)}
                  </span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                {foundCategory.description} This premium domain is perfect for businesses in the {foundCategory.title.toLowerCase()} industry.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Purchase Domain
                </button>
                <button className="px-8 py-4 bg-needsites-orange text-white font-semibold rounded-xl hover:bg-needsites-orange-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Inquire About Rental
                </button>
              </div>
            </div>

            {/* Domain Features */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Why This Domain?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Analysis */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Domain Analysis</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Domain Length</span>
                  <span className="font-medium text-card-foreground">{foundDomain.name.length} characters</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Extension</span>
                  <span className="font-medium text-card-foreground">.{foundDomain.name.split('.').pop()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Industry Focus</span>
                  <span className="font-medium text-card-foreground">{foundCategory.title}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Brandability</span>
                  <span className="font-medium text-green-600">Excellent</span>
                </div>
              </div>
            </div>

            {/* Similar Domains */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Similar Domains</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DOMAINS[foundCategory.slug]
                  ?.filter(d => d.name !== foundDomain.name)
                  .slice(0, 4)
                  .map((domain) => (
                    <Link
                      key={domain.name}
                      to={`/domain/${domain.name}`}
                      className="group p-4 border border-border rounded-xl hover:border-primary/20 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                          {domain.name}
                        </span>
                        <span className="text-needsites-orange font-medium">
                          {formatPrice(domain.price)}
                        </span>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase Options */}
            <div className="bg-card border border-border rounded-3xl p-8 sticky top-8">
              <h3 className="text-xl font-bold text-card-foreground mb-6">Purchase Options</h3>
              
              <div className="space-y-4 mb-8">
                <div className="p-4 border-2 border-primary/20 rounded-xl bg-primary/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-card-foreground">Buy Now</span>
                    <span className="text-2xl font-bold text-needsites-orange">
                      {formatPrice(foundDomain.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    One-time purchase with full ownership transfer
                  </p>
                  <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                    Purchase Now
                  </button>
                </div>

                <div className="p-4 border border-border rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-card-foreground">Monthly Rental</span>
                    <span className="text-xl font-bold text-needsites-orange">
                      {formatPrice(Math.round(foundDomain.price * 0.08))}/mo
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Flexible rental with option to purchase
                  </p>
                  <button className="w-full px-6 py-3 bg-needsites-orange text-white font-medium rounded-lg hover:bg-needsites-orange-dark transition-colors">
                    Rent Domain
                  </button>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-card-foreground mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Support</span>
                  </Link>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-card-foreground mb-4">Secure Purchase</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-card-foreground">Escrow protection available</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-card-foreground">30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-card-foreground">Free transfer assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-card-foreground">24/7 support included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}