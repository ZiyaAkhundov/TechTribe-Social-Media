const mongoose = require('mongoose');

const CommentReportSchema = new mongoose.Schema(
    {
        postId: String,
        commentId: String,
        Reason: {
            type: String,
            required: true,
            min: 8,
            max: 200,
        },
        checked: {
            type:Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("CommentReport", CommentReportSchema);