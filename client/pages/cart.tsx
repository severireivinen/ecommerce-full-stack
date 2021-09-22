import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import CustomerCart from "../components/CustomerCart";

const Cart = () => {
  return (
    <div>
      <Head>
        <title>Cool Kidz</title>
        <meta name="description" content="Browse cool clothes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <CustomerCart />
      </main>
    </div>
  );
};

export default Cart;
