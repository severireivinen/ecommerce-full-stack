import { NextPage } from "next";
import React from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const Products: NextPage = () => {
  return (
    <div>
      <Header />
      <ProductList />
    </div>
  );
};

export default Products;
