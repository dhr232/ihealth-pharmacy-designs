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
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
        className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
      >
        {/* Header */}
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: "#0f172a",
                padding: "28px 32px",
                borderBottom: "4px solid #059669",
              }}
              className="bg-slate-900 px-8 py-7 border-b-4 border-emerald-600"
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
                        iHealth Pharmacy Abbotsford
                      </p>
                      <h1
                        style={{
                          margin: "6px 0 0 0",
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "#ffffff",
                          lineHeight: "28px",
                        }}
                        className="text-xl font-bold text-white mt-1"
                      >
                        Welcome to iHealth Wellness
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
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#334155",
                  marginTop: 0,
                  marginBottom: "16px",
                }}
                className="text-slate-700 text-base mb-4 mt-0"
              >
                {greeting}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#475569",
                  margin: "0 0 20px 0",
                }}
                className="text-slate-600 text-sm mb-5"
              >
                Thank you for subscribing to the iHealth Pharmacy wellness newsletter. You are now
                connected to evidence-based health guidance and updates from your local Abbotsford
                pharmacists.
              </p>

              {/* What to Expect Box */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  marginBottom: "24px",
                }}
                className="bg-slate-50 rounded-lg border border-slate-200 p-5 mb-6"
              >
                <h2
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#0f172a",
                    margin: "0 0 12px 0",
                  }}
                  className="text-xs font-bold uppercase tracking-wide text-slate-900 mb-3"
                >
                  What You Will Receive
                </h2>
                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: "10px", verticalAlign: "top", width: "24px" }}>
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
                      <td style={{ paddingBottom: "10px", fontSize: "14px", lineHeight: "20px", color: "#334155" }}>
                        <strong>Monthly Health Tips:</strong> Preventative care, seasonal health guidance, and condition management written by our clinical pharmacists.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: "10px", verticalAlign: "top", width: "24px" }}>
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
                      <td style={{ paddingBottom: "10px", fontSize: "14px", lineHeight: "20px", color: "#334155" }}>
                        <strong>Priority Vaccine Alerts:</strong> Early notice for seasonal influenza and COVID-19 booster booking slots in Abbotsford.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "24px" }}>
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
                      <td style={{ fontSize: "14px", lineHeight: "20px", color: "#334155" }}>
                        <strong>Pharmacy Services:</strong> Updates regarding BC Minor Ailments prescribing, medication reviews, and compounding availability.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pharmacy Location Card */}
              <div
                style={{
                  borderLeft: "4px solid #059669",
                  backgroundColor: "#ecfdf5",
                  padding: "16px",
                  borderRadius: "4px",
                  marginBottom: "28px",
                }}
                className="border-l-4 border-emerald-600 bg-emerald-50 p-4 rounded mb-7"
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#065f46",
                  }}
                  className="font-bold text-emerald-900 text-sm mb-1"
                >
                  Visit iHealth Pharmacy in Abbotsford
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#047857",
                  }}
                  className="text-emerald-800 text-xs"
                >
                  #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1
                  <br />
                  Open Monday to Friday 9:00 AM - 6:00 PM | Saturday 10:00 AM - 3:00 PM
                  <br />
                  Phone: (604) 746-4444 &bull; Fax: (604) 746-4445
                </p>
              </div>

              {/* 1-Click Unsubscribe Callout */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px dashed #cbd5e1",
                  padding: "20px",
                  textAlign: "center",
                }}
                className="bg-slate-50 rounded-lg border border-dashed border-slate-300 p-5 text-center"
              >
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "18px",
                  }}
                  className="text-slate-500 text-xs mb-3"
                >
                  CASL Compliance: If you did not subscribe or prefer not to receive newsletters, you can opt out instantly.
                </p>
                <a
                  href={unsubscribeUrl}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#e2e8f0",
                    color: "#334155",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                  }}
                  className="inline-block bg-slate-200 text-slate-700 text-xs font-semibold px-5 py-2.5 rounded border border-slate-300 hover:bg-slate-300"
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
                backgroundColor: "#f1f5f9",
                padding: "24px 32px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "11px",
                lineHeight: "18px",
                color: "#64748b",
                textAlign: "center",
              }}
              className="bg-slate-100 p-6 border-t border-slate-200 text-xs text-slate-500 text-center"
            >
              <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#475569" }}>
                iHealth Pharmacy Abbotsford
              </p>
              <p style={{ margin: "0 0 6px 0" }}>
                #105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1, Canada
                <br />
                Telephone: (604) 746-4444 &bull; Email: info@ihealthpharmacy.ca
              </p>
              <p style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>
                This message was sent to <strong>{email}</strong> in accordance with the Canada Anti-Spam Legislation (CASL).
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
                  className="text-emerald-600 underline font-semibold"
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
                  className="text-slate-500 underline"
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
                  className="text-slate-500 underline"
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
