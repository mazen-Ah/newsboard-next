"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { useNews } from "@/hooks/useNews";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import { Article } from "@/types";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import ArticleCard from "@/components/ArticleCard";

interface HomePageProps {
  initialArticles?: Article[];
}

function HomePage({}: HomePageProps) {
  const [search, setSearch] = useState("latest");
  const debouncedSearch = useDebounce(search);
  const { articles, loading, error, hasMore, loadMore } =
    useNews(debouncedSearch);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.documentElement.scrollHeight - 100;
      if (scrollPosition >= scrollThreshold && hasMore && !loading) {
        loadMore();
      }
    }, 150);
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">News Articles</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {articles?.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <ArticleSkeleton />
        </div>
      )}
      {error && <ErrorState error={error} />}
      {!loading && !error && articles?.length === 0 && <EmptyState />}
    </div>
  );
}

export default HomePage;
