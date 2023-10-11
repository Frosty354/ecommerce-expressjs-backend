// routes/payment.js

const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripe'); // Import the Stripe module

// Endpoint to handle payment confirmation (e.g., webhook or client-side confirmation)
router.post('/create-payment-intent', async (req, res) => {
  try {
    
    const { paymentIntentId } = req.body;

    // Confirm the payment intent
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    // Handle the payment confirmation logic (e.g., update order status)
    // ...

    // Respond with a success message
    res.status(200).json({ message: 'Payment confirmed successfully' });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Payment confirmation failed' });
  }
});

module.exports = router;
