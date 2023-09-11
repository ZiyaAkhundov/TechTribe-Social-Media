const User = require('../models/User');

async function addUsernameAndUserPicture(data) {
    const { userId } = data;
    const user = await User.findById(userId);
    const username = user.username;
    const userPicture = user.picture;

    const postWithUser = {
      ...data.toObject(),
      username,
      userPicture,
      comments: await Promise.all(
        data.comments.map(async (comment) => {
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
        })
      ),
    };

    return postWithUser;
}  

module.exports = addUsernameAndUserPicture;