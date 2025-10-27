// Copyright (c) 2025 Dmitar Strbac
// Licensed under the Apache License, Version 2.0. See LICENSE file in the project root for full license information.

import GeneratorForm from "./components/GeneratorForm";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "2rem 2.5rem",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          textAlign: "center",
          width: "min(600px, 90%)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          🎮 AI Game Idea Generator
        </h1>
        <GeneratorForm />
      </div>
    </div>
  );
}
