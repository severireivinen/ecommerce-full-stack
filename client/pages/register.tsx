import { NextPage } from "next";
import Layout from "../layout/Layout";
import RegisterForm from "../components/RegisterForm";

const Register: NextPage = () => {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default Register;
