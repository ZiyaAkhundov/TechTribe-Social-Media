import {useEffect, useRef,useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {getFolowers,getFolowings,removeFollower,Follow} from '../../../services/Profile'
import CloseIcon from '@mui/icons-material/Close';
import './modal.css'
import { toast } from 'react-toastify';

export  function ModalProfile({open,handleClose,type,username,setuserfollowers}) {
  const PIC =import.meta.env.VITE_API_IMAGE_URL
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState([])
  const [curUserFollowings,setCurUserFollowings] = useState([])
  const { user } = useSelector((state) => state.auth);
  const getData = async()=>{
    if(type){
      const response = await getFolowings({username:username})
      if(response.status=="success"){
        setData(response.data)
        setLoading(false)
        return
      }
      return toast.error(response.message)
    }
    else{
      const response = await getFolowers({username:username})
      if(response.status=="success"){
        setData(response.data)
        setLoading(false)
        return
      }
      return toast.error(response.message)
    }
  }
  const getUserFollowings = async() =>{
    const response = await getFolowings({username:user.username})
    if(response.status == "success"){
      setCurUserFollowings(response.data)
      
    }
  }
useEffect(()=>{
  setLoading(true)
  getData();
  if(username != user.username){
    getUserFollowings()
  }
},[])

const handleRemoveFollower = async(data)=>{
  const response = await removeFollower({username:data});
  if(response.status == "success"){
    setuserfollowers(response.data)
    setData(response.data)
  }
  else{
    toast.error("Error occured!")
  }
}
const handleFollow = async(data)=>{
  const response = await Follow({username:data})
  if(response.status=="success"){
    getData();
    if(username != user.username){
      getUserFollowings()
    }
  }
  else{
    toast.error("Error occured!")
  }
}
  return (
    <div>
      <Modal open={open} onClose={handleClose} className="modal modal-profile">
        <Box className="modal-box modal-box-profile">
          <div className="modal-head border-0 relative border-b">
            <Typography variant="span" className="text-1 font-semibold">
              {type ? "Followings" : "Followers"}
            </Typography>
            <CloseIcon
              className="absolute right-3 cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="modal-profile-body">
            {loading ? (
              <div className='w-full h-full flex justify-center items-center'>
                <div className="loader">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </div>
            ) : (
             data.length ? data.map((data) => {
                return (
                  <div key={data.id}>
                    <div className="p-2 flex items-center justify-between">
                      <NavLink
                        to={`/profile/${data.username}`}
                        onClick={handleClose}
                      >
                        <div className="flex justify-start items-center gap-2">
                          <img
                            src={PIC + data.userPic}
                            alt="User picture"
                            className="h-11 w-11 border-2 rounded-full"
                          />
                          <p>{data.username}</p>
                        </div>
                      </NavLink>
                      {user.username === username ? (
                        type ? (
                          <button className="profile-btn fl" onClick={() => handleFollow(data.username)}>Following</button>
                        ) : (
                          <button
                            className="profile-btn rm"
                            onClick={() => handleRemoveFollower(data.username)}
                          >
                            Remove
                          </button>
                        )
                      ) : data.username ==user.username
                      ? null : curUserFollowings.some(
                          (element) => element.username === data.username
                        ) ? (
                        <button className="profile-btn fl" onClick={() => handleFollow(data.username)}>Following</button>
                      ) : (
                        <button
                          className="profile-btn"
                          onClick={() => handleFollow(data.username)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                );
              }) : (<div className='flex justify-center items-center p-4'>No data found</div>)
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
