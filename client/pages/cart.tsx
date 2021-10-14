import type { NextPage } from "next";
import Cart from "../components/Cart";
import Layout from "../layout/Layout";

const CustomerCart: NextPage = () => {
  return (
    <Layout>
      <Cart />
    </Layout>
  );
};

export default CustomerCart;
