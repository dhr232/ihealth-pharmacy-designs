import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SectionReveal } from "../../components/MotionKit";
import { ArrowLeft, Clock, User, CalendarDays } from "lucide-react";
import { MKT_01_POSTS, type BlogPost } from "../../../data/blog-posts";

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

/* Very small markdown-ish renderer: ## / ### headings, **bold**, paragraphs. */
function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    const key = `line-${i}`;
    if (line.startsWith("### ")) {
      return (
        <h3 key={key} className="mt-8 text-xl font-semibold text-[var(--foreground)]">
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={key} className="mt-10 text-2xl font-bold text-[var(--foreground)]">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={key} className="ml-5 list-disc text-[var(--muted)]">
          {inline(line.slice(2))}
        </li>
      );
    }
    if (line.trim() === "") return <br key={key} />;
    return (
      <p key={key} className="mt-4 leading-relaxed text-[var(--muted)]">
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

  const others = MKT_01_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
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
      <Footer />
    </>
  );
}
