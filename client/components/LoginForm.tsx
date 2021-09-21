import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import useLogin from "../hooks/useLogin";
import { LoginField } from "../utils/types";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

const LoginForm = () => {
  const [login]: any = useLogin();
  const router = useRouter();
  const client = useApolloClient();

  const onSubmit = async (values: LoginField) => {
    const { email, password } = values;

    try {
      await login({ email, password });
      client.resetStore();
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const register = () => {
    router.push("/register");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-yellow-600">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="border flex flex-col items-center p-16 bg-white">
            <h1 className="text-3xl font-bold m-3 py-10">ECommerce Demo</h1>
            <div className="flex flex-col w-full space-y-3">
              <div className="border rounded-sm">
                <Field
                  className="w-full outline-none"
                  name="email"
                  type="text"
                  placeholder="E-Mail"
                />
              </div>
              <ErrorMessage name="email" />
              <div className="flex flex-col border rounded-sm">
                <Field
                  className="w-full outline-none"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <ErrorMessage name="password" />
              <div className="bg-black mx-10 text-center text-white text-md rounded-md">
                <button className="font-semibold p-2" type="submit">
                  Login
                </button>
              </div>
              <div className="flex justify-center space-x-2">
                <p>Don't have an account?</p>
                <p className="cursor-pointer text-blue-400" onClick={register}>
                  Register
                </p>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
