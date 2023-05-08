async function handler(req) {
  try {
    const response = await fetch(req.url, {
      method: req.method ? req.method : "GET",
      body: req.body ? JSON.stringify(req.body) : null,
      headers:
        req.method === "POST" ? { "Content-Type": "application/json" } : {},
    });
    if (!response.ok) {
      throw new Error("Unsuccesful Execution!");
    }
    const data = await response.json();
    return { status: true, statusText: "Successful", data };
  } catch (err) {
    return { status: false, statusText: err.message };
  }
}

export default handler;
