import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import useLogin from "../hooks/useLogin";
import { LoginField } from "../utils/types";
import * as Yup from "yup";
import { setAccessToken } from "../lib/accessToken";

const LoginForm = () => {
  const [login]: any = useLogin();

  const onSubmit = async (values: LoginField) => {
    const { email, password } = values;

    try {
      await login({ email, password });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
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
          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
