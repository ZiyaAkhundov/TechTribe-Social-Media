const router = require('express').Router();
const Post = require('../models/Post');
const PostReport = require('../models/PostReport')
const CommentReport = require("../models/CommentReport")
const CommentReplyReport = require("../models/CommentReplyReport")
const csrfProtection = require('../middleware/csrfProtection')
const isAuthenticated =require('../middleware/authentication.js')

router.post('/',isAuthenticated,csrfProtection, async (req, res) => {
    try {
      const {type, postId, commentId,replyId, reason} = req.body;
      const post = await Post.findById(postId);
      if(!post) return res.status(404).json({message:"Post not found!", status:"error"})
      if(!reason) return res.status(400).json({message:'Please Write Reason!',status:"error"})
      if(type == 2 || type == 3){
        var comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            res.status(404).json({ message: "Comment not found", status: "error" });
            return;
        }
      }
      const schema = {
        postId: postId,
        Reason: reason,
        checked: false
        }
      if(type == 1){
        const check = await PostReport.find({postId:postId})
        if(check.length) return res.status(200).json({message:"You already reported this!",status:'warning'})
        const newPostReport = new PostReport(schema)
        await newPostReport.save();
        res.status(200).json({ message: "Report created successfully! Check the chat box often for the report result.", status: "success" });
      }
      else if(type == 2){
        const check = await CommentReport.find({commentId:commentId})
        if(check.length) return res.status(200).json({message:"You already reported this!",status:'warning'})
        const newCommentReport = new CommentReport({...schema,commentId})
        await newCommentReport.save();
        res.status(200).json({ message: "Report created successfully! Check the chat box often for the report result.", status: "success" });
      }
      else if(type == 3){
        const check = await CommentReplyReport.find({replyId:replyId})
        if(check.length) return res.status(200).json({message:"You already reported this!",status:'warning'})
        const commentIndex = comment.commentReply.findIndex((reply) => reply._id.toString() === replyId);
        if (commentIndex === -1) {
            res.status(404).json({ message: "Reply not found", status: "error" });
            return;
        }
        const newCommentReplyReport = new CommentReplyReport({...schema,commentId,replyId})
        await newCommentReplyReport.save();
        res.status(200).json({ message: "Report created successfully! Check the chat box often for the report result.", status: "success" });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports =router;