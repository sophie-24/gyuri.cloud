import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "김규리 · Backend Engineer Portfolio";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafafa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#2563eb",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#2563eb",
                display: "flex",
              }}
            />
            BACKEND ENGINEER
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -4,
              color: "#0f172a",
            }}
          >
            <span>From data</span>
            <span>
              to <span style={{ color: "#2563eb" }}>dependable</span> products.
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* next/og는 기본적으로 라틴 글리프만 내장한다. 한글을 넣으면 폰트를
              동적으로 받아와야 하고, 실패하면 네모 박스로 렌더링된다.
              공유 썸네일이 깨지지 않도록 라틴/숫자만 사용한다. */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              "Latency 6s to 2s",
              "Accuracy 60% to 87%",
              "Simulation 10s to 0.2s",
            ].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  borderRadius: 999,
                  background: "#0f172a",
                  color: "#fff",
                  padding: "12px 22px",
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "2px solid #e2e8f0",
              paddingTop: 24,
            }}
          >
            <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#0f172a" }}>
              Gyuri Kim
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#64748b" }}>
              Spring Boot · FastAPI · AWS
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
