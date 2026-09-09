import * as React from "react";

export interface TwoFactorCodeEmailProps {
  email: string;
  code: string;
  expiresMinutes?: number;
  userName?: string;
}

export function TwoFactorCodeEmail({
  email,
  code,
  expiresMinutes = 10,
  userName,
}: TwoFactorCodeEmailProps) {
  const greeting = userName ? `Hello ${userName},` : "Hello,";

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        margin: 0,
        padding: "32px 16px",
        color: "#0f172a",
      }}
      className="bg-slate-50 text-slate-900 font-sans p-8"
    >
      <table
        align="center"
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width="100%"
        style={{
          maxWidth: "540px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
        className="max-w-lg mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
      >
        {/* Header */}
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: "#0f172a",
                padding: "24px 32px",
                borderBottom: "3px solid #059669",
              }}
              className="bg-slate-900 px-8 py-6 border-b-3 border-emerald-600"
            >
              <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "#10b981",
                        }}
                        className="text-xs font-bold tracking-wider uppercase text-emerald-400"
                      >
                        iHealth Pharmacy Security
                      </p>
                      <h1
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#ffffff",
                          lineHeight: "26px",
                        }}
                        className="text-lg font-bold text-white mt-1"
                      >
                        One-Time Verification Code
                      </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Body Content */}
          <tr>
            <td style={{ padding: "32px" }} className="p-8">
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#334155",
                  marginTop: 0,
                  marginBottom: "16px",
                }}
                className="text-slate-700 text-sm mb-4 mt-0"
              >
                {greeting}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                  margin: "0 0 24px 0",
                }}
                className="text-slate-600 text-sm mb-6"
              >
                We received a request to verify your account or confirm access for{" "}
                <strong>{email}</strong>. Use the one-time code below to complete authentication:
              </p>

              {/* High-Contrast OTP Code Box */}
              <div
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "2px solid #059669",
                  padding: "24px 16px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
                className="bg-slate-900 rounded-lg border-2 border-emerald-600 p-6 text-center mb-5"
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#94a3b8",
                    marginBottom: "8px",
                  }}
                  className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2"
                >
                  Verification Code
                </span>
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "36px",
                    fontWeight: 800,
                    letterSpacing: "8px",
                    color: "#ffffff",
                    userSelect: "all",
                  }}
                  className="font-mono text-4xl font-extrabold tracking-widest text-white select-all"
                >
                  {code}
                </span>
              </div>

              {/* Expiry Warning Box */}
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  borderLeft: "4px solid #d97706",
                  padding: "12px 16px",
                  borderRadius: "4px",
                  marginBottom: "24px",
                }}
                className="bg-amber-50 border-l-4 border-amber-600 p-3 rounded mb-6"
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#92400e",
                    fontWeight: 600,
                  }}
                  className="text-amber-800 text-xs font-semibold"
                >
                  Expiry Notice: This code will expire in {expiresMinutes} minutes.
                </p>
              </div>

              {/* Security Advisory */}
              <div
                style={{
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "20px",
                  marginTop: "8px",
                }}
                className="border-t border-slate-200 pt-5 mt-2"
              >
                <h2
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#0f172a",
                    margin: "0 0 8px 0",
                  }}
                  className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-2"
                >
                  Security Advisory
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#64748b",
                    margin: "0 0 8px 0",
                  }}
                  className="text-slate-500 text-xs mb-2"
                >
                  iHealth Pharmacy staff will never ask you for your verification code over the phone or by email.
                  Never share this code with anyone.
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#64748b",
                    margin: 0,
                  }}
                  className="text-slate-500 text-xs"
                >
                  If you did not initiate this request, someone may be attempting to access your profile.
                  Please contact the pharmacy immediately at <strong>(604) 746-4444</strong>.
                </p>
              </div>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                backgroundColor: "#f1f5f9",
                padding: "16px 32px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "11px",
                lineHeight: "16px",
                color: "#64748b",
                textAlign: "center",
              }}
              className="bg-slate-100 p-4 border-t border-slate-200 text-xs text-slate-500 text-center"
            >
              <p style={{ margin: "0 0 4px 0" }}>
                iHealth Pharmacy Abbotsford &bull; #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1
              </p>
              <p style={{ margin: 0 }}>
                Automated security message. Responses to this email address are not monitored.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TwoFactorCodeEmail;
