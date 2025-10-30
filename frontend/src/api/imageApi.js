export async function generateImage(prompt) {
  const res = await fetch("http://127.0.0.1:8000/api/image/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate image");
  }

  return res.json();
}
