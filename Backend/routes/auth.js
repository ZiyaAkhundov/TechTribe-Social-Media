const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

dotenv.config()
const isAuthenticated = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;
  if (jwtToken) {
    try {
      const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
      const userIdFromToken = decodedToken.userId;

      if (req.session && req.session.userId && req.session.userId === userIdFromToken) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
const getUserDataFromSession = async (req, res, next) => {
    try {
      if (req.session && req.session.isAuth && req.session.userId) {
        const user = await User.findById(req.session.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
router.get('/user-data', async (req, res) => {
  try {
    if (req.session && req.session.isAuth && req.session.userId) {
        const user = await User.findById(req.session.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({username: user.username,id: user._id,email: user.email,followers: user.followers,followings: user.followings,picture: user.picture});
      
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
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

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Invalid Password!", success: false });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.cookie('jwtToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000,
      domain: 'localhost',
      path: '/',
    });

    res.setHeader('Cache-Control', 'no-store');
    req.session.isAuth = true;
    req.session.userId = user._id;

    return res.status(200).json({
      success: true,
      username: user.username,
      email: user.email,
      img: user.picture,
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json(err);
  }
});
  
  


module.exports =router;