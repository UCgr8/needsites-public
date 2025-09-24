import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import type { DomainApiData } from '@/types';

interface UseDomainDataResult {
  domainData: DomainApiData | null;
  loading: boolean;
  error: string | null;
}

const fetchDomainFromSupabase = async (domainName: string): Promise<DomainApiData | null> => {
  try {
    const { data, error } = await supabase
      .from('domains')
      .select('domain, bin_price, tags, bundle, availability_bin, availability_offer, availability_rto, primary_keyword, domain_is_live, tld, length, updated_at')
      .ilike('domain', domainName.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return null;
      }
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Supabase query error:', err);
    throw err;
  }
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

        // Clean domain name (remove protocol and www)
        const cleanDomain = domainName.replace(/^(https?:\/\/)?(www\.)?/, '');
        const domainData = await fetchDomainFromSupabase(cleanDomain);
        
        setDomainData(domainData);
        
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