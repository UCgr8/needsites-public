import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, MessageSquare, Calendar, Shield, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface PurchaseWaysSectionProps {
  variant?: 'homepage' | 'info' | 'domain';
  domainPrice?: number;
  className?: string;
}

export default function PurchaseWaysSection({ 
  variant = 'homepage', 
  domainPrice, 
  className = '' 
}: PurchaseWaysSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const purchaseWays = [
    {
      icon: DollarSign,
      title: 'Buy It Now',
      description: variant === 'domain' 
        ? 'Immediate ownership with secure transfer via Escrow.com. We pay all fees.'
        : 'Get immediate ownership with secure Escrow.com transfer. We handle all fees and paperwork.',
      features: ['Instant ownership', 'Secure via Escrow.com', 'We pay all fees', '5-7 day transfer'],
      price: domainPrice ? formatPrice(domainPrice) : 'Market Price',
      ctaText: 'Purchase Now',
      popular: true
    },
    {
      icon: MessageSquare,
      title: 'Make an Offer',
      description: variant === 'domain'
        ? 'Negotiate terms that work for your budget. Include your use case for faster response.'
        : 'Submit a custom offer based on your budget and needs. We review all offers within 24 hours.',
      features: ['Flexible pricing', 'Custom terms', '24h response time', 'Use case considered'],
      price: 'Your Price',
      ctaText: 'Make Offer',
      popular: false
    },
    {
      icon: Calendar,
      title: 'Rent to Own',
      description: variant === 'domain'
        ? 'Start with monthly payments. Build equity toward full ownership over time.'
        : 'Start using the domain immediately with monthly payments that build toward ownership.',
      features: ['Start immediately', 'Build equity', 'Flexible payments', 'Own eventually'],
      price: domainPrice ? `${formatPrice(Math.round(domainPrice * 0.08))}/mo` : 'Monthly',
      ctaText: 'Start Rental',
      popular: false
    }
  ];

  const sectionTitle = variant === 'domain' 
    ? 'Multiple Ways to Get This Domain'
    : 'Multiple Ways to Get Your Domain';

  return (
    <section className={`py-24 ${variant === 'homepage' ? 'apple-section-bg' : 'bg-white'} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 stagger-fade-1">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
              {sectionTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Choose the payment method that works best for you. All options include secure transfers and full support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {purchaseWays.map((way, index) => (
              <div 
                key={index} 
                className={`apple-card p-8 relative ${way.popular ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}
              >
                {way.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <way.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black">{way.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-4">{way.price}</div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {way.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {way.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${way.popular ? 'bg-primary hover:bg-primary/90' : 'apple-button'}`}
                  size="lg"
                >
                  {way.ctaText}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="apple-card p-8 bg-primary/5 border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">100% Secure Transfers</span>
            </div>
            <p className="text-muted-foreground mb-4">
              All transactions are processed through Escrow.com for maximum security. 
              We cover all Escrow fees and provide dedicated support throughout the transfer process.
            </p>
            {variant !== 'domain' && (
              <Link to="/info">
                <Button variant="outline" className="apple-button-secondary">
                  Learn More About Our Process
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}