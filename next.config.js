module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    stripe_private_key: process.env.STRIPE_PRIVATE_KEY,
    host_url: process.env.HOST
  }
};
