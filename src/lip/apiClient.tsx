import axios from "axios";
export const newsApiClients = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    Authorization:
      process.env.NEXT_PUBLIC_NEWSAPI_KEY || "282a826bd7b9401e9fd1152534ab8135",
  },
});
export const guardianApiCLients = axios.create({
  baseURL: "https://content.guardianapis.com",
  params: {
    "api-key":
      process.env.NEXT_PUBLIC_GUARDIAN_API_KEY ||
      "96dbf704-c5dd-4581-84c4-ca9f049244d1",
  },
});
