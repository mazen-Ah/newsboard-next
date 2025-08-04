import { Article } from "@/types";
import { getGuardianArticleById, getGuardianArticles, getNewsApiArticleByTitle, getNewsApiArticles, transformNews } from "./newsApis";



export const getAllArticles = async (
  query: string = "latest", 
  page: number = 1, 
  pageSize: number = 20
) => {
  const validPage = Math.max(1, page);
  const validPageSize = Math.min(50, Math.max(1, pageSize));

  const [newsApiResult, guardianResult] = await Promise.all([
    getNewsApiArticles(query, validPage, validPageSize),
    getGuardianArticles(query, validPage, validPageSize)
  ]);

  const allArticles: Article[] = [
    ...newsApiResult.articles,
    ...guardianResult.articles
  ];
if(query === "latest") { allArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )}
 

  const total = newsApiResult.total + guardianResult.total;
  const hasMore = allArticles.length === validPageSize && (validPage * validPageSize) < total;

  return {
    articles: allArticles,
    total,
    page: validPage,
    pageSize: validPageSize,
    hasMore,
    sources: {
      newsApi: newsApiResult,
      guardian: guardianResult
    }
  };
};



export const getArticle = async (id: string): Promise<Article | null> => {
  try {
    const [articleId] = id.split('?');
    const decodedId = decodeURIComponent(articleId);
    if (id.includes('theguardian.com')) {
      return await getGuardianArticleById(decodedId);
    } else {
      return await getNewsApiArticleByTitle(decodedId);
    }
  } catch (error) {
    console.error('Error in getArticle:', error);
    return null;
  }
};

