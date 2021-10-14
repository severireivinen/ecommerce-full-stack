import type { NextPage } from "next";
import ProductList from "../components/ProductList";
import Layout from "../layout/Layout";

const ShopAll: NextPage = () => {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ShopAll;
