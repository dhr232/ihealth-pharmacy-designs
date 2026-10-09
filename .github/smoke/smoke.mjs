// Live-site smoke test. Run: SMOKE_URL=https://ihealthpharmacy.ca node .github/smoke/smoke.mjs
// Read-only: it never creates a booking, sends an email or stores a file (the health endpoint
// writes and removes one tiny temp file). Exits 1 if any check fails.

const BASE = (process.env.SMOKE_URL || "https://ihealthpharmacy.ca").replace(/\/$/, "");
const failures = [];

function pass(name) {
  console.log(`PASS  ${name}`);
}
function fail(name, why) {
  console.log(`FAIL  ${name}: ${why}`);
  failures.push(name);
}
async function check(name, fn) {
  try {
    const why = await fn();
    if (why) fail(name, why);
    else pass(name);
  } catch (e) {
    fail(name, e instanceof Error ? e.message : String(e));
  }
}
async function get(pathname, init) {
  const res = await fetch(BASE + pathname, { redirect: "follow", signal: AbortSignal.timeout(30000), ...init });
  return res;
}

// Pacific "now" (the pharmacy's time zone, not the runner's)
function pacificNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const g = (t) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    date: `${g("year")}-${g("month")}-${g("day")}`,
    weekday: g("weekday"),
    minutes: Number(g("hour")) * 60 + Number(g("minute")),
  };
}

function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}
function isWeekday(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return dow >= 1 && dow <= 5;
}

// 1. Server settings and storage (catches a missing UPLOAD_DIR, SESSION_SECRET, DB or email key)
await check("health: database, uploads, secrets", async () => {
  const res = await get("/api/health", { headers: { "Cache-Control": "no-cache" } });
  const body = await res.json().catch(() => null);
  if (res.status === 404) return "/api/health not found (is this build deployed yet?)";
  if (!body) return `HTTP ${res.status}, not JSON`;
  const bad = Object.entries(body.required ?? {})
    .filter(([, c]) => !c.ok)
    .map(([k, c]) => `${k} (${c.note ?? "failed"})`);
  const warn = Object.entries(body.optional ?? {})
    .filter(([, c]) => !c.ok)
    .map(([k, c]) => `${k} (${c.note ?? "failed"})`);
  if (warn.length) console.log(`WARN  optional settings missing: ${warn.join(", ")}`);
  return res.ok && body.ok ? null : `HTTP ${res.status}; failing: ${bad.join(", ") || "unknown"}`;
});

// 2. Key pages load
for (const p of ["/", "/book", "/prescription-refills", "/transfer", "/services/minor-ailments", "/admin/login"]) {
  await check(`page ${p}`, async () => {
    const res = await get(p);
    return res.ok ? null : `HTTP ${res.status}`;
  });
}

// 3. Booking slots: today must have open times during booking hours (guards the UTC-clock bug),
//    and the next weekday must always have open times.
const now = pacificNow();
const todayIsBookable = isWeekday(now.date) && now.minutes >= 0 && now.minutes <= 13 * 60 + 30;
if (todayIsBookable) {
  await check(`slots today (${now.date}) have open times`, async () => {
    const res = await get(`/api/appointments/slots?date=${now.date}&serviceId=routine-vaccination`);
    const body = await res.json().catch(() => null);
    if (!res.ok || !body?.success) return `HTTP ${res.status}`;
    return body.availableSlotsCount > 0 ? null : `0 of ${body.totalSlots} slots open at ${Math.floor(now.minutes / 60)}:${String(now.minutes % 60).padStart(2, "0")} Pacific`;
  });
} else {
  console.log(`SKIP  slots today (${now.date}): outside weekday booking hours`);
}
{
  let next = addDays(now.date, 1);
  while (!isWeekday(next)) next = addDays(next, 1);
  await check(`slots next weekday (${next}) have open times`, async () => {
    const res = await get(`/api/appointments/slots?date=${next}&serviceId=routine-vaccination`);
    const body = await res.json().catch(() => null);
    if (!res.ok || !body?.success) return `HTTP ${res.status}`;
    return body.availableSlotsCount > 0 ? null : `0 of ${body.totalSlots} slots open`;
  });
}

// 4. Flu and COVID-19 are booked on the BC Government site, never through our form
for (const serviceId of ["annual-influenza-immunization", "covid-19-vaccination"]) {
  await check(`booking refused for ${serviceId}`, async () => {
    const res = await get("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId }),
    });
    const text = await res.text();
    return res.status === 400 && text.includes("getvaccinated.gov.bc.ca") ? null : `HTTP ${res.status}`;
  });
}

// 5. Admin sign-in endpoint answers (an address that cannot sign in gets a generic reply, no email sent)
await check("admin sign-in endpoint responds", async () => {
  const res = await get("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "smoke-test@example.com" }),
  });
  const body = await res.json().catch(() => null);
  return res.ok && body?.success === true ? null : `HTTP ${res.status}`;
});

console.log(failures.length ? `\n${failures.length} check(s) FAILED against ${BASE}` : `\nAll checks passed against ${BASE}`);
process.exit(failures.length ? 1 : 0);
