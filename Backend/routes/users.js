const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const { cloudinary, storage } = require('../utils/cloudinary');
const path= require('path');
const jwt = require('jsonwebtoken');
const isAuthenticated =require('../middleware/authentication.js')
const csrfProtection = require('../middleware/csrfProtection')
const multer = require('multer')
const parser = multer({ storage: storage });

async function followWFData(followId) {
    const user = await User.findById(followId);
    const username = user.username;
    const userPic = user.picture;
    const followWithUserData = {
      id:followId,
      username,
      userPic,
    };
  
    return followWithUserData;
  }
  
//update user
router.put('/update',csrfProtection,isAuthenticated, async(req,res)=>{
        if (req.body.currentPassword && req.body.newPassword && req.body.repeatNewPassword) {
            if (req.body.newPassword == req.body.repeatNewPassword) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const user = await User.findById(req.session.userId);
                    const userPassword = user.password;
                    const samePassword = await bcrypt.compare(req.body.newPassword, userPassword);
                    const validPassword = await bcrypt.compare(req.body.currentPassword, userPassword);
                    if (validPassword) {
                        req.body.password = await bcrypt.hash(req.body.newPassword, salt);
                    }
                    else{
                        return res.status(400).json({message:"Invalid password", status:'error'})
                    }
                    if(samePassword){
                        return res.status(400).json({message:"Your new password is the same as your current password. Please choose a different password.",status:"warning"})
                    }
                } catch (err) {
                    return res.status(500).send(err);
                }
            }
            else {
                return res.status(400).json({message:'The new password and the repeated new password do not match.', status:'Error'})
            }
        }
        if (req.body.username || req.body.email) {
            
            if (req.body.username) {
                try {
                    const checkUsername = await User.findOne({ username: req.body.username })
                    if (checkUsername && checkUsername.username !== req.session.username) {
                        return res.status(409).json({message:'The new username is already taken. Please choose another one.',status:'error'})
                    }
                } catch (err) {
                    return res.status(500).send(err);
                }
            }
            if (req.body.email) {
                try {
                    const checkEmail = await User.findOne({ email: req.body.email })
                    if (checkEmail && checkEmail.username !== req.session.username) {
                        return res.status(409).json({message:'The new email is already taken. Please choose another one.',status: 'error'})
                    }
                } catch (err) {
                    return res.status(500).send(err);
                }
            }

        }
        try {
            const user = await User.findByIdAndUpdate(req.session.userId, {
                $set: req.body
            })
            if(req.body.username){
                req.session.username = req.body.username
            }
            const userData = await User.findById(req.session.userId.toString())
            const structure = {
                id:userData._id,
                username: userData.username,
                email: userData.email,
                picture: userData.picture
            }

            res.status(200).json({message:"Account has been updated",status: "success",data:structure});
        } catch (err) {
            return res.status(500).send(err);
        }
    
})

//set photo
router.put('/picture', parser.single('image'), csrfProtection, isAuthenticated, async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userId);
        if (!currentUser) return res.status(404).json({ message: "User not found!", status: "error" })
        console.log('req.file: '+req.file)
        if (req.file) {
            const result = req.file;
            await currentUser.updateOne({
                $set: {
                    picture:
                    {
                        public_id: result.filename,
                        url: result.path
                    }
                }
            })
            return res.status(200).json({ message: 'Photo uploaded successfully', status: 'success' })
        }
        return res.status(404).json({message:'No Photo found!', status:'error'})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/picture',csrfProtection,isAuthenticated, async(req,res) =>{
    try {
        const currentUser = await User.findById(req.session.userId);
        if(!currentUser) return res.status(404).json({message:"User not found!",status:"error"})
        if (!currentUser.picture || !currentUser.picture.public_id) {
            return res.status(404).json({ message: 'No photo to delete', status: 'error' });
        }
        console.log(currentUser.picture.public_id)
        const public_id = currentUser.picture.public_id;
        try {
            await cloudinary.uploader.destroy(public_id);
        } catch (cloudinaryError) {
            console.error('Cloudinary Error:', cloudinaryError);
            return res.status(500).json({ message: 'Failed to delete photo from Cloudinary', status: 'error' });
        }
        await currentUser.updateOne({ $unset: { picture: 1 } });
        return res.status(200).json({message:'Photo removed successfully', status: 'success'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete user
router.delete('/:id', async(req,res)=>{
    if(req.body.userId = req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).send(err)
        }
        
    }
})

//get a user
router.get('/:username',isAuthenticated, async(req,res)=>{
    const username = req.params.username;
    try {
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({message:"User not found", status: "error"});
        }
        const followers = await Promise.all(
            user.followers.map(async (follower) => {
                return await followWFData(follower)
            })
        );
        const followings = await Promise.all(
            user.followings.map(async (following) => {
                return await followWFData(following)
            })
        );
        res.status(200).json({id:user._id,username: user.username,followers : followers,followings : followings,picture : user.picture});
    } catch (err) {
        return res.status(500).send(err);
    }
})
router.get('/id/:id',isAuthenticated, async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found", status: "error"});
        }
        const post = await Post.find({userId:user._id})
        res.status(200).json({status:"success", data:{id:user._id,username: user.username,followers : user.followers.length,followings : user.followings.length,post: post.length, picture : user.picture}});
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get users
router.get('/query/users', isAuthenticated, async (req, res) => {
    let query = req.query.user;
    if(!query){
        return
    }
    try {
        const listUsers = await User.find({ 
            $or: [ 
               { username: { '$regex': '.*' + query + '.*' ,$options:'i'} },
             ] 
           }).exec();
           let array =[];
            listUsers.map(user=>{
                if(user.id !== req.session.userId.toString()){
                    const {id,username,picture} = user
                     array.push({id,username,picture})
                }
           })
        res.status(200).json({ status: "success", data: array });
    } catch (err) {
        return res.status(500).send(err);
    }
});


//follow-unfollow a user
router.put('/:username/follow',csrfProtection,isAuthenticated, async(req,res)=>{
    if(req.session.username !== req.params.username){
        try {
            const user = await User.findOne({username:req.params.username});
            const currentUser = await User.findById(req.session.userId.toString());
            if(!user && !currentUser){
                return res.status(404).json({message:"user not found!", status:"error"})
            }
            let message;
            if (!user.followers.some(id => id === req.session.userId.toString())) {

                await user.updateOne({ $push: { followers: req.session.userId.toString() } });
                await currentUser.updateOne({ $push: { followings: user._id.toString() } });
                
                  message = "User has been followed!"
            } else {
                await user.updateOne({ $pull: { followers:req.session.userId.toString()  } });
                await currentUser.updateOne({ $pull: { followings:  user._id.toString()  } });

                message = "User has been unfollowed!"
            }

            const updatedUser = await User.findById(user._id);
            const fulldata = await Promise.all(
                updatedUser.followers.map(async (follower) => {
                    return await followWFData(follower)
                })
            );
            res.status(200).json({ message: message, status: "success",data:fulldata });
            
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
    else{
        res.status(403).send({message:"You can't follow yourself!",status:"error"})
    }
}) 

//remove follower/follow a user
router.put('/:username/follow/remove',csrfProtection,isAuthenticated, async(req,res)=>{
    if(req.session.username !== req.params.username){
        try {
            const user = await User.findOne({username:req.params.username});
            const currentUser = await User.findById(req.session.userId.toString());
            if (user.followings.some(obj => obj === req.session.userId.toString())) {
                await user.updateOne({ $pull: {followings: req.session.userId.toString() } });
                await currentUser.updateOne({ $pull: { followers: user._id.toString() } });

                const updatedUser = await User.findById(req.session.userId);
                const fulldata = await Promise.all(
                    updatedUser.followers.map(async (follower) => {
                        return await followWFData(follower)
                    })
                );
                console.log(fulldata)
                res.status(200).json({message:"The user has been removed from followers!",status:"success",data:fulldata});
            }
            
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
    else{
        res.status(403).send({message:"You can't do this!",status:"error"})
    }
}) 

router.get ('/followings/:username',isAuthenticated, async(req,res)=>{
    const user = await User.findOne({username:req.params.username});
    if(!user){
        return res.status(404).json({message:"User not found",status:"error"})
    }
    const fulldata = await Promise.all(
        user.followings.map(async (following) => {
            return await followWFData(following)
        })
    );
    res.status(200).json({status:"success",data:fulldata})
})

router.get ('/followers/:username',isAuthenticated, async(req,res)=>{
    const user = await User.findOne({username:req.params.username});
    if(!user){
        return res.status(404).json({message:"User not found",status:"error"})
    }
    const fulldata = await Promise.all(
        user.followers.map(async (follower) => {
            return await followWFData(follower)
        })
    );
    res.status(200).json({status:"success",data:fulldata})
})


module.exports = router;