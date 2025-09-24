import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Target, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import PurchaseWaysSection from './PurchaseWaysSection';

const Info = () => {
  const whyBuyHereFeatures = [
    {
      title: "Kickoff included",
      description: "a 60-minute call with the founder to sharpen positioning and a simple 90-day plan."
    },
    {
      title: "Action kit",
      description: "launch checklist, landing outline, and next steps so you actually ship."
    },
    {
      title: "Direct answers, faster transfer",
      description: "ask questions, decide, and complete via Escrow.com with guidance."
    },
    {
      title: "Flexible deals",
      description: "Buy Now (BIN) or Rent-to-Own."
    },
    {
      title: "Curation over clutter",
      description: "only names chosen for clarity and intent—no endless trawling."
    }
  ];

  const keywordBenefits = [
    {
      icon: Target,
      title: "Clarity",
      description: "the promise is obvious in the name—less explaining, more yes."
    },
    {
      icon: Zap,
      title: "Click-through",
      description: "matches search and ad intent, improving CTR and lowering CAC."
    },
    {
      icon: Users,
      title: "Memory",
      description: "easy to recall and repeat, which drives word of mouth."
    }
  ];

  const bundleBenefits = [
    "More surfaces = more leads: multiple entry points for adjacent searches and campaigns.",
    "Topical strength: interlinking related sites helps content and rankings mature together.",
    "Operational efficiency: reuse the same assets, playbooks, and team across the set.",
    "Flexibility: keep, spin up, or resell individual names later."
  ];

  const howItWorksSteps = [
    "Choose a domain (or bundle)",
    "Select Buy Now or Rent-to-Own",
    "Complete secure checkout via Escrow.com",
    "Get your booking link + action kit and ship your first version"
  ];

  const faqs = [
    {
      question: "Can I keep my existing brand?",
      answer: "Yes. Use the keyword domain for campaigns or a category site and funnel to your brand."
    },
    {
      question: "Will you build the site for me?",
      answer: "The kickoff gets you moving; full build help is optional."
    },
    {
      question: "Is there price parity with marketplaces?",
      answer: "Yes—same BIN. The extras (kickoff, action kit, guided transfer) are only when you buy here."
    },
    {
      question: "Any guarantees about rankings?",
      answer: "No promises—just best practices and a domain that earns clicks and recall from day one."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Why Buy Direct on NeedSites | Domain Marketplace Guide</title>
        <meta name="description" content="Learn why keyword domains work better than invented brands. Get expert guidance, action kits, and secure transfers when you buy direct from NeedSites." />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center stagger-fade-1">
              <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">
                Why Buy Direct on NeedSites
              </h1>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
                The right domain makes customer acquisition easier. When you buy here, you also get help turning that domain into a working launch.
              </p>
              
              <div className="flex justify-center">
                <Link to="/bundles">
                  <Button size="lg" className="apple-button text-lg px-12 py-4 h-auto">
                    Browse Domains
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What NeedSites Is */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="apple-card p-12 text-center">
                <h2 className="text-4xl font-bold mb-6 text-black">What NeedSites Is (and who it's for)</h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  NeedSites is a curated set of keyword-focused domains and bundles for founders, agencies, and operators who want to launch faster and convert better—without guessing whether the name will work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why keyword domains work */}
        <section className="py-24 apple-section-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 stagger-fade-1">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
                  Why keyword domains work
                </h2>
                <p className="text-xl text-muted-foreground mb-12">
                  A good domain does three jobs from day one:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {keywordBenefits.map((benefit, index) => (
                  <div key={index} className="apple-card p-8 text-center group">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-black">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="apple-card p-8 text-center bg-primary/5 border-primary/20">
                <p className="text-lg text-foreground font-medium">
                  If you plan to run SEO, ads, partnerships, or outbound, your domain is the first line of copy everyone sees. <strong>Make it carry weight.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why bundles */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
                  Why bundles (when to choose one)
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Pick a bundle when you want coverage across a category, not just one URL.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="apple-card p-8">
                  <h3 className="text-2xl font-bold mb-6 text-black">Bundle Benefits</h3>
                  <ul className="space-y-4">
                    {bundleBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="apple-card p-8 bg-primary/5 border-primary/20">
                  <h3 className="text-2xl font-bold mb-6 text-black">Decision Guide</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Choose single domains</strong> when you have one offer and one funnel.
                    </p>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Choose bundles</strong> to own a topic and route demand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why buy here instead of a marketplace */}
        <section className="py-24 apple-section-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
                  Why buy here instead of a marketplace
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Same market pricing; more value and speed.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {whyBuyHereFeatures.map((feature, index) => (
                  <div key={index} className="apple-card p-6">
                    <h3 className="text-xl font-bold mb-3 text-black">{feature.title}:</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="apple-card p-8 text-center bg-primary/5 border-primary/20">
                <p className="text-xl font-bold text-foreground">
                  Bottom line: Marketplaces sell the listing. Here, you get the name + a plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Purchase Ways */}
        <PurchaseWaysSection variant="info" />

        {/* How buying works */}
        <section className="py-24 apple-section-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
                  How buying works (simple)
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="apple-card p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="apple-card p-6 bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Kickoff details:</strong> One 60-minute session per domain. Schedule within 30 days. RTO unlocks the consult after your first payment clears.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick answers */}
        <section className="py-24 apple-section-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
                  Quick answers
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="apple-card p-6">
                    <h3 className="text-lg font-bold mb-3 text-black">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to do next */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-8 liquid-gradient-text">
                  What to do next
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link to="/bundles">
                  <Button size="lg" className="apple-button text-lg px-12 py-4 h-auto">
                    Browse Domains
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <Link to="/faqs">
                  <Button size="lg" variant="outline" className="apple-button-secondary text-lg px-12 py-4 h-auto">
                    Read FAQs
                  </Button>
                </Link>
              </div>
              
              <div className="apple-card p-8 text-center bg-primary/5 border-primary/20">
                <p className="text-lg font-medium text-foreground">
                  <strong>Final note:</strong> Good names don't sit. If one fits your plan, secure it and we'll map your first steps together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Info;