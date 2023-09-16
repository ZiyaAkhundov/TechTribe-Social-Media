const mongoose = require('mongoose');

function createUserFields() {
    return {
        _id: 'string',
        userId: 'string',
        context: 'string',
        createdAt: { type: Date, default: Date.now },
        commentLikes: {
            type: [String], 
            default: []
        },
    };
  }

const CommentSchema = new mongoose.Schema({
    ...createUserFields(),
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
            public_id: {
                type: String
            },
            url:{
                type: String
            }
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
