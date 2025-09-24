import { useState, useEffect } from 'react';
import { DOMAINS, CATEGORIES } from '../data/data';
import type { DomainApiData } from '@/types';

interface UseDomainDataResult {
  domainData: DomainApiData | null;
  loading: boolean;
  error: string | null;
}

const convertStaticToApiData = (domainName: string): DomainApiData | null => {
  // Find domain in static data
  let foundDomain = null;
  let foundCategory = null;
  
  for (const [categorySlug, domains] of Object.entries(DOMAINS)) {
    if (Array.isArray(domains)) {
      const domain = domains.find(d => d.name.toLowerCase() === domainName.toLowerCase());
      if (domain) {
        foundDomain = domain;
        foundCategory = CATEGORIES.find(cat => cat.slug === categorySlug);
        break;
      }
    }
  }

  if (!foundDomain || !foundCategory) {
    return null;
  }

  // Convert static domain to API format
  const domainParts = foundDomain.name.split('.');
  const primaryKeyword = domainParts[0];
  
  return {
    domain: foundDomain.name,
    binPrice: foundDomain.binPrice || foundDomain.price,
    tags: foundDomain.tags,
    bundle: foundCategory.title,
    availability: {
      bin: foundDomain.flags?.bin ?? true,
      offer: foundDomain.flags?.offer ?? true,
      rto: foundDomain.flags?.rto ?? true,
    },
    primaryKeyword,
    domainIsLive: false, // Default to false for static data
    tld: foundDomain.tld,
    length: foundDomain.length || foundDomain.name.length,
    updatedAt: new Date().toISOString()
  };
};

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

        // Try to fetch from API first
        try {
          const response = await fetch('https://needsites.com/domains.json');
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }

          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('API did not return JSON');
          }

          const domains: DomainApiData[] = await response.json();
          
          // Case-insensitive domain matching
          const foundDomain = domains.find(
            domain => domain.domain.toLowerCase() === domainName.toLowerCase()
          );

          if (foundDomain) {
            setDomainData(foundDomain);
            return;
          }
        } catch (apiError) {
          console.warn('API fetch failed, falling back to static data:', apiError);
        }

        // Fallback to static data
        const staticDomainData = convertStaticToApiData(domainName);
        setDomainData(staticDomainData);
        
      } catch (err) {
        console.error('Error loading domain data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load domain data');
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
  }, [domainName]);

  return { domainData, loading, error };
};