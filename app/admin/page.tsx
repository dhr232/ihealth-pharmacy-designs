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
  FileText,
  CheckCircle2,
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
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? "2026";

type Tab = "pharmacists" | "posts";
type PostFilter = "all" | PostStatus;

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAuthed(getAuth() !== null);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <span className="text-sm text-slate-500">Loading staff control panel...</span>
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
/*  Login Screen (shadcn Card, Input, Button, Label)                 */
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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
                <Pill size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  iHealth Pharmacy
                </p>
                <CardTitle className="text-xl">Admin Sign In</CardTitle>
              </div>
            </div>
            <CardDescription>
              Enter the staff PIN to access the pharmacist and blog management dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-pin">Staff PIN</Label>
                <Input
                  id="admin-pin"
                  type="password"
                  autoFocus
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  className="font-mono text-base tracking-widest"
                />
              </div>

              {error && (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={busy || !pin}
                className="w-full bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]"
              >
                {busy ? "Signing in..." : "Sign in to Dashboard"}
              </Button>

              <div className="flex items-center justify-between pt-2 text-xs text-[var(--muted)]">
                <span>Default PIN: <strong className="font-mono font-semibold">2026</strong></span>
                <Link
                  href="/"
                  className="font-medium text-[var(--brand)] hover:underline"
                >
                  Back to public site
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
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
      next.name ? `Saved ${next.name}. Public site updated live.` : "Pharmacist saved.",
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
    <div className="min-h-screen bg-slate-50/60 text-slate-900">
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand-subtle)] text-[var(--brand)]">
              <Pill size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                iHealth Pharmacy
              </p>
              <h1 className="text-base font-bold tracking-tight text-slate-900">
                Staff Control Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank" rel="noopener" className="gap-1.5">
                <ExternalLink size={13} />
                <span>View Live Site</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onLogout();
                pushToast("info", "Signed out.");
              }}
              className="gap-1.5 text-slate-600 hover:text-slate-900"
            >
              <LogOut size={13} />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace with shadcn Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as Tab)}
          className="space-y-6"
        >
          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
            <TabsList className="bg-slate-200/70 p-1 rounded-xl h-auto">
              <TabsTrigger
                value="pharmacists"
                className="gap-2 px-4 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                <Stethoscope size={16} />
                <span>Pharmacist Team</span>
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {pharmacists.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="gap-2 px-4 py-2 text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                <FileText size={16} />
                <span>Blog Posts</span>
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {posts.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Auto-saved to local database with live instant sync</span>
            </div>
          </div>

          {/* Pharmacists Tab */}
          <TabsContent value="pharmacists" className="m-0 focus-visible:outline-none">
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
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="m-0 focus-visible:outline-none">
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
          </TabsContent>

          {/* Appearance Customizer */}
          <div className="pt-4 border-t border-slate-200">
            <ThemeSelector
              theme={theme}
              font={font}
              onThemeChange={handleThemeChange}
              onFontChange={handleFontChange}
            />
          </div>
        </Tabs>
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
/*  Pharmacist Section (shadcn Cards, Badges, Buttons)               */
/* ------------------------------------------------------------------ */

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
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Our Pharmacists Directory
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Add new team members, edit credentials, or change portrait photos. Changes reflect on the homepage immediately.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={onExport} className="gap-1.5">
            <Download size={14} />
            <span>Export JSON</span>
          </Button>
          <Button
            size="sm"
            onClick={onAdd}
            className="gap-1.5 bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]"
          >
            <Plus size={14} />
            <span>Add Pharmacist</span>
          </Button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          title="No pharmacists configured"
          body="Click Add Pharmacist above to create the first team member."
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          <AnimatePresence initial={false}>
            {sorted.map((p, idx) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <Card className="hover:border-slate-300 transition-colors">
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Portrait Avatar */}
                    <Avatar url={p.photoUrl} name={p.name} />

                    {/* Member Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {p.name || "Untitled Pharmacist"}
                        </h3>
                        <Badge variant="outline" className="text-xs border-slate-300">
                          {p.role || "Pharmacist"}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {p.yearsExperience} yr{p.yearsExperience === 1 ? "" : "s"} exp
                        </Badge>
                      </div>

                      {p.credentials.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.credentials.map((c) => (
                            <span
                              key={c}
                              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}

                      {p.languages.length > 0 && (
                        <p className="mt-2 text-xs text-slate-500">
                          Languages: <span className="text-slate-700 font-medium">{p.languages.join(", ")}</span>
                        </p>
                      )}
                    </div>

                    {/* Order Controls */}
                    <div className="flex items-center gap-1 border-slate-100 sm:border-l sm:pl-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMove(p.id, "up")}
                        disabled={idx === 0}
                        aria-label="Move pharmacist up"
                        className="h-8 w-8 text-slate-500 hover:text-slate-900"
                      >
                        <ArrowUp size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMove(p.id, "down")}
                        disabled={idx === sorted.length - 1}
                        aria-label="Move pharmacist down"
                        className="h-8 w-8 text-slate-500 hover:text-slate-900"
                      >
                        <ArrowDown size={15} />
                      </Button>
                    </div>

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex items-center gap-2 border-slate-100 sm:border-l sm:pl-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(p)}
                        className="text-xs font-medium"
                      >
                        Edit
                      </Button>

                      {confirmDeleteId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onConfirmDelete(p.id)}
                            className="text-xs font-medium"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onCancelDelete}
                            className="text-xs text-slate-500"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAskDelete(p.id)}
                          aria-label={`Delete ${p.name}`}
                          className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Posts Section (shadcn Cards, Badges, Buttons)                    */
/* ------------------------------------------------------------------ */

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
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Health Tips & Blog Articles
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage pharmacy articles, seasonal vaccine updates, and patient advice.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={onExport} className="gap-1.5">
            <Download size={14} />
            <span>Export JSON</span>
          </Button>
          <Button
            size="sm"
            onClick={onAdd}
            className="gap-1.5 bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]"
          >
            <Plus size={14} />
            <span>New Post</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-slate-200/70 p-1 w-fit">
        {(
          [
            { value: "all" as PostFilter, label: `All (${totalCount})` },
            { value: "draft" as PostFilter, label: "Drafts" },
            { value: "published" as PostFilter, label: "Published" },
          ]
        ).map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === value
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title={filter === "all" ? "No posts found" : `No ${filter} posts found`}
          body={
            filter === "all"
              ? "Click New Post to write the first article."
              : "Try switching filters or write a new post."
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          <AnimatePresence initial={false}>
            {items.map((post) => (
              <motion.li
                key={post.id}
                layout
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <Card className="hover:border-slate-300 transition-colors">
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Cover url={post.imageUrl} title={post.title} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={post.status === "published" ? "success" : "secondary"}
                          className="text-[10px] uppercase tracking-wider font-bold"
                        >
                          {post.status}
                        </Badge>
                        <span className="text-xs text-slate-500 font-medium">
                          {post.publishedAt}
                        </span>
                        {post.category && (
                          <Badge variant="outline" className="text-[11px] text-slate-600">
                            {post.category}
                          </Badge>
                        )}
                      </div>
                      <h3 className="mt-1.5 truncate text-base font-bold text-slate-900">
                        {post.title || "Untitled Post"}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags.length > 0 && (
                        <p className="mt-1 text-[11px] text-slate-400 font-medium">
                          {post.tags.map((t) => `#${t}`).join(" ")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 border-slate-100 sm:border-l sm:pl-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(post)}
                        className="text-xs font-medium"
                      >
                        Edit
                      </Button>

                      {confirmDeleteId === post.id ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onConfirmDelete(post.id)}
                            className="text-xs font-medium"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onCancelDelete}
                            className="text-xs text-slate-500"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAskDelete(post.id)}
                          aria-label={`Delete ${post.title}`}
                          className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers & Subcomponents                                            */
/* ------------------------------------------------------------------ */

function Avatar({ url, name }: { url: string; name: string }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        className="h-14 w-14 shrink-0 rounded-full border-2 border-slate-100 object-cover shadow-xs"
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
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-base font-bold text-[var(--brand)]">
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
        className="h-16 w-24 shrink-0 rounded-lg border border-slate-200 object-cover shadow-xs"
      />
    );
  }
  return (
    <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-100 text-[10px] font-medium uppercase tracking-wider text-slate-400">
      {title ? "No image" : "—"}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="border-dashed border-2 bg-white/70">
      <CardContent className="p-12 text-center">
        <p className="text-base font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{body}</p>
      </CardContent>
    </Card>
  );
}