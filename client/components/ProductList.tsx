import React from "react";
import useAuthorizedCustomer from "../hooks/useAuthorizedCustomer";
import useProducts from "../hooks/useProducts";
import Product from "./Product";

const ProductList = () => {
  const { products } = useProducts();
  const { authorizedCustomer } = useAuthorizedCustomer();

  if (!products) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center p-10  h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
