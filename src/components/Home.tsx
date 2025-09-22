import React from 'react';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>NeedSites - Premium Domain Names for Sale | Domain Marketplace</title>
        <meta name="description" content="Discover premium domain names for sale at NeedSites. Browse 164+ curated domains across recruiting, design, content and business categories. Find your perfect domain today." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "NeedSites",
            "url": "https://needsites.com",
            "description": "Premium domain marketplace offering curated domain names for businesses",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://needsites.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
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

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">Join hundreds of satisfied customers who found their perfect domain</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "TechStart Inc.",
                domain: "recruiting.solutions",
                quote: "NeedSites helped us find the perfect domain for our HR platform. The process was seamless and professional.",
                rating: 5
              },
              {
                name: "Mike Chen", 
                company: "Creative Studios",
                domain: "design.expert",
                quote: "Excellent service and fair pricing. Our new domain perfectly represents our brand identity.",
                rating: 5
              },
              {
                name: "Lisa Rodriguez",
                company: "Business Consulting", 
                domain: "strategy.business",
                quote: "The team at NeedSites understood our needs and delivered exactly what we were looking for.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  <p className="text-xs text-primary mt-2 font-medium">Purchased: {testimonial.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why 500+ Businesses Trust NeedSites</h2>
            <p className="text-xl text-muted-foreground">Professional domain solutions with unmatched service</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🔒", title: "Secure Transfers", desc: "SSL encrypted & escrow protected transactions" },
              { icon: "⭐", title: "Premium Quality", desc: "Hand-picked domains with verified ownership" },
              { icon: "🚀", title: "Fast Process", desc: "Complete domain transfers in 5-7 business days" },
              { icon: "💬", title: "Expert Support", desc: "Dedicated customer success team available 24/7" }
            ].map((feature, index) => (
              <div key={index} className="text-center bg-card rounded-xl p-6 border border-border">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
            {[
              { number: "164+", label: "Premium Domains" },
              { number: "500+", label: "Happy Clients" },
              { number: "98%", label: "Success Rate" },
              { number: "15+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
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
    </>
  );
}