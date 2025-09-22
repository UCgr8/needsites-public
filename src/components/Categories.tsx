import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/data';

export default function Categories() {
  return (
    <div className="min-h-screen liquid-mesh-bg py-20 relative overflow-hidden animate-page-fade">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 stagger-fade-1">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">
            Domain Categories
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Browse our curated collection of premium domains organized by industry and business type. 
            Find the perfect domain for your specific needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CATEGORIES.filter(cat => cat.slug !== 'all').map((category, index) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className={`group liquid-glass-card liquid-interactive stagger-fade-${Math.min((index % 4) + 1, 4)} relative overflow-hidden`}
            >
              <div className="relative z-10 p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform floating overflow-hidden">
                    {category.icon ? (
                      <img 
                        src={category.icon} 
                        alt={category.title}
                        className="w-12 h-12 object-contain opacity-80"
                      />
                    ) : (
                      <Layers className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h3 className="text-3xl font-bold text-card-foreground mb-4 group-hover:gradient-text transition-all duration-300">
                  {category.title}
                </h3>
                
                <p className="text-lg font-semibold text-needsites-orange mb-6">
                  {category.tagline}
                </p>
                
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    <strong className="gradient-text text-xl">{category.count}</strong> domains available
                  </span>
                  <span className="text-primary group-hover:translate-x-2 transition-transform font-medium text-xl">
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
                <Link
                  to="/contact"
                  className="liquid-glass-button bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold text-lg"
                >
                  <span className="relative z-10">Contact Us</span>
                </Link>
                <Link
                  to="/category/all"
                  className="liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark hover:from-needsites-orange-dark hover:to-needsites-orange text-white font-bold text-lg"
                >
                  <span className="relative z-10">Browse All Domains</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}