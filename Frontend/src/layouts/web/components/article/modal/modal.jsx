import {useRef,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux";
import './modal.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import img from "../../../../../../../Backend/public/img/1691680927786photo-1627666259356-03a116b7dde9.jpg"
import img1 from "../../../../../assets/image/logo.png"

export default function articleModal({open,handleOpen,handleClose,setPosts}) {

  const { user } = useSelector((state) => state.auth);
  const PF = import.meta.env.VITE_API_IMAGE_URL
    
    
  return (
    <div>
      <Modal open={open} onClose={handleClose} className="article-modal">
        <Box className="article-modal-box">
          <div className="article-modal-img-section">
            <div>
              <CloseIcon
                className="text-white !w-10 !h-10 cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="article-modal-img">
              <img src={img} alt="" className="article-m-img" />
            </div>
          </div>
          <div className="article-modal-comment">
            <div className="article-modal-user">
              <div className="flex justify-start items-center p-3">
                <Avatar
                  src={img}
                  sx={{ height: 40, width: 40 }}
                  className="rounded-full"
                ></Avatar>
                <h3 className="mx-2 text-23 article-modal-username">
                  akhundov_ziya
                </h3>
              </div>
              <div className="article-user-comment">
                <h3>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dicta dolorum aut fuga asperiores corporis sapiente itaque
                  exercitationem. Maiores dolores rerum sed esse? Placeat,
                  commodi. Amet iste quos unde ullam tenetur?Lorem ipsum dolor si Pariatur sapiente debitis consequuntur, suscipit obcaecati doloribus?
                </h3>
                <div className="article-commet-btn">
                  <button className="mx-1">
                    <ThumbUpOutlinedIcon />
                    <span>likes</span>
                  </button>
                  <button className="mx-1">
                    <ModeCommentOutlinedIcon />
                    <span>comments</span>
                  </button>
                  <button className="mx-1">
                    <ShareOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className="comments-section">
              <div className="article-comment">
                <div className="flex justify-start items-center p-3">
                  <Avatar
                    src={img}
                    sx={{ height: 30, width: 30 }}
                    className="rounded-full"
                  ></Avatar>
                  <h3 className="mx-2 text-1 article-comment-username">
                    akhundov_ziya
                  </h3>
                </div>
                <div className="article-comment-cm">
                  <h4>
                    Lorem ipsum doepturi numquam sapiente dolor, ea quod? Autem
                    conseae qui perspiciatis?
                  </h4>
                </div>
                <div className="cm-actions">
                  <button className="mx-1">
                    <ThumbUpOutlinedIcon />
                    <span>likes</span>
                  </button>
                </div>
              </div>
              <div className="article-comment">
                <div className="flex justify-start items-center p-3">
                  <Avatar
                    src={img1}
                    sx={{ height: 30, width: 30 }}
                    className="rounded-full"
                  ></Avatar>
                  <h3 className="mx-2 text-1 article-comment-username">
                    programmersschool
                  </h3>
                </div>
                <div className="article-comment-cm">
                  <h4>
                    Lorem ipsum doepturi numquam sapiente dolor, ea quod? Autem
                    conseae qui perspiciatis?
                  </h4>
                </div>
                <div className="cm-actions">
                  <button className="mx-1">
                    <ThumbUpOutlinedIcon />
                    <span>likes</span>
                  </button>
                </div>
              </div>
              <div className="article-comment">
                <div className="flex justify-start items-center p-3">
                  <Avatar
                    src={img1}
                    sx={{ height: 30, width: 30 }}
                    className="rounded-full"
                  ></Avatar>
                  <h3 className="mx-2 text-1 article-comment-username">
                    programmersschool
                  </h3>
                </div>
                <div className="article-comment-cm">
                  <h4>
                    Lorem ipsum doepturi numquam sapiente dolor, ea quod? Autem
                    conseae qui perspiciatis?
                  </h4>
                </div>
                <div className="cm-actions">
                  <button className="mx-1">
                    <ThumbUpOutlinedIcon />
                    <span>likes</span>
                  </button>
                </div>
              </div>
              <div className="article-comment">
                <div className="flex justify-start items-center p-3">
                  <Avatar
                    src={img1}
                    sx={{ height: 30, width: 30 }}
                    className="rounded-full"
                  ></Avatar>
                  <h3 className="mx-2 text-1 article-comment-username">
                    programmersschool
                  </h3>
                </div>
                <div className="article-comment-cm">
                  <h4>
                    Lorem ipsum doepturi numquam sapiente dolor, ea quod? Autem
                    conseae qui perspiciatis?
                  </h4>
                </div>
                <div className="cm-actions">
                  <button className="mx-1">
                    <ThumbUpOutlinedIcon />
                    <span>likes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}