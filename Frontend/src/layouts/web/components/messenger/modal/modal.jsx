import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { toast } from 'react-toastify';
import {getUsers,createMesRoom} from "../../../../../services/Message"
import {getRooms} from "../../../../../services/Message"
import { useSelector } from "react-redux";
import "./modal.css"
import { Avatar } from "@mui/material";

export default function ModalChat({open,handleClose,setChat}) {
    const PIC =import.meta.env.VITE_API_IMAGE_URL
    const [searchValue,setSearchValue]= useState([]);
    const { user } = useSelector((state) => state.auth);
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
    const createRoom = async(id)=>{
        const response = await createMesRoom({senderId:user.id, receiverId: id});
        if(response.status =="success"){
          const res= await getRooms(user.id)
            if(res.status=="success"){
              setChat(res.data)
            }
            handleClose()
        }
        else{
          toast.error(response.message)
        }
      }
  return (
    <div>
      <Modal open={open} onClose={handleClose} className="modal">
        <Box className="modal-box chat-box-modal">
        <div className="modal-head border-0 relative border-b">
            <Typography variant="span" className="text-1 font-semibold">
              Create Chat
            </Typography>
            <CloseIcon
              className="absolute right-3 cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="chatModal-body">
            <div className="chat-search">
                <input type="text" placeholder="Search..." onChange={(e)=>searchUsers(e.target.value)}/>
            </div>
            <div className="chat-search-body">
                {searchValue && 
                searchValue.map(user=>(
                <div key={user.id} className="flex items-center p-3 cursor-pointer" onClick={()=>createRoom(user.id)}>
                    <Avatar src={PIC+user.picture} sx={{height:40,width:40}} alt="" className="border"/>
                    <h3 className="mx-4">{user.username}</h3>
                </div>
                ))
                }
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
