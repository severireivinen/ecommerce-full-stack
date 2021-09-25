import type { NextPage } from "next";
import DemoProducts from "../components/DemoProducts";
import Layout from "../layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <DemoProducts />
    </Layout>
  );
};

export default Home;
