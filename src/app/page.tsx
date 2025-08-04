import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HomePage />
    </main>
  );
}
