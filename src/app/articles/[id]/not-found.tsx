import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the article you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
