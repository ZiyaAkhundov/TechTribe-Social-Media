const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');
const { cloudinary, storage } = require('../utils/cloudinary');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const addUsernameAndUserPicture = require('../functions/addUsernameAndUserPicture')
const commentsWFData = require('../functions/commentsWFData')
const isAuthenticated =require('../middleware/authentication.js')
const csrfProtection = require('../middleware/csrfProtection')
dotenv.config()
const parser = multer({ storage: storage });
//create a post
router.post('/', parser.single('image'), isAuthenticated, csrfProtection, async (req, res) => {
    const { userId, desc } = req.body;

    if (userId != req.session.userId.toString()) {
        return res.status(403).json({ message: "You are not permission to perform this action!", status: "error" });
    }

    try {
        let newPost;
        
        if (req.file) {
            const result = req.file;
            console.log(JSON.stringify(result))
            
            newPost = new Post({
                userId: userId,
                img: {
                    public_id: result.filename,
                    url: result.path
                },
                desc: desc
            });
        } else if (desc) {
            newPost = new Post({
                userId: userId,
                desc: desc
            });
        } else {
            return res.status(400).json("Please write text or choose an image!");
        }

        await newPost.save();
        res.status(200).json({ message: "Post created successfully!", status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


//delete a post
router.delete('/:id',isAuthenticated,csrfProtection, async(req,res)=>{
    try {
        const post = await  Post.findById(req.params.id);
        if(post.userId === req.session.userId.toString()){
            if(post.img.public_id){
                const public_id = post.img.public_id;
                console.log(true)
                try {
                    await cloudinary.uploader.destroy(public_id);
                } catch (cloudinaryError) {
                    console.error('Cloudinary Error:', cloudinaryError);
                    return res.status(500).json({ message: 'Failed to delete photo', status: 'error' });
                }
            }
            await post.deleteOne();
            res.status(200).json({message:"Post has been deleted!", status:"success"});
        }
        else{
            res.status(403).json("You can't delete this post");
        }
        
    } catch (err){
        res.status(500).json(err)
    }
})

//get a post
router.get('/find/:id',isAuthenticated, async(req,res)=>{
    
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
             res.status(400).json({ message: "Invalid post", status: 'error' });
             return
          }
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({message:"Post not found",status:'error'})
            return
        }
        const postsWithUsername = await addUsernameAndUserPicture(post);

        res.status(200).json({status:"success",data:postsWithUsername})
    } catch (err){
        res.status(500).json(err)
        console.log(err)
    }
})

//get feed posts
const ITEMS_PER_LIMIT = 5; 

router.get('/feed/posts', isAuthenticated, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1;
    const currentUser = await User.findById(req.session.userId);

    
    const skipCount = (limit - 1) * ITEMS_PER_LIMIT;

    const userPosts = await Post.find({ userId: currentUser._id })
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(ITEMS_PER_LIMIT);

    const friendPosts = await Promise.all(
      currentUser.followings.map(async (friendId) => {
        return await Post.find({ userId: friendId })
          .sort({ createdAt: -1 })
          .skip(skipCount)
          .limit(ITEMS_PER_LIMIT);
      })
    );

    const concatedData = userPosts.concat(...friendPosts);

    concatedData.sort((a, b) => b.createdAt - a.createdAt);

    const postsWithUsername = await Promise.all(
      concatedData.map(async (post) => {
        return await addUsernameAndUserPicture(post);
      })
    );

    if (!postsWithUsername.length && limit == 1) {
      return res.status(200).json({ message: "There are no posts", status: "warning" });
    }

    res.status(200).json({ data: postsWithUsername, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a user's posts
router.get('/profile/:username',isAuthenticated, async(req,res)=>{
    try {
       const user = await User.findOne({username: req.params.username});
       if(!user){
        res.status(404).json({message:"User not found",status: "warning"});
        return;
       }
       const posts = await Post.find({userId: user._id});
       if(posts.length==0){
        res.status(200).json({message:"There are no posts",status: "warning"})
        return;
       }
       const userPosts = await Promise.all(
        posts.map(async (post) => {
          return await addUsernameAndUserPicture(post)
        })
      );
        res.status(200).json({userPosts});
    } catch (err){
        res.status(500).json(err)
    }
})

// like and dislike a post
router.put('/like/:id',isAuthenticated,csrfProtection, async(req,res)=>{
    try {
        console.log(req.session.userId.toString())
       const post = await Post.findById(req.params.id);
       if(post.likes.includes(req.session.userId.toString())){
            await post.updateOne({$pull:{likes:req.session.userId.toString()}})
            res.status(200).json("The post was unliked successfully");
       }
       else{
        await post.updateOne({$push:{likes:req.session.userId.toString()}})
        res.status(200).json("The post was liked successfully");
       }
    } catch (err){
        res.status(500).json(err)
    }
})

// comment a post
router.put('/comment/:id', isAuthenticated,csrfProtection, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({message:"Post not found",status:"error"});
            return;
        }
        const user = await User.findById(req.session.userId)
        if(!user){
            res.status(404).json({message:"User not found",status:"error"});
            return;
        }
        if(!req.body.context) return res.status(404).json({message:'Please write comment', status:'error'})
        const newComment = { _id:uuidv4(),userId:user._id, context: req.body.context};
        await Post.updateOne({ _id: req.params.id }, { $push: { comments: newComment } });
        const data = await Post.findById(req.params.id);
        const commentwFullData = await Promise.all(
            data.comments.map(async (comment) => {
              return await commentsWFData(comment)
            })
          );
        res.status(200).json({message:"The post was commented successfully", status:"success", data:commentwFullData});
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// comment like
router.put('/comment/:id/:commentId/like', isAuthenticated, csrfProtection, async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found", status: "error" });
            return;
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);

        if (!comment) {
            res.status(404).json({ message: "Comment not found", status: "error" });
            return;
        }
        const userId = req.session.userId.toString();

        if (comment.commentLikes.includes(userId)) {
            comment.commentLikes.pull(userId);
            await post.save();
            res.status(200).json("The comment was unliked successfully");
        } else {
            comment.commentLikes.push(userId);
            await post.save();
            res.status(200).json("The comment was liked successfully");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//comment delete
router.delete('/comment/:id/:commentId/delete',isAuthenticated,csrfProtection, async(req,res)=>{
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found", status: "error" });
            return;
        }

        const commentIndex = post.comments.findIndex(comment => comment._id === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found', status: 'error' });
        }

        const comment = post.comments[commentIndex];

        if (comment.userId === req.session.userId.toString()) {

            post.comments.pull(commentId);
            await post.save();
            const commentwFullData = await Promise.all(
                post.comments.map(async (comment) => {
                  return await commentsWFData(comment)
                })
              );

            return res.status(200).json({ message: 'Comment has been deleted!', status: 'success',data: commentwFullData });
        } else {
            return res.status(403).json({message:"You can't delete this comment",status: "error"});
        }
        
    } catch (err){
        res.status(500).json(err)
    }
})

// comment a reply
router.put('/comment/:id/:commentId/reply',isAuthenticated,csrfProtection, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.session.userId.toString();
        const commentIdToReply = req.params.commentId;

        const post = await Post.findById(postId);
        const user = await User.findById(userId)

        if (!post) {
            res.status(404).json({message:"Post not found",status:"error"});
            return;
        }

        const commentToReply = post.comments.find(comment => comment._id === commentIdToReply);

        if (!commentToReply) {
            res.status(404).json({message:"Comment not found",status:'error'});
            return;
        }
        if(!req.body.context) return res.status(404).json({message:"Please write comment!", status:'error'})
        const newReplyComment = { _id:uuidv4(),userId: user._id, context: req.body.context};

        commentToReply.commentReply.push(newReplyComment);

        await post.save();
        const postData = await Post.findById(req.params.id);
        const commentwFullData = await Promise.all(
            postData.comments.map(async (comment) => {
              return await commentsWFData(comment)
            })
          );
        
        res.status(200).json({message:"Comment reply sent successfully",status:"success",data:commentwFullData});
    } catch (err) {
        res.status(500).json(err);
    }
});

// comment reply like
router.put('/comment/:postId/:commentId/:replyId/like', isAuthenticated, csrfProtection, async (req, res) => {
    try {
        const {postId , commentId ,replyId} = req.params

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found", status: "error" });
            return;
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);

        if (!comment) {
            res.status(404).json({ message: "Comment not found", status: "error" });
            return;
        }

        const commentIndex = comment.commentReply.findIndex((reply) => reply._id.toString() === replyId);
        if (commentIndex === -1) {
            res.status(404).json({ message: "Reply not found", status: "error" });
            return;
        }

        const userId = req.session.userId.toString();

        if (comment.commentReply[commentIndex].commentLikes.includes(userId)) {
            comment.commentReply[commentIndex].commentLikes.pull(userId);
            await post.save();
            res.status(200).json({message:"The comment was unliked successfully", status:"success"});
        } else {
            comment.commentReply[commentIndex].commentLikes.push(userId);
            await post.save();
            res.status(200).json({message:"The comment was liked successfully", status:"success"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete reply
router.delete('/comment/:id/:commentId/:replyId/delete',isAuthenticated,csrfProtection, async(req,res)=>{
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const replyId = req.params.replyId
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: "Post not found", status: "error" });
            return;
        }
        
        const comment = post.comments.find((comment) => comment._id.toString() === commentId);
        if (!comment) {
            res.status(404).json({ message: "Comment not found", status: "error" });
            return;
        }
        
        const commentIndex = comment.commentReply.findIndex((reply) => reply._id.toString() === replyId);
        if (commentIndex === -1) {
            res.status(404).json({ message: "Reply not found", status: "error" });
            return;
        }

        const commentreply = comment.commentReply[commentIndex];

        if (commentreply.userId === req.session.userId.toString()) {
            const update = {
                $pull: {
                    'comments.$[outer].commentReply': { _id: replyId }
                }
            };
        
            const options = {
                arrayFilters: [{ 'outer._id': commentId }]
            };

            const updatedPost = await Post.findOneAndUpdate(
                { _id: postId },
                update,
                options,
                { new: true } 
            );
               
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found", status: "error" });
            }
            const renewedPost = await Post.findById(postId)
            const commentwFullData = await Promise.all(
                renewedPost.comments.map(async (comment) => {
                  return await commentsWFData(comment)
                })
              );
            return res.status(200).json({ message: 'Comment has been deleted!', status: 'success', data: commentwFullData });
        } else {
            return res.status(403).json({ message: "You can't delete this comment", status: "error" });
        }
        
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router