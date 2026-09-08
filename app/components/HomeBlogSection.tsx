"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Heart,
  Syringe,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MKT_01_POSTS, type BlogPost } from "../../data/blog-posts";
import { SectionReveal, StaggerContainer, StaggerItem, HoverCard } from "./MotionKit";

const STORAGE_KEY = "ihealth_admin_posts";

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

export default function HomeBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    return MKT_01_POSTS.filter((p) => p.status === "published").slice(0, 3);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    function loadPublishedPosts() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const published = parsed.filter(
              (p: BlogPost) => p && p.status === "published"
            );
            if (published.length > 0) {
              setPosts(published.slice(0, 3));
              return;
            }
          }
        }
      } catch {
        /* ignore localStorage parsing issues */
      }
      setPosts(MKT_01_POSTS.filter((p) => p.status === "published").slice(0, 3));
    }

    loadPublishedPosts();

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        loadPublishedPosts();
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-slate-50/60 py-20 lg:py-24 border-y border-slate-200/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-semibold text-[var(--brand)]">
              <Sparkles size={14} />
              Health Tips & Pharmacist Advice
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Latest from our Abbotsford clinic.
            </h2>
            <p className="mt-2 max-w-2xl text-base text-slate-600 sm:text-lg">
              Evidence-based health guidance, BC Pharmacare updates, and practical wellness advice written by your community pharmacists.
            </p>
          </div>

          <Link
            href="/health-tips"
            className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-xs transition hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-sm"
          >
            <span>View all articles</span>
            <ArrowRight size={16} />
          </Link>
        </SectionReveal>

        <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const Icon = iconForCategory(post.category);
            return (
              <StaggerItem key={post.id || post.slug} className="flex flex-col">
                <HoverCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md">
                  {/* Article Cover Image */}
                  <Link href={`/blog/${post.slug}`} className="group relative block aspect-[16/10] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl || "/blog/post-1.png"}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800 backdrop-blur-xs shadow-xs">
                      <Icon size={13} className="text-[var(--brand)]" />
                      <span>{post.category || "General"}</span>
                    </div>
                  </Link>

                  {/* Article Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Metadata Header */}
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        {post.readTimeMinutes || 4} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 transition hover:text-[var(--brand)]">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>

                    {/* Author & Read More */}
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-xs font-bold text-[var(--brand)]">
                          {(post.author || "iHealth Team").charAt(0)}
                        </span>
                        <span className="text-xs font-medium text-slate-700">
                          {post.author || "iHealth Team"}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)] hover:underline"
                        aria-label={`Read article: ${post.title}`}
                      >
                        <span>Read</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Mobile View All button */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/health-tips"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs"
          >
            <span>View all health articles</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
