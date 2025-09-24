import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  binPrice?: number;
  onSubmit: (data: OfferFormData) => void;
}

export interface OfferFormData {
  offerAmount: string;
  name: string;
  email: string;
  company?: string;
  useCase?: string;
  timeline: string;
  needRTO: boolean;
  src?: string;
  host?: string;
}

export default function OfferModal({ isOpen, onClose, domainName, binPrice, onSubmit }: OfferModalProps) {
  const [formData, setFormData] = useState<OfferFormData>({
    offerAmount: '',
    name: '',
    email: '',
    company: '',
    useCase: '',
    timeline: '',
    needRTO: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.offerAmount || !formData.name || !formData.email || !formData.timeline) {
      return;
    }

    setIsSubmitting(true);
    
    // Add URL parameters from current location
    const urlParams = new URLSearchParams(window.location.search);
    const submitData = {
      ...formData,
      src: urlParams.get('src') || undefined,
      host: urlParams.get('host') || undefined
    };
    
    await onSubmit(submitData);
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: keyof OfferFormData, value: string | boolean) => {
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
            <p className="font-semibold text-foreground">{domainName}</p>
            {binPrice && (
              <p className="text-sm text-muted-foreground mt-1">
                Listed at {formatPrice(binPrice)}
              </p>
            )}
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
              />
            </div>

            <div>
              <Label htmlFor="useCase" className="text-sm font-medium text-foreground">
                Use Case (Optional)
              </Label>
              <Textarea
                id="useCase"
                value={formData.useCase}
                onChange={(e) => handleInputChange('useCase', e.target.value)}
                placeholder="How do you plan to use this domain?"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="timeline" className="text-sm font-medium text-foreground">
                Timeline *
              </Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (1-2 days)</SelectItem>
                  <SelectItem value="week">Within a week</SelectItem>
                  <SelectItem value="month">Within a month</SelectItem>
                  <SelectItem value="quarter">Within 3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="needRTO"
                checked={formData.needRTO}
                onCheckedChange={(checked) => handleInputChange('needRTO', !!checked)}
              />
              <Label
                htmlFor="needRTO"
                className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I'm interested in Rent-to-Own options
              </Label>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 mt-6">
              <p className="text-sm text-muted-foreground">
                Same domain price as marketplaces — we pay 100% of Escrow.com fees.
              </p>
            </div>

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
                disabled={isSubmitting || !formData.offerAmount || !formData.name || !formData.email || !formData.timeline}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Offer'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}