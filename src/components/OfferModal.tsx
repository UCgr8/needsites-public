import React, { useState } from 'react';
import { X, DollarSign, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { submitOffer } from '@/lib/purchaseApi';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/utils/analytics';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  binPrice: number;
  bundle?: string;
  tags?: string[];
  src?: string;
  host?: string;
}

interface OfferFormData {
  offerAmount: string;
  name: string;
  email: string;
  company: string;
  notes: string;
  wantRto: boolean;
  rtoTerm: number;
  rtoDownPayment: string;
}

export default function OfferModal({ 
  isOpen, 
  onClose, 
  domain, 
  binPrice, 
  bundle, 
  tags,
  src,
  host 
}: OfferModalProps) {
  const [formData, setFormData] = useState<OfferFormData>({
    offerAmount: '',
    name: '',
    email: '',
    company: '',
    notes: '',
    wantRto: false,
    rtoTerm: 36,
    rtoDownPayment: '0'
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

  const calculateRtoMonthly = () => {
    if (!formData.wantRto || !formData.offerAmount) return 0;
    const offerAmount = parseFloat(formData.offerAmount) || 0;
    const downPayment = parseFloat(formData.rtoDownPayment) || 0;
    return Math.ceil((offerAmount - downPayment) / formData.rtoTerm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.offerAmount || !formData.name.trim() || !formData.email.trim()) {
      setError('Offer amount, name, and email are required');
      return;
    }

    const offerAmount = parseFloat(formData.offerAmount);
    if (offerAmount <= 0) {
      setError('Offer amount must be greater than 0');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        domain,
        offerAmount,
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || undefined,
        notes: formData.notes.trim() || undefined,
        needRTO: formData.wantRto,
        ...(formData.wantRto && {
          rtoTerm: formData.rtoTerm,
          rtoDownPayment: parseFloat(formData.rtoDownPayment) || 0
        }),
        src,
        host
      };

      const response = await submitOffer(payload);

      // Track success
      analytics.track('offer_submit', {
        domain,
        price: binPrice,
        bundle,
        tags,
        offerAmount,
        wantRto: formData.wantRto,
        src,
        host
      });

      toast({
        title: "Thanks — we'll reply within 1 business day.",
        description: `Offer submitted for ${domain}`,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof OfferFormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-border rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Make an Offer</h2>
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
            <p className="text-sm text-muted-foreground mt-1">
              Listed at {formatPrice(binPrice)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="offerAmount" className="text-sm font-medium text-foreground">
                Offer Amount *
              </Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="offerAmount"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.offerAmount}
                  onChange={(e) => handleInputChange('offerAmount', e.target.value)}
                  className="pl-10"
                  placeholder="Enter your offer"
                  required
                  maxLength={10}
                />
              </div>
            </div>

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

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional details about your offer..."
                className="mt-1"
                rows={3}
                maxLength={1000}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="wantRto"
                checked={formData.wantRto}
                onCheckedChange={(checked) => handleInputChange('wantRto', !!checked)}
              />
              <Label
                htmlFor="wantRto"
                className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Request RTO?
              </Label>
            </div>

            {formData.wantRto && (
              <div className="space-y-3 p-4 bg-muted/20 rounded-lg">
                <div>
                  <Label htmlFor="rtoTerm" className="text-sm font-medium text-foreground">
                    RTO Term
                  </Label>
                  <Select 
                    value={formData.rtoTerm.toString()} 
                    onValueChange={(value) => handleInputChange('rtoTerm', parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="18">18 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rtoDownPayment" className="text-sm font-medium text-foreground">
                    Down Payment
                  </Label>
                  <Input
                    id="rtoDownPayment"
                    type="number"
                    min="0"
                    value={formData.rtoDownPayment}
                    onChange={(e) => handleInputChange('rtoDownPayment', e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div>

                {formData.offerAmount && (
                  <div className="text-sm text-muted-foreground">
                    Monthly: ${calculateRtoMonthly()}/mo for {formData.rtoTerm} months
                  </div>
                )}
              </div>
            )}

            <div className="bg-muted/30 rounded-xl p-4 mt-6">
              <p className="text-sm text-muted-foreground">
                We pay 100% of Escrow.com fees. Reply within 1 business day.
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
                disabled={isSubmitting || !formData.offerAmount || !formData.name.trim() || !formData.email.trim()}
                aria-label={`Make an Offer for ${domain}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Offer'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}