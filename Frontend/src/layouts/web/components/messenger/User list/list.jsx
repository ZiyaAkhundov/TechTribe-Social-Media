import { Avatar } from '@mui/material'
import React from 'react'
import { NavLink } from "react-router-dom"
import img from "../../../../../assets/image/_DSC0187.jpg"
export default function List({funct}) {
  return (
    <nav className="px-2 asideNav">
            <ul className="flex flex-col gap-1">
                <li>
                    <NavLink  onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        <Avatar alt="akhundov_ziya" src={img} className='border' sx={{ width: 24, height: 24 }}/>
                        <span className='mx-1'>akhundov_ziya</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink  onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        <Avatar alt="akhundov_ziya" src={img} className='border' sx={{ width: 24, height: 24 }}/>
                        <span className='mx-1'>akhundov_ziya</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink  onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                       <Avatar alt="akhundov_ziya" src={img} className='border' sx={{ width: 24, height: 24 }}/>
                        <span className='mx-1'>akhundov_ziya</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        <Avatar alt="akhundov_ziya" src={img} className='border' sx={{ width: 24, height: 24 }}/>
                        <span className='mx-1'>akhundov_ziya</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink  onClick={funct} className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "bg-active h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600" : "h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600"}>
                        <Avatar alt="akhundov_ziya" src={img} className='border' sx={{ width: 24, height: 24 }}/>
                        <span className='mx-1'>akhundov_ziya</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
  )
}
