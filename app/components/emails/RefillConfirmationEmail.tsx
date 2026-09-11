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
  const cleanPhone = (pharmacyPhone || "").replace(/[^0-9]/g, "");

  // Format Rx numbers display
  let rxDisplay = "Prescription Refill Request";
  if (refillType === "photo") {
    rxDisplay = "Photo Prescription Refill";
  } else if (refillType === "transfer") {
    rxDisplay = "Prescription Pharmacy Transfer";
  } else if (Array.isArray(rxNumbers)) {
    rxDisplay = rxNumbers.length > 0 ? rxNumbers.join(", ") : "Prescription Refill";
  } else if (typeof rxNumbers === "string" && rxNumbers.trim()) {
    rxDisplay = rxNumbers;
  }

  const fulfillmentDisplay =
    (pickupOrDelivery || "pickup").toLowerCase() === "delivery"
      ? "Free Home Delivery (Abbotsford)"
      : "In-Store Pickup at Dispensary";

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

          {/* Hero Banner */}
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
                Refill Request Received
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
                Your Prescription Order is in Queue
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                }}
              >
                {greeting} thank you for choosing iHealth Pharmacy. Our dispensary team has received
                your prescription request and our licensed pharmacists are preparing your order.
              </p>
            </td>
          </tr>

          {/* Dedicated Refill Reference Card */}
          <tr>
            <td style={{ padding: "12px 28px" }}>
              <div
                style={{
                  backgroundColor: "#ecfdf5",
                  borderRadius: "14px",
                  border: "1px solid #a7f3d0",
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
                    color: "#065f46",
                    marginBottom: "6px",
                  }}
                >
                  Official Refill Reference
                </div>
                <div
                  style={{
                    fontSize: "30px",
                    lineHeight: "36px",
                    fontWeight: 900,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    letterSpacing: "3px",
                    color: "#047857",
                    margin: "4px 0",
                  }}
                >
                  {confirmationId}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#065f46",
                    marginTop: "6px",
                  }}
                >
                  Please keep this reference code for your records when picking up or contacting our dispensary.
                </div>
              </div>
            </td>
          </tr>

          {/* Turnaround Notice Highlight */}
          <tr>
            <td style={{ padding: "8px 28px 16px 28px" }}>
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  borderLeft: "4px solid #059669",
                  borderRadius: "8px",
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#065f46",
                    marginBottom: "3px",
                  }}
                >
                  Estimated Turnaround Time
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: "#047857",
                  }}
                >
                  Your prescription is being processed and is usually ready within 1 hour during dispensary hours.
                </div>
              </div>
            </td>
          </tr>

          {/* Summary of Submission Table */}
          <tr>
            <td style={{ padding: "8px 28px 20px 28px" }}>
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
                  Refill Order Details
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
                        Refill Reference
                      </td>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#047857",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        {confirmationId}
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
                        Submission Type
                      </td>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        {refillType === "photo"
                          ? "Prescription Photo Refill"
                          : refillType === "transfer"
                          ? "Prescription Transfer"
                          : "Prescription Numbers Refill"}
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
                        Prescription / Item
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
                        {rxDisplay}
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
                        Fulfillment Method
                      </td>
                      <td
                        style={{
                          padding: "9px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
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
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Delivery Address
                        </td>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "14px",
                            color: "#0f172a",
                            borderBottom: "1px solid #f1f5f9",
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
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Contact Phone
                        </td>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "14px",
                            color: "#0f172a",
                            borderBottom: "1px solid #f1f5f9",
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
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Patient Instructions
                        </td>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "13px",
                            fontStyle: "italic",
                            color: "#475569",
                            borderBottom: "1px solid #f1f5f9",
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
                            padding: "9px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Submitted At
                        </td>
                        <td
                          style={{
                            padding: "9px 0",
                            fontSize: "13px",
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
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
                          padding: "9px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          verticalAlign: "top",
                        }}
                      >
                        Pharmacy Location
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

              {/* What Happens Next Card */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  padding: "18px 20px",
                  marginTop: "16px",
                  marginBottom: "24px",
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
                    If you requested delivery, our driver will confirm a delivery window with you.
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
                            borderRadius: "8px",
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
                            borderRadius: "8px",
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

          {/* Clean Footer */}
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
