// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

const stripePay = async (req, res) => {
  const { items } = req.body;
  const calculateOrderAmount = (items) => {
    return 1400;
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = stripePay;
