const mongoose = require('mongoose');

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
            type: 'Array',
            default: []
        },
        comments: {
            type: [{
                _id:'string',
                userId: 'string',
                context: 'string',
                replies: [{
                    userId: 'string',
                    context: 'string'
                }]
            }],
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);