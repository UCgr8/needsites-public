export interface Domain {
  name: string;
  status: 'available' | 'reserved';
  price: number;
  binPrice: number;
  tags: string[];
  tld: string;
  length: number;
  flags: {
    bin: boolean;
    offer: boolean;
    rto: boolean;
  };
}

export interface Category {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  count: number;
  icon?: string | null;
}

export interface DomainWithCategory extends Domain {
  categorySlug: string;
  categoryTitle: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
  customSubject?: string;
  honeypot?: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  customSubject?: string;
}

export interface SubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error' | 'throttled';
  message?: string;
}