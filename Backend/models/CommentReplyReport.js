const mongoose = require('mongoose');

const CommentReplyReportSchema = new mongoose.Schema(
    {
        postId: String,
        commentId: String,
        replyId: String,
        Reason: {
            type: String,
            required: true,
            min: 8,
            max: 200,
        },
        checked: Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model("CommentReplyReport", CommentReplyReportSchema);