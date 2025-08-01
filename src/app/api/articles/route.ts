import { guardianApiClient, newsApiClient } from "@/lip/apiClient";
import { Article } from "@/types";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "latest";

  try {
    const [newsApiRes, guardianRes] = await Promise.all([
      newsApiClient.get("/everything", {
        params: { q: query, language: "en", pageSize: 20 },
      }),
      guardianApiClient.get("/search", {
        params: { q: query, "show-fields": "all", pageSize: 20 },
      }),
    ]);

    const articles: Article[] = [
      ...newsApiRes?.data?.articles?.map((article: any) => ({
        id: encodeURIComponent(article.url),
        source: "NewsAPI",
        title: article.title,
        description: article.description,
        content: article.content,
        image: article.urlToImage,
        url: article.url,
        publishedAt: article.publishedAt,
        author: article.author,
      })),
      ...guardianRes?.data?.response?.results.map((article: any) => ({
        id: article.id,
        source: "The Guardian",
        title: article.webTitle,
        description: article.fields?.trailText,
        content: article.fields?.body,
        image: article.fields?.thumbnail,
        url: article.webUrl,
        publishedAt: article.webPublicationDate,
        author: article.fields?.byline,
      })),
    ];

    articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json({ articles });
  } catch (error: any) {
      console.error("API /api/articles error:", {
        message: error.message,
        stack: error.stack,
        ...(error.response && { responseData: error.response.data }),
      });
   
    return NextResponse.json(
      {error:error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
