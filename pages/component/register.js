import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import LoaderComponent from "./loaderComponent";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { color1 } from "../../utils/utils";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function Register() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Company name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    remember: Yup.boolean(),
  });

  const onSubmit = async (values) => {
    const loadingToastId = toast.loading("Loading...");
    try {
      const response = await axios.post(`${BACKEND}/user-register`, values);
      console.log("Register successful");
      if (response.status === 201) {
        console.log(response, "response?.data?.message");
        toast.success("Please check your email to login");
        router.push("/component/login");
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error?.data?.message);
      toast.error(error?.response?.data?.message);
      console.log(error.response.data.message, "response?.data?.message");
    } finally {
      toast.dismiss(loadingToastId); // Dismiss loading toast
    }
  };

  return (
    <Container>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Register</h2>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                      Company Name
                    </label>
                    <Field
                      type="text"
                      placeholder="Enter company name"
                      className="form-control"
                      id="username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      placeholder="Enter your email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      name="remember"
                    />
                    <label htmlFor="remember" className="form-label">
                      <>&nbsp;</> Remember Me
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn border-1"
                      style={{ backgroundColor: color1 }}
                    >
                      Register
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Register;
