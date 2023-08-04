import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TimeAgo from 'react-timeago'
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { Link } from "react-router-dom";

export default function post({username,context,contextImg, likes, comments,time}) {
  const formatter = buildFormatter(EnStrings)
  return (
    <article>
      <div >
        <div className='article-container'>
          <div className='article-head'>
            <Link to={"/profile/" + username}>
              <div className="profile-img">
                <img src="" alt="" />
              </div>
              <div className="profile-name">
                <h2>{username}</h2>
              </div>
            </Link>
            <div className="article-head-action">
              <MoreHorizOutlinedIcon />
            </div>
          </div>
          <div className='context'>
            <h3 className='px-3'>{context}</h3>
          </div>
          <div className='context-img'>
            <img src={contextImg} alt="" />
          </div>
          <div className="article-actions">
            <div className='btns flex'>
              <button className='mx-1'>
                <ThumbUpOutlinedIcon />
                <span>{likes ? likes : null}</span> <span>likes</span>
              </button>
              <button className='mx-1'>
                <ModeCommentOutlinedIcon />
                <span>{comments ? comments : null}</span> <span>comments</span>
              </button>
              <button className='mx-1'>
                <ShareOutlinedIcon />
              </button>
            </div>
            <div className='mt-2'>
            <TimeAgo date={time} formatter={formatter} className='text-gray-500 text-sm'/>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
