const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path= require('path');
const jwt = require('jsonwebtoken');
const isAuthenticated =require('../middleware/authentication.js')
const csrfProtection = require('../middleware/csrfProtection')
const multer = require('multer')

const fileFilter = (req, file, cb) => {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Fixed typo here
    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error('Invalid File Type'))
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/img");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
      console.log(true);
    },
  });
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
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
            const data = {
                username: user.username,
                email: user.email,
                img: user.picture,
            }
            res.status(200).json({message:"Account has been updated",status: "success",data:data});
        } catch (err) {
            return res.status(500).send(err);
        }
    
})

//upload photo
router.post('/upload',csrfProtection,isAuthenticated, async(req,res) =>{
    upload.single("file")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err.message });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: "File uploaded successfully" });
      });
})

//set photo
router.put('/picture',csrfProtection,isAuthenticated, async(req,res) =>{
    try {
        const currentUser = await User.findById(req.session.userId);
        await currentUser.updateOne({$set:{picture: req.body.picture}})
        return res.status(200).json({message:'Photo uploaded successfully', status: 'success'})
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
        res.status(200).json({username: user.username,followers : user.followers,followings : user.followings,picture : user.picture});
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get all users
router.get('/list', async(req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).send(err);
    }
})

//follow a user
router.put('/:id/follow', async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers: req.body.userId}})
                await currentUser.updateOne({$push:{followings: req.params.id}})
                res.status(200).json("User has been followed!");
            }
            else{
                res.status(403).send("You are already following this user!")
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
    else{
        res.status(403).send("You can't follow yourself!")
    }
}) 

//unfollow a user
router.put('/:id/unfollow', async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}})
                await currentUser.updateOne({$pull:{followings: req.params.id}})
                res.status(200).json("User has been unfollowed!");
            }
            else{
                res.status(403).send("You are not unfollowing this user!")
            }
        } catch (err) {
            res.status(500).send(err)
        }
    }
    else{
        res.status(403).send("You can't unfollow yourself!")
    }
})
module.exports = router;