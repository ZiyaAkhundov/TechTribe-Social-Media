import React,{useRef,useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import {setPhoto,delPhoto} from '../../../services/Settings'
import axios from 'axios';
import { login } from '../../../stores/auth';
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";
import {userData} from "../../../services/Auth"

export default function modal({open,setLoader,handleClose}) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const getData = async () => {
        try {
            const response = await userData();
            dispatch(login(response))
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0]; 
        if (!selectedFile) return;
        setLoader(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            handleClose()
            const uploadResponse = await axios.put(
              `${import.meta.env.VITE_API_URL}/users/picture`,
              formData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data", // Make sure to set the correct content type
                },
              }
            );
            if (uploadResponse.data.status === "success") {
                console.log(true)
                setLoader(false)
                getData()
              toast.success("Photo Successfully Uploaded");
            } else {
              return toast.error(uploadResponse.data.message);
            }

        } catch (err) {
            console.error(err);
        }
    };
    const delPicture = async() => {
        const response = await delPhoto();
        if(response.status == 'success') {
            toast.success(response.message)
            getData()
            handleClose()
        }
    }
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          className="modal flex justify-center items-center"
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box className="pictureModal bg-white w-72 rounded-md outline-none overflow-hidden">
              <div className="modal-head border-0 border-b">
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Change Profile Image
                </Typography>
              </div>
              <div className="body">
                <button
                  onClick={handleButtonClick}
                  className="text-blue-700 bg-white py-2 w-full border-b"
                >
                  Upload Photo
                </button>
                {user.picture ? (
                  <button
                    onClick={delPicture}
                    className="text-red-700 bg-white py-2 w-full  border-b"
                  >
                    Remove Current Photo
                  </button>
                ) : null}
                <button
                  className="bg-white py-2 w-full border-b"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <form encType="multipart/form-data">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </form>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }
