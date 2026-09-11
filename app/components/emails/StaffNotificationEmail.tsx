/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export interface StaffNotificationEmailProps {
  notificationType: "appointment" | "refill";
  referenceId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientPhn?: string;
  patientDob?: string;
  patientGender?: string;

  // Appointment specific fields
  serviceName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  duration?: string;
  partySize?: number;
  reasonForVisit?: string;

  // Refill specific fields
  refillType?: "rx_numbers" | "photo" | "transfer" | string;
  rxNumbers?: string[] | string;
  pickupOrDelivery?: "pickup" | "delivery" | string;
  deliveryAddress?: string;
  refillNotes?: string;

  // Meta
  submittedAt?: string;
  adminPortalUrl?: string;
}

export function StaffNotificationEmail({
  notificationType,
  referenceId,
  patientName,
  patientPhone,
  patientEmail,
  patientPhn,
  patientDob,
  patientGender,
  serviceName,
  appointmentDate,
  appointmentTime,
  duration = "15 minutes",
  partySize = 1,
  reasonForVisit,
  refillType = "rx_numbers",
  rxNumbers,
  pickupOrDelivery = "pickup",
  deliveryAddress,
  refillNotes,
  submittedAt,
  adminPortalUrl = "https://ihealthpharmacy.ca/admin/appointments",
}: StaffNotificationEmailProps) {
  const isAppointment = notificationType === "appointment";
  const alertTitle = isAppointment ? "New Appointment Booking" : "New Prescription Refill Request";
  const badgeText = isAppointment ? "BOOKING INTAKE" : "REFILL INTAKE";
  const cleanPhone = (patientPhone || "").replace(/[^0-9]/g, "");

  // Format Rx numbers display
  let rxDisplay = "Prescription Refill";
  if (refillType === "photo") {
    rxDisplay = "Photo Refill (WhatsApp / Prescription Upload)";
  } else if (refillType === "transfer") {
    rxDisplay = "Prescription Transfer Request";
  } else if (Array.isArray(rxNumbers)) {
    rxDisplay = rxNumbers.length > 0 ? rxNumbers.join(", ") : "Online Rx Refill";
  } else if (typeof rxNumbers === "string" && rxNumbers.trim()) {
    rxDisplay = rxNumbers;
  }

  const fulfillmentDisplay =
    (pickupOrDelivery || "pickup").toLowerCase() === "delivery"
      ? "Delivery Requested (Free Abbotsford Delivery)"
      : "Pickup at Pharmacy Dispensary";

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
                backgroundColor: isAppointment ? "#0284c7" : "#059669",
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
                                  color: isAppointment ? "#0284c7" : "#059669",
                                  marginTop: "3px",
                                }}
                              >
                                Dispensary Clinical Team
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
                          backgroundColor: isAppointment ? "#f0f9ff" : "#ecfdf5",
                          color: isAppointment ? "#0369a1" : "#065f46",
                          border: `1px solid ${isAppointment ? "#bae6fd" : "#a7f3d0"}`,
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          padding: "5px 12px",
                          borderRadius: "9999px",
                        }}
                      >
                        {badgeText}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Title Banner */}
          <tr>
            <td style={{ padding: "28px 28px 12px 28px" }}>
              <h1
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "22px",
                  lineHeight: "28px",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.3px",
                }}
              >
                {alertTitle}
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#64748b",
                }}
              >
                Reference: <strong style={{ color: "#0f172a" }}>{referenceId}</strong>
                {submittedAt ? ` | Received: ${submittedAt}` : ""}
              </p>
            </td>
          </tr>

          {/* Patient Demographics Card */}
          <tr>
            <td style={{ padding: "12px 28px" }}>
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
                    color: "#0284c7",
                    marginBottom: "14px",
                    borderBottom: "1px solid #f1f5f9",
                    paddingBottom: "8px",
                  }}
                >
                  Patient Demographics
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
                          width: "38%",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        Full Name
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        {patientName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        Telephone
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        <a
                          href={`tel:${cleanPhone}`}
                          style={{ color: "#0284c7", textDecoration: "none", fontWeight: 700 }}
                        >
                          {patientPhone}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#64748b",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        Email Address
                      </td>
                      <td
                        style={{
                          padding: "8px 0",
                          fontSize: "14px",
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          verticalAlign: "top",
                        }}
                      >
                        <a
                          href={`mailto:${patientEmail}`}
                          style={{ color: "#0284c7", textDecoration: "none" }}
                        >
                          {patientEmail}
                        </a>
                      </td>
                    </tr>

                    {patientPhn ? (
                      <tr>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          BC CareCard / PHN
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#047857",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            letterSpacing: "1px",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          {patientPhn}
                        </td>
                      </tr>
                    ) : null}

                    {patientDob ? (
                      <tr>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          Date of Birth
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "14px",
                            color: "#0f172a",
                            borderBottom: "1px solid #f1f5f9",
                            verticalAlign: "top",
                          }}
                        >
                          {patientDob}
                        </td>
                      </tr>
                    ) : null}

                    {patientGender ? (
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
                          Gender
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "14px",
                            color: "#0f172a",
                            verticalAlign: "top",
                          }}
                        >
                          {patientGender}
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          {/* Clinical / Intake Details Card */}
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
                    color: isAppointment ? "#0284c7" : "#059669",
                    marginBottom: "14px",
                    borderBottom: "1px solid #f1f5f9",
                    paddingBottom: "8px",
                  }}
                >
                  {isAppointment ? "Appointment Schedule" : "Prescription Order Details"}
                </div>

                <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                  <tbody>
                    {isAppointment ? (
                      <>
                        <tr>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              width: "38%",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            Service Name
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#0f172a",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            {serviceName || "Clinical Consultation"}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            Scheduled Date
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#0f172a",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            {appointmentDate || "Scheduled Date"}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            Time Slot
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#0284c7",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            {appointmentTime || "Scheduled Time"}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            Duration / Party
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "14px",
                              color: "#0f172a",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            {duration}
                            {partySize > 1 ? ` | ${partySize} Patients` : ""}
                          </td>
                        </tr>

                        {reasonForVisit ? (
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
                              Reason for Visit
                            </td>
                            <td
                              style={{
                                padding: "8px 0",
                                fontSize: "13px",
                                fontStyle: "italic",
                                color: "#334155",
                                verticalAlign: "top",
                              }}
                            >
                              &quot;{reasonForVisit}&quot;
                            </td>
                          </tr>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              width: "38%",
                              borderBottom: "1px solid #f1f5f9",
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
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            {refillType === "photo"
                              ? "Prescription Photo Refill"
                              : refillType === "transfer"
                              ? "Prescription Transfer"
                              : "Prescription Number Refill"}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            Rx Details
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
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
                              padding: "8px 0",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#64748b",
                              borderBottom: "1px solid #f1f5f9",
                              verticalAlign: "top",
                            }}
                          >
                            Fulfillment
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "14px",
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
                                padding: "8px 0",
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
                                padding: "8px 0",
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

                        {refillNotes ? (
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
                              Patient Notes
                            </td>
                            <td
                              style={{
                                padding: "8px 0",
                                fontSize: "13px",
                                fontStyle: "italic",
                                color: "#334155",
                                verticalAlign: "top",
                              }}
                            >
                              &quot;{refillNotes}&quot;
                            </td>
                          </tr>
                        ) : null}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          {/* Staff Action Buttons */}
          <tr>
            <td style={{ padding: "8px 28px 24px 28px", textAlign: "center" }}>
              <table
                align="center"
                border={0}
                cellPadding={0}
                cellSpacing={0}
                style={{ margin: "0 auto" }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "0 6px 8px 6px" }}>
                      <a
                        href={`tel:${cleanPhone}`}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#0f172a",
                          color: "#ffffff",
                          fontSize: "13px",
                          fontWeight: 700,
                          textDecoration: "none",
                          padding: "12px 20px",
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        Call Patient: {patientPhone}
                      </a>
                    </td>
                    {adminPortalUrl ? (
                      <td style={{ padding: "0 6px 8px 6px" }}>
                        <a
                          href={adminPortalUrl}
                          style={{
                            display: "inline-block",
                            backgroundColor: isAppointment ? "#0284c7" : "#059669",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            padding: "12px 20px",
                            borderRadius: "8px",
                            textAlign: "center",
                          }}
                        >
                          Open Admin Portal
                        </a>
                      </td>
                    ) : null}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Regulatory & Privacy Notice */}
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
              <p style={{ margin: "0 0 4px 0", fontWeight: 700, color: "#475569" }}>
                Confidential Dispensary Intake Notice
              </p>
              <p style={{ margin: 0 }}>
                This notification contains protected patient health information governed by the
                British Columbia Personal Information Protection Act (PIPA) and College of
                Pharmacists of BC regulatory standards. If you are not an authorized member of
                iHealth Pharmacy dispensary staff, please notify security immediately.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StaffNotificationEmail;
