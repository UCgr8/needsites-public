import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Globe, Award, Zap, Star, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/data';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuredDomains = [
    {
      name: 'needsites.com',
      price: 1000000,
      category: 'Premium',
      description: 'The ultimate domain for website development services'
    },
    {
      name: 'hire.management',
      price: 3601,
      category: 'Recruiting',
      description: 'Perfect for executive recruiting and HR services'
    },
    {
      name: 'content.contractors',
      price: 2827,
      category: 'Design & Content',
      description: 'Ideal for freelance content creation platforms'
    }
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
        {/* Hero Section - Enhanced with Liquid Glass */}
        <section className="relative min-h-screen liquid-mesh-bg text-white overflow-hidden">
          {/* Dynamic Floating Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-needsites-blue/8 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float"
              style={{
                transform: `translateX(${mousePosition.x * 30}px) translateY(${mousePosition.y * 20}px)`
              }}
            ></div>
            <div 
              className="absolute top-1/3 right-1/4 w-80 h-80 bg-needsites-orange/6 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float"
              style={{
                animationDelay: '3s',
                transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * 15}px)`
              }}
            ></div>
            <div 
              className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-needsites-blue/5 rounded-full mix-blend-multiply filter blur-3xl animate-liquid-float"
              style={{
                animationDelay: '6s',
                transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * -10}px)`
              }}
            ></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6 py-32 flex items-center min-h-screen">
            <div className="text-center w-full">
              <div className="stagger-fade-1">
                <div className="mb-8 flex justify-center">
                  <div className="liquid-glass px-6 py-3 rounded-full flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-needsites-orange animate-pulse" />
                    <span className="text-sm font-medium">Premium Domain Marketplace</span>
                  </div>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
                  <span className="block liquid-gradient-text drop-shadow-2xl">
                    Buy or Rent
                  </span>
                  <span className="block mt-4 bg-gradient-to-r from-needsites-orange via-yellow-300 to-needsites-orange bg-clip-text text-transparent animate-shimmer-liquid">
                    Premium Domains
                  </span>
                </h1>
              </div>
              
              <div className="stagger-fade-2">
                <p className="text-xl md:text-2xl lg:text-3xl mb-16 text-white/90 max-w-5xl mx-auto leading-relaxed drop-shadow-lg font-light">
                  Professional domains for every business need. Custom sites available.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center stagger-fade-3 mb-16">
                <Link 
                  to="/category/all" 
                  className="liquid-glass-button group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Browse All Domains
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/categories" 
                  className="liquid-glass-button group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    View Categories
                    <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-fade-4">
                {[
                  { number: "164+", label: "Premium Domains" },
                  { number: "500+", label: "Happy Clients" },
                  { number: "98%", label: "Success Rate" },
                  { number: "15+", label: "Years Experience" }
                ].map((stat, index) => (
                  <div key={index} className="liquid-glass p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300">
                    <div className="text-3xl md:text-4xl font-bold liquid-gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-liquid-float">
            <div className="liquid-glass w-8 h-12 rounded-full flex justify-center items-center group cursor-pointer">
              <div className="w-1.5 h-4 bg-white/90 rounded-full animate-liquid-glow group-hover:scale-110 transition-transform"></div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section className="py-32 relative overflow-hidden">
          {/* Subtle Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-needsites-blue/5 to-transparent rounded-full blur-3xl animate-parallax-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-needsites-orange/5 to-transparent rounded-full blur-3xl animate-parallax-float" style={{ animationDelay: '5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="text-center mb-24 stagger-fade-1">
              <h2 className="text-5xl md:text-6xl font-bold liquid-gradient-text mb-8 drop-shadow-lg">
                Why Choose NeedSites?
              </h2>
              <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Professional domain solutions for growing businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: Globe,
                  title: "Premium Domains",
                  description: "Hand-picked professional domains across various industries and niches",
                  color: "needsites-blue",
                  delay: "0s"
                },
                {
                  icon: Award,
                  title: "Verified Quality",
                  description: "All domains are thoroughly vetted for brandability and market value",
                  color: "needsites-orange",
                  delay: "0.2s"
                },
                {
                  icon: Zap,
                  title: "Fast Transfer",
                  description: "Quick and secure domain transfers with full support throughout",
                  color: "primary",
                  delay: "0.4s"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="liquid-glass-card p-10 text-center group animate-scale-in liquid-interactive"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className={`w-24 h-24 bg-gradient-to-br from-${feature.color}/20 to-${feature.color}/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 animate-liquid-float`}>
                    <feature.icon className={`w-12 h-12 text-${feature.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-card-foreground mb-6 group-hover:liquid-gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Domains - Enhanced */}
        <section className="py-32 liquid-mesh-bg relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="text-center mb-24 animate-scale-in">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-2xl">
                Featured Domains
              </h2>
              <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Handpicked premium domains for your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {featuredDomains.map((domain, index) => (
                <div 
                  key={domain.name}
                  className="liquid-glass-card p-10 group relative overflow-hidden animate-scale-in liquid-interactive"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-liquid transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className="liquid-glass px-4 py-2 text-sm font-semibold rounded-full border border-white/20 text-white">
                        {domain.category}
                      </span>
                      <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-needsites-orange transition-colors duration-300">
                      {domain.name}
                    </h3>
                    
                    <p className="text-white/80 mb-8 text-lg leading-relaxed">
                      {domain.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-4xl md:text-5xl font-bold text-needsites-orange drop-shadow-lg">
                        ${domain.price.toLocaleString()}
                      </span>
                      <Link 
                        to={`/domain/${domain.name}`}
                        className="liquid-glass-button group/btn"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Preview - Enhanced */}
        <section className="py-32 relative overflow-hidden">
          {/* Subtle Pattern Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/20"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="text-center mb-24 animate-scale-in">
              <h2 className="text-5xl md:text-6xl font-bold liquid-gradient-text mb-8">
                Domain Categories
              </h2>
              <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Find the perfect domain for your industry
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {CATEGORIES.slice(0, 6).map((category, index) => (
                <Link 
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group liquid-glass-card p-8 liquid-interactive animate-scale-in relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-needsites-blue/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-liquid transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4 group-hover:liquid-gradient-text transition-all duration-300">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        <span className="liquid-gradient-text font-bold text-xl">{category.count}</span> domains available
                      </span>
                      <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 group-hover:text-needsites-orange transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <Link 
                to="/categories"
                className="liquid-glass-button text-xl px-12 py-6 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View All Categories
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-32 liquid-mesh-bg text-white relative overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30 animate-mesh-flow"></div>
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/8 rounded-full blur-3xl animate-liquid-float"></div>
          <div className="absolute bottom-20 right-20 w-52 h-52 bg-white/5 rounded-full blur-3xl animate-liquid-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/3 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          <div className="max-w-6xl mx-auto px-6 text-center relative">
            <div className="animate-scale-in">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-2xl">
                Ready to Find Your Perfect Domain?
              </h2>
            </div>
            <div className="animate-scale-in stagger-fade-2">
              <p className="text-2xl md:text-3xl mb-16 text-white/90 leading-relaxed max-w-4xl mx-auto">
                Browse our collection of premium domains or get in touch for custom solutions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-scale-in stagger-fade-3">
              <Link 
                to="/category/all"
                className="liquid-glass-button text-xl px-12 py-6 group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Browsing
                  <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/contact"
                className="liquid-glass-button text-xl px-12 py-6 group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Custom Quote
                  <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}