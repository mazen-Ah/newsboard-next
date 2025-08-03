import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '@/lip/apiClient';
import { Article } from '@/types';

interface UseNewsReturn {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export const useNews = (query = ''): UseNewsReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/articles', { params: { query } });
      setArticles(response.data.articles || []);
    } catch (err: any) {
      setError(err?.message || 'Error fetching articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  
  return { articles, loading, error };
};
