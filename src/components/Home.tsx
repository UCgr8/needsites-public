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
      <section className="relative min-h-screen liquid-mesh-bg text-white overflow-hidden">
        {/* Apple-style Floating Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-needsites-blue/6 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-needsites-orange/4 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-needsites-blue/3 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float" style={{ animationDelay: '6s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-32 flex items-center min-h-screen">
          <div className="text-center w-full">
            <div className="stagger-fade-1">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight liquid-gradient-text drop-shadow-2xl">
                Buy or Rent
                <span className="block gradient-text animate-gradient bg-gradient-to-r from-needsites-orange via-yellow-300 to-needsites-orange bg-[length:200%_auto]">
                  Premium Domains
                </span>
              </h1>
            </div>
            <div className="stagger-fade-2">
              <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                Professional domains for every business need. Custom sites available.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center stagger-fade-3">
              <Link
                to="/category/all"
                className="liquid-glass-button bg-gradient-to-r from-needsites-blue to-needsites-dark-blue hover:from-needsites-dark-blue hover:to-needsites-blue text-lg font-semibold group"
              >
                <span className="relative z-10">Browse All Domains</span>
              </Link>
              <Link
                to="/categories"
                className="liquid-glass-button bg-gradient-to-r from-needsites-orange to-needsites-orange-dark hover:from-needsites-orange-dark hover:to-needsites-orange text-lg font-semibold group"
              >
                <span className="relative z-10">View Categories</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-liquid-float">
          <div className="liquid-glass w-6 h-10 rounded-full flex justify-center items-center">
            <div className="w-1 h-3 bg-white/90 rounded-full animate-liquid-glow"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 liquid-mesh-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20 stagger-fade-1">
            <h2 className="text-5xl font-bold liquid-gradient-text mb-6 drop-shadow-lg">Why Choose NeedSites?</h2>
            <p className="text-2xl text-muted-foreground">Professional domain solutions for growing businesses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-10 liquid-glass-card stagger-fade-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform floating">
                <Globe className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-6">Premium Domains</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Hand-picked professional domains across various industries and niches</p>
            </div>
            <div className="text-center p-10 glass-card rounded-3xl magnetic-hover animate-scale-in stagger-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-needsites-orange/20 to-needsites-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform floating" style={{ animationDelay: '1s' }}>
                <Award className="w-10 h-10 text-needsites-orange" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-6">Verified Quality</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">All domains are thoroughly vetted for brandability and market value</p>
            </div>
            <div className="text-center p-10 glass-card rounded-3xl magnetic-hover animate-scale-in stagger-3 group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform floating" style={{ animationDelay: '2s' }}>
                <Zap className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-card-foreground mb-6">Fast Transfer</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Quick and secure domain transfers with full support throughout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Domains */}
      <section className="py-32 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-needsites-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-needsites-orange/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl font-bold gradient-text mb-6">Featured Domains</h2>
            <p className="text-2xl text-muted-foreground">Handpicked premium domains for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredDomains.map((domain, index) => (
              <div key={domain.name} className={`glass-card rounded-3xl p-10 magnetic-hover animate-scale-in stagger-${index + 1} group relative overflow-hidden`}>
                {/* Shimmer Effect */}
                <div className="shimmer absolute inset-0 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-4 py-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                      {domain.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-card-foreground mb-8 group-hover:gradient-text transition-all duration-300">{domain.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold gradient-text">
                      ${domain.price.toLocaleString()}
                    </span>
                    <Link
                      to={`/domain/${domain.name}`}
                      className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl btn-magnetic glow-blue group-hover:scale-105 transition-transform"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--needsites-blue)_12%,transparent_12.5%,transparent_87%,var(--needsites-blue)_87.5%,var(--needsites-blue)),linear-gradient(150deg,var(--needsites-blue)_12%,transparent_12.5%,transparent_87%,var(--needsites-blue)_87.5%,var(--needsites-blue))] bg-[length:20px_35px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl font-bold gradient-text mb-6">Domain Categories</h2>
            <p className="text-2xl text-muted-foreground">Find the perfect domain for your industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`group glass-card rounded-3xl p-10 magnetic-hover animate-scale-in stagger-${(index % 3) + 1} relative overflow-hidden`}
              >
                {/* Shimmer Effect */}
                <div className="shimmer absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-card-foreground mb-4 group-hover:gradient-text transition-all duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      <span className="gradient-text font-bold text-lg">{category.count}</span> domains available
                    </span>
                    <span className="text-primary group-hover:translate-x-2 transition-transform font-medium text-2xl">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-16 animate-fade-in-up stagger-4">
            <Link
              to="/categories"
              className="px-12 py-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold rounded-2xl btn-magnetic glow-blue text-xl relative overflow-hidden group"
            >
              <span className="relative z-10">View All Categories</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
      <section className="py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20 animate-gradient"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Ready to Find Your Perfect Domain?</h2>
          </div>
          <div className="animate-fade-in-up stagger-1">
            <p className="text-2xl mb-12 text-blue-100 leading-relaxed">
              Browse our collection of premium domains or get in touch for custom solutions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up stagger-2">
            <Link
              to="/category/all"
              className="group px-12 py-6 glass-card text-white font-bold rounded-2xl btn-magnetic text-xl relative overflow-hidden"
            >
              <span className="relative z-10">Start Browsing</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/contact"
              className="group px-12 py-6 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark text-white font-bold rounded-2xl btn-magnetic glow-orange text-xl relative overflow-hidden"
            >
              <span className="relative z-10">Get Custom Quote</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}