const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: 'string',
            require:true,
            min:3,
            max:50,
            unique:true,
        },
        email:{
            type: 'string',
            require:true,
            unique:true,
        },
        password:{
            type: 'string',
            require:true,
            min:8,
            max:100,
            unique:true,
        },
        picture:{
            type: 'string',
            default: ''
        },
        followers:{
            type: 'Array',
            default: []
        },
        followings:{
            type: 'Array',
            default: []
        },
        isAdmin:{
            type: 'boolean',
            default: false
        }
    },{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema);