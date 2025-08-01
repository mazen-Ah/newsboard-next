"use client";

import { useNews } from "@/hooks/useNews";

export default function Home() {
  const { articles } = useNews("latest");

  return (
    <div>
      <h1>News Articles</h1>
      <div>
        {articles?.map((article) => (
          <div
            key={article.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>{article.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
