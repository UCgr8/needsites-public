import { useState, useEffect } from 'react';

export interface DomainApiData {
  domain: string;
  binPrice?: number;
  tags?: string[];
  bundle?: string;
  availability?: { 
    bin?: boolean; 
    offer?: boolean; 
    rto?: boolean; 
  };
  primaryKeyword?: string;
  domainIsLive?: boolean;
  tld?: string;
  length?: number;
  updatedAt?: string;
  useCases?: Array<{
    title: string;
    valueProp: string;
    example: string;
  }>;
}

interface UseDomainDataResult {
  domainData: DomainApiData | null;
  loading: boolean;
  error: string | null;
}

export const useDomainData = (domainName: string): UseDomainDataResult => {
  const [domainData, setDomainData] = useState<DomainApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!domainName) {
      setLoading(false);
      return;
    }

    const fetchDomainData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://needsites.com/domains.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch domains: ${response.status}`);
        }

        const domains: DomainApiData[] = await response.json();
        
        // Case-insensitive domain matching
        const foundDomain = domains.find(
          domain => domain.domain.toLowerCase() === domainName.toLowerCase()
        );

        setDomainData(foundDomain || null);
      } catch (err) {
        console.error('Error fetching domain data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch domain data');
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
  }, [domainName]);

  return { domainData, loading, error };
};