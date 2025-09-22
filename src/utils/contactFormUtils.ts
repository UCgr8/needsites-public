import { ContactFormData, ValidationErrors } from '../types';

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (data: ContactFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Please enter your name';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!data.subject.trim()) {
    errors.subject = 'Please select or enter a subject';
  }

  if (!data.message.trim()) {
    errors.message = 'Please enter your message';
  } else if (data.message.length > 5000) {
    errors.message = 'Message must be 5000 characters or less';
  }

  return errors;
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// LocalStorage utilities
const DRAFT_KEY = 'contact-form-draft';

export const saveDraft = debounce((data: ContactFormData) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save draft:', error);
  }
}, 500);

export const loadDraft = (): Partial<ContactFormData> | null => {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load draft:', error);
    return null;
  }
};

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (error) {
    console.warn('Failed to clear draft:', error);
  }
};

// Throttling utility
const THROTTLE_KEY = 'contact-form-last-submit';
const THROTTLE_DURATION = 30000; // 30 seconds

export const isSubmissionThrottled = (): boolean => {
  try {
    const lastSubmit = localStorage.getItem(THROTTLE_KEY);
    if (!lastSubmit) return false;
    
    const timeSince = Date.now() - parseInt(lastSubmit);
    return timeSince < THROTTLE_DURATION;
  } catch {
    return false;
  }
};

export const setSubmissionTimestamp = () => {
  try {
    localStorage.setItem(THROTTLE_KEY, Date.now().toString());
  } catch (error) {
    console.warn('Failed to set submission timestamp:', error);
  }
};

export const getThrottleTimeRemaining = (): number => {
  try {
    const lastSubmit = localStorage.getItem(THROTTLE_KEY);
    if (!lastSubmit) return 0;
    
    const timeSince = Date.now() - parseInt(lastSubmit);
    return Math.max(0, Math.ceil((THROTTLE_DURATION - timeSince) / 1000));
  } catch {
    return 0;
  }
};

// Anti-spam honeypot check
export const checkHoneypot = (honeypot: string): boolean => {
  return honeypot.trim() !== '';
};

// Subject options
export const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'domain-purchase', label: 'Domain Purchase' },
  { value: 'custom-search', label: 'Custom Domain Search' },
  { value: 'bulk-purchase', label: 'Bulk Purchase' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'other', label: 'Other' }
];

// Create submission payload
export const createSubmissionPayload = (
  data: ContactFormData,
  turnstileToken?: string
) => {
  const payload: any = {
    name: data.name.trim(),
    email: data.email.trim(),
    subject: `[NeedSites] ${data.subject.trim()}`,
    message: data.message.trim(),
    metadata: {
      userAgent: navigator.userAgent,
      path: window.location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct'
    }
  };

  if (turnstileToken) {
    payload.turnstileToken = turnstileToken;
  }

  return payload;
};