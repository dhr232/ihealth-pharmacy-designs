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
  const badgeText = isAppointment ? "BOOKING ALERT" : "REFILL INTAKE";
  const badgeColor = isAppointment ? "#0369a1" : "#059669";
  const cleanPhone = patientPhone.replace(/[^0-9]/g, "");

  // Format Rx numbers display
  let rxDisplay = "Prescription Refill";
  if (refillType === "photo") {
    rxDisplay = "Photo Refill (WhatsApp / Upload)";
  } else if (Array.isArray(rxNumbers)) {
    rxDisplay = rxNumbers.length > 0 ? rxNumbers.join(", ") : "Online Rx Refill";
  } else if (typeof rxNumbers === "string" && rxNumbers.trim()) {
    rxDisplay = rxNumbers;
  }

  const fulfillmentDisplay =
    pickupOrDelivery.toLowerCase() === "delivery"
      ? "Delivery Requested (Free Abbotsford Delivery)"
      : "Pickup at Pharmacy Dispensary";

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
          {/* Staff Alert Header */}
          <tr>
            <td
              style={{
                backgroundColor: "#0f172a",
                padding: "24px 32px",
                borderBottom: `4px solid ${badgeColor}`,
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
                        Internal Staff Alert
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          backgroundColor: badgeColor,
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 700,
                          padding: "6px 12px",
                          borderRadius: "6px",
                          letterSpacing: "0.5px",
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
            <td
              style={{
                backgroundColor: "#f8fafc",
                padding: "20px 32px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td>
                      <h1
                        style={{
                          margin: 0,
                          fontSize: "20px",
                          lineHeight: "26px",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {alertTitle}
                      </h1>
                      <p
                        style={{
                          margin: "6px 0 0 0",
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#475569",
                        }}
                      >
                        Reference: <strong>{referenceId}</strong>
                        {submittedAt ? ` | Received: ${submittedAt}` : ""}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Main Body */}
          <tr>
            <td style={{ padding: "28px 32px" }}>
              {/* Patient Information Table Card */}
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#0369a1",
                    marginBottom: "14px",
                    borderBottom: "1px solid #e2e8f0",
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
                          width: "35%",
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
                          verticalAlign: "top",
                        }}
                      >
                        <a
                          href={`tel:${cleanPhone}`}
                          style={{ color: "#0369a1", textDecoration: "none" }}
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
                          verticalAlign: "top",
                        }}
                      >
                        <a
                          href={`mailto:${patientEmail}`}
                          style={{ color: "#0369a1", textDecoration: "none" }}
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
                            verticalAlign: "top",
                          }}
                        >
                          BC PHN
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#047857",
                            fontFamily: "Courier, monospace",
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

              {/* Service / Clinical Details Table Card */}
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
                    color: badgeColor,
                    marginBottom: "14px",
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "8px",
                  }}
                >
                  {isAppointment ? "Appointment Schedule" : "Prescription Refill Details"}
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
                              width: "35%",
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
                              verticalAlign: "top",
                            }}
                          >
                            Date
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
                              verticalAlign: "top",
                            }}
                          >
                            Time Slot
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
                                color: "#334155",
                                verticalAlign: "top",
                              }}
                            >
                              {reasonForVisit}
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
                              width: "35%",
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
                            {refillType === "photo"
                              ? "Prescription Photo Refill"
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
                            Fulfillment
                          </td>
                          <td
                            style={{
                              padding: "8px 0",
                              fontSize: "14px",
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

              {/* Staff Action Buttons */}
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
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
                            backgroundColor: "#0f172a",
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            padding: "12px 20px",
                            borderRadius: "6px",
                            textAlign: "center",
                          }}
                        >
                          Call Patient: {patientPhone}
                        </a>
                      </td>
                      {adminPortalUrl ? (
                        <td style={{ padding: "0 6px 12px 6px" }}>
                          <a
                            href={adminPortalUrl}
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
                            Open Admin Portal
                          </a>
                        </td>
                      ) : null}
                    </tr>
                  </tbody>
                </table>
              </div>
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
