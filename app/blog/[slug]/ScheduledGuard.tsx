"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { isPostPublished, type BlogPost } from "../../../data/blog-posts";

const emptySubscribe = () => () => {};

export default function ScheduledGuard({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isPreview = useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("preview") === "true",
    () => false
  );

  const isLive = isPostPublished(post);

  // If the post is already live, render normally
  if (isLive) {
    return <>{children}</>;
  }

  // During SSR prerender phase, return children so static generator succeeds
  if (!isHydrated) {
    return <>{children}</>;
  }

  // Staff preview mode via ?preview=true
  if (isPreview) {
    return (
      <>
        <div className="sticky top-0 z-40 bg-amber-500 text-amber-950 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider shadow-md">
          Staff Preview Mode &middot; Scheduled for automated release on {post.publishedAt} &middot; Hidden from public
        </div>
        {children}
      </>
    );
  }

  // General public visiting ahead of scheduled release date
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
          <Clock size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Coming Soon
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          This article is scheduled to be published on{" "}
          <strong className="text-slate-900">
            {new Date(post.publishedAt).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </strong>
          . Please check back then!
        </p>
        <div className="pt-2">
          <Link
            href="/health-tips"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-hover)]"
          >
            <ArrowLeft size={16} />
            <span>Browse Active Health Tips</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
