import { guardianApiClient, newsApiClient } from "@/lib/apiClient";
import { Article } from "@/types";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "latest";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  try {
    const [newsApiResult, guardianResult] = await Promise.allSettled([
      newsApiClient.get("/everything", {
        params: { 
          q: query, 
          language: "en", 
          page, 
          pageSize: Math.ceil(pageSize / 2)
        },
      }),
      guardianApiClient.get("/search", {
        params: { 
          q: query, 
          "show-fields": "all", 
          page, 
          pageSize: Math.ceil(pageSize / 2)
        },
      })
    ]);

    if (
      newsApiResult.status === "rejected" &&
      guardianResult.status === "rejected"
    ) {
      return NextResponse.json(
        {
          error: "All providers failed.",
          errors: {
            newsApi: newsApiResult.reason?.response?.data?.message,
            guardian: guardianResult.reason?.response?.data?.message,
          },
        },
        { status: 502 }
      );
    }

    const newsApiArticles = ((newsApiResult.status === "fulfilled" && newsApiResult.value?.data?.articles?.map((article: any) => ({
      id: encodeURIComponent(article.url),
      source: "NewsAPI",
      title: article.title,
      description: article.description,
      content: article.content,
      image: article.urlToImage,
      url: article.url,
      publishedAt: article.publishedAt,
      author: article.author,
    }))) || []);

    const guardianArticles = ((guardianResult.status === "fulfilled" && guardianResult.value?.data?.response?.results?.map((article: any) => ({
      id: article.id,
      source: "The Guardian",
      title: article.webTitle,
      description: article.fields?.trailText,
      content: article.fields?.body,
      image: article.fields?.thumbnail,
      url: article.webUrl,
      publishedAt: article.webPublicationDate,
      author: article.fields?.byline,
    }))) || []);

    const newsApiTotal = newsApiResult.status === "fulfilled" ? newsApiResult.value?.data?.totalResults || 0 : 0;
    const guardianTotal = guardianResult.status === "fulfilled" ? guardianResult.value?.data?.response?.total || 0 : 0;
    const total = newsApiTotal + guardianTotal;

    const articles: Article[] = [...newsApiArticles, ...guardianArticles];
    articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json({
      articles,
      total,
      page,
      pageSize,
      hasMore: articles.length === pageSize && (page * pageSize) < total
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
