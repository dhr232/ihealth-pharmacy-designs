import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HealthTipsDirectory from "./HealthTipsDirectory";
import { MKT_01_POSTS, isPostPublished } from "../../data/blog-posts";

export const metadata: Metadata = {
  title: "Health Tips & Clinical Guides — iHealth Pharmacy Abbotsford",
  description:
    "Evidence-based health advice, BC PharmaCare guidance, vaccine updates, and senior care recommendations from your local Abbotsford pharmacists.",
};

export default function HealthTipsPage() {
  const publishedPosts = MKT_01_POSTS.filter((p) => isPostPublished(p));

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