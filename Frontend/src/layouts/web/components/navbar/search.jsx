import React, {useState} from 'react'
import {getUsers} from "../../../../services/Home"
import { Avatar } from "@mui/material";
import { NavLink } from 'react-router-dom';

export default function search() {
  const PIC =import.meta.env.VITE_API_IMAGE_URL
    const [searchValue,setSearchValue]= useState([]);
    let timeoutId
    const debounce = (callback) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(()=>callback(),800)
    };
  const searchUsers = async(data)=>{
    if(!data){
        setSearchValue([])
        return
    }
    const response = await getUsers(data);
    if(response.status =="success"){
        setSearchValue(response.data)
    }
    else{
        toast.error(response.message)
    }
}
  return (
    <div className="w-[90%] relative">
      <form className="max-w-600 w-70 relative px-2">
        <input
          type="text"
          placeholder="Search"
          onInput={(e) => {debounce (()=>searchUsers(e.target.value))}}
          className="w-full p-2 bg-gray-50 rounded border outline-none focus:outline-none focus:border-blue-400 focus:bg-searchFocus"
        />
        
                {searchValue.length>0 && 
                <div className=" w-[91%] sm:w-[94%] md:w-[97%] p-2  absolute  max-h-52 overflow-y-auto min-h-[100px] bg-white border shadow-sm">
                {searchValue.map(user=>(
                <NavLink to={`../Profile/${user.username}`} key={user.id} className="flex items-center p-3 cursor-pointer" onClick={()=>setSearchValue([])}>
                    <Avatar src={user.picture && PIC + user.picture} sx={{height:40,width:40}} alt="" className="border"/>
                    <h3 className="mx-4">{user.username}</h3>
                </NavLink>
                ))}
                </div>
                }
        
      </form>
    </div>
  );
}
