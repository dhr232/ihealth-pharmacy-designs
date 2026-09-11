/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface BookingConfirmationEmailProps {
  confirmationId?: string;
  patientName?: string;
  serviceName: string;
  date: string;
  time: string;
  duration?: string;
  partySize?: number;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
  whatsappUrl?: string;
  preparationNotes?: string[];
  contactUrl?: string;
}

export function BookingConfirmationEmail({
  confirmationId = "IH-2026-8941",
  patientName,
  serviceName,
  date,
  time,
  duration = "15 minutes",
  partySize = 1,
  pharmacyName = "iHealth Pharmacy Abbotsford",
  pharmacyAddress = "#105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S3",
  pharmacyPhone = "(604) 853-1893",
  whatsappUrl = "https://wa.me/16048531893?text=Hi%20iHealth%20Pharmacy%2C%20I%20have%20a%20question%20about%20my%20appointment.",
  preparationNotes = [
    "Bring your British Columbia Services Card (Personal Health Number / PHN).",
    "Please arrive 5 minutes prior to your scheduled appointment time.",
    "Bring a complete list of current medications or relevant health history.",
    "Wear short sleeves or loose clothing if receiving an injection or vaccine.",
  ],
  contactUrl = "https://ihealthpharmacy.ca/contact",
}: BookingConfirmationEmailProps) {
  const greeting = patientName ? `Hello ${patientName},` : "Hello,";
  const cleanPhone = pharmacyPhone.replace(/[^0-9]/g, "");

  // Generate Google Calendar Link
  const calendarTitle = encodeURIComponent(`iHealth Pharmacy: ${serviceName} [${confirmationId}]`);
  const calendarDetails = encodeURIComponent(
    `Appointment at ${pharmacyName}\nService: ${serviceName}\nConfirmation: ${confirmationId}\nAddress: ${pharmacyAddress}\nPhone: ${pharmacyPhone}`
  );
  const calendarLocation = encodeURIComponent(`${pharmacyName}, ${pharmacyAddress}`);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&details=${calendarDetails}&location=${calendarLocation}`;

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
                                Abbotsford Dispensary
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Confirmation Hero Banner */}
          <tr>
            <td style={{ padding: "28px 28px 12px 28px" }}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#ecfdf5",
                  color: "#065f46",
                  border: "1px solid #a7f3d0",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  marginBottom: "12px",
                }}
              >
                Appointment Confirmed
              </div>

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
                Your Appointment is Scheduled
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                }}
              >
                {greeting} thank you for choosing iHealth Pharmacy. Your clinical consultation has been
                reserved at our Abbotsford dispensary.
              </p>
            </td>
          </tr>

          {/* Dedicated Confirmation Reference Card */}
          <tr>
            <td style={{ padding: "12px 28px" }}>
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  borderRadius: "14px",
                  border: "1px solid #fecaca",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#991b1b",
                    marginBottom: "6px",
                  }}
                >
                  Official Confirmation Reference
                </div>
                <div
                  style={{
                    fontSize: "30px",
                    lineHeight: "36px",
                    fontWeight: 900,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    letterSpacing: "3px",
                    color: "#7f1d1d",
                    margin: "4px 0",
                  }}
                >
                  {confirmationId}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#991b1b",
                    marginTop: "6px",
                  }}
                >
                  Please present this reference number or your BC Services Card when arriving.
                </div>
              </div>
            </td>
          </tr>

          {/* Appointment Details Table */}
          <tr>
            <td style={{ padding: "12px 28px 20px 28px" }}>
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
                  Consultation Summary
                </div>

                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          width: "38%",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        Clinical Service
                      </td>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        {serviceName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        Date & Time
                      </td>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        {date} at {time}
                      </td>
                    </tr>

                    {duration ? (
                      <tr>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Expected Duration
                        </td>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#0f172a",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          {duration}
                        </td>
                      </tr>
                    ) : null}

                    {patientName ? (
                      <tr>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Patient Name
                        </td>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#0f172a",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          {patientName}
                          {partySize > 1 ? ` (${partySize} people)` : ""}
                        </td>
                      </tr>
                    ) : null}

                    <tr>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          verticalAlign: "top",
                        }}
                      >
                        Clinic Location
                      </td>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "13px",
                          lineHeight: "19px",
                          color: "#0f172a",
                          verticalAlign: "top",
                        }}
                      >
                        <strong>{pharmacyName}</strong>
                        <br />
                        {pharmacyAddress}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Important Preparation Notes */}
              <div
                style={{
                  backgroundColor: "#eff6ff",
                  borderRadius: "8px",
                  border: "1px solid #bfdbfe",
                  padding: "18px 20px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#1d4ed8",
                    marginBottom: "10px",
                  }}
                >
                  Important Preparation Notes
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    color: "#1e3a8a",
                    fontSize: "13px",
                    lineHeight: "20px",
                  }}
                >
                  {preparationNotes.map((note, idx) => (
                    <li key={idx} style={{ marginBottom: "6px" }}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dispensary Contact Buttons */}
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                <table
                  align="center"
                  border={0}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ margin: "0 auto" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "0 6px 12px 6px" }}>
                        <a
                          href={`tel:${cleanPhone}`}
                          style={{
                            display: "inline-block",
                            backgroundColor: "#059669",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            padding: "12px 20px",
                            borderRadius: "6px",
                            textAlign: "center",
                          }}
                        >
                          Call Dispensary: {pharmacyPhone}
                        </a>
                      </td>
                      <td style={{ padding: "0 6px 12px 6px" }}>
                        <a
                          href={whatsappUrl}
                          style={{
                            display: "inline-block",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            padding: "12px 20px",
                            borderRadius: "6px",
                            textAlign: "center",
                          }}
                        >
                          Chat on WhatsApp
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add to Calendar Button */}
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  + Add to Google Calendar
                </a>
              </div>

              {contactUrl ? (
                <div style={{ textAlign: "center" }}>
                  <a
                    href={contactUrl}
                    style={{
                      fontSize: "12px",
                      color: "#475569",
                      textDecoration: "underline",
                    }}
                  >
                    View Directions and Parking Information
                  </a>
                </div>
              ) : null}
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                backgroundColor: "#f8fafc",
                padding: "24px 32px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "12px",
                lineHeight: "18px",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              <p style={{ margin: "0 0 6px 0", fontWeight: 600, color: "#334155" }}>
                {pharmacyName} | {pharmacyAddress}
              </p>
              <p style={{ margin: "0 0 6px 0" }}>
                Need to reschedule or cancel? Please notify our dispensary by phone at {pharmacyPhone} at
                least 24 hours prior to your visit.
              </p>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "11px" }}>
                Notice: If you are experiencing a medical emergency, please call 911 or visit the
                nearest emergency department immediately.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookingConfirmationEmail;
