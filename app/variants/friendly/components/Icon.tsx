"use client";

import { ReactNode } from "react";

export type IconName =
  | "hand-wave"
  | "heart"
  | "star"
  | "syringe"
  | "truck"
  | "flask"
  | "calendar"
  | "stethoscope"
  | "chat"
  | "phone"
  | "mail"
  | "clock"
  | "map-pin"
  | "shield"
  | "refresh-cw"
  | "arrow-right"
  | "check"
  | "menu"
  | "x"
  | "pill"
  | "sparkle"
  | "zap"
  | "lock"
  | "medical"
  | "parking"
  | "send"
  | "award"
  | "users"
  | "package";

type Props = {
  name: IconName;
  className?: string;
  size?: number;
  ariaHidden?: boolean;
  ariaLabel?: string;
};

const icons: Record<IconName, ReactNode> = {
  "hand-wave": (
    <>
      <path d="M12 3.5c-1.5 1.2-2.5 3-2.5 5" />
      <path d="M4 10c1.2-1.5 3-2.5 5-2.5" />
      <path d="M4 18c2.5-3 5.5-5.5 10.5-5.5" />
      <path d="M17.5 13.5c-1.5 2.5-4 4.5-7 5.5" />
      <path d="M19.5 6.5c-1.5 2-3.5 3.5-6 4.5" />
      <path d="M20 14v6" />
      <path d="M14 20h6" />
    </>
  ),
  heart: (
    <path d="M19.5 13.5 12 21l-7.5-7.5a5.25 5.25 0 1 1 7.5-7.5 5.25 5.25 0 1 1 7.5 7.5Z" />
  ),
  star: <path d="m12 2 2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6Z" />,
  syringe: (
    <>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3-4-4-3 3" />
      <path d="m19 5-7.5 7.5" />
      <path d="m2.3 21.7 4.4-4.4" />
      <path d="m7 17 5.5-5.5" />
      <path d="M15 11l-2.5-2.5" />
      <path d="M11 15 8.5 12.5" />
    </>
  ),
  truck: (
    <>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h9" />
      <path d="m19 18 2-7h-8" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  flask: (
    <>
      <path d="M10 2h4" />
      <path d="M12 2v10" />
      <path d="m9 21 3-9 3 9" />
      <path d="M7 21h10" />
    </>
  ),
  calendar: (
    <>
      <rect width="20" height="18" x="2" y="4" rx="2" />
      <path d="M2 10h20" />
      <path d="M7 2v4" />
      <path d="M17 2v4" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M4.5 10a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      <path d="M19.5 10a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      <path d="M19.5 5v6.5a6.5 6.5 0 0 1-13 0V5" />
      <path d="M13 17.5a2.5 2.5 0 0 1-5 0" />
    </>
  ),
  chat: (
    <>
      <path d="M17 18a5 5 0 0 0 0-10H7a5 5 0 0 0 0 10Z" />
      <path d="M12 13v3" />
      <path d="M8 13v3" />
      <path d="M16 13v3" />
    </>
  ),
  phone: (
    <path d="M13.5 2C7.7 2 3 6.7 3 12.5S7.7 23 13.5 23 24 18.3 24 12.5 19.3 2 13.5 2Zm0 0V11m0 0 5-5" />
  ),
  mail: (
    <>
      <rect width="22" height="16" x="1" y="4" rx="2" />
      <path d="m1 6 9.7 7.2a2 2 0 0 0 2.6 0L23 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "refresh-cw": (
    <>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  pill: (
    <>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="m4.9 4.9 2.9 2.9" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="m16.2 7.8 2.9-2.9" />
    </>
  ),
  zap: (
    <>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </>
  ),
  lock: (
    <>
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  medical: (
    <>
      <path d="M12 6v12" />
      <path d="M6 12h12" />
      <circle cx="12" cy="12" r="10" />
    </>
  ),
  parking: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 8h3a3 3 0 0 1 0 6H9" />
      <path d="M9 8v9" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  package: (
    <>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
};

export default function Icon({ name, className = "", size = 24, ariaHidden = true, ariaLabel }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : ariaLabel}
      role={ariaHidden ? undefined : "img"}
    >
      {icons[name]}
    </svg>
  );
}
