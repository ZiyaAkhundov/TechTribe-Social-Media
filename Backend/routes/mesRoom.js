const router = require('express').Router();
const Room = require('../models/MessengerRoom');
const User = require('../models/User');
const isAuthenticated =require('../middleware/authentication.js')
const csrfProtection = require('../middleware/csrfProtection')
//create a message room
router.post("/",isAuthenticated,csrfProtection, async (req, res) => {
    const {senderId,receiverId} = req.body;
    if(senderId == receiverId){
      return res.status(403).json({message:"You are not permission to perform this operation!",status:"error"})
    }
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);
    if(!senderUser && !receiverUser){
      return res.status(404).json({message:"User not found!",status:"error"})
    }
    try {
        const findRoom = await Room.findOne({
            $or: [
              { members: [senderId, receiverId] },
              { members: [receiverId, senderId] }
            ]
          });
        if(!findRoom){
            const newRoom = await new Room({
                members: [senderId, receiverId],
              });         
            const savedRoom = await newRoom.save();
            res.status(200).json({message:"successful",status:"success",data:{id:savedRoom._id,member:{username:receiverUser.username,id:receiverUser._id}}});
        }
        else{
            res.status(200).json({message:"successful",status:"success",data:{id:findRoom._id,member:{username:receiverUser.username,id:receiverUser._id}}})
        }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //find a message room by userId
router.get("/find/:userId",isAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    if(userId != req.session.userId){
      return res.status(403).json("You are not permission to perform this operation!")
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!",status:"error"})
    }
    try {
        const findRoom = await Room.find({
            $or: [
              { members: {$in:[userId]} }
            ]
          });

        if(!findRoom){
            res.status(200).json({message:"No Room found",status:"success"});
            return
        }
        const roomList = await Promise.all(
          findRoom.map(async (data) => {
            const user = await User.findById(data.members.filter(user=>user != req.session.userId.toString()));
            return {id:data._id, username: user.username, picture: user.picture, date: data.createdAt };
          })
        );
        
        res.status(200).json({ status: "success", data: roomList });
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  });

//find room by id
router.get("/find/room/:roomId",isAuthenticated, async (req, res) => {
  try {
      const findRoom = await Room.findById(req.params.roomId);

      if(!findRoom){
          res.status(200).json({message:"No Room found",status:"success"});
          return
      }
      if(!findRoom.members.some(data=>data == req.session.userId)){
        return res.status(403).json({message:"You are not permission to perform this operation!",status:"error"})
      }
      const id=findRoom.members.find(user=>user !== req.session.userId.toString())
      const userData = await User.findById(id)
      res.status(200).json({ status: "success", data: {id:userData._id,username:userData.username,picture:userData.picture}});
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports =router;