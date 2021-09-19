import { NextPage } from "next";
import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
  return (
    <div>
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;