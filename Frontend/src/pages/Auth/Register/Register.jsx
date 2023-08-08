import React from 'react'
import { NavLink } from "react-router-dom"
import { Formik,ErrorMessage,Form, Field } from 'formik'
import {validationRegister} from "../validation/validation"
import {RegisterUser} from "../../../services/Auth"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../assets/css/auth.css'

export default function Register() {
  let navigate = useNavigate();
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <span className="login100-form-title-1">
              Sign Up
            </span>
          </div>
          <Formik initialValues={{
            email: '',
            username: '',
            password: ''
          }} onSubmit={async (values) => {
            try {
              const response = await RegisterUser(values);
              if (response.status == "success") {
                toast.success(response.message)
                navigate('/auth/login');
              }
              else {
                toast.error(response.message)
              }
            } catch (error) {
              toast.error(error.message)
            }
          }}
            validationSchema={validationRegister}>
            {props => (
              <Form>
                <div className="login100-form validate-form">
                  <div className="wrap-input100 validate-input m-b-26 relative">
                    <div>
                      <span className="label-input100">Email</span>
                      <Field type="text" name="email" placeholder="Enter Email" className='input100' autoComplete='off' />
                      <span className="focus-input100"></span>
                    </div>
                    <ErrorMessage name="email" component="small" className="block text text-sm text-red-600 absolute -bottom-6 mx-3" />
                  </div>
                  <div className="wrap-input100 validate-input m-b-26 relative">
                    <div>
                      <span className="label-input100">Username</span>
                      <Field type="text" name="username" placeholder="Enter Username" className='input100' autoComplete='off' />
                      <span className="focus-input100"></span>
                    </div>
                    <ErrorMessage name="username" component="small" className="block text text-sm text-red-600 absolute -bottom-6 mx-3" />
                  </div>
                  <div className="wrap-input100 validate-input m-b-18 relative">
                    <div>
                      <span className="label-input100">Password</span>
                      <Field type="password" name="password" placeholder="Enter password" className='input100 bg-white' autoComplete='off' />
                      <span className="focus-input100"></span>
                    </div>
                    <ErrorMessage name="password" component="small" className="block text text-sm text-red-600 absolute -bottom-6 mx-3" />
                  </div>
                  <NavLink to={"/auth/login"}>
                    <p>Have an account? Sign in</p>
                  </NavLink>
                  <div className="container-login100-form-btn">
                    <button type='submit' disabled={!props.isValid || !props.dirty} className="login100-form-btn bg-auth disabled:bg-violet-600 disabled:cursor-auto">
                      Sign up
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
