import {useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Avatar from '@mui/material/Avatar';
import img from "../../../assets/image/Ziya.jpg"
import ps from "../../../assets/image/Programmers (5).png"
import './modal.css'

export default function BasicModal({open,handleOpen,handleClose}) {
  const textInputRef = useRef(null);

    const handleButtonClick = () => {
      textInputRef.current.focus();
    };
  return (
    <div>
      <Modal open={open} onClose={handleClose} className='modal' >
        <Box className="modal-box">
          <div className="modal-head border-0">
            <Typography variant='span' >Create New Post</Typography>
          </div>
          <form className='modal-body'>
            <div className='modal-body-top'>
              <Avatar alt="user" src={img} sx={{width:46,height:46}}/>
              <input ref={textInputRef} className='modal-text-input' type="text" placeholder='Write a post.'/>
              <Button type='submit' variant='contained' height="10px">Share</Button>
            </div>
            <div className='modal-buttons'>
            <button className='mx-2' type='button'>
                <PhotoOutlinedIcon className='text-blue-500'/>
                <b>Photo</b>
              </button>
              <button className='mx-2' type='button' onClick={handleButtonClick}>
                <StickyNote2OutlinedIcon className='text-pink-500'/>
                <b>Write Text</b>
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