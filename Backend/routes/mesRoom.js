const router = require('express').Router();
const Room = require('../models/MessengerRoom');
//create a message room
router.post("/", async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
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
            res.status(200).json(savedRoom);
        }
        else{
            res.status(403).json("You are already created room!")
        }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //find a message room by userId
router.get("/find/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const findRoom = await Room.findOne({
            $or: [
              { members: {$in:[userId]} }
            ]
          });

        if(!findRoom){
            res.status(404).json("No Room found");
            return
        }
            res.status(200).json(findRoom);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  //find two users message room
  router.get("/find/:firstUser/:secondUser", async (req, res) => {
    const firstUser = req.params.firstUser;
    const secondUser = req.params.secondUser;
    try {
        const findRoom = await Room.findOne({
            $or: [
              { members: [firstUser, secondUser] },
              { members: [secondUser, firstUser] }
            ]
          });
        if(!findRoom){
            res.status(404).json("No Room found");
            return
        }
            res.status(200).json(findRoom);
    } catch (err) {
      res.status(500).send(err);
    }
  });
module.exports =router;