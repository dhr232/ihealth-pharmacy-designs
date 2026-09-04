"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  Download,
  ExternalLink,
  LogOut,
  Pill,
  Plus,
  Stethoscope,
  Trash2,
} from "lucide-react";
import {
  clearAuth,
  deletePharmacist,
  deletePost,
  exportJSON,
  getAuth,
  getFont,
  getPharmacists,
  getPosts,
  getTheme,
  reorderPharmacist,
  seedPostsFromRemote,
  setAuth,
  setFont,
  setTheme,
  upsertPharmacist,
  upsertPost,
} from "./lib/storage";
import type {
  BlogPost,
  FontPairingName,
  Pharmacist,
  PostStatus,
  ThemeName,
} from "./lib/types";
import { ToastViewport, type ToastKind, type ToastItem } from "./components/Toast";
import { ThemeSelector } from "./components/ThemeSelector";
import { PharmacistEditor } from "./components/PharmacistEditor";
import { PostEditor } from "./components/PostEditor";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? "2026";

type Tab = "pharmacists" | "posts";
type PostFilter = "all" | PostStatus;

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    return getAuth() !== null;
  });
  const hydrated = typeof window !== "undefined";

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface)]">
        <span className="text-sm text-[var(--muted)]">Loading admin...</span>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  return (
    <Dashboard
      onLogout={() => {
        clearAuth();
        setAuthed(false);
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Login                                                              */
/* ------------------------------------------------------------------ */

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    if (pin.trim() !== ADMIN_PIN) {
      setError("Incorrect PIN. Please try again.");
      setBusy(false);
      return;
    }
    setAuth();
    setBusy(false);
    onSuccess();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-8 shadow-lg"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
            <Pill size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              iHealth Pharmacy
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
              Admin sign in
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-[var(--foreground)]">PIN</span>
            <input
              type="password"
              autoFocus
              inputMode="numeric"
              autoComplete="one-time-code"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter your admin PIN"
              className="rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-base text-[var(--foreground)] shadow-sm placeholder:text-[var(--muted)]/70 focus:border-[var(--brand)] focus:outline-none"
            />
          </label>

          {error && (
            <p className="text-sm text-[var(--brand)]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !pin}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-xs text-[var(--muted)]">
            Default PIN is <span className="font-mono font-semibold">2026</span>.
            Override with the <span className="font-mono">NEXT_PUBLIC_ADMIN_PIN</span> env
            var at build time.
          </p>

          <Link
            href="/"
            className="text-center text-xs font-medium text-[var(--muted)] hover:text-[var(--brand)]"
          >
            Back to site
          </Link>
        </form>
      </motion.div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("pharmacists");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [theme, setThemeState] = useState<ThemeName>(() =>
    typeof window === "undefined" ? "pharmacy-red" : getTheme()
  );
  const [font, setFontState] = useState<FontPairingName>(() =>
    typeof window === "undefined" ? "inter-tight" : getFont()
  );

    // Pharmacist state — hydrate from localStorage on first client render
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>(() =>
    typeof window === "undefined" ? [] : getPharmacists()
  );
  const [editingPharmacist, setEditingPharmacist] = useState<Pharmacist | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Post state — hydrate from localStorage on first client render
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    typeof window === "undefined" ? [] : getPosts()
  );
  const [postFilter, setPostFilter] = useState<PostFilter>("all");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postEditorOpen, setPostEditorOpen] = useState(false);
  const [confirmDeletePostId, setConfirmDeletePostId] = useState<string | null>(null);

  const pushToast = useCallback((kind: ToastKind, message: string) => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((current) => [...current, { id, kind, message }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  // (state already hydrated via lazy initializers above)

  // On first mount, asynchronously reconcile the post list with the canonical
  // JSON at /blog/seed-posts.json. The sync lazy initializer above already
  // seeded from the bundled SEED_POSTS, so this is a no-op when localStorage
  // is already populated. If the static JSON was updated separately, this
  // lets the admin panel pick up the latest canonical content on first load.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    let cancelled = false;
    seedPostsFromRemote()
      .then((list) => {
        if (cancelled) return;
        if (list.length > 0) {
          setPosts(list);
        }
      })
      .catch(() => {
        // Best-effort: sync seed already populated state.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ----- Pharmacist handlers ----- */

  const nextPharmacistOrder = useMemo(() => {
    if (pharmacists.length === 0) return 1;
    return Math.max(...pharmacists.map((p) => p.displayOrder)) + 1;
  }, [pharmacists]);

  function openNewPharmacist() {
    setEditingPharmacist(null);
    setEditorOpen(true);
  }

  function openEditPharmacist(item: Pharmacist) {
    setEditingPharmacist(item);
    setEditorOpen(true);
  }

  function handleSavePharmacist(next: Pharmacist) {
    const updated = upsertPharmacist(next);
    setPharmacists(updated);
    setEditorOpen(false);
    setEditingPharmacist(null);
    pushToast(
      "success",
      next.name ? `Saved ${next.name}.` : "Pharmacist saved.",
    );
  }

  function handleDeletePharmacist(id: string) {
    const target = pharmacists.find((p) => p.id === id);
    const updated = deletePharmacist(id);
    setPharmacists(updated);
    setConfirmDeleteId(null);
    pushToast(
      "success",
      target ? `Removed ${target.name}.` : "Pharmacist removed.",
    );
  }

  function handleMovePharmacist(id: string, direction: "up" | "down") {
    setPharmacists(reorderPharmacist(id, direction));
  }

  function handleExportPharmacists() {
    exportJSON("pharmacists.json", pharmacists);
    pushToast("success", "Pharmacists exported.");
  }

  /* ----- Post handlers ----- */

  const filteredPosts = useMemo(() => {
    const sorted = [...posts].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    );
    if (postFilter === "all") return sorted;
    return sorted.filter((p) => p.status === postFilter);
  }, [posts, postFilter]);

  function openNewPost() {
    setEditingPost(null);
    setPostEditorOpen(true);
  }

  function openEditPost(item: BlogPost) {
    setEditingPost(item);
    setPostEditorOpen(true);
  }

  function handleSavePost(next: BlogPost) {
    const updated = upsertPost(next);
    setPosts(updated);
    setPostEditorOpen(false);
    setEditingPost(null);
    pushToast(
      "success",
      next.title ? `Saved "${next.title}".` : "Post saved.",
    );
  }

  function handleDeletePost(id: string) {
    const target = posts.find((p) => p.id === id);
    const updated = deletePost(id);
    setPosts(updated);
    setConfirmDeletePostId(null);
    pushToast(
      "success",
      target ? `Removed "${target.title}".` : "Post removed.",
    );
  }

  function handleExportPosts() {
    exportJSON("posts.json", filteredPosts);
    pushToast("success", "Posts exported.");
  }

  /* ----- Theme/font handlers ----- */

  function handleThemeChange(next: ThemeName) {
    setTheme(next);
    setThemeState(next);
    pushToast("info", `Theme set to ${next}.`);
  }

  function handleFontChange(next: FontPairingName) {
    setFont(next);
    setFontState(next);
    pushToast("info", `Font set to ${next}.`);
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
              <Pill size={18} />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                iHealth Pharmacy
              </p>
              <h1 className="text-base font-semibold tracking-tight">Admin</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
            >
              <ExternalLink size={12} /> View live site
            </Link>
            <button
              type="button"
              onClick={() => {
                onLogout();
                pushToast("info", "Signed out.");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
            >
              <LogOut size={12} /> Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-[220px,1fr]">
        {/* Sidebar nav */}
        <aside>
          <nav
            aria-label="Admin sections"
            className="flex flex-row gap-2 overflow-x-auto rounded-2xl border border-[var(--border)] bg-white p-2 shadow-sm md:flex-col md:overflow-visible"
          >
            <NavTab
              active={tab === "pharmacists"}
              onClick={() => setTab("pharmacists")}
              icon={<Stethoscope size={16} />}
              label="Pharmacist Team"
              count={pharmacists.length}
            />
            <NavTab
              active={tab === "posts"}
              onClick={() => setTab("posts")}
              icon={<Pill size={16} />}
              label="Blog Posts"
              count={posts.length}
            />
          </nav>
        </aside>

        {/* Main */}
        <main className="flex flex-col gap-6">
          {tab === "pharmacists" ? (
            <PharmacistSection
              items={pharmacists}
              confirmDeleteId={confirmDeleteId}
              onAskDelete={setConfirmDeleteId}
              onCancelDelete={() => setConfirmDeleteId(null)}
              onConfirmDelete={handleDeletePharmacist}
              onAdd={openNewPharmacist}
              onEdit={openEditPharmacist}
              onMove={handleMovePharmacist}
              onExport={handleExportPharmacists}
            />
          ) : (
            <PostsSection
              items={filteredPosts}
              totalCount={posts.length}
              filter={postFilter}
              onFilterChange={setPostFilter}
              confirmDeleteId={confirmDeletePostId}
              onAskDelete={setConfirmDeletePostId}
              onCancelDelete={() => setConfirmDeletePostId(null)}
              onConfirmDelete={handleDeletePost}
              onAdd={openNewPost}
              onEdit={openEditPost}
              onExport={handleExportPosts}
            />
          )}

          <ThemeSelector
            theme={theme}
            font={font}
            onThemeChange={handleThemeChange}
            onFontChange={handleFontChange}
          />
        </main>
      </div>

      <PharmacistEditor
        open={editorOpen}
        initial={editingPharmacist}
        nextOrder={nextPharmacistOrder}
        onClose={() => {
          setEditorOpen(false);
          setEditingPharmacist(null);
        }}
        onSave={handleSavePharmacist}
        onError={(msg) => pushToast("error", msg)}
      />

      <PostEditor
        open={postEditorOpen}
        initial={editingPost}
        onClose={() => {
          setPostEditorOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        onError={(msg) => pushToast("error", msg)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Subcomponents                                                       */
/* ------------------------------------------------------------------ */

function NavTab({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--brand-subtle)] text-[var(--brand)]"
          : "text-[var(--muted)] hover:bg-[var(--surface)]"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          active
            ? "bg-[var(--brand)] text-white"
            : "bg-[var(--surface)] text-[var(--muted)]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function SectionHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">{actions}</div>
    </div>
  );
}

function PharmacistSection({
  items,
  confirmDeleteId,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
  onAdd,
  onEdit,
  onMove,
  onExport,
}: {
  items: Pharmacist[];
  confirmDeleteId: string | null;
  onAskDelete: (id: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => void;
  onAdd: () => void;
  onEdit: (item: Pharmacist) => void;
  onMove: (id: string, dir: "up" | "down") => void;
  onExport: () => void;
}) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.displayOrder - b.displayOrder),
    [items],
  );

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Pharmacist Team"
        description="Add, edit, and reorder the pharmacists displayed on the public site."
        actions={
          <>
            <button
              type="button"
              onClick={onExport}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-hover)]"
            >
              <Plus size={14} /> Add pharmacist
            </button>
          </>
        }
      />

      {sorted.length === 0 ? (
        <EmptyState
          title="No pharmacists yet"
          body="Click Add pharmacist to create the first team member."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {sorted.map((p, idx) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm"
              >
                <Avatar url={p.photoUrl} name={p.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                    {p.name || "Untitled"}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)]">
                    {p.role || "No role"} &middot; {p.yearsExperience} yr
                    {p.yearsExperience === 1 ? "" : "s"}
                  </p>
                  {p.credentials.length > 0 && (
                    <p className="mt-1 truncate text-xs text-[var(--muted)]">
                      {p.credentials.join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onMove(p.id, "up")}
                    disabled={idx === 0}
                    aria-label="Move up"
                    className="rounded-md p-1.5 text-[var(--muted)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(p.id, "down")}
                    disabled={idx === sorted.length - 1}
                    aria-label="Move down"
                    className="rounded-md p-1.5 text-[var(--muted)] hover:bg-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(p)}
                    className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
                  >
                    Edit
                  </button>
                  {confirmDeleteId === p.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onConfirmDelete(p.id)}
                        className="rounded-lg bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--brand-hover)]"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={onCancelDelete}
                        className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--surface)]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAskDelete(p.id)}
                      aria-label={`Delete ${p.name}`}
                      className="rounded-md p-1.5 text-[var(--muted)] hover:bg-red-50 hover:text-[var(--brand)]"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}

function PostsSection({
  items,
  totalCount,
  filter,
  onFilterChange,
  confirmDeleteId,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
  onAdd,
  onEdit,
  onExport,
}: {
  items: BlogPost[];
  totalCount: number;
  filter: PostFilter;
  onFilterChange: (next: PostFilter) => void;
  confirmDeleteId: string | null;
  onAskDelete: (id: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: (id: string) => void;
  onAdd: () => void;
  onEdit: (item: BlogPost) => void;
  onExport: () => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Blog Posts"
        description="Draft and publish health tips, news, and stories."
        actions={
          <>
            <button
              type="button"
              onClick={onExport}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--brand)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-hover)]"
            >
              <Plus size={14} /> New post
            </button>
          </>
        }
      />

      <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-white p-1 text-xs font-medium shadow-sm w-fit">
        {(
          [
            { value: "all" as PostFilter, label: `All (${totalCount})` },
            { value: "draft" as PostFilter, label: "Draft" },
            { value: "published" as PostFilter, label: "Published" },
          ]
        ).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onFilterChange(value)}
              className={`rounded-lg px-3 py-1.5 ${
                filter === value
                  ? "bg-[var(--brand)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--surface)]"
              }`}
            >
              {label}
            </button>
          ))}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title={filter === "all" ? "No posts yet" : `No ${filter} posts`}
          body={
            filter === "all"
              ? "Click New post to write the first article."
              : "Try a different filter, or create a new post."
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {items.map((post) => (
              <motion.li
                key={post.id}
                layout
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm"
              >
                <Cover url={post.imageUrl} title={post.title} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {post.publishedAt}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-semibold text-[var(--foreground)]">
                    {post.title || "Untitled"}
                  </p>
                  {post.excerpt && (
                    <p className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <p className="mt-1 text-[11px] text-[var(--muted)]">
                      {post.tags.map((t) => `#${t}`).join(" ")}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(post)}
                    className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
                  >
                    Edit
                  </button>
                  {confirmDeleteId === post.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onConfirmDelete(post.id)}
                        className="rounded-lg bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--brand-hover)]"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={onCancelDelete}
                        className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-[var(--surface)]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAskDelete(post.id)}
                      aria-label={`Delete ${post.title}`}
                      className="rounded-md p-1.5 text-[var(--muted)] hover:bg-red-50 hover:text-[var(--brand)]"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}

function Avatar({ url, name }: { url: string; name: string }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        className="h-12 w-12 shrink-0 rounded-full border border-[var(--border)] object-cover"
      />
    );
  }
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-sm font-semibold text-[var(--brand)]">
      {initials || "?"}
    </div>
  );
}

function Cover({ url, title }: { url: string; title: string }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        className="h-14 w-20 shrink-0 rounded-lg border border-[var(--border)] object-cover"
      />
    );
  }
  return (
    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
      {title ? "No image" : "—"}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white p-10 text-center">
      <p className="text-base font-medium text-[var(--foreground)]">{title}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{body}</p>
    </div>
  );
}