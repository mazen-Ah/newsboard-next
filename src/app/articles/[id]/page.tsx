import { getAllArticles, getArticle } from "@/lib/newsService";
import { Article } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = (await getArticle(params.id)) as Article;

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.description,
  };
}
export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = (await getArticle(id)) as Article;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Articles
        </Link>

        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {article?.image && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={
                  article?.image || "https://placehold.co/600x400?text=No+Image"
                }
                alt={article?.title || "Article image"}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <span className="font-medium">{article?.source}</span>
              <span>•</span>
              <span>{new Date(article?.publishedAt).toLocaleDateString()}</span>
              {article?.author && (
                <>
                  <span>•</span>
                  <span>By {article?.author}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article?.title}
            </h1>

            {article?.description && (
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                {article?.description}
              </p>
            )}

            <div className="prose prose-lg max-w-none">
              {article?.content ? (
                <div dangerouslySetInnerHTML={{ __html: article?.content }} />
              ) : (
                <p className="text-gray-600">
                  Full content not available.
                  <a
                    href={article?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    Read the full article on {article?.source} →
                  </a>
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <a
                href={article?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read Original Article
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
