import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const alt = "EMILIA // 2D Cel-Shaded Artist & Illustrator Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#0d0e12",
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 15%, transparent 16%)",
          backgroundSize: "16px 16px",
          border: "10px solid #000000",
          padding: "48px 56px",
          position: "relative",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top-Right Stylized Watermark Pill */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "48px",
            display: "flex",
            backgroundColor: "#00E5FF",
            color: "#000000",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0px #000000",
            padding: "6px 18px",
            fontSize: "14px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          OFFICIAL ART ARCHIVE
        </div>

        {/* Left Column: Bold Typography & Identity */}
        <div
          style={{
            flex: 1.15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: "40px",
          }}
        >
          {/* Top Section */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Status Pill */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#00FF66",
                color: "#000000",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                marginBottom: "28px",
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#000000",
                  marginRight: "10px",
                }}
              />
              COMMISSIONS OPEN // Q4
            </div>

            {/* Artist Brand Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "64px",
                fontWeight: "900",
                lineHeight: "1.0",
                letterSpacing: "-1px",
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              EMILIA // <span style={{ color: "#FFE600", marginLeft: "14px" }}>2D CEL ARTIST</span>
            </div>

            {/* Tagline Subtext */}
            <div
              style={{
                display: "flex",
                backgroundColor: "#FFE600",
                color: "#000000",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                padding: "12px 18px",
                fontSize: "16px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "18px",
              }}
            >
              High-Octane 2D Character Art, Manga Sequences &amp; Commercial Covers
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "16px",
                color: "#A0A0A0",
                lineHeight: "1.5",
              }}
            >
              Expressive 2D cel-shading with bold black vector inks, dynamic perspective, and vibrant neo-brutalist palettes.
            </div>
          </div>

          {/* Bottom Footer Channel Meta */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1c1d24",
                border: "3px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#00E5FF",
                letterSpacing: "1px",
                marginRight: "14px",
              }}
            >
              DISCORD: emilia_art#0001
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FF1493",
                color: "#ffffff",
                border: "3px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              300 DPI PRINT MASTERS
            </div>
          </div>
        </div>

        {/* Right Column: Comic Panel Showcase Frame */}
        <div
          style={{
            flex: 0.85,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Cyan Shadow Offset Frame */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "24px",
              right: "4px",
              bottom: "4px",
              backgroundColor: "#00E5FF",
              border: "4px solid #000000",
              display: "flex",
            }}
          />

          {/* Main Comic Showcase Card */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "#16171d",
              border: "5px solid #000000",
              boxShadow: "8px 8px 0px #000000",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Comic Header Ribbon */}
            <div
              style={{
                backgroundColor: "#FFE600",
                color: "#000000",
                borderBottom: "4px solid #000000",
                padding: "10px 18px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "900",
                fontSize: "15px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <div style={{ display: "flex" }}>KEYFRAME PANEL #01</div>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  padding: "2px 8px",
                  fontSize: "11px",
                }}
              >
                PRO GRADE
              </div>
            </div>

            {/* Inner Graphic Preview Block */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#101116",
                padding: "24px",
                position: "relative",
              }}
            >
              {/* Comic Action Badge */}
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  backgroundColor: "#FF1493",
                  border: "4px solid #000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "72px",
                  fontWeight: "900",
                  color: "#FFE600",
                  boxShadow: "6px 6px 0px #000000",
                  transform: "rotate(-6deg)",
                  marginBottom: "20px",
                }}
              >
                E
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                CYBER RONIN // REKKA
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#00E5FF",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginTop: "6px",
                }}
              >
                FULL VECTOR CEL INKS
              </div>
            </div>

            {/* Bottom Panel Strip */}
            <div
              style={{
                borderTop: "4px solid #000000",
                backgroundColor: "#ffffff",
                color: "#000000",
                padding: "8px 16px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                fontWeight: "800",
                textTransform: "uppercase",
              }}
            >
              <div style={{ display: "flex" }}>PORTFOLIO SPEC: 300 DPI</div>
              <div style={{ display: "flex", color: "#FF1493" }}>[ VERIFIED ORIGINAL ]</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
