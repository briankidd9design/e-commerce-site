// CommonJS instead of ES Modules
const Stripe = require("stripe");
const products = require("./products");

const stripe = Stripe(
  "sk_test_51QV1H4CDfvagoW73gsKtLuS4QkW4M4UIM9nn3vUhEGush0NYCmORLQjksplgh8VM9MPP7hcq4wbzSMK3Sk8unuUd00rP83klcO"
);

// IIFE (Immediately Invoked Function Expression) is an automatically invoked function expression

(async () => {
  for (const product of products) {
    const stripeProduct = await stripe.products.create({
      name: product.name,
      default_price_data: {
        currency: product.currency,
        unit_amount_decimal: product.price,
      },
      images: [product.image],
    });
    // console.log(stripeProduct.name, ";", stripeProduct.id, ";", product.image);
  }
})();
