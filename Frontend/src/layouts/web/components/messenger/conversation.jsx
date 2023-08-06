import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import logo from '../../../../assets/image/cover.png'
import  List  from './User list/list'

export default function conversation({func,state}) {
  return (
    <aside className={classNames({
        'w-60 overflow-hidden h-100dvh transition ease-in-out duration-300 bg-messengerAside fixed z-50 pt-6 flex flex-col nav-aside translate-x-250 md:translate-x-0 md:relative': !state,
        'w-60 overflow-hidden h-100dvh transition ease-in-out duration-300 bg-messengerAside fixed z-50 pt-6 flex flex-col nav-aside md:translate-x-0 md:relative': state
      })}>
        <div className='flex flex-row'>
          <NavLink to={"/"} onClick={func} className='mb-5 px-5'>
            <div className='flex justify-center items-center'>
              <img src={logo} alt="Logo" className='h-12 object-contain' />
            </div>
          </NavLink>
          <div>
            <i className="fa-solid fa-xmark mx-2 text-23 md:hidden" onClick={func}></i>
          </div>
        </div>
        <div className='my-2'>
            <form action="">
                <input className='py-2 px-3 w-90 mx-2 focus:outline-none border rounded-md' placeholder='Search User' type="text" />
            </form>
        </div>
        <List funct={func}/>

      </aside>
  )
}
