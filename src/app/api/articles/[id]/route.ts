import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/newsService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    
    if (!id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    let article = null;

    // If we have a title, search by title first (more efficient)
    if (title) {
      console.log(`Searching for article with title: "${title}"`);
      
      // Extract key words from title for better search
      const searchQuery = title
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Remove special characters
        .split(' ')
        .filter(word => word.length > 3) // Only words longer than 3 chars
        .slice(0, 3) // Take first 3 meaningful words
        .join(' ');

      const result = await getAllArticles(searchQuery, 1, 50);
      
      // Find exact match by ID first, then by title similarity
      article = result.articles.find(a => a.id === id) || 
                result.articles.find(a => 
                  a.title.toLowerCase().includes(title.toLowerCase()) ||
                  title.toLowerCase().includes(a.title.toLowerCase())
                );
    }

    // Fallback: search by ID in recent articles
    if (!article) {
      console.log(`Fallback: Searching for article with ID: "${id}"`);
      const result = await getAllArticles("latest", 1, 100);
      article = result.articles.find(a => a.id === id);
    }

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (error: any) {
    console.error("API /api/articles/[id] error:", {
      message: error.message,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}