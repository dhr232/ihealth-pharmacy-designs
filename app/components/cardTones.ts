// Tinted card palette from the new homepage design: soft gradient card, two
// decorative circles, white icon chip and a matching accent for the link text.
// `btn` is a solid button colour with white text that meets 4.5:1 contrast.
export type CardTone = "blue" | "purple" | "green" | "peach" | "rose" | "teal";

export const CARD_TONES: Record<
  CardTone,
  { card: string; blob: string; icon: string; link: string; pill: string; btn: string; badge: string }
> = {
  blue: {
    card: "border-[#D5E4FF] bg-gradient-to-br from-[#F7FAFF] via-[#EEF4FF] to-[#E4EEFF]",
    blob: "bg-[#C5D8FF]",
    icon: "bg-white/70 text-[#3B6FE0]",
    link: "text-[#3B6FE0]",
    pill: "border-[#C9D6FF]",
    btn: "bg-[#3B6FE0] hover:bg-[#2F5BC4]",
    badge: "text-[#2F5BC4]",
  },
  purple: {
    card: "border-[#E3D6FB] bg-gradient-to-br from-[#FBF9FF] via-[#F4EEFF] to-[#EDE4FF]",
    blob: "bg-[#D9C8F6]",
    icon: "bg-white/70 text-[#7B5CBF]",
    link: "text-[#7B5CBF]",
    pill: "border-[#DCCBF7]",
    btn: "bg-[#7B5CBF] hover:bg-[#6648A8]",
    badge: "text-[#6648A8]",
  },
  green: {
    card: "border-[#C9EBD8] bg-gradient-to-br from-[#F6FCF8] via-[#EDF8F2] to-[#E3F5EB]",
    blob: "bg-[#BFE8D0]",
    icon: "bg-white/70 text-[#2F9A62]",
    link: "text-[#2F9A62]",
    pill: "border-[#B7E4C9]",
    btn: "bg-[#237A4D] hover:bg-[#1C633F]",
    badge: "text-[#237A4D]",
  },
  peach: {
    card: "border-[#F6DCCE] bg-gradient-to-br from-[#FFF9F6] via-[#FFF3EC] to-[#FDE8DC]",
    blob: "bg-[#F6D0BC]",
    icon: "bg-white/70 text-[#E07A3D]",
    link: "text-[#E07A3D]",
    pill: "border-[#F3D2C1]",
    btn: "bg-[#C25A22] hover:bg-[#A84B1A]",
    badge: "text-[#A84B1A]",
  },
  rose: {
    card: "border-[#F6D5DD] bg-gradient-to-br from-[#FFF8FA] via-[#FEEFF3] to-[#FCE4EA]",
    blob: "bg-[#F4C8D3]",
    icon: "bg-white/70 text-[#C2476A]",
    link: "text-[#C2476A]",
    pill: "border-[#F1C6D1]",
    btn: "bg-[#C2476A] hover:bg-[#A93A5A]",
    badge: "text-[#A93A5A]",
  },
  teal: {
    card: "border-[#C8EAEA] bg-gradient-to-br from-[#F5FCFC] via-[#EAF8F8] to-[#DFF3F3]",
    blob: "bg-[#B8E3E3]",
    icon: "bg-white/70 text-[#2A9494]",
    link: "text-[#2A9494]",
    pill: "border-[#B8E3E3]",
    btn: "bg-[#1F7A7A] hover:bg-[#186262]",
    badge: "text-[#1F7A7A]",
  },
};
