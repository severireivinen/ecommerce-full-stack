import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

const Register: NextPage = () => (
  <div>
    <Head>
      <title>Cool Kidz</title>
      <meta name="description" content="Browse cool clothes" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main>
      <RegisterForm />
    </main>
  </div>
);

export default Register;
