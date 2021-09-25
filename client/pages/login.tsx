import { NextPage } from "next";
import LoginForm from "../components/LoginForm";
import Layout from "../layout/Layout";

const Login: NextPage = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;
