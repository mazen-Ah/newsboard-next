import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '@/lip/apiClient';
import { Article } from '@/types';

interface UseNewsReturn {
  articles: Article[];
}

export const useNews = (query = ''): UseNewsReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchNews = useCallback(async () => {
    try {
      const response = await apiClient.get('/articles', { params: { query } });
      setArticles(response.data.articles || []);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Error fetching articles';
      console.error('Error fetching articles:', errorMessage);
      setArticles([]); 
    }
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  
  return { 
    articles, 
  };
};
