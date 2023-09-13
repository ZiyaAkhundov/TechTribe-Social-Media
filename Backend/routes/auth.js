const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const csrfProtection = require('../middleware/csrfProtection')
const generateCSRFToken = require('../csrf/csrf')
const isAuthenticated =require('../middleware/authentication.js')
const { body, validationResult } = require('express-validator');
dotenv.config()

router.get('/user-data',isAuthenticated, async (req, res) => {
  try {
    if (req.session && req.session.isAuth && req.session.userId) {
        const user = await User.findById(req.session.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({username: user.username, id: user._id, email: user.email,picture: user.picture});

    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
//register
router.post('/register', csrfProtection,[ body('email').isEmail().normalizeEmail(), ],async(req,res)=>{
  if(req.body.email && req.body.username && req.body.password){
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message:"Invalid email address",status:"error"});
      }
        const checkEmail = await User.findOne({ email: (req.body.email).toLowerCase() });
        if(checkEmail){
          return res.status(409).json({ message: 'Email already exists.', status:'error' });
        }
        const checkUsername = await User.findOne({ username: (req.body.username).toLowerCase() });
        if(checkUsername){
          return res.status(409).json({ message: 'Username already exists.', status:'error' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const username = (req.body.username).toLowerCase();
        const email = (req.body.email).toLowerCase();
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        })
        await newUser.save();
        res.status(200).json({message:'Registration successful', status: 'success'});
    } catch (err){
        res.status(500).json(err)
        console.log(err);
    }
  }
  else{
    return res.status(500).json({message:'Registration failed', status:"error"});
  }
    
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Invalid Password!", success: false });
    }

    const csrfToken = generateCSRFToken();
    res.cookie('csrf-token', csrfToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000,
      domain: 'techtribe-social.netlify.app',
      path: '/',
     });

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.cookie('jwtToken', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000,
      domain: 'techtribe-social.netlify.app',
      path: '/',
    });

    res.setHeader('Cache-Control', 'no-store');
    req.session.isAuth = true;
    req.session.userId = user._id;
    req.session.username = user.username;

    return res.status(200).json({
      success: true,
      username: user.username,
      id: user._id,
      email: user.email,
      picture: user.picture,
      followers: user.followers,
      followings: user.followings
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json(err);
  }
});




module.exports =router;