import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SectionReveal } from "../../components/MotionKit";
import {
  ArrowLeft,
  Clock,
  User,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageCircle,
  ShieldCheck,
  Languages,
} from "lucide-react";
import { MKT_01_POSTS, isPostPublished, type BlogPost } from "../../../data/blog-posts";
import ScheduledGuard from "./ScheduledGuard";

export function generateStaticParams() {
  return MKT_01_POSTS.map((post) => ({ slug: post.slug }));
}

function getPost(slug: string): BlogPost | undefined {
  return MKT_01_POSTS.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found — iHealth Pharmacy" };
  return { title: `${post.title} — iHealth Pharmacy`, description: post.excerpt };
}

/* Enhanced markdown renderer: headings, bold, lists, and clinical callout blockquotes */
function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    const key = `line-${i}`;
    if (line.startsWith("### ")) {
      return (
        <h3 key={key} className="mt-8 text-xl font-bold text-slate-900">
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={key} className="mt-10 text-2xl font-bold text-slate-900 sm:text-3xl">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("> ")) {
      const quoteText = line.slice(2);
      const isClinicalPearl = quoteText.toLowerCase().startsWith("clinical pearl:");
      const cleanQuote = isClinicalPearl ? quoteText.replace(/^clinical pearl:\s*/i, "") : quoteText;
      return (
        <div
          key={key}
          className="my-7 rounded-2xl border border-rose-200/80 bg-rose-50/70 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] text-white font-bold text-sm shadow-sm">
              +
            </span>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                Clinical Pharmacist Pearl
              </p>
              <p className="text-[15px] font-medium leading-relaxed text-slate-900">
                {inline(cleanQuote)}
              </p>
            </div>
          </div>
        </div>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={key} className="ml-5 list-disc text-slate-700 leading-relaxed my-1">
          {inline(line.slice(2))}
        </li>
      );
    }
    if (line.trim() === "") return <br key={key} />;
    return (
      <p key={key} className="mt-4 text-[16px] leading-relaxed text-slate-700">
        {inline(line)}
      </p>
    );
  });
}

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[var(--foreground)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = MKT_01_POSTS.filter((p) => p.slug !== slug && isPostPublished(p)).slice(0, 3);
  const isEditorial = post.layoutVariant === "editorial";

  return (
    <>
      <Header />
      <ScheduledGuard post={post}>
        <main className="flex-1 bg-white">
          {isEditorial ? (
            /* Editorial Magazine Feature Layout */
          <article className="mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-6 lg:px-8">
            <Link
              href="/health-tips/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              <ArrowLeft size={16} />
              All health tips
            </Link>

            <SectionReveal className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--brand-subtle)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                  {post.category}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Evidence-Based Clinical Guide
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.18]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-4 text-lg text-slate-600 sm:text-xl font-normal leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Editorial Metadata Card */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-slate-200/80 py-4">
                <div className="flex items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/pharmacists/anika.jpg"
                    alt={post.author}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--brand-subtle)]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        {post.author}
                      </span>
                      <ShieldCheck size={14} className="text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Languages size={13} className="text-slate-400" />
                      <span>Languages: English, Punjabi, Hindi</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTimeMinutes} min read
                  </span>
                </div>
              </div>

              {/* Hero Image Banner */}
              {post.imageUrl && (
                <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full max-h-[440px] object-cover object-center"
                  />
                </div>
              )}

              {/* Key Takeaways Card */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="mt-8 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/80 via-white to-rose-50/40 p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                    <Sparkles size={16} />
                    <span>Key Clinical Takeaways at a Glance</span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {post.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] font-medium text-slate-800 leading-snug">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </SectionReveal>

            {/* Article Body */}
            <div className="mt-10 text-[16px]">
              {renderContent(post.content)}
            </div>

            {/* Author Profile & Direct Consult Box */}
            <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pharmacists/anika.jpg"
                  alt={post.author}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                    Reviewed by Our Pharmacy Team
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">
                    {post.author}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    Have questions about medication interactions, high-dose flu shots, or blister packaging in Abbotsford? Talk to our pharmacy team directly.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <a
                    href="https://wa.me/16047464444?text=Hi%20iHealth%20Pharmacy,%20I%20read%20your%20medication%20safety%20guide%20and%20had%20a%20question"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Pharmacist</span>
                  </a>
                  <a
                    href="tel:6047464444"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                  >
                    <Phone size={14} />
                    <span>(604) 746-4444</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ) : (
          /* Standard Article Layout (Preserved for existing posts) */
          <article className="mx-auto max-w-3xl px-5 pb-16 pt-10 lg:px-8">
            <Link
              href="/health-tips/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand)] hover:underline"
            >
              <ArrowLeft size={16} />
              All health tips
            </Link>

            <SectionReveal>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
                {post.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} /> {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} />{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTimeMinutes} min read
                </span>
              </div>
            </SectionReveal>

            <div className="mt-8 border-t border-[var(--border)] pt-6 text-[15px]">
              {renderContent(post.content)}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--brand-subtle)] px-3 py-1 text-xs font-medium text-[var(--brand)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        )}

        {/* Keep Reading Grid */}
        <section className="border-t border-[var(--border)] bg-[var(--surface)] py-12">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              Keep reading
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}/`}
                  className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
                    {other.category}
                  </p>
                  <p className="mt-2 font-semibold leading-snug text-[var(--foreground)]">
                    {other.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                    {other.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      </ScheduledGuard>
      <Footer />
    </>
  );
}
