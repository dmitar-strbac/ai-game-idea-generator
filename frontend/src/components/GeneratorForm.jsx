import { useState } from "react";
import { generateIdea } from "../api/generatorApi";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const data = await generateIdea(prompt);
      setResult(data.result || JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
      setResult("❌ Error connecting to backend.");
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
      <form onSubmit={handleSubmit}>
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
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
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
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}
