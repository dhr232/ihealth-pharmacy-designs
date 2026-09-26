# iHealth Pharmacy -- Brand & Product Marketing Context

Single source of truth for positioning, audience, voice, and claims. Read this before
writing or editing any customer-facing copy (pages, blog posts, emails, social, ads).
Last confirmed with the owner: 2026-09-25.

## Positioning

**The friendly neighbourhood pharmacy that knows you by name.**

iHealth is an independent, family-run pharmacy in Chilliwack, BC. The promise is a
*personal pharmacist* -- someone who remembers you, your medications, and your family,
and who cares about your health beyond the prescription counter.

What we are NOT: a chain, a call-centre, a discount warehouse, or a tech company. Digital
tools (WhatsApp photo refills, online transfers, online booking) exist to make personal
care easier, never to replace it.

## Primary audience

1. **Seniors** managing several medications -- value patience, clear explanations, large
   readable text, delivery, and blister packaging (MyHealthPack).
2. **Caregivers** -- adult children and family members managing a parent's medications,
   often from a distance. Value one reliable contact, WhatsApp/phone access, synchronized
   refills, and delivery.

Secondary: Punjabi- and Hindi-speaking families; people unhappy with chain wait times.

## Primary conversions (in order)

1. **Transfer prescriptions** -- `/transfer`
2. **Book a clinical service** -- booking flow (minor ailments, vaccines, med reviews)

Every major page should end with a clear path to one or both.

## Voice

- Warm, calm, plain-English, Canadian spelling (neighbour, centre, colour).
- Talk like a pharmacist at the counter, not a brochure: "we", "you", short sentences.
- Reassure, don't alarm. Avoid clinical jargon unless it is immediately explained.
- Respectful of older readers: no slang, no hype, no exclamation-mark stacking.
- No emojis anywhere.

Words we like: neighbour, by name, take the time, explain, look after, family, Chilliwack.
Words to avoid: revolutionary, cutting-edge, world-class, guaranteed, 100% (unless it is a
literal coverage fact), seamless, "compliant", "accredited", "certified" (see Claims).

## Verified claims (safe to use)

- Independent and family-run
- Free same-day delivery across Chilliwack -- always free, no minimum order (never mention $25)
- Google rating: 4.7 stars (`PHARMACY_INFO.address.googleRating`); link to `googleReviewsUrl`. Do not state a review count
- Many in-stock prescription refills ready in under 30 minutes
- Languages: English, Punjabi, Hindi (`data/pharmacy-info.ts`)
- Store hours: Mon–Fri 8:30 am – 5 pm, Sat 9 am – 12 pm, Sun closed (`PHARMACY_INFO.hours*`)
- Online booking: Mon–Fri 9:00 am – 2:30 pm only (`PHARMACY_INFO.onlineBooking`)
- Licensed community pharmacy regulated by the College of Pharmacists of BC
- Pharmacists can assess and prescribe for BC minor ailments and contraception
- Direct billing to the insurers listed in `data/pharmacy-info.ts` `accreditation.directBilling`
  ("and more" / "most major insurers" is fine; never "all" or "100% coverage")
- We contact the previous pharmacy for prescription transfers
- MyHealthPack blister packaging; WhatsApp photo refills

## Claims to avoid (legal / regulatory risk)

- "Accredited", "fully compliant", "certified", or any seal/badge-style privacy claims.
  Privacy is mentioned quietly and links to `/privacy`. Do not mention PIPEDA in marketing
  copy (owner decision 2026-09-25); PHIPA wording is left as-is on the owner's instruction.
- Specific encryption claims ("256-bit", "end-to-end") in marketing copy.
- Sterile compounding (not verified).
- NIHB / FNHA billing (owner confirmed not accurate).
- "5.0", "5-star", "top rated", or any rating other than the current Google rating.
- "Walk in any time" or 24/7 language -- hours are limited.
- Outcome guarantees ("never miss a dose", "zero wait").
- Any new factual claim not on the verified list: ask the owner first.

## Visual identity (summary)

Primary blue `#3D5FE0`, leaf green `#4CAF7D`, Inter. Calm, light surfaces. Full tokens in
`CLAUDE.md` and `app/globals.css`. Red was retired as the default because it read as
alarming to older patients.
