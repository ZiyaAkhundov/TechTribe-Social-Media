import React, { useEffect, useState } from 'react'
import img from "../../assets/image/Ziya.jpg"
import logo from "../../assets/image/Programmers (5).png"
import img1 from "../../assets/image/_DSC0187.jpg"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import './feed.css'
import Modal from './modal/modal'
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Post from '../../layouts/web/components/article/article'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Feeds() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [posts, setPosts] =useState([])
 
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/posts/feed/posts', {
          withCredentials: true,
        });
        setPosts(response.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getPost();
  }, [])
  return (
    <div className='content overflow-auto flex-1 scroll-smooth relative'>
      {posts.length<=0?  (
      <div className=' w-full h-full  spinner' >
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      </div>
      
    ) : (
      <div className='content-inner w-full'>
        <h2 className='Feed'>Feeds</h2>
        <div className='flex w-full'>
          <div className='w-80 md:w-90'>
            {posts.length > 0 ? (
                posts.map(post => (
                  <Post
                    key={post._id} // Don't forget to add a unique key prop when rendering in a loop
                    username={post.username}
                    context={post.desc}
                    contextImg={post.img}
                    likes={post.likes.length}
                    comments={post.comments.length + post.comments.reduce((totalReplies, comment) => totalReplies + comment.replies.length, 0)}
                    time={post.createdAt}
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
          </div>
          <div className='w-1/2 feeds-action relative'>
            <aside>
              <div className='actions border rounded-md p-2'>
                <div className='actions-header'>
                  <p>Actions</p>
                </div>
                <div className='btns'>
                  <button onClick={handleOpen} className="border my-1 h-10 flex items-center justify-center text-base font-semibold px-4 rounded text-gray-600 transition duration-150 ease-in-out hover:ease-in-out hover:bg-blue-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      className="fill-current social-svg"
                    >
                      <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                    </svg>
                    <span className=" mx-2 action-span">publish</span>
                    
                  </button>
                  <Modal open={open} handleClose={handleClose} handleOpen={handleOpen}/>
                  <button className="border my-1 h-10 flex items-center text-base font-semibold justify-center px-4 rounded text-gray-600 transition duration-150 ease-in-out hover:ease-in-out hover:bg-blue-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="fill-current social-svg">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                    <span className="  mx-2  action-span">Notification</span>
                  </button>
                </div>
              </div>
              <div className='social-activity mt-2 border rounded-md p-2'>
                <div className='social-header'>
                  <p>Follow Us on Social Media</p>
                </div>
                <div className='btns'>
                  <a href='https://www.youtube.com/@ProgrammersSchool' target='_blank' className="border social-media-tag my-1 h-10 flex justify-center items-center text-base font-semibold px-4 rounded text-gray-600 transition duration-150 ease-in-out hover:ease-in-out xl:justify-start">
                    <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/youtube-play.png" alt="youtube-play"  className='social-icons'/>
                    <span className="hidden mx-2 md:flex action-span">Youtube</span>
                  </a>
                  <a href='https://www.instagram.com/programmers.school/' target='_blank' className="border social-media-tag my-1 h-10 flex justify-center items-center text-base font-semibold px-4 rounded text-gray-600 transition duration-150 ease-in-out hover:ease-in-out xl:justify-start">
                    <img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/instagram-new.png" alt="instagram-new" />
                    <span className="hidden mx-2 md:flex action-span">Instagram</span>
                  </a>
                  <a href='https://www.threads.net/@programmers.school' target='_blank' className="border social-media-tag justify-center my-1 h-10 flex items-center text-base font-semibold px-4 rounded text-gray-600 transition duration-150 ease-in-out hover:ease-in-out xl:justify-start">
                    <svg aria-label="Threads" viewBox="0 0 192 192" height="25"
                      width="25" xmlns="http://www.w3.org/2000/svg"><path className="x19hqcy" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg>
                    <span className="hidden mx-2 md:flex action-span">Threads</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    )}
      
    </div>
  )
}
