export default function Product({ name, price }) {
  return (
    <>
      {name}: {price.formatted_with_symbol}
    </>
  );
}
