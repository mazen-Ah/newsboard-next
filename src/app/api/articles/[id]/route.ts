import { guardianApiClient, newsApiClient } from "@/lib/apiClient"
import type { Article } from "@/types"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    if (!id) return NextResponse.json({ error: "Article ID is required" }, { status: 400 })
    const decodedId = decodeURIComponent(id)

    const isGuardianId = !decodedId.startsWith("http") && !decodedId.includes("://")

    let article: Article | null = null

    if (isGuardianId) {
      try {
        const guardianResponse = await guardianApiClient.get(`/${id}`, {
          params: {
            "show-fields": "all",
          },
        })

        if (guardianResponse.data?.response?.content) {
          const guardianArticle = guardianResponse.data.response.content
          article = {
            id: guardianArticle.id,
            source: "The Guardian",
            title: guardianArticle.webTitle,
            description: guardianArticle.fields?.trailText,
            content: guardianArticle.fields?.body,
            image: guardianArticle.fields?.thumbnail,
            url: guardianArticle.webUrl,
            publishedAt: guardianArticle.webPublicationDate,
            author: guardianArticle.fields?.byline,
          }
        }
      } catch (guardianError) {
        console.log("Guardian API failed for ID:", id)
      }
    }

    if (!article) {
      try {
        const searchQuery = isGuardianId ? id : decodedId

        const newsApiResponse = await newsApiClient.get("/everything", {
          params: {
            q: `"${searchQuery}"`,
            language: "en",
            pageSize: 10,
            sortBy: "relevancy",
          },
        })

        if (newsApiResponse.data?.articles?.length > 0) {
          // Find the exact match by URL or title
          const foundArticle = newsApiResponse.data.articles.find(
            (art: any) =>
              art.url === decodedId ||
              encodeURIComponent(art.url) === id ||
              art.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )

          if (foundArticle) {
            article = {
              id: encodeURIComponent(foundArticle.url),
              source: "NewsAPI",
              title: foundArticle.title,
              description: foundArticle.description,
              content: foundArticle.content,
              image: foundArticle.urlToImage,
              url: foundArticle.url,
              publishedAt: foundArticle.publishedAt,
              author: foundArticle.author,
            }
          }
        }
      } catch (newsApiError) {
        console.log("NewsAPI failed for ID:", id)
      }
    }

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({ article })
  } catch (error: any) {
    console.error("API /api/articles/[id] error:", {
      message: error.message,
      stack: error.stack,
      id: await params.then((p) => p.id),
      ...(error.response && { responseData: error.response.data }),
    })

    return NextResponse.json({ error: error.message || "Failed to fetch article" }, { status: 500 })
  }
}
