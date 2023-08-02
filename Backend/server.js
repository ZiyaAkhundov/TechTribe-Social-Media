const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session); 
const dotenv = require('dotenv');
const authRoutes =require("./routes/auth.js")
const userRoutes =require("./routes/users.js")
const postRoutes = require("./routes/posts.js")
const mesRoomRoutes = require("./routes/mesRoom.js")
const MessageRoutes = require("./routes/message.js")
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const nocache = require("nocache");
const helmet = require('helmet')

const port =5000;

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
  };
  

const connect = async ()=>{ 
    try {
        await mongoose.connect(process.env.MONGOOSE)
        console.log("Connected to mongodb")
    } catch (err) {
        console.log(err);
    }
}

const store = new MongoDBSession({
    uri:process.env.MONGOOSE,
    collection: 'Sessions'
})
app.set('trust proxy', 1)

//middleware
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
app.use(helmet())
app.use(nocache());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())
app.use(morgan("common"))
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 3600000, 
    },
    name: 'ps_session', 
  })
);


app.use("/auth", cors(corsOptions), authRoutes);
app.use("/users", cors(corsOptions), userRoutes);
app.use("/posts", cors(corsOptions), postRoutes);
app.use("/messageroom", cors(corsOptions), mesRoomRoutes);
app.use("/message", cors(corsOptions), MessageRoutes);
// const isAuthenticated = (req, res, next) => {
//   const jwtToken = req.cookies.jwtToken;
//   if (jwtToken) {
//     try {
//       const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
//       const userIdFromToken = decodedToken.userId;

//       if (req.session && req.session.userId && req.session.userId === userIdFromToken) {
//         next();
//       } else {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//     } catch (error) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//   } else {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// app.get('/check-auth',(req, res) => {
//     if (req.session && req.session.isAuth && req.session.userId) {
//       res.setHeader('Cache-Control', 'no-store');
//       if (req.session.cookie.expires && new Date() < new Date(req.session.cookie.expires)) {
//         res.status(200).json({ authenticated:  });
//       } else {
//         res.status(401).json({ authenticated: false });
//       }
//     } else {
//       res.status(401).json({ authenticated: false });
//     }
//   });
  
  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.clearCookie("ps_session")
      res.clearCookie('jwtToken'); 
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });

app.listen(port,()=>{
    connect()
    console.log("Server listening on port: " + port)
})