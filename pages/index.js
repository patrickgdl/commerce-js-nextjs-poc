import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import commerce from "../lib/commerce";

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();

  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      categories,
      products,
    },
  };
}

export default function IndexPage({ merchant, categories, products }) {
  return (
    <>
      <h1>{merchant.business_name}</h1>

      <h3>Categorias</h3>
      <CategoryList categories={categories} />

      <hr />

      <h3>Produtos</h3>
      <ProductList products={products} />
    </>
  );
}
