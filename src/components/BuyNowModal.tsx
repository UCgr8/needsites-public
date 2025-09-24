import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { submitBIN } from '@/lib/purchaseApi';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  binPrice: number;
  bundle?: string;
  tags?: string[];
  src?: string;
  host?: string;
}

interface BuyNowFormData {
  name: string;
  email: string;
  company: string;
}

export default function BuyNowModal({ 
  isOpen, 
  onClose, 
  domain, 
  binPrice, 
  bundle, 
  tags,
  src,
  host 
}: BuyNowModalProps) {
  const [formData, setFormData] = useState<BuyNowFormData>({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await submitBIN({
        domain,
        price: binPrice,
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        src,
        host
      });

      // Track success
      analytics.track('bin_submit', {
        domain,
        price: binPrice,
        bundle,
        tags,
        src,
        host
      });

      if (response.redirectUrl) {
        window.open(response.redirectUrl, '_blank', 'noopener,noreferrer');
        toast({
          title: "Escrow checkout opened in a new tab.",
          description: `Processing purchase for ${domain}`,
        });
      } else if (response.ok) {
        toast({
          title: "We're creating your Escrow checkout and will email you shortly.",
          description: `Purchase request for ${domain}`,
        });
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process purchase');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BuyNowFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-border rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Buy Now</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Domain</p>
            <p className="font-semibold text-foreground">{domain}</p>
            <p className="text-lg font-bold text-primary mt-2">
              {formatPrice(binPrice)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required
                className="mt-1"
                maxLength={100}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                required
                className="mt-1"
                maxLength={255}
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-foreground">
                Company (Optional)
              </Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your company name"
                className="mt-1"
                maxLength={100}
              />
            </div>

            <div className="bg-muted/30 rounded-xl p-4 mt-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Protected by Escrow.com.</span> We pay 100% of the Escrow.com fees.
              </p>
            </div>

            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || !formData.name.trim() || !formData.email.trim()}
                aria-label={`Buy Now for ${domain}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Buy Now - ${formatPrice(binPrice)}`
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}