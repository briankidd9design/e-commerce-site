import { stripe } from "src/utils/stripe";

export default function Product() {
  return <div>product</div>;
}
// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
export async function getStaticPaths({ product }) {
  console.log(product);
  const inventory = await stripe.products.list();
  const paths = inventory.data.map((product) => ({
    params: { id: product.id },
  }));
  // https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
  // Incremental Static Regeneration
  // Incremental Static Regeneration (ISR) enables you to:
  // Update static content without rebuilding the entire site
  // Reduce server load by serving prerendered, static pages for most requests
  // Ensure proper cache-control headers are automatically added to pages
  // Handle large amounts of content pages without long next build times
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const inventory = await stripe.products.list({
    // when we expand the data dot price, extra data about the price is loaded on the data object
    expand: ["data.default_price"],
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
  // find an individual project based off its ID
  const product = products.find((product) => product.id === params.id);

  return {
    props: {
      product,
    },
    // sixty seconds times sixty minutes
    revalidate: 60 * 60,
  };
}
