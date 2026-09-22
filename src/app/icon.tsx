import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "4px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "flex-start",
            fontFamily: "sans-serif",
            fontWeight: 900,
            fontSize: 18,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          GS
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#e63946",
              marginLeft: 1,
              marginTop: 3,
              flexShrink: 0,
            }}
          />
        </span>
      </div>
    ),
    { ...size }
  );
}
