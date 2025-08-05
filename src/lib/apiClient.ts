import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
});

export const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-API-Key": process.env.NEXT_PUBLIC_NEWSAPI_KEY  || "febba8a7f5894fd5873a85d116fb6dfe",
  },
});

export const guardianApiClient = axios.create({
  baseURL: "https://content.guardianapis.com",
  params: {
    "api-key": process.env.NEXT_PUBLIC_GUARDIAN_API_KEY || "96dbf704-c5dd-4581-84c4-ca9f049244d1",
  },
});
