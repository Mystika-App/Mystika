// api/create-checkout.js — Sin dependencias externas, usa fetch nativo
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { priceId, planLabel } = req.body;
  if (!priceId) return res.status(400).json({ error: "Missing priceId" });

  const origin = req.headers.origin || "https://" + req.headers.host;

  const params = new URLSearchParams({
    "payment_method_types[0]": "card",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    "mode": "payment",
    "success_url": `${origin}/?session_id={CHECKOUT_SESSION_ID}&plan=${encodeURIComponent(planLabel)}`,
    "cancel_url": `${origin}/`,
    "locale": "es",
    "metadata[planLabel]": planLabel,
  });

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    return res.status(200).json({ url: data.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: error.message });
  }
}
