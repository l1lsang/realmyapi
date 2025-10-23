export default async function handler(req, res) {
  try {
    const targetUrl = "https://api.publicapis.org/entries";
    const response = await fetch(targetUrl);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy fetch failed", details: error.message });
  }
}
