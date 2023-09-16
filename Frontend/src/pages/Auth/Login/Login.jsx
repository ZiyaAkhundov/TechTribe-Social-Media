import React from 'react'
import { NavLink } from "react-router-dom"
import { Formik,ErrorMessage,Form, Field } from 'formik'
import {validationLogin} from "../validation/validation"
import {LoginUser} from "../../../services/Auth"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { login } from '../../../stores/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/css/auth.css'


export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const[disable,setDisable] = useState(false)
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <span className="login100-form-title-1">
              Sign In
            </span>
          </div>
          <Formik initialValues={{
            username: '',
            password: ''
          }} onSubmit={async (values) => {
            try {
              setDisable(true)
              const response = await LoginUser(values);
              if (response.success) {
                dispatch(login(response))
                toast.success("Login successful")
                navigate('../');
                setDisable(false)
              }
              else {
                setDisable(false)
                toast.error(response.message)
              }

            } catch (error) {
              setDisable(false)
              toast.error('Something went wrong')
            }
          }}
            validationSchema={validationLogin}>
            {props => (
              <Form>
                <div className="login100-form validate-form">
                  <div className="wrap-input100 validate-input m-b-26 relative">
                    <div>
                      <span className="label-input100">Username</span>
                      <Field type="text" name="username" placeholder="Enter Email" className='input100' />
                      <span className="focus-input100"></span>
                    </div>
                    <ErrorMessage name="username" component="small" className="block text text-sm text-red-600 absolute -bottom-6 mx-3" />
                  </div>
                  <div className="wrap-input100 validate-input m-b-18 relative">
                    <div>
                      <span className="label-input100">Password</span>
                      <Field type="password" name="password" placeholder="Enter password" className='input100 bg-white' />
                      <span className="focus-input100"></span>
                    </div>
                    <ErrorMessage name="password" component="small" className="block text text-sm text-red-600 absolute -bottom-6 mx-3" />
                  </div>
                  <NavLink to={"/auth/register"} className="mt-3">
                    <p>Don’t have an account? Sign up</p>
                  </NavLink>
                  <div className="container-login100-form-btn flex items-center">
                    <button type='submit' disabled={!props.isValid || !props.dirty || disable} className="login100-form-btn bg-auth disabled:bg-violet-500 disabled:cursor-auto">
                      Sign in
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
