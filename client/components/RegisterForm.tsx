import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import useRegister from "../hooks/useRegister";
import { InputField } from "../utils/types";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [register]: any = useRegister();
  const router = useRouter();

  const onSubmit = async (values: InputField) => {
    const { email, password, firstName, lastName, phone } = values;

    try {
      await register({ email, password, firstName, lastName, phone });
      router.push("/");
    } catch (e) {
      alert("Email already exists");
      console.log("Error while registering");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
          phone: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(5, "Password must be between 5-50 characters")
            .max(50, "Password must be between 5-50 characters")
            .required("Password is required"),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords do not match")
            .required("Password confirmation is required"),
          phone: Yup.string()
            .min(5, "Invalid number")
            .max(15, "Invalid number")
            .required("Number is required"),
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("First name is required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Last name is required"),
        })}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col bg-gray-700">
          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field name="passwordConfirm" type="password" />
          <ErrorMessage name="passwordConfirm" />

          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />

          <label htmlFor="phone">Phone</label>
          <Field name="phone" type="text" />
          <ErrorMessage name="phone" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
