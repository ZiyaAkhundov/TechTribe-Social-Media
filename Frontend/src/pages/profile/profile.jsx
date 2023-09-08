import React, { useEffect, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import '../../layouts/web/components/article/article.css'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Post from "../../layouts/web/components/article/article"
import { useSelector } from "react-redux";
import "./profile.css"
import 'react-loading-skeleton/dist/skeleton.css'
import {getUser,getUserPosts,Follow} from "../../services/Profile"
import {createMesRoom} from "../../services/Message"
import {ModalProfile} from "./modal/modal"
import { toast } from 'react-toastify';


export function Profile() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const handleOpen = (num) => { 
    if(num){
      setType(1)
      window.history.replaceState(null, "Followings", `/profile/${username}/followings`)
    }
    else{
      setType(0)
      window.history.replaceState(null, "Followers", `/profile/${username}/followers`)
    }
    setOpen(true) 
  };
  const handleClose = () => {setOpen(false); window.history.replaceState(null, '', `/profile/${username}`)};
  
  const [loading,setLoading] = useState(false)
  const [noPost, setNoPost] = useState(false)
  const [noUser, setNoUser] = useState(false)
  const [posts, setPosts] =useState([])
  const [User, setUser] =useState(null)
  const [userfollowers,setuserfollowers] = useState([]);
  const [userFollowings , setUserFollowings] = useState([])
  const [following, setFollowing] = useState(false)
  const [type,setType] = useState(0); //it is used for the modal to detect to get follower or following data
  const PIC =import.meta.env.VITE_API_IMAGE_URL
  const username = useParams().username
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserInfo = async () => {
      setFollowing(false);
      try {
        const response = await getUser({username:username});
        setUser(response);
        setuserfollowers(response.followers)
        setUserFollowings(response.followings)
        response.followers.map(follower=>{
          if(follower.id == user.id){
            setFollowing(true);
          }
        })
      } catch (error) {
        if(error.status =="error"){
          setNoUser(true)
        }
      }
    };
  
    const getPost = async () => {
      try {
        const response = await getUserPosts({username:username});
        if(response.status == "warning"){
          setNoPost(true)
        }
        setPosts(response.userPosts.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }));
        
      } catch (error) {
      }
    };
  
    getUserInfo();
    getPost();
  }, [username]);

  useEffect(()=>{
    setOpen(false)
    const urlContainsFollowers = window.location.href.includes('followers');
    if(urlContainsFollowers){
      handleOpen(0)
    }
    const urlContainsFollowings = window.location.href.includes('followings');
    if(urlContainsFollowings){
      handleOpen(1)
    }
    
  },[])
  
  const handleFollow = async() =>{
    setLoading(true)
    const response = await Follow({username:username})
    if(response.status == "success"){
      setFollowing(prev=>!prev);
      setuserfollowers(response.data);
      console.log(response.data)
      setLoading(false)
    }
    else{
      toast.error(response.message)
    }
    setLoading(false)
  }

  const createRoom = async()=>{
    const response = await createMesRoom({senderId:user.id, receiverId: User.id});
    if(response.status =="success"){
      navigate(`/Chat/${response.data.id}`)
    }
    else{
      toast.error(response.message)
    }
  }
  
  if(noUser){
    return (<div>Something went wrong</div>)
  }
  if(User){
    return (
      <section>
        <div className="content-profile">
          <div className="profile">
            <div className="profile-header">
              <div className="profile-img">
                <div className="profile-img-section">
                  <button className="change-img">
                    {User ? (
                      <Avatar
                        src={User.picture ? PIC + User.picture : null}
                        alt=""
                        sx={{ width: 140, height: 140 }}
                        className="border profile-pic"
                      />
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={140}
                        height={140}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="profile-section">
                <div className="profile-actions">
                  <div className="profile-username">
                    <p> {username}</p>
                  </div>
                  <div className="profile-edit">
                    {username != user.username ? (
                      <div className="flex items-center">
                        <button
                          className="follow disabled:opacity-50"
                          disabled={loading ? true : false}
                          onClick={handleFollow}
                        >
                          {following ? "Following" : "Follow"}
                        </button>
                        <button className='chat-btn' onClick={createRoom}>
                        <EmailOutlinedIcon className="mx-2 !h-9 !w-9 cursor-pointer chat-svg" />
                        </button>
                      </div>
                    ) : (
                      <NavLink to={"/settings"}>Edit profile</NavLink>
                    )}
                  </div>
                </div>
                <div className="profile-activity">
                  <div className="profile-activity-main">
                    <div className="profile-post">
                      <span className="mx-1">{posts ? posts.length : 0}</span>
                      <span className="mx-1">post</span>
                    </div>
                    <div className="profile-followers">
                      <button
                        onClick={() => {
                          handleOpen(0);
                        }}
                      >
                        <span className="mx-1">
                          {User && userfollowers.length}
                        </span>
                        <span className="mx-1">followers</span>
                      </button>
                    </div>
                    <div className="profile-followings">
                      <button
                        onClick={() => {
                          handleOpen(1);
                        }}
                      >
                        <span className="mx-1">
                          {User && userFollowings.length}
                        </span>
                        <span className="mx-1">followings</span>
                      </button>
                    </div>
                    {open && (
                      <ModalProfile
                        open={open}
                        handleClose={handleClose}
                        type={type}
                        username={username}
                        setuserfollowers={setuserfollowers}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-body">
              <div className="profile-body-header">
                <button>
                  <svg
                    aria-label=""
                    className="_ab6-"
                    color="rgb(245, 245, 245)"
                    fill="rgb(245, 245, 245)"
                    height="12"
                    role="img"
                    viewBox="0 0 24 24"
                    width="12"
                  >
                    <rect
                      fill="none"
                      height="18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="18"
                      x="3"
                      y="3"
                    ></rect>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="9.015"
                      x2="9.015"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="14.985"
                      x2="14.985"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="9.015"
                      y2="9.015"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="14.985"
                      y2="14.985"
                    ></line>
                  </svg>
                  <span className="mx-2">Post</span>
                </button>
              </div>
              <div className="profile-body-content justify-start">
                {noPost ? (
                  <div className="flex justify-center items-center p-4">
                    No Post Found
                  </div>
                ) : posts.length > 0 ? (
                  posts.map((post) => <Post key={post._id} post={post} setNoPost={setNoPost} setPosts={setPosts}/>)
                ) : (
                  <Card className="w-[80%] mx-auto">
                    <CardHeader
                      avatar={
                        <Skeleton
                          animation="wave"
                          variant="circular"
                          width={40}
                          height={40}
                        />
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={
                        <Skeleton
                          animation="wave"
                          height={10}
                          width="80%"
                          style={{ marginBottom: 6 }}
                        />
                      }
                      subheader={
                        <Skeleton animation="wave" height={10} width="40%" />
                      }
                    />
                    <Skeleton
                      sx={{ height: 190 }}
                      animation="wave"
                      variant="rectangular"
                    />
                    <CardContent>
                      <React.Fragment>
                        <Skeleton
                          animation="wave"
                          height={10}
                          style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation="wave" height={10} width="80%" />
                      </React.Fragment>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
}
