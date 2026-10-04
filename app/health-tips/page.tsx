import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HealthTipsDirectory from "./HealthTipsDirectory";
import { getPublishedPosts } from "@/lib/content";

// Refreshed on save from the admin panel, and every 5 minutes for scheduled posts.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Health Tips & Clinical Guides — iHealth Pharmacy Chilliwack",
  description:
    "Evidence-based health advice, BC PharmaCare guidance, vaccine updates, and senior care recommendations from your local Chilliwack pharmacists.",
};

export default async function HealthTipsPage() {
  const publishedPosts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <span className="text-sm font-medium text-slate-500">Loading health guides...</span>
            </div>
          }
        >
          <HealthTipsDirectory initialPosts={publishedPosts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}