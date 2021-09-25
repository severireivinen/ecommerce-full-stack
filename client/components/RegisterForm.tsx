import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import useRegister from "../hooks/useRegister";
import { InputField } from "../lib/types";
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

  const login = () => {
    router.push("/login");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-yellow-600">
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
        <Form>
          <div className="border flex flex-col items-center p-16 bg-white">
            <h1 className="text-3xl font-bold m-3 py-10">ECommerce Demo</h1>
            <div className="flex flex-col w-full space-y-3">
              <div className="border rounded-sm">
                <Field
                  className="p-1 bg-gray-50 text-sm w-full outline-none"
                  name="email"
                  type="text"
                  placeholder="E-Mail"
                />
              </div>
              <ErrorMessage name="email" />

              <div className="border rounded-sm">
                <Field
                  className="p-1 bg-gray-50 text-sm w-full outline-none"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <ErrorMessage name="password" />

              <div className="border rounded-sm">
                <Field
                  className="p-1 bg-gray-50 text-sm w-full outline-none"
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
              <ErrorMessage name="passwordConfirm" />

              <div className="border rounded-sm">
                <Field
                  className="p-1 bg-gray-50 text-sm w-full outline-none"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <ErrorMessage name="firstName" />

              <div className="border rounded-sm">
                <Field
                  className="p-1 bg-gray-50 text-sm w-full outline-none"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <ErrorMessage name="lastName" />

              <div className="border rounded-sm">
                <Field
                  className="p-1 bg-gray-50 text-sm w-full outline-none"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                />
              </div>
              <ErrorMessage name="phone" />
              <div className="bg-black mx-10 text-center text-white text-md rounded-md">
                <button className="font-semibold p-2" type="submit">
                  Register
                </button>
              </div>
              <div className="flex justify-center space-x-2">
                <p>Already registered?</p>
                <p className="cursor-pointer text-blue-400" onClick={login}>
                  Login
                </p>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
