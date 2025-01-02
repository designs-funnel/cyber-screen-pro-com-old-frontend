import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderComponent from './loaderComponent';
import { color1 } from '../../utils/utils';
import axios from 'axios';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND;

function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const initialValues = {
    Email: '',
    password: '',
    remember: false,
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    remember: Yup.boolean(),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND}/forgotPassword`, values);
      const data = response.data.message;
      console.log(data, 'forgotPassword');
      toast.success('Password reset successfully!');
      setData(data);
    } catch (error) {
      console.error('Error resetting password:', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (data === 'Password reset successful') {
  //     console.log('Password reset successful');
  //     toast.success('Password reset successful!');
  //     router.push('/login'); // Redirect to login page
  //   }
  // }, [data, router]);

  return (
    <Container>
      {loading && <LoaderComponent />}
      {!loading && (
        <div className='row justify-content-center mt-5 bg-91e0ef'>
          <div className='col-lg-6 col-md-6 col-sm-6 bg-#91e0ef'>
            <div className='card shadow'>
              <div className='card-title text-center border-bottom'>
                <h2 className='p-3'>Forgot your password?</h2>
              </div>
              <div className='card-body '>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <ToastContainer />
                    <div className='mb-4'>
                      <label htmlFor='Email' className='form-label'>
                        Email
                      </label>
                      <Field
                        type='email'
                        placeholder='Enter your email'
                        className='form-control'
                        id='Email'
                        name='Email'
                      />
                      <ErrorMessage name='Email' component='div' className='text-danger' />
                    </div>
                    <div className='mb-4'>
                      <label htmlFor='password' className='form-label'>
                        Password
                      </label>
                      <Field
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                      />
                      <ErrorMessage name='password' component='div' className='text-danger' />
                    </div>
                    <div className='d-grid'>
                      <button
                        type='submit'
                        className='btn border-1'
                        style={{ backgroundColor: color1 }}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ForgotPassword;
