import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import {getRooms} from "../../../../../services/Message"
import { useSelector } from "react-redux";


export default function List({funct,setChat,chat}) {
    const { user } = useSelector((state) => state.auth);
    const PIC =import.meta.env.VITE_API_IMAGE_URL
    const navigate =useNavigate()
    useEffect(()=>{
        const rooms = async()=>{
            const response= await getRooms(user.id)
            if(response.status=="success"){
                setChat(response.data)
            }
        }
        rooms()
    },[])
  return (
    <nav className="px-2 asideNav">
            <ul className="flex flex-col gap-1">
                {chat && 
                chat.map(data=>
                <li onClick={funct} key={data.id}>
                    <div onClick={()=>navigate(`/Chat/${data.id}`)}  className="h-10 flex items-center text-base font-semibold px-4 rounded  text-gray-600 cursor-pointer">
                        <Avatar alt="akhundov_ziya" src={data.picture && PIC+data.picture} className='border' sx={{ width: 24, height: 24 }}/>
                        <span className='mx-1'>{data.username}</span>
                    </div>
                </li>
                )
                }
            </ul>
        </nav>
  )
}
