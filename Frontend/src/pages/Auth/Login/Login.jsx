import React from 'react'
import { NavLink } from "react-router-dom"
import { Formik,ErrorMessage,Form, Field } from 'formik'
import {validation} from "./validation/validation"
import {getUser} from "../../../services/Auth"
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { login } from '../../../stores/auth';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='flex w-full justify-center items-center h-100dvh bg-blue-100'>
      <div className='border rounded-md bg-white'>
      <div className='my-2 border-b border-gray-300 w-full'>
        <h1 className='my-2 mx-2 text-23 text-blue-950 font-black'>Login</h1>
      </div>
      <Formik initialValues={{
        email: '',
        password: ''
      }} onSubmit={async (values) => {
        try {
          const response = await getUser(values);
          if(response.success) {
            dispatch(login(response))
            toast.success("Login successful")
            navigate('../');
          }
          else{
            toast.error(response.message)
          }
          
        } catch (error) {
          toast.error(error.message)
        }
      }}
      validationSchema={validation}>
        {props => (
          <Form>
            <div className='my-2 w-full flex flex-col items-center'>
              <div className='mb-3'>
              <Field type="text" name="email" placeholder="Email" className='px-2 w-72 mx-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 ' />
              <ErrorMessage name="email" component="small" className="block text text-sm text-red-600 mt-1 mx-3" />
              </div>
              <div className=''>
              <Field type="password" name="password" placeholder="Password" className='px-2 w-72 mx-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600' />
              <ErrorMessage name="password" component="small" className="block text text-sm text-red-600 mt-1 mx-3" />
              </div>
            </div>
            <div className='mt-2 mx-3'>
              <button disabled={!props.isValid || !props.dirty} type='submit' className='flex justify-self-end py-1 px-4 rounded-md mb-2 bg-blue-600 text-white disabled:opacity-70'>
                Login
              </button>
            </div>
            <div className='flex flex-col items-start mx-2 py-2 text-sm leading-5'>
              <div>
                <p>Don't have an account?</p>
                <NavLink to={'/auth/register'} className="text-blue-800 font-semibold">
                  Create account
                </NavLink>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  )
}
