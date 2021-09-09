import commerce from "../lib/commerce";

import ProductList from "../components/ProductList";

export async function getStaticProps() {
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products,
    },
  };
}

export default function ProductsPage({ products }) {
  return (
    <>
      <h1>Produtos</h1>

      <ProductList products={products} />
    </>
  );
}
