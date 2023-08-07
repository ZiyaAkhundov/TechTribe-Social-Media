import React, { useState } from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Avatar from '@mui/material/Avatar';
import TimeAgo from 'react-timeago'
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Link } from "react-router-dom";

export default function post(props) {
  const formatter = buildFormatter(EnStrings)
  console.log(props.post.username)
  const PIC =import.meta.env.VITE_API_IMAGE_URL
  console.log(props.post.picture)
  return (
    <article>
      <div >
        <div className='article-container'>
          <div className='article-head'>
            <Link to={"/profile/" + props.post.username} className='flex items-center'>
              <div className="profile-img">
                <Avatar src={PIC + props.post.userPicture} alt="" sx={{ width: 45, height: 45 }} className='border'/>
              </div>
              <div className="profile-name">
                <h2 className='font-bold text-base leading-5'>{props.post.username}</h2> 
                <TimeAgo date={props.post.createdAt} formatter={formatter} className='text-gray-500 text-sm font-time font-bold'/>
              </div>
            </Link>
            <div className="article-head-action">
              <MoreHorizOutlinedIcon />
            </div>
          </div>
          <div className='context py-3'>
            <h3 className='px-3 pt-3'>{props.post.desc}</h3>
          </div>
          <div className='context-img'>
            <img src={props.post.contextImg} alt="" />
          </div>
          <div className="article-actions">
            <div className='btns flex'>
              <button className='mx-1'>
                <ThumbUpOutlinedIcon />
                <span>{props.post.likes.length ? props.post.likes.length : null}</span> <span>likes</span>
              </button>
              <button className='mx-1'>
                <ModeCommentOutlinedIcon />
                <span>{props.post.comments ? props.post.comments.length + props.post.comments.reduce((totalReplies, comment) => totalReplies + comment.replies.length, 0) : null}</span> <span>comments</span>
              </button>
              <button className='mx-1'>
                <ShareOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>

  )
}

