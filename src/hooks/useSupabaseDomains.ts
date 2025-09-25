import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface DomainFilters {
  search?: string;
  bundle?: string;
  tags?: string[];
  availability_bin?: boolean;
  availability_offer?: boolean;
  availability_rto?: boolean;
  tld?: string;
  minLength?: number;
  maxLength?: number;
}

interface SortOption {
  column: string;
  ascending: boolean;
}

interface Domain {
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
}

interface UseSupabaseDomainsResult {
  domains: Domain[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  loadMore: () => void;
}

const ITEMS_PER_PAGE = 24;

const getSortOption = (sortBy: string): SortOption => {
  switch (sortBy) {
    case 'price-low':
      return { column: 'bin_price', ascending: true };
    case 'price-high':
    default:
      return { column: 'bin_price', ascending: false };
    case 'a-z':
      return { column: 'domain', ascending: true };
    case 'z-a':
      return { column: 'domain', ascending: false };
    case 'length':
      return { column: 'length', ascending: true };
    case 'relevance':
      return { column: 'domain', ascending: true }; // Will be overridden by search relevance
  }
};

export const useSupabaseDomains = (): UseSupabaseDomainsResult => {
  const [searchParams] = useSearchParams();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [allFetched, setAllFetched] = useState(false);

  // Parse filters from URL
  const filters: DomainFilters = {
    search: searchParams.get('q') || undefined,
    bundle: searchParams.get('bundle') || undefined,
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
    availability_bin: searchParams.get('availability_bin') === 'true' || undefined,
    availability_offer: searchParams.get('availability_offer') === 'true' || undefined,
    availability_rto: searchParams.get('availability_rto') === 'true' || undefined,
    tld: searchParams.get('tld') || undefined,
    minLength: searchParams.get('minLength') ? parseInt(searchParams.get('minLength')!) : undefined,
    maxLength: searchParams.get('maxLength') ? parseInt(searchParams.get('maxLength')!) : undefined,
  };

  const sortBy = searchParams.get('sort') || 'price-high';
  const sortOption = getSortOption(sortBy);

  const fetchDomains = useCallback(async (page: number = 0, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('domains')
        .select('domain, bin_price, tags, bundle, availability_bin, availability_offer, availability_rto, primary_keyword, domain_is_live, tld, length, updated_at', { count: 'exact' });

      // Apply filters
      if (filters.search) {
        query = query.or(`domain.ilike.%${filters.search}%,primary_keyword.ilike.%${filters.search}%`);
      }

      if (filters.bundle) {
        query = query.eq('bundle', filters.bundle);
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      if (filters.availability_bin) {
        query = query.eq('availability_bin', true);
      }

      if (filters.availability_offer) {
        query = query.eq('availability_offer', true);
      }

      if (filters.availability_rto) {
        query = query.eq('availability_rto', true);
      }

      if (filters.tld) {
        query = query.eq('tld', filters.tld);
      }

      if (filters.minLength) {
        query = query.gte('length', filters.minLength);
      }

      if (filters.maxLength) {
        query = query.lte('length', filters.maxLength);
      }

      // Apply sorting
      if (sortBy === 'relevance' && filters.search) {
        // For relevance, we'll sort by domain name match first, then by price
        query = query.order('domain', { ascending: true });
      } else {
        query = query.order(sortOption.column, { ascending: sortOption.ascending });
      }

      // Apply pagination
      const rangeStart = page * ITEMS_PER_PAGE;
      const rangeEnd = rangeStart + ITEMS_PER_PAGE - 1;
      query = query.range(rangeStart, rangeEnd);

      const { data, error: queryError, count } = await query;

      if (queryError) {
        throw queryError;
      }

      if (append) {
        setDomains(prev => [...prev, ...(data || [])]);
      } else {
        setDomains(data || []);
      }

      setTotalCount(count || 0);
      setCurrentPage(page);
      setAllFetched((data || []).length < ITEMS_PER_PAGE);
      
    } catch (err) {
      console.error('Error fetching domains:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch domains');
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.bundle, filters.tags, filters.availability_bin, filters.availability_offer, filters.availability_rto, filters.tld, filters.minLength, filters.maxLength, sortBy, sortOption.column, sortOption.ascending]);

  // Reset and fetch when filters change
  useEffect(() => {
    setCurrentPage(0);
    setAllFetched(false);
    fetchDomains(0, false);
  }, [fetchDomains]);

  const loadMore = useCallback(() => {
    if (!loading && !allFetched) {
      fetchDomains(currentPage + 1, true);
    }
  }, [loading, allFetched, currentPage, fetchDomains]);

  const hasMore = !allFetched && domains.length < totalCount;

  return {
    domains,
    loading,
    error,
    totalCount,
    hasMore,
    loadMore,
  };
};