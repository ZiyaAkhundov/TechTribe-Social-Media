import React, { useEffect, useState } from "react";
import Article from "../../layouts/web/components/article/article";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAPost } from "../../services/Posts";
import { getUserbyId } from "../../services/Home";
import { Avatar } from "@mui/material";
import "./post.css";

export function Post() {
  const postId = useParams().id;
  const { user } = useSelector((state) => state.auth);
  const PIC = import.meta.env.VITE_API_IMAGE_URL;
  const [userData, setUserData] = useState();
  const [post, setPost] = useState();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await getAPost({ id: postId });
        if (response.status == "error") {
          setDeleted(true);
        } else {
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        setDeleted(true);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await getUserbyId(post.userId);
      if (response.status == "success") {
        setUserData(response.data);
      }
    };
    post && getUser();
  }, [post]);

  return (
    <div className="content overflow-auto flex-1 scroll-smooth relative">
      <div className="content-inner w-full">
        <div className="flex w-full post-cont">
          <div className="w-full">
            {deleted ? (
              <div>Post not found! Please make sure the link is correct</div>
            ) : (
              post && (
                <Article post={post} self={true} setDeleted={setDeleted} />
              )
            )}
          </div>
          <div className="post-as-div max-w-[400px] w-[400px]">
            <aside className="aside-post max-w-[400px] w-[400px] shadow-lg flex justify-center bg-white h-64 relative top-6 rounded">
              {userData ? (
                <NavLink to={`../profile/${userData.username}`}>
                  <div className="post-user py-2 flex flex-col items-center">
                    <Avatar
                      src={userData.picture && userData.picture.url}
                      className="h-28 w-28 border post-user-pic"
                    />
                    <h3 className="text-4xl overflow-x-auto max-w-[600px] post-user-name">
                      {userData.username}
                    </h3>
                  </div>
                  <div className="flex gap-3 justify-center post-user-data">
                    <div>{userData.post} Posts</div>
                    <div>{userData.followers} followers</div>
                    <div>{userData.followings} followings</div>
                  </div>
                </NavLink>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
