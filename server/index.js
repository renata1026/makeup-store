import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripeLibrary from 'stripe';

const stripe = new stripeLibrary(process.env.STRIPE_SECRET_KEY);
console.log(
  'Stripe API Key:',
  'sk_test_51KXLsbDRDZG7uUNLQH7GhFfVlhGB2HghmuXlPfSeKCK68BK8SV7K5gfMTdqrA5y86ZvTLUtDELtqHcWrjtkBowcj00vsta1pjY'
);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post('/payment', async (req, res) => {
  let { amount, id } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log('Payment', paymentIntent);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      error: error.message,
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
