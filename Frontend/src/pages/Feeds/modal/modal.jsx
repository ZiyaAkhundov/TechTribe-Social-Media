import {useRef,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import {createPost,getPosts} from "../../../services/Posts"
import './modal.css'
import { toast } from 'react-toastify';
import axios from 'axios'

export default function BasicModal({open,handleOpen,handleClose,setPosts,setNoPost,setLimit}) {
  const textInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const[disable,setDisable] = useState(false)
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const handleButtonClick = () => {
    textInputRef.current.focus();
  };

  const handleFileOpen = () => {
    fileInputRef.current.click();
  };
  const handleEmpty = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true)
    
    const formData = new FormData();
    if(!file && !textInputRef.current.value) return toast.warning('Please write text or choose image!')
    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("Invalid File Type. Please select a valid image file.");
      }
      formData.append('image', file);
    }
    
    formData.append('userId', user.id);
    formData.append('desc', textInputRef.current.value);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status == "success") {
        toast.success(response.data.message);
        const getPost = await getPosts(1);
        if (getPost.status == "success") {
          setPosts(getPost.data);
          setNoPost(false);
          setLimit(2);
        }
        setFile(null);
        handleClose();
        setDisable(false)
      } else {
        setDisable(false)
        toast.error(response.data.message);
      }
    } catch (err) {
      setDisable(false)
      toast.error(err.message);
    }
};

  return (
    <div>
      <Modal open={open} onClose={handleClose} className="modal overflow-y-auto">
        <Box className="modal-box feed-modal-box">
          <div className="modal-head border-0">
            <Typography variant="span">Create New Post</Typography>
          </div>
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="modal-body-top">
              <Avatar src={user.picture && user.picture.url} sx={{ width: 46, height: 46 }} />
              <input
                ref={textInputRef} 
                className="modal-text-input"
                type="text"
                placeholder="Write a post."
              />
              <Button disabled={disable} type="submit" variant="contained" height="10px" className={`${disable ? 'opacity-60' : null}`}>
                Share
              </Button>
            </div>
            <div className="modal-buttons">
              <button className="mx-2" type="button" onClick={handleFileOpen}>
                <PhotoOutlinedIcon className="text-blue-500" />
                <b>Photo</b>
              </button>
              <input type="file" accept='image/' className="hidden" ref={fileInputRef} onChange={(e)=>setFile(e.target.files[0])}/>
              <button
                className="mx-2"
                type="button"
                onClick={handleButtonClick}
              >
                <StickyNote2OutlinedIcon className="text-pink-500" />
                <b>Write Text</b>
              </button>
            </div>
            {file && (
              <div className="share-img-wrapper">
                <img className="share-img" src={file && URL.createObjectURL(file)} alt="" />
                <CancelOutlinedIcon className="cancel-icon" color="error" onClick={handleEmpty} />
              </div>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
}