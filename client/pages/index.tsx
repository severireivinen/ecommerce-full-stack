import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const Home: NextPage = () => {
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

export default Home;
