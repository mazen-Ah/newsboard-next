# NewsFlow

NewsFlow is a modern news aggregator built with Next.js that combines articles from NewsAPI and The Guardian API. It features infinite scrolling, real-time search, and a responsive design.

## Features

- 🔄 Real-time article search
- ♾️ Infinite scroll pagination
- 📱 Responsive design
- 🖼️ Image optimization with Next.js Image
- ⚡ Fast page loads with server-side rendering
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

Before you begin, you'll need:

- Node.js 18.x or later
- API keys from:
  - [NewsAPI](https://newsapi.org)
  - [The Guardian API](https://open-platform.theguardian.com)

## Getting Started

1. Clone the repository

```bash
git clone <your-repo-url>
cd newsboard-next
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_NEWSAPI_KEY=your_newsapi_key_here
NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key_here
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_NEWSAPI_KEY` | 407126cc0152479cb6a3c875f402f789
| `NEXT_PUBLIC_GUARDIAN_API_KEY` | 407126cc0152479cb6a3c875f402f789

## API Integration

### NewsAPI
- Base URL: https://newsapi.org/v2
- Authentication: API key in headers (`X-API-Key`)
- Endpoints used:
  - `/everything`: Search articles with parameters

### The Guardian API
- Base URL: https://content.guardianapis.com
- Authentication: API key in query parameters (`api-key`)
- Endpoints used:
  - `/search`: Search articles
  - `/{article-path}`: Get single article

## Project Structure
