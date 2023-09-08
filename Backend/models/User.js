const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 50,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 100,
            unique: true,
        },
        picture: {
            type: String,
            default: '',
        },
        followers: {
            type: [String],
            default: []
        },
        followings: {
            type: [String],
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
