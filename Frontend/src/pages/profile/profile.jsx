import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import img from "../../assets/image/Ziya.jpg"
import logo from "../../assets/image/Programmers (5).png"
import img1 from "../../assets/image/_DSC0187.jpg"
import { NavLink, useParams } from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Post from "../../layouts/web/components/article/article"
import "./profile.css"
export default function profile() {

  const [posts, setPosts] =useState([])
  const [user, setUser] =useState(null)

  const username = useParams().username
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/users/' + username, {
        withCredentials: true,
      });
      setUser(response.data);
      console.log(response.data);
    };
  
    const getPost = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/posts/profile/' + username, {
          withCredentials: true,
        });
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getUser();
    getPost();
  }, [username]);
  
  if(!user){
    return(
      <div>Sorry this page is not avaiable</div>
    )
  }

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
                  <p> {username}</p>
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
                    <span className='mx-1'>{posts && posts.length}</span>
                    <span className='mx-1'>post</span>
                  </div>
                  <div className='profile-followers'>
                    <button>
                      <span className='mx-1'>{user && user.followers.length}</span>
                      <span className='mx-1'>followers</span>
                    </button>
                  </div>
                  <div className='profile-followings'>
                    <button>
                      <span className='mx-1'>{user && user.followings.length}</span>
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
              {posts.length > 0 ? (
                posts.map(post => (
                  <Post
                    key={post._id} // Don't forget to add a unique key prop when rendering in a loop
                    username={user.username}
                    context={post.desc}
                    contextImg={post.img}
                    likes={post.likes}
                    comments={post.comments.length + post.comments.reduce((totalReplies, comment) => totalReplies + comment.replies.length, 0)}
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}
