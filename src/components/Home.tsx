import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Award, Zap } from 'lucide-react';
import { CATEGORIES } from '../data/data';

export default function Home() {
  const featuredDomains = [
    { name: 'needsites.com', price: 1000000, category: 'Premium' },
    { name: 'hire.management', price: 3601, category: 'Recruiting' },
    { name: 'content.contractors', price: 2827, category: 'Design & Content' }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-needsites-blue via-primary to-needsites-dark-blue text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Buy or Rent
              <span className="block bg-gradient-to-r from-needsites-orange to-yellow-300 bg-clip-text text-transparent">
                Premium Domains
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Professional domains for every business need. Custom sites available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all"
                className="px-8 py-4 bg-white text-needsites-blue font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse All Domains
              </Link>
              <Link
                to="/categories"
                className="px-8 py-4 bg-needsites-orange text-white font-semibold rounded-xl hover:bg-needsites-orange-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose NeedSites?</h2>
            <p className="text-xl text-muted-foreground">Professional domain solutions for growing businesses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Premium Domains</h3>
              <p className="text-muted-foreground">Hand-picked professional domains across various industries and niches</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-needsites-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-needsites-orange" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Verified Quality</h3>
              <p className="text-muted-foreground">All domains are thoroughly vetted for brandability and market value</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Fast Transfer</h3>
              <p className="text-muted-foreground">Quick and secure domain transfers with full support throughout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Domains */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Domains</h2>
            <p className="text-xl text-muted-foreground">Handpicked premium domains for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDomains.map((domain) => (
              <div key={domain.name} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {domain.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">{domain.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-needsites-orange">
                    ${domain.price.toLocaleString()}
                  </span>
                  <Link
                    to={`/domain/${domain.name}`}
                    className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Domain Categories</h2>
            <p className="text-xl text-muted-foreground">Find the perfect domain for your industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-200 hover:border-primary/20"
              >
                <h3 className="text-2xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.count} domains available
                  </span>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-needsites-blue to-needsites-dark-blue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Perfect Domain?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse our collection of premium domains or get in touch for custom solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/all"
              className="px-8 py-4 bg-white text-needsites-blue font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Start Browsing
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-needsites-orange text-white font-semibold rounded-xl hover:bg-needsites-orange-dark transition-colors"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}