import React, {useState, useEffect}from 'react'
import { NavLink } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import TimeAgo from 'react-timeago'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useSelector } from "react-redux";
import {ReplyDelete,replyCommentLike} from "../../../../../services/Posts"

const ITEM_HEIGHT = 20;
export default function Replies({commentreply,postId,setComments,commentId,handleOpenReportModal,handleReport}) {
    const { user } = useSelector((state) => state.auth);
    const [commentLikeLength, setCommentLikeLength] = useState(commentreply.commentLikes.length);
    const [commentIsLike, setCommentIsLike] = useState(false);
    const formatter = buildFormatter(EnStrings);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openddown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      const userLikes = commentreply.commentLikes.some((likes) =>
        likes.includes(user.id)
      );
      setCommentLikeLength(commentreply.commentLikes.length);
      if (userLikes) {
        setCommentIsLike(true);
      } else {
        setCommentIsLike(false);
      }
    }, [user.id,commentreply.commentLikes]);

    const handleCommentLike = async (replyId) => {
      try {
         await replyCommentLike({ postId: postId, commentId: commentId, replyId:replyId});
      } catch (error) {
        console.log(error);
      }
      setCommentLikeLength(
        commentIsLike ? commentLikeLength - 1 : commentLikeLength + 1
      );
      setCommentIsLike((prev) => !prev);
    };

    const handleDelete = async(replyId)=>{
      const response = await ReplyDelete ({postId: postId, commentId: commentId ,replyId:replyId})
      if(response.status == 'success'){
        setComments(response.data)
      }
      else{
        toast.error(response.message)
      }
    }
  return (
    <div className="my-1 mx-6">
      <div className="flex justify-between items-center p-3">
        <NavLink
          to={`../profile/${commentreply.username}`}
          className="flex justify-start items-center"
        >
          <Avatar
            src={commentreply.userPicture && commentreply.userPicture.url}
            sx={{ height: 30, width: 30 }}
            className="rounded-full border"
          ></Avatar>
          <h3 className="mx-2 text-1 article-comment-username">
            {commentreply.username}
          </h3>
        </NavLink>
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
                },
              }}
            >
              {user.username == commentreply.username ? (
                <MenuItem
                  onClick={() => handleDelete(commentreply._id)}
                  className=" !text-red-500"
                >
                  Delete
                </MenuItem>
              ) : null}
              {user.username != commentreply.username ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleOpenReportModal();
                    handleReport({
                      type: 3,
                      postId: postId,
                      commentId: commentId,
                      replyId: commentreply._id,
                    });
                  }}
                >
                  Report
                </MenuItem>
              ) : null}
            </Menu>
          </div>
        </div>
      </div>
      <div className="article-comment-cm">
        <h4 className="px-4 overflow-anywhere flex">{commentreply.context}</h4>
      </div>
      <div className="cm-actions flex justify-between px-5">
        <button
          className={commentIsLike ? "text-blue-500" : null}
          onClick={() => handleCommentLike(commentreply._id)}
        >
          <ThumbUpOutlinedIcon />
          <span>{commentLikeLength}</span>
          <span>likes</span>
        </button>
        <TimeAgo
          date={commentreply.createdAt}
          formatter={formatter}
          className="text-gray-500 !text-sm font-time font-bold"
        />
      </div>
    </div>
  );
}
