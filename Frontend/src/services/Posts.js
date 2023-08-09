import {get,put,del} from "../utils/request"
export const getPosts = async () => {
    try {
      const response = await get('posts/feed/posts')
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostLike = async (data) => {
    try {
      const response = await put('posts/like/'+data.postId)
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const PostDelete = async (data) => {
    try {
      const response = await del('posts/'+data.postId)
      return response;
    } catch (error) {
      throw error;
    }
  };