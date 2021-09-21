import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cool Kidz</title>
        <meta name="description" content="Browse cool clothes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
