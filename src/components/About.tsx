import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Shield, ExternalLink, ArrowRight, Quote } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import founderPhoto from '../assets/adam-founder.jpg';

const About = () => {
  const team = [
    {
      name: "Adam",
      role: "Founder",
      bio: "Product-minded, compulsive de-clutterer of ideas. My job is to reduce noise and help you choose the simplest path to traction."
    },
    {
      name: "Freelancer #1",
      role: "Design / Front-End (Contract)",
      bio: "Turns plain words into clean, legible interfaces. Landing pages that explain themselves."
    },
    {
      name: "Freelancer #2", 
      role: "Content / SEO (Contract)",
      bio: "Keeps language crisp and search-intent honest. Ships words that earn clicks and trust."
    }
  ];

  const principles = [
    "Clarity beats clever. Say what you do; earn clever later.",
    "Ship small, learn fast. Progress > perfection in week one.",
    "Protect attention. Fewer tabs open = more momentum.",
    "Make reversible bets. Save energy for the moves that matter.",
    "Help first. If I can save you a week with one sentence, I will."
  ];

  const marketplaces = ["Afternic", "Sedo", "DaaZ"];

  return (
    <>
      <Helmet>
        <title>About NeedSites — Founder Story & How We Help</title>
        <meta name="description" content="NeedSites exists to make the beginning easier for founders—clear names, calm guidance, and a practical first step. Meet the founder and see how we work." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">About NeedSites</h1>
            <p className="text-2xl text-muted-foreground mb-8 leading-relaxed">
              I started NeedSites to make the beginning easier for founders—clear names, calm guidance, and a practical first step.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/info">
                Start Here <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* A note from Adam */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">A note from Adam (the founder)</h2>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I've been the person staring at a blank page with a good idea and no obvious starting point. The early days are noisy: a thousand choices, a hundred opinions, not enough time. What I learned—sometimes the hard way—is that a strong, clear name quiets the room. People "get it" faster. You move faster.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I built NeedSites for people like us: builders who want less friction at the start and more momentum after day one.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-foreground">
                  "Good work loves a good start."
                </blockquote>
              </div>
              <div className="flex justify-center">
                <img 
                  src={founderPhoto} 
                  alt="Adam, Founder of NeedSites" 
                  className="w-48 h-48 rounded-xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Your journey starts here - Callout */}
          <Card className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Your journey starts here</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Your journey/story is about to begin. We're here to help. We know what it's like to start a site. Getting the perfect domain is just the beginning. We know, because we've been through the process many times.
              </p>
              <p className="text-lg text-foreground font-medium">
                I created NeedSites to help founders like me become successful.
              </p>
            </CardContent>
          </Card>

          {/* Why I care */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why I care</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I've launched projects that worked and projects that didn't. The difference was rarely effort—it was direction: the first few moves that turn intent into traction. When someone showed up with a steady hand, I moved quicker and made better decisions. NeedSites is me paying that forward: a focused name and a calm, practical plan so you can get to real customer conversations sooner.
            </p>
          </div>

          {/* What I believe */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What I believe (guiding principles)</h2>
            <ul className="space-y-4">
              {principles.map((principle, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">{principle}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* How I work with buyers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">How I work with buyers</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              When you purchase a domain on NeedSites, you're not just handed the keys. We'll talk like founders do—plain language, honest trade-offs, and a short list of next steps you can actually do.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">A focused kickoff conversation to sharpen your angle</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Straight answers to unblock decisions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Notes you can reference when things get loud again</span>
              </li>
            </ul>
            <p className="text-muted-foreground mt-6">
              For what's included, timelines, and pricing options, see{' '}
              <Link to="/info" className="text-primary hover:underline font-medium">
                Start Here
              </Link>.
            </p>
          </div>

          {/* Trust & Proof */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Trust & Proof</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground"><strong>Real person, real access:</strong> You'll talk to me (Adam).</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground"><strong>Secure transfer:</strong> Escrow.com protection with guided handoff.</span>
                </div>
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-muted-foreground">
                    <strong>Where I list:</strong> {marketplaces.join(' • ')} (buying direct here includes the kickoff + action kit).
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground"><strong>Portfolio:</strong> 160+ domains curated for clarity and intent.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground"><strong>Working style:</strong> transparent, responsive, and focused on getting you to a live v1.</span>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground text-center mb-4">(Logos and badges go here. Keep this section concise and visual.)</p>
                <div className="flex justify-center items-center gap-4 opacity-60">
                  <Shield className="h-8 w-8" />
                  <span className="text-sm font-medium">Escrow.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Timeline (high-level)</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-muted rounded-full mt-2"></div>
                <p className="text-muted-foreground"><strong>Then:</strong> tinkerer + operator; shipped a lot, learned what sticks</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary/50 rounded-full mt-2"></div>
                <p className="text-muted-foreground"><strong>Recently:</strong> began curating keyword-focused domains by category</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground"><strong>Now:</strong> NeedSites—names plus practical guidance so founders can launch faster</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Team</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What to expect when we talk */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What to expect when we talk</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">You'll do most of the talking; I'll narrow the path with questions.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">We'll pick a first audience and a simple offer.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">We'll write one sentence you can say out loud when someone asks, "So what do you do?"</span>
              </li>
            </ul>
          </div>

          {/* A small promise */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">A small promise</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              If you show up ready to move, I'll match your energy. I'll tell you what I think—even when the answer is "simplify." And I'll celebrate the first win with you, because getting started is the hard part most people skip.
            </p>
          </div>

          {/* Light next step */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Light next step</h3>
              <p className="text-muted-foreground mb-6">Want the nuts and bolts (pricing, RTO, escrow, timelines)?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link to="/info">Start Here</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/categories">Browse Domains</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Ask a Question</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
};
export default About;