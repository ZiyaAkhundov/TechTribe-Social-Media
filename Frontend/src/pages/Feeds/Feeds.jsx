import React, { useEffect, useState, useRef, useCallback, forwardRef} from 'react'
import {Link} from 'react-router-dom'
import logo from "../../assets/image/logo.png"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import Modal from './modal/modal'
import Post from '../../layouts/web/components/article/article'
import { useSelector } from "react-redux";
import {getPosts} from "../../services/Posts"
import './feed.css'
import '../../layouts/web/components/article/article.css'

export default function Feeds() {
  const [noPost,setNoPost] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [posts, setPosts] =useState([])
  const PIC =import.meta.env.VITE_API_IMAGE_URL
  const { user } = useSelector((state) => state.auth);
  const [limit, setLimit] =useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const getPost = async () => {
    setLoading(true)
    try {
      const response = await getPosts(limit)
      if(response.status == "warning"){
        setNoPost(true)
        setPosts([])
        setLoading(false)
      }
      else if(response.data.length){
        setPosts((prevPosts) => [...prevPosts,...response.data]);
        setLimit(limit + 1)
        setLoading(false)
        setHasMore(response.data.length > 0)
      }
      else{
        setHasMore(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
useEffect(()=>{
  getPost();
},[user])

  const contentRef = useRef();
  const lastElementRef = useCallback( node =>{
    if (loading || !node) return
    if(contentRef.current) contentRef.current.disconnect()
    contentRef.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        getPost()
      }
    })
  if(node) contentRef.current.observe(node)
  },[loading,hasMore])
  return (
    <div className="content overflow-auto flex-1 scroll-smooth relative">
      <div className="content-inner w-full">
        <div className="flex w-full">
          <div className=" w-full md:w-90">
            <div className="w-[85%] mx-auto feed-top">
              <div className="m-5 bg-white border rounded-md shadow-feed">
                <div className="flex gap-3 items-center w-full p-3 justify-center">
                  <div>
                    <Link to={"/profile/" + user.username}>
                      <Avatar
                        src={user.picture && PIC + user.picture}
                        sx={{ width: 40, height: 40 }}
                        className="border"
                      />
                    </Link>
                  </div>
                  <div className="w-full">
                    <div
                      onClick={handleOpen}
                      className="bg-white w-full py-3 rounded-3xl shadow-sm cursor-pointer hover:bg-gray-50 transition-all ease-in-out border"
                    >
                      <span className="text-gray-500 font-semibold font-sans mx-3">
                        Start a Post
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-2">
                  <button className="mx-3" onClick={handleOpen}>
                    <PhotoOutlinedIcon className="text-blue-500" />
                    <span>Photo</span>
                  </button>
                  <button className="mx-3" onClick={handleOpen}>
                    <StickyNote2OutlinedIcon className="text-pink-500" />
                    <span>Write Text</span>
                  </button>
                </div>
              </div>
            </div>
            <div>
              {noPost ? (
                <div className="flex justify-center items-center text-center py-9">
                  No posts found.<br></br> You can follow the accounts and see
                  their posts here
                </div>
              ) : posts.length > 0 ? (
                posts.map((post,index) => {
                  if(posts.length === index +1){
                    return <Post
                    forwardRef={lastElementRef}
                    key={post._id}
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    setNoPost={setNoPost}
                  />
                  } else{
                    return <Post
                    key={post._id}
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    setNoPost={setNoPost}
                  />
                  }
                  
                }
                
                )
              ) : (
                <>
                  <Card className="w-[100%] md:w-[80%] mx-auto mt-6">
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
                  <Card className="w-[100%] md:w-[80%] mx-auto mt-6">
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
                </>
              )}
            </div>
            {loading && 
                <div className="">
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="loader">
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                    </div>
                  </div>
                </div>
              }
          </div>
          <Modal
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
            setPosts={setPosts}
            setNoPost={setNoPost}
            setLimit={setLimit}
          />
          <div className="w-1/2 feeds-action relative">
            <aside>
              <Card sx={{ maxWidth: 300 }} className="w-[300px]">
                <CardMedia
                  sx={{ height: 140 }}
                  image={logo}
                  title="TechTribe"
                  className="techtribe"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    TechTribe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    TechTribe is a social media platform developed by{" "}
                    <a
                      href="https://github.com/ZiyaAkhundov"
                      target="_blank"
                      className="text-blue-500"
                    >
                      Ziya Akhundov
                    </a>
                    . This project is a fullstack MERN project. In this project
                    you can create account, follow people, create posts, like,
                    comment posts and also chat with your friends.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className="font-extrabold">
                    Share
                  </Button>
                  <Button size="small">
                    <a
                      href="https://github.com/ZiyaAkhundov/TechTribe-Social-Media"
                      target="_blank"
                    >
                      Learn More
                    </a>
                  </Button>
                </CardActions>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

