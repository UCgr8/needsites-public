import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - NeedSites</title>
        <meta name="description" content="Read NeedSites Terms of Service. Understand the terms and conditions for purchasing premium domains from our marketplace." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          <div className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using NeedSites, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Domain Sales</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>All domain sales are final. Once payment is processed and domain transfer is initiated, refunds are not available.</p>
                <p>Domain prices are listed in USD and may change without notice until purchase is completed.</p>
                <p>We guarantee clean title and proper transfer of domains upon payment completion.</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Payment Terms</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Payment must be received in full before domain transfer begins.</p>
                <p>We accept major credit cards, PayPal, and wire transfers for high-value domains.</p>
                <p>Domain transfer typically completes within 5-7 business days after payment verification.</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Intellectual Property</h2>
              <p className="text-muted-foreground">
                By purchasing a domain through NeedSites, you warrant that your use of the domain will not infringe on any 
                third-party trademarks or intellectual property rights. You assume full responsibility for any legal issues 
                arising from domain usage.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                NeedSites shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from 
                your use of our service.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Privacy</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibent mb-4 text-foreground">7. Contact Information</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <p>Email: email@needsites.com</p>
                <p>Phone: +1-555-DOMAINS</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;