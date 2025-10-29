import { useState } from "react";
import LayoutVisualizer from "./LayoutVisualizer";
import ImageVisualizer from "./ImageVisualizer";
import { generateImage } from "../api/imageApi";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setImage(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result);

      const imgData = await generateImage(prompt);
      setImage(imgData.image);
    } catch (err) {
      console.error(err);
      setResult("❌ Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        background: "#243756ff",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <form onSubmit={handleGenerate}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. "2D cyberpunk platformer with crafting system"'
          rows={4}
          style={{
            width: "calc(100% - 1rem)",
            margin: "0 auto",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "monospace",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "12px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: loading ? "#64748b" : "#38bdf8",
            color: "#000",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Idea"}
        </button>
      </form>

      {result && (
        <>
          <h3
            style={{
              color: "#38bdf8",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            📄 Phase 1 — Textual Game Idea (JSON)
          </h3>

          <pre
            style={{
              marginTop: "20px",
              background: "#0f172a",
              color: "#a5f3fc",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "left",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>

          <h3
            style={{
            color: "#38bdf8",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            fontWeight: "600",
            fontSize: "1.1rem",
            }}
          >
            🧩 Phase 2 — Layout Visualization (Grid)
          </h3>
          <LayoutVisualizer layout={result.layout} />
          
          <h3
            style={{
              color: "#38bdf8",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            🖼️ Phase 3 — Generated Level Preview (AI Image)
          </h3>
          <ImageVisualizer image={image} />
        </>
      )}
    </div>
  );
}
