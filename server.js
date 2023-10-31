// 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;
// Cake That! Powder Eyeliner price_1NDgNJDRDZG7uUNLwrngXFnX;
//Gel Liner and Smudger price_1NDgNyDRDZG7uUNLS2HLk9xW;

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')(
  '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'
); //initialize stripe

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/checkout', async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({ price: item.id, quantity: item.quantity });
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.send(
    JSON.stringify({
      url: session.url, //send session to the front end
    })
  );
});

app.listen(4000, () => console.log('Listening on port 4000'));
// Example response
// res.send(JSON.stringify({ url: session }));
