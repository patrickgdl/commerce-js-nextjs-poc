import React from "react";

import commerce from "../../lib/commerce";
import { useCartDispatch } from "../../context/cart";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export default function ProductPage({ product }) {
  const { setCart } = useCartDispatch();

  const addToCart = () => {
    commerce.cart.add(product.id).then(({ cart }) => {
      alert(`${product.id} adicionado ao carrinho`);

      setCart(cart);
    });
  };

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <p>{product.price.formatted_with_symbol}</p>
      <button onClick={addToCart}>Add ao carrinho</button>

      <Link href={"/cart"}>
        <button>Ir ao carrinho</button>
      </Link>
    </React.Fragment>
  );
}
