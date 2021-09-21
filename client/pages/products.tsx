import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const Products: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cool Kidz</title>
        <meta name="description" content="Browse cool clothes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default Products;
