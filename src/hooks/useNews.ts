import { useEffect, useState, useRef } from 'react';
import { apiClient } from '@/lib/apiClient';
import { Article } from '@/types';

export const useNews = (query = '') => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const fetchNews = async () => {
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      setLoading(true);
      const response = await apiClient.get('/articles', { 
        params: { query, page, pageSize: 20 } 
      });
      
      const newArticles: Article[] = response?.data?.articles || [];
      
      setArticles(prev => [...prev, ...newArticles]);
      setHasMore(response.data.hasMore);
      setError(null);
    } catch (err: any) {
      if (page === 1) {
        setArticles([]);
        setError(err?.response?.data?.error || 'Failed to fetch articles');
      }
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const loadMore = () => {
    if (!loadingRef.current && !loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setError(null);
    setHasMore(true);
    fetchNews();
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      fetchNews();
    }
  }, [page]);

  return { articles, loading, error, hasMore, loadMore };
};
