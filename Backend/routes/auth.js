const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//register
router.post('/register', async(req,res)=>{
    try {
        const{username, email,password,picture}=req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
            picture
        })
        const user= await newUser.save();
        res.status(200).json(user);
    } catch (err){
        res.status(500).json(err)
    }
})

router.post('/login',async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            res.status(403).send("Invalid Password!")
        }
        else{
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports =router;