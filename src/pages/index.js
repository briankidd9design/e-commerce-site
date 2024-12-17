import ProductCard from "src/components/ProductCard";
import { stripe } from "src/utils/stripe";

export default function Home({ products }) {
  // console.log(products);
  // const allProducts = products.data;
  // console.log("All Products");
  // console.log(allProducts);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
      <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products.map((product, index) => (
          <ProductCard product={product} key={product.id} index={index} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // const products = await stripe.products.list({
  const inventory = await stripe.products.list({
    // when we expand the data dot price, extra data about the price is loaded on the data object
    expand: ["data.default_price"],
    limit: 8,
  });
  const products = inventory.data.map((product) => {
    const price = product.default_price;

    return {
      currency: price.currency,
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      image: product.images[0],
    };
  });
  return {
    props: {
      products: products,
    },
  };
}
