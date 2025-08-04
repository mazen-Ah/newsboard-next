import type { Article } from "@/types";
import type React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  article: Article;
};

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Link
      href={`/articles/${encodeURIComponent(article.id)}`}
      className="group"
    >
      <article className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:scale-[1.02]">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article?.image || "https://placehold.co/600x400?text=No+Image"}
            alt={article?.title || "Article image"}
            fill
            priority
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {article?.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
            {article?.description}
          </p>
          <div className="flex mt-auto items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-600 truncate">
                {article?.source || "Unknown source"}
              </span>
              {article?.author && (
                <>
                  <span>•</span>
                  <span className="truncate max-w-[100px]">
                    {article.author}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs text-gray-400">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-3 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            Read more →
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
