import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#FFE600",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
          border: "2.5px solid #000000",
          fontWeight: 900,
          fontFamily: "sans-serif",
          boxShadow: "2px 2px 0px #000000",
        }}
      >
        E
      </div>
    ),
    {
      ...size,
    }
  );
}
