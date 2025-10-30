// Copyright (c) 2025 Dmitar Strbac
// Licensed under the Apache License, Version 2.0. See LICENSE file in the project root for full license information.

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import GeneratorForm from "./components/GeneratorForm";

export default function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(-45deg, #0f172a, #1e293b, #243756, #334155)",
          backgroundSize: "400% 400%",
          animation: "gradientMove 10s ease infinite",
          zIndex: 0,
        }}
      />

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#38bdf8" },
            links: {
              color: "#38bdf8",
              distance: 120,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 0.7,
              straight: false,
            },
            number: { value: 120, density: { enable: true, area: 800 } },
            opacity: { value: 0.8 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "sans-serif",
          padding: "3rem 1rem",
          paddingBottom: "5rem",
          zIndex: 2,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "rgba(30, 41, 59, 0.9)",
            padding: "2rem 2.5rem",
            borderRadius: "16px",
            boxShadow: "0 0 25px rgba(56, 189, 248, 0.25)",
            textAlign: "center",
            width: "min(600px, 90%)",
            maxWidth: "600px",
            backdropFilter: "blur(6px)",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              textShadow: "0 0 10px rgba(56,189,248,0.3)",
            }}
          >
            🎮 AI Game Idea Generator
          </h1>
          <GeneratorForm />
        </div>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
}
