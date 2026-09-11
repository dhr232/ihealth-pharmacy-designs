/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface RefillConfirmationEmailProps {
  confirmationId?: string;
  patientName?: string;
  phone?: string;
  refillType?: "rx_numbers" | "photo" | "transfer" | string;
  rxNumbers?: string[] | string;
  pickupOrDelivery?: "pickup" | "delivery" | string;
  deliveryAddress?: string;
  notes?: string;
  submittedAt?: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
  whatsappUrl?: string;
  contactUrl?: string;
}

export function RefillConfirmationEmail({
  confirmationId = "RF-2026-1042",
  patientName,
  phone,
  refillType = "rx_numbers",
  rxNumbers,
  pickupOrDelivery = "pickup",
  deliveryAddress,
  notes,
  submittedAt,
  pharmacyName = "iHealth Pharmacy Abbotsford",
  pharmacyAddress = "#105 - 2825 Clearbrook Rd, Abbotsford, BC V2T 6S3",
  pharmacyPhone = "(604) 853-1893",
  whatsappUrl = "https://wa.me/16048531893?text=Hi%20iHealth%20Pharmacy%2C%20I%20have%20a%20question%20about%20my%20prescription%20refill.",
  contactUrl = "https://ihealthpharmacy.ca/contact",
}: RefillConfirmationEmailProps) {
  const greeting = patientName ? `Hello ${patientName},` : "Hello,";
  const cleanPhone = pharmacyPhone.replace(/[^0-9]/g, "");

  // Format Rx numbers display
  let rxDisplay = "Prescription Refill Request";
  if (refillType === "photo") {
    rxDisplay = "Photo Refill Received";
  } else if (Array.isArray(rxNumbers)) {
    rxDisplay = rxNumbers.length > 0 ? rxNumbers.join(", ") : "Standard Refill Request";
  } else if (typeof rxNumbers === "string" && rxNumbers.trim()) {
    rxDisplay = rxNumbers;
  }

  const fulfillmentDisplay =
    pickupOrDelivery.toLowerCase() === "delivery"
      ? "Free Home Delivery (Abbotsford)"
      : "In-Store Pickup at Dispensary";

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        fontFamily: "Arial, Helvetica, sans-serif",
        margin: 0,
        padding: "32px 16px 48px 16px",
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
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #cbd5e1",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        <tbody>
          {/* Header */}
          <tr>
            <td
              style={{
                backgroundColor: "#0f172a",
                padding: "24px 32px",
                borderBottom: "4px solid #059669",
              }}
            >
              <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      <img
                        src="https://ihealthpharmacy.ca/ihealth-logo-main.jpeg"
                        alt="iHealth Pharmacy"
                        width="160"
                        height="48"
                        style={{
                          display: "block",
                          maxWidth: "160px",
                          height: "auto",
                          border: "0",
                          borderRadius: "4px",
                        }}
                      />
                    </td>
                    <td align="right" style={{ verticalAlign: "middle" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: "#94a3b8",
                          marginBottom: "4px",
                        }}
                      >
                        Refill ID
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          backgroundColor: "#059669",
                          color: "#ffffff",
                          fontSize: "13px",
                          fontWeight: 700,
                          padding: "6px 14px",
                          borderRadius: "6px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {confirmationId}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Title Banner */}
          <tr>
            <td
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px 32px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "20px",
                  lineHeight: "26px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Refill Request Received
              </h1>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#475569",
                }}
              >
                Our dispensary team has received your prescription order.
              </p>
            </td>
          </tr>

          {/* Body Content */}
          <tr>
            <td style={{ padding: "28px 32px" }}>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "22px",
                  color: "#1e293b",
                  marginTop: 0,
                  marginBottom: "18px",
                }}
              >
                {greeting}
              </p>

              {/* Expected Turnaround Highlight Box */}
              <div
                style={{
                  backgroundColor: "#ecfdf5",
                  borderLeft: "4px solid #059669",
                  borderRadius: "4px",
                  padding: "16px 20px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#065f46",
                    marginBottom: "4px",
                  }}
                >
                  Turnaround Notice
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "#047857",
                  }}
                >
                  Your prescription is being processed and is usually ready within 1 hour.
                </div>
              </div>

              {/* Summary of Submission Table Card */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#059669",
                    marginBottom: "14px",
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "8px",
                  }}
                >
                  Refill Summary
                </div>

                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          width: "35%",
                          verticalAlign: "top",
                        }}
                      >
                        Refill Reference
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#059669",
                          verticalAlign: "top",
                        }}
                      >
                        {confirmationId}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          verticalAlign: "top",
                        }}
                      >
                        Submission Type
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          verticalAlign: "top",
                        }}
                      >
                        {refillType === "photo" ? "Prescription Photo Refill" : "Prescription Numbers Refill"}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          verticalAlign: "top",
                        }}
                      >
                        Prescription / Item
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          verticalAlign: "top",
                        }}
                      >
                        {rxDisplay}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          verticalAlign: "top",
                        }}
                      >
                        Fulfillment Preference
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          verticalAlign: "top",
                        }}
                      >
                        {fulfillmentDisplay}
                      </td>
                    </tr>

                    {deliveryAddress ? (
                      <tr>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            verticalAlign: "top",
                          }}
                        >
                          Delivery Address
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "14px",
                            color: "#0f172a",
                            verticalAlign: "top",
                          }}
                        >
                          {deliveryAddress}
                        </td>
                      </tr>
                    ) : null}

                    {phone ? (
                      <tr>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            verticalAlign: "top",
                          }}
                        >
                          Contact Phone
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "14px",
                            color: "#0f172a",
                            verticalAlign: "top",
                          }}
                        >
                          {phone}
                        </td>
                      </tr>
                    ) : null}

                    {notes ? (
                      <tr>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            verticalAlign: "top",
                          }}
                        >
                          Patient Instructions
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontStyle: "italic",
                            color: "#475569",
                            verticalAlign: "top",
                          }}
                        >
                          &quot;{notes}&quot;
                        </td>
                      </tr>
                    ) : null}

                    {submittedAt ? (
                      <tr>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            verticalAlign: "top",
                          }}
                        >
                          Submitted At
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            color: "#64748b",
                            verticalAlign: "top",
                          }}
                        >
                          {submittedAt}
                        </td>
                      </tr>
                    ) : null}

                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          verticalAlign: "top",
                        }}
                      >
                        Location
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          lineHeight: "20px",
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

              {/* Next Steps Information */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
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
                    color: "#334155",
                    marginBottom: "10px",
                  }}
                >
                  What Happens Next
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    color: "#475569",
                    fontSize: "13px",
                    lineHeight: "20px",
                  }}
                >
                  <li style={{ marginBottom: "6px" }}>
                    A licensed British Columbia pharmacist reviews your profile and insurance coverage.
                  </li>
                  <li style={{ marginBottom: "6px" }}>
                    You will receive a notification via phone or text once the prescription is labeled and ready.
                  </li>
                  <li style={{ marginBottom: "6px" }}>
                    If you requested delivery, our driver will arrange a delivery window with you.
                  </li>
                  <li style={{ marginBottom: "0" }}>
                    Please have your BC Services Card (PHN) ready when picking up or receiving your medication.
                  </li>
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
                    View Store Hours, Location & Contact Details
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
                Phone: {pharmacyPhone} | Fax: (604) 853-1894
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

export default RefillConfirmationEmail;
