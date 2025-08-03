import { guardianApiClient, newsApiClient } from "@/lip/apiClient";
import { Article } from "@/types";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "latest";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  try {
    const [newsApiRes, guardianRes] = await Promise.all([
      newsApiClient.get("/everything", {
        params: { q: query, language: "en", page, pageSize },
      }),
      guardianApiClient.get("/search", {
        params: { q: query, "show-fields": "all", page, pageSize },
      }),
    ]);

    const newsApiArticles = newsApiRes?.data?.articles?.map((article: any) => ({
      id: encodeURIComponent(article.url),
      source: "NewsAPI",
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.urlToImage,
      url: article.url,
      publishedAt: article.publishedAt,
      author: article.author,
    })) || [];

    const guardianArticles = guardianRes?.data?.response?.results?.map((article: any) => ({
      id: article.id,
      source: "The Guardian",
      title: article.webTitle,
      description: article.fields?.trailText,
      content: article.fields?.body,
      image: article.fields?.thumbnail,
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      author: article.fields?.byline,
    })) || [];

    const articles: Article[] = [...newsApiArticles, ...guardianArticles];

    articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const totalNewsApi = newsApiRes?.data?.totalResults || 0;
    const totalGuardian = guardianRes?.data?.response?.total || 0;
    const total = totalNewsApi + totalGuardian;

    return NextResponse.json({
      articles,
      total,
      page,
      pageSize,
    });
  } catch (error: any) {
    console.error("API /api/articles error:", {
      message: error.message,
      stack: error.stack,
      ...(error.response && { responseData: error.response.data }),
    });

    return NextResponse.json(
      { error: error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
