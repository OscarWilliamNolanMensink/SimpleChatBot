// src/api/endpoints.ts

export async function getEndpointData() {
  const res = await fetch("http://localhost:8000", {
    method: "GET",
    headers: { "Accept": "application/json" }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Endpoint error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data; // raw JSON response
}
