const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const isAuthenticated =require('../middleware/authentication.js')
const csrfProtection = require('../middleware/csrfProtection')
dotenv.config()

//create a post
router.post('/', isAuthenticated, async(req,res)=>{
    if (req.body.userId != req.session.userId.toString()) {
        console.log(req.body)
        console.log(req.session.userId.toString())

        return res.status(403).json({ message: "You are not permission to perform this action!",status: "error"})
    }
    const newPost = await new Post(req.body)
    console.log(newPost)
    try {
       await newPost.save();
        res.status(200).json({message:"Post created succesfully!", status:"success"});
    } catch (err){
        res.status(500).json(err)
    }
})

//update a post
router.put('/:id',isAuthenticated, async(req,res)=>{
    try {
        const post = await  Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("Post has been updated!");
        }
        else{
            res.status(403).json("You can't update");
        }
        
    } catch (err){
        res.status(500).json(err)
    }
})

//delete a post
router.delete('/:id',isAuthenticated,csrfProtection, async(req,res)=>{
    try {
        const post = await  Post.findById(req.params.id);
        if(post.userId === req.session.userId.toString()){
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
router.get('/:id',isAuthenticated,csrfProtection, async(req,res)=>{
    
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json("Post not found")
            return
        }
        res.status(200).json(post)
    } catch (err){
        res.status(500).json(err)
    }
})

//get feed posts
router.get('/feed/posts',isAuthenticated, csrfProtection, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    const concatedData=userPosts.concat(...friendPosts);
    const postsWithUsername = await Promise.all(
        concatedData.map(async (post) => {
          const { userId } = post;
          const user = await User.findById(userId);
          const username=user.username;
          const userPicture = user.picture;
          return {
            ...post.toObject(),
            username,
            userPicture
          };
        })
      );
  if(!postsWithUsername.length){
    return res.status(200).json({message:"There are no posts",status: "warning"})
  }

    res.status(200).json(postsWithUsername);
  } catch (err) {
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
       const userPicture = user.picture;
       const userPosts = posts.map((post) => ({
        ...post.toObject(),
        userPicture: userPicture,
        username: user.username
      }));
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
            res.status(404).json("Post not found");
            return;
        }
        const user = await User.findById(req.session.userId)
        if(!user){
            res.status(404).json("User not found");
            return;
        }
        const newComment = { _id:uuidv4(),username: user.username, context: req.body.context,userImg:user.picture };
        await Post.updateOne({ _id: req.params.id }, { $push: { comments: newComment } });
        const comments = post.comments;
        res.status(200).json({message:"The post was commented successfully",status:"success",data:comments});
    } catch (err) {
        res.status(500).json(err);
    }
});
// comment a reply
router.put('/comment/:id/:userId/:commentId',isAuthenticated, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.params.userId;
        const commentIdToReply = req.params.commentId;

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json("Post not found");
            return;
        }

        const commentToReply = post.comments.find(comment => comment._id === commentIdToReply);

        if (!commentToReply) {
            res.status(404).json("Comment to reply not found");
            return;
        }

        const newReplyComment = { userId, context: req.body.context };

        if (!commentToReply.replies) {
            commentToReply.replies = [];
        }
        commentToReply.replies.push(newReplyComment);

        await post.save();
        
        res.status(200).json("Comment reply sent successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router