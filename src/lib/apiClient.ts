import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
});

export const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-API-Key": process.env.NEXT_PUBLIC_NEWSAPI_KEY,
  },
});

export const guardianApiClient = axios.create({
  baseURL: "https://content.guardianapis.com",
  params: {
    "api-key": process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
  },
});
