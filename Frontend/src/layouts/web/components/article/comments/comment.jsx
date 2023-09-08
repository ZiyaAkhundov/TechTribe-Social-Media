import React ,{useState,useEffect} from 'react'
import Avatar from "@mui/material/Avatar";
import TimeAgo from 'react-timeago'
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { CommentLike,CommentDelete,ReplyComment } from "../../../../../services/Posts";
import { useSelector } from "react-redux";
import Replies from './replies'

const ITEM_HEIGHT = 20;
export default function Comment({comment,postId,setComments,setCommentsLength}) {
    const PF = import.meta.env.VITE_API_IMAGE_URL;
    const { user } = useSelector((state) => state.auth);
    const [commentIsLike, setCommentIsLike] = useState(false);
    const [commentLikeLength, setCommentLikeLength] = useState(0);
    const [replycomments, setReplyComments] = useState(false)
    const [showReply, setShowReply] = useState(false)
    const [reply, setReply] = useState(false)
    const [replyContext, setReplyContext] = useState('')
    const formatter = buildFormatter(EnStrings);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openddown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const sendReply = async (id) => {
      const response = await ReplyComment({ postId: postId, commentId: id,context: replyContext });
      if(response.status == 'success'){
        setComments(response.data)
        setCommentsLength(response.data.length)
        setReplyContext('')
        return
      }
      toast.error(response.message)
    };

    const DeleteComment = async(commentId) => {
      const response = await CommentDelete ({postId: postId, commentId: commentId })
      if(response.status == 'success'){
        setComments(response.data)
        setCommentsLength(response.data.length)
      }
      else{
        toast.error(response.message)
      }
    }

    const handleCommentLike = async (commentId) => {
      try {
        await CommentLike({ postId: postId, commentId: commentId });
      } catch (error) {
        console.log(error);
      }
      setCommentLikeLength(
        commentIsLike ? commentLikeLength - 1 : commentLikeLength + 1
      );
      setCommentIsLike((prev) => !prev);
    };

    useEffect(() => {
      const userLikes = comment.commentLikes.some((likes) =>
        likes.includes(user.id)
      );
      setCommentLikeLength(comment.commentLikes.length);
      if (userLikes) {
        setCommentIsLike(true);
      } else {
        setCommentIsLike(false);
      }
    }, [user.id, comment.likes]);

    useEffect(()=>{
      if(comment.commentReply.length > 0){
        setReplyComments(true)
        return
      }
      setReplyComments(false)
    },[comment])

  return (
    <div className="comments-section" key={comment._id}>
      <div className="article-comment" >
        <div className="flex justify-between items-center p-3">
          <div className="flex justify-start items-center">
            <Avatar
              src={PF + comment.userImg}
              sx={{ height: 30, width: 30 }}
              className="rounded-full border"
            ></Avatar>
            <h3 className="mx-2 text-1 article-comment-username">
              {comment.username}
            </h3>
          </div>
          <div>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={openddown}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                    boxShadow: '0px 1px 1px 0px rgb(177 177 177 / 20%), 0px 2px 3px 1px rgb(147 147 147 / 14%), 0px 2px 2px 1px rgb(212 212 212 / 12%)'
                  },
                }}
              >
                {user.username == comment.username ? (
                  <MenuItem
                    onClick={() => DeleteComment(comment._id)}
                    className=" !text-red-500"
                  >
                    Delete
                  </MenuItem>
                ) : null}
                {user.username != comment.username ? (
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                ) : null}
              </Menu>
            </div>
          </div>
        </div>
        <div className="article-comment-cm">
          <h4 className="px-4">{comment.context}</h4>
        </div>
        <div className="cm-actions flex justify-between px-5">
          <div className="flex justify-start gap-2 items-center">
            <button
              className={commentIsLike ? "text-blue-500" : null}
              onClick={() => handleCommentLike(comment._id)}
            >
              <ThumbUpOutlinedIcon />
              <span>{commentLikeLength}</span>
              <span>likes</span>
            </button>
            <button type="button" onClick={() => setReply((prev) => !prev)}>
              <ReplyRoundedIcon />
              <span>Reply</span>
            </button>
          </div>
          <TimeAgo
            date={comment.createdAt}
            formatter={formatter}
            className="text-gray-500 !text-sm font-time font-bold"
          />
        </div>
        {reply && (
          <div className="px-5 mx-1 border-t border-b py-2">
            <div className="flex items-start">
              <input
                name="replycomment"
                onChange={(e) => setReplyContext(e.target.value)}
                type="text"
                value={replyContext}
                className="px-3 py-1 outline-none border-gray-300 border rounded"
                placeholder="Reply comment"
              />
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded mx-1"
                onClick={() => sendReply(comment._id)}
              >
                send
              </button>
            </div>
          </div>
        )}
        {replycomments && 
        <div onClick={()=>setShowReply(prev=>!prev)}>
          <span className='text-blue-600 cursor-pointer'>Show replies</span>
        </div>
        }
        {showReply && 
          comment.commentReply.map((commentreply) => (
            <Replies commentreply={commentreply} key={commentreply._id} postId={postId} setComments={setComments} commentId={comment._id}/>
          ))}
      </div>
    </div>
  );
}
