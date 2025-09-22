import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/data';

export default function Categories() {
  return (
    <div className="min-h-screen bg-background py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,var(--needsites-blue)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,var(--needsites-orange)_1px,transparent_1px)] bg-[length:60px_60px,40px_40px]"></div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-needsites-blue/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-needsites-orange/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
            Domain Categories
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Browse our curated collection of premium domains organized by industry and business type. 
            Find the perfect domain for your specific needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className={`group glass-card rounded-3xl p-10 magnetic-hover animate-scale-in stagger-${(index % 3) + 1} relative overflow-hidden`}
            >
              {/* Shimmer Effect */}
              <div className="shimmer absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform floating">
                    <Folder className="w-10 h-10 text-primary" />
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
        <div className="mt-32 glass-card rounded-3xl p-16 animate-fade-in-up stagger-4 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background/50 to-muted/20 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-6">Domain Collection Stats</h2>
              <p className="text-muted-foreground text-xl">Our comprehensive domain portfolio across industries</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="text-center group">
                <div className="text-6xl font-bold gradient-text mb-4 group-hover:scale-110 transition-transform">
                  {CATEGORIES.reduce((sum, cat) => sum + cat.count, 0)}
                </div>
                <div className="text-muted-foreground text-lg">Total Domains</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl font-bold text-needsites-orange mb-4 group-hover:scale-110 transition-transform">
                  {CATEGORIES.length}
                </div>
                <div className="text-muted-foreground text-lg">Categories</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl font-bold text-green-600 mb-4 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-muted-foreground text-lg">Premium Quality</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl font-bold text-purple-600 mb-4 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-muted-foreground text-lg">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-fade-in-up stagger-4">
          <div className="bg-gradient-to-br from-needsites-blue via-purple-600 to-needsites-dark-blue rounded-3xl p-16 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
              <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
                We have access to thousands more domains. Get in touch for custom searches and recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="group px-10 py-5 glass-card text-white font-bold rounded-2xl btn-magnetic text-lg relative overflow-hidden"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  to="/category/all"
                  className="group px-10 py-5 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-white font-bold rounded-2xl btn-magnetic glow-orange text-lg relative overflow-hidden"
                >
                  <span className="relative z-10">Browse All Domains</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}