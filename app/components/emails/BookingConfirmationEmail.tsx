import * as React from "react";

export interface BookingConfirmationEmailProps {
  confirmationId?: string;
  patientName?: string;
  serviceName: string;
  date: string;
  time: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
  preparationNotes?: string[];
  contactUrl?: string;
}

export function BookingConfirmationEmail({
  confirmationId = "IH-2026-8941",
  patientName,
  serviceName,
  date,
  time,
  pharmacyName = "iHealth Pharmacy Abbotsford",
  pharmacyAddress = "#105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S1",
  pharmacyPhone = "(604) 746-4444",
  preparationNotes = [
    "Bring your British Columbia Services Card (Personal Health Number / PHN).",
    "Please arrive 5 minutes prior to your scheduled appointment time.",
    "Bring a complete list of current medications or relevant health history.",
    "Wear short sleeves or loose clothing if receiving an injection or vaccine.",
  ],
  contactUrl = "https://ihealthpharmacy.ca/contact",
}: BookingConfirmationEmailProps) {
  const greeting = patientName ? `Hello ${patientName},` : "Hello,";

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
                        iHealth Pharmacy
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
                        Appointment Confirmed
                      </h1>
                    </td>
                    <td align="right" style={{ verticalAlign: "middle" }}>
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#1e293b",
                          color: "#34d399",
                          fontSize: "12px",
                          fontWeight: 600,
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: "1px solid #334155",
                        }}
                        className="bg-slate-800 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded border border-slate-700"
                      >
                        {confirmationId}
                      </span>
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
                  marginBottom: "20px",
                }}
                className="text-slate-700 text-base mb-5 mt-0"
              >
                {greeting}
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#475569",
                  margin: "0 0 24px 0",
                }}
                className="text-slate-600 text-sm mb-6"
              >
                Your appointment at {pharmacyName} has been successfully scheduled.
                Please review the booking details and preparation instructions below.
              </p>

              {/* Appointment Card */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  marginBottom: "28px",
                }}
                className="bg-slate-50 rounded-lg border border-slate-200 p-5 mb-7"
              >
                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: "12px", width: "35%" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#64748b",
                          }}
                          className="text-xs font-semibold uppercase text-slate-500"
                        >
                          Service
                        </span>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#0f172a",
                            marginTop: "2px",
                          }}
                          className="text-sm font-bold text-slate-900 mt-0.5"
                        >
                          {serviceName}
                        </div>
                      </td>
                      <td style={{ paddingBottom: "12px", width: "65%" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#64748b",
                          }}
                          className="text-xs font-semibold uppercase text-slate-500"
                        >
                          Confirmation ID
                        </span>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#059669",
                            marginTop: "2px",
                          }}
                          className="text-sm font-bold text-emerald-600 mt-0.5"
                        >
                          {confirmationId}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: "12px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#64748b",
                          }}
                          className="text-xs font-semibold uppercase text-slate-500"
                        >
                          Date
                        </span>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#0f172a",
                            marginTop: "2px",
                          }}
                          className="text-sm font-semibold text-slate-900 mt-0.5"
                        >
                          {date}
                        </div>
                      </td>
                      <td style={{ paddingBottom: "12px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#64748b",
                          }}
                          className="text-xs font-semibold uppercase text-slate-500"
                        >
                          Time
                        </span>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            color: "#0f172a",
                            marginTop: "2px",
                          }}
                          className="text-sm font-semibold text-slate-900 mt-0.5"
                        >
                          {time}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ paddingTop: "4px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#64748b",
                          }}
                          className="text-xs font-semibold uppercase text-slate-500"
                        >
                          Location
                        </span>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#0f172a",
                            marginTop: "2px",
                            lineHeight: "20px",
                          }}
                          className="text-sm font-medium text-slate-900 mt-0.5"
                        >
                          {pharmacyName}
                          <br />
                          {pharmacyAddress}
                          <br />
                          Phone: {pharmacyPhone}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Instructions Section */}
              <div style={{ marginBottom: "28px" }} className="mb-7">
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
                  Important Patient Instructions
                </h2>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    color: "#475569",
                    fontSize: "14px",
                    lineHeight: "22px",
                  }}
                  className="list-disc pl-5 text-slate-600 text-sm space-y-1.5"
                >
                  {preparationNotes.map((note, idx) => (
                    <li key={idx} style={{ marginBottom: "6px" }}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td align="center">
                      <a
                        href={`tel:${pharmacyPhone.replace(/[^0-9]/g, "")}`}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#059669",
                          color: "#ffffff",
                          fontSize: "14px",
                          fontWeight: 600,
                          textDecoration: "none",
                          padding: "12px 24px",
                          borderRadius: "6px",
                          marginRight: "12px",
                        }}
                        className="inline-block bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-emerald-700"
                      >
                        Call Pharmacy: {pharmacyPhone}
                      </a>
                      <a
                        href={contactUrl}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#0f172a",
                          color: "#ffffff",
                          fontSize: "14px",
                          fontWeight: 600,
                          textDecoration: "none",
                          padding: "12px 24px",
                          borderRadius: "6px",
                        }}
                        className="inline-block bg-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-slate-800"
                      >
                        Contact & Directions
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                backgroundColor: "#f1f5f9",
                padding: "20px 32px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#64748b",
                textAlign: "center",
              }}
              className="bg-slate-100 p-6 border-t border-slate-200 text-xs text-slate-500 text-center"
            >
              <p style={{ margin: "0 0 6px 0" }}>
                <strong>{pharmacyName}</strong> &bull; {pharmacyAddress}
              </p>
              <p style={{ margin: 0 }}>
                Need to reschedule or cancel? Please notify us by phone at least 24 hours in advance.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookingConfirmationEmail;
