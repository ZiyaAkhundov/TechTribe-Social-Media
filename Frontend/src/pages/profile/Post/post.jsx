import React from 'react'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export default function post({username,context,contextImg, likes, comments}) {
  return (
    <article>
                <div >
                  <div className='article-container'>
                    <div className='article-head'>
                      <a href="">
                        <div className="profile-img">
                          <img src="" alt="" />
                        </div>
                        <div className="profile-name">
                          <h2>{username}</h2>
                        </div>
                      </a>
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
                          <span>{likes}</span> <span>likes</span>
                        </button>
                        <button className='mx-1'>
                          <ModeCommentOutlinedIcon />
                          <span>{comments}</span> <span>comments</span>
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
