import Container from "react-bootstrap/Container";
import styles from "../../styles/navbar.module.css";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { color1 } from "../../utils/utils";
import { useAuth } from "../AuthContext";
import { Spinner } from "react-bootstrap";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    remember: Yup.boolean(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (typeof window === "undefined" || !window?.navigator?.onLine) {
        return toast.error("Please turn on your internet");
      }

      setLoading(true);
      const response = await axios.post(`${BACKEND}/user-login`, values);
      localStorage.setItem("token", response?.data?.token);
      setIsLoggedIn(true);
      router.push("/");
      return resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Backend is loading soon");
      setError(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="row justify-content-center mt-5 bg-91e0ef">
        <div className="col-lg-6 col-md-6 col-sm-6 bg-#91e0ef">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Login</h2>
            </div>
            <div className="card-body ">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
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
                  <div className="mb-4 d-flex justify-content-between text-lg-center">
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
                    <div className={styles.custom_loge_Forgot_password}>
                      {/* <Link href="/component/forgotPassword">
                          Forgot your password?
                        </Link> */}
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn border-1"
                      style={{ backgroundColor: color1 }}
                    >
                      {loading && <Spinner size="sm" />} Login
                    </button>
                  </div>
                  <div className="border-0">
                    <button type="button" className="btn border-0 ">
                      Don’t have an account?{" "}
                      <span className="btn border-0 text-primary">
                        <Link href="/component/register">Create Account</Link>
                      </span>
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

export default Login;
