import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SectionReveal, BlurReveal } from "../components/MotionKit";
import {
  Syringe,
  Heart,
  ShieldCheck,
  BookOpen,
  Stethoscope,
  FlaskConical,
  Package,
  ArrowRight,
} from "lucide-react";
import { MKT_01_POSTS, type BlogPost } from "../../data/blog-posts";

export const metadata: Metadata = {
  title: "Health Tips — iHealth Pharmacy Abbotsford",
  description:
    "Practical health advice from your local Abbotsford pharmacists. New patients, vaccinations, seniors, coverage, minor ailments, and compounding.",
};

type Article = {
  title: string;
  category: string;
  icon: LucideIcon;
  snippet: string;
  href: string;
  imageUrl: string;
  readTimeMinutes: number;
};

// Map each blog-post category to a Lucide icon. Anything unrecognized
// falls back to BookOpen so the page never renders a missing icon.
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

function toArticle(post: BlogPost): Article {
  return {
    title: post.title,
    category: post.category,
    icon: iconForCategory(post.category),
    snippet: post.excerpt,
    href: `/blog/${post.slug}`,
    imageUrl: post.imageUrl,
    readTimeMinutes: post.readTimeMinutes,
  };
}

const ARTICLES: Article[] = MKT_01_POSTS.map(toArticle);

export default function HealthTipsPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--foreground)] antialiased">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[var(--brand-subtle)]">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <BlurReveal>
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--brand)] shadow-sm">
                Health Tips
              </span>
            </BlurReveal>
            <BlurReveal className="mt-5">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Health tips from your local pharmacist.
              </h1>
            </BlurReveal>
            <BlurReveal className="mt-4">
              <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                Practical, evidence-based advice from the iHealth Pharmacy team. New articles every
                month.
              </p>
            </BlurReveal>
          </div>
        </section>

        {/* Article grid */}
        <SectionReveal className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-6">
            {ARTICLES.map((article) => {
              const Icon = article.icon;
              return (
                <article
                  key={article.href}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:border-[var(--brand)]/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-subtle)] text-[var(--brand)]">
                      <Icon size={16} />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold leading-snug text-[var(--foreground)] transition group-hover:text-[var(--brand)]">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {article.snippet}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                  <Link
                    href={article.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)]"
                    aria-label={`Read more: ${article.title}`}
                  >
                    Read more
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-0.5"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </SectionReveal>

        {/* Subscribe CTA */}
        <SectionReveal className="bg-[var(--surface)]">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-8 lg:py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Get new tips in your inbox.
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              We publish a short, useful email once a month. No spam, ever.
            </p>
            <Link
              href="/subscribe"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-hover)]"
            >
              Subscribe to the newsletter
              <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </main>

      <Footer />
    </div>
  );
}