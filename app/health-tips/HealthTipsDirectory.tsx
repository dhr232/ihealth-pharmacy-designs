"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FlaskConical,
  Heart,
  Package,
  Search,
  ShieldCheck,
  Stethoscope,
  Syringe,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BlogPost } from "../../data/blog-posts";

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Vaccinations: Syringe,
  "New Patients": BookOpen,
  Seniors: Heart,
  Coverage: ShieldCheck,
  "Minor Ailments": Stethoscope,
  Services: Package,
  Compounding: FlaskConical,
};

function iconForCategory(category: string): LucideIcon {
  return CATEGORY_ICON_MAP[category] ?? BookOpen;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const CATEGORIES = [
  { id: "all", label: "All Articles" },
  { id: "Seniors", label: "Seniors Health" },
  { id: "Vaccinations", label: "Vaccinations & Flu" },
  { id: "Minor Ailments", label: "Minor Ailments" },
  { id: "Coverage", label: "Coverage & PharmaCare" },
  { id: "Services", label: "Pharmacy Services" },
  { id: "Compounding", label: "Compounding" },
];

export default function HealthTipsDirectory({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const matchesTags = post.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesExcerpt || matchesCategory || matchesTags;
      }
      return true;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Lead featured article (first article when no search query and "all" category)
  const isAllView = selectedCategory === "all" && !searchQuery.trim();
  const featuredPost = isAllView ? filteredPosts[0] : null;
  const gridPosts = isAllView ? filteredPosts.slice(1) : filteredPosts;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialPosts.length };
    initialPosts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [initialPosts]);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <div>
      {/* Editorial Hub Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(192,29,22,0.25),rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-300">
            <BookOpen size={14} />
            <span>Clinical Knowledge & Patient Guides</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Health tips from your local pharmacist.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Practical, evidence-based guidance written and clinically reviewed by our Abbotsford pharmacy team. Covering senior care, BC Fair PharmaCare, vaccinations, and minor ailments.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search health tips, vaccines, symptoms, or coverage..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 py-3.5 pl-11 pr-11 text-sm text-white placeholder-slate-400 shadow-xl backdrop-blur-md transition-all focus:border-red-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-slate-50/60 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Menu Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              if (cat.id !== "all" && count === 0) return null;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-[var(--brand)] text-white shadow-sm shadow-red-950/10"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Notice */}
          {(selectedCategory !== "all" || searchQuery.trim()) && (
            <div className="mt-4 flex items-center justify-between border-b border-slate-200 pb-3 text-xs text-slate-500">
              <p>
                Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
                {selectedCategory !== "all" && (
                  <span> in <strong className="text-slate-800">{selectedCategory}</strong></span>
                )}
                {searchQuery.trim() && (
                  <span> matching &ldquo;<strong className="text-slate-800">{searchQuery}</strong>&rdquo;</span>
                )}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="font-semibold text-[var(--brand)] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Featured Lead Story (Only in All view when no query) */}
          {featuredPost && (
            <div className="mt-6 mb-10">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md transition-all hover:border-slate-300 hover:shadow-xl lg:grid lg:grid-cols-12">
                {/* Image */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden bg-slate-100 lg:col-span-7 lg:aspect-auto"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredPost.imageUrl || "/blog/post-1.jpg"}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm backdrop-blur-xs">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
                    <span>Featured Clinical Guide</span>
                  </div>
                </Link>

                {/* Info */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <span className="rounded-md bg-red-50 px-2.5 py-1 text-[var(--brand)]">
                        {featuredPost.category}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{formatDate(featuredPost.publishedAt)}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{featuredPost.readTimeMinutes} min read</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 transition group-hover:text-[var(--brand)] sm:text-3xl">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-sm font-bold text-[var(--brand)]">
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{featuredPost.author}</p>
                        <p className="text-[11px] text-slate-500">Clinical Pharmacist</p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand)] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[var(--brand-hover)]"
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="my-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <BookOpen size={36} className="mx-auto text-slate-400" />
              <h3 className="mt-3 text-base font-bold text-slate-900">
                No health guides found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo; in this category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center rounded-lg bg-[var(--brand)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--brand-hover)]"
              >
                Clear Search & Show All Articles
              </button>
            </div>
          ) : (
            /* Standard 3-Column Magazine Grid */
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => {
                const Icon = iconForCategory(post.category);
                return (
                  <article
                    key={post.id || post.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md"
                  >
                    {/* Cover Thumbnail */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.imageUrl || "/blog/post-1.jpg"}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-xs backdrop-blur-xs">
                        <Icon size={13} className="text-[var(--brand)]" />
                        <span>{post.category}</span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />
                          {post.readTimeMinutes} min read
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-slate-900 transition group-hover:text-[var(--brand)]">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="mt-2.5 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs font-medium text-slate-500">
                          By {post.author}
                        </span>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)] hover:underline"
                        >
                          <span>Read article</span>
                          <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Medical Newsletter Subscription Strip */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[var(--brand)]">
            <Heart size={24} />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Get monthly health tips delivered to your inbox.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            We publish practical, seasonal health updates once a month. No promotional spam, ever. Unsubscribe anytime.
          </p>

          {subscribed ? (
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 border border-emerald-200">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Thank you! You have been subscribed to our monthly health newsletter.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm placeholder-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--brand-hover)] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
