import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/data';
export default function Categories() {
  return <div className="min-h-screen liquid-mesh-bg py-20 relative overflow-hidden animate-page-fade">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 stagger-fade-1">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">Site Bundles</h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Browse our curated collection of premium domains organized by industry and business type. 
            Find the perfect domain for your specific needs.
          </p>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* All Domains Bundle */}
          <Link to="/domains" className="block group stagger-fade-1">
            <div className="apple-card p-8 h-full transition-all duration-300 group-hover:scale-105">
              <div className="flex items-end justify-end mb-6">
                <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-primary transition-all duration-300">
                All Domains
              </h3>
              
              <p className="text-lg font-semibold text-needsites-orange mb-4">
                Complete collection
              </p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Browse our entire collection of premium domains across all categories. Perfect for finding that perfect domain name for your project.
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  <strong className="text-primary text-lg">164</strong> domains available
                </span>
                <span className="text-primary group-hover:translate-x-2 transition-transform font-medium">
                  Explore →
                </span>
              </div>
            </div>
          </Link>

          {/* Category Bundles */}
          {CATEGORIES.filter(cat => cat.slug !== 'all').map((category, index) => (
            <Link key={category.slug} to={`/bundle/${category.slug}`} className={`block group stagger-fade-${Math.min((index % 4) + 2, 5)}`}>
              <div className="apple-card p-8 h-full transition-all duration-300 group-hover:scale-105">
                <div className="flex items-end justify-end mb-6">
                  <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-primary transition-all duration-300">
                  {category.title}
                </h3>
                
                <p className="text-lg font-semibold text-needsites-orange mb-4">
                  {category.tagline}
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-primary text-lg">{category.count}</strong> domains available
                  </span>
                  <span className="text-primary group-hover:translate-x-2 transition-transform font-medium">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 liquid-glass-card stagger-fade-4 relative overflow-hidden">
          <div className="relative z-10 p-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold liquid-gradient-text mb-6 drop-shadow-lg">Domain Collection Stats</h2>
              <p className="text-muted-foreground text-xl">Our comprehensive domain portfolio across industries</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="text-center group liquid-interactive">
                <div className="text-6xl font-bold liquid-gradient-text mb-4 group-hover:scale-110 transition-transform animate-liquid-glow">
                  164
                </div>
                <div className="text-muted-foreground text-lg">Total Domains</div>
              </div>
              <div className="text-center group liquid-interactive">
                <div className="text-6xl font-bold text-needsites-orange mb-4 group-hover:scale-110 transition-transform">
                  10
                </div>
                <div className="text-muted-foreground text-lg">Categories</div>
              </div>
              <div className="text-center group liquid-interactive">
                <div className="text-6xl font-bold text-green-600 mb-4 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-muted-foreground text-lg">Premium Quality</div>
              </div>
              <div className="text-center group liquid-interactive">
                <div className="text-6xl font-bold text-purple-600 mb-4 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-muted-foreground text-lg">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center stagger-fade-4">
          <div className="liquid-glass-card bg-gradient-to-br from-needsites-blue via-purple-600 to-needsites-dark-blue text-white relative overflow-hidden animate-liquid-glow">
            <div className="relative z-10 p-16">
              <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Can't Find What You're Looking For?</h2>
              <p className="text-2xl text-white/90 mb-12 leading-relaxed drop-shadow-md">
                We have access to thousands more domains. Get in touch for custom searches and recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="liquid-glass-button bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold text-lg">
                  <span className="relative z-10">Contact Us</span>
                </Link>
                <Link to="/bundle/all" className="liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark hover:from-needsites-orange-dark hover:to-needsites-orange text-white font-bold text-lg">
                  <span className="relative z-10">Browse All Domains</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}