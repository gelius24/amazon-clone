// This is backend code
const stripe = require("stripe")(process.env.stripe_private_key);

export default async (req, res) => {
  const { items, email } = req.rawBody;

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
        success_url: `${process.env.host}/success`,
        cancel_url: `${process.env.host}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))

        }
    })
    res.status(200).json({id: session.id})
};
