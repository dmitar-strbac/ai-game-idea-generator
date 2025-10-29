import { useState } from "react";

export default function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result);
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

          {result.layout && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${result.layout[0].length}, 25px)`,
                gap: "3px",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              {result.layout.flat().map((cell, i) => (
                <div
                  key={i}
                  style={{
                    width: 25,
                    height: 25,
                    background: cell === 1 ? "#38bdf8" : "#1e293b",
                    borderRadius: "3px",
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
