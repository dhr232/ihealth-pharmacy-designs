/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface PrescriptionConfirmationEmailProps {
  referenceNumber: string;
  type: "NEW_PRESCRIPTION" | "REFILL" | "TRANSFER";
  patientName: string;
  phone: string;
  email: string;
  dateOfBirth?: string;
  submissionMode: "PHOTOS" | "MANUAL";
  itemCount?: number;
  items?: Array<{
    medicationName?: string;
    rxNumber?: string;
    notes?: string;
    doctorName?: string;
  }>;
  photoCount?: number;
  previousPharmacyName?: string;
  previousPharmacyPhone?: string;
  transferAll?: boolean;
  fulfillmentMethod: "PICKUP" | "DELIVERY";
  deliveryAddress?: string;
  preferredReadyDate?: string;
  preferredReadyTime?: string;
  patientNotes?: string;
  submittedAt?: string;
  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;
}

export function PrescriptionConfirmationEmail({
  referenceNumber = "RX-2026-1001",
  type = "REFILL",
  patientName,
  phone,
  email,
  dateOfBirth,
  submissionMode = "MANUAL",
  itemCount = 1,
  items = [],
  photoCount = 0,
  previousPharmacyName,
  previousPharmacyPhone,
  transferAll,
  fulfillmentMethod = "PICKUP",
  deliveryAddress,
  preferredReadyDate,
  preferredReadyTime,
  patientNotes,
  submittedAt,
  pharmacyName = "iHealth Pharmacy Chilliwack",
  pharmacyAddress = "#101 - 45619 Yale Rd, Chilliwack, BC V2P 2N1",
  pharmacyPhone = "(604) 392-8393",
}: PrescriptionConfirmationEmailProps) {
  const greeting = patientName ? `Hello ${patientName},` : "Hello,";
  const cleanPhone = (pharmacyPhone || "").replace(/[^0-9]/g, "");

  const typeLabel =
    type === "NEW_PRESCRIPTION"
      ? "New Prescription Submission"
      : type === "TRANSFER"
      ? "Prescription Pharmacy Transfer"
      : "Prescription Refill Request";

  const typeBadgeColor =
    type === "NEW_PRESCRIPTION"
      ? "#2563eb"
      : type === "TRANSFER"
      ? "#7c3aed"
      : "#059669";

  const fulfillmentDisplay =
    fulfillmentMethod === "DELIVERY"
      ? "Free Home Delivery (Chilliwack)"
      : "In-Store Dispensary Pickup";

  const readyTimingDisplay =
    preferredReadyDate || preferredReadyTime
      ? [preferredReadyDate, preferredReadyTime].filter(Boolean).join(" - ")
      : "Standard processing (Same business day)";

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
          <tr>
            <td
              style={{
                height: "6px",
                backgroundColor: typeBadgeColor,
                fontSize: "1px",
                lineHeight: "1px",
              }}
            >
              &nbsp;
            </td>
          </tr>

          <tr>
            <td
              style={{
                padding: "28px 32px 20px 32px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
              >
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
                                  fontWeight: "800",
                                  color: "#0f172a",
                                  letterSpacing: "-0.5px",
                                  lineHeight: "1.2",
                                }}
                              >
                                iHealth <span style={{ color: "#2563eb" }}>Pharmacy</span>
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#64748b",
                                  marginTop: "2px",
                                }}
                              >
                                Community Dispensary &amp; Clinical Care
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td align="right" style={{ verticalAlign: "middle" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 12px",
                          backgroundColor: "#f1f5f9",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: typeBadgeColor,
                          letterSpacing: "0.2px",
                        }}
                      >
                        {typeLabel}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style={{ padding: "32px 32px 24px 32px" }}>
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#166534",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Request Confirmed &amp; In Queue
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#0f172a",
                    letterSpacing: "-0.5px",
                    marginTop: "4px",
                  }}
                >
                  Reference #{referenceNumber}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    marginTop: "6px",
                    lineHeight: "1.5",
                  }}
                >
                  {greeting} We have received your prescription request and our dispensary team is reviewing it.
                </div>
              </div>

              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "24px",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        padding: "14px 20px",
                        borderBottom: "1px solid #e2e8f0",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#475569",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Patient Information
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "12px 20px 6px 20px",
                        fontSize: "13px",
                        color: "#64748b",
                        width: "40%",
                      }}
                    >
                      Patient Name:
                    </td>
                    <td
                      style={{
                        padding: "12px 20px 6px 0px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {patientName || "Valued Patient"}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6px 20px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      Phone:
                    </td>
                    <td
                      style={{
                        padding: "6px 20px 6px 0px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {phone}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6px 20px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      Email Notifications:
                    </td>
                    <td
                      style={{
                        padding: "6px 20px 6px 0px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {email}
                    </td>
                  </tr>
                  {dateOfBirth && (
                    <tr>
                      <td
                        style={{
                          padding: "6px 20px 12px 20px",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        Date of Birth:
                      </td>
                      <td
                        style={{
                          padding: "6px 20px 12px 0px",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a",
                        }}
                      >
                        {dateOfBirth}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "24px",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        padding: "14px 20px",
                        borderBottom: "1px solid #e2e8f0",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#475569",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      Prescription Details
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        padding: "12px 20px 6px 20px",
                        fontSize: "13px",
                        color: "#64748b",
                        width: "40%",
                      }}
                    >
                      Submission Method:
                    </td>
                    <td
                      style={{
                        padding: "12px 20px 6px 0px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {submissionMode === "PHOTOS"
                        ? `Prescription Photo Upload (${photoCount || 1} image${photoCount > 1 ? "s" : ""})`
                        : "Direct Medication / Rx Entry"}
                    </td>
                  </tr>

                  {type === "TRANSFER" && (
                    <>
                      {previousPharmacyName && (
                        <tr>
                          <td
                            style={{
                              padding: "6px 20px",
                              fontSize: "13px",
                              color: "#64748b",
                            }}
                          >
                            Transferring From:
                          </td>
                          <td
                            style={{
                              padding: "6px 20px 6px 0px",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#0f172a",
                            }}
                          >
                            {previousPharmacyName}
                            {previousPharmacyPhone ? ` (${previousPharmacyPhone})` : ""}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td
                          style={{
                            padding: "6px 20px",
                            fontSize: "13px",
                            color: "#64748b",
                          }}
                        >
                          Transfer Scope:
                        </td>
                        <td
                          style={{
                            padding: "6px 20px 6px 0px",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#0f172a",
                          }}
                        >
                          {transferAll
                            ? "All active prescriptions on file"
                            : "Specific medications listed"}
                        </td>
                      </tr>
                    </>
                  )}

                  {items && items.length > 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          padding: "10px 20px",
                          borderTop: "1px dashed #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#334155",
                            marginBottom: "8px",
                          }}
                        >
                          Requested Medications / Rx Numbers ({items.length}):
                        </div>
                        {items.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: "8px 12px",
                              backgroundColor: "#f8fafc",
                              borderRadius: "6px",
                              marginBottom: "6px",
                              fontSize: "13px",
                              color: "#1e293b",
                            }}
                          >
                            <strong>#{idx + 1}:</strong>{" "}
                            {item.rxNumber ? `Rx #${item.rxNumber}` : ""}{" "}
                            {item.medicationName ? `- ${item.medicationName}` : ""}
                            {item.notes ? ` (Note: ${item.notes})` : ""}
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td
                      style={{
                        padding: "8px 20px",
                        fontSize: "13px",
                        color: "#64748b",
                        borderTop: "1px solid #f1f5f9",
                      }}
                    >
                      Fulfillment Method:
                    </td>
                    <td
                      style={{
                        padding: "8px 20px 8px 0px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                        borderTop: "1px solid #f1f5f9",
                      }}
                    >
                      {fulfillmentDisplay}
                    </td>
                  </tr>

                  {fulfillmentMethod === "DELIVERY" && deliveryAddress && (
                    <tr>
                      <td
                        style={{
                          padding: "6px 20px",
                          fontSize: "13px",
                          color: "#64748b",
                        }}
                      >
                        Delivery Destination:
                      </td>
                      <td
                        style={{
                          padding: "6px 20px 6px 0px",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#0f172a",
                        }}
                      >
                        {deliveryAddress}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td
                      style={{
                        padding: "6px 20px 12px 20px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      Requested Timing:
                    </td>
                    <td
                      style={{
                        padding: "6px 20px 12px 0px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {readyTimingDisplay}
                    </td>
                  </tr>

                  {patientNotes && (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          padding: "10px 20px 14px 20px",
                          borderTop: "1px solid #f1f5f9",
                          fontSize: "13px",
                          color: "#475569",
                        }}
                      >
                        <div style={{ fontWeight: "700", marginBottom: "4px" }}>
                          Special Notes / Additional Requests:
                        </div>
                        <div
                          style={{
                            fontStyle: "italic",
                            backgroundColor: "#fffbeb",
                            border: "1px solid #fde68a",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            color: "#92400e",
                          }}
                        >
                          &quot;{patientNotes}&quot;
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div
                style={{
                  backgroundColor: "#eff6ff",
                  borderRadius: "12px",
                  border: "1px solid #bfdbfe",
                  padding: "18px 22px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#1e40af",
                    marginBottom: "8px",
                  }}
                >
                  What Happens Next?
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#1e3a8a",
                    lineHeight: "1.6",
                  }}
                >
                  1. Our licensed pharmacist reviews your submission in BC PharmaNet.<br />
                  {type === "TRANSFER" && (
                    <>
                      2. We contact your previous pharmacy to transfer your files securely.<br />
                    </>
                  )}
                  {type === "NEW_PRESCRIPTION" && (
                    <>
                      2. If you submitted a photo, please present the original paper copy when picking up.<br />
                    </>
                  )}
                  3. You will receive an email update as soon as your medication is packaged and ready.<br />
                  4. If our pharmacist has any clinical questions, we will call you directly at <strong>{phone}</strong>.
                </div>
              </div>

              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  color: "#ffffff",
                  marginBottom: "20px",
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#ffffff",
                          marginBottom: "4px",
                        }}
                      >
                        {pharmacyName}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#94a3b8",
                          marginBottom: "12px",
                        }}
                      >
                        {pharmacyAddress}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#cbd5e1",
                          lineHeight: "1.5",
                        }}
                      >
                        <strong>Dispensary Hours:</strong><br />
                        Monday – Friday: 9:00 AM – 5:00 PM<br />
                        Saturday &amp; Sunday: Closed
                      </div>
                    </td>
                    <td align="right" style={{ verticalAlign: "middle" }}>
                      <a
                        href={`tel:${cleanPhone}`}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                          padding: "12px 20px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "700",
                          textDecoration: "none",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Call {pharmacyPhone}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  textAlign: "center",
                  lineHeight: "1.5",
                  marginTop: "20px",
                }}
              >
                You received this email because you submitted a prescription request at iHealth Pharmacy Chilliwack.<br />
                Reference #{referenceNumber} &bull; Submitted {submittedAt || "Recently"}<br />
                &copy; {new Date().getFullYear()} iHealth Pharmacy. All rights reserved.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
