import * as React from 'react';
import { Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AutoTextarea } from './ui/auto-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from '@/hooks/use-toast';
import { ContactFormData, ValidationErrors, SubmissionState } from '../types';
import {
  validateForm,
  saveDraft,
  loadDraft,
  clearDraft,
  isSubmissionThrottled,
  setSubmissionTimestamp,
  getThrottleTimeRemaining,
  checkHoneypot,
  SUBJECT_OPTIONS,
  createSubmissionPayload
} from '../utils/contactFormUtils';

export default function EnhancedContact() {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    customSubject: '',
    honeypot: ''
  });

  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submissionState, setSubmissionState] = React.useState<SubmissionState>({ status: 'idle' });
  const [throttleTimeLeft, setThrottleTimeLeft] = React.useState(0);
  const [draftRestored, setDraftRestored] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);
  const successAnnouncerRef = React.useRef<HTMLDivElement>(null);
  const errorAnnouncerRef = React.useRef<HTMLDivElement>(null);

  // Load draft on mount
  React.useEffect(() => {
    const draft = loadDraft();
    if (draft && !draftRestored) {
      setFormData(prev => ({ ...prev, ...draft }));
      setDraftRestored(true);
    }
  }, [draftRestored]);

  // Auto-save draft
  React.useEffect(() => {
    if (draftRestored && (formData.name || formData.email || formData.message)) {
      saveDraft(formData);
    }
  }, [formData, draftRestored]);

  // Throttle timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (throttleTimeLeft > 0) {
      interval = setInterval(() => {
        const remaining = getThrottleTimeRemaining();
        setThrottleTimeLeft(remaining);
        if (remaining === 0) {
          setSubmissionState({ status: 'idle' });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [throttleTimeLeft]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    const fieldErrors = validateForm(formData);
    if (fieldErrors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field as keyof ValidationErrors] }));
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'general',
      customSubject: '',
      honeypot: ''
    });
    setErrors({});
    setTouched({});
    clearDraft();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check throttle
    if (isSubmissionThrottled()) {
      const remaining = getThrottleTimeRemaining();
      setThrottleTimeLeft(remaining);
      setSubmissionState({ 
        status: 'throttled', 
        message: `Please wait ${remaining} seconds before submitting again.` 
      });
      return;
    }

    // Check honeypot (anti-spam)
    if (checkHoneypot(formData.honeypot || '')) {
      // Fake success for spam bots
      setSubmissionState({ status: 'success' });
      setTimeout(() => setSubmissionState({ status: 'idle' }), 5000);
      return;
    }

    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true
      });
      // Focus first error field
      const firstErrorField = Object.keys(formErrors)[0];
      const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      element?.focus();
      return;
    }

    setSubmissionState({ status: 'submitting' });

    try {
      // Get final subject (use custom if "other" is selected)
      const finalSubject = formData.inquiryType === 'other' && formData.customSubject 
        ? formData.customSubject 
        : SUBJECT_OPTIONS.find(opt => opt.value === formData.inquiryType)?.label || formData.subject;

      const payload = createSubmissionPayload({
        ...formData,
        subject: finalSubject
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.ok || result.success) {
        setSubmissionState({ status: 'success' });
        setSubmissionTimestamp();
        clearDraft();
        handleClear();
        
        toast({
          title: "Message sent successfully!",
          description: "Thanks! We got your message. We'll reply soon.",
        });

        // Announce success for screen readers
        if (successAnnouncerRef.current) {
          successAnnouncerRef.current.textContent = "Message sent successfully! We'll reply soon.";
        }

        setTimeout(() => setSubmissionState({ status: 'idle' }), 3000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Network error. Please try again.';
      
      setSubmissionState({ 
        status: 'error', 
        message: errorMessage 
      });

      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });

      // Announce error for screen readers
      if (errorAnnouncerRef.current) {
        errorAnnouncerRef.current.textContent = `Error: ${errorMessage}`;
      }

      setTimeout(() => setSubmissionState({ status: 'idle' }), 5000);
    }
  };

  const isFormValid = Object.keys(validateForm(formData)).length === 0;
  const showCustomSubject = formData.inquiryType === 'other';

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 stagger-fade-1">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 liquid-gradient-text drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to find your perfect domain? Get in touch with our team for personalized assistance, 
            custom searches, or any questions about our domain marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Send us a message</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot field (hidden) */}
              <input
                type="text"
                name="website"
                value={formData.honeypot || ''}
                onChange={(e) => handleInputChange('honeypot', e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-card-foreground">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="John Doe"
                    className={`${errors.name ? 'border-destructive' : ''}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="john@example.com"
                    className={`${errors.email ? 'border-destructive' : ''}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="space-y-2">
                <Label htmlFor="inquiryType" className="text-sm font-medium text-card-foreground">
                  Subject *
                </Label>
                <Select 
                  value={formData.inquiryType} 
                  onValueChange={(value) => handleInputChange('inquiryType', value)}
                >
                  <SelectTrigger 
                    className={`${errors.subject ? 'border-destructive' : ''}`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-lg z-50">
                    {SUBJECT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p id="subject-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Custom Subject (appears when "Other" is selected) */}
              {showCustomSubject && (
                <div className="space-y-2">
                  <Label htmlFor="customSubject" className="text-sm font-medium text-card-foreground">
                    Please specify *
                  </Label>
                  <Input
                    id="customSubject"
                    name="customSubject"
                    type="text"
                    required={showCustomSubject}
                    value={formData.customSubject || ''}
                    onChange={(e) => handleInputChange('customSubject', e.target.value)}
                    onBlur={() => handleBlur('customSubject')}
                    placeholder="Describe your inquiry"
                    className={`${errors.customSubject ? 'border-destructive' : ''}`}
                    aria-invalid={!!errors.customSubject}
                    aria-describedby={errors.customSubject ? 'custom-subject-error' : undefined}
                  />
                  {errors.customSubject && (
                    <p id="custom-subject-error" className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.customSubject}
                    </p>
                  )}
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-card-foreground">
                  Message *
                </Label>
                <AutoTextarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  placeholder="Tell us more about what you're looking for..."
                  className={`${errors.message ? 'border-destructive' : ''} pb-8`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Messages */}
              {submissionState.status === 'throttled' && (
                <div className="flex items-center gap-2 p-4 bg-muted border border-border rounded-lg text-muted-foreground">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">
                    Please wait {throttleTimeLeft} seconds before submitting again.
                  </p>
                </div>
              )}

              {submissionState.status === 'error' && submissionState.message && (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{submissionState.message}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={submissionState.status === 'submitting' || submissionState.status === 'success' || !isFormValid || submissionState.status === 'throttled'}
                  className="flex-1 bg-gradient-to-r from-needsites-orange to-needsites-orange-dark hover:from-needsites-orange-dark hover:to-needsites-orange text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
                >
                  {submissionState.status === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : submissionState.status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : submissionState.status === 'throttled' ? (
                    <>
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Wait {throttleTimeLeft}s
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClear}
                  disabled={submissionState.status === 'submitting'}
                  className="sm:w-auto"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-sm text-muted-foreground border-t border-border pt-4">
                <p>
                  We'll get back to you as soon as possible. Check your spam folder if you don't see our response.
                </p>
              </div>
            </form>

            {/* Screen reader announcements */}
            <div 
              ref={successAnnouncerRef}
              aria-live="polite" 
              aria-atomic="true"
              className="sr-only"
            />
            <div 
              ref={errorAnnouncerRef}
              aria-live="assertive" 
              aria-atomic="true"
              className="sr-only"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* FAQ Quick Links */}
            <div className="bg-gradient-to-br from-needsites-blue/10 to-primary/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Questions?</h3>
              <p className="text-muted-foreground mb-6">
                Check our frequently asked questions for instant answers to common inquiries.
              </p>
              <a
                href="/faqs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                View FAQs
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Business Hours */}
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="text-xl font-bold text-card-foreground mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-card-foreground font-medium">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-card-foreground font-medium">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-card-foreground font-medium">Closed</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  For urgent inquiries outside business hours, please use the contact form and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
