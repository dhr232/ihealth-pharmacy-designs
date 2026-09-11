import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "iHealth Pharmacy — Abbotsford Dispensary";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow backgrounds */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(13,148,136,0.25) 0%, rgba(9,13,22,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-120px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,29,22,0.22) 0%, rgba(9,13,22,0) 70%)",
          }}
        />

        {/* Top Header Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "18px",
                backgroundColor: "#C01D16",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "26px",
                fontWeight: "900",
                boxShadow: "0 10px 25px rgba(192,29,22,0.4)",
              }}
            >
              iH
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.5px" }}>
                iHealth <span style={{ color: "#94a3b8", fontSize: "22px", fontWeight: "600" }}>PHARMACY</span>
              </span>
              <span style={{ fontSize: "14px", color: "#2dd4bf", fontWeight: "700" }}>
                Abbotsford Dispensary
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(13,148,136,0.15)",
              border: "1px solid rgba(45,212,191,0.3)",
              padding: "10px 22px",
              borderRadius: "999px",
              color: "#2dd4bf",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            BC MSP Covered Prescribing
          </div>
        </div>

        {/* Center Main Headline & Value Props */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "44px",
              fontWeight: "900",
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            <span>Care that knows your name,</span>
            <span style={{ color: "#f43f5e" }}>today and tomorrow.</span>
          </div>

          <p style={{ fontSize: "20px", color: "#94a3b8", margin: 0, maxWidth: "850px", lineHeight: 1.4 }}>
            Independent community healthcare in Abbotsford. Fast refills, 21 prescribable minor ailments on walk-in, and free same-day delivery.
          </p>

          {/* Service Feature Badges */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
            {["21 Minor Ailments", "Fast Prescription Refills", "Free Local Delivery", "Blister Packaging"].map(
              (service) => (
                <div
                  key={service}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "14px",
                    padding: "10px 18px",
                    color: "#f1f5f9",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  {service}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Contact / Location Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#cbd5e1", fontSize: "16px", fontWeight: "600" }}>
            <span>#105 - 2825 Clearbrook Rd, Abbotsford, BC</span>
            <span>·</span>
            <span>(604) 853-1893</span>
          </div>

          <div style={{ color: "#2dd4bf", fontSize: "15px", fontWeight: "700" }}>
            booking.ihealthpharmacy.ca
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
