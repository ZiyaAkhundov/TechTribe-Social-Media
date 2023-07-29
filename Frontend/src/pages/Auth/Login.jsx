import React from 'react'
import { NavLink } from "react-router-dom"
export default function Login() {
  return (
    <div className='flex flex-col mx-auto justify-center items-center px-2 mt-20 md:mt-36 w-80 border rounded-sm '>
      <div className='my-2 border-b border-gray-300 w-full'>
        <h1 className='my-2 mx-2 text-23 text-blue-950 font-black'>Login</h1>
      </div>
      <div className=''>
        <div className='border-b border-gray-300'>
          <div className='my-2 w-full flex flex-col items-center'>
            <div className='mb-3'>
              <span className='text-gray-600 font-semibold mx-3'>Username</span>
              <input type="text" required placeholder='Username' className='px-2 w-72 mx-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600' />
            </div>
            <div className='mb-3'>
              <span className='text-gray-600 font-semibold mx-3 '>Password</span>
              <input type="password" required placeholder='Password' className='px-2 w-72 mx-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600' />
            </div>
          </div>
          <div className='mt-2 mx-3'>
            <button className='flex justify-self-end py-1 px-4 rounded-md mb-2 bg-blue-600 text-white'>
              Login
            </button>
          </div>
        </div>
        <div className='flex flex-col items-start mx-2 py-2'>
          <div>
            <p>Don't have an account?</p>
            <NavLink to={'/auth/register'} className="text-blue-800 font-semibold">
              Create account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
