import logo from '../../../../assets/image/cover.png'
import Menu from './menu'
import DownloadApp from './DownloadApp'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

export default function Sidebar({state,func}) {
  return (
    <aside className={classNames({
      'w-60 min-w-[15rem] overflow-hidden h-100dvh transition ease-in-out duration-300 bg-bgMain fixed z-[100] pt-6 flex flex-col nav-aside translate-x-250 lg:translate-x-0 lg:relative': !state,
      'w-60 min-w-[15rem] overflow-hidden h-100dvh transition ease-in-out duration-300 bg-bgMain fixed z-[100] pt-6 flex flex-col nav-aside lg:translate-x-0 lg:relative': state
    })}>
      <div className='flex flex-row'>
        <NavLink to={"/"} onClick={func} className='mb-5 px-5'>
          <div className='flex justify-center items-center'>
            <img src={logo} alt="Logo" className='h-12 object-contain' />
          </div>
        </NavLink>
        <div>
          <i className="fa-solid fa-xmark mx-2 text-23 lg:hidden" onClick={func}></i>
        </div>
      </div>
      <Menu funct={func} />
      <DownloadApp />
    </aside>
  )
}
