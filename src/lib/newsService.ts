import { guardianApiClient, newsApiClient } from "./apiClient";
import { Article } from "@/types";

export const transformNews = (article: any, type: string): Article => {
  if (type === "guardian") {
    return {
      id: article.webUrl, 
      source: "The Guardian",
      title: article.webTitle || "",
      description: article.fields?.trailText || "",
      content: article.fields?.body || "",
      image: article.fields?.thumbnail || "",
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      author: article.fields?.byline || "",
    };
  }
  
  return {
    id: article.title.replaceAll(':', ''), 
    source: "NewsAPI",
    title: article.title || "",
    description: article.description || "",
    content: article.content || "",
    image: article.urlToImage || "",
    url: article.url,
    publishedAt: article.publishedAt,
    author: article.author || "",
  };
};

export const getNewsApiArticles = async (
  query: string, 
  page: number, 
  pageSize: number
) => {
  try {
    const response = await newsApiClient.get("/everything", {
      params: { 
        q: query, 
        language: "en", 
        page, 
        pageSize: Math.ceil(pageSize / 2)
      },
    });
    const articles = response.data?.articles?.map((article: any) => transformNews(article, "newsapi")) || [];
    const total = response.data?.totalResults || 0;
    return { articles, total, success: true };
  } catch (error: any) {
    return { 
      articles: [], 
      total: 0, 
      success: false, 
      error,
    };
  }
};

export const getGuardianArticles = async (
  query: string, 
  page: number, 
  pageSize: number
) => {
  try {
    const cleanedQuery = query.replaceAll(':', '');
    const quotedQuery = `"${cleanedQuery}"`;
    const response = await guardianApiClient.get("/search", {
      params: { 
        q: quotedQuery,
        "show-fields": "all", 
        page, 
        pageSize: Math.ceil(pageSize / 2)
      },
    });
    
    const articles = response.data?.response?.results?.map((article: any) => transformNews(article, "guardian")) || [];
    const total = response.data?.response?.total || 0;
    return { articles, total, success: true };
  } catch (error: any) {
    return { 
      articles: [], 
      total: 0, 
      success: false, 
      error,
    };
  }
};

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

const getGuardianArticleById = async (id: string): Promise<Article | null> => {
  try {
    const urlPath = id.split('theguardian.com/')[1];
    const response = await guardianApiClient.get(`/${urlPath}`, {
      params: {
        'show-fields': 'all'
      }
    });
    
    const article = response.data?.response?.content;
    return article ? transformNews(article, 'guardian') : null;
  } catch (error) {
    console.error('Error fetching Guardian article:', error);
    throw new Error(`Failed to fetch Guardian article: ${error}`);
  }
};

const getNewsApiArticleByTitle = async (title: string): Promise<Article | null> => {
  try {
    const { articles } = await getAllArticles(title, 1, 10);
    return articles.find(article => 
      article.source === 'NewsAPI' && 
      article.title.replaceAll(':', '') === title
    ) || null;
  } catch (error) {
    console.error('Error fetching NewsAPI article:', error);
    throw new Error(`Failed to fetch NewsAPI article: ${error}`);
  }
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

export const getArticleFromGuardian = async (url: string): Promise<Article | null> => {
  if (!url.includes('theguardian.com')) {
    throw new Error('Invalid Guardian URL provided');
  }
  return await getGuardianArticleById(url);
};

export const getArticleFromNewsApi = async (title: string): Promise<Article | null> => {
  return await getNewsApiArticleByTitle(title);
};


