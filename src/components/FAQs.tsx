import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
const faqData: FAQ[] = [{
  id: '1',
  category: 'General',
  question: 'What is NeedSites?',
  answer: 'NeedSites is a premium domain marketplace where you can buy or rent high-quality domains for your business. We specialize in professional domains across various industries, offering both established domains and custom domain solutions.'
}, {
  id: '2',
  category: 'General',
  question: 'How do I know if a domain is available?',
  answer: 'All domains listed on our site show their availability status. Available domains are marked with a green "Available" badge, while reserved or sold domains are clearly marked. You can also contact us to check the availability of specific domains not listed.'
}, {
  id: '3',
  category: 'Purchasing',
  question: 'What payment methods do you accept?',
  answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and PayPal. For high-value domain purchases, we also offer escrow services through trusted third-party providers for added security.'
}, {
  id: '4',
  category: 'Purchasing',
  question: 'How long does the domain transfer process take?',
  answer: 'Domain transfers typically take 5-7 business days to complete. The exact timeframe depends on the domain registrar and TLD. We handle all the technical aspects of the transfer and keep you updated throughout the process.'
}, {
  id: '5',
  category: 'Purchasing',
  question: 'Do you offer payment plans for expensive domains?',
  answer: 'Yes, we offer flexible payment plans for domains over $10,000. Contact us to discuss installment options that work for your budget. We can arrange monthly payments over 6-24 months depending on the domain value.'
}, {
  id: '6',
  category: 'Rental',
  question: 'How does domain rental work?',
  answer: 'Domain rental allows you to use a premium domain for a monthly or annual fee without purchasing it outright. You get full control over the domain during the rental period. At the end of the term, you can choose to renew, purchase, or return the domain.'
}, {
  id: '7',
  category: 'Rental',
  question: 'What happens to my website if I stop renting a domain?',
  answer: 'If you choose not to renew a rental agreement, you\'ll have a 30-day grace period to either purchase the domain or migrate your website to a new domain. We provide migration assistance to ensure a smooth transition.'
}, {
  id: '8',
  category: 'Technical',
  question: 'Do you provide hosting services?',
  answer: 'We focus exclusively on domain sales and rentals. However, we can recommend trusted hosting providers and help with DNS setup once you acquire a domain from us.'
}, {
  id: '9',
  category: 'Technical',
  question: 'Can you help with domain setup and DNS configuration?',
  answer: 'Absolutely! We provide free DNS setup assistance for all domain purchases. Our technical team can help you configure email, website hosting, and other DNS records to get your domain working quickly.'
}, {
  id: '10',
  category: 'Support',
  question: 'What kind of support do you offer?',
  answer: 'We offer comprehensive support including pre-sale consultation, purchase assistance, technical setup help, and ongoing support. Our team is available Monday-Friday 9 AM - 6 PM EST, with emergency support available for critical issues.'
}];
const categories = ['All', 'General', 'Purchasing', 'Rental', 'Technical', 'Support'];
export default function FAQs() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredFaqs = selectedCategory === 'All' ? faqData : faqData.filter(faq => faq.category === selectedCategory);
  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };
  return <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 stagger-fade-1">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Find answers to common questions about our domain marketplace, purchasing process, 
            and support services. Can't find what you're looking for? Contact our team!
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-3 rounded-full font-medium transition-colors ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground border border-border hover:bg-muted'}`}>
                {category}
              </button>)}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map(faq => <div key={faq.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button onClick={() => toggleFaq(faq.id)} className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-6">
                  {openFaq === faq.id ? <ChevronDown className="w-6 h-6 text-muted-foreground" /> : <ChevronRight className="w-6 h-6 text-muted-foreground" />}
                </div>
              </button>
              
              {openFaq === faq.id && <div className="px-8 pb-6">
                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>}
            </div>)}
        </div>

        {/* Popular Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Get your site before its gone
          </h2>
          <div className="text-center">
            <Link to="/category/other" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
              Browse
            </Link>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-needsites-dark-blue rounded-3xl p-12 text-white text-center mt-16">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our domain experts are here to help! Get personalized assistance with domain selection, 
            purchasing, or technical setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-needsites-blue font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
            
            
          </div>
        </div>
      </div>
    </div>;
}