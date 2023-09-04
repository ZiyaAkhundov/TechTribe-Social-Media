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
router.get('/:username',csrfProtection,isAuthenticated, async(req,res)=>{
    const username = req.params.username;
    try {
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(404).json({message:"User not found", status: "error"});
        }
        res.status(200).json({id:user._id,username: user.username,followers : user.followers,followings : user.followings,picture : user.picture});
    } catch (err) {
        return res.status(500).send(err);
    }
})

//get users
router.get('/query/users', csrfProtection, isAuthenticated, async (req, res) => {
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
            if (!user.followers.some(obj => obj.id === req.session.userId.toString())) {
                const newFollower = { id: req.session.userId.toString(), username: req.session.username, userPic: currentUser.picture };
                await user.updateOne({ $push: { followers: newFollower } });
                await currentUser.updateOne({ $push: { followings: { id: user._id.toString(), username: user.username, userPic: user.picture } } });
                
                const updatedUser = await User.findById(user._id);
                res.status(200).json({ message: "User has been followed!", status: "success",data:updatedUser.followers });
            } else {
                await user.updateOne({ $pull: { followers: { id: req.session.userId.toString() } } });
                await currentUser.updateOne({ $pull: { followings: { id: user._id.toString() } } });

                const updatedUser = await User.findOne(user._id);
                res.status(200).json({message:"User has been unfollowed!",status:"success",data:updatedUser.followers});
            }
            
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
    else{
        res.status(403).send({message:"You can't follow yourself!",status:"error"})
    }
}) 

//remove follow a user
router.put('/:username/follow/remove',csrfProtection,isAuthenticated, async(req,res)=>{
    if(req.session.username !== req.params.username){
        try {
            const user = await User.findOne({username:req.params.username});
            const currentUser = await User.findById(req.session.userId.toString());
            if (user.followings.some(obj => obj.id === req.session.userId.toString())) {
                await user.updateOne({ $pull: { followings: { id: req.session.userId.toString() } } });
                await currentUser.updateOne({ $pull: { followers: { id: user._id.toString() } } });

                const updatedUser = await User.findOne(currentUser._id);
                res.status(200).json({message:"The user has been removed from followers!",status:"success",data:updatedUser.followers});
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

router.get ('/followings/:username',csrfProtection,isAuthenticated, async(req,res)=>{
    const user = await User.findOne({username:req.params.username});
    if(!user){
        return res.status(404).json({message:"User not found",status:"error"})
    }
    res.status(200).json({status:"success",data:user.followings})
})

router.get ('/followers/:username',csrfProtection,isAuthenticated, async(req,res)=>{
    const user = await User.findOne({username:req.params.username});
    if(!user){
        return res.status(404).json({message:"User not found",status:"error"})
    }
    res.status(200).json({status:"success",data:user.followers})
})


module.exports = router;