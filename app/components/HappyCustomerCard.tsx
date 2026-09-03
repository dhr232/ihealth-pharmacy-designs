import { Star } from "lucide-react";

const AVATARS = [
  { src: "/avatar1.webp", alt: "Customer portrait 1" },
  { src: "/avatar2.webp", alt: "Customer portrait 2" },
  { src: "/avatar3.webp", alt: "Customer portrait 3" },
  { src: "/avatar4.webp", alt: "Customer portrait 4" },
];

export default function HappyCustomerCard() {
  return (
    <div className="relative w-full max-w-[280px] rounded-2xl border border-[var(--border)] bg-white p-5 shadow-xl">
      {/* Quote badge */}
      <div className="absolute -top-5 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.84-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.84-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </div>

      <p className="text-sm font-semibold text-[var(--brand)]">Happy Customer</p>

      <div className="mt-1.5 flex items-center gap-2">
        <div className="flex gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < 4 ? "currentColor" : "none"}
              strokeWidth={i < 4 ? 0 : 2}
              className={i < 4 ? "text-amber-400" : "text-amber-300"}
            />
          ))}
        </div>
        <span className="text-lg font-bold text-[var(--foreground)]">4.8</span>
      </div>

      <div className="mt-4 flex -space-x-2.5">
        {AVATARS.map((a, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={a.src}
            alt={a.alt}
            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
            loading="lazy"
          />
        ))}
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#8b5cf6] text-xs font-bold text-white shadow-sm">
          +1
        </span>
      </div>
    </div>
  );
}
