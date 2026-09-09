import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment — iHealth Pharmacy Abbotsford",
  description:
    "Schedule your clinical assessment for 21 BC minor ailments, seasonal vaccines & flu shots, or 1-on-1 medication reviews at iHealth Pharmacy in Abbotsford.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
