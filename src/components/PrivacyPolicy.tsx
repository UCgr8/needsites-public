import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - NeedSites</title>
        <meta name="description" content="NeedSites Privacy Policy. Learn how we collect, use, and protect your personal information when you use our domain marketplace." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          <div className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Information We Collect</h2>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>Personal Information:</strong> When you contact us or make a purchase, we collect information such as your name, email address, phone number, and payment details.</p>
                <p><strong>Usage Data:</strong> We collect information about how you use our website, including pages visited, time spent, and interactions with our content.</p>
                <p><strong>Technical Data:</strong> We automatically collect IP addresses, browser type, device information, and other technical details.</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• Process domain purchases and transfers</p>
                <p>• Provide customer support and respond to inquiries</p>
                <p>• Send important updates about your domain transactions</p>
                <p>• Improve our website and services</p>
                <p>• Comply with legal obligations</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Information Sharing</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in these circumstances:</p>
                <p>• With domain registrars to facilitate transfers</p>
                <p>• With payment processors to complete transactions</p>
                <p>• When required by law or to protect our rights</p>
                <p>• With your explicit consent</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, 
                secure server environments, and regular security assessments.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies and Tracking</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>We use cookies and similar tracking technologies to:</p>
                <p>• Remember your preferences and settings</p>
                <p>• Analyze website performance and usage</p>
                <p>• Provide personalized content and recommendations</p>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>You have the right to:</p>
                <p>• Access your personal information</p>
                <p>• Correct inaccurate data</p>
                <p>• Request deletion of your data</p>
                <p>• Opt-out of marketing communications</p>
                <p>• Data portability</p>
              </div>
            </section>

            <section className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>If you have questions about this Privacy Policy or your personal data, contact us:</p>
                <p>Email: privacy@needsites.com</p>
                <p>Address: NeedSites Privacy Officer, [Address]</p>
                <p>Phone: +1-555-DOMAINS</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;