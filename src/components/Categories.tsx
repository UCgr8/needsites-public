import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/data';

export default function Categories() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Domain Categories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse our curated collection of premium domains organized by industry and business type. 
            Find the perfect domain for your specific needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-200 hover:border-primary/20 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Folder className="w-8 h-8 text-primary" />
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </div>

              <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              
              <p className="text-sm font-medium text-needsites-orange mb-4">
                {category.tagline}
              </p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  <strong className="text-card-foreground">{category.count}</strong> domains available
                </span>
                <span className="text-primary group-hover:translate-x-1 transition-transform font-medium">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-muted/50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Domain Collection Stats</h2>
            <p className="text-muted-foreground">Our comprehensive domain portfolio across industries</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {CATEGORIES.reduce((sum, cat) => sum + cat.count, 0)}
              </div>
              <div className="text-muted-foreground">Total Domains</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-needsites-orange mb-2">
                {CATEGORIES.length}
              </div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-muted-foreground">Premium Quality</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-needsites-blue to-needsites-dark-blue rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-blue-100 mb-8">
              We have access to thousands more domains. Get in touch for custom searches and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-needsites-blue font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/category/all"
                className="px-8 py-4 bg-needsites-orange text-white font-semibold rounded-xl hover:bg-needsites-orange-dark transition-colors"
              >
                Browse All Domains
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}