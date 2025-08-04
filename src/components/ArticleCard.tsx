import type { Article } from "@/types";
import type React from "react";
import Image from "next/image";

type Props = {
  article: Article;
};

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <article className="bg-white rounded-xl cursor-pointer shadow-sm hover:shadow-md overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={article?.image || "https://placehold.co/600x400?text=No+Image"}
          alt={article?.title || "Article image"}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col h-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
          {article?.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 h-full">
          {article?.description}
        </p>
        <div className="flex mt-auto items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium truncate max-w-[150px]">
              Author: {article?.author || "Unknown"}
            </span>
            -
            <span className="font-medium text-gray-600 truncate">
              {article?.source || "Unknown source"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
