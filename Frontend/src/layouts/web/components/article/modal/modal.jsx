import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { getAPost, PostLike } from "../../../../../services/Posts";
import "./modal.css";
import img from "../../../../../assets/image/no image.png";

export default function articleModal({
  open,
  handleClose,
  data,
  islike,
  setIsLike,
  setLikeLength,
  likelength,
}) {
  const { user } = useSelector((state) => state.auth);
  const PF = import.meta.env.VITE_API_IMAGE_URL;
  const handleLike = async () => {
    try {
      await PostLike({ postId: data._id });
    } catch (error) {
      console.log(error);
    }
    setLikeLength(islike ? likelength - 1 : likelength + 1);
    setIsLike((prev) => !prev);
  };

  const handleComment = () => {};

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
                src={data.img ? PF + data.img : img}
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
                    src={PF + data.userPicture}
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
                    <button className="mx-1" onClick={handleComment}>
                      <ModeCommentOutlinedIcon />
                      <span>comments</span>
                    </button>
                    <button className="mx-1">
                      <ShareOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
              {data.comments.length > 0 ? (
                data.comments.map((comment) => {
                  return (
                    <div className="comments-section" key={comment._id}>
                      <div className="article-comment">
                        <div className="flex justify-start items-center p-3">
                          <Avatar
                            src={PF + comment.userImg}
                            sx={{ height: 30, width: 30 }}
                            className="rounded-full"
                          ></Avatar>
                          <h3 className="mx-2 text-1 article-comment-username">
                            {comment.username}
                          </h3>
                        </div>
                        <div className="article-comment-cm">
                          <h4>{comment.context}</h4>
                        </div>
                        <div className="cm-actions">
                          <button className="mx-1">
                            <ThumbUpOutlinedIcon />
                            <span>likes</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center p-4">No comments found!</div>
              )}
            </div>
            <div className="commentInput">
              <div>
                <input type="text" placeholder="Write a comment" />
                <button>Post</button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
