const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _id: 'string',
    userId: 'string',
    username: 'string',
    context: 'string',
    userImg: 'string',
    commentLikes: {
        type: [String], // Change this to an array of strings
        default: []
    },
    createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: 'string',
            require: true
        },
        img: {
            type: 'string',
            default: ''
        },
        desc: {
            type: 'string',
            max: 1000
        },
        likes: {
            type: [String], // Change this to an array of strings
            default: []
        },
        comments: {
            type: [CommentSchema], // Use the CommentSchema defined above
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
