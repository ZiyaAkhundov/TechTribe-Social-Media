import React,{useState} from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import logo from '../../../../assets/image/cover.png'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import  List  from './User list/list'
import { useSelector } from "react-redux";
import ModalChat from "./modal/modal"

export default function conversation({func,state}) {
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [chat,setChat]=useState([])

  return (
    <aside className={classNames({
        'w-72 overflow-hidden h-100dvh transition ease-in-out duration-300 bg-messengerAside fixed z-50 pt-6 flex flex-col nav-aside translate-x-250 md:translate-x-0 md:relative': !state,
        'w-72 overflow-hidden h-100dvh transition ease-in-out duration-300 bg-messengerAside fixed z-50 pt-6 flex flex-col nav-aside md:translate-x-0 md:relative': state
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
        <div className='mb-6 mx-2 flex justify-between'>
        <NavLink to={`/Profile/${user.username}`}>
          <p className='text-xl font-semibold font-time'>{user.username}</p>
        </NavLink>
        <CreateOutlinedIcon className='cursor-pointer' onClick={handleOpen}/>
        </div>
        {
          open &&
        <ModalChat open={open} handleClose={handleClose} handleOpen={handleOpen} setChat={setChat}/>
        }
        <div className='mx-2 mb-3'>
          <p className='text-base font-semibold font-time'>Messages</p>
        </div>
        <List funct={func} setChat={setChat} chat={chat}/>
      </aside>
  )
}
