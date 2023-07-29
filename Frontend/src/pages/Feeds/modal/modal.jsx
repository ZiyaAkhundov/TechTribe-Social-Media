import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ShortTextIcon from '@mui/icons-material/ShortText';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Avatar from '@mui/material/Avatar';
import img from "../../../assets/image/Ziya.jpg"
import ps from "../../../assets/image/Programmers (5).png"
import './modal.css'

export default function BasicModal({open,handleOpen,handleClose}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} className='modal' >
        <Box className="modal-box">
          <div className="modal-head">
            <Typography variant='span'>Create New Post</Typography>
          </div>
          <form className='modal-body'>
            <div className='modal-body-top'>
              <Avatar alt="user" src={img} sx={{width:46,height:46}}/>
              <input className='modal-text-input' type="text" placeholder='Write a post.'/>
              <Button type='submit' variant='contained' height="10px">Share</Button>
            </div>
            <div className='modal-buttons'>
            <button>
                <AddAPhotoOutlinedIcon/>
                <b>Add Photo</b>
              </button>
              <button>
                <VideoLibraryOutlinedIcon/>
                <b>Video</b>
              </button>
              <button>
                <CalendarMonthOutlinedIcon/>
                <b>Calendar</b>
              </button>
              <button>
                <ShortTextIcon/>
                <b>Type a text</b>
              </button>
            </div>
            <div className='share-img-wrapper'>
                <img className='share-img' src={ps} alt="" />
                <CancelOutlinedIcon className='cancel-icon' color='error'/>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}