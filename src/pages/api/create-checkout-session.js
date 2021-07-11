// This is backend code
const secretKey = process.env.STRIPE_SECRET_KEY.toString()
const stripe = require("stripe")(secretKey);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1JBYKbJ9biq6C6RbKC3L3NgA'],
        shipping_address_collection: {
            allowed_countries: ['CA', 'US', 'GB']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST.toString()}/success`,
        cancel_url: `${process.env.HOST.toString()}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)),

        },
    })
    res.status(200).json({id: session.id})
};
