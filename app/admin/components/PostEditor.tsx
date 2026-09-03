"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye, Pencil, Upload, X } from "lucide-react";
import type { BlogPost, PostStatus, ThemeName } from "../lib/types";
import { THEMES } from "../lib/types";
import { slugify, uuid } from "../lib/storage";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MAX_IMAGE_BYTES = 500 * 1024;

function emptyPost(): BlogPost {
  return {
    id: uuid(),
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    tags: [],
    imageUrl: "",
    status: "draft",
    themeUsed: "pharmacy-red",
  };
}

function toTextList(arr: string[]): string {
  return arr.join(", ");
}

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Lightweight markdown -> HTML for headings, paragraphs, bold, italic, lists,
 * and links. Strips anything else. The admin panel doesn't need a full
 * markdown engine for a preview pane.
 */
function renderMarkdown(input: string): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let inList = false;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    if (text) out.push(`<p>${inline(text)}</p>`);
    para = [];
  };
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  const inline = (raw: string) =>
    escape(raw)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-[var(--brand)] underline">$1</a>',
      );

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "") {
      flushPara();
      closeList();
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    para.push(line);
  }
  flushPara();
  closeList();
  return out.join("\n");
}

export function PostEditor({
  open,
  initial,
  onClose,
  onSave,
  onError,
}: {
  open: boolean;
  initial: BlogPost | null;
  onClose: () => void;
  onSave: (next: BlogPost) => void;
  onError: (message: string) => void;
}) {
  const [draft, setDraft] = useState<BlogPost>(initial ?? emptyPost());
  const [tagsText, setTagsText] = useState(toTextList(initial?.tags ?? []));
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [autoSlug, setAutoSlug] = useState<boolean>(true);

  useEffect(() => {
    if (open) {
      const seed = initial ?? emptyPost();
      setDraft(seed);
      setTagsText(toTextList(seed.tags));
      setMode("edit");
      setAutoSlug(!initial);
    }
  }, [open, initial]);

  function update<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (key === "title" && autoSlug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      onError(
        `Image is ${(file.size / 1024).toFixed(0)}KB. Compression recommended before upload.`,
      );
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") update("imageUrl", result);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!draft.title.trim()) {
      onError("Post title is required.");
      return;
    }
    const cleaned: BlogPost = {
      ...draft,
      tags: parseList(tagsText),
      slug: draft.slug.trim() || slugify(draft.title),
    };
    onSave(cleaned);
  }

  const previewHtml = useMemo(
    () => renderMarkdown(draft.content || ""),
    [draft.content],
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={initial ? "Edit post" : "New post"}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  {initial ? "Edit" : "New"} Blog Post
                </p>
                <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                  {initial?.title || "Untitled draft"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border border-[var(--border)] bg-white p-0.5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setMode("edit")}
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 ${
                      mode === "edit"
                        ? "bg-[var(--brand)] text-white"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("preview")}
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 ${
                      mode === "preview"
                        ? "bg-[var(--brand)] text-white"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    <Eye size={12} /> Preview
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-2 text-[var(--muted)] hover:bg-[var(--surface)]"
                  aria-label="Close editor"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {mode === "edit" ? (
                <div className="flex flex-col gap-4">
                  <Field label="Title" required>
                    <input
                      type="text"
                      value={draft.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="Five questions to ask your pharmacist"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Slug"
                    hint={
                      autoSlug
                        ? "Auto-derived from title. Edit to override."
                        : "Manually set. Click to re-enable auto."
                    }
                  >
                    <input
                      type="text"
                      value={draft.slug}
                      onChange={(e) => {
                        setAutoSlug(false);
                        update("slug", e.target.value);
                      }}
                      placeholder="five-questions-to-ask"
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Excerpt">
                    <textarea
                      value={draft.excerpt}
                      onChange={(e) => update("excerpt", e.target.value)}
                      rows={2}
                      placeholder="One-line summary for cards and meta description."
                      className={`${inputClass} resize-y`}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Author">
                      <input
                        type="text"
                        value={draft.author}
                        onChange={(e) => update("author", e.target.value)}
                        placeholder="iHealth Pharmacy Team"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Published on">
                      <input
                        type="date"
                        value={draft.publishedAt}
                        onChange={(e) => update("publishedAt", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Status">
                      <select
                        value={draft.status}
                        onChange={(e) =>
                          update("status", e.target.value as PostStatus)
                        }
                        className={inputClass}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </Field>

                    <Field label="Theme">
                      <select
                        value={draft.themeUsed}
                        onChange={(e) =>
                          update("themeUsed", e.target.value as ThemeName)
                        }
                        className={inputClass}
                      >
                        {THEMES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Tags" hint="Comma-separated, e.g. wellness, vaccines, seniors">
                    <input
                      type="text"
                      value={tagsText}
                      onChange={(e) => setTagsText(e.target.value)}
                      placeholder="wellness, vaccines"
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    label="Cover image"
                    hint="Upload an image (max 500KB) or paste a URL/path."
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]">
                          <Upload size={14} />
                          Upload image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={draft.imageUrl}
                          onChange={(e) => update("imageUrl", e.target.value)}
                          placeholder="/blog/cover.jpg or data:image/..."
                          className={`${inputClass} flex-1`}
                        />
                      </div>
                      {draft.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={draft.imageUrl}
                          alt="Cover preview"
                          className="h-40 w-full rounded-lg border border-[var(--border)] object-cover"
                        />
                      )}
                    </div>
                  </Field>

                  <Field
                    label="Content"
                    hint="Markdown supported: # heading, **bold**, *italic*, - list, [text](url)."
                  >
                    <textarea
                      value={draft.content}
                      onChange={(e) => update("content", e.target.value)}
                      rows={12}
                      placeholder="Write your post here..."
                      className={`${inputClass} resize-y font-mono`}
                    />
                  </Field>
                </div>
              ) : (
                <article className="prose-preview">
                  <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
                    Preview &middot; {draft.status === "published" ? "Published" : "Draft"}
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)]">
                    {draft.title || "Untitled post"}
                  </h1>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {draft.author || "Anonymous"} &middot; {draft.publishedAt}
                  </p>
                  {draft.excerpt && (
                    <p className="mt-3 text-base italic text-[var(--muted)]">
                      {draft.excerpt}
                    </p>
                  )}
                  {draft.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={draft.imageUrl}
                      alt=""
                      className="mt-4 h-56 w-full rounded-xl object-cover"
                    />
                  )}
                  <div
                    className="prose-content mt-5 text-[var(--foreground)]"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </article>
              )}
            </div>

            <footer className="flex items-center justify-end gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-hover)]"
              >
                {initial ? "Save changes" : "Create post"}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] shadow-sm placeholder:text-[var(--muted)]/70 focus:border-[var(--brand)] focus:outline-none";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--brand)]">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-[var(--muted)]">{hint}</span>}
    </label>
  );
}