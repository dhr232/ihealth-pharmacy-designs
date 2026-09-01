import { Star } from "lucide-react";

const AVATARS = [
  { initials: "JP", color: "#C01D16" },
  { initials: "DO", color: "#3b82f6" },
  { initials: "ML", color: "#eab308" },
  { initials: "SP", color: "#22c55e" },
  { initials: "RK", color: "#8b5cf6" },
];

export default function HappyCustomerCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-white p-5 shadow-lg">
      <p className="text-sm font-semibold text-[var(--brand)]">Happy Customer</p>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
        <span className="text-lg font-bold text-[var(--foreground)]">4.9</span>
        <span className="text-xs text-[var(--muted)]">out of 5</span>
      </div>

      <p className="mt-2 text-sm text-[var(--muted)]">Trusted by 300+ Abbotsford families</p>

      <div className="mt-4 flex -space-x-3">
        {AVATARS.map((a) => (
          <span
            key={a.initials}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: a.color }}
            aria-label={`Customer ${a.initials}`}
          >
            {a.initials}
          </span>
        ))}
      </div>
    </div>
  );
}
