import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
});

export const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`,
  },
});

export const guardianApiClient = axios.create({
  baseURL: "https://content.guardianapis.com",
  params: {
    "api-key": process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
  },
});

// Debug: Log API configuration in development
if (process.env.NODE_ENV === "development") {
  console.log("API Client Configuration:", {
    newsApiKey: process.env.NEXT_PUBLIC_NEWSAPI_KEY ? "Present" : "Missing",
    guardianApiKey: process.env.NEXT_PUBLIC_GUARDIAN_API_KEY
      ? "Present"
      : "Missing",
  });
}
