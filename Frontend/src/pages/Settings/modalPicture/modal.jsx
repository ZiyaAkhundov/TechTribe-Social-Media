import React,{useRef, useState,useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import {UploadPhoto,setPhoto} from '../../../services/Settings'
import axios from 'axios';
import { login } from '../../../stores/auth';
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import {userData} from "../../../services/Auth"

export default function modal({open,setLoader,handleClose}) {
    const [success, setSuccess] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        setLoader(true);
        const selectedFile = event.target.files[0];
        let formData = new FormData();
        const filename = Date.now() + selectedFile.name;
        formData.append("name", filename);
        formData.append("file", selectedFile);

        try {
            handleClose()
            const uploadResponse = await axios.post('http://localhost:5000/users/upload', formData, {
                headers: {
                    'X-CSRF-Token': getCookie('csrf-token'),
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            const photoResponse = await setPhoto({ picture: filename });

            if (photoResponse.status === "success") {
                toast.success("Photo Successfully Uploaded");
                setLoader(false);
                setSuccess(true)
                formData = null;
            } else {
                toast.error(uploadResponse.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await userData();
                dispatch(login(response))
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (success) {
            getData();
        }
    }, [success])
    return (
        <div>
            <Modal open={open} onClose={handleClose} className='modal flex justify-center items-center' 
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
                <Fade in={open}>
                    <Box className='pictureModal bg-white w-72 rounded-md outline-none overflow-hidden'>
                        <div className='modal-head border-0 border-b'>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Change Profile Image
                            </Typography>
                        </div>
                        <div className="body">
                            <button onClick={handleButtonClick} className='text-blue-700 bg-white py-2 w-full border-b'>Upload Photo</button>
                            <button className='text-red-700 bg-white py-2 w-full  border-b'>Remove Current Photo</button>
                            <button className='bg-white py-2 w-full border-b' onClick={handleClose}>Cancel</button>
                            <form encType="multipart/form-data">
                                <input type="file" ref={fileInputRef} accept="image/jpeg,image/png" className='hidden' onChange={handleFileChange}/>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
  }
