const User = require('../models/User');
async function commentsWFData(comment) {
    const user = await User.findById(comment.userId);
    const username = user.username;
    const userImg = user.picture;
  
    const commentWithUser = {
      ...comment.toObject(),
      username,
      userImg,
      commentReply: await Promise.all(
        comment.commentReply.map(async (reply) => {
          const user = await User.findById(reply.userId);
          const username = user.username;
          const userImg = user.picture;
  
          return {
            ...reply.toObject(),
            username,
            userPicture: userImg,
          };
        })
      ),
    };
  
    return commentWithUser;
  }

  module.exports = commentsWFData;