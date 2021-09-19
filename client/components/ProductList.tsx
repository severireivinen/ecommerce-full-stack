import React from "react";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

const ProductList = () => {
  const { products } = useProducts();

  if (!products) {
    return <div>Loading</div>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: any) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
