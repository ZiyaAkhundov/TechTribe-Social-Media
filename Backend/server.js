const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes =require("./routes/auth.js")
const userRoutes =require("./routes/users.js")
const postRoutes = require("./routes/posts.js")
const morgan = require('morgan');

const port =5000;

dotenv.config()

const connect = async ()=>{ 
    try {
        await mongoose.connect(process.env.MONGOOSE)
        console.log("Connected to mongodb")
    } catch (err) {
        console.log(err);
    }
}

//middleware
app.use(express.json())
app.use(morgan("common"))

app.use("/auth" ,authRoutes);
app.use("/users" ,userRoutes);
app.use("/posts",postRoutes)

app.listen(port,()=>{
    connect()
    console.log("Server listening on port: " + port)
})