import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Avatar from "@mui/material/Avatar";
import { PostLike,PostComment } from "../../../../../services/Posts";
import "./modal.css";
import img from "../../../../../assets/image/no image.png";
import { useState } from "react";
import { toast } from "react-toastify";

import Comment from "../comments/comment"

export default function articleModal({
  open,
  handleClose,
  data,
  islike,
  setIsLike,
  setLikeLength,
  likelength,
  setCommentsLength,
  handleOpenReportModal,
  handleReport
}) {

  const PF = import.meta.env.VITE_API_IMAGE_URL;
  const [comments,setComments] = useState(data.comments)
  const [value,setValue] = useState("");
  const[disable,setDisable] = useState(false)

  const handleLike = async () => {
    try {
      await PostLike({ postId: data._id});
    } catch (error) {
      console.log(error);
    }
    setLikeLength(islike ? likelength - 1 : likelength + 1);
    setIsLike((prev) => !prev);
  };

  const handleComment = async() => {
    setDisable(true)
    if(value){
      const response = await PostComment({postId: data._id,context:value})
      if(response.status == "success"){
        setComments(response.data)
        setCommentsLength(prev=> prev+1)
        setValue("")
        setDisable(false)
      }
      else{
        toast.error(response.message)
      }
    }
    else{
      toast.warning("Write comment!")
    }
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleComment();
    }
  };

  
  return (
    <div>
      <Modal open={open} onClose={handleClose} className="article-modal">
        <Box className="article-modal-box">
          <div className="article-modal-img-section">
            <div>
              <CloseIcon
                className="text-white !w-10 !h-10 cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="article-modal-img">
              <img
                src={data.img ?  data.img.url : img}
                alt=""
                className="article-m-img"
              />
            </div>
          </div>
          <div className="article-m-c">
            <div className="article-modal-comment">
              <div className="article-modal-user">
                <div className="flex justify-start items-center p-3">
                  <Avatar
                    src={data.userPicture && data.userPicture.url}
                    sx={{ height: 40, width: 40 }}
                    className="rounded-full"
                  ></Avatar>
                  <h3 className="mx-2 text-23 article-modal-username">
                    {data.username}
                  </h3>
                </div>
                <div className="article-user-comment">
                  <h3>{data.desc}</h3>
                  <div className="article-commet-btn">
                    <button
                      className={islike ? "text-blue-500" : null}
                      onClick={handleLike}
                    >
                      <ThumbUpOutlinedIcon />
                      <span>{likelength ? likelength : null}</span>
                      <span>likes</span>
                    </button>
                    <button className="mx-1">
                      <ModeCommentOutlinedIcon />
                      <span>comments</span>
                    </button>
                    <button className="mx-1">
                      <ShareOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    comment={comment}
                    postId={data._id}
                    key={comment._id}
                    setComments={setComments}
                    setCommentsLength={setCommentsLength}
                    handleReport={handleReport}
                    handleOpenReportModal={handleOpenReportModal}
                  />
                ))
              ) : (
                <div className="text-center p-4">No comments found!</div>
              )}
            </div>
            <div className="commentInput">
              <div>
                <input
                  type="text"
                  placeholder="Write a comment"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyUp={handleKeyUp}
                />
                <button onClick={handleComment} disabled={disable} className={disable ? 'opacity-60':null}>Post</button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
