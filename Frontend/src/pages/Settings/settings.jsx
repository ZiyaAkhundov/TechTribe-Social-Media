import React, { useState } from 'react'
import './settings.css'
import Avatar from '@mui/material/Avatar';
import { Formik, ErrorMessage, Form, Field } from 'formik'
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { login } from '../../stores/auth';
import { validation } from "./validation/userData"
import { passwordValidation } from "./validation/password"
import {changeUserData} from '../../services/Settings'
import { useDispatch } from 'react-redux'
import Modal from './modalPicture/modal'

export default function settings() {
  const PF= import.meta.env.VITE_API_IMAGE_URL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loader,setLoader] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  return (
    <div className='settings-container overflow-auto'>
      <div className="settings-card">
        <div className="settings-header">
          <div className="settings-image">
            <div onClick={handleOpen} className='relative overflow-hidden'>
              <Avatar sx={{ width: 200, height: 200 }} src={user.picture ? PF + user.picture : null} className='cursor-pointer border' title="Change Profile Picture"></Avatar>
              {loader ? (
                <div className='absolute top-0 left-0 w-full h-full spinner-container'>
                  <div className="spinner center absolute top-0 left-0">
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                  </div>
                </div>

              ) : null
              }
            </div>
            <Modal open={open} handleClose={handleClose} handleOpen={handleOpen} setLoader={setLoader} />
          </div>
          <div className="settings-user">
            <p>{user.username}</p>
          </div>
        </div>
        <div className="settings-body">
          <Formik initialValues={{
            username: user.username,
            email: user.email
          }} onSubmit={async (values) => {
            try {
              const response = await changeUserData(values);
              if (response.status == 'success') {
                dispatch(login(response.data))
                toast.success(response.message);
              }
              else {
                toast.error(response.message)
              }

            } catch (error) {
              toast.error(error.message)
            }
          }}
            validationSchema={validation}>

            <Form className='w-full flex items-center flex-col'>
              <div className='w-full'>
                <p className='userData'>User information</p>
                <div className='flex justify-start items-center mt-3 mb-2'>
                  <div className='w-full flex flex-col h-14'>
                    <label htmlFor="">Email</label>
                    <Field type="text" name="email" placeholder="Email" className='px-2 w-90 mx-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 ' />
                    <ErrorMessage name="email" component="small" className="block text text-sm text-red-600 mt-1 mx-3" />
                  </div>
                  <div className='w-full flex flex-col h-14'>
                    <label htmlFor="">Username</label>
                    <Field type="text" name="username" placeholder="Username" className='px-2 w-90 mx-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 ' />
                    <ErrorMessage name="username" component="small" className="block text text-sm text-red-600 mt-1 mx-3" />
                  </div>
                </div>
                <div className='m-3 flex justify-end'>
                  <button type='submit' className='btn px-3 py-1 bg-green-700 text-white rounded-md disabled:bg-green-500'>Save</button>
                </div>
              </div>
            </Form>

          </Formik>
          <Formik initialValues={{
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: ''
          }} onSubmit={async (values, { resetForm }) => {
            try {
              const response = await changeUserData(values);
              if (response.status == 'success') {
                dispatch(login(response.data))
                toast.success(response.message);
                resetForm();
              }
              else {
                toast.error(response.message)
              }
            } catch (error) {
              toast.error(error.message)
            }
          }}
            validationSchema={passwordValidation}>
            <Form className='w-full flex items-center flex-col flex-wrap'>
              <div className='w-full'>
                <p className='userPassword'>Change Password</p>
                <div className='flex items-center flex-col'>
                  <div className='w-90 mx-auto flex flex-col h-14 mb-1'>
                    <Field type="text" name="currentPassword" placeholder="Current Password" className='px-2 w-full mx-auto py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 ' />
                    <ErrorMessage name="currentPassword" component="small" className="block text text-sm text-red-600 my-1 mx-3" />
                  </div>
                  <div className='w-90 mx-auto flex flex-col h-14 mb-1'>
                    <Field type="text" name="newPassword" placeholder="New Password" className='px-2 w-full mx-auto py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 ' />
                    <ErrorMessage name="newPassword" component="small" className="block text text-sm text-red-600 my-1 mx-3" />
                  </div>
                  <div className='w-90 mx-auto flex flex-col h-14'>
                    <Field type="text" name="repeatNewPassword" placeholder="Repeat New Password" className='px-2 w-full mx-auto py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 ' />
                    <ErrorMessage name="repeatNewPassword" component="small" className="block text text-sm text-red-600 my-1 mx-3" />
                  </div>
                </div>
                <div className='mx-3 flex justify-end'>
                  <button type='submit' className='btn px-3 py-1 cursor-pointer bg-blue-700 text-white rounded-md disabled:bg-blue-500 disabled:cursor-default'>Change Password</button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
