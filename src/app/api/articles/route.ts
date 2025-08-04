import { NextResponse, NextRequest } from "next/server";
import { getAllArticles } from "@/lib/newsService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "latest";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
    const result = await getAllArticles(query, page, pageSize);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API /api/articles error:", {
      message: error.message,
      query: request.nextUrl.searchParams.get("query"),
    });

    return NextResponse.json(
      { error: error.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
