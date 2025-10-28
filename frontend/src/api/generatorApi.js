export async function generateIdea(prompt) {
  const res = await fetch("http://localhost:8000/api/generator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from backend");
  }

  return res.json();
}
