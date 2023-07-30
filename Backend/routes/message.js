const router = require('express').Router();
const Message = require('../models/Message');
const Room = require('../models/MessengerRoom');

//create a new message
router.post("/", async (req, res) => {
    const newMessage = await new Message(req.body)
    try {
        const saveMessage = await newMessage.save();
        res.status(200).json(saveMessage);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
//get a room messages by userId
router.get("/:roomId", async (req, res) => {
    const roomId = req.params.roomId
    const userId = req.body.userId
    try {
        const findroom = await Room.findOne({
            _id: roomId,
            $or: [
                { members: {$in:[userId]} }
              ]
        })
        if(!findroom){
            console.log(roomId)
            return res.status(404).json("You are not allowed to access this")
        }
        const findMessages = await  Message.find({roomId: roomId})
        if(findMessages.length <= 0){
            res.status(404).json("No messages found")
            return
        }
        res.status(200).json(findMessages);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router