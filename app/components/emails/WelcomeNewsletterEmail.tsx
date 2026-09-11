/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface WelcomeNewsletterEmailProps {
  email: string;
  firstName?: string;
  unsubscribeUrl: string;
}

export function WelcomeNewsletterEmail({
  email,
  firstName,
  unsubscribeUrl,
}: WelcomeNewsletterEmailProps) {
  const greeting = firstName ? `Hello ${firstName},` : "Hello,";

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
          maxWidth: "600px",
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
                                Wellness & Health Guidance
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
                          backgroundColor: "#ecfdf5",
                          color: "#065f46",
                          border: "1px solid #a7f3d0",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          padding: "5px 12px",
                          borderRadius: "9999px",
                        }}
                      >
                        COMMUNITY WELLNESS
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Hero Content */}
          <tr>
            <td style={{ padding: "28px 28px 12px 28px" }}>
              <h1
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "22px",
                  lineHeight: "28px",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.3px",
                }}
              >
                Welcome to iHealth Wellness
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
                Thank you for subscribing to the iHealth Pharmacy wellness newsletter. You are now
                connected to evidence-based health guidance and updates directly from your local
                Abbotsford pharmacy team.
              </p>
            </td>
          </tr>

          {/* What to Expect Card */}
          <tr>
            <td style={{ padding: "8px 28px 16px 28px" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    color: "#059669",
                    marginBottom: "14px",
                    borderBottom: "1px solid #f1f5f9",
                    paddingBottom: "8px",
                  }}
                >
                  What You Will Receive
                </div>

                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: "12px", verticalAlign: "top", width: "22px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#059669",
                            borderRadius: "50%",
                            marginTop: "6px",
                          }}
                        />
                      </td>
                      <td style={{ paddingBottom: "12px", fontSize: "13px", lineHeight: "20px", color: "#334155" }}>
                        <strong style={{ color: "#0f172a" }}>Monthly Health Guidance:</strong> Preventative care, seasonal wellness tips, and chronic condition management written by licensed BC pharmacists.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: "12px", verticalAlign: "top", width: "22px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#059669",
                            borderRadius: "50%",
                            marginTop: "6px",
                          }}
                        />
                      </td>
                      <td style={{ paddingBottom: "12px", fontSize: "13px", lineHeight: "20px", color: "#334155" }}>
                        <strong style={{ color: "#0f172a" }}>Priority Vaccine Alerts:</strong> Early notice for seasonal influenza and COVID-19 booster booking slots in Abbotsford.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "22px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#059669",
                            borderRadius: "50%",
                            marginTop: "6px",
                          }}
                        />
                      </td>
                      <td style={{ fontSize: "13px", lineHeight: "20px", color: "#334155" }}>
                        <strong style={{ color: "#0f172a" }}>Clinical Services Updates:</strong> Timely announcements regarding BC Minor Ailments prescribing, medication reviews, and compounding availability.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          {/* Pharmacy Location Card */}
          <tr>
            <td style={{ padding: "8px 28px 16px 28px" }}>
              <div
                style={{
                  borderLeft: "4px solid #059669",
                  backgroundColor: "#f0fdf4",
                  padding: "16px 18px",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#065f46",
                    marginBottom: "4px",
                  }}
                >
                  Visit iHealth Pharmacy in Abbotsford
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#047857",
                  }}
                >
                  #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S3
                  <br />
                  Open Monday to Friday 9:00 AM - 6:00 PM | Saturday 10:00 AM - 3:00 PM
                  <br />
                  Phone: (604) 853-1893 | Fax: (604) 853-1894
                </div>
              </div>
            </td>
          </tr>

          {/* 1-Click Unsubscribe Callout */}
          <tr>
            <td style={{ padding: "8px 28px 24px 28px" }}>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px dashed #cbd5e1",
                  padding: "18px 20px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: "18px",
                  }}
                >
                  CASL Compliance Notice: If you did not subscribe or prefer not to receive newsletters, you can opt out at any time.
                </p>
                <a
                  href={unsubscribeUrl}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f1f5f9",
                    color: "#334155",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  Unsubscribe in 1 Click
                </a>
              </div>
            </td>
          </tr>

          {/* CASL-Compliant Footer */}
          <tr>
            <td
              style={{
                backgroundColor: "#f8fafc",
                padding: "24px 32px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "11px",
                lineHeight: "18px",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              <p style={{ margin: "0 0 4px 0", fontWeight: 700, color: "#475569" }}>
                iHealth Pharmacy Abbotsford
              </p>
              <p style={{ margin: "0 0 6px 0" }}>
                #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S3, Canada
                <br />
                Telephone: (604) 853-1893 | Email: info@ihealthpharmacy.ca
              </p>
              <p style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>
                This message was sent to <strong>{email}</strong> in accordance with Canada Anti-Spam Legislation (CASL).
                You provided express consent through our website or pharmacy intake.
              </p>
              <p style={{ margin: 0 }}>
                <a
                  href={unsubscribeUrl}
                  style={{
                    color: "#059669",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
                  Unsubscribe instantly
                </a>
                {" "}&bull;{" "}
                <a
                  href="https://ihealthpharmacy.ca/privacy"
                  style={{
                    color: "#64748b",
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </a>
                {" "}&bull;{" "}
                <a
                  href="https://ihealthpharmacy.ca/contact"
                  style={{
                    color: "#64748b",
                    textDecoration: "underline",
                  }}
                >
                  Contact Us
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WelcomeNewsletterEmail;
