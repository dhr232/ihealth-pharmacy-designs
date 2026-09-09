import { NextRequest, NextResponse } from "next/server";
import { prisma, withPrismaFallback } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token")?.trim() || "";
  const action = searchParams.get("action")?.toLowerCase() || "";

  const isResubscribing = action === "resubscribe";
  let subscriberEmail: string | null = null;

  if (token) {
    await withPrismaFallback(
      async () => {
        if (isResubscribing) {
          const updated = await prisma.subscriber.updateMany({
            where: { unsubscribeToken: token },
            data: {
              unsubscribedAt: null,
            },
          });

          if (updated.count > 0) {
            const record = await prisma.subscriber.findFirst({
              where: { unsubscribeToken: token },
              select: { email: true },
            });
            if (record) {
              subscriberEmail = record.email;
            }
          }
        } else {
          const updated = await prisma.subscriber.updateMany({
            where: { unsubscribeToken: token },
            data: {
              unsubscribedAt: new Date(),
            },
          });

          if (updated.count > 0) {
            const record = await prisma.subscriber.findFirst({
              where: { unsubscribeToken: token },
              select: { email: true },
            });
            if (record) {
              subscriberEmail = record.email;
            }
          }
        }
      },
      () => {
        // In-memory fallback
      }
    );
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${isResubscribing ? "Resubscribed" : "Unsubscribed"} - iHealth Pharmacy</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
    }
    .card {
      background: #ffffff;
      max-width: 520px;
      width: 100%;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    .card-header {
      background: #0f172a;
      padding: 24px 32px;
      border-bottom: 3px solid #059669;
    }
    .brand-title {
      color: #10b981;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin: 0 0 4px 0;
    }
    .header-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
    .card-body {
      padding: 32px;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: ${isResubscribing ? "#ecfdf5" : "#f1f5f9"};
      color: ${isResubscribing ? "#065f46" : "#334155"};
      border: 1px solid ${isResubscribing ? "#a7f3d0" : "#cbd5e1"};
      padding: 8px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .notice-box {
      background: #f8fafc;
      border-left: 4px solid ${isResubscribing ? "#059669" : "#64748b"};
      padding: 14px 16px;
      border-radius: 4px;
      margin: 20px 0;
      font-size: 13px;
      line-height: 20px;
      color: #475569;
    }
    .btn {
      display: inline-block;
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
    }
    .btn-primary {
      background: #059669;
      color: #ffffff;
      border: 1px solid #059669;
    }
    .btn-primary:hover {
      background: #047857;
    }
    .btn-outline {
      background: #ffffff;
      color: #0f172a;
      border: 1px solid #cbd5e1;
    }
    .btn-outline:hover {
      background: #f1f5f9;
    }
    .btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 28px;
    }
    .card-footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 20px 32px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      line-height: 18px;
    }
    .card-footer a {
      color: #059669;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <p class="brand-title">iHealth Pharmacy Abbotsford</p>
      <h1 class="header-title">${
        isResubscribing
          ? "Subscription Preferences Updated"
          : "Unsubscribe Confirmation"
      }</h1>
    </div>

    <div class="card-body">
      <div class="status-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${
          isResubscribing
            ? "Successfully Resubscribed"
            : "Successfully Unsubscribed"
        }</span>
      </div>

      <p style="font-size: 15px; line-height: 24px; color: #334155; margin: 0 0 12px 0;">
        ${
          isResubscribing
            ? `Your email address <strong>${subscriberEmail || "associated with this link"}</strong> has been re-enrolled to receive iHealth Pharmacy health newsletters and updates.`
            : `Your email address <strong>${subscriberEmail || "associated with this link"}</strong> has been removed from all marketing emails and newsletters in accordance with the Canada Anti-Spam Legislation (CASL).`
        }
      </p>

      <div class="notice-box">
        <strong>Important Clinical Note:</strong>
        <p style="margin: 4px 0 0 0;">
          ${
            isResubscribing
              ? "You will now receive monthly preventative health guidance, flu vaccine reminders, and local clinic announcements."
              : "This does not affect essential health communications. You will still receive direct prescription readiness notifications, critical safety recalls, and confirmation for your scheduled clinical appointments."
          }
        </p>
      </div>

      <div class="btn-group">
        ${
          !isResubscribing && token
            ? `<a href="/api/unsubscribe?token=${encodeURIComponent(
                token
              )}&action=resubscribe" class="btn btn-outline">Resubscribe if done in error</a>`
            : ""
        }
        <a href="/" class="btn btn-primary">Return to Pharmacy Website</a>
      </div>
    </div>

    <div class="card-footer">
      <strong>iHealth Pharmacy</strong><br />
      #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1<br />
      Questions? Contact our dispensary at (604) 746-4444 or visit our <a href="/privacy">Privacy Policy</a>.
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
