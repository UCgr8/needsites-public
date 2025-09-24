const FUNCTIONS_BASE = 'https://ifxetmmcscffwlijpdfs.functions.supabase.co';

interface ApiResponse {
  ok: boolean;
  redirectUrl?: string;
}

interface BINPayload {
  domain: string;
  price: number;
  name: string;
  email: string;
  company?: string;
  src?: string;
  host?: string;
}

interface RTOPayload {
  domain: string;
  price: number;
  months: number;
  downPayment: number;
  name: string;
  email: string;
  company?: string;
  src?: string;
  host?: string;
}

interface OfferPayload {
  domain: string;
  offerAmount: number;
  name: string;
  email: string;
  company?: string;
  notes?: string;
  needRTO?: boolean;
  rtoTerm?: number;
  rtoDownPayment?: number;
  src?: string;
  host?: string;
}

async function makeApiCall(endpoint: string, payload: any): Promise<ApiResponse> {
  const response = await fetch(`${FUNCTIONS_BASE}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  return response.json();
}

export async function submitBIN(payload: BINPayload): Promise<ApiResponse> {
  return makeApiCall('escrow-create-bin', payload);
}

export async function submitRTO(payload: RTOPayload): Promise<ApiResponse> {
  return makeApiCall('escrow-create-rto', payload);
}

export async function submitOffer(payload: OfferPayload): Promise<ApiResponse> {
  return makeApiCall('offer', payload);
}