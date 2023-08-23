import  { useEffect, useState } from 'react'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Avatar from '@mui/material/Avatar';
import TimeAgo from 'react-timeago'
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {PostLike, PostDelete,getPosts} from "../../../../services/Posts"
import { toast } from 'react-toastify';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from "./modal/modal"

const ITEM_HEIGHT = 20;

export default function post(props) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async()=>{
    const response = await PostDelete({postId:props.post._id})
    if(response.status == "success"){
      toast.success(response.message)
      const getPost = await getPosts()
      props.setPosts(getPost.sort((p1,p2)=>{
              return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
    }
  }

  const [islike,setIsLike] =useState(false)
  const [likelength, setLikeLength] = useState(props.post.likes.length)
  const [commentsLength,setCommentsLength] = useState(0)
  const { user } = useSelector((state) => state.auth);
  useEffect(()=>{
    const userLikes = props.post.likes.some(likes => likes.includes(user.id));
    setCommentsLength(props.post.comments.length)
    if(userLikes){
      setIsLike(true);
    }
    else{
      setIsLike(false);
    }
  },[user.id, props.post.likes])

    const handleLike = async () =>{
      try {
        await PostLike({postId:props.post._id})
      } catch (error) {
        console.log(error)
      }
      setLikeLength(islike ? likelength - 1 : likelength + 1)
      setIsLike(prev=>!prev)
    }
  const formatter = buildFormatter(EnStrings)
  const PIC =import.meta.env.VITE_API_IMAGE_URL
  return (
    <article>
      <Modal open={openModal} handleClose={handleCloseModal} handleOpen={handleOpenModal} data={props.post} islike={islike} setIsLike={setIsLike} setLikeLength={setLikeLength} likelength={likelength} setCommentsLength={setCommentsLength}/>
      <div>
        <div className="article-container">
          <div className="article-head">
            <Link
              to={"/profile/" + props.post.username}
              className="flex items-center"
            >
              <div className="profile-img">
                <Avatar
                  src={PIC + props.post.userPicture}
                  alt=""
                  sx={{ width: 45, height: 45 }}
                  className="border"
                />
              </div>
              <div className="profile-name">
                <h2 className="font-bold text-base leading-5">
                  {props.post.username}
                </h2>
                <TimeAgo
                  date={props.post.createdAt}
                  formatter={formatter}
                  className="text-gray-500 text-sm font-time font-bold"
                />
              </div>
            </Link>
            <div className="article-head-action">
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {user.id==props.post.userId ? 
                  <MenuItem onClick={handleDelete} className=' !text-red-500'>
                    Delete
                  </MenuItem>: null}
                  {user.id!=props.post.userId ? 
                  <MenuItem onClick={handleClose} >
                    Report
                  </MenuItem> : null}
                </Menu>
              </div>
            </div>
          </div>
          <div className="context py-3">
            <h3 className="post-desc pt-3">{props.post.desc && props.post.desc}</h3>
          </div>
          <div className="context-img">
            {props.post.img &&
              <img src={PIC+props.post.img} alt="" />
            }
          </div>
          <div className="article-actions">
            <div className="btns flex">
              <button className="mx-1" onClick={handleLike}>
                <ThumbUpOutlinedIcon
                  className={islike ? "text-blue-500" : null}
                />
                <span className={islike ? "text-blue-500" : null}>
                  {likelength ? likelength : null}
                </span>{" "}
                <span className={islike ? "text-blue-500" : null}>likes</span>
              </button>
              <button className="mx-1" onClick={handleOpenModal}>
                <ModeCommentOutlinedIcon />
                <span>
                  {commentsLength
                    ? commentsLength
                    : null}
                </span>{" "}
                <span>comments</span>
              </button>
              <button className="mx-1">
                <ShareOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

