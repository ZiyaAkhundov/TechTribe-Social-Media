const router = require('express').Router();
const Message = require('../models/Message');
const Room = require('../models/MessengerRoom');
const isAuthenticated =require('../middleware/authentication.js')
const csrfProtection = require('../middleware/csrfProtection')

//create a new message
router.post("/",isAuthenticated,csrfProtection, async (req, res) => {
    const newMessage =  new Message(req.body)
    try {
        const saveMessage = await newMessage.save();
        res.status(200).json({status:"success",data:saveMessage});
    } catch (err) {
      res.status(500).send(err);
    }
  });

//get a room messages by userId
router.get("/room/:roomId/:userId",isAuthenticated, async (req, res) => {
    const roomId = req.params.roomId
    const user = req.params.userId
    try {
        const findroom = await Room.findOne({
            _id: roomId,
            $or: [
                { members: {$in:[user]} }
              ]
        })
        if(!findroom){
            return res.status(404).json("You are not allowed to access this")
        }
        const findMessages = await  Message.find({roomId: roomId})
        if(findMessages.length <= 0){
            res.status(200).json({message:"No messages found",status:"warning"})
            return
        }
        res.status(200).json({status:"success",data:findMessages});
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router