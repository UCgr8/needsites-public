import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Globe, Award, Zap, Star, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CATEGORIES } from '../data/data';
export default function Home() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const featuredDomains = [{
    name: 'needsites.com',
    price: 1000000,
    category: 'Premium',
    description: 'The ultimate domain for website development services'
  }, {
    name: 'hire.management',
    price: 3601,
    category: 'Recruiting',
    description: 'Perfect for executive recruiting and HR services'
  }, {
    name: 'content.contractors',
    price: 2827,
    category: 'Design & Content',
    description: 'Ideal for freelance content creation platforms'
  }];
  return <>
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
        <section className="relative min-h-screen flex items-center justify-center bg-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-16 text-black tracking-tight animate-fade-in">
                Buy or rent premium keyword domains
                <br />
                <span className="text-2xl md:text-3xl text-muted-foreground">Get free help making your site successful</span>
              </h1>
              
              <div className="flex justify-center mt-16 mb-16">
                <Link to="/categories">
                  <Button size="lg" className="apple-button text-lg px-12 py-4 h-auto">
                    Browse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="apple-card p-8 text-center">
                  <div className="text-4xl font-bold mb-2 text-primary">160</div>
                  <div className="text-muted-foreground">Premium Domains</div>
                </div>
                <div className="apple-card p-8 text-center">
                  <div className="text-4xl font-bold mb-2 text-primary">100%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="apple-card p-8 text-center">
                  <div className="text-4xl font-bold mb-2 text-primary">24h</div>
                  <div className="text-muted-foreground">Fast Transfers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 text-black">
                  Why Choose Our Domains?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We make domain acquisition simple, fast, and secure.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="apple-card p-8 text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">Premium Quality</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hand-curated domains that command attention and build trust with your audience.
                  </p>
                </div>
                
                <div className="apple-card p-8 text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">Verified & Secure</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All domains are thoroughly verified with secure transfer processes and full ownership rights.
                  </p>
                </div>
                
                <div className="apple-card p-8 text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">Fast Transfers</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Quick and efficient domain transfers with dedicated support throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Domains */}
        <section className="py-24 apple-section-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 text-black">
                  Featured Premium Domains
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Exceptional domains that are ready to become the foundation of your next big venture.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredDomains.map((domain, index) => <div key={domain.name} className="apple-card p-8 group">
                    <div className="relative">
                      <h3 className="text-3xl font-bold mb-2 text-black">{domain.name}</h3>
                      <p className="text-2xl font-bold mb-4 text-primary">${domain.price.toLocaleString()}</p>
                      <p className="text-muted-foreground mb-6">
                        {domain.description}
                      </p>
                      <Link to={`/domain/${domain.name}`}>
                        <Button className="w-full apple-button">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 text-black">
                  Explore by Category
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Find the perfect domain for your industry with our curated categories.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CATEGORIES.slice(0, 6).map((category, index) => <Link key={category.slug} to={`/category/${category.slug}`} className="block group">
                      <div className="apple-card p-6 h-full transition-all duration-300 group-hover:scale-105">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-black group-hover:text-primary transition-all duration-300">
                            {category.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {category.count} domains
                          </p>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </Link>)}
              </div>
              
              <div className="text-center mt-12">
                <Link to="/categories">
                  <Button size="lg" className="apple-button-secondary text-lg px-8 py-3 h-auto">
                    Browse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 apple-hero-bg relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                Ready to Find Your Perfect Domain?
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful businesses who've found their ideal domain with us. 
                Start browsing our premium collection today.
              </p>
              
              <div className="flex justify-center">
                <Link to="/categories">
                  <Button size="lg" className="apple-button-white text-xl px-16 py-5 h-auto">
                    Browse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
}