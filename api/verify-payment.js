// api/verify-payment.js — Sin dependencias externas
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

  try {
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });

    const session = await response.json();

    if (session.error) {
      return res.status(400).json({ error: session.error.message });
    }

    return res.status(200).json({
      paid: session.payment_status === "paid",
      planLabel: session.metadata?.planLabel || "",
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({ error: error.message });
  }
}
