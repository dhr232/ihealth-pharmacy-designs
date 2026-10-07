// Keeps an in-progress booking in the browser tab so a refresh or a dropped connection does not
// wipe what the patient already typed. sessionStorage: it is cleared when the tab closes, never
// leaves the browser, and expires after 2 hours. The optional BC Health Number is NOT saved.

const KEY = "ihealth_booking_draft_v1";
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

export interface BookingDraftPatient {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  reasonForVisit: string;
}

export interface BookingDraft {
  savedAt: number;
  serviceId: string;
  step: number;
  patient: BookingDraftPatient;
  date: string; // YYYY-MM-DD or ""
  time: string;
  timeLabel: string;
}

function localToday(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function loadBookingDraft(): BookingDraft | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as BookingDraft;
    if (!draft || typeof draft.serviceId !== "string" || Date.now() - draft.savedAt > MAX_AGE_MS) {
      window.sessionStorage.removeItem(KEY);
      return null;
    }
    // A saved day that has already passed is no longer bookable: drop it, keep everything else
    if (draft.date && draft.date < localToday()) {
      return { ...draft, date: "", time: "", timeLabel: "", step: Math.min(draft.step, 3) };
    }
    return draft;
  } catch {
    return null;
  }
}

export function saveBookingDraft(draft: Omit<BookingDraft, "savedAt">): void {
  try {
    // Copy only the known fields so nothing else (e.g. the BC Health Number) can leak into storage
    const { firstName, lastName, email, phone, dateOfBirth, gender, reasonForVisit } = draft.patient;
    const safe: BookingDraft = {
      savedAt: Date.now(),
      serviceId: draft.serviceId,
      step: draft.step,
      patient: { firstName, lastName, email, phone, dateOfBirth, gender, reasonForVisit },
      date: draft.date,
      time: draft.time,
      timeLabel: draft.timeLabel,
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(safe));
  } catch {
    /* storage unavailable (private mode, quota): the booking still works, it just is not saved */
  }
}

export function clearBookingDraft(): void {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
