/* eslint-disable @next/next/no-img-element */
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
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        margin: 0,
        padding: "24px 12px 40px 12px",
        color: "#0f172a",
      }}
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
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 16px rgba(15, 23, 42, 0.05)",
        }}
      >
        <tbody>
          {/* Top Brand Accent Stripe */}
          <tr>
            <td
              style={{
                height: "5px",
                backgroundColor: "#C01D16",
                fontSize: "1px",
                lineHeight: "1px",
              }}
            >
              &nbsp;
            </td>
          </tr>

          {/* Clean Light Header with Transparent Logo */}
          <tr>
            <td
              style={{
                backgroundColor: "#ffffff",
                padding: "24px 28px 20px 28px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      <table border={0} cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: "middle", paddingRight: "14px" }}>
                              <img
                                src="https://ihealthpharmacy.ca/ihealth-logo-transparent.png"
                                alt="iHealth Pharmacy"
                                width="44"
                                height="44"
                                style={{
                                  display: "block",
                                  width: "44px",
                                  height: "44px",
                                  border: "0",
                                  outline: "none",
                                }}
                              />
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <div
                                style={{
                                  fontSize: "20px",
                                  fontWeight: 800,
                                  color: "#0f172a",
                                  lineHeight: "1.1",
                                  letterSpacing: "-0.4px",
                                }}
                              >
                                iHealth{" "}
                                <span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#64748b",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  Pharmacy
                                </span>
                              </div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  color: "#059669",
                                  marginTop: "3px",
                                }}
                              >
                                Staff Security & Verification
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td align="right" style={{ verticalAlign: "middle" }}>
                      <div
                        style={{
                          display: "inline-block",
                          backgroundColor: "#fef2f2",
                          color: "#991b1b",
                          border: "1px solid #fecaca",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                        }}
                      >
                        SECURITY ALERT
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Body Content */}
          <tr>
            <td style={{ padding: "28px 28px 20px 28px" }}>
              <h1
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.3px",
                }}
              >
                One-Time Verification Code
              </h1>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#334155",
                  marginTop: 0,
                  marginBottom: "12px",
                }}
              >
                {greeting}
              </p>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                  margin: "0 0 20px 0",
                }}
              >
                We received a request to authenticate staff access for <strong>{email}</strong>.
                Use the one-time 6-digit code below to complete sign-in:
              </p>

              {/* Clean High-Contrast Verification Code Box */}
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  borderRadius: "14px",
                  border: "2px solid #059669",
                  padding: "24px 16px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#065f46",
                    marginBottom: "8px",
                  }}
                >
                  Verification Code
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "38px",
                    lineHeight: "44px",
                    fontWeight: 900,
                    letterSpacing: "8px",
                    color: "#0f172a",
                    userSelect: "all",
                  }}
                >
                  {code}
                </div>
              </div>

              {/* Expiry Warning Box */}
              <div
                style={{
                  backgroundColor: "#fffbeb",
                  borderLeft: "4px solid #d97706",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#92400e",
                    fontWeight: 600,
                  }}
                >
                  Expiry Notice: This code will expire in {expiresMinutes} minutes.
                </p>
              </div>

              {/* Security Advisory */}
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "20px",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#0f172a",
                    marginBottom: "8px",
                  }}
                >
                  Security Advisory
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#64748b",
                    margin: "0 0 8px 0",
                  }}
                >
                  iHealth Pharmacy staff will never ask you for your verification code over the phone
                  or by email. Never share this code with anyone.
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#64748b",
                    margin: 0,
                  }}
                >
                  If you did not initiate this request, someone may be attempting to access your profile.
                  Please notify pharmacy administration immediately at <strong>(604) 853-1893</strong>.
                </p>
              </div>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px 32px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "11px",
                lineHeight: "16px",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              <p style={{ margin: "0 0 4px 0", fontWeight: 600, color: "#475569" }}>
                iHealth Pharmacy Abbotsford | #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S3
              </p>
              <p style={{ margin: 0 }}>
                Automated security message. Replies to this email address are not monitored.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TwoFactorCodeEmail;
