const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session); 
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const nocache = require("nocache");
const helmet = require('helmet')
const csrf = require('./middleware/csrf')
const path = require('path')

const dotenv = require('dotenv');
const authRoutes =require("./routes/auth.js")
const userRoutes =require("./routes/users.js")
const postRoutes = require("./routes/posts.js")
const mesRoomRoutes = require("./routes/mesRoom.js")
const MessageRoutes = require("./routes/message.js")
const ReportRoutes = require("./routes/report.js")
const ContactRoute = require('./routes/contact')

const port =5000;

dotenv.config()

const corsOptions = {
    origin: process.env.CORS_URL_OPTION, 
    credentials: true, 
  };
  

  mongoose.connect( process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });


const store = new MongoDBSession({
  uri: process.env.MONGOOSE,
  collection: 'Sessions',
});
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
app.use(
  helmet({
    crossOriginResourcePolicy: false,
})
);
app.use(helmet.frameguard({ action: "DENY" }));
app.use(nocache());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(csrf)
app.use(express.json())
app.use(morgan("common"))
app.use(
  session({
    httpOnly: true,
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      domain:'techtribe-api.onrender.com'
    },
    name: 'techtribe_session',
  })
);

app.use("/auth", cors(corsOptions), authRoutes);
app.use("/users", cors(corsOptions), userRoutes);
app.use("/posts", cors(corsOptions), postRoutes);
app.use("/messageroom", cors(corsOptions), mesRoomRoutes);
app.use("/message", cors(corsOptions), MessageRoutes);
app.use("/report", cors(corsOptions), ReportRoutes);
app.use("/contact", cors(corsOptions), ContactRoute);

  
  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.clearCookie("techtribe_session")
      res.clearCookie('TechtribeToken'); 
      res.clearCookie('csrfToken')
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });

const server = app.listen(port,()=>{
   
    console.log("Server listening on port: " + port)
})

// socket
const io = require("socket.io")(server,{
  pingTimeout: 60000,
  cors:{
    origin: 'https://techtribe-social.netlify.app'
  }
})

let users =[];

const addUser = (userId,socketId) => {
!users.some((user)=> user.userId === userId) &&
users.push({
  userId,
  socketId
})
}

const removeUser = (socketId) => {
  users = users.filter((user)=>user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user)=>user.userId === userId)
  }

// //socket connection
io.on("connection",(socket)=>{
  console.log('User connected');
  
  // take userid and socketid from client
  socket.on("addUser",(userId)=>{
    addUser(userId,socket.id)
    io.emit("getUsers",users)
 

  //send and get message
  socket.on("sendMessage",({senderId,receiverId,text})=>{
    const user= getUser(receiverId)
    user &&
    io.to(user.socketId).emit("getMessage",{
      senderId,
      text
    })
  })

  //disconnect 
  socket.on("disconnect",()=>{
    console.log("a user disconnected")
    removeUser(socket.id)
    io.emit("getUsers",users)
  })
})
})


