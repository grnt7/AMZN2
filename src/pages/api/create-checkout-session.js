/*const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
          description: item.description, // Correct placement of description inside product data
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



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === 'POST') { // Important: Only handle POST requests
    try {
      const { items, email } = req.body;

      console.log('Received items:', items);
      console.log('Received email:', email);

      const transformedItems = items.map((item) => ({
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.description,
          },
        },
      }));

      // Determine base URL dynamically, but more robustly for server-side
      let baseUrl;
        if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`; // Vercel
        } else if (process.env.NODE_ENV === 'development') {
            baseUrl = 'http://localhost:3000'; // Local dev
        } else {
            baseUrl = 'https://amzn-2-yxyh.vercel.app/'; // **Important:  Set this!**
        }


      const session = await stripe.checkout.sessions.create({
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
        success_url: `${baseUrl}/success`, // Use the dynamic baseUrl
        cancel_url: `${baseUrl}/cancel`,   // Use the dynamic baseUrl
        metadata: {
          email: email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });

      console.log('Stripe session created:', session);

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed'); // Handle non-POST requests
  }
};
