import React from "react";

export default function ImageVisualizer({ image }) {
  if (!image) return null;

  return (
    <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
      <img
        src={image.image_url}
        alt="AI generated level"
        style={{
          maxWidth: "100%",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(56,189,248,0.3)",
        }}
      />
      {image.note && (
        <p style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "0.5rem" }}>
          {image.note}
        </p>
      )}
    </div>
  );
}
