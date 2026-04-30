import Stripe from "stripe";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

//Initilize Stripe Pay
const stripe = new Stripe(process.env.STRIPE_SECREAT_KEY);

//Creating an amount map
const CREDIT_MAP = {
  100: 75,
  200: 150,
  500: 300,
};

//Creating a credits orders
export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId; // Sending the userId by Auth
    const { amount } = req.body; // Getting the amount from the request body
    if (!CREDIT_MAP[amount]) {
      // Validating the credit amout
      return res.status(400).json({
        message: "Invalid Credit Plan",
      });
    }

    //Creating the sessions for checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "upi"],
      //Creating urls for success and failure
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        credits: CREDIT_MAP[amount],
      },
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Stripe Error" });
  }
};

//Constructing stripe webhooks
export const stripeWebhook = async (req, res) => {
  //Sending a signature req headers
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECREAT,
    );
  } catch (error) {
    console.log("❌ Webhook signature error: ", error.message);
    return res.status(400).send("Webhook Error");
  }
  //Comparing the event type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const creditsToAdd = Number(session.metadata.credits);

    if (!userId || creditsToAdd) {
      return res.status(400).json({ message: "Invalid Metadata" });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $inc: { credits: creditsToAdd },
        $set: { isCreditAvailable: true },
      },
      { new: true },
    );
  }
  res.json({ recieved: true });
};
