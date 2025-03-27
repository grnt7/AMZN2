const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const { items, email } = req.body;

    console.log('Received items:', items);//debugging purposes
    console.log('Received email:', email);//debugging purposes

    

    const transformedItems = items.map((item) => ({
      quantity: 1, // Or the quantity of the item
      price_data: {
        currency: "gbp", // Or "gbp", "eur", etc.
        unit_amount: item.price * 100, // Amount in cents/pence, etc.
        product_data: {
          name: item.title,
          images: [item.image], // Image URLs
          description: item.description, // Correct placement of description
        },
      },
    }));
  

    const session = await stripe.checkout.sessions.create({ // Session
      payment_method_types: ["card"],
  shipping_options: [
    {
      shipping_rate: "shr_1R6ItUQGrGrbIdsAkd5aQNWl",
    },
  ],
  shipping_address_collection: {
    allowed_countries: ["US", "GB", "CA"],
  },
  line_items: transformedItems,
  mode: "payment",
  success_url: `${process.env.HOST}/success`,
  cancel_url: `${process.env.HOST}/checkout`,
  metadata: {
    email: email,
    images: JSON.stringify(items.map((item) => item.image)),
      }
    })

    console.log('Stripe session created:', session);

    res.status(200).json({ id: session.id }); // changed Id to id
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message }); // Send error message to client
  }
};




/*
testing for the checkout page
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Test Product',
            },
            unit_amount: 1000, // 10.00 GBP
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe error (Minimal Test):', error);
    res.status(500).json({ error: error.message });
  }
};





const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const { items, email } = req.body;

    console.log('Received items:', items);//debugging purposes
    console.log('Received email:', email);//debugging purposes

    

    const transformedItems = items.map(item => ({
      quantity: 1, // Or the quantity of the item
      description: item.description, // add description here.
      price_data: {
        currency: "gbp", // Or "gbp", "eur", etc.
        unit_amount: item.price * 100, // Amount in cents/pence, etc.
        product_data: {
          name: item.title,
          images: [item.image], // Image URLs
        },
      },
     
    }));
  

    const session = await stripe.checkout.sessions.create({ // Session
      payment_method_types: ["card"],
  shipping_options: [
    {
      shipping_rate: "shr_1R6ItUQGrGrbIdsAkd5aQNWl",
    },
  ],
  shipping_address_collection: {
    allowed_countries: ["US", "GB", "CA"],
  },
  line_items: transformedItems,
  mode: "payment",
  success_url: `${process.env.HOST}/success`,
  cancel_url: `${process.env.HOST}/checkout`,
  metadata: {
    email: email,
    images: JSON.stringify(items.map((item) => item.image)),
      }
    })

    console.log('Stripe session created:', session);

    res.status(200).json({ id: session.id }); // changed Id to id
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message }); // Send error message to client
  }
};








*/