import { useEffect, useState, useCallback, useRef } from 'react';
import { apiClient } from '@/lib/apiClient';
import { Article } from '@/types';

export const useNews = (query = '', initialArticles: Article[] = []) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const currentQueryRef = useRef(query);

  const fetchNews = useCallback(async () => {
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/articles', { 
        params: { query: currentQueryRef.current, page, pageSize: 20 } 
      });
      
      const newArticles: Article[] = response?.data?.articles || [];
      
      setArticles(prev => page === 1 ? newArticles : [...prev, ...newArticles]);
      setHasMore(response.data.hasMore);
    } catch (err: any) {
      console.error('Error fetching articles:', err);
      if (page === 1) {
        setArticles([]);
        setError(err?.response?.data?.error || 'Failed to fetch articles');
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page]);

  const loadMore = useCallback(() => {
    if (!loadingRef.current && !loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  // Handle query changes
  useEffect(() => {
    // Update the current query reference
    currentQueryRef.current = query;
    
    // Reset state for new search
    setPage(1);
    setError(null);
    setHasMore(true);
    
    // If it's a new search (not initial load), clear articles and fetch
    if (query !== 'latest' || initialArticles.length === 0) {
      setArticles([]);
      // Small delay to ensure state is updated
      const timeoutId = setTimeout(() => {
        fetchNews();
      }, 0);
      
      return () => clearTimeout(timeoutId);
    } else {
      // For initial load with initialArticles, use them
      setArticles(initialArticles);
    }
  }, [query, fetchNews]);

  // Handle pagination
  useEffect(() => {
    if (page > 1) {
      fetchNews();
    }
  }, [page, fetchNews]);

  return { articles, loading, error, hasMore, loadMore };
};
