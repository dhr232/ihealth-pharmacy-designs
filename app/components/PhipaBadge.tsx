import React from "react";

interface PhipaBadgeProps {
  className?: string;
  variant?: "badge" | "pill" | "card" | "inline";
  showText?: boolean;
}

export default function PhipaBadge({
  className = "",
  variant = "badge",
  showText = true,
}: PhipaBadgeProps) {
  if (variant === "card") {
    return (
      <div
        className={`flex items-center gap-3 rounded-2xl border border-sky-200/90 bg-sky-50/70 p-3.5 shadow-2xs ${className}`}
        title="Your personal health information is handled in accordance with PIPEDA and BC's Personal Information Protection Act (PIPA)."
      >
        <div className="flex h-10 w-9 shrink-0 items-center justify-center">
          <svg
            width="26"
            height="30"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xs"
          >
            <path
              d="M12 1L3 4.5V12C3 18.5 7 24.5 12 27C17 24.5 21 18.5 21 12V4.5L12 1Z"
              fill="#38BDF8"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 6.5L12.7 8.8L14.8 8.1L14.2 10.3L16.5 11.1L15 12.5L16.2 14.8L13.8 14.4L12.9 17L12.5 20.5H11.5L11.1 17L10.2 14.4L7.8 14.8L9 12.5L7.5 11.1L9.8 10.3L9.2 8.1L11.3 8.8L12 6.5Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
        <div>
          <div className="flex items-baseline gap-1.5 leading-tight">
            <span className="font-extrabold tracking-tight text-slate-900 text-sm">PIPEDA</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">& BC PIPA ALIGNED</span>
          </div>
          <p className="mt-0.5 text-[11px] text-slate-600 leading-snug">
            Handled under Canadian federal and BC privacy law.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 ${className}`}
        title="PIPEDA & BC PIPA Aligned Canadian Healthcare Data"
      >
        <svg
          width="18"
          height="21"
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M12 1L3 4.5V12C3 18.5 7 24.5 12 27C17 24.5 21 18.5 21 12V4.5L12 1Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5L12.7 8.8L14.8 8.1L14.2 10.3L16.5 11.1L15 12.5L16.2 14.8L13.8 14.4L12.9 17L12.5 20.5H11.5L11.1 17L10.2 14.4L7.8 14.8L9 12.5L7.5 11.1L9.8 10.3L9.2 8.1L11.3 8.8L12 6.5Z"
            fill="#FFFFFF"
          />
        </svg>
        {showText && (
          <span className="flex items-center gap-1 text-xs">
            <strong className="font-extrabold text-slate-900">PIPEDA</strong>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">& BC PIPA ALIGNED</span>
          </span>
        )}
      </span>
    );
  }

  // Default "badge" / "pill"
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-sky-200/80 bg-white px-2.5 py-1 shadow-2xs transition hover:border-sky-300 ${className}`}
      title="PIPEDA & BC PIPA Aligned: Personal health information is handled in accordance with Canadian federal and BC privacy law."
    >
      <svg
        width="20"
        height="24"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M12 1L3 4.5V12C3 18.5 7 24.5 12 27C17 24.5 21 18.5 21 12V4.5L12 1Z"
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.5L12.7 8.8L14.8 8.1L14.2 10.3L16.5 11.1L15 12.5L16.2 14.8L13.8 14.4L12.9 17L12.5 20.5H11.5L11.1 17L10.2 14.4L7.8 14.8L9 12.5L7.5 11.1L9.8 10.3L9.2 8.1L11.3 8.8L12 6.5Z"
          fill="#FFFFFF"
        />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none text-left">
          <span className="text-[11px] font-black tracking-tight text-slate-900">PIPEDA</span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">& BC PIPA</span>
        </div>
      )}
    </div>
  );
}
