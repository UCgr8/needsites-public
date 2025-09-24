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

export interface DomainApiData {
  domain: string;
  bin_price?: number;
  tags?: string[];
  bundle?: string;
  availability_bin?: boolean;
  availability_offer?: boolean;
  availability_rto?: boolean;
  primary_keyword?: string;
  domain_is_live?: boolean;
  tld?: string;
  length?: number;
  updated_at?: string;
  rto?: {
    months?: number;
    downPayment?: number;
    interestPct?: number;
  };
  useCases?: Array<{
    title: string;
    valueProp: string;
    example: string;
  }>;
}