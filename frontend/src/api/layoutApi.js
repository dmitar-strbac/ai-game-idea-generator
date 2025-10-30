export async function generateLayout(prompt) {
  const res = await fetch("http://127.0.0.1:8000/api/generate-layout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  return res.json();
}
