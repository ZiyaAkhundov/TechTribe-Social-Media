const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = (req, res, next) => {
    const jwtToken = req.cookies.jwtToken;
    if (jwtToken) {
      try {
        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
        const userIdFromToken = decodedToken.userId;
  
        if (req.session && req.session.userId && req.session.userId.toString() === userIdFromToken) {
          next();
        } else {
          return res.status(401).json({ message: 'Unauthorized' });
        }
      } catch (error) {
        console.error('Error verifying JWT:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
//update user
router.put('/:id', async(req,res)=>{
    if(req.body.userId = req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).send(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).send(err);
        }
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