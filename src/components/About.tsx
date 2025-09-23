import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Target, Award, Clock } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useInView } from '../hooks/useInView';
const About = () => {
  const team = [{
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "15+ years in domain industry, former startup executive"
  }, {
    name: "Sarah Chen",
    role: "Head of Acquisitions",
    bio: "Expert in domain valuation and market analysis"
  }, {
    name: "Mike Rodriguez",
    role: "Customer Success",
    bio: "Dedicated to helping clients find their perfect domain"
  }];
  const stats = [{
    icon: Award,
    label: "Premium Domains",
    value: "164",
    number: 164,
    suffix: ""
  }, {
    icon: Users,
    label: "Happy Clients",
    value: "126",
    number: 126,
    suffix: ""
  }, {
    icon: Target,
    label: "Success Rate",
    value: "100%",
    number: 100,
    suffix: "%"
  }, {
    icon: Clock,
    label: "Years Experience",
    value: "24",
    number: 24,
    suffix: ""
  }];
  const [statsRef, statsInView] = useInView({
    threshold: 0.3
  });
  return <>
      <Helmet>
        <title>About Us - NeedSites Domain Marketplace</title>
        <meta name="description" content="Learn about NeedSites - your trusted partner in premium domain acquisition. Meet our team and discover our mission to connect businesses with perfect domains." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16 stagger-fade-1">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">About Need Sites</h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're passionate about connecting businesses with premium domains that elevate their brand and drive success. 
              Since 2009, we've been curating the finest domain names for forward-thinking companies.
            </p>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
            const animatedValue = useAnimatedCounter({
              target: stat.number,
              duration: 2000 + index * 200,
              suffix: stat.suffix,
              startAnimation: statsInView
            });
            return <div key={index} className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{animatedValue}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>;
          })}
          </div>

          {/* Mission Section */}
          <div className="bg-card rounded-2xl p-8 mb-16 border border-border">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-4">
                  At NeedSites, we believe every business deserves a domain name that perfectly represents their brand and vision. 
                  Our carefully curated collection spans multiple industries, ensuring you'll find the ideal digital identity.
                </p>
                <p className="text-lg text-muted-foreground">
                  We don't just sell domains – we partner with you to understand your needs and find the perfect match that 
                  will serve as the foundation of your online presence for years to come.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4">Why Choose NeedSites?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Hand-picked premium domains</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Transparent pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Expert guidance & support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Secure transfer process</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced team combines deep industry knowledge with a passion for helping businesses succeed online.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => <div key={index} className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>)}
          </div>
        </div>
      </div>
    </>;
};
export default About;