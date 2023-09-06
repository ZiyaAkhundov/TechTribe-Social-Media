const mongoose = require('mongoose');

function createUserFields() {
    return {
        _id: 'string',
        userId: 'string',
        username: 'string',
        context: 'string',
        userImg: 'string',
        createdAt: { type: Date, default: Date.now }
    };
  }

const CommentSchema = new mongoose.Schema({
    ...createUserFields(),
    commentLikes: {
        type: [String], // Change this to an array of strings
        default: []
    },
    commentReply:{
        type: [createUserFields()],
        default: []
    },
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
