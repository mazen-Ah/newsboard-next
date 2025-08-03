"use client";

import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { ArticleSkeleton } from "@/components/ArticleSkeleton";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const [search, setSearch] = useState("latest");
  const debouncedSearch = useDebounce(search);
  const { articles, loading, error } = useNews(debouncedSearch);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">News Articles</h1>
        <SearchBar value={search} onChange={setSearch} />
        
        {loading ? (
          <div className="mt-8">
            <ArticleSkeleton />
          </div>
        ) : null}
        
        {error && (
          <div className="text-center text-red-600 mt-8 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        
        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-gray-500 mt-8 p-4 bg-white rounded-lg shadow-sm">
            No articles found
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
