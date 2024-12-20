import { stripe } from "src/utils/stripe";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query.id;
    try {
      if (!id.startsWith("cs_")) {
        throw Error("Incorrect CheckoutSession ID.");
      }
      const checkout_session = await stripe.checkout.sessions.retrieve(id);
      console.log(checkout_session);
      res.status(200).json(checkout_session);
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "Get");
    res.status(405).end("Method not allowed");
  }
}
