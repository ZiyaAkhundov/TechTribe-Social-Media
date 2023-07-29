import React from 'react'
import Avatar from '@mui/material/Avatar';
import img from "../../assets/image/Ziya.jpg"
import logo from "../../assets/image/Programmers (5).png"
import img1 from "../../assets/image/_DSC0187.jpg"
import { NavLink } from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import "./profile.css"
export default function profile() {
  return (
    <section>
      <div className="content-profile">
        <div className='profile'>
          <div className='profile-header'>
            <div className='profile-img'>
              <div className='profile-img-section'>
                <button className='change-img'>
                  <img alt="user" src={img} sx={{ width: 140, height: 140 }} />

                </button>
              </div>
            </div>
            <div className='profile-section'>
              <div className="profile-actions">
                <div className='profile-username'>
                  <p>akhundov_ziya</p>
                </div>
                <div className="profile-edit">
                  <NavLink to={"edit"}>
                    Edit profile
                  </NavLink>
                </div>
                <div className="profile-logout">
                  <button>
                    Log Out
                  </button>
                </div>
              </div>
              <div className='profile-activity'>
                <div className="profile-activity-main">
                  <div className="profile-post">
                    <span className='mx-1'>1</span>
                    <span className='mx-1'>post</span>
                  </div>
                  <div className='profile-followers'>
                    <button>
                      <span className='mx-1'>20</span>
                      <span className='mx-1'>followers</span>
                    </button>
                  </div>
                  <div className='profile-followings'>
                    <button>
                      <span className='mx-1'>10</span>
                      <span className='mx-1'>followings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-body">
            <div className='profile-body-header'>
              <button>
                <svg aria-label="" className="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                <span className='mx-2'>Post</span>
              </button>
            </div>
            <div className='profile-body-content justify-start'>
            <article>
                <div >
                  <div className='article-container'>
                    <div className='article-head'>
                      <a href="">
                        <div className="profile-img">
                          <img src={img} alt="" />
                        </div>
                        <div className="profile-name">
                          <h2>@akhundov_ziya</h2>
                        </div>
                      </a>
                      <div className="article-head-action">
                        <MoreHorizOutlinedIcon />
                      </div>
                    </div>
                    <div className='context'>
                      <h3>Hey, Programmers School! The Airmen who make up the U.S. Air Force Special Warfare are some of the most-specialized
                        warriors on the planet. Master Sergeant Kristopher Tomes is a PJ (Pararescue) in Air Force Special Warfare.
                        He’s been in lifesaving missions around the world. Now’s your chance. Ask him anything!
                      </h3>
                    </div>
                    <div className='context-img'>
                      <img src={img} alt="" />
                    </div>
                    <div className="article-actions">
                      <div className='btns flex'>
                        <button className='mx-1'>
                          <ThumbUpOutlinedIcon />
                          <span>25 </span> <span>likes</span>
                        </button>
                        <button className='mx-1'>
                          <ModeCommentOutlinedIcon />
                          <span>2 </span> <span>comments</span>
                        </button>
                        <button className='mx-1'>
                          <ShareOutlinedIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article>
                <div >
                  <div className='article-container'>
                    <div className='article-head'>
                      <a href="">
                        <div className="profile-img">
                          <img src={img} alt="" />
                        </div>
                        <div className="profile-name">
                          <h2>@akhundov_ziya</h2>
                        </div>
                      </a>
                      <div className="article-head-action">
                        <MoreHorizOutlinedIcon />
                      </div>
                    </div>
                    <div className='context'>
                      <h3>Hey, Programmers School! The Airmen who make up the U.S. Air Force Special Warfare are some of the most-specialized
                        warriors on the planet. Master Sergeant Kristopher Tomes is a PJ (Pararescue) in Air Force Special Warfare.
                        He’s been in lifesaving missions around the world. Now’s your chance. Ask him anything!
                      </h3>
                    </div>
                    <div className='context-img'>
                      <img src={logo} alt="" />
                    </div>
                    <div className="article-actions">
                      <div className='btns flex'>
                        <button className='mx-1'>
                          <ThumbUpOutlinedIcon />
                          <span>20 </span> <span>likes</span>
                        </button>
                        <button className='mx-1'>
                          <ModeCommentOutlinedIcon />
                        </button>
                        <button className='mx-1'>
                          <ShareOutlinedIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article>
                <div >
                  <div className='article-container'>
                    <div className='article-head'>
                      <a href="">
                        <div className="profile-img">
                          <img src={img} alt="" />
                        </div>
                        <div className="profile-name">
                          <h2>@akhundov_ziya</h2>
                        </div>
                      </a>
                      <div className="article-head-action">
                        <MoreHorizOutlinedIcon />
                      </div>
                    </div>
                    <div className='context'>
                      <h3>Hey, Reddit! The Airmen who make up the U.S. Air Force Special Warfare are some of the most-specialized
                        warriors on the planet. Master Sergeant Kristopher Tomes is a PJ (Pararescue) in Air Force Special Warfare.
                        He’s been in lifesaving missions around the world. Now’s your chance. Ask him anything!
                      </h3>
                    </div>
                    <div className='context-img'>
                      <img src={img1} alt="" />
                    </div>
                    <div className="article-actions">
                      <div className='btns flex'>
                        <button className='mx-1'>
                          <ThumbUpOutlinedIcon />
                        </button>
                        <button className='mx-1'>
                          <ModeCommentOutlinedIcon />
                        </button>
                        <button className='mx-1'>
                          <ShareOutlinedIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}
