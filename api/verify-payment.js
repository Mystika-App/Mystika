// api/verify-payment.js — Verifica que el pago se completó antes de abrir el chat
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing sessionId" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return res.status(200).json({
        paid: true,
        planLabel: session.metadata?.planLabel || "",
      });
    } else {
      return res.status(200).json({ paid: false });
    }
  } catch (error) {
    console.error("Stripe verify error:", error);
    return res.status(500).json({ error: error.message });
  }
}
