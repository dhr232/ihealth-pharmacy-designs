import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearBookingDraft, loadBookingDraft, saveBookingDraft } from "../lib/booking-draft";

// Minimal in-memory sessionStorage so the helpers run under vitest's node environment
function installFakeStorage() {
  const store = new Map<string, string>();
  const sessionStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  vi.stubGlobal("window", { sessionStorage });
}

const base = {
  serviceId: "uncomplicated-urinary-tract-infection",
  step: 3,
  patient: {
    firstName: "Asha",
    lastName: "Patel",
    email: "asha@example.com",
    phone: "(604) 555-0100",
    dateOfBirth: "1980-02-03",
    gender: "Female",
    reasonForVisit: "Burning when urinating",
  },
  time: "10:30 AM",
  timeLabel: "10:30 AM",
};

function dayOffset(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

describe("booking draft", () => {
  beforeEach(() => installFakeStorage());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("restores what was saved (refresh on the time slot step)", () => {
    saveBookingDraft({ ...base, date: dayOffset(1) });
    const draft = loadBookingDraft();
    expect(draft?.patient.firstName).toBe("Asha");
    expect(draft?.patient.email).toBe("asha@example.com");
    expect(draft?.step).toBe(3);
    expect(draft?.time).toBe("10:30 AM");
  });

  it("never stores the BC Health Number", () => {
    saveBookingDraft({
      ...base,
      date: dayOffset(1),
      patient: { ...base.patient, phn: "9123456789" } as typeof base.patient,
    });
    const raw = window.sessionStorage.getItem("ihealth_booking_draft_v1") ?? "";
    expect(raw).not.toContain("9123456789");
    expect(raw).not.toContain("phn");
  });

  it("expires after 2 hours", () => {
    saveBookingDraft({ ...base, date: dayOffset(1) });
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 2 * 60 * 60 * 1000 + 1000);
    expect(loadBookingDraft()).toBeNull();
  });

  it("drops a saved day that has already passed but keeps the details", () => {
    saveBookingDraft({ ...base, date: dayOffset(-1), step: 4 });
    const draft = loadBookingDraft();
    expect(draft?.date).toBe("");
    expect(draft?.time).toBe("");
    expect(draft?.step).toBe(3);
    expect(draft?.patient.lastName).toBe("Patel");
  });

  it("clears after a confirmed booking", () => {
    saveBookingDraft({ ...base, date: dayOffset(1) });
    clearBookingDraft();
    expect(loadBookingDraft()).toBeNull();
  });

  it("does not throw when storage is unavailable", () => {
    vi.stubGlobal("window", {
      sessionStorage: {
        getItem: () => {
          throw new Error("blocked");
        },
        setItem: () => {
          throw new Error("blocked");
        },
        removeItem: () => {
          throw new Error("blocked");
        },
      },
    });
    expect(() => saveBookingDraft({ ...base, date: dayOffset(1) })).not.toThrow();
    expect(loadBookingDraft()).toBeNull();
    expect(() => clearBookingDraft()).not.toThrow();
  });
});
